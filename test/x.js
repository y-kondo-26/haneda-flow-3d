const world = buildWorld(20261124); const s = new Sim(world, 1); let f = null;
for (let t = DAY0; t < 1140; t += 0.05) {
  if (!f && t >= 1028) { f = addExtraFlight(world, t); s.scenarioExtra(f); console.log('extra', f.code, 'dep', hhmm(f.dep), 'gate', f.gate, 'lat', f.lateralFix, 'xb', f.xb.length); }
  s.step(0.05);
  const tt = Math.round(t * 20) / 20;
  if (f && tt % 6 === 0) { const fs = s.flightState(f.id), L = s.lat[f.lateralFix]; console.log(hhmm(tt), 'in', fs.bagsIn, 'ebs', fs.ebsN || 0, 'opened', fs.opened, 'latF', L.f, 'latN', L.n, 'res', L.res, 'train', fs.train ? fs.train.st + ':' + fs.train.bags.length : (fs.req ? 'req' : '-'), 'sent', fs.trainsSent, 'onWay', fs.onWay, 'loaded', fs.bagsLoaded, 'lost', fs.lostN, 'final', fs.finalSent, 'tugs', s.tugs.map(t => t.st).join(''), 'reqs', s.tugReq.length); }
}
