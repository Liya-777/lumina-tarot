/* ================= 琉光塔罗 LuminaTarot · 核心逻辑（重建版） ================= */
(function(){
"use strict";

/* ---------- 数据合并 ---------- */
const CARDS = [...DATA_MAJOR, ...DATA_WANDS, ...DATA_CUPS, ...DATA_SWORDS, ...DATA_PENTACLES];
const IMG_BASE = "assets/cards/";   // 本地压缩牌图：秒开、可离线
const IMG_CDN  = "https://cdn.jsdelivr.net/npm/@cometpisces/tarot-kit-images@0.2.0/images/";
// 图片失败：先回退 CDN，再回退占位牌面
function bindImgFallback(img, card, onFail){
  img.addEventListener("error", ()=>{
    if(!img.dataset.triedCdn){
      img.dataset.triedCdn = "1";
      img.src = IMG_CDN + String(card.img).replace(/\.jpg$/, ".png");
      return;
    }
    if(onFail) onFail();
  });
}
// 预加载：抽到牌后立刻把图片读进缓存
function preloadCards(list){
  (list||[]).forEach(sel=>{ const im = new Image(); im.src = IMG_BASE + sel.card.img; });
}
const SUIT_ZH = {major:"大阿卡纳", wands:"权杖", cups:"圣杯", swords:"宝剑", pentacles:"星币"};
const SUIT_SYM = {major:"✦", wands:"🔥", cups:"🏆", swords:"⚔️", pentacles:"🪙"};

/* ---------- 牌阵 ---------- */
const SPREAD_LAYOUT = { time:"layout-3-line", triangle:"layout-3-valley", gainloss:"layout-2-pair", emotion:"layout-5-emotion" };
const SPREADS = {
  time:{
    en:"Three-Card · Time Flow", enTag:"TIME FLOW", zh:"三张·时间之流", n:3,
    short:"过去 → 现在 → 未来",
    positions:[
      {zh:"过去", en:"Past", d:"过去的经历与成因，影响着当下"},
      {zh:"现在", en:"Present", d:"当下的状态与正在发生的事"},
      {zh:"未来", en:"Future", d:"按当前轨迹发展的可能走向"}
    ]
  },
  triangle:{
    en:"Triangle", enTag:"HOLY TRINITY", zh:"圣三角", n:3,
    short:"问题状况 / 问题成因 / 事件结果",
    positions:[
      {zh:"问题状况", en:"Situation", d:"事情当下的状况与处境"},
      {zh:"问题成因", en:"Root Cause", d:"问题背后的深层原因"},
      {zh:"事件结果", en:"Outcome", d:"按当前轨迹发展的事件结果"}
    ]
  },
  gainloss:{
    en:"Gain & Loss", enTag:"GAIN & LOSS", zh:"得与失", n:2,
    short:"失去什么 / 得到什么",
    positions:[
      {zh:"失去什么", en:"What You Lose", d:"这次选择中，你将放下的部分"},
      {zh:"得到什么", en:"What You Gain", d:"这次选择中，你将收获的部分"}
    ]
  },
  daily:{
    en:"Daily Fortune", enTag:"DAILY", zh:"今日运势", n:3, daily:true,
    short:"三张 · 无牌阵",
    positions:[{zh:"",en:"",d:""},{zh:"",en:"",d:""},{zh:"",en:"",d:""}]
  },
  emotion:{
    en:"Realm of Feelings", enTag:"EMOTION REALM", zh:"情感之境", n:5,
    short:"你的状态 / 对方状态 / 现状 / 未来趋势 / 最终结果",
    /* 抽牌顺序＝位置顺序：1 左上 · 2 右上 · 3 左下 · 4 右下 · 5 中间 */
    positions:[
      {zh:"你的目前状态想法", en:"Your Current State", d:"你当下对这段关系的心境、想法与期待"},
      {zh:"对方目前状态想法", en:"Their Current State", d:"对方此刻的状态与内心的真实想法"},
      {zh:"现状", en:"Current Situation", d:"你们之间当下真实的相处状况"},
      {zh:"未来趋势", en:"Future Trend", d:"按目前轨迹，这段关系接下来的走向"},
      {zh:"最终结果", en:"Final Outcome", d:"这段关系最终可能抵达的结果"}
    ]
  }
};

/* ---------- 状态 ---------- */
const state = { histSaved: false, view:"start", spread:"time", daily:false, question:"", deck:[], selected:[], flipped:0, goTimer:null, busy:false, muted:false, readSeq:0, readAbort:null, fromHistory:false, currentEntryTs:null };
const $ = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));

