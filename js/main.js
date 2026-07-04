class NavHighlighter {
  constructor() {
    this.links = document.querySelectorAll('.nav-link');
    this.currentPage = window.location.pathname.split('/').pop() || 'index.html';
    this.highlight();
  }

  highlight() {
    this.links.forEach(link => {
      const linkPage = link.getAttribute('href');
      if (linkPage === this.currentPage) {
        link.classList.add('active');
      }
    });
  }
}

class NavScroller {
  constructor() {
    this.nav = document.getElementById('mainNav');
    if (!this.nav) return;
    this.attachScroll();
  }

  attachScroll() {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        this.nav.classList.add('scrolled');
      } else {
        this.nav.classList.remove('scrolled');
      }
    });
  }
}

class ScrollAnimator {
  constructor() {
    this.elements = document.querySelectorAll(
      '.why-card, .program-card, .subject-card, ' +
      '.level-card, .tutor-card, .menu-card, ' +
      '.how-step, .stat-item, .contact-info-item, ' +
      '.fact-card, .bus-schedule-card, .bus-info-card'
    );
    this.observe();
  }

  observe() {
    this.elements.forEach((el, index) => {
      el.classList.add('fade-in');
      // Stagger delay based on position in row
      const delay = (index % 4);
      if (delay > 0) el.classList.add(`fade-in-delay-${delay}`);
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    this.elements.forEach(el => observer.observe(el));
  }
}

class DailyFact {
  #apiKey = 'wjxoSDeIiD4xviGslklY0Tc8vT8b4MqtXmZgkafE';
  #apiUrl = 'https://api.api-ninjas.com/v1/facts?limit=1';

  #fallbackFacts = [
    "Honey never spoils — archaeologists found 3000-year-old honey in Egyptian tombs that was still edible.",
    "The human brain uses about 20% of the body's total energy despite being only 2% of body weight.",
    "A day on Venus is longer than a year on Venus — it rotates so slowly.",
    "Octopuses have three hearts — two pump blood to the gills, one pumps it to the rest of the body.",
    "The Eiffel Tower grows about 15cm taller in summer due to thermal expansion of the iron.",
    "A group of flamingos is called a flamboyance.",
    "Bananas are slightly radioactive due to their naturally occurring potassium-40.",
    "The shortest war in history lasted only 38 minutes — between Britain and Zanzibar in 1896.",
    "A snail can sleep for up to 3 years at a time.",
    "The fingerprints of a koala are so similar to humans that they have confused crime scene investigators.",
    "Sound travels about 4 times faster through water than through air.",
    "The average person walks about 100,000 miles in their lifetime — equivalent to circling Earth 4 times.",
    "Crows are so intelligent they can recognize and remember human faces.",
    "The heart of a blue whale is so large a small child could crawl through its arteries.",
    "Trees communicate with each other through underground fungal networks called the Wood Wide Web."
  ];

  constructor() {
    this.loadingEl  = document.getElementById('factLoading');
    this.contentEl  = document.getElementById('factContent');
    this.errorEl    = document.getElementById('factError');
    this.textEl     = document.getElementById('factText');
    this.newFactBtn = document.getElementById('newFactBtn');

    if (!this.loadingEl) return;

    this.fetchFact();

    this.newFactBtn.addEventListener('click', () => {
      this.showLoading();
      this.fetchFact();
    });
  }

  async fetchFact() {
    if (!this.#apiKey || this.#apiKey.trim() === '') {
      this.useFallback();
      return;
    }

    try {
      const response = await fetch(this.#apiUrl, {
        method: 'GET',
        headers: { 'X-Api-Key': this.#apiKey.trim() }
      });

      if (!response.ok) {
        this.useFallback();
        return;
      }

      const data = await response.json();
      if (!data || data.length === 0) {
        this.useFallback();
        return;
      }

      this.showFact(data[0].fact);

    } catch (error) {
      this.useFallback();
    }
  }

  useFallback() {
    const random = Math.floor(Math.random() * this.#fallbackFacts.length);
    this.showFact(this.#fallbackFacts[random]);
  }

  showFact(factText) {
    this.loadingEl.classList.add('d-none');
    this.errorEl.classList.add('d-none');
    this.contentEl.classList.remove('d-none');
    this.textEl.textContent = factText;
  }

  showLoading() {
    this.contentEl.classList.add('d-none');
    this.errorEl.classList.add('d-none');
    this.loadingEl.classList.remove('d-none');
  }
}

// ---------- 5. Animated Stats Counter ----------
class StatsCounter {
  constructor() {
    this.stats = document.querySelectorAll('.stat-number');
    if (!this.stats.length) return;
    this.observe();
  }

  observe() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    this.stats.forEach(stat => observer.observe(stat));
  }

  animateCounter(el) {
    const target = parseInt(el.textContent.replace(/\D/g, ''));
    const suffix = el.textContent.replace(/[0-9]/g, '');
    const duration = 1500;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current) + suffix;
    }, step);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new NavHighlighter();
  new NavScroller();
  new ScrollAnimator();
  new StatsCounter();
  new DailyFact();
});

