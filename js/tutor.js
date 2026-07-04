class TutorManager {
  constructor() {
    this.tutors = [
      { id: 1,  name: "Mr. Dany Nassar",  subject: "Mathematics",      category: "math",     level: "GS - LS",       experience: "8 yrs",  rating: 4.9 },
      { id: 2,  name: "Mr. Karim Haddad",  subject: "Physics",          category: "math",     level: "Seconde - Première", experience: "6 yrs",  rating: 4.8 },
      { id: 3,  name: "Ms. Rima Sleiman",  subject: "Chemistry",        category: "math",     level: "GS - LS - SE",       experience: "10 yrs", rating: 5.0 },
      { id: 4,  name: "Ms. Lara Mansour",  subject: "Biology",          category: "math",     level: "LS - SE",       experience: "7 yrs",  rating: 4.7 },
      { id: 5,  name: "Mr. Hady Fares",  subject: "Mathematics",      category: "math",     level: "Primaire - Complémentaire",           experience: "5 yrs",  rating: 4.6 },
      { id: 6,  name: "Ms. Amal Massoud",  subject: "Physics",          category: "math",     level: "Complémentaire",     experience: "9 yrs",  rating: 4.9 },
      { id: 7,  name: "Mr. Wassim Rizk",  subject: "Mathematics",      category: "math",     level: "Seconde - Première - SE",       experience: "10 yrs", rating: 5.0 },
      { id: 8,  name: "Ms. Leila Bitar",  subject: "Physics",          category: "math",     level: "GS - LS - SE",       experience: "7 yrs",  rating: 4.7 },
      { id: 9,  name: "Mr. Joseph Khoury",  subject: "Chemistry",        category: "math",     level: "Seconde - Première",       experience: "10 yrs", rating: 5.0 },
      { id: 10,  name: "Mr. Antoine Saab",  subject: "Biology",          category: "math",     level: "Complémentaire",       experience: "7 yrs",  rating: 4.7 },
      { id: 11,  name: "Ms. Mariam Choueiri",  subject: "English",          category: "language", level: "All levels",         experience: "11 yrs", rating: 5.0 },
      { id: 12,  name: "Mr. Georges Saad",  subject: "French",           category: "language", level: "All levels",       experience: "8 yrs",  rating: 4.8 },
      { id: 13,  name: "Ms. Nada Hajj",  subject: "Arabic",           category: "language", level: "All levels",           experience: "6 yrs",  rating: 4.7 },
      { id: 14, name: "Mr. Samir Rizk", subject: "English",          category: "language", level: "Maternelle",         experience: "4 yrs",  rating: 4.6 },
      { id: 15, name: "Ms. Hala Khoury", subject: "French",           category: "language", level: "Maternelle",         experience: "7 yrs",  rating: 4.9 },
      { id: 16, name: "Mr. Walid Ayoub", subject: "Arabic",           category: "language", level: "Maternelle",       experience: "6 yrs",  rating: 4.8 },
      { id: 17, name: "Ms. Rim Kfoury", subject: "Sociology & Economics", category: "SE", level: "Première & Terminale SE", experience: "8 yrs", rating: 4.9 },
      { id: 18, name: "Mr. Youssef Haddad", subject: "Sociology & Economics", category: "SE", level: "Première & Terminale SE", experience: "6 yrs", rating: 4.7 }
    ];

    this.currentFilter = 'all';
    this.currentSearch = '';

    this.gridEl      = document.getElementById('tutorsGrid');
    this.resultsEl   = document.getElementById('resultsCount');
    this.noResultsEl = document.getElementById('noResults');
    this.searchInput = document.getElementById('tutorSearch');
    this.filterBtns  = document.querySelectorAll('.filter-btn');

    if (!this.gridEl) return;

    this.render();
    this.attachEvents();
  }

  attachEvents() {
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.dataset.filter;
        this.render();
      });
    });

    this.searchInput.addEventListener('input', (e) => {
      this.currentSearch = e.target.value.toLowerCase().trim();
      this.render();
    });
  }

  getFiltered() {
    return this.tutors.filter(tutor => {
      const matchFilter = this.currentFilter === 'all' || tutor.category === this.currentFilter;
      const matchSearch =
        tutor.name.toLowerCase().includes(this.currentSearch) ||
        tutor.subject.toLowerCase().includes(this.currentSearch) ||
        tutor.level.toLowerCase().includes(this.currentSearch);
      return matchFilter && matchSearch;
    });
  }

  render() {
    const filtered = this.getFiltered();
    this.resultsEl.textContent = `Showing ${filtered.length} of ${this.tutors.length} tutors`;

    if (filtered.length === 0) {
      this.gridEl.innerHTML = '';
      this.noResultsEl.classList.remove('d-none');
      return;
    }

    this.noResultsEl.classList.add('d-none');
    this.gridEl.innerHTML = filtered.map(t => this.createCard(t)).join('');
  }

  createCard(tutor) {
    return `
      <div class="col-md-6 col-lg-4">
        <div class="tutor-card">
          <div class="tutor-avatar">
            <i class="bi bi-person-fill"></i>
          </div>
          <div class="tutor-body">
            <h5>${tutor.name}</h5>
            <p class="tutor-subject">${tutor.subject}</p>
            <div class="tutor-meta">
              <span><i class="bi bi-bar-chart-fill"></i> ${tutor.level}</span>
            </div>
            <div class="tutor-meta">
              <span><i class="bi bi-clock-fill"></i> ${tutor.experience}</span>
              <span><i class="bi bi-star-fill"></i> ${tutor.rating}</span>
            </div>
            <span class="tutor-badge">${this.getLabel(tutor.category)}</span>
          </div>
        </div>
      </div>
    `;
  }

  getLabel(category) {
    const labels = {
      math: 'Math & Sciences',
      language: 'Languages',
      SE : 'Sociology & Economics'
    };
    return labels[category] || category;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TutorManager();
});