function toast(msg){
  const t = $("#toast");
  t.textContent = msg; t.classList.add("show");
  clearTimeout(t._h); t._h = setTimeout(()=>t.classList.remove("show"), 1800);
}
function shuffleArr(arr){
  for(let i=arr.length-1;i>0;i--){ const j = Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]]; }
  return arr;
}
function showView(id){
  $$(".view").forEach(v=>v.classList.remove("active"));
  $("#view-"+id).classList.add("active");
  state.view = id;
  document.documentElement.dataset.view = id;
  window.scrollTo({top:0});
  applyChromeVars();
  setTimeout(updateCustomScrollbar, 30);
}
function escapeHtml(s){
  return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function backClass(i){ return i % 2 === 0 ? "back-sun" : "back-moon"; }

/* ---------- 中英双语 ---------- */
const LANG_KEY = "lumina_lang";
const I18N = {
  zh:{
    theme:"昼夜模式", archive:"档案", sound:"音效",
    question:"默念问题", qPh:"可留空——留空则按『今日指引』为你解读",
    spread:"选择牌阵", start:"开始洗牌", fortune:"今日运势",
    guide:"一缕琉光，照见自我<br>78 张经典维特塔罗 · 正逆位深度全解读",
    shuffleTitle:"洗牌中", focus:"默念你的问题 · 点击牌堆开始洗牌",
    pickTitle:"抽牌", pickSub:"凭第一直觉点击牌面 · 抽齐后点牌面逐一翻开",
    deckHint:"点击杂乱的牌面进行洗牌，可重复点击，然后等待抽牌",
    deckHintShuffled:"点击杂乱的牌面进行洗牌，可重复点击，然后等待抽牌",
    deckHintShuffling:"可继续点击，等待自动展开",
    deckHintDone:"洗好了 ✨ 正在展开牌阵，等待抽牌",
    favTip:"点击牌面右上角 ♡ 即可收藏，可在 历史 › 收藏 中查看",
    shuffleNow:"洗牌",
    aiKey:"AI 整体解读 · DeepSeek API Key（可选）",
    aiKeyPh:"粘贴 DeepSeek API Key（sk-…），自动保存",
    aiHint:"Key 仅保存在本机浏览器（localStorage），用于调用 api.deepseek.com 结合你的问题生成整体解读；不填则用本地模板解读。",
    aiStatusOn:"✓ 已保存 · 解读时将用 AI 结合问题分析牌面",
    aiStatusOff:"未配置 · 将使用本地模板解读",
    volume:"音量", mute:"静音",
    share:"生成分享卡", again:"重新洗牌", home:"回到主页",
    myArchive:"我的档案", backHome:"返回主页", favTab:"收藏", histTab:"占卜历史",
    footer:"✦ 琉光塔罗 · 仅供娱乐参考 ✦",
    hintDraw:"根据你的第一直觉，<b>抽取</b>你心动的牌",
    hintPick:"已选 <b>{n}</b> / {total} · 继续<b>抽取</b>你心动的牌",
    hintReady:"已选齐 {n} 张 · <b>点击每张牌面</b>，逐一翻开 ✨",
    hintFlipped:"已翻开 <b>{x}</b> / {total} · 再翻开 <b>{y}</b> 张 ✨",
    hintRevealing:"牌面已全部翻开 ✨ 正在汇整你的解读…",
    flipAll:"一键翻牌",
    hintAlready:"这张牌已经被选中啦 ✨",
    hintFull:"本牌阵只需选 {n} 张，已经选齐啦 ✨",
    themeNight:"已切换星夜主题 🌙",
    themeDay:"已切换日间主题 ☀️",
    questionDefault:"今日指引", dailyTitle:"今日运势",
    oriUp:"正位", oriRev:"逆位",
    overallHead:"整体解读 · Overall Reading",
    overallHeadAI:"AI 整体解读 · DeepSeek",
    aiLoading:"✨ 正在结合你的问题解读牌面",
    aiFail:"AI 解读失败：{e}<br>已回退为本地模板解读",
    aiRetry:"重新解读",
    aiQuota:"今日 AI 解读次数已用完（每天 {n} 次），已改用本地模板解读，明天再来吧 ✨",
    overallList:"你抽到了：{list}",
    overallQ:"结合「{q}」来看：",
    overallEnd:"牌面共同指向：<b>{firsts}</b>。整体指引已蕴含其中，请结合现状、忠于直觉，做出属于你的决定。",
    favAdd:"已收藏「{name}」♥",
    favDel:"已取消收藏「{name}」",
    favDate:"收藏于",
    shareOk:"分享卡已生成 🖼",
    shareErr:"分享卡生成失败，请重试",
    shareFooter:"— LuminaTarot · 一缕琉光，照见自我 —",
    archiveEmptyFav:"还没有收藏的牌 🌙<br>在解读页点击牌面右下角的 ♡ 收藏喜欢的牌面",
    archiveEmptyHist:"还没有占卜记录 ✨<br>每次解读完成后会自动记录在这里，最多保留最近 {n} 次",
    learnTip:"点击学习牌意",
    histOpen:"回看这次占卜",
    histDelAria:"删除这条占卜记录",
    histDelOk:"已删除这条占卜记录 🗑",
    histClearAll:"清空全部",
    histClearConfirm:"确定清空全部占卜历史吗？清空后无法恢复。",
    histClearOk:"已清空全部占卜历史 🗑",
    profileEntry:"我的档案 · 完善身份与问卜者信息",
    startReading:"开始占卜",
    setupTitle:"开始占卜",
    setupSub:"写下你的问题，选择一个牌阵",
    learnNeedLearner:"当前身份为「我要使用塔罗」，请到档案中切换为「我要学习塔罗」",
    learnEntry:"学习塔罗",
    learnTitle:"学习卡牌",
    suitAll:"全部", suitMajor:"大阿卡纳", suitWands:"权杖", suitCups:"圣杯", suitSwords:"宝剑", suitPentacles:"星币",
    askAs:"以此身份提问",
    saveProfile:"保存档案",
    profileSaved:"档案已保存 ✓",
    profileTitle:"我的档案",
    identityTitle:"身份选择",
    identityLearner:"我要学习塔罗",
    identityLearnerDesc:"多一个「学习塔罗」功能",
    identityUser:"我要使用塔罗",
    identityUserDesc:"只保留整体解读",
    identityNote:"学习者：解读页面同步出现单张塔罗牌释义，辅助学习者在每一次占卜中更好理解牌面",
    personsTitle:"问卜者信息",
    personsTip:"信息自动保存，完善档案后让塔罗更了解你",
    addPerson:"＋ 添加一位",
    nicknamePh:"昵称",
    ageLabel:"年龄", zodiacLabel:"星座", genderLabel:"性别", relationLabel:"与你的关系",
    genderNone:"不填", genderF:"女", genderM:"男", genderOther:"其他",
    relationPh:"如：对象 / 朋友 / 家人",
    zodiacUnknown:"不填",
    favsTitle:"我的历史",
    favHistTab:"占卜历史",
    favCardsTab:"收藏的牌",
    favsLabel:"历史"
  },
  en:{
    theme:"Theme", archive:"Archive", sound:"Sound",
    question:"Ask a Question", qPh:"Leave blank for a “Daily Guidance” reading",
    spread:"Choose a Spread", start:"Begin Shuffle", fortune:"Daily Fortune",
    guide:"A glimmer of light to see yourself<br>78 classic Rider–Waite cards · upright & reversed",
    shuffleTitle:"Shuffling", focus:"Hold your question in mind · tap the deck to shuffle",
    pickTitle:"Pick Cards", pickSub:"Follow your intuition — tap the cards that call to you",
    deckHint:"Tap the scattered cards to shuffle — tap again to reshuffle, then wait to pick",
    deckHintShuffled:"Tap the scattered cards to shuffle — tap again to reshuffle, then wait to pick",
    deckHintShuffling:"Tap again anytime — the spread opens automatically",
    deckHintDone:"Shuffled ✨ Opening the spread — waiting to pick",
    favTip:"Tap the ♡ on a card to save it — find it under 历史 › 收藏",
    shuffleNow:"Shuffle",
    aiKey:"AI Reading · DeepSeek API Key (optional)",
    aiKeyPh:"Paste your DeepSeek API key (sk-…), auto-saved",
    aiHint:"Stored only in your browser (localStorage); used to call api.deepseek.com for an AI reading. Without it, a local template is used.",
    aiStatusOn:"✓ Saved · readings will use AI analysis",
    aiStatusOff:"Not configured · using the local template",
    volume:"Volume", mute:"Mute",
    share:"Share Card", again:"Shuffle Again", home:"Home",
    myArchive:"My Archive", backHome:"Back Home", favTab:"Favorites", histTab:"Recent Readings",
    footer:"✦ LuminaTarot · For entertainment only ✦",
    hintDraw:"Follow your first intuition — <b>pick</b> the cards that call to you",
    hintPick:"Selected <b>{n}</b> / {total} · keep <b>picking</b> the cards that call to you",
    hintReady:"All {n} drawn · <b>tap each card</b> to flip it over ✨",
    hintFlipped:"Flipped <b>{x}</b> / {total} · <b>{y}</b> to go ✨",
    hintRevealing:"All cards revealed ✨ preparing your reading…",
    flipAll:"Flip All",
    hintAlready:"This card is already picked ✨",
    hintFull:"This spread only needs {n} cards — all picked ✨",
    themeNight:"Starry night mode 🌙",
    themeDay:"Day mode ☀️",
    questionDefault:"Daily Guidance", dailyTitle:"Daily Fortune",
    oriUp:"Upright", oriRev:"Reversed",
    overallHead:"Overall Reading",
    overallHeadAI:"AI Reading · DeepSeek",
    aiLoading:"✨ Reading the cards for your question…",
    aiFail:"AI reading failed: {e}<br>Fell back to the local template",
    aiRetry:"Retry",
    aiQuota:"Daily AI readings used up ({n}/day) — showing the built-in template instead ✨",
    overallList:"You drew: {list}",
    overallQ:"Looking at “{q}”:",
    overallEnd:"The cards point toward <b>{firsts}</b>. Trust your intuition and make the choice that feels right for you.",
    favAdd:"Saved “{name}” ♥",
    favDel:"Removed “{name}”",
    favDate:"Saved",
    shareOk:"Share card created 🖼",
    shareErr:"Couldn't create the share card, please retry",
    shareFooter:"— LuminaTarot · A glimmer of light to see yourself —",
    archiveEmptyFav:"No favorites yet 🌙<br>Tap ♡ on a card in your reading to save it",
    archiveEmptyHist:"No readings yet ✨<br>Every completed reading is saved here automatically (last {n} kept)",
    learnTip:"Tap a card to learn its meaning",
    histOpen:"Reopen this reading",
    histDelAria:"Delete this reading",
    histDelOk:"Reading deleted 🗑",
    histClearAll:"Clear All",
    histClearConfirm:"Clear all reading history? This cannot be undone.",
    histClearOk:"All reading history cleared 🗑",
    profileEntry:"My Profile · Set identity & seeker info",
    startReading:"Start Reading",
    setupTitle:"New Reading",
    setupSub:"Write your question and choose a spread",
    learnNeedLearner:"You are using “Use Tarot”; switch to “Learn Tarot” in your profile first",
    learnEntry:"Learn Tarot",
    learnTitle:"Study Cards",
    suitAll:"All", suitMajor:"Major Arcana", suitWands:"Wands", suitCups:"Cups", suitSwords:"Swords", suitPentacles:"Pentacles",
    askAs:"Ask as",
    saveProfile:"Save Profile",
    profileSaved:"Profile saved ✓",
    profileTitle:"My Profile",
    identityTitle:"Identity",
    identityLearner:"Learn Tarot",
    identityLearnerDesc:"Adds individual card study",
    identityUser:"Use Tarot",
    identityUserDesc:"Overall reading only",
    identityNote:"Learner: the reading page also shows each card's interpretation, helping learners understand the cards in every reading.",
    personsTitle:"Seeker Info",
    personsTip:"Info saves automatically — complete your profile so tarot understands you better.",
    addPerson:"＋ Add person",
    nicknamePh:"Nickname",
    ageLabel:"Age", zodiacLabel:"Zodiac", genderLabel:"Gender", relationLabel:"Relation to you",
    genderNone:"Prefer not to say", genderF:"Female", genderM:"Male", genderOther:"Other",
    relationPh:"e.g. partner / friend / family",
    zodiacUnknown:"—",
    favsTitle:"My History",
    favHistTab:"Readings",
    favCardsTab:"Saved Cards",
    favsLabel:"History"
  }
};
function t(key, vars){
  let str = (I18N[state.lang] && I18N[state.lang][key] != null) ? I18N[state.lang][key] : I18N.zh[key];
  if(str == null) str = key;
  if(vars){ for(const k in vars) str = str.split("{" + k + "}").join(vars[k]); }
  return str;
}
function isEn(){ return state.lang === "en"; }
const L = {
  name: c => isEn() ? c.en : c.zh,
  sub: c => isEn() ? c.zh : c.en,
  kw: (c,o) => isEn() ? (o === "rev" ? c.enKwRev : c.enKwUp) : (o === "rev" ? c.kwRev : c.kwUp),
  text: (c,o) => isEn() ? (o === "rev" ? c.enRev : c.enUp) : (o === "rev" ? c.rev : c.up),
  textOther: (c,o) => isEn() ? (o === "rev" ? c.rev : c.up) : (o === "rev" ? c.enRev : c.enUp),
  pos: p => isEn() ? (p && p.en || "") : (p && p.zh || ""),
  ori: o => t(o === "rev" ? "oriRev" : "oriUp")
};
function applyLang(){
  const en = isEn();
  document.documentElement.dataset.lang = state.lang;
  document.documentElement.lang = en ? "en" : "zh-CN";
  document.title = en ? "✦ LuminaTarot ✦" : "✦ 琉光塔罗 LuminaTarot ✦";
  $$("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  $$("[data-i18n-html]").forEach(el => { el.innerHTML = t(el.dataset.i18nHtml); });
  $$("[data-i18n-ph]").forEach(el => { el.setAttribute("placeholder", t(el.dataset.i18nPh)); });
  const lb = $("#langLabel"); if(lb) lb.textContent = en ? "中文" : "EN";
  const hero = document.querySelector(".hero h1"); if(hero) hero.textContent = en ? "Lumina Tarot" : "琉光塔罗";
  renderSpreads();
  if(state.view === "reading" && state.selected.length){
    const was = state.fromHistory;
    state.fromHistory = true;
    buildReading();
    state.fromHistory = was;
  } else if(state.view === "favs"){
    renderFavs();
  } else if(state.view === "profile"){
    renderPersonList();
  } else if(state.view === "learn"){
    renderLearn();
  }
  refreshPickHint();
}
function refreshPickHint(){
  if(state.view !== "shuffle") return;
  const el = $("#pickHint");
  if(!el || !el.innerHTML) return;
  const total = SPREADS[state.spread].positions.length;
  if(state.selected.length < total){
    el.innerHTML = t("hintPick", { n: state.selected.length, total });
  } else if(state.flipped >= total){
    el.innerHTML = t("hintRevealing");
  } else {
    el.innerHTML = t("hintFlipped", { x: state.flipped, total, y: total - state.flipped });
  }
}
function initLang(){
  let l = "zh";
  try{ l = localStorage.getItem(LANG_KEY) || "zh"; }catch(e){}
  state.lang = (l === "en") ? "en" : "zh";
  applyLang();
  const btn = $("#langBtn");
  if(btn) btn.addEventListener("click", ()=>{
    state.lang = isEn() ? "zh" : "en";
    try{ localStorage.setItem(LANG_KEY, state.lang); }catch(e){}
    applyLang();
    SFX.select();
    toast(isEn() ? "已切换到 English ✨" : "Switched to 中文 ✨");
  });
}

/* ---------- 音效（Web Audio） ---------- */
let AC = null;
function ac(){
  if(!AC){ const C = window.AudioContext || window.webkitAudioContext; if(!C) return null; AC = new C(); }
  if(AC.state==="suspended") AC.resume();
  return AC;
}
function tone(freq,dur,type,vol,delay=0,slideTo=null){
  const ctx=ac(); if(!ctx||state.muted) return;
  vol *= soundVol();
  const t0=ctx.currentTime+delay, o=ctx.createOscillator(), g=ctx.createGain();
  o.type=type; o.frequency.setValueAtTime(freq,t0);
  if(slideTo) o.frequency.exponentialRampToValueAtTime(slideTo,t0+dur);
  g.gain.setValueAtTime(0,t0); g.gain.linearRampToValueAtTime(vol,t0+0.02);
  g.gain.exponentialRampToValueAtTime(0.0001,t0+dur);
  o.connect(g); g.connect(ctx.destination); o.start(t0); o.stop(t0+dur+0.05);
}
function noiseBurst(dur,vol,delay=0,freq=1200,freqEnd=null){
  const ctx=ac(); if(!ctx||state.muted) return;
  vol *= soundVol();
  const t0=ctx.currentTime+delay, sr=ctx.sampleRate, len=Math.floor(sr*dur);
  const buf=ctx.createBuffer(1,len,sr), d=buf.getChannelData(0);
  const atk=Math.max(1,Math.floor(sr*0.012));
  for(let i=0;i<len;i++){
    const env=Math.min(1,i/atk)*(1-i/len);
    d[i]=(Math.random()*2-1)*env;
  }
  const src=ctx.createBufferSource(); src.buffer=buf;
  const f=ctx.createBiquadFilter(); f.type="bandpass"; f.Q.value=0.9;
  if(freqEnd && freqEnd!==freq){
    f.frequency.setValueAtTime(freq,t0);
    f.frequency.exponentialRampToValueAtTime(freqEnd,t0+dur);
  } else {
    f.frequency.value=freq;
  }
  const g=ctx.createGain(); g.gain.value=vol;
  src.connect(f); f.connect(g); g.connect(ctx.destination); src.start(t0);
}
/* 翻牌音效：优先播放本地真实录音素材（Mixkit 免费授权，来源见 assets/sfx/README.txt），
   素材加载失败或断网时自动回退到下方合成的“嗖—嗒”声 */
const FLIP_SFX_SRC = "assets/sfx/flip.mp3";
let flipAudio = null, flipAudioBroken = false;
function loadFlipAudio(){
  if(flipAudio || flipAudioBroken) return;
  try{
    const a = new Audio();
    a.preload = "auto";
    a.src = FLIP_SFX_SRC;
    a.volume = 0.85;
    a.addEventListener("error", ()=>{ flipAudioBroken = true; flipAudio = null; }, {once:true});
    flipAudio = a;
  }catch(e){ flipAudioBroken = true; }
}
function playFlipAudio(){
  if(state.muted) return false;
  loadFlipAudio();
  if(flipAudioBroken || !flipAudio) return false;
  try{
    flipAudio.volume = Math.max(0, Math.min(1, 0.85 * soundVol()));
    if(flipAudio.readyState >= 1) flipAudio.currentTime = 0;
    const p = flipAudio.play();
    if(p && p.catch) p.catch(()=>{});
    return true;
  }catch(e){ return false; }
}
const SFX = {
  shuffle(){ noiseBurst(.5,.12,0,900); noiseBurst(.45,.12,.18,1400); noiseBurst(.5,.12,.36,700); },
  select(){ tone(660,.18,"sine",.18); tone(990,.22,"sine",.14,.08); },
  flip(){
    if(state.muted) return;
    if(playFlipAudio()) return;
    noiseBurst(.28,.10,0,600,2600);          // 合成兜底：纸牌翻动的上滑“嗖”
    noiseBurst(.15,.05,.24,2200,700);        // 收尾落定
    tone(2500,.05,"triangle",.05,.18,3400);  // 干脆的一记
  },
  done(){ tone(523,.4,"sine",.15,0); tone(784,.5,"sine",.12,.12); }
};

/* ---------- 起始视图：牌阵选择 ---------- */
const CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
function miniLayout(key,n){
  const cls = SPREAD_LAYOUT[key];
  const withLabel = ["layout-3-line","layout-3-valley","layout-2-pair"].indexOf(cls)!==-1;
  let cards = "";
  for(let i=1;i<=n;i++){
    const pos = SPREADS[key].positions[i-1];
    cards += `<div class="mini-card c${i}"><div class="card-back ${backClass(i)}"></div>${withLabel?`<span class="mini-label">${isEn() ? pos.en : pos.zh}</span>`:""}</div>`;
  }
  return `<div class="spread-visual"><div class="${cls}">${cards}</div></div>`;
}
function renderSpreads(){
  const grid = $("#spreadGrid");
  const descEn = { time:"Past → Present → Future", triangle:"Situation / Root Cause / Outcome", gainloss:"What you lose / What you gain", emotion:"You · Them · Now · Trend · Outcome" };
  grid.innerHTML = Object.entries(SPREADS).filter(([key])=>!SPREADS[key].daily).map(([key,s])=>{
    const sel = key === state.spread;
    const en = isEn();
    const desc = en ? (descEn[key] || s.en) : s.short;
    return `<button type="button" class="spread-opt ${sel?"sel":""}" role="radio" aria-checked="${sel}" data-key="${key}">
      <div class="badge-check">${CHECK_SVG}</div>
      ${miniLayout(key,s.n)}
      <div class="s-title">${en ? s.en : s.zh}</div>
      <div class="s-tag">${s.enTag}</div>
      <div class="s-desc">${desc}<br>(${s.n} ${en ? "cards" : "张牌"})</div>
    </button>`;
  }).join("");
  if(!grid.dataset.bound){
    grid.dataset.bound = "1";
    grid.addEventListener("click", e=>{
      const opt = e.target.closest(".spread-opt"); if(!opt) return;
      $$(".spread-opt").forEach(o=>{ o.classList.remove("sel"); o.setAttribute("aria-checked","false"); });
      opt.classList.add("sel"); opt.setAttribute("aria-checked","true");
      state.spread = opt.dataset.key; SFX.select();
    });
  }
}

/* ---------- 今日运势：不用洗牌，直接抽三张（无牌阵） ---------- */
function dailyDraw(){
  state.daily = true;
  state.spread = "daily";
  state.fromHistory = false;
  state.currentEntryTs = null;
  state.histSaved = false;
  state.selected = shuffleArr(CARDS.slice()).slice(0,3).map(card=>({
    card,
    orientation: Math.random()<0.5 ? "up" : "rev"
  }));
  preloadCards(state.selected);
  buildReading();
}

/* ---------- 洗牌：杂乱牌堆 → 点击洗牌 → 弧 ---------- */
let pileCards = [], fanCards = [];
let expandTimer = null;

function pileSpread(){
  const stage = $("#shuffleStage");
  const cw = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--card-w"))||96;
  const ch = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--card-h"))||168;
  const maxX = Math.max(40, Math.min(stage.clientWidth/2 - cw/2 - 10, 470));
  const maxY = Math.max(40, Math.min(stage.clientHeight/2 - ch/2 - 10, 310));
  return {maxX,maxY};
}
function randPileTransform(){
  const {maxX,maxY} = pileSpread();
  const x=(Math.random()*2-1)*maxX, y=(Math.random()*2-1)*maxY;
  const r=(Math.random()*2-1)*26, sc=0.94+Math.random()*0.12;
  return `translate(${x.toFixed(0)}px, ${y.toFixed(0)}px) rotate(${r.toFixed(1)}deg) scale(${sc.toFixed(2)})`;
}
function buildChaoticPile(){
  const pile = $("#deckPile");
  pile.innerHTML = ""; pileCards = [];
  state.deck = shuffleArr(CARDS.slice());
  const zs = shuffleArr(Array.from({length:state.deck.length},(_,i)=>i+1));
  state.deck.forEach((card,i)=>{
    const el = document.createElement("div");
    el.className = "card-back dmini " + backClass(i);
    el.style.transform = randPileTransform();
    el.style.zIndex = zs[i];
    el.style.transition = "none";
    pile.appendChild(el); pileCards.push(el);
  });
  $("#shuffleHint").textContent = t("deckHintShuffled");
  $("#shuffleHint").style.display = "";
}
function shufflePass(){
  if(state.busy) return;
  state.busy = true;
  clearTimeout(expandTimer);
  $("#shuffleHint").textContent = t("deckHintShuffling");
  SFX.shuffle();
  const targets = shuffleArr(pileCards.map(c=>c.style.transform));
  pileCards.forEach((c,i)=>{
    c.style.transition = `transform ${0.7+Math.random()*0.3}s cubic-bezier(.2,.8,.2,1) ${Math.random()*0.16}s`;
    c.style.transform = targets[i];
    c.style.zIndex = 1 + Math.floor(Math.random()*pileCards.length);
  });
  setTimeout(()=>{
    state.busy = false;
    $("#shuffleHint").textContent = t("deckHintDone");
    expandTimer = setTimeout(expandToFan, 1100);
  }, 1300);
}
function expandToFan(){
  clearTimeout(expandTimer);
  state.busy = true;
  $("#shuffleHint").style.display = "none";
  pileCards.forEach(c=>{
    c.style.transition = "transform .3s ease";
    c.style.transform = "translate(0,0) rotate(0)";
    c.style.zIndex = Math.floor(pileCards.length/2);
  });
  setTimeout(()=>{
    $("#shuffleStage").classList.add("hidden");
    buildArc();
    const st = $("#shuffleTitle"), ss = $("#shuffleSub");
    if(st){ st.dataset.i18n = "pickTitle"; st.textContent = t("pickTitle"); }
    if(ss){ ss.dataset.i18n = "pickSub"; ss.textContent = t("pickSub"); }
    state.busy = false;
  }, 340);
}
function startShuffle(){
  state.busy = true;
  state.daily = false;
  state.fromHistory = false;
  state.currentEntryTs = null;
  state.histSaved = false;
  state.selected = [];
  $("#spreadSlots").innerHTML = "";
  $("#spreadSlots").className = "spread-slots";
  $("#fanStage").classList.add("hidden");
  $("#fanStage").classList.remove("picking-done");
  $("#deckPile").classList.remove("hidden");
  $("#shuffleStage").classList.remove("hidden");
  $("#shuffleHint").style.display = "";
  $("#shuffleHint").textContent = t("deckHint");
  state.flipped = 0;
  clearTimeout(state.goTimer);
  const fa0 = $("#btnFlipAll"); if(fa0) fa0.hidden = true;
  showView("shuffle");
  const st = $("#shuffleTitle"), ss = $("#shuffleSub");
  if(st){ st.dataset.i18n = "shuffleNow"; st.textContent = t("shuffleNow"); }
  if(ss){ ss.dataset.i18n = "focus"; ss.textContent = t("focus"); }
  buildChaoticPile();
  state.busy = false;
}

/* ---------- 弧形（近直弧 ±14°） ---------- */
function cardSize(){
  const cs = getComputedStyle(document.documentElement);
  return { w: parseFloat(cs.getPropertyValue("--card-w"))||96, h: parseFloat(cs.getPropertyValue("--card-h"))||168 };
}
function fanCardSize(){
  const el = fanCards[0];
  if(el && el.offsetWidth){ return { w: el.offsetWidth, h: el.offsetHeight }; }
  return cardSize();
}
function arcParams(){
  const stage = $("#fanStage");
  const {w,h} = fanCardSize();
  const sw = stage.clientWidth, sh = stage.clientHeight;
  const wHalf = sw/2 - 14;   // 两侧稍微收进来
  const thMax = 25;   // 扇形角度：越大弧度越明显（中部拱起、两端下坠）
  const rad = thMax*Math.PI/180, sin = Math.sin(rad), cos = Math.cos(rad);
  const Rw = (wHalf - (w/2)*cos - h*sin) / sin;
  const Rh = (sh - h - 16 - (w/2)*sin - 10) / (1 - cos);
  const R = Math.min(Rw, Rh, 4000);
  // 情感之境是「左二右二中间一」两行牌位，需要更多下方空间，弧形再抬高
  const tall = (state.spread === "emotion");
  const M = Math.max(50, Math.round(sh*(tall ? 0.80 : 0.70)));   // 底部留白，短屏也能完整显示
  return {R, thMax, M, sw, sh};
}
function applyArc(){
  const {R,thMax,M,sw,sh} = arcParams();
  const {h} = fanCardSize();
  const n = fanCards.length, baseY = sh/2 + h/2;
  fanCards.forEach((el,i)=>{
    const th = -thMax + (2*thMax*i)/(n-1);
    const rad = th*Math.PI/180;
    const dx = R*Math.sin(rad);
    const dy = (sh - M + R - R*Math.cos(rad)) - baseY;
    el.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px) rotate(${th.toFixed(1)}deg)`;
    el.dataset.base = el.style.transform;
    el.dataset.z = i;
    el.dataset.dx = dx.toFixed(1);
    el.dataset.dy = dy.toFixed(1);
    delete el.dataset.baseRect;
    el.style.zIndex = i;
  });
  const st = $("#fanStage");
  if(st){
    const stTop = st.getBoundingClientRect().top;
    let dyMin = Infinity, dyMax = -Infinity;
    fanCards.forEach(el=>{ const d = parseFloat(el.dataset.dy); if(d < dyMin) dyMin = d; if(d > dyMax) dyMax = d; });
    const centerBase = sh/2 + h/2;
    st.dataset.bandTop = String(Math.round(stTop + centerBase + dyMin - h/2 - 30));
    st.dataset.bandBot = String(Math.round(stTop + centerBase + dyMax + h/2 + 30));
  }
}
function buildArc(){
  const stage = $("#fanStage");
  stage.classList.remove("hidden");
  stage.querySelectorAll(".fcard").forEach(e=>e.remove());
  fanCards = [];
  const {w} = cardSize();
  const total = state.deck.length;
  const idxs = [];
  for(let i=0;i<total;i++) idxs.push(i);   // 78 张全部展示
  idxs.forEach(i=>{
    const el = document.createElement("div");
    el.className = "fcard";
    el.dataset.idx = i;
    el.innerHTML = `<div class="card-back ${backClass(i)}"></div>`;
    stage.appendChild(el);
    fanCards.push(el);
  });
  // 进度徽章
  const s = SPREADS[state.spread];
  let prog = $("#pickProgress");
  if(!prog){ prog = document.createElement("div"); prog.className = "pick-progress"; prog.id = "pickProgress"; stage.appendChild(prog); }
  prog.textContent = "0 / " + s.positions.length;
  // 中心聚拢 → 对称依次摊开
  const {R,M,sh} = arcParams();
  const {h} = cardSize();
  const baseY = sh/2 + h/2;
  const dy0 = (sh - M + R) - baseY;
  const c = (fanCards.length-1)/2;
  fanCards.forEach((el,i)=>{
    el.style.transition = "none";
    el.style.transform = `translate(0px, ${dy0.toFixed(1)}px) rotate(0deg)`;
    el.style.zIndex = i;
  });
  void stage.offsetWidth;
  requestAnimationFrame(()=>{
    fanCards.forEach((el,i)=>{
      el.style.transition = `transform .5s cubic-bezier(.2,.8,.3,1) ${Math.abs(i-c)*13}ms`;
    });
    applyArc();
    setTimeout(()=>{ fanCards.forEach(el=>{ el.style.transition = ""; }); }, 700 + Math.ceil(c)*13);
  });
  $("#pickHint").innerHTML = t("hintDraw");
}
/* ---------- 短按抽取 ---------- */
function bindFanInteractions(stage){
  let downX=0, downY=0, moved=false, downCard=null;
  stage.addEventListener("pointerdown", e=>{
    if(state.busy) return;
    downX = e.clientX; downY = e.clientY; moved = false;
    downCard = e.target.closest(".fcard");
    if(downCard) downCard.classList.add("pressing");
  });
  stage.addEventListener("pointermove", e=>{
    if(Math.abs(e.clientX-downX)>10 || Math.abs(e.clientY-downY)>10) moved = true;
  });
  const end = ()=>{
    if(downCard){ downCard.classList.remove("pressing"); downCard = null; }
    if(moved || state.busy) return;
    const topEl = document.elementFromPoint(downX, downY);
    const cardEl = topEl && topEl.closest ? topEl.closest(".fcard") : null;
    if(cardEl && !cardEl.classList.contains("picked")) pickCard(cardEl);
    else if(cardEl) toast(t("hintAlready"));
  };
  stage.addEventListener("pointerup", end);
  stage.addEventListener("pointercancel", end);
  stage.addEventListener("contextmenu", e=>e.preventDefault());
}
/* ---------- 选中一张牌 ---------- */
function pickCard(el){
  const idx = parseInt(el.dataset.idx,10);
  const card = state.deck[idx];
  const s = SPREADS[state.spread];
  const total = s.positions.length;
  if(state.selected.length >= total){ toast(t("hintFull", { n: total })); return; }
  const orientation = Math.random()<0.5 ? "up" : "rev";
  state.selected.push({card, orientation});
  const n = state.selected.length;

  el.classList.add("picked");
  SFX.select();
  setTimeout(()=>{
    el.remove();
    fanCards = fanCards.filter(x=>x!==el);
    fanCards.forEach(c=>{ c.style.transition = "transform .45s ease"; });
    applyArc();
    setTimeout(()=>{ fanCards.forEach(c=>{ c.style.transition = ""; }); }, 500);
  }, 480);

  const slot = document.createElement("div");
  slot.className = "slot";
  slot.innerHTML = `
    <div class="slot-pos">${isEn() ? s.positions[n-1].en : s.positions[n-1].zh}<span class="en3">${isEn() ? s.positions[n-1].zh : s.positions[n-1].en}</span></div>
    <div class="card-3d" data-sel="${n-1}">
      <div class="card-inner">
        <div class="face back"><div class="card-back ${backClass(idx)}"></div></div>
        <div class="face front">
          <span class="f-name">${card.en}</span>
          <img alt="${card.zh}">
        </div>
      </div>
    </div>`;
  $("#spreadSlots").appendChild(slot);
  const c3 = slot.querySelector(".card-3d");
  // 预先加载牌面图片，翻牌瞬间即可呈现
  const front = c3.querySelector(".face.front");
  const img = front.querySelector("img");
  img.src = IMG_BASE + card.img;
  bindImgFallback(img, card, ()=>fallbackImg(front, card));
  if(orientation==="rev") img.classList.add("rev");
  // 抽出的牌：直接点击牌面逐张翻开；翻开后再点一次可翻转正逆位
  c3.addEventListener("click", ()=>flipCard(c3));
  setTimeout(()=>c3.classList.add("arrive"), 30);

  const prog = $("#pickProgress");
  if(prog) prog.textContent = n + " / " + total;
  const slotLayout = { time:"slots-line", triangle:"slots-valley", gainloss:"slots-pair", emotion:"slots-emotion" }[state.spread] || "slots-row";
  $("#spreadSlots").className = "spread-slots " + slotLayout;

  if(n < total){
    $("#pickHint").innerHTML = t("hintPick", { n: n, total: total });
  } else {
    $("#fanStage").classList.add("picking-done");   // 抽齐后收起余牌，聚焦你的牌面
    SFX.done();
    updateRevealHint();
    const fa = $("#btnFlipAll");
    if(fa){ fa.hidden = false; fa.textContent = t("flipAll"); }
  }
}
/* ---------- 逐张翻牌：点击牌面翻开（正逆位由随机抽牌决定，不可再切换） ---------- */
function flipCard(c3){
  if(state.busy || !c3) return;
  const sel = state.selected[+c3.dataset.sel];
  if(!sel) return;
  if(!c3.classList.contains("flipped")){
    c3.classList.add("flipped");
    SFX.flip();
    state.flipped += 1;
  }
  const total = SPREADS[state.spread].positions.length;
  if(state.selected.length >= total){
    if(state.flipped >= total){
      const fa = $("#btnFlipAll"); if(fa) fa.hidden = true;
      finishReveal();
    } else updateRevealHint();
  }
}
function updateRevealHint(){
  const total = SPREADS[state.spread].positions.length;
  const remain = total - state.flipped;
  if(remain <= 0){ finishReveal(); return; }
  $("#pickHint").innerHTML = remain === total
    ? t("hintReady", { n: total })
    : t("hintFlipped", { x: total - remain, y: remain, total: total });
}
function finishReveal(){
  if(state.busy) return;
  state.busy = true;
  $("#pickHint").innerHTML = t("hintRevealing");
  clearTimeout(state.goTimer);
  state.goTimer = setTimeout(()=>{
    state.busy = false;
    buildReading();
  }, 1500);
}
function fallbackImg(front, card){
  const img = front.querySelector("img");
  if(!img) return;
  const fb = document.createElement("div");
  fb.className = "img-fb";
  fb.innerHTML = `<div class="fb-sym">${SUIT_SYM[card.suit]}</div><div class="fb-zh">${card.zh}</div><div class="fb-en">${card.en}</div>`;
  img.replaceWith(fb);
}

/* ---------- DeepSeek AI 整体解读 ---------- */
const API_KEY_STORAGE = "tarot_deepseek_key";
const TAROT_CONFIG = (typeof window !== "undefined" && window.TAROT_CONFIG) || {};
const DEEPSEEK_URL = TAROT_CONFIG.deepseekUrl || "https://api.deepseek.com/chat/completions";
const DEEPSEEK_MODEL = "deepseek-chat";
/* Key 优先级：配置文件 js/config.js → 浏览器本地缓存（旧版本手动填写的） */
/* 每日 AI 解读次数（防滥用）：每个浏览器每天最多 N 次，超出回退本地模板 */
const AI_QUOTA_KEY = "lumina_ai_quota", AI_QUOTA_MAX = 8;
function aiQuota(){
  const today = new Date().toISOString().slice(0, 10);
  try{
    const d = JSON.parse(localStorage.getItem(AI_QUOTA_KEY) || "{}");
    if(d && d.date === today) return { date: today, count: d.count || 0 };
  }catch(e){}
  return { date: today, count: 0 };
}
function bumpAiQuota(){
  const q = aiQuota(); q.count += 1;
  try{ localStorage.setItem(AI_QUOTA_KEY, JSON.stringify(q)); }catch(e){}
}
function getApiKey(){
  const cfg = String(TAROT_CONFIG.deepseekKey || "").trim();
  if(cfg) return cfg;
  try{ return localStorage.getItem(API_KEY_STORAGE) || ""; }catch(e){ return ""; }
}
function renderMd(text){
  const esc = t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const lines = esc(text).split(/\n+/).map(l=>l.trim()).filter(Boolean);
  let html = "";
  for(const line of lines){
    if(/^#{1,3}\s/.test(line)) html += `<h4>${line.replace(/^#{1,3}\s/,"")}</h4>`;
    else html += `<p>${line.replace(/\*\*(.+?)\*\*/g,"<b>$1</b>")}</p>`;
  }
  return html;
}
async function callDeepSeekStream(question, cards, onDelta, signal){
  const key = getApiKey();
  if(!key) throw new Error(isEn() ? "API key not configured" : "未配置 API Key");
  const en = isEn();
  const cardLines = cards.map((sel,i)=>{
    const c = sel.card, o = sel.orientation;
    const kw = (en ? (o === "rev" ? c.enKwRev : c.enKwUp) : (o === "rev" ? c.kwRev : c.kwUp)).join(en ? ", " : "、");
    const meaning = en ? (o === "rev" ? c.enRev : c.enUp) : (o === "rev" ? c.rev : c.up);
    const ori = en ? (o === "rev" ? "Reversed" : "Upright") : (o === "rev" ? "逆位" : "正位");
    return `${i+1}. ${en ? c.en : c.zh} · ${ori} · Keywords: ${kw} · Meaning: ${meaning}`;
  }).join("\n");
  const system = en
    ? "You are a gentle, professional and spiritual tarot reader. Write in English: begin with an \"Overall Answer\" that directly responds to the seeker's question, weaving all cards, orientations and position meanings into one coherent analysis with practical advice. Use **bold** for key points; be warm, natural and avoid templates or emojis."
    : "你是一位温柔、专业、富有灵性的塔罗解读师，擅长结合占卜者的问题解读牌面。请用中文输出：先写一段「总体回答」——综合全部抽到的牌、正逆位与位置含义，直接回应占卜者的问题，给出连贯的整合分析与建议；可以适当分段，用 **加粗** 强调关键点。风格温柔治愈、自然流畅、避免模板腔与机械罗列，不要使用 emoji。";
  const prof = profileSummary(en);
  const user = en
    ? `My question: ${question}\n\nCards I drew (with orientation and position order):\n${cardLines}\n\nPlease give an overall reading in response to my question.${prof ? "\n\n" + prof : ""}`
    : `我的问题：${question}\n\n我抽到的牌（已含正逆位与位置顺序）：\n${cardLines}\n\n请结合问题给出整体解读。${prof ? "\n\n" + prof : ""}`;
  const res = await fetch(DEEPSEEK_URL, {
    method:"POST",
    headers:{ "Content-Type":"application/json", "Authorization":"Bearer " + key },
    body: JSON.stringify({ model:DEEPSEEK_MODEL, messages:[{role:"system",content:system},{role:"user",content:user}], temperature:0.9, max_tokens:1200, stream:true }),
    signal
  });
  if(!res.ok){
    let detail = "";
    try{ const j = await res.json(); detail = (j.error && j.error.message) || JSON.stringify(j).slice(0,140); }catch(e){}
    throw new Error("API " + res.status + (detail ? "：" + detail : ""));
  }
  const reader = res.body.getReader();
  const dec = new TextDecoder();
  let buf = "", full = "";
  const handleLine = (line)=>{
    const tstr = line.trim();
    if(!tstr.startsWith("data:")) return;
    const payload = tstr.slice(5).trim();
    if(!payload || payload === "[DONE]") return;
    try{
      const j = JSON.parse(payload);
      const delta = j.choices && j.choices[0] && j.choices[0].delta && j.choices[0].delta.content;
      if(delta){ full += delta; if(onDelta) onDelta(full); }
    }catch(e){}
  };
  while(true){
    const { done, value } = await reader.read();
    if(done) break;
    buf += dec.decode(value, { stream:true });
    let idx;
    while((idx = buf.indexOf("\n")) >= 0){
      handleLine(buf.slice(0, idx));
      buf = buf.slice(idx + 1);
    }
  }
  buf += dec.decode();
  if(buf) handleLine(buf);
  return full;
}
function overallHTML(lang, selected, spreadKey, isDaily, question){
  const s = SPREADS[spreadKey];
  const en = lang === "en";
  const tt = (k, vars) => {
    let str = (I18N[lang] && I18N[lang][k] != null) ? I18N[lang][k] : (I18N.zh[k] != null ? I18N.zh[k] : k);
    if(vars){ for(const kk in vars) str = str.split("{" + kk + "}").join(vars[kk]); }
    return str;
  };
  const q = isDaily ? (en ? "Daily Fortune" : "今日运势") : (question || (en ? "Daily Guidance" : "今日指引"));
  const items = selected.map((sel,i)=>{
    const c = sel.card, o = sel.orientation, p = s.positions[i];
    const kwArr = en ? (o === "rev" ? c.enKwRev : c.enKwUp) : (o === "rev" ? c.kwRev : c.kwUp);
    const kw = (kwArr || []).slice(0,3).join(en ? ", " : "、");
    return { c, o, kw, first:(kwArr || [])[0], name: en ? c.en : c.zh, pname: p ? (en ? (p.en || "") : (p.zh || "")) : "", pdesc: p ? (p.d || "") : "" };
  });
  const list = items.map(it => (it.pname ? it.pname + " · " : "") + it.name).join(en ? "  ·  " : "　");
  let h = `<div class="overall">`;
  h += `<div class="overall-head">${tt("overallHead")}</div>`;
  h += `<p class="overall-list">${tt("overallList", { list: escapeHtml(list) })}</p>`;
  h += `<div class="overall-body"><p>${tt("overallQ", { q: escapeHtml(q) })}</p>`;
  items.forEach(it=>{
    const ori = tt(it.o === "rev" ? "oriRev" : "oriUp");
    if(it.pname){
      h += en
        ? `<p>${escapeHtml(it.name)} (${ori}) in the ${escapeHtml(it.pname)} position carries the energy of “${escapeHtml(it.kw)}”.</p>`
        : `<p>「${escapeHtml(it.pname)}」的「${escapeHtml(it.name)}」${ori}呈现，携带「${escapeHtml(it.kw)}」的能量——${escapeHtml(it.pdesc)}。</p>`;
    } else {
      h += en
        ? `<p>${escapeHtml(it.name)} (${ori}) carries the energy of “${escapeHtml(it.kw)}”.</p>`
        : `<p>「${escapeHtml(it.name)}」${ori}呈现，携带「${escapeHtml(it.kw)}」的能量。</p>`;
    }
  });
  const firsts = items.map(it => it.first || "").filter(Boolean).join(" → ");
  h += `<p class="overall-end">${tt("overallEnd", { firsts: escapeHtml(firsts) })}</p></div></div>`;
  return h;
}
function buildOverall(){
  return overallHTML(state.lang, state.selected, state.spread, state.daily, state.question);
}
function renderOverall(){
  const box = $("#overallReading");
  const key = getApiKey();
  if(state.fromHistory){
    const h = getHistory().find(x => x.ts === state.currentEntryTs);
    const saved = h ? (isEn() ? (h.overallEn || h.overall) : (h.overall || h.overallEn)) : "";
    if(saved){
      box.innerHTML = `<div class="overall"><div class="overall-head">${t("overallHeadAI")}</div><div class="overall-body ai-text"><div class="ai-stream">${renderMd(saved)}</div></div></div>`;
      return;
    }
  }
  const seq = state.readSeq;
  if(state.readAbort){ try{ state.readAbort.abort(); }catch(e){} state.readAbort = null; }
  if(!key){ box.innerHTML = buildOverall(); autoSaveHistory(); return; }
  const quota = aiQuota();
  if(quota.count >= AI_QUOTA_MAX){
    box.innerHTML = buildOverall() + `<p class="ai-quota-tip">${t("aiQuota", { n: AI_QUOTA_MAX })}</p>`;
    autoSaveHistory();
    return;
  }
  bumpAiQuota();
  autoSaveHistory();
  box.innerHTML = `<div class="overall"><div class="overall-head">${t("overallHeadAI")}</div><div class="overall-body ai-text"><div class="ai-loading">${t("aiLoading")}</div><div class="ai-stream"></div></div><div class="ai-actions" style="display:none"><button class="ai-retry" type="button">${t("aiRetry")}</button></div></div>`;
  const streamBox = box.querySelector(".ai-stream");
  const loadEl = box.querySelector(".ai-loading");
  const actions = box.querySelector(".ai-actions");
  const ctrl = new AbortController();
  state.readAbort = ctrl;
  let lastPaint = 0;
  const askQ = state.daily
    ? (isEn() ? "Daily Fortune — please give an overall guidance for today." : "今日运势（请给出今天的整体指引）")
    : (state.question || t("questionDefault"));
  callDeepSeekStream(
    askQ,
    state.selected,
    (full)=>{
      if(seq !== state.readSeq) return;   // 已离开解读页，丢弃本次结果
      const now = performance.now();
      if(now - lastPaint < 80) return;
      lastPaint = now;
      if(loadEl) loadEl.style.display = "none";
      streamBox.innerHTML = renderMd(full);
    },
    ctrl.signal
  ).then(txt=>{
    if(seq !== state.readSeq) return;   // 已离开解读页，丢弃本次结果
    if(loadEl) loadEl.style.display = "none";
    if(!txt){ streamBox.innerHTML = ""; if(loadEl) loadEl.style.display = ""; box.innerHTML = buildOverall(); autoSaveHistory(); return; }
    streamBox.innerHTML = renderMd(txt);
    if(actions){
      actions.style.display = "";
      const btn = actions.querySelector(".ai-retry");
      btn.addEventListener("click", ()=>{ renderOverall(); SFX.select(); });
    }
    autoSaveHistory(txt);
  }).catch(err=>{
    if(seq !== state.readSeq) return;   // 已离开解读页，丢弃本次结果
    box.innerHTML = buildOverall() + `<div class="ai-fail">${t("aiFail", { e: escapeHtml(err.message) })}</div>`;
    const btn = document.createElement("button");
    btn.type="button"; btn.className="ai-retry"; btn.textContent = t("aiRetry");
    btn.style.marginTop = ".6rem";
    btn.addEventListener("click", ()=>{ renderOverall(); SFX.select(); });
    box.querySelector(".ai-fail").appendChild(btn);
    autoSaveHistory();
  });
}

/* ---------- 收藏（localStorage） ---------- */
const FAV_KEY = "lumina_favs";
function getFavs(){ try{ const a = JSON.parse(localStorage.getItem(FAV_KEY) || "[]"); return Array.isArray(a) ? a : []; }catch(e){ return []; } }
function isFav(zh){ return getFavs().some(f => f && f.zh === zh); }
function toggleFav(zh, en, img, ori){
  const list = getFavs();
  const i = list.findIndex(f => f && f.zh === zh);
  if(i >= 0){ list.splice(i, 1); } else { list.push({ zh, en, img, ori, ts: Date.now() }); }
  try{ localStorage.setItem(FAV_KEY, JSON.stringify(list)); }catch(e){}
  return i < 0;
}

/* ---------- 底部缩略导航 ---------- */
let tnObserver = null;
function buildThumbNav(){
  const nav = $("#thumbNav");
  if(!nav) return;
  nav.innerHTML = state.selected.map((sel, i) => {
    const rev = sel.orientation === "rev" ? ' class="rev"' : "";
    return `<button type="button" class="tn-item" data-i="${i}" aria-label="${isEn() ? "Go to card " + (i+1) : "跳到第 " + (i+1) + " 张"}"><img src="${IMG_BASE}${sel.card.img}" alt="${escapeHtml(sel.card.zh)}"${rev}></button>`;
  }).join("");
  nav.classList.toggle("hidden", state.selected.length < 2);
  nav.querySelectorAll(".tn-item").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const rd = $("#rd-" + btn.dataset.i);
      if(rd){
        rd.scrollIntoView({ behavior: "smooth", block: "center" });
        rd.classList.remove("flash"); void rd.offsetWidth; rd.classList.add("flash");
        setTimeout(()=>rd.classList.remove("flash"), 1200);
      }
      SFX.select();
    });
  });
  if(tnObserver){ tnObserver.disconnect(); tnObserver = null; }
  tnObserver = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{
      if(!en.isIntersecting) return;
      const idx = en.target.id.replace("rd-", "");
      nav.querySelectorAll(".tn-item").forEach(b => b.classList.toggle("on", b.dataset.i === idx));
    });
  }, { rootMargin: "-42% 0px -42% 0px" });
  $$("#readings .reading").forEach(rd => tnObserver.observe(rd));
}

