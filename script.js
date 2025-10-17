const teams = ['Los Aliens','Los Galaticos','Fc Revolution','Hydra'];

// initial results (includes scorers where provided)
const initialMatches = [
  // Round 1: Los Aliens 3 - Hydra 3
  { round: 1, home: 'Los Aliens', away: 'Hydra', homeGoals: 3, awayGoals: 3,
    homeScorers: ['Vitor Soares', 'Felipe Vieira', 'Jean'],
    awayScorers: []
  },
  // Round 1: Los Galaticos 9 - Fc Revolution 6
  { round: 1, home: 'Los Galaticos', away: 'Fc Revolution', homeGoals: 9, awayGoals: 6,
    // Rodada 1 - 3 joao gabriel, 2 neto, 1 berbel, 1 manhaes, 1 luiz e 1 ghesti
    homeScorers: ['Joao Gabriel x3', 'Neto x2', 'Berbel', 'Manhaes', 'Luiz', 'Ghesti'],
    awayScorers: []
  },
  // Round 2: Los Aliens 5 - Fc Revolution 1
  { round: 2, home: 'Los Aliens', away: 'Fc Revolution', homeGoals: 5, awayGoals: 1,
    // Jean - 2 gol, Pedrin -1, Ryan -1, Alisson -1 (rodada 2)
    homeScorers: ['Jean x2', 'Pedrin', 'Ryan', 'Alisson'],
    awayScorers: []
  },
  // Round 2: Los Galaticos 3 - Hydra 2
  { round: 2, home: 'Los Galaticos', away: 'Hydra', homeGoals: 3, awayGoals: 2,
    // Rodada 2 - 2 rud e 1 manhaes
    homeScorers: ['Rud x2', 'Manhaes'],
    awayScorers: []
  },
];

let matches = [];

// map team names to image files (local images expected)
const teamLogos = {
  'Los Aliens': 'Aliens.jpg',
  'Los Galaticos': 'Los Gala.jpg',
  'Fc Revolution': 'Fc Rev.jpg',
  'Hydra': 'HYdra.jpg',
};

const teamColors = {
  'Los Aliens': '#0ea5a4',
  'Los Galaticos': '#ec4899',
  'Fc Revolution': '#f59e0b',
  'Hydra': '#94a3b8',
};

function initials(name){
  if (!name) return '';
  return name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
}

// parse a scorer string like 'Jean x2' or 'Joao Gabriel x3' or just 'Jean'
function parseScorerString(s){
  if(!s) return { name:'', count:0 };
  let str = String(s).trim();
  // remove any ball emojis anywhere and count them
  const balls = (str.match(/⚽/g) || []).length;
  str = str.replace(/⚽/g, '').trim();
  // explicit 'xN' pattern
  const m = str.match(/^(.*)\s+x(\d+)$/i);
  if(m){ return { name: m[1].trim(), count: parseInt(m[2],10) || (balls||1) }; }
  // trailing number like 'Name 2'
  const m2 = str.match(/^(.*)\s+(\d+)$/);
  if(m2){ return { name: m2[1].trim(), count: parseInt(m2[2],10) || (balls||1) }; }
  // if we detected emoji count, use it
  if(balls>0) return { name: str, count: balls };
  return { name: str, count: 1 };
}

const STORAGE_KEY = 'kings_matches_v1';

function saveMatchesToStorage(){
  try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(matches)); }catch(e){ console.warn('save error',e); }
}

function loadMatchesFromStorage(){
  try{ const raw = localStorage.getItem(STORAGE_KEY); if(!raw) return null; return JSON.parse(raw); }catch(e){ console.warn('load error',e); return null; }
}

window.addMatch = function(m){ if(!m) return; if(!m.round) m.round=3; matches.push(m); saveMatchesToStorage(); renderMatches(); renderTable(); }
window.clearMatchesStorage = function(){ localStorage.removeItem(STORAGE_KEY); location.reload(); }

