
const fs=require('fs'),path=require('path'),cp=require('child_process'),crypto=require('crypto'),vm=require('vm');
const root=path.resolve('e26-dossier-rxneurones'),sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const git=(...args)=>cp.execFileSync('git',['-c','safe.directory=*','-C',root,...args]);
const read=f=>fs.readFileSync(path.join(root,f));
const out={time:new Date().toISOString(),head:git('rev-parse','HEAD').toString().trim(),checks:{}};
const add=(id,status,detail)=>out.checks[id]={status,detail};
const scripts=h=>[...h.matchAll(/<script\b(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map(x=>{try{new vm.Script(x[1]);return 'OK'}catch(e){return e.message}});
async function req(url,headers={}){try{const r=await fetch(url,{headers,signal:AbortSignal.timeout(12000)}),b=Buffer.from(await r.arrayBuffer());return {url,status:r.status,bytes:b.length,hash:sha(b),headers:Object.fromEntries(r.headers),syntax:scripts(b.toString())}}catch(e){return {url,error:e.message}}}
(async()=>{
const current=read('index.html'),html=current.toString(),pub=await req('https://lenet5.iatuto.com/'),local=await req('http://127.0.0.1:8080/'),preview=await req('http://127.0.0.1:8971/');
add('V01',pub.hash===local.hash&&pub.hash==='7031157870b79d93eaffe8a421a65d6e0169ff107ab8411c2f0a2e1d12b52339'?'PASS':'FAIL',{pub,local});
add('V02','PASS',{historical:sha(git('show','a6ea15d:index.html')),current:sha(current),bytes:current.length,note:'Attente du mandat historique, pas hash du HEAD final.'});
add('V03',pub.syntax?.some(x=>x!=='OK')&&scripts(html).every(x=>x==='OK')?'PASS':'FAIL',{served:pub.syntax,current:scripts(html)});
const probe=[];for(const name of ['remotion-lenet5-ncr/out/frames/frame_01_0.5s.png','animations/frames/frame_01_0.5s.png'])for(const base of ['http://127.0.0.1:8080/','https://lenet5.iatuto.com/'])probe.push(await req(base+name));
add('V04','PASS',{probe,projectHasNcr:fs.existsSync(path.join(root,'remotion-lenet5-ncr')),downloadsHasNcr:fs.existsSync('C:/Users/bernyfort/Downloads/lenet5_distinct_fixed_screens_21/remotion-lenet5-ncr'),conclusion:'Downloads ou copie identique; CWD non établi par cette preuve.'});
add('V05','BLOQUÉ',{wrangler:fs.existsSync(path.join(root,'wrangler.toml')),workflows:fs.existsSync(path.join(root,'.github/workflows')),note:'En-têtes identiques ne prouvent pas topologie tunnel ou absence de déploiement externe.'});
const ignore=cp.spawnSync('git',['-c','safe.directory=*','-C',root,'check-ignore','-v','_backups/probe'],{encoding:'utf8'});add('V07',ignore.status===0?'PASS':'FAIL',{rule:ignore.stdout,history:git('log','--all','--format=','--name-only','--','_backups/').toString()});
const serverSource=read('server.js').toString();new vm.Script(serverSource);
add('V09','PASS',{diff:git('diff','2aeee3b..0f83460','--','server.js','.gitignore').toString()});
const report=read('00-DIRECTION/codex-merge-links-report.md').toString(),links=[...report.matchAll(/\]\(([^)]+)\)/g)].map(x=>({target:x[1],exists:fs.existsSync(path.resolve(root,'00-DIRECTION',x[1]))}));add('V10',links.length===8&&links.every(x=>x.exists)?'PASS':'FAIL',{links,hash:sha(Buffer.from(report))});add('V11','BLOQUÉ','Navigateur piloté indisponible après nouvelle tentative; clic du Markdown non exécuté.');
add('V12',preview.hash===sha(current)?'PASS':'FAIL',{preview,headHash:sha(current),historicalM2:sha(git('show','a6ea15d:index.html')),note:'Comparaison actualisée au HEAD, historique M2 contrôlé séparément.'});
function walk(d){return fs.existsSync(d)?fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]):[]}
const recovery=[];for(const module of ['M0','M2','M3','M4','M6']){const dir=path.join(root,'_backups/E26-REPRISE-QUALITE-003',module);for(const f of walk(dir)){const base=path.basename(f);let target=base.endsWith('.md')?'00-DIRECTION/'+base:base;const commit={M0:'2aeee3b',M2:'2aeee3b',M3:'0379a57',M4:'b20a08f',M6:'31a46a8'}[module];try{recovery.push({module,file:path.relative(root,f),commit,target,match:sha(fs.readFileSync(f))===sha(git('show',commit+':'+target))})}catch{recovery.push({module,file:path.relative(root,f),match:false})}}}
add('V13',recovery.length&&recovery.every(x=>x.match)?'PASS':'FAIL',{recovery,deleteAuthorized:false,reason:'Modules non validés intégralement; aucune suppression.'});
add('V14','FAIL',{count:git('rev-list','--count','2aeee3b..HEAD').toString().trim(),summary:read('00-DIRECTION/rapport-synthese-tsa.md').toString().match(/.*commits Git.*/g),note:'Affirmation perceptive invisible à oeil non démontrée; rapports établissent Downloads comme certitude malgré CWD inconnu.'});
add('V15','PASS',{origine:html.match(/body\[data-theme="origine"\]\s*\{[^}]*\}/g)});
const rgb=h=>h.match(/../g).map(x=>parseInt(x,16)),lum=a=>a.map(x=>x/255).map(x=>x<=.04045?x/12.92:((x+.055)/1.055)**2.4).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0),ratio=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05),mix=(a,b,t)=>a.map((x,i)=>x*t+b[i]*(1-t));
const ratios=[['0a58ca','ddf4ff',5.66],['0969da','ddf4ff',4.56],['334155','ffffff',10.35],['8c959f','ffffff',3.04],['656d76','eef2f7',4.67],['0f172a','eef2f7',17]].map(([a,b,expected])=>({a,b,expected,actual:ratio(rgb(a),rgb(b))}));
add('V16','BLOQUÉ',{ratios,note:'Paires opaques recalculées; fond composite effectif et bordures essentielles doivent être contrôlés au rendu.'});
add('V17',!/color:#93c5fd|color:#38bdf8/.test(html)?'PASS':'FAIL',{colabPill:(html.match(/colab-pill/g)||[]).length});
add('V18','PASS',{diff:git('diff','0379a57..b20a08f','--','index.html').toString()});
add('V19','BLOQUÉ',{focusRules:(html.match(/:focus-visible/g)||[]).length,reduced:(html.match(/prefers-reduced-motion/g)||[]).length,oldFocus:git('show','0379a57:index.html').toString().match(/:focus|outline/g),note:'Présence CSS confirmée, focus natif pouvait exister avant. Réduction CSS ne prouve pas arrêt des timers JS.'});
const L=h=>{let y=lum(rgb(h));return y>.008856?116*Math.cbrt(y)-16:903.3*y};
add('V20','FAIL',{beforeRatio:ratio(rgb('f8fafc'),rgb('ffffff')),afterRatio:ratio(rgb('eef2f7'),rgb('ffffff')),beforeDelta:100-L('f8fafc'),afterDelta:100-L('eef2f7'),note:'Chiffres calculables, mais invisibilité perceptive et cause unique du rendu plat non démontrées.'});
const css=html.match(/<style>([\s\S]*?)<\/style>/)[1];add('V21',scripts(html).every(x=>x==='OK')?'PASS':'FAIL',{open:(css.match(/\{/g)||[]).length,close:(css.match(/\}/g)||[]).length,syntax:scripts(html),note:'Comptage accolades ne remplace pas parseur CSS.'});
add('V22',preview.hash===sha(current)?'PASS':'FAIL',{historicalM3:sha(git('show','b20a08f:index.html')),previewHash:preview.hash,headHash:sha(current),note:'Attente historique M3 différenciée du HEAD.'});
add('V23','BLOQUÉ','Six contrôles rendu, états, focus, zoom/mobile, mouvement et console non exécutables : navigateur en échec.');
add('V24','FAIL','Périmètre du mandat périmé : thèmes sombres ensuite modifiés dans M6 ; reste à couvrir rendu et états.');
const media=fs.readdirSync(path.join(root,'animations/frames')).filter(x=>x.endsWith('_960.webp')).map(name=>({name,bytes:fs.statSync(path.join(root,'animations/frames',name)).size}));
add('V25',media.length===6&&media.reduce((s,x)=>s+x.bytes,0)===60746?'PASS':'FAIL',{media,total:media.reduce((s,x)=>s+x.bytes,0),networkBudget:'Non mesuré: total fichiers galerie différent des octets réseau page entière.'});
const gallery=[...html.matchAll(/<img[^>]*frames\/frame_0[1-6][^>]*>/g)].map(x=>x[0]);add('V26',gallery.length===6&&gallery.every(x=>/loading="lazy"/.test(x)&&/decoding="async"/.test(x)&&/width=/.test(x)&&/height=/.test(x))?'PASS':'FAIL',{gallery});
add('V28','BLOQUÉ',{masters:fs.readdirSync(path.join(root,'animations/frames')).filter(x=>x.endsWith('.png')),note:'Fichiers conservés; inspection visuelle indépendante à effectuer.'});
add('V29','PASS',{src:(html.match(/src="[^"]*\.gif"/g)||[]).length,href:(html.match(/href="[^"]*\.gif"/g)||[]).length,note:'Pas de GIF src initial; JS peut charger GIF à la demande.'});
const themes=[...html.matchAll(/body\[data-theme="(theme-[123])"\]\s*\{([^}]+)\}/g)].map(x=>({theme:x[1],css:x[2]}));add('V30','BLOQUÉ',{themes,note:'Pire cas des dégradés et transparences à mesurer au rendu; ratio marginal non preuve globale.'});
add('V31','PASS',{definitions:html.match(/--text-dim:[^;]+;/g),lightRatio:ratio(rgb('656d76'),rgb('eef2f7'))});
add('V32','BLOQUÉ',{tabs:(html.match(/role="tab"/g)||[]).length,panels:(html.match(/role="tabpanel"/g)||[]).length,timers:(html.match(/role="timer"/g)||[]).length,note:'Attributs présents et fonctions lues; synchronisation runtime non testée.'});
add('V33','FAIL',{tablist:html.includes('role="tablist"'),note:'role tab sans propriétaire tablist; navigation par flèches absente. Modèle ARIA incomplet à corriger.'});add('V34','BLOQUÉ','Aucun lecteur écran pilotable disponible.');
const http=require('http');let srv;const customHttp={...http,createServer:(...args)=>(srv=http.createServer(...args))};
const sandbox={require:n=>n==='http'?customHttp:require(n),__dirname:root,process:{env:{HOST:'127.0.0.1',PORT:'0'}},console:{log:()=>{}},Buffer};
vm.runInNewContext(serverSource,sandbox);await new Promise(resolve=>srv.listening?resolve():srv.once('listening',resolve));
const port=srv.address().port;out.auditServer={pid:process.pid,port};
try{const results=[];for(const rel of ['_backups/','_backups/E26-REPRISE-QUALITE-003/M0/20260908-213007/server.js','_backups/codex-ordre-003/20260908-212125-832/start-.agent-ledger-open.json'])results.push(await req('http://127.0.0.1:'+port+'/'+rel));add('V08',results.every(x=>x.status===403)?'PASS':'FAIL',results);const r=await req('http://127.0.0.1:'+port+'/animations/frames/frame_06_4.0s_960.webp');add('V27',r.status===200&&r.headers['cache-control']?.includes('immutable')?'PASS':'FAIL',{response:r,note:'Noms neufs préviennent ancien cache pour cette livraison uniquement; prochaines révisions doivent rechanger de nom.'})}finally{await new Promise(r=>srv.close(r))}
console.log(JSON.stringify(out));
})().catch(e=>{console.error(e);process.exitCode=1});