/* ---------- 分享卡生成（Canvas 导出 PNG） ---------- */
function rr(g, x, y, w, h, r){
  if(g.roundRect){ g.beginPath(); g.roundRect(x, y, w, h, r); return; }
  g.beginPath();
  g.moveTo(x + r, y);
  g.arcTo(x + w, y, x + w, y + h, r);
  g.arcTo(x + w, y + h, x, y + h, r);
  g.arcTo(x, y + h, x, y, r);
  g.arcTo(x, y, x + w, y, r);
  g.closePath();
}
function loadCardImg(src){
  return new Promise(resolve=>{
    const im = new Image();
    im.crossOrigin = "anonymous";
    im.onload = ()=>resolve(im);
    im.onerror = ()=>resolve(null);
    im.src = src;
  });
}
async function shareReading(){
  const btn = $("#btnShare");
  if(btn) btn.disabled = true;
  const en = isEn();
  try{
    const W = 1080, H = 1620;
    const c = document.createElement("canvas");
    c.width = W; c.height = H;
    const g = c.getContext("2d");
    const bg = g.createLinearGradient(0, 0, 0, H);
    bg.addColorStop(0, "#FFF2D8"); bg.addColorStop(.55, "#FFD8DD"); bg.addColorStop(1, "#FFC9D6");
    g.fillStyle = bg; g.fillRect(0, 0, W, H);
    g.strokeStyle = "rgba(224,106,136,.4)"; g.lineWidth = 3;
    rr(g, 44, 44, W - 88, H - 88, 40); g.stroke();
    g.textAlign = "center";
    g.fillStyle = "#E06A88";
    g.font = "700 64px 'PingFang SC','Microsoft YaHei',sans-serif";
    g.fillText(en ? "✦ LuminaTarot ✦" : "✦ 琉光塔罗 ✦", W / 2, 168);
    g.fillStyle = "rgba(140,90,68,.85)";
    g.font = "400 30px 'PingFang SC','Microsoft YaHei',sans-serif";
    const q = state.daily ? t("dailyTitle") : (state.question || t("questionDefault"));
    g.fillText(q.slice(0, 24), W / 2, 226);
    const s = SPREADS[state.spread];
    const n = state.selected.length;
    const gap = 26;
    const cardW = Math.min(196, (W - 110 - gap * (n - 1)) / n);
    const cardH = cardW * 1.75;
    const totalW = cardW * n + gap * (n - 1);
    const x0 = (W - totalW) / 2, y0 = 640;
    const imgs = await Promise.all(state.selected.map(sel => loadCardImg(IMG_BASE + sel.card.img)));
    state.selected.forEach((sel, i) => {
      const cx = x0 + i * (cardW + gap), cy = y0;
      g.fillStyle = "#FFF9EC";
      g.strokeStyle = "rgba(242,136,160,.85)"; g.lineWidth = 5;
      rr(g, cx - 8, cy - 8, cardW + 16, cardH + 16, 16); g.fill(); g.stroke();
      const im = imgs[i];
      if(im){
        g.save();
        rr(g, cx, cy, cardW, cardH, 10); g.clip();
        if(sel.orientation === "rev"){
          g.translate(cx + cardW / 2, cy + cardH / 2);
          g.rotate(Math.PI);
          g.drawImage(im, -cardW / 2, -cardH / 2, cardW, cardH);
        } else {
          g.drawImage(im, cx, cy, cardW, cardH);
        }
        g.restore();
      } else {
        g.fillStyle = "#FFE9D6"; rr(g, cx, cy, cardW, cardH, 10); g.fill();
        g.fillStyle = "#E06A88"; g.font = "700 36px 'PingFang SC','Microsoft YaHei',sans-serif";
        g.fillText(L.name(sel.card), cx + cardW / 2, cy + cardH / 2 + 12);
      }
      g.fillStyle = "#8C5A44";
      g.font = "600 26px 'PingFang SC','Microsoft YaHei',sans-serif";
      const p = s.positions[i];
      g.fillText(p && p.zh ? (en ? (p.en || "") : p.zh) : (en ? "Card " + (i + 1) : "第" + (i + 1) + "张"), cx + cardW / 2, y0 + cardH + 56);
      g.fillStyle = "#B98A72";
      g.font = "400 22px 'PingFang SC','Microsoft YaHei',sans-serif";
      g.fillText(L.name(sel.card) + " · " + t(sel.orientation === "rev" ? "oriRev" : "oriUp"), cx + cardW / 2, y0 + cardH + 92);
    });
    g.fillStyle = "rgba(224,106,136,.9)";
    g.font = "400 25px 'PingFang SC','Microsoft YaHei',sans-serif";
    g.fillText(t("shareFooter"), W / 2, H - 128);
    const a = document.createElement("a");
    a.download = (en ? "LuminaTarot-share-" : "琉光塔罗-分享卡-") + new Date().toISOString().slice(0, 10) + ".png";
    a.href = c.toDataURL("image/png");
    a.click();
    toast(t("shareOk"));
  }catch(err){
    console.error(err);
    toast(t("shareErr"));
  }finally{
    if(btn) btn.disabled = false;
  }
}