// Helpers to modify scorers from console
// addScorer(matchIdx, 'home'|'away', name, count=1)
window.addScorer = function(matchIdx, side, name, count){
  if(typeof matchIdx === 'object' && matchIdx !== null){ // allow passing match object
    const m = matchIdx; matchIdx = matches.indexOf(m);
  }
  if(typeof matchIdx === 'undefined' || matchIdx === null) return console.warn('matchIdx required');
  const m = matches[matchIdx]; if(!m) return console.warn('match not found', matchIdx);
  side = (side||'home').toLowerCase(); if(!name) return console.warn('name required'); count = parseInt(count||1,10)||1;
  const scorerStr = (count>1) ? `${name} x${count}` : String(name);
  if(side === 'home') m.homeScorers = (m.homeScorers||[]).concat([scorerStr]);
  else m.awayScorers = (m.awayScorers||[]).concat([scorerStr]);
  saveMatchesToStorage(); renderMatches(); renderTable(); renderArtilharia();
  console.log('added scorer', scorerStr, 'to', m.home, 'vs', m.away);
}

// removeScorer(matchIdx, 'home'|'away', name) - removes all matching name entries
window.removeScorer = function(matchIdx, side, name){
  if(typeof matchIdx === 'object' && matchIdx !== null){ const m = matchIdx; matchIdx = matches.indexOf(m); }
  if(typeof matchIdx === 'undefined' || matchIdx === null) return console.warn('matchIdx required');
  const m = matches[matchIdx]; if(!m) return console.warn('match not found', matchIdx);
  side = (side||'home').toLowerCase(); if(!name) return console.warn('name required');
  const filterFn = s => { const p = parseScorerString(s); return p.name.toLowerCase() !== String(name).toLowerCase(); };
  if(side === 'home') m.homeScorers = (m.homeScorers||[]).filter(filterFn);
  else m.awayScorers = (m.awayScorers||[]).filter(filterFn);
  saveMatchesToStorage(); renderMatches(); renderTable(); renderArtilharia();
  console.log('removed scorer', name, 'from', m.home, 'vs', m.away);
}

window.listScorers = function(matchIdx){ if(typeof matchIdx === 'undefined') return console.log('pass matchIdx'); const m = matches[matchIdx]; if(!m) return console.warn('match not found'); console.log('homeScorers', m.homeScorers||[]); console.log('awayScorers', m.awayScorers||[]); }

function createEmptyTable(){ const t = {}; teams.forEach(name=> t[name] = { name, played:0,wins:0,draws:0,losses:0,goalsFor:0,goalsAgainst:0,points:0 }); return t; }

function computeTable(matchList){
  const table = createEmptyTable();
  matchList.forEach(m=>{
    const a = table[m.home]; const b = table[m.away];
    if(!a||!b) return;
    a.played++; b.played++;
    a.goalsFor += (m.homeGoals||0); a.goalsAgainst += (m.awayGoals||0);
    b.goalsFor += (m.awayGoals||0); b.goalsAgainst += (m.homeGoals||0);
    if((m.homeGoals||0) > (m.awayGoals||0)){ a.wins++; a.points+=3; b.losses++; }
    else if((m.homeGoals||0) < (m.awayGoals||0)){ b.wins++; b.points+=3; a.losses++; }
    else { a.draws++; b.draws++; a.points+=1; b.points+=1; }
  });
  Object.values(table).forEach(r=> r.goalDiff = r.goalsFor - r.goalsAgainst);
  return Object.values(table).sort((x,y)=> (y.points-x.points) || (y.goalDiff-x.goalDiff) || (y.goalsFor-x.goalsFor));
}

