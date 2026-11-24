function run(seed, roster, margin) {
  P.roster = roster; P.ai.margin = margin;
  const world = buildWorld(seed); const sims = [new Sim(world, 0), new Sim(world, 1)];
  for (let t = DAY0; t < DAY1 - 0.01; t += 0.05) for (const s of sims) s.step(0.05);
  return sims.map(s => { const v = s.view(); return `w ${v.waitAvg.toFixed(2)} max ${v.waitMax.toFixed(0)} Q ${v.maxQ} lh ${v.laneHours.toFixed(0)} mis ${v.mishandled.toFixed(1)} cl ${v.clean.toFixed(0)} bt ${v.bagTime.toFixed(1)}`; });
}
for (const [ro, mg] of [[[1.0, 0], 1.2], [[0.92, 0], 1.2], [[0.92, 0], 1.3], [[0.85, 0.1], 1.3]]) {
  for (const seed of [20261124, 7, 4242]) { const r = run(seed, ro, mg); console.log(JSON.stringify(ro), mg, 'seed', seed, '| BASE', r[0], '| AI', r[1]); }
}
