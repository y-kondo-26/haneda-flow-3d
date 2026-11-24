for (const dt of [0.05, 0.1]) {
  const world = buildWorld(20261124); const sims = [new Sim(world, 0), new Sim(world, 1)]; const t0 = Date.now();
  for (let t = DAY0; t < 1028 - 1e-6; t += dt) for (const s of sims) s.step(dt);
  const ms = Date.now() - t0;
  for (const s of sims) { const v = s.view(); console.log('dt', dt, s.mode ? 'AI  ' : 'BASE', hhmm(s.t), 'wait', v.waitAvg.toFixed(2), 'maxQ', v.maxQ, 'nowQ', s.cp.map(c => c.q.length + '/' + Math.min(c.open, c.limit)).join(' '), 'lh', v.laneHours.toFixed(0), 'bagT', v.bagTime.toFixed(1), 'mis', v.mishandled.toFixed(1), 'clean', v.cleanFlights + '/' + v.closedFlights, 'pax', s.pax.length, 'bags', s.bags.length, 'ms', ms); }
}