function renderTable(){
  const body = document.getElementById('table-body'); if(!body) return; body.innerHTML='';
  const rows = computeTable(matches);
  rows.forEach((r,i)=>{
    const tr = document.createElement('tr');
    const tdPos = document.createElement('td'); tdPos.textContent = i+1; tr.appendChild(tdPos);
    const tdTeam = document.createElement('td'); const wrap = document.createElement('div'); wrap.className='table-team';
    const img = document.createElement('img'); img.src = teamLogos[r.name] || ''; img.alt = r.name; img.className='team-badge';
    const fallback = document.createElement('div'); fallback.className='team-badge'; fallback.style.display='none'; fallback.style.alignItems='center'; fallback.style.justifyContent='center'; fallback.style.color='#fff'; fallback.style.fontWeight='700'; fallback.style.background = teamColors[r.name] || '#334155'; fallback.textContent = initials(r.name);
    img.onload = ()=>{ fallback.style.display='none'; img.style.display=''; }; img.onerror = ()=>{ img.style.display='none'; fallback.style.display='flex'; };
    wrap.appendChild(img); wrap.appendChild(fallback); const nameSpan = document.createElement('span'); nameSpan.textContent = r.name; wrap.appendChild(nameSpan);
    tdTeam.appendChild(wrap); tr.appendChild(tdTeam);
    const stats = [r.played,r.wins,r.draws,r.losses,r.goalsFor,r.goalsAgainst,r.goalDiff,r.points]; stats.forEach(s=>{ const td=document.createElement('td'); td.textContent = s; tr.appendChild(td); });
    body.appendChild(tr);
  });
}

// Build artilharia (scorers table) from matches
function aggregateScorersByRound(matchList){
  const byRound = {}; // round -> { name -> count }
  matchList.forEach(m=>{
    const add = (arr, rnd)=>{
      if(!arr || !arr.length) return;
      if(!byRound[rnd]) byRound[rnd] = {};
      arr.forEach(s=>{
        const p = parseScorerString(s);
        if(!p.name) return;
        byRound[rnd][p.name] = (byRound[rnd][p.name]||0) + (p.count||1);
      });
    };
    add(m.homeScorers, m.round);
    add(m.awayScorers, m.round);
  });
  return byRound;
}

function renderArtilharia(){
  const container = document.getElementById('artilharia-table-container'); if(!container) return;
  container.innerHTML = '';
  const byRound = aggregateScorersByRound(matches);
  const rounds = Object.keys(byRound).map(r=>parseInt(r,10)).sort((a,b)=>a-b);
  if(!rounds.length){ container.innerHTML = '<p class="muted">Sem dados de artilharia</p>'; return; }
  // compute overall totals
  const totals = {};
  rounds.forEach(r=>{
    const map = byRound[r];
    Object.keys(map).forEach(name=>{ totals[name] = (totals[name]||0) + map[name]; });
  });
  const title = document.createElement('h3'); title.textContent = 'Artilharia Geral'; container.appendChild(title);
  const tableAll = document.createElement('table'); tableAll.className = 'art-table total';
  const theadAll = document.createElement('thead'); theadAll.innerHTML = '<tr><th>Jogador</th><th>Gols</th></tr>'; tableAll.appendChild(theadAll);
  const tbodyAll = document.createElement('tbody');
  const overall = Object.keys(totals).map(n=>({name:n,g:totals[n]})).sort((a,b)=>b.g-a.g||a.name.localeCompare(b.name));
  if(overall.length === 0){ container.innerHTML = '<p class="muted">Sem dados de artilharia</p>'; return; }
  // find max goals
  const maxG = overall[0].g;
  overall.forEach(it=>{
    const tr = document.createElement('tr'); const tdn = document.createElement('td'); tdn.textContent = it.name; const tdg = document.createElement('td'); tdg.textContent = it.g; tr.appendChild(tdn); tr.appendChild(tdg);
    // highlight only the top scorers (if multiple share maxG, all are highlighted)
    if(it.g === maxG) tr.classList.add('tied');
    tbodyAll.appendChild(tr);
  });
  tableAll.appendChild(tbodyAll); container.appendChild(tableAll);
}

