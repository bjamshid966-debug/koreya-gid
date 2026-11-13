(() => {
const $ = s => document.querySelector(s), fmt = n => Math.round(n).toLocaleString('uz-UZ').replace(/,/g,' ');
const COL = ['#3d63d8','#d6402f','#e8b830','#2fb596'];

// ---------- places ----------
const P = [
['Gyeongbokgung saroyi','Seul','Tarix','Joseon podshohlari saroyi. Hanbok kiysangiz, kirish bepul bo‘lishi mumkin.','Kirish ~3 000₩'],
['Hongdae va Myeongdong','Seul','Ko‘cha hayoti','Yoshlar ko‘chasi, musiqa, kosmetika do‘konlari va ko‘cha taomlari.','Bepul, taom 3 000–8 000₩'],
['N Seoul Tower (Namsan)','Seul','Manzara','Shaharning eng yaxshi panoramasi. Kechqurun chiroqlar chiroyli.','Ichkariga alohida chipta'],
['Han daryosi parklari','Seul','Dam olish','Piknik, velosiped, konbinidan ramyun pishirish an’anasi.','Bepul'],
['Bukchon Hanok qishlog‘i','Seul','An’anaviy','Eski koreys uylari. Aholi yashaydi, shovqin qilmang.','Bepul'],
['Haeundae va Gwangalli','Busan','Dengiz','Koreyaning eng mashhur plyajlari va kechki dengiz manzarasi.','Bepul'],
['Gamcheon madaniyat qishlog‘i','Busan','San’at','Tog‘ yonbag‘ridagi rangli uylar va devor rasmlari.','Bepul, xarita ~2 000₩'],
['Haedong Yonggungsa','Busan','Ma’bad','Dengiz bo‘yida joylashgan kam uchraydigan buddist ma’bad.','Bepul yoki arzon'],
['Jagalchi baliq bozori','Busan','Taom','Yangi dengiz mahsulotlari, shu yerning o‘zida pishirib berishadi.','Taom 15 000₩ dan'],
['Jeju oroli','Jeju','Tabiat','Hallasan tog‘i, Seongsan Ilchulbong krateri, sohil yo‘llari. Mashina ijarasi qulay.','Avia ~40–100 ming₩'],
['Gyeongju','Boshqa','Tarix','Silla davlatining qadimiy poytaxti: Bulguksa ma’badi, qirol qabrlari.','Kirishlar 5 000₩ atrofida'],
['Jeonju Hanok qishlog‘i','Boshqa','Taom','Bibimbap vatani. Hanok uylar va an’anaviy choyxonalar.','Bepul, taom 10 000₩ dan'],
['Seoraksan va Sokcho','Boshqa','Tog‘lar','Milliy bog‘, piyoda yo‘llar, kuzda eng chiroyli.','Bog‘ kirishi arzon'],
['Andong Hahoe qishlog‘i','Boshqa','UNESCO','Joseon davridan saqlangan an’anaviy qishloq.','Kirish ~5 000₩'],
['Suncheon Bay','Boshqa','Tabiat','Qamishzor va botqoq yo‘llari, qushlar. Kuzda zarhal rang.','Kirish ~10 000₩'],
['Incheon: Xitoy shahri','Boshqa','Madaniyat','Aeroportga yaqin. Jajangmyeon lapshasi shu yerda paydo bo‘lgan.','Taom 7 000₩ dan'],
['Daegu va DMZ (Paju)','Boshqa','Tarix','Daegu bozorlari va tog‘lari. DMZ ekskursiyasiga oldindan yozilish va pasport kerak.','DMZ tur ~50–90 ming₩']];
const regs = ['Hammasi','Seul','Busan','Jeju','Boshqa'];
const chips = $('#chips'), pl = $('#places');
function showP(r){ chips.querySelectorAll('button').forEach(b => b.classList.toggle('on', b.textContent===r));
  pl.innerHTML = P.filter(p => r==='Hammasi'||p[1]===r).map((p,i)=>`<article class="card" style="--c:${COL[regs.indexOf(p[1])%4]}"><span class="tag">${p[1]} · ${p[2]}</span><h3>${p[0]}</h3><p>${p[3]}</p><div class="cost">${p[4]}</div></article>`).join(''); }
regs.forEach(r => { const b = document.createElement('button'); b.textContent = r; b.onclick = () => showP(r); chips.append(b); });
showP('Hammasi');

// ---------- rates + budget ----------
const rK = $('#r-krw'), rU = $('#r-uzs');
const B = [['Yotoqxona / ijara','500000','Goshiwon ~300–500 ming, yakka xona qimmatroq (depozit alohida)'],['Ovqat','400000','Univ. oshxonasi 4–6 ming₩, restoran 8–12 ming₩'],['Transport','70000','Metro/avtobus kartasi'],['Telefon va boshqa','150000','SIM, kiyim, ko‘ngilochar']];
$('#budget').innerHTML = B.map((b,i)=>`<div class="row"><div>${b[0]}<small>${b[2]}</small></div><input type="number" class="bi" value="${b[1]}" step="10000"></div>`).join('');
function calc(){ const t = [...document.querySelectorAll('.bi')].reduce((s,e)=>s+(+e.value||0),0), usd = t/(+rK.value||1);
  $('#b-krw').textContent = fmt(t); $('#b-usd').textContent = fmt(usd); $('#b-uzs').textContent = fmt(usd*(+rU.value||0)); }
document.querySelectorAll('.bi,#r-krw,#r-uzs').forEach(e => e.addEventListener('input', calc)); calc();
const S = [['Suv 0.5 l','1 000₩','500–800₩'],['Uchburchak kimbap','1 200–1 800₩','1 000–1 500₩'],['Instant ramyun (1)','1 200–1 800₩','800–1 100₩'],['Tuxum (10 ta)','4 500₩','3 500–5 000₩'],['Sut 1 l','3 000₩','2 500–3 000₩'],['Kofe (Americano)','kafe 3 500–5 500₩','konbini 1 500–2 500₩'],['Soju (1 shisha)','2 000–2 500₩','1 600–2 200₩'],['Sheet maska (1)','Olive Young 1 500–3 000₩','online ko‘pincha arzonroq']];
$('#shop').innerHTML = S.map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('');

// ---------- top 40 ----------
const T = `Shin Ramyun (5 dona)|Oziq-ovqat|4000|5500
Buldak lapsha (5 dona)|Oziq-ovqat|5000|7000
Kimchi (1 kg)|Oziq-ovqat|8000|15000
Gim, dengiz o‘ti (paket)|Oziq-ovqat|3000|10000
Gochujang sousi|Oziq-ovqat|4000|8000
Banan sut (Binggrae)|Oziq-ovqat|1500|2200
Choco Pie (12 dona)|Oziq-ovqat|3000|5000
Honey Butter chips|Oziq-ovqat|2000|2800
Tteokbokki (instant)|Oziq-ovqat|3500|5500
Pepero|Oziq-ovqat|1500|2500
Uchburchak kimbap|Oziq-ovqat|1200|2000
Maxim kofe aralashmasi|Oziq-ovqat|15000|22000
Yuja choyi|Oziq-ovqat|6000|12000
Soju|Oziq-ovqat|1800|2500
Makgeolli|Oziq-ovqat|2000|4000
Qizil jenshen choyi|Sog‘liq|15000|60000
Jenshen ekstrakti|Sog‘liq|30000|150000
Vitamin va dori-darmon (dorixona)|Sog‘liq|5000|40000
Sheet maska (10 dona)|Go‘zallik|10000|18000
Quyosh kremi|Go‘zallik|15000|28000
Cushion tonal krem|Go‘zallik|20000|40000
Lip tint|Go‘zallik|5000|15000
Salyangoz musini essence|Go‘zallik|15000|30000
Centella krem|Go‘zallik|15000|30000
Toner pad|Go‘zallik|15000|25000
Qo‘l kremi|Go‘zallik|5000|15000
Lab balzami|Go‘zallik|3000|8000
Pimple patch|Go‘zallik|3000|7000
Soch uchun maska/shampun|Go‘zallik|10000|18000
K-pop albomi|Esdalik|20000|30000
Fotokarta|Esdalik|3000|10000
Telefon g‘ilofi|Esdalik|8000|20000
Magnit va esdalik buyumlari|Esdalik|3000|8000
Kanselyariya (Monami, Morning Glory)|Esdalik|1000|5000
Uniqlo / Spao kiyimlari|Kiyim va uy|15000|50000
Daiso uy buyumlari|Kiyim va uy|1000|5000
Lock&Lock idishlari|Kiyim va uy|8000|20000
Termos / stakan|Kiyim va uy|10000|30000
Power bank|Elektronika|15000|35000
Simsiz quloqchin (Samsung va boshqalar)|Elektronika|60000|200000`.split('\n').map((l,i)=>{const a=l.split('|');return {i,n:a[0],c:a[1],lo:+a[2],hi:+a[3]}});
const cats = ['Hammasi',...new Set(T.map(t=>t.c))]; $('#cat').innerHTML = cats.map(c=>`<option>${c}</option>`).join('');
function top(){ const q = $('#q').value.toLowerCase(), c = $('#cat').value, s = $('#sort').value;
  let a = T.filter(t => (c==='Hammasi'||t.c===c) && t.n.toLowerCase().includes(q));
  if (s==='lo') a.sort((x,y)=>x.lo-y.lo); if (s==='hi') a.sort((x,y)=>y.hi-x.hi);
  $('#top').innerHTML = a.map(t=>`<li style="--c:${COL[cats.indexOf(t.c)%4]}"><span>${t.n}<em>${t.c}</em></span><b>${fmt(t.lo)}–${fmt(t.hi)}₩</b></li>`).join('') || '<li>Hech narsa topilmadi</li>'; }
['q','cat','sort'].forEach(id => $('#'+id).addEventListener('input', top)); top();
console.assert(T.length===40,'top list must have 40 items');

// ---------- jobs ----------
const J = [['Repetitor (ingliz, rus, o‘zbek tili)','25 000–50 000₩/soat','Eng yuqori daromad, til bilishingiz kerak','#e8b830'],['Tarjimon / tarjima yordamchisi','15 000–30 000₩/soat','O‘zbek-koreys tarjimalar, talab bor','#e8b830'],['Universitet laboratoriyasi / kutubxona','~10 320₩+/soat','Kampusda, jadval qulay, ruxsat olish osonroq','#2fb596'],['Kafe / barista','~10 320₩+/soat','Eng ko‘p uchraydi, koreys tili foydali','#3d63d8'],['Restoran va ofitsiant','~10 320₩+/soat','Dam olish kunlari ish ko‘p, ba’zan chaychova olinadi','#3d63d8'],['Konbini','~10 320₩+/soat','Ba’zi vaqt cheklovlari bor, avval tekshiring','#d6402f'],['Mehmonxona va hostel yordamchisi','~10 320₩+/soat','Turistlar bilan ishlaysiz, ingliz tili kerak','#2fb596'],['Ofis yordamchisi','~10 320₩+/soat','Koreys tili yaxshi bo‘lsa, ta’tilda ham chiqadi','#d6402f']];
$('#jobs').innerHTML = J.map(j=>`<article class="card" style="--c:${j[3]}"><h3>${j[0]}</h3><div class="cost">${j[1]}</div><p>${j[2]}</p></article>`).join('');
const w = $('#w'), h = $('#h'); function inc(){ $('#hv').textContent = h.value; $('#inc').textContent = fmt((+w.value||0)*h.value*4.3); }
w.oninput = h.oninput = inc; inc();

// ---------- steps (checklist saved in localStorage) ----------
const ST = [['Maqsadni tanlang','Sayohat, til kursi (D-4), universitet (D-2) yoki ish (E-9) yo‘nalishidan birini tanlang.'],['Universitet va stipendiya','studyinkorea.go.kr orqali universitet tanlang. Davlat stipendiyalari (GKS) bor, muddatlarini kuzating.'],['Til: TOPIK','Koreys tili sertifikati ko‘pincha kerak va ishlash soatlaringizga ham ta’sir qiladi.'],['Hujjatlar','Pasport, diplom/attestat, qabul xati, moliyaviy kafolat (bank hisobi), fotosurat. Tarjima va tasdiq talab qilinishi mumkin.'],['Viza arizasi','Koreya Respublikasining Toshkentdagi elchixonasi talablariga qarang. Muddatlar va narx o‘zgaradi.'],['Kelgach','Belgilangan muddat ichida chet el fuqarosi kartasini (ARC) oling, manzil, bank va ish ruxsatini rasmiylashtiring.']];
let done = []; try { done = JSON.parse(localStorage.getItem('kg-steps')||'[]'); } catch(e){}
$('#steps').innerHTML = ST.map((s,i)=>`<li class="${done.includes(i)?'done':''}"><label><input type="checkbox" data-i="${i}" ${done.includes(i)?'checked':''}><span><h3>${s[0]}</h3><p>${s[1]}</p></span></label></li>`).join('');
$('#steps').addEventListener('change', e => { const i = +e.target.dataset.i; e.target.closest('li').classList.toggle('done', e.target.checked);
  done = e.target.checked ? [...new Set([...done,i])] : done.filter(x=>x!==i); try { localStorage.setItem('kg-steps', JSON.stringify(done)); } catch(e){} });

// ---------- phrases + speech ----------
const F = [['안녕하세요','Annyonghaseyo','Assalomu alaykum'],['감사합니다','Kamsahamnida','Rahmat'],['얼마예요?','Olmayeyo?','Qancha turadi?'],['화장실이 어디예요?','Hwajangsiri odiyeyo?','Hojatxona qayerda?'],['도와주세요','Dowajuseyo','Yordam bering'],['영어 할 수 있어요?','Yongo hal su isseyo?','Inglizcha bilasizmi?'],['이거 주세요','Igo juseyo','Mana buni bering'],['맛있어요','Mashisseyo','Mazali']];
$('#phr').innerHTML = F.map((f,i)=>`<article class="card phr" style="--c:${COL[i%4]}"><div class="ko">${f[0]}</div><p>${f[1]}<br><b>${f[2]}</b></p><button data-s="${f[0]}" aria-label="Tinglash">Tinglash</button></article>`).join('');
$('#phr').addEventListener('click', e => { const t = e.target.dataset.s; if (!t || !window.speechSynthesis) return; const u = new SpeechSynthesisUtterance(t); u.lang = 'ko-KR'; speechSynthesis.cancel(); speechSynthesis.speak(u); });

// ---------- count-up ----------
const io = new IntersectionObserver(es => es.forEach(e => { if (!e.isIntersecting) return; io.unobserve(e.target); const n = +e.target.dataset.n, t0 = performance.now();
  (function f(t){ const p = Math.min((t-t0)/1200,1); e.target.textContent = Math.round(n*p); if (p<1) requestAnimationFrame(f); })(t0); }));
document.querySelectorAll('[data-n]').forEach(e => io.observe(e));

// ---------- petals canvas ----------
const cv = $('#petals'), c = cv.getContext('2d'); let W, H, sy = 0;
const size = () => { W = cv.width = innerWidth; H = cv.height = innerHeight; }; addEventListener('resize', size); size();
addEventListener('scroll', () => sy = scrollY);
const pet = Array.from({length: 38}, () => ({x:Math.random()*2000,y:Math.random()*1200,s:4+Math.random()*7,v:.3+Math.random()*.7,r:Math.random()*6,d:Math.random()*2-1}));
const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
(function loop(){ c.clearRect(0,0,W,H);
  for (const p of pet){ if (!still){ p.y += p.v + Math.abs(sy%400)*.0006; p.x += p.d*.5+.25; p.r += .01; }
    if (p.y>H+20){ p.y=-20; p.x=Math.random()*W; } if (p.x>W+20) p.x=-20;
    c.save(); c.translate(p.x%W,p.y); c.rotate(p.r); c.fillStyle='rgba(240,150,170,.45)'; c.beginPath(); c.ellipse(0,0,p.s,p.s*.55,0,0,6.283); c.fill(); c.restore(); }
  requestAnimationFrame(loop); })();
})();
