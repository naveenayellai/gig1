/**
 * PeaklyyX Enterprise SaaS - Project Creation Form Modal Controller
 * Multi-Step Flow, Live Validation, Interactive Plan Selector & Dynamic Insert
 */

class PeaklyyForm {
  constructor() {
    this.modal = document.getElementById('newProjectModal');
    this.form = document.getElementById('newProjectForm');
    this.currentStep = 1;
    this.totalSteps = 3;

    this.initEventListeners();
  }

  initEventListeners() {
    // Open modal triggers
    document.querySelectorAll('.trigger-new-project-modal').forEach(btn => {
      btn.addEventListener('click', () => this.openModal());
    });

    // Close modal triggers
    const closeBtn = document.getElementById('closeModalBtn');
    if (closeBtn) closeBtn.addEventListener('click', () => this.closeModal());

    const cancelBtn = document.getElementById('cancelFormBtn');
    if (cancelBtn) cancelBtn.addEventListener('click', () => this.closeModal());

    if (this.modal) {
      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.closeModal();
      });
    }

    // Step navigation buttons
    const nextStepBtn = document.getElementById('nextStepBtn');
    if (nextStepBtn) nextStepBtn.addEventListener('click', () => this.goToNextStep());

    const prevStepBtn = document.getElementById('prevStepBtn');
    if (prevStepBtn) prevStepBtn.addEventListener('click', () => this.goToPrevStep());

    // Interactive tier card selection
    document.querySelectorAll('.tier-choice-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.tier-choice-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        const radio = card.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
      });
    });

    // Form submission
    if (this.form) {
      this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  openModal() {
    if (!this.modal) return;
    this.currentStep = 1;
    this.updateStepView();
    this.modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    const firstInput = document.getElementById('formProjectName');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  goToNextStep() {
    if (!this.validateCurrentStep()) return;
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
      this.updateStepView();
    }
  }

  goToPrevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.updateStepView();
    }
  }

  updateStepView() {
    for (let i = 1; i <= this.totalSteps; i++) {
      const stepEl = document.getElementById(`formStep${i}`);
      const stepIndicator = document.getElementById(`stepBadge${i}`);
      if (stepEl) {
        stepEl.style.display = i === this.currentStep ? 'block' : 'none';
      }
      if (stepIndicator) {
        stepIndicator.classList.toggle('active', i === this.currentStep);
        stepIndicator.classList.toggle('completed', i < this.currentStep);
      }
    }

    const prevBtn = document.getElementById('prevStepBtn');
    const nextBtn = document.getElementById('nextStepBtn');
    const submitBtn = document.getElementById('submitProjectBtn');

    if (prevBtn) prevBtn.style.display = this.currentStep > 1 ? 'inline-flex' : 'none';
    if (nextBtn) nextBtn.style.display = this.currentStep < this.totalSteps ? 'inline-flex' : 'none';
    if (submitBtn) submitBtn.style.display = this.currentStep === this.totalSteps ? 'inline-flex' : 'none';
  }

  validateCurrentStep() {
    let isValid = true;

    if (this.currentStep === 1) {
      const nameInput = document.getElementById('formProjectName');
      const domainInput = document.getElementById('formClientDomain');

      if (!nameInput.value.trim()) {
        nameInput.classList.add('input-error');
        isValid = false;
      } else {
        nameInput.classList.remove('input-error');
      }

      if (!domainInput.value.trim()) {
        domainInput.classList.add('input-error');
        isValid = false;
      } else {
        domainInput.classList.remove('input-error');
      }
    }

    return isValid;
  }

  handleSubmit(e) {
    e.preventDefault();
    if (!this.validateCurrentStep()) return;

    const submitBtn = document.getElementById('submitProjectBtn');
    if (submitBtn) submitBtn.classList.add('btn-loading');

    // Collect values
    const clientName = document.getElementById('formProjectName').value.trim();
    const domain = document.getElementById('formClientDomain').value.trim();
    const owner = document.getElementById('formLeadOwner').value;
    const tierRadio = document.querySelector('input[name="formTier"]:checked');
    const tier = tierRadio ? tierRadio.value : 'Enterprise';
    const mrrInput = document.getElementById('formMrrVal').value;
    const mrr = parseInt(mrrInput, 10) || (tier === 'Enterprise' ? 24500 : tier === 'Scale' ? 9800 : 3600);
    const region = document.getElementById('formRegion').value;

    const initials = clientName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'PX';
    const newId = `PRJ-${Math.floor(9000 + Math.random() * 999)}`;

    const gradients = [
      "linear-gradient(135deg, #6366f1, #a855f7)",
      "linear-gradient(135deg, #06b6d4, #3b82f6)",
      "linear-gradient(135deg, #10b981, #059669)",
      "linear-gradient(135deg, #f59e0b, #ea580c)"
    ];
    const avatarBg = gradients[Math.floor(Math.random() * gradients.length)];

    setTimeout(() => {
      const newProject = {
        id: newId,
        client: clientName,
        domain: domain,
        avatarBg: avatarBg,
        avatarInitials: initials,
        tier: tier,
        mrr: mrr,
        status: 'Active',
        healthScore: 100,
        milestone: 'Initial Tenant Provisioning',
        deadline: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
        owner: owner || 'Elena Rostova',
        region: region
      };

      if (window.peaklyyTable) {
        window.peaklyyTable.addNewProject(newProject);
      }

      if (submitBtn) submitBtn.classList.remove('btn-loading');
      this.closeModal();
      this.form.reset();

      if (window.showToast) {
        window.showToast('success', 'Project Successfully Provisioned', `${clientName} has been initialized with ID ${newId}`);
      }
    }, 400);
  }
}

window.PeaklyyForm = PeaklyyForm;
