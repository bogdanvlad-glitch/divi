
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  const search = document.querySelector('#menuSearch');
  const searchable = [...document.querySelectorAll('.searchable')];
  function applySearch() {
    if (!search) return;
    const term = search.value.trim().toLowerCase();
    searchable.forEach(card => {
      const text = card.dataset.search || card.textContent.toLowerCase();
      card.classList.toggle('search-hidden', term && !text.includes(term));
    });
  }
  if (search) search.addEventListener('input', applySearch);

  const pills = [...document.querySelectorAll('[data-filter]')];
  const sections = [...document.querySelectorAll('.menu-section')];
  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.filter;
      sections.forEach(section => {
        section.classList.toggle('filter-hidden', filter !== 'all' && section.dataset.section !== filter);
      });
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.animate(
        [{opacity: 0, transform: 'translateY(18px)'}, {opacity: 1, transform: 'translateY(0)'}],
        {duration: 550, easing: 'ease-out', fill: 'both'}
      );
    });
  }, {threshold: .12});
  document.querySelectorAll('.menu-card,.info-card,.panel,.photo-band img,.gallery img').forEach(el => observer.observe(el));
});
