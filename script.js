/**
 * TecnoVida — script.js
 * JavaScript puro (Vanilla JS) — sem dependências externas
 */

// =========================================================
// INICIALIZAÇÃO GERAL
// =========================================================
document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initMobileMenu();
  initSmoothScroll();
  initScrollReveal();
  initCuriosidades();
  initQuiz();
  initContactForm();
  initBackToTop();
  initCounters();
  updateFooterYear();
});

// =========================================================
// 1. HEADER — SCROLL EFFECT
// =========================================================
function initNavScroll() {
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], #hero');

  // Adiciona classe 'scrolled' ao rolar
  const onScroll = () => {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    highlightActiveNav(sections, navLinks);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // estado inicial
}

// Marca o link de navegação da seção visível
function highlightActiveNav(sections, links) {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) current = sec.id;
  });
  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// =========================================================
// 2. MENU MOBILE
// =========================================================
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const menu   = document.getElementById('navMenu');

  const closeMenu = () => {
    toggle.classList.remove('open');
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Fechar ao clicar em um link
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Fechar ao pressionar Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });
}

// =========================================================
// 3. SCROLL SUAVE
// =========================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = document.getElementById('header').offsetHeight;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

// =========================================================
// 4. SCROLL REVEAL (sem bibliotecas)
// =========================================================
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal, .reveal-right');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // anima só uma vez
      }
    });
  }, { threshold: 0.12 });

  elements.forEach(el => observer.observe(el));
}