// render matches
function renderMatches(){
  document.querySelectorAll('.round-card').forEach(card=>{ const ul = card.querySelector('.match-list'); if(ul) ul.innerHTML=''; });
  matches.forEach((m, idx)=>{
    const card = document.getElementById(`round-${m.round}`); if(!card) return; const ul = card.querySelector('.match-list'); if(!ul) return;
    const li = document.createElement('li'); li.className='match-item'; li.dataset.matchIdx = idx;
    const left = document.createElement('div'); left.className='team-block'; const right = document.createElement('div'); right.className='team-block';
    // home
    const imgA = document.createElement('img'); imgA.className='team-badge'; imgA.src = teamLogos[m.home] || ''; imgA.alt = m.home;
    const fallbackA = document.createElement('div'); fallbackA.className='team-badge'; fallbackA.style.display='none'; fallbackA.style.alignItems='center'; fallbackA.style.justifyContent='center'; fallbackA.style.color='#fff'; fallbackA.style.fontWeight='700'; fallbackA.style.background = teamColors[m.home] || '#334155'; fallbackA.textContent = initials(m.home);
    imgA.onload = ()=>{ fallbackA.style.display='none'; imgA.style.display=''; }; imgA.onerror = ()=>{ imgA.style.display='none'; fallbackA.style.display='flex'; };
    const spanA = document.createElement('span'); spanA.textContent = m.home; left.appendChild(imgA); left.appendChild(fallbackA); left.appendChild(spanA);
    // away
    const imgB = document.createElement('img'); imgB.className='team-badge'; imgB.src = teamLogos[m.away] || ''; imgB.alt = m.away;
    const fallbackB = document.createElement('div'); fallbackB.className='team-badge'; fallbackB.style.display='none'; fallbackB.style.alignItems='center'; fallbackB.style.justifyContent='center'; fallbackB.style.color='#fff'; fallbackB.style.fontWeight='700'; fallbackB.style.background = teamColors[m.away] || '#334155'; fallbackB.textContent = initials(m.away);
    imgB.onload = ()=>{ fallbackB.style.display='none'; imgB.style.display=''; }; imgB.onerror = ()=>{ imgB.style.display='none'; fallbackB.style.display='flex'; };
    const spanB = document.createElement('span'); spanB.textContent = m.away; right.appendChild(imgB); right.appendChild(fallbackB); right.appendChild(spanB);
    const score = document.createElement('div'); score.className='score'; score.textContent = `${m.homeGoals || 0} - ${m.awayGoals || 0}`;
    li.appendChild(left); li.appendChild(score); li.appendChild(right); ul.appendChild(li);
  });
}

// delegated click handler
if(!window._matchDelegationInit){
  document.addEventListener('click', (e)=>{
    const li = e.target.closest && e.target.closest('.match-item'); if(!li) return; const idx = li.dataset.matchIdx; if(typeof idx === 'undefined') return; const match = matches[parseInt(idx,10)]; if(!match) return; openSimpleModal(match);
  });
  window._matchDelegationInit = true;
}

// Simple modal
function openSimpleModal(match){
  const modal = document.getElementById('match-modal'); if(!modal) return; const backdrop = document.getElementById('simple-backdrop'); const closeBtn = document.getElementById('simple-close');
  document.getElementById('simple-home-name').textContent = match.home + ` (${match.homeGoals||0})`;
  document.getElementById('simple-away-name').textContent = match.away + ` (${match.awayGoals||0})`;
  // format scorers as lines with ball emoji and goal counts
  const hsEl = document.getElementById('simple-home-scorers'); const asEl = document.getElementById('simple-away-scorers');
  hsEl.innerHTML = ''; asEl.innerHTML = '';
  const formatScorers = (arr, container) => {
    if(!arr || !arr.length){ container.textContent = 'Nenhum registrado'; return; }
    arr.forEach(item=>{
      const parsed = parseScorerString(item);
      const div = document.createElement('div'); div.className = 'scorer-line';
      div.textContent = `⚽ ${parsed.name} — ${parsed.count} gol${parsed.count>1? 's':''}`;
      container.appendChild(div);
    });
  };
  formatScorers(match.homeScorers, hsEl);
  formatScorers(match.awayScorers, asEl);
  if(!modal.dataset.init){ if(backdrop) backdrop.addEventListener('click', closeSimpleModal); if(closeBtn) closeBtn.addEventListener('click', closeSimpleModal); modal.dataset.init='1'; }
  modal.classList.add('show'); modal.setAttribute('aria-hidden','false');
}
function closeSimpleModal(){ const modal = document.getElementById('match-modal'); if(!modal) return; modal.classList.remove('show'); modal.setAttribute('aria-hidden','true'); }

