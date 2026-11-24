// ---- test driver (node) ----
const args = process.argv.slice(2);
const seed = +(args[0] || 20261124), scen = args[1] || '';
const world = buildWorld(seed);
const sims = [new Sim(world, 0), new Sim(world, 1)];
console.log('flights', world.flights.length, 'pax', world.pax.length, 'xbags', world.xbags.length,
  'bags(local)', world.flights.reduce((s, f) => s + f.nBags, 0));
const t0 = Date.now(); let maxPax = 0, maxBags = 0, did = false;
const dt = 0.05;
for (let t = DAY0; t < DAY1 - 0.01; t += dt) {
  if (scen && !did && t >= +(args[3] || 410)) {
    did = true;
    if (scen === 'eds') sims.forEach(s => s.scenarioEds(1, 40));
    if (scen === 'cp') sims.forEach(s => s.scenarioCp(1, 30));
    if (scen === 'extra') { const f = addExtraFlight(world, t); if (f) sims.forEach(s => s.scenarioExtra(f)); else console.log('no gate'); }
  }
  for (const s of sims) s.step(dt);
  maxPax = Math.max(maxPax, sims[0].pax.length, sims[1].pax.length); maxBags = Math.max(maxBags, sims[0].bags.length, sims[1].bags.length);
  const m = Math.round(t / dt);
  if (m % (60 / dt) === 0 && (Math.round(t) % 180 === 0 || Math.round(t) === 480)) {
    for (const s of sims) {
      const v = s.view();
      console.log(hhmm(s.t), s.mode ? 'AI  ' : 'BASE', 'pax', s.pax.length, 'bags', s.bags.length, 'q', s.cp.map(c => c.q.length + '/' + c.open).join(' '),
        'wait', v.waitAvg.toFixed(2), 'max', v.waitMax.toFixed(1), 'maxQ', v.maxQ, 'lh', v.laneHours.toFixed(0), 'bagT', v.bagTime.toFixed(1),
        'mis/1000', v.mishandled.toFixed(1), 'clean%', v.clean.toFixed(0), 'loop', s.loopN, 'ebs', s.ebs.n, 'hold', s.holdN, 'edsQ', s.eds.map(e => e.q.length).join(','), 'mesQ', s.mes.q.length);
    }
  }
}
console.log('elapsed ms', Date.now() - t0, 'maxPax', maxPax, 'maxBags', maxBags);
for (const s of sims) {
  const v = s.view(), k = s.kpi;
  console.log(s.mode ? 'AI  ' : 'BASE', JSON.stringify({ wait: +v.waitAvg.toFixed(2), waitMax: +v.waitMax.toFixed(1), maxQ: v.maxQ, laneH: +v.laneHours.toFixed(0), bagT: +v.bagTime.toFixed(1),
    mis: +v.mishandled.toFixed(2), missed: v.missedBags, closedBags: v.closedBags, clean: +v.clean.toFixed(0), noRead: +v.noReadRate.toFixed(2), recirc: v.recircLaps, missedPax: v.missedPax, boarded: v.boarded,
    guided: v.guided, missort: k.missort, holdLost: k.holdLost, ebsOut: k.ebsOut, reb: k.rebalanced, tugWait: +(k.tugWaitSum / Math.max(1, k.tugWaitN)).toFixed(2), dropWait: +(k.dropWaitSum / Math.max(1, k.dropN)).toFixed(2), bagsIn: k.bagsIn, loaded: k.loaded }));
  const bad = s.pax.some(a => !isFinite(a.x + a.z)) || s.bags.some(b => !isFinite(b.x + b.y + b.z));
  if (bad) console.log('!! NaN positions');
  console.log(' log entries', s.log.length, 'sample:'); for (const l of s.log.filter(l => l.kind !== 'x').slice(0, 6)) console.log('  ', hhmm(l.t), l.kind, l.text);
}
if (args[2] === 'hourly') {
  const k0 = sims[0].kpi, k1 = sims[1].kpi; let line = '';
  for (let h = 5; h < 24; h++) { let a = 0, bg = 0, w0 = 0, n0 = 0, w1 = 0, n1 = 0; for (let b = (h - 5) * 4; b < (h - 4) * 4; b++) { a += k0.arrivals[b]; bg += k0.bagArr[b]; w0 += k0.waitSum[b]; n0 += k0.waitN[b]; w1 += k1.waitSum[b]; n1 += k1.waitN[b]; }
    console.log(String(h).padStart(2, '0') + 'h pax', a, 'bags', bg, 'wait base', (w0 / Math.max(1, n0)).toFixed(1), 'ai', (w1 / Math.max(1, n1)).toFixed(1)); }
  console.log('deps per hour', Array.from({ length: 19 }, (_, i) => world.flights.filter(f => Math.floor(f.dep / 60) === i + 5).length).join(' '));
}

if (scen) {
  const b0 = Math.floor((+(args[3] || 410) - DAY0) / 15);
  for (const s of sims) { const k = s.kpi; let bt = 0, bn = 0, ms = 0, cl = 0, w = 0, wn = 0, qm = 0;
    for (let b = b0; b < b0 + 10; b++) { bt += k.bagSeries[b]; bn += k.bagSeriesN[b]; ms += k.missSeries[b]; cl += k.closedSeries[b]; w += k.waitSum[b]; wn += k.waitN[b]; qm = Math.max(qm, k.qMaxSeries[b]); }
    console.log(s.mode ? 'AI  ' : 'BASE', 'window +150min: bagT', (bt / bn).toFixed(1), 'missed', ms, '/', cl, 'wait', (w / wn).toFixed(1), 'maxQ', qm, 'prio', k.prioritized); }
}