// =========================================================
// 5. CARDS DE CURIOSIDADES (flip interativo)
// =========================================================
function initCuriosidades() {
  const cards = document.querySelectorAll('.curio-card');

  cards.forEach(card => {
    const toggle = () => card.classList.toggle('flipped');

    card.addEventListener('click', toggle);

    // Acessibilidade via teclado
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
}

// =========================================================
// 6. QUIZ INTERATIVO
// =========================================================

const quizData = [
  {
    question: '🌱 Qual prática agrícola utiliza tecnologia para otimizar o uso de água, fertilizantes e pesticidas, reduzindo o impacto ambiental?',
    options: ['Agricultura orgânica', 'Agricultura de precisão', 'Monocultura extensiva', 'Agricultura familiar'],
    correct: 1,
    explanation: '✅ Correto! A agricultura de precisão usa sensores, GPS e análise de dados para aplicar insumos apenas onde e quando necessário, reduzindo custos e impactos.'
  },
  {
    question: '🔋 O custo da energia solar fotovoltaica caiu aproximadamente quanto nos últimos 10 anos?',
    options: ['Cerca de 20%', 'Cerca de 50%', 'Cerca de 90%', 'Menos de 10%'],
    correct: 2,
    explanation: '✅ Correto! A queda de ~90% no custo dos painéis solares é um dos fenômenos mais marcantes da transição energética global.'
  },
  {
    question: '📚 Qual termo descreve o conjunto de habilidades necessárias para usar, compreender e criar conteúdo em ambientes digitais?',
    options: ['Letramento digital', 'Programação web', 'Computação em nuvem', 'Inteligência artificial'],
    correct: 0,
    explanation: '✅ Correto! O letramento digital é essencial para a participação plena na sociedade contemporânea e para o combate à desinformação.'
  },
  {
    question: '🌍 Os Objetivos de Desenvolvimento Sustentável (ODS) da ONU foram estabelecidos em qual ano e quantos objetivos possuem?',
    options: ['2010, com 10 objetivos', '2015, com 17 objetivos', '2020, com 20 objetivos', '2000, com 8 objetivos'],
    correct: 1,
    explanation: '✅ Correto! Os 17 ODS foram adotados em 2015 na Agenda 2030 e cobrem desde saúde e educação até clima e parcerias globais.'
  },
  {
    question: '🏙️ O que caracteriza uma "cidade inteligente" (smart city)?',
    options: [
      'Uma cidade com muitos arranha-céus e shopping centers',
      'Uma cidade que usa tecnologia e dados para melhorar a qualidade de vida, eficiência e sustentabilidade',
      'Uma cidade exclusivamente para pessoas de alta renda',
      'Uma cidade sem veículos motorizados'
    ],
    correct: 1,
    explanation: '✅ Correto! Smart cities integram IoT, big data e IA para otimizar serviços urbanos como mobilidade, energia, saúde e segurança.'
  },
  {
    question: '♻️ Qual modelo econômico propõe manter materiais e produtos em uso pelo maior tempo possível, regenerando sistemas naturais?',
    options: ['Economia linear', 'Economia circular', 'Economia de mercado', 'Economia digital'],
    correct: 1,
    explanation: '✅ Correto! A economia circular é alternativa ao modelo "produzir-usar-descartar", reduzindo resíduos e preservando recursos naturais.'
  },
  {
    question: '🤖 Em qual área a Inteligência Artificial tem mostrado resultados superiores a especialistas humanos em diagnósticos por imagem?',
    options: ['Radiologia e detecção de câncer', 'Cirurgia a céu aberto', 'Fisioterapia e reabilitação', 'Saúde mental e psicologia'],
    correct: 0,
    explanation: '✅ Correto! Algoritmos de deep learning já superam radiologistas em precisão na detecção de certos tipos de câncer e doenças pulmonares.'
  }
];

function initQuiz() {
  const container = document.getElementById('quizContainer');
  const progressBar = document.getElementById('quizProgress');

  let currentQ = 0;
  let score = 0;
  let answered = false;

  // Embaralha as perguntas e usa apenas 5
  const shuffled = [...quizData].sort(() => Math.random() - 0.5).slice(0, 5);

  // Tela inicial do quiz
  const renderStart = () => {
    container.innerHTML = `
      <div class="quiz-start">
        <span style="font-size:3rem;display:block;margin-bottom:1rem;">🧠</span>
        <h3>Pronto para o desafio?</h3>
        <p>5 perguntas sobre tecnologia, sustentabilidade e comunidades.<br>Veja quanto você sabe!</p>
        <button class="btn btn-primary" id="quizStartBtn">Começar o Quiz →</button>
      </div>`;
    document.getElementById('quizStartBtn').addEventListener('click', () => {
      currentQ = 0;
      score = 0;
      renderQuestion();
    });
    progressBar.style.width = '0%';
  };

  // Renderiza pergunta atual
  const renderQuestion = () => {
    answered = false;
    const data  = shuffled[currentQ];
    const total = shuffled.length;
    const pct   = (currentQ / total) * 100;
    progressBar.style.width = `${pct}%`;

    const letters = ['A', 'B', 'C', 'D'];

    const optionsHtml = data.options.map((opt, i) => `
      <button class="quiz-option" data-index="${i}" aria-label="Opção ${letters[i]}: ${opt}">
        <span class="quiz-option-letter">${letters[i]}</span>
        <span>${opt}</span>
      </button>`).join('');

    container.innerHTML = `
      <div class="quiz-question">
        <div class="quiz-meta">
          <span class="quiz-num">PERGUNTA ${currentQ + 1} DE ${total}</span>
          <span class="quiz-score-badge">Pontos: ${score}</span>
        </div>
        <h3>${data.question}</h3>
        <div class="quiz-options" role="group" aria-label="Opções de resposta">
          ${optionsHtml}
        </div>
        <div class="quiz-feedback" id="quizFeedback" aria-live="polite"></div>
        <div class="quiz-next" id="quizNext">
          <button class="btn btn-primary" id="quizNextBtn">
            ${currentQ < total - 1 ? 'Próxima Pergunta →' : 'Ver Resultado 🏆'}
          </button>
        </div>
      </div>`;

    // Evento das opções
    container.querySelectorAll('.quiz-option').forEach(btn => {
      btn.addEventListener('click', () => handleAnswer(btn.dataset.index, data, shuffled.length));
    });
  };

  // Processa resposta
  const handleAnswer = (selectedIndex, data, total) => {
    if (answered) return;
    answered = true;

    const idx      = parseInt(selectedIndex, 10);
    const isRight  = idx === data.correct;
    const feedback = document.getElementById('quizFeedback');
    const nextWrap = document.getElementById('quizNext');

    // Desabilita todos os botões
    container.querySelectorAll('.quiz-option').forEach((btn, i) => {
      btn.disabled = true;
      if (i === data.correct) btn.classList.add('correct');
      else if (i === idx)     btn.classList.add('wrong');
    });

    if (isRight) {
      score++;
      feedback.className = 'quiz-feedback show fb-correct';
      feedback.textContent = data.explanation;
    } else {
      feedback.className = 'quiz-feedback show fb-wrong';
      feedback.textContent = `❌ Ops! A resposta correta era: "${data.options[data.correct]}". ${data.explanation}`;
    }

    nextWrap.classList.add('show');

    document.getElementById('quizNextBtn').addEventListener('click', () => {
      currentQ++;
      if (currentQ < total) {
        renderQuestion();
      } else {
        renderResult(total);
      }
    });
  };

  // Tela de resultado
  const renderResult = (total) => {
    progressBar.style.width = '100%';
    const pct = Math.round((score / total) * 100);

    let emoji, msg;
    if (pct === 100) {
      emoji = '🏆'; msg = 'Incrível! Você é um verdadeiro expert em tecnologia e sustentabilidade!';
    } else if (pct >= 80) {
      emoji = '🌟'; msg = 'Excelente! Você tem um ótimo conhecimento sobre o tema!';
    } else if (pct >= 60) {
      emoji = '👏'; msg = 'Muito bem! Continue aprendendo e logo chegará à perfeição!';
    } else if (pct >= 40) {
      emoji = '📚'; msg = 'Bom começo! Explore mais as seções do site para ampliar seus conhecimentos!';
    } else {
      emoji = '🌱'; msg = 'Todo expert já foi iniciante! Leia mais sobre o tema e tente novamente!';
    }

    container.innerHTML = `
      <div class="quiz-result">
        <span class="quiz-result-emoji">${emoji}</span>
        <h3>Quiz concluído!</h3>
        <div class="quiz-result-score">${score}/${total}</div>
        <p><strong>${pct}% de aproveitamento</strong></p>
        <p class="quiz-result-msg">${msg}</p>
        <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
          <button class="btn btn-primary" id="quizRetryBtn">Tentar novamente 🔄</button>
          <a href="#timeline" class="btn btn-ghost">Ver Linha do Tempo ✦</a>
        </div>
      </div>`;

    document.getElementById('quizRetryBtn').addEventListener('click', () => {
      // Reembaralha as perguntas
      shuffled.sort(() => Math.random() - 0.5);
      currentQ = 0;
      score    = 0;
      renderStart();
    });
  };

  renderStart();
}

// =========================================================
// 7. FORMULÁRIO DE CONTATO — VALIDAÇÃO
// =========================================================
function initContactForm() {
  const form        = document.getElementById('contactForm');
  const nameInput   = document.getElementById('name');
  const emailInput  = document.getElementById('email');
  const msgInput    = document.getElementById('message');
  const nameError   = document.getElementById('nameError');
  const emailError  = document.getElementById('emailError');
  const msgError    = document.getElementById('messageError');
  const successBox  = document.getElementById('formSuccess');

  const emailRegex  = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  // Limpa erros ao digitar
  [nameInput, emailInput, msgInput].forEach(field => {
    field.addEventListener('input', () => clearError(field));
  });

  form.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;

    // Validação: nome
    if (nameInput.value.trim().length < 3) {
      showError(nameInput, nameError, 'Por favor, informe seu nome (mínimo 3 caracteres).');
      valid = false;
    } else {
      clearError(nameInput);
    }

    // Validação: e-mail
    if (!emailRegex.test(emailInput.value.trim())) {
      showError(emailInput, emailError, 'Por favor, informe um e-mail válido.');
      valid = false;
    } else {
      clearError(emailInput);
    }

    // Validação: mensagem
    if (msgInput.value.trim().length < 10) {
      showError(msgInput, msgError, 'Sua mensagem deve ter pelo menos 10 caracteres.');
      valid = false;
    } else {
      clearError(msgInput);
    }

    if (!valid) return;

    // Simulação de envio
    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';

    setTimeout(() => {
      form.reset();
      successBox.hidden = false;
      submitBtn.disabled = false;
      submitBtn.textContent = 'Enviar mensagem 🚀';

      // Oculta mensagem de sucesso após 6s
      setTimeout(() => { successBox.hidden = true; }, 6000);
    }, 1200);
  });

  function showError(field, errorEl, msg) {
    field.classList.add('error');
    errorEl.textContent = msg;
  }
  function clearError(field) {
    field.classList.remove('error');
    // Determina qual span de erro usar
    const errorId = field.id + 'Error';
    const errorEl = document.getElementById(errorId);
    if (errorEl) errorEl.textContent = '';
  }
}

// =========================================================
// 8. BOTÃO VOLTAR AO TOPO
// =========================================================
function initBackToTop() {
  const btn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// =========================================================
// 9. CONTADORES ANIMADOS (Hero stats)
// =========================================================
function initCounters() {
  const counters = document.querySelectorAll('.counter');
  let started    = false;

  const startCounters = () => {
    if (started) return;
    counters.forEach(counter => {
      const target   = parseInt(counter.dataset.target, 10);
      const duration = 2000; // ms
      const step     = target / (duration / 16);
      let current    = 0;

      const update = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.floor(current).toLocaleString('pt-BR');
          requestAnimationFrame(update);
        } else {
          counter.textContent = target.toLocaleString('pt-BR');
        }
      };

      requestAnimationFrame(update);
    });
    started = true;
  };

  // Dispara quando a seção hero estiver visível
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });

  const heroSection = document.getElementById('hero');
  if (heroSection) observer.observe(heroSection);
}

// =========================================================
// 10. ANO AUTOMÁTICO NO RODAPÉ
// =========================================================
function updateFooterYear() {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
}