/* ---------- 昼夜主题 ---------- */
const THEME_KEY = "lumina_theme";
function applyTheme(t){
  const night = t === "night";
  document.documentElement.dataset.theme = night ? "night" : "light";
  const sun = $("#icon-sun"), moon = $("#icon-moon");
  if(sun) sun.style.display = night ? "none" : "";
  if(moon) moon.style.display = night ? "" : "none";
}
/* ---------- 固定背景鎏金元素：小星 · 小月亮 · 金纸片（三层景深，静止） ---------- */
function initGilded(){
  const layer = document.querySelector(".gilded");
  if(!layer) return;
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  // 景深：远景数量最多(小、虚)，中景清晰，近景很少(大、更虚)
  const depth = () => {
    const r = Math.random();
    return r < .55 ? "d-far" : r < .9 ? "d-mid" : "d-near";
  };
  const base = (d, far, mid, near) => Math.round(d === "d-far" ? far : d === "d-mid" ? mid : near);
  const spread = (a, b) => a + Math.random() * (b - a);
  const pos = el => {
    el.style.left = rand(1, 97).toFixed(1) + "vw";
    el.style.top = rand(3, 94).toFixed(1) + "vh";
  };
  const starGlyphs = ["✦","✦","✦","✧","✶"];
  const moonGlyphs = ["☾","☽"];
  // 星星
  for(let i=0;i<84;i++){
    const d = depth();
    const s = document.createElement("span");
    s.className = "g-star " + d;
    s.textContent = pick(starGlyphs);
    s.style.fontSize = (d === "d-far" ? spread(6,10) : d === "d-mid" ? spread(9,15) : spread(22,34)).toFixed(1) + "px";
    pos(s);
    layer.appendChild(s);
  }
  // 小月亮
  for(let i=0;i<26;i++){
    const d = depth();
    const m = document.createElement("span");
    m.className = "g-moon " + d;
    m.textContent = pick(moonGlyphs);
    m.style.fontSize = (d === "d-far" ? spread(8,13) : d === "d-mid" ? spread(12,18) : spread(26,40)).toFixed(1) + "px";
    m.style.transform = "rotate(" + rand(-25, 25).toFixed(0) + "deg)";
    pos(m);
    layer.appendChild(m);
  }
  // 金色纸片
  for(let i=0;i<60;i++){
    const d = depth();
    const p = document.createElement("span");
    p.className = "g-paper " + d;
    p.style.width = (d === "d-far" ? spread(6,9) : d === "d-mid" ? spread(8,13) : spread(16,26)).toFixed(1) + "px";
    p.style.height = (d === "d-far" ? spread(3,4.5) : d === "d-mid" ? spread(4,6) : spread(6,11)).toFixed(1) + "px";
    p.style.transform = "rotate(" + rand(-45, 45).toFixed(0) + "deg)";
    pos(p);
    layer.appendChild(p);
  }

  // —— 前景：实（清晰金屑）/ 虚（柔焦光点）混搭，主体内容附近避让 ——
  const front = document.querySelector(".gilded-front");
  if(front){
    const posEdge = (el) => {
      let x = rand(1, 97), y = rand(3, 94);
      if(x > 18 && x < 82 && y > 8 && y < 78 && Math.random() < .7){
        if(Math.random() < .5){ x = Math.random() < .5 ? rand(1, 14) : rand(86, 97); }
        else { y = Math.random() < .5 ? rand(3, 8) : rand(88, 94); }
      }
      el.style.left = x.toFixed(1) + "vw";
      el.style.top = y.toFixed(1) + "vh";
    };
    for(let i=0;i<14;i++){
      const s = document.createElement("span");
      s.className = "g-star v-crisp";
      s.textContent = pick(starGlyphs);
      s.style.fontSize = spread(9, 18).toFixed(1) + "px";
      posEdge(s);
      front.appendChild(s);
    }
    for(let i=0;i<6;i++){
      const s = document.createElement("span");
      s.className = "g-star v-bokeh";
      s.textContent = pick(starGlyphs);
      s.style.fontSize = spread(16, 30).toFixed(1) + "px";
      s.style.transform = "rotate(" + rand(-40, 40).toFixed(0) + "deg)";
      posEdge(s);
      front.appendChild(s);
    }
    for(let i=0;i<8;i++){
      const m = document.createElement("span");
      m.className = "g-moon v-crisp";
      m.textContent = pick(moonGlyphs);
      m.style.fontSize = spread(13, 22).toFixed(1) + "px";
      m.style.transform = "rotate(" + rand(-30, 30).toFixed(0) + "deg)";
      posEdge(m);
      front.appendChild(m);
    }
    for(let i=0;i<2;i++){
      const m = document.createElement("span");
      m.className = "g-moon v-bokeh";
      m.textContent = pick(moonGlyphs);
      m.style.fontSize = spread(22, 34).toFixed(1) + "px";
      m.style.transform = "rotate(" + rand(-40, 40).toFixed(0) + "deg)";
      posEdge(m);
      front.appendChild(m);
    }
    for(let i=0;i<8;i++){
      const p = document.createElement("span");
      p.className = "g-paper v-crisp";
      p.style.width = spread(10, 18).toFixed(1) + "px";
      p.style.height = spread(4, 7).toFixed(1) + "px";
      p.style.transform = "rotate(" + rand(-50, 50).toFixed(0) + "deg)";
      posEdge(p);
      front.appendChild(p);
    }
    for(let i=0;i<3;i++){
      const p = document.createElement("span");
      p.className = "g-paper v-bokeh";
      p.style.width = spread(16, 26).toFixed(1) + "px";
      p.style.height = spread(6, 10).toFixed(1) + "px";
      p.style.transform = "rotate(" + rand(-60, 60).toFixed(0) + "deg)";
      posEdge(p);
      front.appendChild(p);
    }
  }
}
function initTheme(){
  let t = "light";
  try{ t = localStorage.getItem(THEME_KEY) || "light"; }catch(e){}
  applyTheme(t);
  $("#themeBtn").addEventListener("click", ()=>{
    const next = document.documentElement.dataset.theme === "night" ? "light" : "night";
    try{ localStorage.setItem(THEME_KEY, next); }catch(e){}
    applyTheme(next);
    SFX.select();
    toast(next === "night" ? t("themeNight") : t("themeDay"));
  });
}

