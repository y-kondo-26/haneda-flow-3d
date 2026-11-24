const world = buildWorld(20261124);
const s = new Sim(world, +(process.argv[2] || 1));
const stop = +(process.argv[3] || 360);
for (let t = DAY0; t < stop; t += 0.05) s.step(0.05);
const cnt = {}; for (const b of s.bags) { const k = 'st' + b.st + (b.st === 5 ? '/d' + b.dest + '/c' + b.c : ''); cnt[k] = (cnt[k] || 0) + 1; }
console.log(hhmm(s.t), 'bags by state', cnt, 'loopN', s.loopN);
for (const f of world.flights) { if (f.dep < s.t || f.dep > s.t + 130) continue; const fs = s.flightState(f.id);
  console.log(f.code, 'dep', hhmm(f.dep), 'g', f.gate, 'lat', f.lateralFix, 'opened', fs.opened, 'train', fs.train ? fs.train.st + ':' + fs.train.bags.length : '-', 'req', fs.req, 'in', fs.bagsIn, 'loaded', fs.bagsLoaded, 'onWay', fs.onWay, 'latN', s.lat[f.lateralFix].n, 'res', s.lat[f.lateralFix].res, 'latF', s.lat[f.lateralFix].f, 'sent', fs.trainsSent, 'final', fs.finalSent); }
console.log('tugs', s.tugs.map(t => t.st + (t.f ? '@' + t.f.code : '')).join(' | '), 'req', s.tugReq.length);
console.log('lat owners', s.lat.map(l => l.f + ':' + l.n + '/' + l.res).join(' '));
