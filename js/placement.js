class PlacementForm {
  constructor() {
    this.submitBtn  = document.getElementById('submitPlacement');
    this.successEl  = document.getElementById('placementSuccess');

    if (!this.submitBtn) return;

    this.attachEvents();
    this.setMinDate();
  }

  setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    const dateInput = document.getElementById('plDate');
    if (dateInput) dateInput.min = today;
  }

  attachEvents() {
    this.submitBtn.addEventListener('click', () => {
      if (this.validate()) this.submit();
    });
  }

  showError(id, message) {
    document.getElementById(id).textContent = message;
  }

  clearError(id) {
    document.getElementById(id).textContent = '';
  }

  validate() {
    let valid = true;

    const firstName  = document.getElementById('plFirstName').value.trim();
    const lastName   = document.getElementById('plLastName').value.trim();
    const age        = document.getElementById('plAge').value;
    const level      = document.getElementById('plLevel').value;
    const date       = document.getElementById('plDate').value;
    const time       = document.getElementById('plTime').value;
    const parentName = document.getElementById('plParentName').value.trim();
    const phone      = document.getElementById('plPhone').value.trim();
    const checked    = document.querySelectorAll(
      '#formStep1 .checkbox-group input:checked, .form-card .checkbox-group input:checked'
    );
    const phonePattern = /^[0-9\s\+\-]{7,15}$/;

    if (!firstName) {
      this.showError('plFirstNameError', 'First name is required.');
      valid = false;
    } else { this.clearError('plFirstNameError'); }

    if (!lastName) {
      this.showError('plLastNameError', 'Last name is required.');
      valid = false;
    } else { this.clearError('plLastNameError'); }

    if (!age || age < 3 || age > 18) {
      this.showError('plAgeError', 'Please enter a valid age (3–18).');
      valid = false;
    } else { this.clearError('plAgeError'); }

    if (!level) {
      this.showError('plLevelError', 'Please select a level.');
      valid = false;
    } else { this.clearError('plLevelError'); }

    if (checked.length === 0) {
      this.showError('plSubjectsError', 'Please select at least one subject.');
      valid = false;
    } else { this.clearError('plSubjectsError'); }

    if (!date) {
      this.showError('plDateError', 'Please select a preferred date.');
      valid = false;
    } else { this.clearError('plDateError'); }

    if (!time) {
      this.showError('plTimeError', 'Please select a preferred time slot.');
      valid = false;
    } else { this.clearError('plTimeError'); }

    if (!parentName) {
      this.showError('plParentNameError', 'Parent name is required.');
      valid = false;
    } else { this.clearError('plParentNameError'); }

    if (!phone || !phonePattern.test(phone)) {
      this.showError('plPhoneError', 'Please enter a valid phone number.');
      valid = false;
    } else { this.clearError('plPhoneError'); }

    return valid;
  }

  submit() {
    this.submitBtn.classList.add('d-none');
    this.successEl.classList.remove('d-none');
    this.successEl.scrollIntoView({ behavior: 'smooth' });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new PlacementForm();
});