/* ---------- 音效设置：音量调节 + 静音（含轻柔氛围底噪） ---------- */
const SOUND_VOL_KEY = "lumina_sound_vol";
const sound = { gain:null };
function soundVol(){ try{ const v = parseFloat(localStorage.getItem(SOUND_VOL_KEY)); return isNaN(v) ? 0.5 : Math.max(0, Math.min(1, v)); }catch(e){ return 0.5; } }
/* 神秘氛围纯音乐（程序化生成：低频铺底 + 缓慢和弦垫 + 稀疏钟音 + 空间回声） */
function setupAmbient(){
  if(sound.master) return true;
  const ctx = ac(); if(!ctx) return false;
  const master = ctx.createGain(); master.gain.value = 0;
  const tone = ctx.createBiquadFilter(); tone.type = "lowpass"; tone.frequency.value = 1400; tone.Q.value = 0.4;
  const delay = ctx.createDelay(2.0); delay.delayTime.value = 0.46;
  const fb = ctx.createGain(); fb.gain.value = 0.34;
  const wet = ctx.createGain(); wet.gain.value = 0.45;
  const dry = ctx.createGain(); dry.gain.value = 0.75;
  master.connect(tone);
  tone.connect(dry); dry.connect(ctx.destination);
  tone.connect(delay); delay.connect(fb); fb.connect(delay); delay.connect(wet); wet.connect(ctx.destination);
  sound.master = master;

  // 1) 低频嗡鸣铺底（两个轻微失谐的正弦 + 缓慢滤波摆动）
  const droneGain = ctx.createGain(); droneGain.gain.value = 0.055; droneGain.connect(master);
  const dLp = ctx.createBiquadFilter(); dLp.type = "lowpass"; dLp.frequency.value = 320; dLp.connect(droneGain);
  [55, 82.41].forEach((f, i)=>{
    const o = ctx.createOscillator();
    o.type = "sine"; o.frequency.value = f;
    const g = ctx.createGain(); g.gain.value = i ? 0.45 : 1;
    o.connect(g); g.connect(dLp); o.start();
  });
  const lfo = ctx.createOscillator(); lfo.type = "sine"; lfo.frequency.value = 0.045;
  const lfoAmt = ctx.createGain(); lfoAmt.gain.value = 140;
  lfo.connect(lfoAmt); lfoAmt.connect(dLp.frequency); lfo.start();

  // 2) 缓慢和弦垫：小调音阶，长期渐变
  const chords = [
    [220.00, 261.63, 329.63],   // Am
    [196.00, 246.94, 293.66],   // G/B
    [174.61, 220.00, 261.63],   // F
    [164.81, 196.00, 246.94]    // E
  ];
  let chordIdx = 0;
  const playChord = ()=>{
    const now = ctx.currentTime;
    const notes = chords[chordIdx % chords.length]; chordIdx++;
    notes.forEach((f, i)=>{
      const o = ctx.createOscillator(); o.type = "triangle"; o.frequency.value = f;
      const g = ctx.createGain(); g.gain.value = 0;
      const lp = ctx.createBiquadFilter(); lp.type = "lowpass"; lp.frequency.value = 1200; lp.Q.value = 0.5;
      o.connect(lp); lp.connect(g); g.connect(master);
      const peak = 0.035 / (i * 0.35 + 1);
      const atk = 4.5 + i * 0.6, hold = 5.5, rel = 5.0;
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(peak, now + atk);
      g.gain.setValueAtTime(peak, now + atk + hold);
      g.gain.linearRampToValueAtTime(0, now + atk + hold + rel);
      o.start(now); o.stop(now + atk + hold + rel + 0.2);
    });
  };

  // 3) 稀疏钟音（五声音阶，随机间隔）
  const bells = [523.25, 587.33, 659.25, 783.99, 880.00, 1046.50];
  const playBell = ()=>{
    const now = ctx.currentTime;
    const f = bells[Math.floor(Math.random() * bells.length)];
    const o = ctx.createOscillator(); o.type = "sine"; o.frequency.value = f;
    const o2 = ctx.createOscillator(); o2.type = "sine"; o2.frequency.value = f * 2.01;
    const g = ctx.createGain(); g.gain.value = 0;
    const g2 = ctx.createGain(); g2.gain.value = 0;
    o.connect(g); o2.connect(g2); g.connect(master); g2.connect(master);
    const peak = 0.028, decay = 3.6;
    [g, g2].forEach((gn, i)=>{
      gn.gain.setValueAtTime(0, now);
      gn.gain.linearRampToValueAtTime(i ? peak * 0.25 : peak, now + 0.02);
      gn.gain.exponentialRampToValueAtTime(0.0001, now + decay);
    });
    o.start(now); o2.start(now); o.stop(now + decay + 0.1); o2.stop(now + decay + 0.1);
  };

  playChord();
  let t = 0;
  const loop = ()=>{
    t += 1;
    if(t % 11 === 0) playChord();
    if(Math.random() < 0.3) playBell();
  };
  sound.timer = setInterval(loop, 1000);
  return true;
}
function syncAmbientGain(){
  const node = sound.master || sound.gain;
  if(!node) return;
  const ctx = ac(); if(!ctx) return;
  const target = state.muted ? 0 : soundVol() * 0.5;
  try{ node.gain.setTargetAtTime(target, ctx.currentTime, 0.8); }catch(e){ node.gain.value = target; }
}
function paintMuteIcon(){
  const on = $("#icon-audio-on"), off = $("#icon-audio-off"), sw = $("#muteSwitch");
  if(on) on.style.display = state.muted ? "none" : "block";
  if(off) off.style.display = state.muted ? "block" : "none";
  if(sw){
    sw.classList.toggle("on", state.muted);
    sw.setAttribute("aria-checked", state.muted ? "true" : "false");
  }
}
/* ---------- 常驻自定义滚动条 ---------- */
let csUpdate = null;
/* 视口尺寸 / header 高度：跨平台（Windows 滚动条、移动端地址栏、字体差异）统一布局基准 */
function applyChromeVars(){
  const d = document.documentElement;
  d.style.setProperty("--vw", d.clientWidth + "px");
  const h = document.querySelector(".site-header");
  const ch = h ? Math.ceil(h.getBoundingClientRect().bottom) : 100;
  d.style.setProperty("--chrome-h", ch + "px");
}
function updateCustomScrollbar(){ if(csUpdate) csUpdate(); }
function initCustomScrollbar(){
  const rail = document.createElement("div");
  rail.className = "cs-rail";
  const thumb = document.createElement("div");
  thumb.className = "cs-thumb";
  rail.appendChild(thumb);
  document.body.appendChild(rail);
  let targetEl = null;

  const update = ()=>{
    const modal = document.querySelector(".learn-modal .lm-box");
    const view = modal || [...document.querySelectorAll(".view")].find(v => v.classList.contains("active"));
    targetEl = view;
    if(!targetEl){ rail.classList.remove("on"); return; }
    const r = targetEl.getBoundingClientRect();
    if(r.height < 20 || r.right < 20){ rail.classList.remove("on"); return; }
    const maxScroll = targetEl.scrollHeight - targetEl.clientHeight;
    if(maxScroll <= 0){ rail.classList.remove("on"); return; }   // 一屏内容：不显示滚动条
    rail.classList.add("on");
    rail.style.top = Math.round(r.top + 4) + "px";
    rail.style.height = Math.round(r.height - 8) + "px";
    const H = Math.max(20, Math.floor(r.height - 8));
    let th = Math.max(36, Math.round(H * (targetEl.clientHeight / targetEl.scrollHeight)));
    th = Math.min(th, H - 2);
    const ty = Math.round((targetEl.scrollTop / maxScroll) * (H - th - 2));
    thumb.style.height = th + "px";
    thumb.style.top = ty + "px";
  };
  csUpdate = update;

  window.addEventListener("resize", update);
  document.addEventListener("scroll", update, true);

  let drag = null;
  thumb.addEventListener("pointerdown", e=>{
    if(!targetEl) return;
    const maxScroll = targetEl.scrollHeight - targetEl.clientHeight;
    if(maxScroll <= 0) return;
    drag = { y: e.clientY, top: targetEl.scrollTop, H: rail.clientHeight - 8, th: thumb.clientHeight };
    try{ thumb.setPointerCapture(e.pointerId); }catch(err){}
    e.preventDefault();
  });
  thumb.addEventListener("pointermove", e=>{
    if(!drag || !targetEl) return;
    const maxScroll = targetEl.scrollHeight - targetEl.clientHeight;
    if(maxScroll <= 0) return;
    const span = Math.max(1, drag.H - drag.th);
    targetEl.scrollTop = drag.top + ((e.clientY - drag.y) / span) * maxScroll;
    update();
  });
  const endDrag = ()=>{ drag = null; };
  thumb.addEventListener("pointerup", endDrag);
  thumb.addEventListener("pointercancel", endDrag);
  rail.addEventListener("pointerdown", e=>{
    if(e.target === thumb || !targetEl) return;
    const maxScroll = targetEl.scrollHeight - targetEl.clientHeight;
    if(maxScroll <= 0) return;
    const br = rail.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientY - br.top) / br.height));
    targetEl.scrollTop = ratio * maxScroll;
    update();
  });

  setInterval(update, 400);
  update();
}

