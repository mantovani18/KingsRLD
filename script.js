const teams = ['Los Aliens','Los Galaticos','Fc Revolution','Hydra'];

// initial results (cleaned and normalized)
const initialMatches = [
  // Round 1: Los Aliens 3 - Hydra 3
  {
    round: 1,
    home: 'Los Aliens',
    away: 'Hydra',
    homeGoals: 3,
    awayGoals: 3,
    homeScorers: ['Vitor Soares', 'Felipe Vieira', 'Jean'],
    awayScorers: ['Caveira', 'Dago', 'Guto']
  },
  // Round 1: Los Galaticos 9 - Fc Revolution 6
  {
    round: 1,
    home: 'Los Galaticos',
    away: 'Fc Revolution',
    homeGoals: 9,
    awayGoals: 6,
    // Rodada 1 - 3 Joao Gabriel, 2 Neto, 1 Berbel, 1 Manhaes, 1 Luiz, 1 Ghesti
    homeScorers: ['Joao Gabriel x3', 'Neto x2', 'Berbel', 'Manhaes', 'Luiz', 'Ghesti'],
     awayScorers: ['Vitinho', 'Bolinha', 'Leo Leite x3', 'Roque']
  },
  // Round 2: Los Aliens 5 - Fc Revolution 1
  {
    round: 2,
    home: 'Los Aliens',
    away: 'Fc Revolution',
    homeGoals: 5,
    awayGoals: 1,
    // Rodada 2 - Jean x2, Pedrin, Ryan, Alisson
    homeScorers: ['Jean x2', 'Pedrin', 'Ryan', 'Alisson'],
        awayScorers: ['Roque']
  },
  // Round 2: Los Galaticos 3 - Hydra 2
  {
    round: 2,
    home: 'Los Galaticos',
    away: 'Hydra',
    homeGoals: 3,
    awayGoals: 2,
    // Rodada 2 - Rud x2, Manhaes
    homeScorers: ['Rud x2', 'Manhaes'],
    awayScorers: ['Guto', 'Lucao']
  },
  // Round 3: Los Aliens vs Los Galaticos
  {
    round: 3,
    home: 'Los Aliens',
    away: 'Los Galaticos',
    homeGoals: 1,
    awayGoals: 9,
    homeScorers: ['Felipe Vieira'],
    awayScorers: ['Vinícius Knoch x5', 'Manhaes', 'João Gabriel', 'João Felipe', 'Paulo']
  },
  {
    round: 3,
    home: 'Fc Revolution',
    away: 'Hydra',
    homeGoals: 5,
    awayGoals: 3,
    homeScorers: ['Roque x2', 'Vini', 'Leandro', 'Kaminski'],
    awayScorers: ['Robinho x2', 'Guto']
  },
  // Round 4: reverse of Round 1 (pending)
  {
    round: 4,
    home: 'Hydra',
    away: 'Los Aliens',
    homeGoals: null,
    awayGoals: null,
    homeScorers: [],
    awayScorers: []
  },
  {
    round: 4,
    home: 'Fc Revolution',
    away: 'Los Galaticos',
    homeGoals: null,
    awayGoals: null,
    homeScorers: [],
    awayScorers: []
  },
  // Round 5: reverse of Round 2 (pending)
  {
    round: 5,
    home: 'Fc Revolution',
    away: 'Los Aliens',
    homeGoals: null,
    awayGoals: null,
    homeScorers: [],
    awayScorers: []
  },
  {
    round: 5,
    home: 'Hydra',
    away: 'Los Galaticos',
    homeGoals: null,
    awayGoals: null,
    homeScorers: [],
    awayScorers: []
  },
  // Round 6: reverse of Round 3 (pending)
  {
    round: 6,
    home: 'Los Galaticos',
    away: 'Los Aliens',
    homeGoals: null,
    awayGoals: null,
    homeScorers: [],
    awayScorers: []
  },
  {
    round: 6,
    home: 'Hydra',
    away: 'Fc Revolution',
    homeGoals: null,
    awayGoals: null,
    homeScorers: [],
    awayScorers: []
  },
];

let matches = initialMatches.slice();

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

