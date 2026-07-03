class TutorManager {
  #tutors = [
    { id: 1, name: "Tutor 1", subject: "Mathematics", category: "math", level: "Brevet & Bac", experience: "8 yrs", rating: 4.9 },
    { id: 2, name: "Tutor 2", subject: "Physics", category: "math", level: "Secondaire", experience: "6 yrs", rating: 4.8 },
    { id: 3, name: "Tutor 3", subject: "Chemistry", category: "math", level: "Terminale SE", experience: "10 yrs", rating: 5.0 },
    { id: 4, name: "Tutor 4", subject: "Biology", category: "math", level: "Terminale SV", experience: "7 yrs", rating: 4.7 },
    { id: 5, name: "Tutor 5", subject: "Mathematics", category: "math", level: "Primaire", experience: "5 yrs", rating: 4.6 },
    { id: 6, name: "Tutor 6", subject: "Physics", category: "math", level: "Complémentaire", experience: "9 yrs", rating: 4.9 },
    { id: 7, name: "Tutor 7", subject: "English", category: "language", level: "All levels", experience: "11 yrs", rating: 5.0 },
    { id: 8, name: "Tutor 8", subject: "French", category: "language", level: "Brevet & Bac", experience: "8 yrs", rating: 4.8 },
    { id: 9, name: "Tutor 9", subject: "Arabic", category: "language", level: "Primaire", experience: "6 yrs", rating: 4.7 },
    { id: 10, name: "Tutor 10", subject: "English", category: "language", level: "Maternelle", experience: "4 yrs", rating: 4.6 },
    { id: 11, name: "Tutor 11", subject: "French", category: "language", level: "Secondaire", experience: "9 yrs", rating: 4.9 },
    { id: 12, name: "Tutor 12", subject: "Arabic", category: "language", level: "Brevet & Bac", experience: "7 yrs", rating: 4.8 },
    { id: 13, name: "Tutor 13", subject: "Lebanese Program", category: "lebanese", level: "Maternelle (GS)", experience: "10 yrs", rating: 5.0 },
    { id: 14, name: "Tutor 14", subject: "Lebanese Program", category: "lebanese", level: "Primaire (EB1-EB6)", experience: "8 yrs", rating: 4.9 },
    { id: 15, name: "Tutor 15", subject: "Lebanese Program", category: "lebanese", level: "Complémentaire", experience: "6 yrs", rating: 4.7 },
    { id: 16, name: "Tutor 16", subject: "Lebanese Program", category: "lebanese", level: "Seconde", experience: "9 yrs", rating: 4.8 },
    { id: 17, name: "Tutor 17", subject: "Lebanese Program", category: "lebanese", level: "Première (LS/SE)", experience: "12 yrs", rating: 5.0 },
    { id: 18, name: "Tutor 18", subject: "Lebanese Program", category: "lebanese", level: "Terminale (LS/SE)", experience: "13 yrs", rating: 5.0 }
  ];

  #currentFilter = 'all';
  #currentSearch = '';

  constructor() {
    this.gridEl = document.getElementById('tutorsGrid');
    this.resultsCountEl = document.getElementById('resultsCount');
    this.noResultsEl = document.getElementById('noResults');
    this.searchInput = document.getElementById('tutorSearch');
    this.filterBtns = document.querySelectorAll('.filter-btn');

    if (!this.gridEl) return;

    this.render();
    this.attachEvents();
  }

  attachEvents() {
    this.filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.#currentFilter = btn.dataset.filter;
        this.render();
      });
    });

    this.searchInput.addEventListener('input', (e) => {
      this.#currentSearch = e.target.value.toLowerCase().trim();
      this.render();
    });
  }

  getFilteredTutors() {
    return this.#tutors.filter(tutor => {
      const matchesFilter = this.#currentFilter === 'all' || tutor.category === this.#currentFilter;
      const matchesSearch =
        tutor.name.toLowerCase().includes(this.#currentSearch) ||
        tutor.subject.toLowerCase().includes(this.#currentSearch) ||
        tutor.level.toLowerCase().includes(this.#currentSearch);
      return matchesFilter && matchesSearch;
    });
  }

  render() {
    const filtered = this.getFilteredTutors();

    this.resultsCountEl.textContent = `Showing ${filtered.length} of ${this.#tutors.length} tutors`;

    if (filtered.length === 0) {
      this.gridEl.innerHTML = '';
      this.noResultsEl.classList.remove('d-none');
      return;
    }

    this.noResultsEl.classList.add('d-none');

    this.gridEl.innerHTML = filtered.map(tutor => this.createCard(tutor)).join('');
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
            <span class="tutor-badge">${this.getCategoryLabel(tutor.category)}</span>
          </div>
        </div>
      </div>
    `;
  }

  getCategoryLabel(category) {
    const labels = {
      math: 'Math & Sciences',
      language: 'Languages',
      lebanese: 'Lebanese Program'
    };
    return labels[category] || category;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new TutorManager();
});