function initSoundPanel(){
  const btn = $("#soundBtn"), pop = $("#soundPop");
  const slider = $("#soundVol"), val = $("#soundVolVal");
  const pct = Math.round(soundVol() * 100);
  if(slider) slider.value = pct;
  if(val) val.textContent = pct + "%";
  paintMuteIcon();
  if(slider){
    slider.addEventListener("input", ()=>{
      const raw = Math.round(+slider.value || 0);
      if(val) val.textContent = raw + "%";
      try{ localStorage.setItem(SOUND_VOL_KEY, String(raw / 100)); }catch(e){}
      syncAmbientGain();
    });
  }
  const sw = $("#muteSwitch");
  if(sw){
    sw.addEventListener("click", ()=>{
      state.muted = !state.muted;
      paintMuteIcon();
      syncAmbientGain();
      if(!state.muted) SFX.select();
    });
  }
  if(btn && pop){
    btn.addEventListener("click", (ev)=>{
      ev.stopPropagation();
      ac();
      pop.classList.toggle("hidden");
      btn.classList.toggle("on", !pop.classList.contains("hidden"));
      if(!pop.classList.contains("hidden")){
        setupAmbient();
        syncAmbientGain();
      }
    });
    document.addEventListener("click", (e)=>{
      if(pop.classList.contains("hidden")) return;
      if(pop.contains(e.target) || btn.contains(e.target)) return;
      pop.classList.add("hidden");
      btn.classList.remove("on");
    });
  }
}

/* ---------- 身份 / 问卜者信息 / 收藏爱心 ---------- */
const IDENTITY_KEY = "lumina_identity";
function getIdentity(){ try{ return localStorage.getItem(IDENTITY_KEY) === "user" ? "user" : "learner"; }catch(e){ return "learner"; } }
function setIdentity(v){ try{ localStorage.setItem(IDENTITY_KEY, v === "user" ? "user" : "learner"); }catch(e){} }
const PROFILE_KEY = "lumina_profiles";
const ZODIAC = [["aries","白羊座","Aries"],["taurus","金牛座","Taurus"],["gemini","双子座","Gemini"],["cancer","巨蟹座","Cancer"],["leo","狮子座","Leo"],["virgo","处女座","Virgo"],["libra","天秤座","Libra"],["scorpio","天蝎座","Scorpio"],["sagittarius","射手座","Sagittarius"],["capricorn","摩羯座","Capricorn"],["aquarius","水瓶座","Aquarius"],["pisces","双鱼座","Pisces"]];
function getProfiles(){ try{ const a = JSON.parse(localStorage.getItem(PROFILE_KEY) || "[]"); return Array.isArray(a) ? a : []; }catch(e){ return []; } }
function saveProfiles(a){ try{ localStorage.setItem(PROFILE_KEY, JSON.stringify(a)); }catch(e){} }
function zodiacName(key){ const z = ZODIAC.find(x => x[0] === key); return z ? (isEn() ? z[2] : z[1]) : ""; }
function genderName(v){ if(!v) return ""; if(isEn()) return v === "female" ? "Female" : v === "male" ? "Male" : "Other"; return v === "female" ? "女" : v === "male" ? "男" : "其他"; }
function profileSummary(en){
  const list = getProfiles();
  if(!list.length) return "";
  const active = getActiveProfile();
  const fmt = p => {
    const bits = [];
    if(p.name) bits.push(p.name);
    if(p.age) bits.push(en ? p.age + " y/o" : p.age + " 岁");
    if(p.zodiac) bits.push(zodiacName(p.zodiac));
    if(p.gender) bits.push(genderName(p.gender));
    if(p.relation) bits.push(p.relation);
    return bits.join(en ? ", " : "，");
  };
  const others = list.filter(p => p !== active && (p.name || p.age || p.zodiac || p.gender || p.relation)).map(fmt).filter(Boolean);
  const activeTxt = active ? fmt(active) : "";
  const parts = [];
  if(activeTxt) parts.push(en ? "Seeker: " + activeTxt : "提问者：" + activeTxt);
  if(others.length) parts.push(en ? "Others: " + others.join("; ") : "其他人：" + others.join("；"));
  if(!parts.length) return "";
  return (en ? "Seeker info — " : "问卜者信息——") + parts.join(en ? "; " : "；");
}
const ACTIVE_KEY = "lumina_active_profile";
function getActiveId(){ try{ return localStorage.getItem(ACTIVE_KEY) || ""; }catch(e){ return ""; } }
function setActiveId(id){ try{ localStorage.setItem(ACTIVE_KEY, id || ""); }catch(e){} }
function getActiveProfile(){
  const list = getProfiles();
  if(!list.length) return null;
  const id = getActiveId();
  return list.find(p => p.id === id) || list[0];
}
function collectProfilesFromDOM(){
  const box = $("#personList"); if(!box) return;
  const arr = [];
  box.querySelectorAll(".person-card").forEach(card => {
    const get = f => card.querySelector('[data-f="' + f + '"]');
    arr.push({ id: card.dataset.id, name: get("name").value.trim(), age: get("age").value, zodiac: get("zodiac").value, gender: get("gender").value, relation: get("relation").value.trim() });
  });
  saveProfiles(arr);
  if(!arr.some(p => p.id === getActiveId()) && arr.length) setActiveId(arr[0].id);
}
function collectActiveFromDOM(){
  const r = document.querySelector('input[name="asker"]:checked');
  if(r) setActiveId(r.value);
}
function renderPersonList(){
  const box = $("#personList"); if(!box) return;
  let list = getProfiles();
  if(!list.length){ list = [{ id: "p" + Date.now(), name: "", age: "", zodiac: "", gender: "", relation: "" }]; saveProfiles(list); }
  const en = isEn();
  const activeId = (getActiveProfile() || {}).id || "";
  box.innerHTML = list.map((p, i) => `
    <div class="person-card" data-id="${escapeHtml(p.id || ("p" + i))}">
      <div class="person-head">
        <span class="person-idx">${i + 1}</span>
        <input class="person-name" data-f="name" maxlength="20" placeholder="${t("nicknamePh")}" value="${escapeHtml(p.name || "")}">
        <label class="asker-opt"><input type="radio" name="asker" value="${escapeHtml(p.id || ("p" + i))}" ${activeId === (p.id || ("p" + i)) ? "checked" : ""}>${t("askAs")}</label>
        <button type="button" class="person-del" aria-label="remove">✕</button>
      </div>
      <div class="person-grid">
        <label>${t("ageLabel")}<input type="number" data-f="age" min="1" max="150" inputmode="numeric" placeholder="28" value="${escapeHtml(String(p.age || ""))}"></label>
        <label>${t("zodiacLabel")}<select data-f="zodiac">
          <option value="">${t("zodiacUnknown")}</option>
          ${ZODIAC.map(z => `<option value="${z[0]}" ${p.zodiac === z[0] ? "selected" : ""}>${en ? z[2] : z[1]}</option>`).join("")}
        </select></label>
        <label>${t("genderLabel")}<select data-f="gender">
          <option value="">${t("genderNone")}</option>
          <option value="female" ${p.gender === "female" ? "selected" : ""}>${t("genderF")}</option>
          <option value="male" ${p.gender === "male" ? "selected" : ""}>${t("genderM")}</option>
          <option value="other" ${p.gender === "other" ? "selected" : ""}>${t("genderOther")}</option>
        </select></label>
        <label>${t("relationLabel")}<input data-f="relation" maxlength="20" placeholder="${t("relationPh")}" value="${escapeHtml(p.relation || "")}"></label>
      </div>
    </div>`).join("");
  const collect = ()=>{
    const arr = [];
    box.querySelectorAll(".person-card").forEach(card => {
      const get = f => card.querySelector('[data-f="' + f + '"]');
      arr.push({
        id: card.dataset.id,
        name: get("name").value.trim(),
        age: get("age").value,
        zodiac: get("zodiac").value,
        gender: get("gender").value,
        relation: get("relation").value.trim()
      });
    });
    saveProfiles(arr);
    collectActiveFromDOM();
    if(!arr.some(p => p.id === getActiveId()) && arr.length) setActiveId(arr[0].id);
  };
  box.querySelectorAll("input,select").forEach(el => {
    el.addEventListener("input", collect);
    el.addEventListener("change", collect);
  });
  box.querySelectorAll('input[name="asker"]').forEach(r => {
    r.addEventListener("change", ()=>{ if(r.checked) setActiveId(r.value); });
  });
  box.querySelectorAll(".person-del").forEach(btn => {
    btn.addEventListener("click", ()=>{
      const card = btn.closest(".person-card");
      const idx = [...box.querySelectorAll(".person-card")].indexOf(card);
      saveProfiles(getProfiles().filter((_, k) => k !== idx));
      renderPersonList();
      SFX.select();
    });
  });
}
function initProfile(){
  $$('input[name="identity"]').forEach(r => {
    r.checked = (r.value === getIdentity());
    r.addEventListener("change", ()=>{
      if(!r.checked) return;
      setIdentity(r.value);
      toast(r.value === "user" ? t("identityUser") : t("identityLearner"));
      refreshIdentityUI();
      if(state.view === "reading" && state.selected.length){
        const was = state.fromHistory;
        state.fromHistory = true;
        buildReading();
        state.fromHistory = was;
      }
    });
  });
  const addBtn = $("#btnAddPerson");
  if(addBtn) addBtn.addEventListener("click", ()=>{
    const list = getProfiles();
    list.push({ id: "p" + Date.now() + Math.floor(Math.random() * 1000), name: "", age: "", zodiac: "", gender: "", relation: "" });
    saveProfiles(list);
    renderPersonList();
    SFX.select();
  });
  renderPersonList();
}
/* ---------- 学习卡牌（仅学习者） ---------- */
function refreshIdentityUI(){ /* 学习入口始终显示；非学习者点击时引导切换身份 */ }
function renderLearn(){
  const grid = $("#learnGrid"); if(!grid) return;
  const suits = [["major", t("suitMajor")], ["wands", t("suitWands")], ["cups", t("suitCups")], ["swords", t("suitSwords")], ["pentacles", t("suitPentacles")]];
  grid.className = "learn-sections";
  grid.innerHTML = suits.map(([suit, label]) => {
    const cards = CARDS.filter(c => c.suit === suit);
    return `<div class="learn-section">
      <h3 class="learn-sub">${label}<span class="learn-count">${cards.length}</span></h3>
      <div class="learn-grid">${cards.map(c => `
        <button type="button" class="learn-item" data-img="${c.img}">
          <img src="${IMG_BASE}${c.img}" alt="${escapeHtml(L.name(c))}" loading="lazy">
          <div class="li-name">${escapeHtml(L.name(c))}</div>
        </button>`).join("")}</div>
    </div>`;
  }).join("");
}
function openLearnModal(card){
  let modal = $("#learnModal");
  if(!modal){
    modal = document.createElement("div");
    modal.id = "learnModal";
    modal.className = "learn-modal";
    modal.addEventListener("click", e => { if(e.target === modal) modal.remove(); });
    document.body.appendChild(modal);
  }
  let ori = "up";
  const paint = ()=>{
    const kw = L.kw(card, ori) || [];
    const text = L.text(card, ori) || "";
    const other = L.textOther(card, ori) || "";
    modal.innerHTML = `
      <div class="lm-box">
        <button type="button" class="lm-close" aria-label="close">✕</button>
        <div class="lm-top">
          <div class="lm-img"><img src="${IMG_BASE}${card.img}" alt="${escapeHtml(L.name(card))}"></div>
          <div class="lm-info">
            <div class="lm-name">${escapeHtml(L.name(card))} · ${escapeHtml(L.sub(card))}</div>
            <div class="ori-tabs">
              <span class="ori-tab ${ori === "up" ? "active" : ""}" data-o="up">${t("oriUp")}</span>
              <span class="ori-tab rev ${ori === "rev" ? "active" : ""}" data-o="rev">${t("oriRev")}</span>
            </div>
            <div class="kw ${ori === "rev" ? "rev" : ""}">${kw.map(k => `<span>${escapeHtml(k)}</span>`).join("")}</div>
            <div class="lm-text zh">${escapeHtml(text)}</div>
            <div class="lm-text en">${escapeHtml(other)}</div>
          </div>
        </div>
      </div>`;
    const close = modal.querySelector(".lm-close");
    if(close) close.addEventListener("click", ()=> modal.remove());
    modal.querySelectorAll(".ori-tab").forEach(tab => tab.addEventListener("click", ()=>{
      ori = tab.dataset.o;
      paint();
    }));
  };
  paint();
  modal.style.display = "flex";
}
function showLearn(){
  renderLearn();
  showView("learn");
}

