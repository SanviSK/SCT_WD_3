// script.js
// Uses QUESTIONS from questions.js
// Handles auth (localStorage), quiz flow, timer (15s), marking, leaderboard

document.addEventListener('DOMContentLoaded', () => {
  // DOM bindings
  const loginScreen = id('login-screen'), signupScreen = id('signup-screen'),
        homeScreen = id('home-screen'), quizScreen = id('quiz-screen'),
        resultScreen = id('result-screen'), lbScreen = id('leaderboard-screen');

  const loginBtn = id('login-btn'), gotoSignup = id('goto-signup'), signupBtn = id('signup-btn'),
        backToLogin = id('back-to-login'), logoutBtn = id('logout-btn'),
        categoriesDiv = id('categories'), leaderboardBtn = id('leaderboard-btn');

  const questionBox = id('question-box'), currentCatEl = id('current-cat'),
        timeLeftEl = id('time-left'), timeBar = id('time-bar'), exitQuiz = id('exit-quiz');

  const resultText = id('result-text'), saveLbBtn = id('save-leaderboard'), playAgain = id('play-again'),
        leaderboardList = id('leaderboard-list'), backHome = id('back-home'), clearLb = id('clear-lb');

  // state
  let state = {
    user: null,
    category: null,
    questions: [],
    index: 0,
    score: 0,
    timer: 15,
    intervalId: null,
    allowAnswer: true
  };

  // init
  startDemo();

  // Event wiring
  loginBtn.addEventListener('click', loginUser);
  gotoSignup.addEventListener('click', () => showView('signup'));
  signupBtn.addEventListener('click', signupUser);
  backToLogin.addEventListener('click', () => showView('login'));
  logoutBtn.addEventListener('click', logout);
  leaderboardBtn.addEventListener('click', showLeaderboard);
  exitQuiz.addEventListener('click', () => endQuiz(true));
  saveLbBtn.addEventListener('click', saveAndGotoLeaderboard);
  playAgain.addEventListener('click', () => { showView('home'); });
  backHome.addEventListener('click', () => showView('home'));
  clearLb.addEventListener('click', clearLeaderboard);

  // ---------- helpers ----------
  function id(x){ return document.getElementById(x); }

  function showView(name){
    // hide all
    [loginScreen, signupScreen, homeScreen, quizScreen, resultScreen, lbScreen].forEach(s => s.style.display='none');
    if(name==='login') loginScreen.style.display='block';
    if(name==='signup') signupScreen.style.display='block';
    if(name==='home') homeScreen.style.display='block';
    if(name==='quiz') quizScreen.style.display='block';
    if(name==='result') resultScreen.style.display='block';
    if(name==='leaderboard') lbScreen.style.display='block';
  }

  // ---------- storage ----------
  function getUsers(){ return JSON.parse(localStorage.getItem('sc_users') || '{}'); }
  function saveUsers(u){ localStorage.setItem('sc_users', JSON.stringify(u)); }
  function getLeaderboard(){ return JSON.parse(localStorage.getItem('sc_leaderboard') || '[]'); }
  function saveLeaderboard(l){ localStorage.setItem('sc_leaderboard', JSON.stringify(l)); }

  // ---------- auth ----------
  function signupUser(){
    const u = id('signup-username').value.trim(), p = id('signup-password').value;
    if(!u || !p){ alert('Enter username & password'); return; }
    const users = getUsers();
    if(users[u]){ alert('Username exists'); return; }
    users[u] = { password: p, created: Date.now() };
    saveUsers(users);
    alert('Account created. Login now.');
    showView('login');
  }

  function loginUser(){
    const u = id('login-username').value.trim(), p = id('login-password').value;
    if(!u || !p){ alert('Enter username & password'); return; }
    const users = getUsers();
    if(!users[u] || users[u].password !== p){ alert('Invalid credentials'); return; }
    state.user = u;
    id('user-name').textContent = u;
    showView('home');
    renderCategories();
  }

  function logout(){
    state.user = null;
    showView('login');
  }

  // ---------- categories ----------
  function renderCategories(){
    categoriesDiv.innerHTML = '';
    Object.keys(QUESTIONS).forEach(cat => {
      const el = document.createElement('div');
      el.className = 'cat';
      el.innerHTML = `<div style="font-weight:700;text-transform:capitalize">${cat}</div><div class="small muted">5 questions • 15s each</div>`;
      el.addEventListener('click', () => startQuiz(cat));
      categoriesDiv.appendChild(el);
    });
  }

  // ---------- quiz flow ----------
  function startQuiz(cat){
    state.category = cat;
    // shallow copy
    state.questions = QUESTIONS[cat].slice(0, 5); // ensure 5
    state.index = 0; state.score = 0;
    id('current-cat').textContent = cat;
    showView('quiz');
    nextQuestion();
  }

  function renderQuestion(q){
    questionBox.innerHTML = '';
    const qDiv = document.createElement('div');
    qDiv.className = 'question';
    qDiv.textContent = `${state.index + 1}. ${q.q}`;
    questionBox.appendChild(qDiv);

    const opts = document.createElement('div');
    opts.className = 'options';

    if(q.type === 'single'){
      q.options.forEach((opt, i) => {
        const o = document.createElement('div');
        o.className = 'option';
        o.textContent = opt;
        o.addEventListener('click', () => handleAnswer(i));
        opts.appendChild(o);
      });
    } else if(q.type === 'multi'){
      q.options.forEach((opt, i) => {
        const label = document.createElement('label');
        label.className = 'option';
        label.style.display = 'flex'; label.style.alignItems = 'center';
        label.innerHTML = `<input type="checkbox" data-i="${i}" style="margin-right:10px"> ${opt}`;
        opts.appendChild(label);
      });
      const submit = document.createElement('button');
      submit.className = 'btn';
      submit.textContent = 'Submit';
      submit.style.marginTop = '12px';
      submit.addEventListener('click', () => {
        const checks = Array.from(opts.querySelectorAll('input[type=checkbox]'));
        const picked = checks.map((c, idx) => c.checked ? idx : -1).filter(v => v !== -1);
        handleAnswer(picked);
      });
      opts.appendChild(submit);
    } else if(q.type === 'text'){
      const wrap = document.createElement('div');
      wrap.style.display = 'flex'; wrap.style.gap = '8px';
      const inp = document.createElement('input');
      inp.type = 'text'; inp.placeholder = 'Type answer'; inp.style.flex = '1';
      const submit = document.createElement('button');
      submit.className = 'btn'; submit.textContent = 'Submit';
      submit.addEventListener('click', () => handleAnswer(inp.value.trim()));
      wrap.appendChild(inp); wrap.appendChild(submit);
      opts.appendChild(wrap);
    }

    questionBox.appendChild(opts);
  }

  function handleAnswer(selected){
    if(!state.allowAnswer) return;
    state.allowAnswer = false;
    clearTimer();

    const q = state.questions[state.index];
    const optionEls = Array.from(document.querySelectorAll('.options .option'));
    let isCorrect = false;

    if(q.type === 'single'){
      const correctIndex = q.answer;
      if(selected === correctIndex) isCorrect = true;
      optionEls.forEach((el, idx) => {
        if(idx === correctIndex) el.classList.add('correct');
        if(idx === selected && idx !== correctIndex) el.classList.add('wrong');
      });
    } else if(q.type === 'multi'){
      const target = Array.isArray(q.answer) ? q.answer.slice().sort() : [];
      const sarr = Array.isArray(selected) ? selected.slice().sort() : [];
      isCorrect = JSON.stringify(sarr) === JSON.stringify(target);
      optionEls.forEach((el, idx) => {
        const checkbox = el.querySelector('input[type=checkbox]');
        const chosen = checkbox && checkbox.checked;
        if(target.includes(idx)) el.classList.add('correct');
        if(chosen && !target.includes(idx)) el.classList.add('wrong');
      });
    } else if(q.type === 'text'){
      const ans = (q.answer + '').toLowerCase().trim();
      const given = (selected + '').toLowerCase().trim();
      isCorrect = ans === given;
      const div = document.createElement('div');
      div.className = isCorrect ? 'option correct' : 'option wrong';
      div.textContent = isCorrect ? 'Correct' : `Correct: ${q.answer}`;
      document.querySelector('#question-box .options').appendChild(div);
    }

    if(isCorrect) state.score += 1;

    // short delay to show colors then next question
    setTimeout(() => { state.index += 1; nextQuestion(); }, 1200);
  }

  // ---------- timer (15s) ----------
  function startTimer(){
    state.timer = 15;
    timeLeftEl.textContent = state.timer;
    updateBar();
    state.intervalId = setInterval(() => {
      state.timer -= 1;
      timeLeftEl.textContent = state.timer;
      updateBar();
      if(state.timer <= 0) handleTimeout();
    }, 1000);
  }

  function clearTimer(){
    if(state.intervalId) clearInterval(state.intervalId);
    state.intervalId = null;
  }

  function updateBar(){
    const pct = Math.max(0, (state.timer / 15) * 100);
    timeBar.style.width = pct + '%';
  }

  function handleTimeout(){
    clearTimer();
    state.allowAnswer = false;
    const q = state.questions[state.index];
    const optionEls = Array.from(document.querySelectorAll('.options .option'));

    if(q.type === 'single'){
      optionEls.forEach((el, idx) => { if(idx === q.answer) el.classList.add('correct'); });
    } else if(q.type === 'multi'){
      optionEls.forEach((el, idx) => { if(Array.isArray(q.answer) && q.answer.includes(idx)) el.classList.add('correct'); });
    } else if(q.type === 'text'){
      const div = document.createElement('div');
      div.className = 'option wrong';
      div.textContent = `Time up! Correct: ${q.answer}`;
      document.querySelector('#question-box .options').appendChild(div);
    }

    setTimeout(() => { state.index += 1; nextQuestion(); }, 1200);
  }

  // ---------- navigation ----------
  function nextQuestion(){
    clearTimer();
    state.allowAnswer = true;

    if(state.index >= state.questions.length){
      endQuiz(false);
      return;
    }
    const q = state.questions[state.index];
    renderQuestion(q);
    startTimer();
  }

  function endQuiz(exited){
    clearTimer();
    showView('result');
    const text = exited ? 'You exited the quiz.' : `You scored ${state.score} out of ${state.questions.length}`;
    resultText.textContent = text;
  }

  // ---------- leaderboard ----------
  function saveAndGotoLeaderboard(){
    const lb = getLeaderboard();
    lb.push({ name: state.user || 'Guest', score: state.score, date: Date.now() });
    saveLeaderboard(lb);
    showLeaderboard();
  }

  function showLeaderboard(){
    showView('leaderboard');
    renderLeaderboard();
  }

  function renderLeaderboard(){
    const lb = getLeaderboard().slice();
    lb.sort((a,b) => b.score - a.score || a.date - b.date);
    leaderboardList.innerHTML = '';
    lb.forEach((p, idx) => {
      const li = document.createElement('li');
      const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '';
      li.innerHTML = `<div style="display:flex;align-items:center"><div class="medal">${medal}</div><div><div style="font-weight:700">${p.name}</div><div class="small muted">${new Date(p.date).toLocaleString()}</div></div></div><div style="font-weight:700">${p.score}</div>`;
      leaderboardList.appendChild(li);
    });
  }

  function clearLeaderboard(){
    if(confirm('Clear leaderboard?')){ saveLeaderboard([]); renderLeaderboard(); }
  }

  // ---------- util start/demo ----------
  function startDemo(){ showView('login'); }

});