// Roster/Elenco com características dos jogadores
const teamRosters = {
  'Los Aliens': [
    { name: 'Pedro Mantovani', position: 'GK', foot: 'Destro', age: 18, photoPath: 'FotoEu.jpg' },
    { name: 'Mateus Viana', position: 'LD/Meia', foot: 'Canhoto', age: 23, photoPath: 'players/los-aliens/mateus-viana.jpg' },
    { name: 'Vitor Soares', position: 'ZAG', foot: 'Canhoto', age: 18, photoPath: 'players/los-aliens/vitor-soares.jpg' },
    { name: 'João Schneider', position: 'VOL/MEIA', foot: 'Canhoto', age: 23, photoPath: 'players/los-aliens/joao-schneider.jpg' },
    { name: 'Felipe Vieira', position: 'Meia', foot: 'Destro', age: 18, photoPath: 'players/los-aliens/felipe-vieira.jpg' },
    { name: 'Ryan Souza', position: 'LD/LE', foot: 'Destro', age: 22, photoPath: 'players/los-aliens/ryan-souza.jpg' },
    { name: 'Jean Soares', position: 'AT', foot: 'Ambidestro', age: 23, photoPath: 'players/los-aliens/jean-soares.jpg' },
    { name: 'Pedro Araújo', position: 'MC/AT', foot: 'Destro', age: 20, photoPath: 'players/los-aliens/pedro-araujo.jpg' },
  ],
  'Los Galaticos': [
    { name: 'Paulo Martos', position: 'Goleiro', foot: 'Direita', age: 24, photoPath: 'players/los-galaticos/paulo-martos.jpg' },
    { name: 'Arthur Moloni', position: 'Lateral', foot: 'Direita', age: 18, photoPath: 'players/los-galaticos/arthur-moloni.jpg' },
    { name: 'Douglas', position: 'Zagueiro', foot: 'Direita', age: 21, photoPath: 'players/los-galaticos/douglas.jpg' },
    { name: 'Rud', position: 'Lateral', foot: 'Esquerda', age: 26, photoPath: 'players/los-galaticos/rud.jpg' },
    { name: 'Gustavo Berbel', position: 'Volante', foot: 'Destro', age: 18, photoPath: 'players/los-galaticos/gustavo-berbel.jpg' },
    { name: 'Matheus Manhaes', position: 'Volante', foot: 'Destro', age: 20, photoPath: 'players/los-galaticos/matheus-manhaes.jpg' },
    { name: 'Vinícius Knoch', position: 'Meia', foot: 'Destro', age: 26, photoPath: 'players/los-galaticos/vinicius-knoch.jpg' },
    { name: 'João Gabriel', position: 'Atacante', foot: 'Destro', age: 20, photoPath: 'players/los-galaticos/joao-gabriel.jpg' },
    { name: 'Hugo Ryan', position: 'Zagueiro', foot: 'Destro', age: 20, photoPath: 'players/los-galaticos/hugo-ryan.jpg' },
    { name: 'João Felipe', position: 'Lateral', foot: 'Destro', age: 17, photoPath: 'players/los-galaticos/joao-felipe.jpg' },
    { name: 'Luiz Park', position: 'Meia', foot: 'Destro', age: 19, photoPath: 'players/los-galaticos/luiz-park.jpg' },
    { name: 'Daniel Cobra', position: 'Lateral', foot: 'Destro', age: 20, photoPath: 'players/los-galaticos/daniel-cobra.jpg' },
  ],
};

function initials(name){
  if (!name) return '';
  return name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
}

// Renderiza uma tabela HTML com as características dos jogadores
function renderPlayerCharsTable(teamName){
  const roster = teamRosters[teamName];
  if(!roster || !roster.length) return '<p class="muted">Sem elenco cadastrado</p>';
  let html = '<table class="art-table"><thead><tr>'+
    '<th>Nome</th><th>Posição</th><th>Perna Boa</th><th>Idade</th>'+
    '</tr></thead><tbody>';
  roster.forEach(p=>{
    html += `<tr><td>${p.name}</td><td>${p.position}</td><td>${p.foot}</td><td>${p.age}</td></tr>`;
  });
  html += '</tbody></table>';
  return html;
}

