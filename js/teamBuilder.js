/**
 * CREWLYY - Team Builder Studio JavaScript Interactions
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const teamNameInput = document.getElementById('team-name');
  const elevatorPitchInput = document.getElementById('elevator-pitch');
  const projectDescInput = document.getElementById('project-desc');
  const locationInput = document.getElementById('hackathon-location');
  const dateInput = document.getElementById('hackathon-date');
  
  const previewTitle = document.getElementById('preview-title');
  const previewTagline = document.getElementById('preview-tagline');
  const previewLocation = document.getElementById('preview-location');
  const previewDate = document.getElementById('preview-date');
  const charCounter = document.getElementById('char-counter');
  
  const skillsContainer = document.getElementById('skills-container');
  const btnAddSkill = document.getElementById('btn-add-skill');
  const activeTagsBadge = document.getElementById('active-tags-badge');
  
  const joinRequestsToggle = document.getElementById('join-requests-toggle');
  const btnSaveDraft = document.getElementById('btn-save-draft');
  const btnDiscard = document.getElementById('btn-discard');
  const autosaveText = document.getElementById('autosave-text');
  const autosaveDot = document.querySelector('.tb-autosave-dot');
  
  const btnConnectRepo = document.getElementById('btn-connect-repo');
  const btnContinue = document.getElementById('btn-continue');
  const btnBack = document.getElementById('btn-back');
  const toast = document.getElementById('tb-toast');
  const globalSearch = document.getElementById('global-search');
  
  const tabLivePreview = document.getElementById('tab-live-preview');
  const tabDraftSpec = document.getElementById('tab-draft-spec');
  const livePreviewBox = document.getElementById('live-preview-box');

  // Helper: Show Toast
  let toastTimer;
  function showToast(message, duration = 3000) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  }

  // 1. Live Preview Synchronizations
  if (teamNameInput && previewTitle) {
    teamNameInput.addEventListener('input', () => {
      const val = teamNameInput.value.trim();
      previewTitle.textContent = val || 'Untitled Squad';
      triggerAutosaveNotice();
    });
  }

  if (elevatorPitchInput && previewTagline) {
    elevatorPitchInput.addEventListener('input', () => {
      const val = elevatorPitchInput.value.trim();
      previewTagline.textContent = val || 'Brief elevator pitch goes here.';
      triggerAutosaveNotice();
    });
  }

  if (projectDescInput && charCounter) {
    const updateCounter = () => {
      const len = projectDescInput.value.length;
      charCounter.textContent = `${len} / 500`;
    };
    projectDescInput.addEventListener('input', () => {
      updateCounter();
      triggerAutosaveNotice();
    });
    updateCounter();
  }

  if (locationInput && previewLocation) {
    locationInput.addEventListener('input', () => {
      previewLocation.textContent = locationInput.value.trim() || 'Global Remote';
      triggerAutosaveNotice();
    });
  }

  if (dateInput && previewDate) {
    dateInput.addEventListener('input', () => {
      previewDate.textContent = dateInput.value.trim() || 'TBD';
      triggerAutosaveNotice();
    });
  }

  // 2. Active Tags Counter and Removal
  function updateTagCount() {
    const tags = skillsContainer.querySelectorAll('.tb-skill-tag');
    if (activeTagsBadge) {
      activeTagsBadge.textContent = `${tags.length} ACTIVE TAGS`;
    }
  }

  if (skillsContainer) {
    skillsContainer.addEventListener('click', (e) => {
      const removeBtn = e.target.closest('.tb-tag-remove');
      if (removeBtn) {
        const tag = removeBtn.closest('.tb-skill-tag');
        if (tag) {
          tag.remove();
          updateTagCount();
          showToast(`Skill removed.`);
          triggerAutosaveNotice();
        }
      }
    });
  }

  // Add Skill
  if (btnAddSkill && skillsContainer) {
    btnAddSkill.addEventListener('click', () => {
      const skillName = prompt('Enter a skill (e.g. Python, Solidity, Next.js, Product Design):');
      if (skillName && skillName.trim()) {
        const trimmed = skillName.trim();
        const newTag = document.createElement('span');
        newTag.className = 'tb-skill-tag';
        newTag.setAttribute('data-skill', trimmed);
        newTag.innerHTML = `${trimmed} <span class="tb-tag-remove" role="button" aria-label="Remove ${trimmed}">✕</span>`;
        skillsContainer.insertBefore(newTag, btnAddSkill);
        updateTagCount();
        showToast(`Added skill "${trimmed}"`);
        triggerAutosaveNotice();
      }
    });
  }

  // 3. Autosave / Draft Handling
  let saveTimeout;
  function triggerAutosaveNotice() {
    if (!autosaveText) return;
    if (autosaveDot) autosaveDot.style.background = '#ffb100';
    autosaveText.textContent = 'Saving changes...';
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      autosaveText.textContent = `Autosaved to Cloud · ${timeStr}`;
      if (autosaveDot) autosaveDot.style.background = 'var(--cyan-primary)';
    }, 1200);
  }

  if (btnSaveDraft) {
    btnSaveDraft.addEventListener('click', () => {
      if (autosaveDot) autosaveDot.style.background = 'var(--cyan-primary)';
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      autosaveText.textContent = `Autosaved to Cloud · ${timeStr}`;
      showToast('Draft successfully saved to cloud matrix.');
    });
  }

  if (btnDiscard) {
    btnDiscard.addEventListener('click', () => {
      if (confirm('Discard changes and restore last synced state?')) {
        teamNameInput.value = 'Pixel Pioneers';
        elevatorPitchInput.value = 'An AI-powered accessibility copilot for live events';
        projectDescInput.value = "We're making real-time captions, audio cues, and venue guidance work together in one simple mobile experience. Our goal is an inclusive event companion we can demo by Sunday.";
        locationInput.value = 'Bengaluru, India';
        dateInput.value = '24 Oct · 9:00 AM';
        
        previewTitle.textContent = 'Pixel Pioneers';
        previewTagline.textContent = 'AI-powered accessibility for live events.';
        previewLocation.textContent = 'Bengaluru, India';
        previewDate.textContent = '24–26 October 2026';
        
        charCounter.textContent = `${projectDescInput.value.length} / 500`;
        showToast('Draft reverted to last milestone.');
      }
    });
  }

  // 4. Join Requests Toggle
  if (joinRequestsToggle) {
    joinRequestsToggle.addEventListener('change', () => {
      if (joinRequestsToggle.checked) {
        showToast('Join requests open: Hackers can apply to vacant slots.');
      } else {
        showToast('Join requests paused: Team is private.');
      }
      triggerAutosaveNotice();
    });
  }

  // 5. Connect Repo Button
  if (btnConnectRepo) {
    let connected = false;
    btnConnectRepo.addEventListener('click', () => {
      connected = !connected;
      if (connected) {
        btnConnectRepo.textContent = 'Connected ✓';
        btnConnectRepo.style.borderColor = 'var(--cyan-primary)';
        btnConnectRepo.style.color = 'var(--cyan-primary)';
        showToast('GitHub & Linear repository link verified.');
      } else {
        btnConnectRepo.textContent = 'Connect Repo';
        btnConnectRepo.style.borderColor = '';
        btnConnectRepo.style.color = '';
        showToast('Repository link removed.');
      }
    });
  }

  // 6. Navigation Buttons
  if (btnBack) {
    btnBack.addEventListener('click', () => {
      window.location.href = 'index.html';
    });
  }

  const form = document.getElementById('team-builder-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Proceeding to Step 02: Squad Calibration & Requirements...', 3500);
    });
  }

  // 7. Tabs: Live Preview vs Draft Spec
  let specViewElement = null;
  if (tabDraftSpec && tabLivePreview && livePreviewBox) {
    tabDraftSpec.addEventListener('click', () => {
      tabDraftSpec.classList.add('active');
      tabDraftSpec.setAttribute('aria-selected', 'true');
      tabLivePreview.classList.remove('active');
      tabLivePreview.setAttribute('aria-selected', 'false');

      const tags = Array.from(skillsContainer.querySelectorAll('.tb-skill-tag'))
        .map(t => t.getAttribute('data-skill') || t.innerText.replace('✕', '').trim());

      const specObj = {
        protocol: "v2.4.0-PROD",
        team: {
          name: teamNameInput.value,
          pitch: elevatorPitchInput.value,
          description: projectDescInput.value,
          location: locationInput.value,
          dates: dateInput.value,
          skillsRequired: tags,
          recruitmentOpen: joinRequestsToggle.checked,
          lockedRosterSlots: 2,
          vacantSlots: 3
        }
      };

      if (!specViewElement) {
        specViewElement = document.createElement('pre');
        specViewElement.id = 'draft-spec-view';
        specViewElement.style.cssText = `
          background: #080a22;
          border: 1px solid var(--border-subtle);
          border-radius: 10px;
          padding: 16px;
          color: #79c0ff;
          font-family: monospace;
          font-size: 10px;
          line-height: 1.5;
          max-height: 380px;
          overflow-y: auto;
          white-space: pre-wrap;
        `;
      }
      specViewElement.textContent = JSON.stringify(specObj, null, 2);

      livePreviewBox.style.display = 'none';
      if (!document.getElementById('draft-spec-view')) {
        livePreviewBox.parentNode.insertBefore(specViewElement, livePreviewBox.nextSibling);
      } else {
        specViewElement.style.display = 'block';
      }
    });

    tabLivePreview.addEventListener('click', () => {
      tabLivePreview.classList.add('active');
      tabLivePreview.setAttribute('aria-selected', 'true');
      tabDraftSpec.classList.remove('active');
      tabDraftSpec.setAttribute('aria-selected', 'false');

      livePreviewBox.style.display = 'block';
      if (specViewElement) {
        specViewElement.style.display = 'none';
      }
    });
  }

  // 8. Keyboard shortcut (⌘ K / Ctrl + K)
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (globalSearch) {
        globalSearch.focus();
        showToast('Focused global search');
      }
    }
  });

  // 9. Open Slot interactions
  const openBadges = document.querySelectorAll('.tb-open-badge');
  openBadges.forEach((badge) => {
    badge.addEventListener('click', () => {
      const item = badge.closest('.tb-roster-item');
      const roleName = item ? item.querySelector('.tb-vacant-name').textContent : 'Role';
      showToast(`Inviting applicants for: ${roleName}`);
    });
  });

  // 10. Notification button
  const notifBtn = document.getElementById('notif-btn');
  if (notifBtn) {
    notifBtn.addEventListener('click', () => {
      showToast('Notifications: 1 pending squad application from Bangalore Hub.');
    });
  }

  // 11. Create Team button in header
  const createTeamBtn = document.getElementById('create-team-btn');
  if (createTeamBtn) {
    createTeamBtn.addEventListener('click', () => {
      showToast('Team Builder Studio is currently active.');
    });
  }
});
