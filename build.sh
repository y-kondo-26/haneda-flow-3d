#!/bin/zsh
# src/ の部品をファイル名順に連結して haneda-flow.html を作り、preview/index.html と docs/index.html（GitHub Pages 用）も更新する
dir="${0:A:h}"
cat "$dir"/src/*.part > "$dir/haneda-flow.html" && echo "wrote $dir/haneda-flow.html ($(wc -c < "$dir/haneda-flow.html") bytes)"
"$dir/make_preview.sh"
mkdir -p "$dir/docs" && cp "$dir/preview/index.html" "$dir/docs/index.html" && echo "wrote $dir/docs/index.html"
