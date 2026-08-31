#!/bin/zsh
set -euo pipefail

BIN_DIR=${0:A:h}
VIDEO_DIR=${BIN_DIR:h}
REPO_DIR=${VIDEO_DIR:h:h}
SOFFICE=/Applications/LibreOffice.app/Contents/MacOS/soffice
INPUT=${1:-$REPO_DIR/data/runs/PFLRALt3w26sfg/output.docx}
OUT_DIR=$VIDEO_DIR/word
CLIP_DIR=$VIDEO_DIR/clips
WORK=$OUT_DIR/.work-$$

if [[ ! -f "$INPUT" ]]; then
  print -u2 "input docx does not exist: $INPUT"
  exit 1
fi
if [[ ! -x "$SOFFICE" ]]; then
  print -u2 "LibreOffice is not installed at $SOFFICE"
  exit 1
fi

mkdir -p "$OUT_DIR" "$CLIP_DIR" "$WORK/pages" "$WORK/score"
cleanup() { rm -rf "$WORK"; }
trap cleanup EXIT

prepared="$WORK/show-revisions.docx"
node "$BIN_DIR/docx-revision-view.mjs" "$INPUT" "$prepared"
"$SOFFICE" "-env:UserInstallation=file://$WORK/lo-profile" --headless \
  --convert-to pdf --outdir "$WORK" "$prepared" >/dev/null
PDF="$WORK/show-revisions.pdf"
if [[ ! -f "$PDF" ]]; then
  print -u2 "LibreOffice did not produce the expected PDF"
  exit 1
fi

pdftoppm -r 300 -png "$PDF" "$WORK/pages/page" >/dev/null 2>&1
pdftoppm -r 54 "$PDF" "$WORK/score/page" >/dev/null 2>&1

local_choice=$(node "$BIN_DIR/pick-redline-page.mjs" "$WORK"/score/page-*.ppm)
score_path=${local_choice%%$'\t'*}
score_count=${local_choice##*$'\t'}
page_number=${${score_path:t}:r}
page_number=${page_number#page-}
selected="$WORK/pages/page-$page_number.png"
if [[ ! -f "$selected" ]]; then
  print -u2 "could not map selected score page to the 150 dpi PNG: $selected"
  exit 1
fi

pages_next="$OUT_DIR/pages.next-$$"
mv "$WORK/pages" "$pages_next"
if [[ -d "$OUT_DIR/pages" ]]; then
  pages_old="$OUT_DIR/pages.old-$$"
  mv "$OUT_DIR/pages" "$pages_old"
  mv "$pages_next" "$OUT_DIR/pages"
  rm -rf "$pages_old"
else
  mv "$pages_next" "$OUT_DIR/pages"
fi

still_tmp="$OUT_DIR/redlined-page.png.tmp-$$"
cp "$OUT_DIR/pages/page-$page_number.png" "$still_tmp"
mv "$still_tmp" "$OUT_DIR/redlined-page.png"

clip_tmp="$CLIP_DIR/word-output.tmp-$$.mp4"
ffmpeg -hide_banner -loglevel error -y \
  -loop 1 -i "$OUT_DIR/redlined-page.png" \
  -vf "scale=-2:980:flags=lanczos,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=0xFBFAF7,fps=30,format=yuv420p" \
  -frames:v 360 -an -c:v libx264 -preset medium -crf 17 -movflags +faststart "$clip_tmp"
mv "$clip_tmp" "$CLIP_DIR/word-output.mp4"

print "selected page $page_number ($score_count redline-colour pixels at scoring resolution)"
print "wrote $OUT_DIR/redlined-page.png"
print "wrote $CLIP_DIR/word-output.mp4"
