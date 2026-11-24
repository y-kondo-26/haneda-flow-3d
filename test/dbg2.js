const scen = process.argv[2] || '';
const world = buildWorld(20261124);
const sims = [new Sim(world, 0), new Sim(world, 1)];
const tally = [{}, {}], per = [[], []];
for (const s of sims) {
  const orig = s.closeFlight.bind(s);
  s.closeFlight = function (f, fs) {
    const m = {}; let n = 0;
    for (const b of s.bags) if (b.f === f && b.st !== B.GONE && b.st < B.ARR) { const k = (b.xfer ? 'x' : 'l') + ':st' + b.st + (b.st === 5 ? 'd' + b.dest : '') + (b.st === 1 ? 'n' + b.next : ''); m[k] = (m[k] || 0) + 1; n++; }
    const T = tally[s.mode]; for (const k in m) T[k] = (T[k] || 0) + m[k];
    const miss = fs.bagsIn - fs.bagsLoaded; if (miss > 6) per[s.mode].push(f.code + (f.extra ? '*' : '') + '@' + hhmm(f.dep) + ' miss ' + miss + ' lost ' + fs.lostN + ' sent ' + fs.trainsSent + ' ' + JSON.stringify(m));
    orig(f, fs);
  };
}
let did = false;
for (let t = DAY0; t < DAY1 - 0.01; t += 0.05) {
  if (scen && !did && t >= +(process.argv[3] || 410)) { did = true; if (scen === 'extra') { const f = addExtraFlight(world, t); sims.forEach(s => s.scenarioExtra(f)); } if (scen === 'eds') sims.forEach(s => s.scenarioEds(1, 40)); }
  for (const s of sims) s.step(0.05);
}
for (const m of [0, 1]) { console.log(m ? 'AI' : 'BASE', 'missed', sims[m].kpi.missedBags, JSON.stringify(tally[m])); for (const l of per[m]) console.log('   ', l); }