/* ---------- 档案：收藏 & 近来占卜（保留最近 10 次完整记录） ---------- */
const HIST_KEY = "lumina_history", MAX_HIST = 10;
function getHistory(){ try{ const a = JSON.parse(localStorage.getItem(HIST_KEY) || "[]"); return Array.isArray(a) ? a : []; }catch(e){ return []; } }
function fmtDate(ts){ const d = new Date(ts || Date.now()); const p = n => String(n).padStart(2,"0"); return d.getFullYear()+"-"+p(d.getMonth()+1)+"-"+p(d.getDate())+" "+p(d.getHours())+":"+p(d.getMinutes()); }
function saveHistory(){
  if(state.fromHistory) return state.currentEntryTs;
  const s = SPREADS[state.spread];
  const items = state.selected.map((sel, i)=>{
    const c = sel.card, o = sel.orientation, p = s.positions[i];
    return {
      img: c.img, zh: c.zh, en: c.en, ori: o,
      posZh: p && p.zh, posEn: p && p.en,
      kwZh: (o === "rev" ? c.kwRev : c.kwUp) || [],
      kwEn: (o === "rev" ? c.enKwRev : c.enKwUp) || [],
      text: o === "rev" ? c.rev : c.up,
      textEn: o === "rev" ? c.enRev : c.enUp
    };
  });
  const tmpZh = document.createElement("div");
  tmpZh.innerHTML = overallHTML("zh", state.selected, state.spread, state.daily, state.question);
  const tmpEn = document.createElement("div");
  tmpEn.innerHTML = overallHTML("en", state.selected, state.spread, state.daily, state.question);
  const entry = {
    ts: Date.now(), key: state.spread,
    daily: !!state.daily,
    question: state.daily ? "" : (state.question || ""),
    overall: tmpZh.textContent.replace(/\s+/g, " ").trim(),
    overallEn: tmpEn.textContent.replace(/\s+/g, " ").trim(),
    items
  };
  try{
    const list = getHistory().filter(h => h.ts !== entry.ts);
    list.unshift(entry);
    localStorage.setItem(HIST_KEY, JSON.stringify(list.slice(0, MAX_HIST)));
  }catch(e){}
  state.currentEntryTs = entry.ts;
  return entry.ts;
}
/* 自动写入历史（无需手动收藏）：先用模板占位保存，AI 完成后再回填 AI 文案 */
function patchHistoryOverall(txt){
  if(!txt || !state.currentEntryTs) return;
  try{
    const list = getHistory();
    const i = list.findIndex(h => h.ts === state.currentEntryTs);
    if(i < 0) return;
    const clean = String(txt).trim();
    if(isEn()) list[i].overallEn = clean; else list[i].overall = clean;
    localStorage.setItem(HIST_KEY, JSON.stringify(list));
  }catch(e){}
}
function autoSaveHistory(aiText){
  if(state.fromHistory || !state.selected || !state.selected.length) return;
  if(state.histSaved){ patchHistoryOverall(aiText); return; }
  state.histSaved = true;
  saveHistory();
  patchHistoryOverall(aiText);
}
function renderArchiveFav(){
  const pane = $("#favCards"), cnt = $("#favCount");
  const en = isEn();
  const list = getFavs().slice().sort((a, b) => (b.ts || 0) - (a.ts || 0));
  if(cnt) cnt.textContent = list.length ? "(" + list.length + ")" : "";
  if(!list.length){
    pane.innerHTML = `<div class="archive-empty">${t("archiveEmptyFav")}</div>`;
    return;
  }
  pane.innerHTML = `<p class="learn-tip">${t("learnTip")}</p><div class="fav-grid">` + list.map(f => {
    const name = en ? (f.en || f.zh) : f.zh;
    return `
    <div class="fav-item">
      <div class="fav-frame" role="button" tabindex="0" data-zh="${escapeHtml(f.zh)}" title="${t("learnTip")}"><img src="${f.img ? IMG_BASE + f.img : ""}" alt="${escapeHtml(name)}" ${f.ori === "rev" ? 'class="rev"' : ""}></div>
      <div class="fav-name">${escapeHtml(name)} · ${t(f.ori === "rev" ? "oriRev" : "oriUp")}</div>
      <div class="fav-date">${t("favDate")} ${fmtDate(f.ts)}</div>
      <button type="button" class="fav-del" data-zh="${escapeHtml(f.zh)}" aria-label="remove">✕</button>
    </div>`;
  }).join("") + `</div>`;
  pane.querySelectorAll(".fav-item img").forEach(img => {
    img.addEventListener("error", ()=>{ img.style.opacity = "0"; });
  });
  pane.querySelectorAll(".fav-frame").forEach(fr => {
    const openIt = ()=>{
      const card = CARDS.find(c => c.zh === fr.dataset.zh);
      if(card) openLearnModal(card);
      SFX.select();
    };
    fr.addEventListener("click", e=>{ e.stopPropagation(); openIt(); });
    fr.addEventListener("keydown", e=>{ if(e.key === "Enter" || e.key === " "){ e.preventDefault(); openIt(); } });
  });
  pane.querySelectorAll(".fav-del").forEach(btn => {
    btn.addEventListener("click", ()=>{
      const zh = btn.dataset.zh;
      const removed = getFavs().find(f => f.zh === zh);
      const name = isEn() ? (removed && removed.en || zh) : zh;
      try{ localStorage.setItem(FAV_KEY, JSON.stringify(getFavs().filter(f => f.zh !== zh))); }catch(e){}
      renderArchiveFav();
      toast(t("favDel", { name }));
      SFX.select();
    });
  });
}
function renderArchiveHist(){
  const pane = $("#favHist"), cnt = $("#histCount");
  const en = isEn();
  const list = getHistory();
  if(cnt) cnt.textContent = list.length ? "(" + list.length + ")" : "";
  if(!list.length){
    pane.innerHTML = `<div class="archive-empty">${t("archiveEmptyHist", { n: MAX_HIST })}</div>`;
    return;
  }
  pane.innerHTML = `<div class="hist-toolbar"><button type="button" class="hist-clear-all">${t("histClearAll")}</button></div>`
    + `<div class="hist-list">` + list.map((h, i) => {
    const sp = SPREADS[h.key];
    const spName = sp ? (en ? sp.en : sp.zh) : (h.spreadZh || h.key || "");
    const q = h.daily ? t("dailyTitle") : (h.question || t("questionDefault"));
    const overall = en ? (h.overallEn || h.overall || "") : (h.overall || "");
    return `
    <div class="hist-item" data-i="${i}">
      <div class="hist-row">
        <button type="button" class="hist-head" aria-expanded="false">
          <div class="hist-main">
            <div class="hist-title">${h.daily ? escapeHtml(t("dailyTitle")) : escapeHtml(spName + " · " + q)}</div>
            <div class="hist-date">${fmtDate(h.ts)}</div>
          </div>
          <span class="hist-chev">▾</span>
        </button>
        <button type="button" class="hist-del" data-ts="${h.ts}" aria-label="${t("histDelAria")}" title="${t("histDelAria")}">✕</button>
      </div>
      <div class="hist-body hidden">
        <div class="hist-cards">${(h.items || []).map(it => {
          const name = en ? (it.en || it.zh) : it.zh;
          return `
          <div class="hist-card">
            <img src="${it.img ? IMG_BASE + it.img : ""}" alt="${escapeHtml(name)}" ${it.ori === "rev" ? 'class="rev"' : ""}>
            <div class="hc-name">${escapeHtml(name)}</div>
            <div class="hc-ori">${t(it.ori === "rev" ? "oriRev" : "oriUp")}</div>
          </div>`;
        }).join("")}
        </div>
        <p class="hist-overall">${escapeHtml(overall)}</p>
        ${(h.items || []).map(it => {
          const name = en ? (it.en || it.zh) : it.zh;
          const pos = en ? (it.posEn || it.posZh || "") : (it.posZh || "");
          const text = (en ? (it.textEn || it.text) : it.text) || "";
          return `<div class="hist-read"><b>${escapeHtml(pos)}</b> · ${escapeHtml(name)} · ${t(it.ori === "rev" ? "oriRev" : "oriUp")}<br>${escapeHtml(text.slice(0, 180))}${text.length > 180 ? "…" : ""}</div>`;
        }).join("")}
        <div class="hist-actions"><button type="button" class="hist-open">${t("histOpen")}</button></div>
      </div>
    </div>`;
  }).join("") + `</div>`;
  pane.querySelectorAll(".hist-item").forEach(item => {
    const head = item.querySelector(".hist-head");
    head.addEventListener("click", ()=>{
      item.classList.toggle("open");
      item.querySelector(".hist-body").classList.toggle("hidden");
      head.setAttribute("aria-expanded", item.classList.contains("open") ? "true" : "false");
      SFX.select();
    });
  });
  const clearAll = pane.querySelector(".hist-clear-all");
  if(clearAll) clearAll.addEventListener("click", ()=>{
    if(!getHistory().length) return;
    if(!window.confirm(t("histClearConfirm"))) return;
    try{ localStorage.setItem(HIST_KEY, "[]"); }catch(err){}
    state.currentEntryTs = null;
    renderArchiveHist();
    toast(t("histClearOk"));
    SFX.select();
  });
  pane.querySelectorAll(".hist-del").forEach(btn => {
    btn.addEventListener("click", e=>{
      e.stopPropagation();
      const ts = +btn.dataset.ts;
      try{
        const list = getHistory().filter(h => h.ts !== ts);
        localStorage.setItem(HIST_KEY, JSON.stringify(list));
      }catch(err){}
      if(state.currentEntryTs === ts) state.currentEntryTs = null;
      renderArchiveHist();
      toast(t("histDelOk"));
      SFX.select();
    });
  });
  pane.querySelectorAll(".hist-open").forEach(btn => {
    btn.addEventListener("click", ()=>{
      const idx = +btn.closest(".hist-item").dataset.i;
      const h = getHistory()[idx];
      if(!h) return;
      state.fromHistory = true;
      state.currentEntryTs = h.ts;
      state.spread = h.key;
      state.daily = !!h.daily;
      state.question = h.daily ? "" : (h.question || "");
      state.selected = (h.items || []).map(it => ({
        card: {
          img: it.img, zh: it.zh, en: it.en,
          kwUp: it.kwZh || [], kwRev: it.kwZh || [],
          enKwUp: it.kwEn || [], enKwRev: it.kwEn || [],
          up: it.text || "", rev: it.text || "",
          enUp: it.textEn || it.text || "", enRev: it.textEn || it.text || ""
        },
        orientation: it.ori || "up"
      }));
      buildReading();
      SFX.select();
    });
  });
}
function renderFavs(){ renderArchiveFav(); renderArchiveHist(); }
function showProfile(){
  renderPersonList();
  showView("profile");
}
function showFavs(){
  renderFavs();
  $$(".archive-tab").forEach(x => {
    const on = x.dataset.tab === "hist";
    x.classList.toggle("active", on);
    x.setAttribute("aria-selected", on ? "true" : "false");
  });
  const hp = $("#favHist"), cp = $("#favCards");
  if(hp) hp.classList.add("active");
  if(cp) cp.classList.remove("active");
  showView("favs");
}