// init load
const stored = loadMatchesFromStorage();
if(stored && Array.isArray(stored) && stored.length){
  matches = stored;
  // merge scorer info from initialMatches into stored matches when missing
  try{
    initialMatches.forEach(im => {
      const found = matches.find(m => m.round === im.round && m.home === im.home && m.away === im.away);
      if(found){
        if((!found.homeScorers || !found.homeScorers.length) && im.homeScorers && im.homeScorers.length){
          found.homeScorers = im.homeScorers.slice();
        }
        if((!found.awayScorers || !found.awayScorers.length) && im.awayScorers && im.awayScorers.length){
          found.awayScorers = im.awayScorers.slice();
        }
      }
    });
    // persist merged result
    saveMatchesToStorage();
  }catch(e){ console.warn('merge scorers error', e); }
} else { matches = initialMatches.slice(); saveMatchesToStorage(); }

// Normalize scorer strings (emoji sequences, trailing spaces) to 'Name' or 'Name xN'
function normalizeScorerString(s){
  if(!s) return null;
  let str = String(s).trim();
  // count and remove all ball emojis anywhere in the string
  const balls = (str.match(/⚽/g) || []).length;
  str = str.replace(/⚽/g, '').trim();
  // normalize multiple spaces
  str = str.replace(/\s+/g,' ').trim();
  // if already 'Name xN'
  const m = str.match(/^(.*)\s+x(\d+)$/i);
  if(m) return (parseInt(m[2],10)>1) ? `${m[1].trim()} x${parseInt(m[2],10)}` : m[1].trim();
  // trailing number like 'Name 2' -> convert
  const m2 = str.match(/^(.*)\s+(\d+)$/);
  if(m2) return (parseInt(m2[2],10)>1) ? `${m2[1].trim()} x${parseInt(m2[2],10)}` : m2[1].trim();
  // if emoji count exists, use it
  if(balls>0) return (balls>1) ? `${str} x${balls}` : str;
  return str;
}

// ensure scorer arrays normalized and match goals are consistent with scorer counts when possible
matches.forEach(m=>{
  if(m.homeScorers && Array.isArray(m.homeScorers)) m.homeScorers = m.homeScorers.map(normalizeScorerString).filter(Boolean);
  if(m.awayScorers && Array.isArray(m.awayScorers)) m.awayScorers = m.awayScorers.map(normalizeScorerString).filter(Boolean);
  // recalc goals from scorers when totals differ or when scorer info exists
  const homeFromScorers = (m.homeScorers||[]).reduce((acc,s)=>{ const p = parseScorerString(s); return acc + (p.count||0); },0);
  const awayFromScorers = (m.awayScorers||[]).reduce((acc,s)=>{ const p = parseScorerString(s); return acc + (p.count||0); },0);
  if(homeFromScorers && homeFromScorers !== (m.homeGoals||0)) m.homeGoals = homeFromScorers;
  if(awayFromScorers && awayFromScorers !== (m.awayGoals||0)) m.awayGoals = awayFromScorers;
});

saveMatchesToStorage();

renderMatches(); renderTable(); renderArtilharia();
