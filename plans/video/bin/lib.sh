#!/bin/zsh
# Shared capture helpers for the Playbook Redliner solution video.

VIDEO_DIR=${PLAYBOOK_VIDEO_DIR:-${0:A:h:h}}
SESSION=${PLAYBOOK_VIDEO_SESSION:-playbook-redliner-video}
APP_URL=${PLAYBOOK_URL:-https://playbook-redliner.vercel.app}
S=$SESSION
V=$VIDEO_DIR
CURSOR_X=72
CURSOR_Y=152
REC_PID=""
REC_OUT=""

mkdir -p "$V/clips" "$V/logs"

ab() {
  agent-browser --session "$S" "$@" >/dev/null 2>&1
}

abo() {
  agent-browser --session "$S" "$@" 2>&1
}

boot() {
  ab open "$APP_URL/"
  ab set viewport 1920 1080
  ab wait --load networkidle || true
  cursor_on
}

open_path() {
  ab open "$APP_URL$1"
  ab set viewport 1920 1080
  ab wait --load networkidle || true
  cursor_on
}

cursor_on() {
  ab eval '(() => {
    let cursor = document.getElementById("video-capture-cursor");
    if (!cursor) {
      cursor = document.createElement("div");
      cursor.id = "video-capture-cursor";
      Object.assign(cursor.style, {
        position: "fixed", left: "0", top: "0", width: "18px", height: "18px",
        borderRadius: "999px", border: "3px solid #FFFFFF", background: "#1E2A47",
        boxShadow: "0 1px 2px rgba(27,27,31,.22), 0 4px 12px rgba(27,27,31,.18)",
        transform: "translate(-50%,-50%)", pointerEvents: "none", zIndex: "2147483647",
        opacity: "0", transition: "opacity 180ms ease-out"
      });
      document.documentElement.append(cursor);
      let timer;
      window.addEventListener("mousemove", (event) => {
        cursor.style.left = `${event.clientX}px`;
        cursor.style.top = `${event.clientY}px`;
        cursor.style.opacity = "1";
        clearTimeout(timer);
        timer = setTimeout(() => { cursor.style.opacity = "0"; }, 1400);
      }, { passive: true });
    }
    return true;
  })()'
}

cursor_off() {
  ab eval 'document.getElementById("video-capture-cursor")?.remove(); true' || true
}

snapshot_beat() {
  local tmp="$V/logs/$1.snapshot.tmp"
  agent-browser --session "$S" snapshot -i -c > "$tmp" 2>&1
  mv "$tmp" "$V/logs/$1.snapshot.txt"
}

point_for_text() {
  local query expression result
  query=$(node -e 'process.stdout.write(JSON.stringify(process.argv[1]))' "$1")
  expression="(() => { const q=$query; const nodes=[...document.querySelectorAll('button,a,input,textarea,[role=button],[role=option],[role=menuitem]')]; const hit=nodes.find((node) => (((node.getAttribute('aria-label') || '') + ' ' + (node.getAttribute('placeholder') || '') + ' ' + (node.textContent || '')).replace(/\\s+/g, ' ')).includes(q)); if (!hit) return 'MISS'; hit.scrollIntoView({block:'center',inline:'center'}); const rect=hit.getBoundingClientRect(); return Math.round(rect.left+rect.width/2)+','+Math.round(rect.top+rect.height/2); })()"
  result=$(abo eval "$expression" | tail -n 1)
  result=${result//\"/}
  [[ "$result" == *,* ]] || return 1
  print -r -- "$result"
}

point_for_selector() {
  local query expression result
  query=$(node -e 'process.stdout.write(JSON.stringify(process.argv[1]))' "$1")
  expression="(() => { const hit=document.querySelector($query); if (!hit) return 'MISS'; hit.scrollIntoView({block:'center',inline:'center'}); const rect=hit.getBoundingClientRect(); return Math.round(rect.left+rect.width/2)+','+Math.round(rect.top+rect.height/2); })()"
  result=$(abo eval "$expression" | tail -n 1)
  result=${result//\"/}
  [[ "$result" == *,* ]] || return 1
  print -r -- "$result"
}

move_pointer() {
  local x=$1 y=$2 steps=${3:-18}
  local start_x=$CURSOR_X start_y=$CURSOR_Y index next_x next_y
  for (( index=1; index<=steps; index++ )); do
    next_x=$(( start_x + (x - start_x) * index / steps ))
    next_y=$(( start_y + (y - start_y) * index / steps ))
    ab mouse move "$next_x" "$next_y"
    sleep 0.025
  done
  CURSOR_X=$x
  CURSOR_Y=$y
}

move_to_text() {
  local point
  point=$(point_for_text "$1") || return 1
  move_pointer "${point%,*}" "${point#*,}"
}

move_to_selector() {
  local point
  point=$(point_for_selector "$1") || return 1
  move_pointer "${point%,*}" "${point#*,}"
}

tap_text() {
  move_to_text "$1" || return 1
  sleep 0.32
  ab mouse down
  sleep 0.11
  ab mouse up
}

tap_selector() {
  move_to_selector "$1" || return 1
  sleep 0.32
  ab mouse down
  sleep 0.11
  ab mouse up
}

narration_target() {
  node -e '
    const fs=require("node:fs");
    const manifest=process.argv[1];
    const id=process.argv[2];
    const fallback=Number(process.argv[3]);
    try {
      const data=JSON.parse(fs.readFileSync(manifest,"utf8"));
      const beat=data.beats.find((item)=>item.id===id);
      process.stdout.write(String(Math.ceil((beat?.duration ?? fallback)+2)));
    } catch { process.stdout.write(String(Math.ceil(fallback+2))); }
  ' "$V/narration/manifest.json" "$1" "$2"
}

hold_until() {
  local started=$1 target=$2
  while (( SECONDS - started < target )); do sleep 1; done
}

rec_start() {
  local name=$1 max_seconds=${2:-60}
  local out="$V/clips/$name.mp4" log="$V/logs/rec-$name.log"
  rm -f "$out" "$out.STOP" "$log"
  node "$V/bin/rec.mjs" "$out" "$max_seconds" 60 "$S" > "$log" 2>&1 &
  REC_PID=$!
  REC_OUT=$out
  sleep 1.8
}

rec_stop() {
  local name=$1 out="$V/clips/$1.mp4"
  touch "$out.STOP"
  if [[ -n "$REC_PID" ]]; then
    wait "$REC_PID"
    REC_PID=""
    REC_OUT=""
  fi
  tail -n 2 "$V/logs/rec-$name.log"
  [[ -s "$out" ]]
}
