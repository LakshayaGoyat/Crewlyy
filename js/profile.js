/**
 * CREWLYY — Profile Page Interactive Logic
 * Pure Vanilla JavaScript (No Frameworks)
 * Handles edit profile modal, status toggle, local persistence,
 * avatar updates, and toast alerts.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const editProfileBtn = document.getElementById('btn-edit-profile-main');
  const editNameBtn = document.getElementById('btn-edit-name');
  const editPrefBtn = document.getElementById('btn-edit-pref');
  const editContactBtn = document.getElementById('btn-edit-contact');
  const editAboutBtn = document.getElementById('btn-edit-about');
  const editArsenalBtn = document.getElementById('btn-edit-arsenal');
  const editJourneyBtn = document.getElementById('btn-edit-journey');

  const modalOverlay = document.getElementById('edit-profile-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalCancelBtn = document.getElementById('modal-cancel-btn');
  const modalForm = document.getElementById('modal-profile-form');

  const toast = document.getElementById('profile-toast');
  const toastMsg = document.getElementById('profile-toast-msg');

  // Status Menu Elements
  const statusPill = document.getElementById('profile-status-pill');
  const statusMenu = document.getElementById('profile-status-menu');
  const statusDot = document.getElementById('profile-status-dot');
  const statusText = document.getElementById('profile-status-text');

  // Avatar Elements
  const avatarImg = document.getElementById('profile-avatar-img');
  const avatarCameraBtn = document.getElementById('avatar-camera-btn');
  const avatarFileInput = document.getElementById('avatar-file-input');

  // Display Elements
  const elName = document.getElementById('display-name');
  const elHeadline = document.getElementById('display-headline');
  const elLocation = document.getElementById('display-location');
  const elBio1 = document.getElementById('display-bio-1');
  const elBio2 = document.getElementById('display-bio-2');
  const elTeamSize = document.getElementById('display-team-size');
  const elTimezone = document.getElementById('display-timezone');
  const elCapacity = document.getElementById('display-capacity');
  const elEmail = document.getElementById('display-email');
  const elPhone = document.getElementById('display-phone');
  const elGithub = document.getElementById('display-github');
  const elLinkedin = document.getElementById('display-linkedin');
  const elTwitter = document.getElementById('display-twitter');
  const elPortfolio = document.getElementById('display-portfolio');

  // Form Inputs
  const inputName = document.getElementById('input-name');
  const inputHeadline = document.getElementById('input-headline');
  const inputLocation = document.getElementById('input-location');
  const inputStatus = document.getElementById('input-status');
  const inputTeamSize = document.getElementById('input-team-size');
  const inputTimezone = document.getElementById('input-timezone');
  const inputCapacity = document.getElementById('input-capacity');
  const inputBio = document.getElementById('input-bio');
  const inputEmail = document.getElementById('input-email');
  const inputPhone = document.getElementById('input-phone');
  const inputGithub = document.getElementById('input-github');
  const inputLinkedin = document.getElementById('input-linkedin');
  const inputTwitter = document.getElementById('input-twitter');
  const inputPortfolio = document.getElementById('input-portfolio');

  // Helper: Toast
  let toastTimer;
  function showToast(message) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // Load Saved Profile Data from LocalStorage
  function loadProfileData() {
    try {
      const saved = localStorage.getItem('crewlyy_user_profile');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.name && elName) elName.textContent = data.name;
        if (data.headline && elHeadline) elHeadline.textContent = data.headline;
        if (data.location && elLocation) elLocation.textContent = data.location;
        if (data.bio && elBio1) {
          const parts = data.bio.split('\n\n');
          elBio1.textContent = parts[0] || data.bio;
          if (parts[1] && elBio2) {
            elBio2.textContent = parts[1];
          }
        }
        if (data.teamSize && elTeamSize) elTeamSize.textContent = data.teamSize;
        if (data.timezone && elTimezone) elTimezone.textContent = data.timezone;
        if (data.capacity && elCapacity) elCapacity.textContent = data.capacity;
        if (data.email && elEmail) {
          elEmail.textContent = data.email;
          elEmail.href = `mailto:${data.email}`;
        }
        if (data.phone && elPhone) {
          elPhone.textContent = data.phone;
          elPhone.href = `tel:${data.phone.replace(/[^0-9+]/g, '')}`;
        }
        if (data.github && elGithub) {
          elGithub.textContent = data.github;
          elGithub.href = data.github.startsWith('http') ? data.github : `https://${data.github}`;
        }
        if (data.linkedin && elLinkedin) {
          elLinkedin.textContent = data.linkedin;
          elLinkedin.href = data.linkedin.startsWith('http') ? data.linkedin : `https://${data.linkedin}`;
        }
        if (data.twitter && elTwitter) {
          elTwitter.textContent = data.twitter;
          elTwitter.href = `https://twitter.com/${data.twitter.replace('@', '')}`;
        }
        if (data.portfolio && elPortfolio) {
          elPortfolio.textContent = data.portfolio;
          elPortfolio.href = data.portfolio.startsWith('http') ? data.portfolio : `https://${data.portfolio}`;
        }
        if (data.status) {
          applyStatus(data.status);
        }
        if (data.avatar && avatarImg) {
          avatarImg.src = data.avatar;
        }
      }
    } catch (e) {
      console.warn('Error loading stored profile data:', e);
    }
  }

  // Populate Modal Form with Current UI Values
  function populateModalForm() {
    if (inputName && elName) inputName.value = elName.textContent.trim();
    if (inputHeadline && elHeadline) inputHeadline.value = elHeadline.textContent.trim();
    if (inputLocation && elLocation) inputLocation.value = elLocation.textContent.trim();
    if (inputTeamSize && elTeamSize) inputTeamSize.value = elTeamSize.textContent.trim();
    if (inputTimezone && elTimezone) inputTimezone.value = elTimezone.textContent.trim();
    if (inputCapacity && elCapacity) inputCapacity.value = elCapacity.textContent.trim();
    if (inputEmail && elEmail) inputEmail.value = elEmail.textContent.trim();
    if (inputPhone && elPhone) inputPhone.value = elPhone.textContent.trim();
    if (inputGithub && elGithub) inputGithub.value = elGithub.textContent.trim();
    if (inputLinkedin && elLinkedin) inputLinkedin.value = elLinkedin.textContent.trim();
    if (inputTwitter && elTwitter) inputTwitter.value = elTwitter.textContent.trim();
    if (inputPortfolio && elPortfolio) inputPortfolio.value = elPortfolio.textContent.trim();

    if (inputBio) {
      const b1 = elBio1 ? elBio1.textContent.trim() : '';
      const b2 = elBio2 ? elBio2.textContent.trim() : '';
      inputBio.value = b2 ? `${b1}\n\n${b2}` : b1;
    }

    if (inputStatus && statusText) {
      inputStatus.value = statusText.textContent.trim();
    }
  }

  function openModal() {
    if (!modalOverlay) return;
    populateModalForm();
    modalOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  // Wire Modal Open Triggers
  [editProfileBtn, editNameBtn, editPrefBtn, editContactBtn, editAboutBtn, editArsenalBtn, editJourneyBtn].forEach(btn => {
    if (btn) btn.addEventListener('click', openModal);
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeModal);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('is-active')) {
      closeModal();
    }
  });

  // Handle Form Submission
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const profileData = {
        name: inputName ? inputName.value.trim() : '',
        headline: inputHeadline ? inputHeadline.value.trim() : '',
        location: inputLocation ? inputLocation.value.trim() : '',
        status: inputStatus ? inputStatus.value.trim() : 'AVAILABLE',
        teamSize: inputTeamSize ? inputTeamSize.value.trim() : '',
        timezone: inputTimezone ? inputTimezone.value.trim() : '',
        capacity: inputCapacity ? inputCapacity.value.trim() : '',
        bio: inputBio ? inputBio.value.trim() : '',
        email: inputEmail ? inputEmail.value.trim() : '',
        phone: inputPhone ? inputPhone.value.trim() : '',
        github: inputGithub ? inputGithub.value.trim() : '',
        linkedin: inputLinkedin ? inputLinkedin.value.trim() : '',
        twitter: inputTwitter ? inputTwitter.value.trim() : '',
        portfolio: inputPortfolio ? inputPortfolio.value.trim() : '',
        avatar: avatarImg ? avatarImg.src : ''
      };

      // Apply to DOM
      if (elName) elName.textContent = profileData.name || 'Alex Morgan';
      if (elHeadline) elHeadline.textContent = profileData.headline || 'Full Stack Developer • Open Source Enthusiast';
      if (elLocation) elLocation.textContent = profileData.location || 'San Francisco, CA';
      
      if (profileData.bio && elBio1) {
        const parts = profileData.bio.split('\n\n');
        elBio1.textContent = parts[0] || profileData.bio;
        if (elBio2) {
          elBio2.textContent = parts[1] || '';
          elBio2.style.display = parts[1] ? 'block' : 'none';
        }
      }

      if (elTeamSize) elTeamSize.textContent = profileData.teamSize || '3 - 5 Members';
      if (elTimezone) elTimezone.textContent = profileData.timezone || 'PST (UTC-8)';
      if (elCapacity) elCapacity.textContent = profileData.capacity || '25+ HRS / SPRINT';

      if (elEmail) {
        elEmail.textContent = profileData.email || 'alex.morgan@dev.com';
        elEmail.href = `mailto:${profileData.email || 'alex.morgan@dev.com'}`;
      }
      if (elPhone) {
        elPhone.textContent = profileData.phone || '+1 (555) 019-2831';
        elPhone.href = `tel:${profileData.phone ? profileData.phone.replace(/[^0-9+]/g, '') : ''}`;
      }
      if (elGithub) {
        elGithub.textContent = profileData.github || 'github.com/alexm-dev';
        elGithub.href = profileData.github.startsWith('http') ? profileData.github : `https://${profileData.github}`;
      }
      if (elLinkedin) {
        elLinkedin.textContent = profileData.linkedin || 'linkedin.com/in/alexm';
        elLinkedin.href = profileData.linkedin.startsWith('http') ? profileData.linkedin : `https://${profileData.linkedin}`;
      }
      if (elTwitter) {
        elTwitter.textContent = profileData.twitter || '@alexm_codes';
        elTwitter.href = `https://twitter.com/${profileData.twitter.replace('@', '')}`;
      }
      if (elPortfolio) {
        elPortfolio.textContent = profileData.portfolio || 'alexmorgan.dev';
        elPortfolio.href = profileData.portfolio.startsWith('http') ? profileData.portfolio : `https://${profileData.portfolio}`;
      }

      applyStatus(profileData.status);

      // Save to localStorage
      try {
        localStorage.setItem('crewlyy_user_profile', JSON.stringify(profileData));
      } catch (err) {
        console.warn('Failed to store profile in localStorage:', err);
      }

      closeModal();
      showToast('Profile updated successfully!');
    });
  }

  // Status Pill Dropdown Menu
  function applyStatus(status) {
    if (!statusText || !statusDot) return;
    const cleanStatus = status.toUpperCase();
    statusText.textContent = cleanStatus;

    statusDot.className = 'profile-status-dot';
    if (cleanStatus.includes('SPRINT')) {
      statusDot.classList.add('in-sprint');
    } else if (cleanStatus.includes('OFFER') || cleanStatus.includes('OPEN')) {
      statusDot.classList.add('open-offers');
    } else if (cleanStatus.includes('BUSY')) {
      statusDot.classList.add('busy');
    }
  }

  if (statusPill && statusMenu) {
    statusPill.addEventListener('click', (e) => {
      e.stopPropagation();
      statusMenu.classList.toggle('is-open');
    });

    document.addEventListener('click', (e) => {
      if (!statusPill.contains(e.target) && !statusMenu.contains(e.target)) {
        statusMenu.classList.remove('is-open');
      }
    });

    const statusOptions = statusMenu.querySelectorAll('.profile-status-option');
    statusOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        const val = opt.getAttribute('data-status') || opt.textContent.trim();
        applyStatus(val);
        statusMenu.classList.remove('is-open');
        showToast(`Availability set to: ${val}`);

        // Persist update
        try {
          const saved = JSON.parse(localStorage.getItem('crewlyy_user_profile') || '{}');
          saved.status = val;
          localStorage.setItem('crewlyy_user_profile', JSON.stringify(saved));
        } catch (e) {}
      });
    });
  }

  // Avatar Camera Upload Action
  if (avatarCameraBtn && avatarFileInput) {
    avatarCameraBtn.addEventListener('click', () => {
      avatarFileInput.click();
    });

    avatarFileInput.addEventListener('change', (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          alert('Please select a valid image file.');
          return;
        }
        const reader = new FileReader();
        reader.onload = (loadEvent) => {
          const dataUrl = loadEvent.target.result;
          if (avatarImg) avatarImg.src = dataUrl;
          showToast('Profile photo updated!');

          // Save avatar to localStorage
          try {
            const saved = JSON.parse(localStorage.getItem('crewlyy_user_profile') || '{}');
            saved.avatar = dataUrl;
            localStorage.setItem('crewlyy_user_profile', JSON.stringify(saved));
          } catch (e) {}
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Technical Arsenal Skill Badge Click Interaction
  const skillBadges = document.querySelectorAll('.arsenal-badge');
  skillBadges.forEach(badge => {
    badge.addEventListener('click', () => {
      const text = badge.textContent.replace(/\s+/g, ' ').trim();
      showToast(`Skill calibrated: ${text}`);
    });
  });

  // Initialize
  loadProfileData();
});
