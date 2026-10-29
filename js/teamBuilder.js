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
  const btnConfirmTeam = document.getElementById('btn-confirm-team');
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
      autosaveText.textContent = `Draft saved to Matrix · ${timeStr}`;
      try {
        const draftData = collectFormData();
        localStorage.setItem('crewlyy_team_draft', JSON.stringify(draftData, null, 2));
      } catch (err) {
        console.warn('Failed to save draft to localStorage:', err);
      }
      showToast('Draft successfully saved to local matrix.');
    });
  }

  if (btnDiscard) {
    btnDiscard.addEventListener('click', () => {
      if (confirm('Discard changes and restore last synced state?')) {
        try {
          localStorage.removeItem('crewlyy_team_draft');
          localStorage.removeItem('crewlyy_team_formation');
        } catch (e) {}

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

  // Derive matching roles for Explore Teams (squad-matrix.html)
  function deriveRolesFromSkills(skills) {
    const roles = [];
    const joined = (skills || []).join(' ').toLowerCase();
    if (joined.includes('react') || joined.includes('front') || joined.includes('vue') || joined.includes('ui') || joined.includes('html') || joined.includes('css')) {
      roles.push('Frontend');
    }
    if (joined.includes('node') || joined.includes('back') || joined.includes('python') || joined.includes('fastapi') || joined.includes('api') || joined.includes('sql')) {
      roles.push('Backend');
    }
    if (joined.includes('design') || joined.includes('figma') || joined.includes('ux')) {
      roles.push('UI/UX Design');
    }
    if (joined.includes('ai') || joined.includes('ml') || joined.includes('llm') || joined.includes('gpt') || joined.includes('vision')) {
      roles.push('AI / LLM Ops');
    }
    if (joined.includes('web3') || joined.includes('solidity') || joined.includes('crypto') || joined.includes('smart') || joined.includes('contract')) {
      roles.push('Web3 / Smart Contracts');
    }
    if (joined.includes('product') || joined.includes('pitch') || joined.includes('mgmt') || joined.includes('deck')) {
      roles.push('Product');
    }
    if (roles.length === 0) {
      roles.push('Frontend', 'Product');
    }
    return Array.from(new Set(roles));
  }

  // 6b. Form Data Collection & Serialization
  function collectFormData() {
    const tags = Array.from(skillsContainer ? skillsContainer.querySelectorAll('.tb-skill-tag') : [])
      .map(t => t.getAttribute('data-skill') || t.innerText.replace('✕', '').trim())
      .filter(Boolean);

    const teamName = teamNameInput ? teamNameInput.value.trim() : 'Pixel Pioneers';
    const pitch = elevatorPitchInput ? elevatorPitchInput.value.trim() : '';
    const desc = projectDescInput ? projectDescInput.value.trim() : '';
    const location = locationInput ? locationInput.value.trim() : 'Bengaluru, India';
    const dates = dateInput ? dateInput.value.trim() : '24 Oct · 9:00 AM';
    const joinOpen = joinRequestsToggle ? joinRequestsToggle.checked : true;
    const teamSlug = teamName ? teamName.toLowerCase().replace(/[^a-z0-9]+/g, '_') : 'unnamed';
    const matchedRoles = deriveRolesFromSkills(tags);

    return {
      id: "squad_" + teamSlug,
      name: teamName,
      elevatorPitch: pitch,
      description: desc,
      location: location,
      dates: dates,
      skillsRequired: tags,
      recruitmentOpen: joinOpen,
      roster: {
        totalCapacity: 5,
        lockedSlots: 2,
        vacantSlots: 3,
        equilibrium: "48% Matrix",
        members: [
          {
            name: "Alex Morgan",
            role: "Captain · Systems Lead",
            status: "Verified",
            avatar: "images/alex_roster.png"
          },
          {
            name: "Jordan Chen",
            role: "Core · AI / ML",
            status: "Confirmed",
            avatar: "images/jordan_roster.png"
          }
        ],
        vacantRoles: [
          "Frontend Architect",
          "UI / UX Designer",
          "Pitch & Demo Specialist"
        ]
      },
      status: "CONFIRMED",
      confirmedAt: new Date().toISOString(),
      timestampFormatted: new Date().toLocaleString(),
      // Squad Matrix integration fields (for squad-matrix.html)
      hackathon: dates ? `Hackathon (${dates})` : 'GreenTech Hack 2026',
      spots: 3,
      spotLabel: "3 SPOTS LEFT",
      spotClass: "spots-blue",
      metricKicker: "EQUILIBRIUM",
      metricValue: "48%",
      metricUnit: "Matrix",
      metricType: "pill",
      metricPill: joinOpen ? "Recruiting" : "Private",
      crewCount: "+2",
      stack: tags.length > 0 ? tags : ["React", "UI/UX Design", "AI / ML"],
      highlightStack: tags[0] || "React",
      roles: matchedRoles,
      experience: "intermediate",
      created: Date.now()
    };
  }

  // Helper: Trigger local JSON file download in browser
  function downloadJsonFile(data, filename) {
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  // Confirm Team Formation: Gather form data, add to unified teams list, save to localStorage, download single teams.json
  function confirmTeamFormation() {
    const teamName = teamNameInput ? teamNameInput.value.trim() : '';
    if (!teamName) {
      showToast('Please specify a Team Name before confirming formation.');
      if (teamNameInput) teamNameInput.focus();
      return null;
    }

    const newTeam = collectFormData();

    // 1. Retrieve the existing unified teams list from localStorage
    let teams = [];
    try {
      const stored = localStorage.getItem('crewlyy_teams');
      if (stored) {
        const parsed = JSON.parse(stored);
        teams = Array.isArray(parsed) ? parsed : (parsed.teams || []);
      }
    } catch (e) {
      console.warn('Could not read crewlyy_teams from localStorage:', e);
    }

    // 2. Add or update this team in the single unified array
    const existingIndex = teams.findIndex(t => 
      (t.id && t.id === newTeam.id) || 
      (t.name && t.name.toLowerCase() === newTeam.name.toLowerCase())
    );

    if (existingIndex >= 0) {
      teams[existingIndex] = newTeam;
    } else {
      teams.unshift(newTeam);
    }

    // 3. Store updated list in localStorage so all pages can immediately read it
    try {
      localStorage.setItem('crewlyy_teams', JSON.stringify(teams, null, 2));
      localStorage.setItem('crewlyy_team_formation', JSON.stringify(newTeam, null, 2));
    } catch (err) {
      console.warn('Could not store teams in localStorage:', err);
    }

    // 4. Trigger download of the single unified teams.json file
    downloadJsonFile(teams, 'teams.json');

    // 5. Update status indicators
    if (autosaveText) {
      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      autosaveText.textContent = `Saved to teams.json (${teams.length} ${teams.length === 1 ? 'team' : 'teams'}) · ${nowStr}`;
    }
    if (autosaveDot) {
      autosaveDot.style.background = '#10b981';
    }

    // 6. Update Draft Spec view if visible/initialized
    if (specViewElement) {
      specViewElement.textContent = JSON.stringify(teams, null, 2);
    }

    // 7. User Feedback Toast
    showToast(`Team "${teamName}" confirmed! Added to teams.json (${teams.length} total ${teams.length === 1 ? 'team' : 'teams'})`, 4500);
    return teams;
  }

  // Bind Confirm Team Formation button
  if (btnConfirmTeam) {
    btnConfirmTeam.addEventListener('click', () => {
      confirmTeamFormation();
    });
  }

  const form = document.getElementById('team-builder-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      confirmTeamFormation();
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

      const specObj = collectFormData();

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

  // 12. Load saved formation or draft from localStorage on load if available
  function loadSavedFormation() {
    try {
      // Check if crewlyy_teams is initialized in localStorage, if not seed from teams.json
      if (!localStorage.getItem('crewlyy_teams')) {
        fetch('teams.json')
          .then(res => res.ok ? res.json() : null)
          .then(data => {
            if (data && Array.isArray(data)) {
              localStorage.setItem('crewlyy_teams', JSON.stringify(data, null, 2));
            }
          })
          .catch(() => {});
      }

      const savedStr = localStorage.getItem('crewlyy_team_formation') || localStorage.getItem('crewlyy_team_draft');
      if (!savedStr) return;
      const parsed = JSON.parse(savedStr);
      const t = parsed.team || parsed;
      if (!t) return;

      if (t.name && teamNameInput) {
        teamNameInput.value = t.name;
        if (previewTitle) previewTitle.textContent = t.name;
      }
      if (t.elevatorPitch && elevatorPitchInput) {
        elevatorPitchInput.value = t.elevatorPitch;
        if (previewTagline) previewTagline.textContent = t.elevatorPitch;
      }
      if (t.description && projectDescInput) {
        projectDescInput.value = t.description;
        if (charCounter) charCounter.textContent = `${t.description.length} / 500`;
      }
      if (t.location && locationInput) {
        locationInput.value = t.location;
        if (previewLocation) previewLocation.textContent = t.location;
      }
      if (t.dates && dateInput) {
        dateInput.value = t.dates;
        if (previewDate) previewDate.textContent = t.dates;
      }
      if (typeof t.recruitmentOpen === 'boolean' && joinRequestsToggle) {
        joinRequestsToggle.checked = t.recruitmentOpen;
      }
      if (Array.isArray(t.skillsRequired) && t.skillsRequired.length > 0 && skillsContainer && btnAddSkill) {
        const existingTags = skillsContainer.querySelectorAll('.tb-skill-tag');
        existingTags.forEach(tag => tag.remove());
        t.skillsRequired.forEach(skill => {
          const newTag = document.createElement('span');
          newTag.className = 'tb-skill-tag';
          newTag.setAttribute('data-skill', skill);
          newTag.innerHTML = `${skill} <span class="tb-tag-remove" role="button" aria-label="Remove ${skill}">✕</span>`;
          skillsContainer.insertBefore(newTag, btnAddSkill);
        });
        updateTagCount();
      }
      if (parsed.status === 'CONFIRMED' && autosaveText && autosaveDot) {
        autosaveDot.style.background = '#10b981';
        let teamsCount = 1;
        try {
          const stored = JSON.parse(localStorage.getItem('crewlyy_teams') || '[]');
          if (Array.isArray(stored) && stored.length > 0) teamsCount = stored.length;
        } catch(e) {}
        autosaveText.textContent = `Saved to teams.json (${teamsCount} ${teamsCount === 1 ? 'team' : 'teams'})`;
      }
    } catch (err) {
      console.warn('Failed to load saved formation from localStorage:', err);
    }
  }

  loadSavedFormation();
});
