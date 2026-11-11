
// МОБИЛЬНОЕ МЕНЮ
const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
  nav.classList.toggle('active');
  menuBtn.textContent = nav.classList.contains('active') ? '✕' : '☰';
});

document.querySelectorAll('#nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
    menuBtn.textContent = '☰';
  });
});

// КАЛЬКУЛЯТОР
document.getElementById('calculate').addEventListener('click', () => {
  const area = Number(document.getElementById('area').value);
  const type = Number(document.getElementById('buildingType').value);
  const level = Number(document.getElementById('level').value);
  const result = document.getElementById('calcResult');

  if (!Number.isFinite(area) || area <= 0 || area > 100000) {
    result.textContent = 'Введите корректную площадь';
    return;
  }

  const total = area * type * level;
  result.textContent = 'Примерная стоимость: ' +
    new Intl.NumberFormat('ru-RU').format(Math.round(total)) + ' сом';
});

// ЗАЯВКИ
const form = document.getElementById('contactForm');

form.addEventListener('submit', event => {
  event.preventDefault();

  const application = {
    name: document.getElementById('clientName').value.trim(),
    phone: document.getElementById('clientPhone').value.trim(),
    message: document.getElementById('clientMessage').value.trim(),
    date: new Date().toLocaleString()
  };

  if (!application.name || !application.phone) return;

  const applications = JSON.parse(
    localStorage.getItem('kutApplications') || '[]'
  );

  applications.push(application);

  localStorage.setItem(
    'kutApplications',
    JSON.stringify(applications)
  );

  document.getElementById('formStatus').textContent =
    'Заявка сохранена! Спасибо за обращение.';

  form.reset();
});

// ПЕРЕКЛЮЧЕНИЕ ЯЗЫКОВ
const translations = {
  ru: {
    home:'Главная', about:'О компании', services:'Услуги',
    projects:'Проекты', reviews:'Отзывы', contact:'Контакты',
    discuss:'Обсудить проект', heroTitle:'СТРОИМ<br>БУДУЩЕЕ <span>ВМЕСТЕ</span>',
    heroText:'Создаём надёжные здания и современные пространства. Качество, которому можно доверять.',
    ourProjects:'Наши проекты', contactUs:'Связаться с нами',
    aboutTitle:'МЫ СОЗДАЁМ <span>КАЧЕСТВО</span>',
    aboutText:'КУТ — строительная компания в Кыргызстане. Наша цель — создавать надёжные объекты, используя современные технологии и профессиональный подход.',
    servicesTitle:'НАШИ УСЛУГИ', service1:'Строительство домов',
    service2:'Коммерческие здания', service3:'Проектирование',
    service4:'Ремонт и отделка', projectsTitle:'НАШИ ПРОЕКТЫ',
    calcTitle:'КАЛЬКУЛЯТОР СТРОИТЕЛЬСТВА',
    reviewsTitle:'ОТЗЫВЫ'
  },
  ky: {
    home:'Башкы бет', about:'Компания жөнүндө', services:'Кызматтар',
    projects:'Долбоорлор', reviews:'Пикирлер', contact:'Байланыш',
    discuss:'Долбоорду талкуулоо', heroTitle:'КЕЛЕЧЕКТИ<br><span>БИРГЕ</span> КУРАБЫЗ',
    heroText:'Биз ишенимдүү имараттарды жана заманбап мейкиндиктерди жаратабыз.',
    ourProjects:'Долбоорлорубуз', contactUs:'Биз менен байланыш',
    aboutTitle:'САПАТТЫ <span>ЖАРАТАБЫЗ</span>',
    aboutText:'КУТ — Кыргызстандагы курулуш компаниясы. Биз заманбап технологияларды жана кесипкөй ыкмаларды колдонобуз.',
    servicesTitle:'КЫЗМАТТАРЫБЫЗ', service1:'Үй куруу',
    service2:'Коммерциялык имараттар', service3:'Долбоорлоо',
    service4:'Оңдоо жана жасалгалоо', projectsTitle:'ДОЛБООРЛОРУБУЗ',
    calcTitle:'КУРУЛУШ КАЛЬКУЛЯТОРУ', reviewsTitle:'ПИКИРЛЕР'
  },
  en: {
    home:'Home', about:'About', services:'Services',
    projects:'Projects', reviews:'Reviews', contact:'Contact',
    discuss:'Discuss a project', heroTitle:'BUILDING<br>THE <span>FUTURE</span>',
    heroText:'Creating reliable buildings and modern spaces. Quality you can trust.',
    ourProjects:'Our projects', contactUs:'Contact us',
    aboutTitle:'WE CREATE <span>QUALITY</span>',
    aboutText:'KUT is a construction company in Kyrgyzstan. We aim to create reliable buildings using modern technologies and professional expertise.',
    servicesTitle:'OUR SERVICES', service1:'House construction',
    service2:'Commercial buildings', service3:'Design',
    service4:'Renovation and finishing', projectsTitle:'OUR PROJECTS',
    calcTitle:'CONSTRUCTION CALCULATOR', reviewsTitle:'REVIEWS'
  }
};

const language = document.getElementById('language');

function changeLanguage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i]').forEach(element => {
    const key = element.dataset.i;
    if (translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });

  localStorage.setItem('kutLanguage', lang);
}

language.addEventListener('change', () => {
  changeLanguage(language.value);
});

language.value = localStorage.getItem('kutLanguage') || 'ru';
changeLanguage(language.value);

// АНИМАЦИИ ПРИ ПРОКРУТКЕ
const revealElements = document.querySelectorAll(
  '.section, .stats, .service-card, .review'
);

revealElements.forEach(element => element.classList.add('reveal'));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealElements.forEach(element => observer.observe(element));

// ГАЛЕРЕЯ: УВЕЛИЧЕНИЕ ФОТО
document.querySelectorAll('.gallery img').forEach(img => {
  img.addEventListener('click', () => {
    window.open(img.src, '_blank', 'noopener');
  });
});
