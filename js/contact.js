class ContactForm {
  #rules = {
    contactName:    { required: true,  minLength: 2,  pattern: null,                           label: 'Full name' },
    contactEmail:   { required: true,  minLength: 0,  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  label: 'Email address' },
    contactPhone:   { required: false, minLength: 0,  pattern: /^[0-9\s\+\-]{7,15}$/,         label: 'Phone number' },
    contactSubject: { required: true,  minLength: 0,  pattern: null,                           label: 'Subject' },
    contactMessage: { required: true,  minLength: 20, pattern: null,                           label: 'Message' }
  };

  constructor() {
    this.submitBtn    = document.getElementById('contactSubmit');
    this.successEl    = document.getElementById('contactSuccess');
    this.formStatus   = document.getElementById('formStatus');
    this.messageInput = document.getElementById('contactMessage');
    this.charCount    = document.getElementById('charCount');

    if (!this.submitBtn) return;

    this.attachRealTimeValidation();
    this.attachCharCounter();
    this.attachSubmit();
    this.attachSendAnother();
  }

  attachRealTimeValidation() {
    Object.keys(this.#rules).forEach(fieldId => {
      const input = document.getElementById(fieldId);
      if (!input) return;

      input.addEventListener('input', () => this.validateField(fieldId));

      input.addEventListener('blur', () => this.validateField(fieldId));

      if (input.tagName === 'SELECT') {
        input.addEventListener('change', () => this.validateField(fieldId));
      }
    });
  }

  attachCharCounter() {
    if (!this.messageInput) return;
    this.messageInput.addEventListener('input', () => {
      const len = this.messageInput.value.length;
      this.charCount.textContent = `${len} / 500`;

      if (len > 500) {
        this.charCount.style.color = 'var(--cherry)';
      } else if (len >= 20) {
        this.charCount.style.color = 'green';
      } else {
        this.charCount.style.color = 'var(--text-muted)';
      }
    });
  }

  validateField(fieldId) {
    const rule    = this.#rules[fieldId];
    const input   = document.getElementById(fieldId);
    const errorEl = document.getElementById(`${fieldId}Error`);
    const validEl = document.getElementById(`${fieldId}Valid`);
    const value   = input.value.trim();

    let errorMsg = '';

    if (rule.required && !value) {
      errorMsg = `${rule.label} is required.`;
    } else if (value && rule.minLength && value.length < rule.minLength) {
      errorMsg = `${rule.label} must be at least ${rule.minLength} characters.`;
    } else if (value && rule.pattern && !rule.pattern.test(value)) {
      errorMsg = `Please enter a valid ${rule.label.toLowerCase()}.`;
    } else if (value && fieldId === 'contactMessage' && value.length > 500) {
      errorMsg = 'Message cannot exceed 500 characters.';
    }

    if (errorMsg) {
      errorEl.textContent = errorMsg;
      input.classList.add('input-error');
      input.classList.remove('input-valid');
      if (validEl) validEl.classList.add('d-none');
      return false;
    } else if (value || !rule.required) {
      errorEl.textContent = '';
      if (value) {
        input.classList.remove('input-error');
        input.classList.add('input-valid');
        if (validEl) validEl.classList.remove('d-none');
      } else {
        input.classList.remove('input-error', 'input-valid');
        if (validEl) validEl.classList.add('d-none');
      }
      return true;
    }

    return true;
  }

  validateAll() {
    const results = Object.keys(this.#rules).map(id => this.validateField(id));
    return results.every(r => r === true);
  }

  attachSubmit() {
    this.submitBtn.addEventListener('click', () => {
      if (this.validateAll()) {
        this.submit();
      } else {
        this.formStatus.textContent = 'Please fix the errors above before submitting.';
        this.formStatus.style.color = 'var(--cherry)';
      }
    });
  }

  submit() {
    this.submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Sending...';
    this.submitBtn.disabled = true;
    this.formStatus.textContent = '';

    setTimeout(() => {
      document.querySelector('.form-card .row').classList.add('d-none');
      document.querySelector('.step-nav').classList.add('d-none');
      document.getElementById('contactSuccess').classList.remove('d-none');
    }, 1500);
  }

  // ── Send another message ──
  attachSendAnother() {
    const btn = document.getElementById('sendAnother');
    if (!btn) return;

    btn.addEventListener('click', () => {
      Object.keys(this.#rules).forEach(id => {
        const input = document.getElementById(id);
        if (input) {
          input.value = '';
          input.classList.remove('input-valid', 'input-error');
        }
        const errorEl = document.getElementById(`${id}Error`);
        if (errorEl) errorEl.textContent = '';
        const validEl = document.getElementById(`${id}Valid`);
        if (validEl) validEl.classList.add('d-none');
      });

      if (this.charCount) {
        this.charCount.textContent = '0 / 500';
        this.charCount.style.color = 'var(--text-muted)';
      }

      document.querySelector('.form-card .row').classList.remove('d-none');
      document.querySelector('.step-nav').classList.remove('d-none');
      document.getElementById('contactSuccess').classList.add('d-none');

      this.submitBtn.innerHTML = '<i class="bi bi-send-fill"></i> Send Message';
      this.submitBtn.disabled = false;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new ContactForm();
});