class RegistrationForm {
  constructor() {
    this.step1 = document.getElementById('formStep1');
    this.step2 = document.getElementById('formStep2');
    this.step3 = document.getElementById('formStep3');
    this.success = document.getElementById('formSuccess');

    this.dot1 = document.getElementById('step1Dot');
    this.dot2 = document.getElementById('step2Dot');
    this.dot3 = document.getElementById('step3Dot');

    if (!this.step1) return;

    this.attachEvents();
  }

  attachEvents() {
    document.getElementById('toStep2').addEventListener('click', () => {
      if (this.validateStep1()) this.goToStep(2);
    });
    document.getElementById('toStep1').addEventListener('click', () => {
      this.goToStep(1);
    });
    document.getElementById('toStep3').addEventListener('click', () => {
      if (this.validateStep2()) this.goToStep(3);
    });
    document.getElementById('backToStep2').addEventListener('click', () => {
      this.goToStep(2);
    });
    document.getElementById('submitForm').addEventListener('click', () => {
      if (this.validateStep3()) this.submit();
    });
  }

  goToStep(stepNumber) {

    [this.step1, this.step2, this.step3].forEach(s => s.classList.add('d-none'));

    [this.dot1, this.dot2, this.dot3].forEach(d => d.classList.remove('active'));

    // Show correct step
    if (stepNumber === 1) {
      this.step1.classList.remove('d-none');
      this.dot1.classList.add('active');
    } else if (stepNumber === 2) {
      this.step2.classList.remove('d-none');
      this.dot2.classList.add('active');
    } else if (stepNumber === 3) {
      this.step3.classList.remove('d-none');
      this.dot3.classList.add('active');
    }

    document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth' });
  }

  showError(fieldId, message) {
    document.getElementById(fieldId).textContent = message;
  }

  clearError(fieldId) {
    document.getElementById(fieldId).textContent = '';
  }

  validateStep1() {
    let valid = true;

    const firstName = document.getElementById('firstName').value.trim();
    const lastName  = document.getElementById('lastName').value.trim();
    const dob       = document.getElementById('dob').value;
    const gender    = document.getElementById('gender').value;

    if (!firstName) {
      this.showError('firstNameError', 'First name is required.');
      valid = false;
    } else { this.clearError('firstNameError'); }

    if (!lastName) {
      this.showError('lastNameError', 'Last name is required.');
      valid = false;
    } else { this.clearError('lastNameError'); }

    if (!dob) {
      this.showError('dobError', 'Date of birth is required.');
      valid = false;
    } else { this.clearError('dobError'); }

    if (!gender) {
      this.showError('genderError', 'Please select a gender.');
      valid = false;
    } else { this.clearError('genderError'); }

    return valid;
  }

  validateStep2() {
    let valid = true;

    const school = document.getElementById('school').value.trim();
    const grade  = document.getElementById('grade').value;
    const checked = document.querySelectorAll('.checkbox-group input:checked');

    if (!school) {
      this.showError('schoolError', 'School name is required.');
      valid = false;
    } else { this.clearError('schoolError'); }

    if (!grade) {
      this.showError('gradeError', 'Please select a grade level.');
      valid = false;
    } else { this.clearError('gradeError'); }

    if (checked.length === 0) {
      this.showError('subjectsError', 'Please select at least one subject.');
      valid = false;
    } else { this.clearError('subjectsError'); }

    return valid;
  }

  validateStep3() {
    let valid = true;

    const parentName     = document.getElementById('parentName').value.trim();
    const relationship   = document.getElementById('relationship').value;
    const phone          = document.getElementById('phone').value.trim();
    const email          = document.getElementById('email').value.trim();
    const emailPattern   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern   = /^[0-9\s\+\-]{7,15}$/;

    if (!parentName) {
      this.showError('parentNameError', 'Parent name is required.');
      valid = false;
    } else { this.clearError('parentNameError'); }

    if (!relationship) {
      this.showError('relationshipError', 'Please select a relationship.');
      valid = false;
    } else { this.clearError('relationshipError'); }

    if (!phone || !phonePattern.test(phone)) {
      this.showError('phoneError', 'Please enter a valid phone number.');
      valid = false;
    } else { this.clearError('phoneError'); }

    if (!email || !emailPattern.test(email)) {
      this.showError('emailError', 'Please enter a valid email address.');
      valid = false;
    } else { this.clearError('emailError'); }

    return valid;
  }

  submit() {
    [this.step1, this.step2, this.step3].forEach(s => s.classList.add('d-none'));
    this.success.classList.remove('d-none');
    document.querySelector('.form-card').scrollIntoView({ behavior: 'smooth' });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new RegistrationForm();
});