// Renderiza cards no estilo "ficha" para o elenco
function renderRosterCards(teamName){
  const roster = teamRosters[teamName];
  if(!roster || !roster.length) return '<p class="muted">Sem elenco cadastrado</p>';
  const escape = (s)=> String(s==null?'':s).replace(/[&<>]/g, c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
  let html = '<div class="roster-grid">';
  roster.forEach(p=>{
    const initials = (p.name||'').split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase();
    // suporte a foto: p.photoPath (absoluto/relativo) ou padrão players/{team}/{slug}.jpg
    const slug = (str)=> String(str||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
    const defaultPhoto = `players/${slug(teamName)}/${slug(p.name)}.jpg`;
    const photo = p.photoPath || defaultPhoto;
    html += `
      <div class="player-card">
        <div class="player-avatar">
          <img class="player-avatar-img" src="${photo}" alt="${escape(p.name)}" onerror="this.style.display='none'; this.parentElement.querySelector('.initials').style.display='flex'"/>
          <div class="initials" aria-hidden="true">${initials}</div>
        </div>
        <div class="player-info">
          <div class="player-name">${escape(p.name)}</div>
          <div class="player-meta">
            <span><strong>Posição:</strong> ${escape(p.position)}</span>
            <span><strong>Perna:</strong> ${escape(p.foot)}</span>
            <span><strong>Idade:</strong> ${escape(p.age)}</span>
          </div>
        </div>
      </div>`;
  });
  html += '</div>';
  return html;
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

// localStorage removed: always use initialMatches
window.addMatch = function(m){ if(!m) return; if(!m.round) m.round=3; matches.push(m); renderMatches(); renderTable(); updateRoundsSummary(); }

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
  saveMatchesToStorage(); renderMatches(); renderTable(); renderArtilharia(); updateRoundsSummary();
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
  saveMatchesToStorage(); renderMatches(); renderTable(); renderArtilharia(); updateRoundsSummary();
  console.log('removed scorer', name, 'from', m.home, 'vs', m.away);
}

window.listScorers = function(matchIdx){ if(typeof matchIdx === 'undefined') return console.log('pass matchIdx'); const m = matches[matchIdx]; if(!m) return console.warn('match not found'); console.log('homeScorers', m.homeScorers||[]); console.log('awayScorers', m.awayScorers||[]); }

function createEmptyTable(){ const t = {}; teams.forEach(name=> t[name] = { name, played:0,wins:0,draws:0,losses:0,goalsFor:0,goalsAgainst:0,points:0 }); return t; }

function computeTable(matchList){
  const table = createEmptyTable();
  matchList.forEach(m=>{
    const a = table[m.home]; const b = table[m.away];
    if(!a||!b) return;
    // ignore pending fixtures (no numeric goals yet)
    const hg = m.homeGoals; const ag = m.awayGoals;
    if(typeof hg !== 'number' || typeof ag !== 'number') return;
    a.played++; b.played++;
    a.goalsFor += hg; a.goalsAgainst += ag;
    b.goalsFor += ag; b.goalsAgainst += hg;
    if(hg > ag){ a.wins++; a.points+=3; b.losses++; }
    else if(hg < ag){ b.wins++; b.points+=3; a.losses++; }
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
    const score = document.createElement('div'); score.className='score';
    const hasScore = (typeof m.homeGoals === 'number') && (typeof m.awayGoals === 'number');
    score.textContent = hasScore ? `${m.homeGoals} - ${m.awayGoals}` : '—';
    li.appendChild(left); li.appendChild(score); li.appendChild(right);
    ul.appendChild(li);
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
  const hasScore = (typeof match.homeGoals === 'number') && (typeof match.awayGoals === 'number');
  document.getElementById('simple-home-name').textContent = match.home + (hasScore ? ` (${match.homeGoals})` : '');
  document.getElementById('simple-away-name').textContent = match.away + (hasScore ? ` (${match.awayGoals})` : '');
  // format scorers as lines with ball emoji and goal counts
  const hsEl = document.getElementById('simple-home-scorers'); const asEl = document.getElementById('simple-away-scorers');
  hsEl.innerHTML = ''; asEl.innerHTML = '';
  const formatScorers = (arr, container) => {
    if(!arr || !arr.length){ container.textContent = hasScore ? 'Nenhum registrado' : 'Aguardando resultado'; return; }
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

// Always use initialMatches for rendering
matches = initialMatches.slice();

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

// Initialize everything when DOM is ready
(function() {
  'use strict';
  
  function init() {
    console.log('[DEBUG] DOM ready, initializing...');
    
    // Render matches, table, and artilharia for index.html
    try {
      renderMatches(); 
      renderTable(); 
      renderArtilharia();
      updateRoundsSummary();
    } catch(e) {
      console.log('[DEBUG] Not on index page or error:', e.message);
    }

    // Renderiza a seção de estatísticas dos jogadores se o container existir
    const container = document.getElementById('player-stats');
    console.log('[DEBUG] player-stats container:', container);
    
    if(container){
      try {
        // lê ?team= do URL
        const urlParams = new URLSearchParams(window.location.search);
        const teamParam = urlParams.get('team');
        console.log('[DEBUG] URL params:', window.location.search);
        console.log('[DEBUG] teamParam from URL:', teamParam);
        console.log('[DEBUG] Available rosters:', Object.keys(teamRosters));
        
        const team = (teamParam && teamRosters[teamParam]) ? teamParam : 'Los Aliens';
        console.log('[DEBUG] Selected team:', team);
        
        const rosterHTML = renderRosterCards(team);
        console.log('[DEBUG] Roster HTML length:', rosterHTML.length);
        
        container.innerHTML = '<h3>' + team + ' — Elenco</h3>' + rosterHTML;
        console.log('[DEBUG] Container updated with roster');
        
        // ativa chip correspondente (em elencos.html chips são buttons com data-team)
        const chipSel = document.querySelector('.team-chip[data-team="' + team + '"]');
        console.log('[DEBUG] Chip selector result:', chipSel);
        if(chipSel) chipSel.classList.add('active');
        
        // em elencos.html, os chips são buttons: permitem trocar sem recarregar
        const chips = document.querySelectorAll('.team-chip[data-team]');
        chips.forEach(function(btn){
          btn.addEventListener('click', function(e) {
            const t = btn.getAttribute('data-team');
            console.log('[DEBUG] Chip clicked:', t);
            document.querySelectorAll('.team-chip').forEach(function(b){ b.classList.remove('active'); });
            btn.classList.add('active');
            container.innerHTML = '<h3>' + t + ' — Elenco</h3>' + renderRosterCards(t);
            // rebind player-card clicks after rerender
            bindPlayerCardClicks(t);
          });
        });
        // initial bind for current team
        bindPlayerCardClicks(team);
      } catch(e) {
        console.error('[ERROR] Failed to initialize roster:', e);
      }
    } else {
      console.log('[DEBUG] No player-stats container found - this is probably index.html');
    }
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

// Update dynamic rounds summary (completed rounds with at least one played match)
function updateRoundsSummary(){
  const el = document.getElementById('rounds-summary'); if(!el) return;
  const roundsWithScores = new Set();
  matches.forEach(m=>{
    if(typeof m.homeGoals === 'number' && typeof m.awayGoals === 'number') roundsWithScores.add(m.round);
  });
  const count = roundsWithScores.size;
  el.textContent = `${count} realizada${count===1?'':'s'}`;
}

// Helper: download a cleaned `initialMatches` JS snippet (ready to paste into script.js)
window.downloadCleanInitialMatches = function(){
  try{
    // build cleaned initialMatches from current matches (deep-copy)
    const cleaned = (matches && matches.length) ? matches : initialMatches;
    const snippet = 'const initialMatches = ' + JSON.stringify(cleaned, null, 2) + ';\n';
    const blob = new Blob([snippet], { type: 'text/javascript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'initialMatches-clean.js'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
    console.log('Downloaded initialMatches-clean.js — abra e cole o bloco dentro de script.js no repositório.');
  }catch(e){ console.error('download failed', e); }
}

// Bind click events on player cards to open profile modal
function bindPlayerCardClicks(teamName){
  const wrap = document.getElementById('player-stats'); if(!wrap) return;
  wrap.querySelectorAll('.player-card').forEach((card, idx)=>{
    card.addEventListener('click', ()=>{
      const roster = teamRosters[teamName] || [];
      const p = roster[idx]; if(!p) return;
      openPlayerProfile(teamName, p);
    });
  });
}

function slug(str){
  return String(str||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
}

function openPlayerProfile(teamName, player){
  const modal = document.getElementById('player-profile-modal'); if(!modal) return;
  const photoEl = document.getElementById('profile-photo');
  const initialsEl = document.getElementById('profile-initials');
  const nameEl = document.getElementById('profile-name');
  const posEl = document.getElementById('profile-position');
  const footEl = document.getElementById('profile-foot');
  const ageEl = document.getElementById('profile-age');
  const teamEl = document.getElementById('profile-team');

  const defPhoto = `players/${slug(teamName)}/${slug(player.name)}.jpg`;
  const photo = player.photoPath || defPhoto;

  // reset initials visibility
  initialsEl.style.display = 'none';
  initialsEl.textContent = (player.name||'').split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase();
  photoEl.style.display = 'block';
  photoEl.src = photo;
  photoEl.alt = player.name || '';
  photoEl.onerror = ()=>{ photoEl.style.display='none'; initialsEl.style.display='flex'; };

  nameEl.textContent = player.name || '';
  posEl.textContent = player.position || '-';
  footEl.textContent = player.foot || '-';
  ageEl.textContent = (player.age!=null)? String(player.age) : '-';
  teamEl.textContent = teamName;

  // open
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');

  // one-time close bindings
  if(!modal.dataset.init){
    const closeBtn = document.getElementById('player-profile-close');
    const backdrop = modal.querySelector('.modal-backdrop');
    if(closeBtn) closeBtn.addEventListener('click', closePlayerProfile);
    if(backdrop) backdrop.addEventListener('click', closePlayerProfile);
    document.addEventListener('keydown', escCloseProfile);
    modal.dataset.init='1';
  }
}

function escCloseProfile(e){ if(e.key === 'Escape') closePlayerProfile(); }
function closePlayerProfile(){
  const modal = document.getElementById('player-profile-modal'); if(!modal) return;
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
}

