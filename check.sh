#!/bin/zsh
# 連結 → モジュールスクリプトを抜き出して構文確認
d="${0:A:h}"
"$d/build.sh" > /dev/null || exit 1
python3 - "$d" <<'PY'
import re,sys
d=sys.argv[1]
s=open(d+'/haneda-flow.html').read()
m=re.search(r'<script type="module">(.*?)</script>', s, re.S)
open(d+'/test/module.mjs','w').write(m.group(1))
print('bytes', len(s.encode()), 'module lines', m.group(1).count('\n'))
PY
node --check "$d/test/module.mjs" && echo SYNTAX_OK
