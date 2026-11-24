for (const ex of [0]) for (const seed of [20261124, 7, 4242]) {
  P.ai.extraLanes = ex; const world = buildWorld(seed); const sims = [new Sim(world, 0), new Sim(world, 1)]; let line = 'extra ' + ex + ' seed ' + seed + ': ';
  for (let t = DAY0; t < DAY1 - 0.01; t += 0.05) { for (const s of sims) s.step(0.05); const tt = Math.round(t * 20) / 20; if ((tt % 120 === 0 || tt === 490) && tt > 300) { const a = sims[0].view(), b = sims[1].view(); line += hhmm(tt) + ' ' + a.laneHours.toFixed(0) + '/' + b.laneHours.toFixed(0) + ' w' + a.waitAvg.toFixed(1) + '/' + b.waitAvg.toFixed(1) + ' | '; } }
  const a = sims[0].view(), b = sims[1].view();
  console.log(line + ' END max ' + a.waitMax.toFixed(0) + '/' + b.waitMax.toFixed(0) + ' Q ' + a.maxQ + '/' + b.maxQ);
}
