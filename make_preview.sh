#!/bin/zsh
# Artifact 公開時と同じく doctype・charset・viewport を付けて preview/index.html を作る
src="${0:A:h}/haneda-flow.html"
out="${0:A:h}/preview/index.html"
{
  print -r -- '<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><style>:root{color-scheme:light;padding-top:env(safe-area-inset-top);padding-bottom:env(safe-area-inset-bottom)}body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style></head><body>'
  cat "$src"
  print -r -- '</body></html>'
} > "$out"
echo "wrote $out"
