const world = buildWorld(20261124); const sims = [new Sim(world, 0), new Sim(world, 1)];
const marks = [445, 450, 455, 460, 465, 1005, 1020, 1030, 1040];
const t0 = Date.now();
for (let t = DAY0; t < 1041; t += 0.05) { for (const s of sims) s.step(0.05); const tt = Math.round(t * 20) / 20; if (marks.includes(tt)) { for (const s of sims) { const v = s.view(); console.log(hhmm(s.t), s.mode ? 'AI  ' : 'BASE', 'wait', v.waitAvg.toFixed(2), 'maxQ', v.maxQ, 'nowQ', s.cp.map(c => c.q.length + '/' + Math.min(c.open, c.limit)).join(' '), 'lh', v.laneHours.toFixed(0), 'bagT', v.bagTime.toFixed(1), 'mis', v.mishandled.toFixed(1), 'clean', v.cleanFlights + '/' + v.closedFlights, 'pax', s.pax.length, 'bags', s.bags.length, 'ms', Date.now() - t0); } } }
