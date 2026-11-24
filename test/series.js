const world = buildWorld(+(process.argv[2] || 20261124)); const sims = [new Sim(world, 0), new Sim(world, 1)];
const snap = [];
for (let t = DAY0; t < DAY1 - 0.01; t += 0.05) { for (const s of sims) s.step(0.05); }
const k0 = sims[0].kpi, k1 = sims[1].kpi;
for (let b = 0; b < NB; b++) console.log(hhmm(DAY0 + b * 15), 'arr', String(k0.arrivals[b]).padStart(4), 'bags', String(k0.bagArr[b]).padStart(4),
  '| wait', (k0.waitSum[b] / Math.max(1, k0.waitN[b])).toFixed(1).padStart(5), (k1.waitSum[b] / Math.max(1, k1.waitN[b])).toFixed(1).padStart(5),
  '| qmax', String(k0.qMaxSeries[b]).padStart(4), String(k1.qMaxSeries[b]).padStart(4), '| lanes', (k0.laneSeries[b] / 15).toFixed(1).padStart(5), (k1.laneSeries[b] / 15).toFixed(1).padStart(5),
  '| bagT', (k0.bagSeries[b] / Math.max(1, k0.bagSeriesN[b])).toFixed(1).padStart(5), (k1.bagSeries[b] / Math.max(1, k1.bagSeriesN[b])).toFixed(1).padStart(5), '| miss', k0.missSeries[b], k1.missSeries[b]);
