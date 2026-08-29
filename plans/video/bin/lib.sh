#!/bin/zsh
# Shared helpers for recording Hearth B-roll from the headless agent-browser session.
export HEARTH_SESSION=vhl
S=vhl
URL=https://hearth-wheat-ten.vercel.app
V=/Users/yadneshsalvi/code/hackathons/hearth-webmcp/plans/video
TO() { perl -e 'alarm shift; exec @ARGV' "$@"; }   # TO <secs> <cmd...>

ab()  { TO 30 agent-browser --session $S "$@" >/dev/null 2>&1; }
abo() { TO 30 agent-browser --session $S "$@" 2>&1 | tail -1; }
tool(){ local a="$2"; [ -z "$a" ] && a='{}'; TO 45 node $V/bin/tool.mjs "$1" "$a" $S 2>&1 | tail -1 | head -c 260; echo; }
toolq(){ local a="$2"; [ -z "$a" ] && a='{}'; TO 45 node $V/bin/tool.mjs "$1" "$a" $S >/dev/null 2>&1; }

# Click the first button/summary whose accessible text contains the argument. JS
# click, so a miss returns immediately instead of blocking on a Playwright wait.
tap() {
  abo eval "(()=>{const q='$1';const els=[...document.querySelectorAll('button,summary,[role=button],a')];const t=els.find(e=>(((e.getAttribute('aria-label')||'')+' '+(e.textContent||'')).replace(/\s+/g,' ')).includes(q));if(!t)return 'MISS:'+q;t.click();return 'TAP';})()"
}

boot() {
  agent-browser --session $S open $URL >/dev/null 2>&1
  ab set viewport 1920 1080
  sleep 4
}

fresh() { # fresh [keep]  — pristine studio; dismisses onboarding unless "keep"
  ab eval "localStorage.clear(); 1"
  ab reload
  sleep 4.5
  if [ "$1" != "keep" ]; then ab press Escape; sleep 0.8; fi
}

rec_start() { # rec_start <name> [maxsec]
  local m="$2"; [ -z "$m" ] && m=60
  rm -f $V/clips/$1.mp4 $V/clips/$1.mp4.STOP
  node $V/bin/rec.mjs $V/clips/$1.mp4 $m 60 $S > /tmp/rec-$1.log 2>&1 &
  sleep 1.8
}
rec_stop() { # rec_stop <name>
  touch $V/clips/$1.mp4.STOP
  local i=0
  while [ $i -lt 120 ]; do grep -q "saved\|ERROR" /tmp/rec-$1.log 2>/dev/null && break; sleep 1; i=$((i+1)); done
  sleep 1
  cat /tmp/rec-$1.log
}
still() { TO 30 agent-browser --session $S screenshot $V/stills/$1.png >/dev/null 2>&1; }

# drag <x1> <y1> <x2> <y2> [steps]  — real pointer drag across the 3D canvas
drag() {
  local x1=$1 y1=$2 x2=$3 y2=$4 n=${5}
  [ -z "$n" ] && n=30
  ab mouse move $x1 $y1; sleep 0.5
  ab mouse down; sleep 0.35
  local i=1
  while [ $i -le $n ]; do
    ab mouse move $(( x1 + (x2 - x1) * i / n )) $(( y1 + (y2 - y1) * i / n ))
    i=$((i+1))
  done
  sleep 0.4
  ab mouse up
}