/* ---------- 解读页 ---------- */
function buildReading(){
  const s = SPREADS[state.spread];
  const en = isEn();
  if(!state.fromHistory) state.currentEntryTs = null;
  const learner = getIdentity() !== "user" && !state.daily;   // 使用者 / 今日运势：直接看结果
  $("#readingQuestion").textContent = state.daily ? t("dailyTitle") : (state.question || t("questionDefault"));
  const act = getActiveProfile();
  const sl = $("#seekerLine");
  if(sl){
    const nm = act && act.name ? act.name : "";
    sl.textContent = nm ? (en ? "Asking as " + nm : "提问者 · " + nm) : "";
    sl.style.display = nm ? "" : "none";
  }
  renderOverall();

  $("#cardsRow").innerHTML = state.selected.map((sel,i)=>{
    const p = s.positions[i];
    const posTxt = p && p.zh ? (en ? (p.en || "") : p.zh + " · " + p.en) : (en ? "Card " + (i+1) : "第 " + (i+1) + " 张");
    const favOn = isFav(sel.card.zh);
    return `<div class="r-card">
      <button type="button" class="r-fav ${favOn?"on":""}" data-zh="${escapeHtml(sel.card.zh)}" data-en="${escapeHtml(sel.card.en)}" data-img="${sel.card.img}" data-ori="${sel.orientation}" aria-label="${t("favTip")}" title="${t("favTip")}">${favOn?"♥":"♡"}</button>
      <div class="r-img"><img src="${IMG_BASE}${sel.card.img}" alt="${escapeHtml(L.name(sel.card))}" ${sel.orientation==="rev"?'class="rev"':''}></div>
      <div class="r-pos">${escapeHtml(posTxt)}</div>
    </div>`;
  }).join("");
  const rowImgs = $$("#cardsRow img");
  rowImgs.forEach((img,idx)=>{
    bindImgFallback(img, state.selected[idx].card, ()=>{
      const fb = document.createElement("div"); fb.className = "img-fb";
      fb.innerHTML = `<div class="fb-zh">${img.alt}</div>`; img.replaceWith(fb);
    });
  });

  /* 点击爱心收藏牌面（再点取消） */
  $$("#cardsRow .r-fav").forEach(btn=>{
    btn.addEventListener("click", e=>{
      e.preventDefault(); e.stopPropagation();
      const on = toggleFav(btn.dataset.zh, btn.dataset.en, btn.dataset.img, btn.dataset.ori);
      btn.classList.toggle("on", on);
      btn.textContent = on ? "♥" : "♡";
      btn.classList.remove("pop"); void btn.offsetWidth; btn.classList.add("pop");
      const name = isEn() ? (btn.dataset.en || btn.dataset.zh) : btn.dataset.zh;
      toast(t(on ? "favAdd" : "favDel", { name }));
      SFX.select();
    });
  });

  if(learner){
    $("#readings").innerHTML = state.selected.map((sel,i)=>{
      const p = s.positions[i];
      const c = sel.card, o = sel.orientation;
      const kw = L.kw(c,o) || [];
      const text = L.text(c,o) || "";
      const other = L.textOther(c,o) || "";
      const posLine = (p && p.zh)
        ? (en ? `<div class="rd-pos">${escapeHtml(p.en || "")}</div>`
              : `<div class="rd-pos"><b>${escapeHtml(p.zh)}</b> · ${escapeHtml(p.en)} — ${escapeHtml(p.d || "")}</div>`)
        : "";
      return `<div class="reading" id="rd-${i}">
        <div class="rd-head">
          <div class="thumb"><img src="${IMG_BASE}${c.img}" alt="${escapeHtml(L.name(c))}" ${o==="rev"?'class="rev"':''}></div>
          <div>
            <div class="rd-t">${escapeHtml(L.name(c))} · ${escapeHtml(L.sub(c))}</div>
            ${posLine}
          </div>
          <button type="button" class="fav-btn ${isFav(c.zh)?"on":""}" data-zh="${escapeHtml(c.zh)}" data-en="${escapeHtml(c.en)}" data-img="${c.img}" data-ori="${o}" aria-label="收藏这张牌" title="收藏这张牌">${isFav(c.zh)?"♥":"♡"}</button>
        </div>
        <div class="ori-tabs">
          <span class="ori-tab ${o==="up"?"active":""}" data-i="${i}" data-o="up">${t("oriUp")}</span>
          <span class="ori-tab rev ${o==="rev"?"active":""}" data-i="${i}" data-o="rev">${t("oriRev")}</span>
        </div>
        <div class="kw ${o==="rev"?"rev":""}">${kw.map(k=>`<span>${escapeHtml(k)}</span>`).join("")}</div>
        <div class="rd-text zh">${escapeHtml(text)}</div>
        <div class="rd-text en">${escapeHtml(other)}</div>
      </div>`;
    }).join("");
    const thumbImgs = $$("#readings .thumb img");
    thumbImgs.forEach((img,idx)=>{
      bindImgFallback(img, state.selected[idx].card, ()=>{
        const fb = document.createElement("div"); fb.className = "img-fb";
        fb.innerHTML = `<div class="fb-zh">${img.alt}</div>`; img.replaceWith(fb);
      });
    });
    $$("#readings .ori-tab").forEach(tab=>{
      tab.addEventListener("click", ()=>{
        const i = +tab.dataset.i, o = tab.dataset.o;
        const sel = state.selected[i];
        if(sel.orientation === o) return;
        sel.orientation = o;
        const rd = $("#rd-"+i), c = sel.card;
        const kw = L.kw(c,o) || [], text = L.text(c,o) || "", other = L.textOther(c,o) || "";
        rd.querySelectorAll(".ori-tab").forEach(t=>t.classList.toggle("active", t.dataset.o === o));
        const kc = rd.querySelector(".kw");
        kc.className = "kw" + (o === "rev" ? " rev" : "");
        kc.innerHTML = kw.map(k=>`<span>${escapeHtml(k)}</span>`).join("");
        rd.querySelector(".rd-text.zh").textContent = text;
        rd.querySelector(".rd-text.en").textContent = other;
        SFX.select();
      });
    });
    $$("#readings .fav-btn").forEach(btn=>{
      btn.addEventListener("click", ev=>{
        ev.stopPropagation();
        const on = toggleFav(btn.dataset.zh, btn.dataset.en, btn.dataset.img, btn.dataset.ori);
        btn.classList.toggle("on", on);
        btn.textContent = on ? "♥" : "♡";
        btn.classList.remove("pop"); void btn.offsetWidth; btn.classList.add("pop");
        const name = isEn() ? (btn.dataset.en || btn.dataset.zh) : btn.dataset.zh;
        toast(t(on ? "favAdd" : "favDel", { name }));
        SFX.select();
      });
    });
    const tnx = $("#thumbNav"); if(tnx){ tnx.innerHTML = ""; tnx.classList.add("hidden"); }   // 去掉悬浮卡牌窗
  } else {
    $("#readings").innerHTML = "";
    const tn = $("#thumbNav");
    if(tn){ tn.innerHTML = ""; tn.classList.add("hidden"); }
  }

  showView("reading");
  state.busy = false;
  setTimeout(()=>{ window.scrollTo({top:0}); }, 60);
}

/* ---------- 事件 ---------- */
/* ---------- 回到主页面（清空本次占卜的全部痕迹） ---------- */
function goHome(){
  clearTimeout(state.goTimer);
  clearTimeout(expandTimer);
  state.readSeq += 1;            // 作废仍在请求中的 AI 解读
  if(state.readAbort){ try{ state.readAbort.abort(); }catch(e){} state.readAbort = null; }
  state.busy = false;
  state.selected = [];
  state.flipped = 0;
  state.daily = false;
  state.fromHistory = false;
  $("#overallReading").innerHTML = "";
  $("#cardsRow").innerHTML = "";
  $("#readings").innerHTML = "";
  $("#readingQuestion").textContent = "";
  $("#spreadSlots").innerHTML = "";
  $("#spreadSlots").className = "spread-slots";
  $("#pickHint").innerHTML = "";
  const tn = $("#thumbNav");
  if(tn){ tn.innerHTML = ""; tn.classList.add("hidden"); }
  if(tnObserver){ tnObserver.disconnect(); tnObserver = null; }
  $("#fanStage").classList.remove("picking-done");
  $("#fanStage").classList.add("hidden");
  $("#fanStage").querySelectorAll(".fcard").forEach(e=>e.remove());   // 清掉扇形余牌，避免残留
  fanCards = [];
  $("#deckPile").classList.add("hidden");
  $("#shuffleStage").classList.add("hidden");
  $("#shuffleHint").style.display = "";
  $("#shuffleHint").textContent = t("deckHint");
  showView("start");
  const prog = $("#pickProgress"); if(prog) prog.textContent = "0 / " + SPREADS[state.spread].positions.length;
}

function init(){
  renderSpreads();
  bindFanInteractions($("#fanStage"));
  $("#btnStart").addEventListener("click", ()=>{
    state.question = $("#questionInput").value.trim();
    startShuffle();
  });
  $("#btnFortune").addEventListener("click", ()=>{ dailyDraw(); SFX.done(); });
  $("#btnShare").addEventListener("click", ()=>{ shareReading(); });
  $("#deckPile").addEventListener("click", ()=>{ shufflePass(); });
  const flipAllBtn = $("#btnFlipAll");
  if(flipAllBtn) flipAllBtn.addEventListener("click", ()=>{
    const rest = [...document.querySelectorAll("#spreadSlots .card-3d:not(.flipped)")];
    if(!rest.length) return;
    flipAllBtn.hidden = true;
    SFX.select();
    rest.forEach((c3, i)=> setTimeout(()=>flipCard(c3), i * 110));
  });
  $("#btnAgain").addEventListener("click", ()=>{ state.daily ? dailyDraw() : startShuffle(); });
  $("#btnHome").addEventListener("click", ()=>{ goHome(); SFX.select(); });
  // 主题 / 语言 / 档案
  initTheme();
  initGilded();
  initLang();
  initProfile();
  refreshIdentityUI();
  $("#btnArchive").addEventListener("click", ()=>{ showProfile(); SFX.select(); });
  $("#btnProfileEntry").addEventListener("click", ()=>{ showProfile(); SFX.select(); });
  document.documentElement.dataset.view = "start";
  $("#btnFavs").addEventListener("click", ()=>{ showFavs(); SFX.select(); });
  $("#btnProfileHome").addEventListener("click", ()=>{ showView("start"); SFX.select(); });
  $("#btnFavsHome").addEventListener("click", ()=>{ showView("start"); SFX.select(); });
  $("#btnGoReading").addEventListener("click", ()=>{ showView("setup"); SFX.select(); });
  $("#btnSetupHome").addEventListener("click", ()=>{ showView("start"); SFX.select(); });
  $("#btnProfileStart").addEventListener("click", ()=>{ showView("setup"); SFX.select(); });
  $("#btnLearn").addEventListener("click", ()=>{ showLearn(); SFX.select(); });
  $("#btnLearnHome").addEventListener("click", ()=>{ showView("start"); SFX.select(); });
  $("#learnGrid").addEventListener("click", e=>{ const it = e.target.closest(".learn-item"); if(!it) return; const card = CARDS.find(c => c.img === it.dataset.img); if(card) openLearnModal(card); });
  $$(".archive-tab").forEach(tab => {
    tab.addEventListener("click", ()=>{
      const tabKey = tab.dataset.tab;
      $$(".archive-tab").forEach(t => {
        const on = t === tab;
        t.classList.toggle("active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
      });
      const hp = $("#favHist"), cp = $("#favCards");
      if(hp) hp.classList.toggle("active", tabKey === "hist");
      if(cp) cp.classList.toggle("active", tabKey === "cards");
      SFX.select();
    });
  });
  // AI 设置：读取 / 保存 Key
  const aiInput = $("#aiKeyInput"), aiStatus = $("#aiStatus");
  if(aiInput && aiStatus){
    aiInput.value = getApiKey();
    const refresh = ()=>{
      aiStatus.textContent = aiInput.value.trim() ? t("aiStatusOn") : t("aiStatusOff");
    };
    refresh();
    aiInput.addEventListener("input", ()=>{
      try{ localStorage.setItem(API_KEY_STORAGE, aiInput.value.trim()); }catch(e){}
      refresh();
    });
  }
  initSoundPanel();
  applyChromeVars();
  window.addEventListener("resize", applyChromeVars);
  window.addEventListener("orientationchange", ()=> setTimeout(applyChromeVars, 250));
  initCustomScrollbar();
  document.addEventListener("pointerdown", ()=>{ ac(); loadFlipAudio(); setupAmbient(); syncAmbientGain(); }, {once:true});
}
document.addEventListener("DOMContentLoaded", init);
})();
