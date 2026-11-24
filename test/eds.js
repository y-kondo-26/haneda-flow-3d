const world = buildWorld(20261124); const sims = [new Sim(world, 0), new Sim(world, 1)];
let did = false;
for (let t = DAY0; t < 1028 + 70; t += 0.05) {
  if (!did && t >= 1028) { did = true; for (const s of sims) s.scenarioEds(1, 45); }
  for (const s of sims) s.step(0.05);
  const tt = Math.round(t * 20) / 20;
  if (tt >= 1026 && tt % 4 === 0) console.log(hhmm(tt), sims.map(s => (s.mode ? 'AI ' : 'BASE ') + 'q ' + s.eds.map(e => e.q.length + '(' + e.n + ')').join(' ') + ' indQ ' + s.eds.map(e => e.indQ.length).join(',') + ' loop ' + s.loopN + ' in15 ' + s.kpi.bagArr[s.bin15()]).join('  |  '));
}
