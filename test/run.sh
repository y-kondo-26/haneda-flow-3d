#!/bin/zsh
# シミュレーション部品だけを連結して node で 1 日分を回す（three.js / DOM なし）
d="${0:A:h}/.."
cat "$d"/src/32-config.part "$d"/src/4*.part "$d"/test/driver.js > "$d/test/sim.mjs" && node "$d/test/sim.mjs" "$@"
