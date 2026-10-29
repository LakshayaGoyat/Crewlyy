/**
 * CREWLYY — Explore Teams Client Script
 * Matches Figma Specification
 */

(function () {
  'use strict';

  // Constants & Data
  const PAGE_SIZE = 4;
  const TOTAL_ACTIVE_DISPLAY = 38;

  const ROLES = [
    {
      id: "Frontend",
      label: "Frontend",
      count: "24 drafts",
      iconSvg: `<svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`
    },
    {
      id: "Backend",
      label: "Backend",
      count: "18 drafts",
      iconSvg: `<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>`
    },
    {
      id: "UI/UX Design",
      label: "UI/UX Design",
      count: "15 drafts",
      iconSvg: `<svg viewBox="0 0 24 24"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>`
    },
    {
      id: "AI / LLM Ops",
      label: "AI / LLM Ops",
      count: "29 drafts",
      iconSvg: `<svg viewBox="0 0 24 24"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path></svg>`
    },
    {
      id: "Web3 / Smart Contracts",
      label: "Web3 / Smart Contracts",
      count: "12 drafts",
      iconSvg: `<svg viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>`
    },
    {
      id: "Product",
      label: "Product",
      count: "9 drafts",
      iconSvg: `<svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`
    }
  ];

  const SQUADS = [
    {
      id: "ecotrack",
      name: "EcoTrack",
      hackathon: "GreenTech Hack 2026",
      spots: 3,
      spotLabel: "3 SPOTS LEFT",
      spotClass: "spots-blue",
      description: "A gamified carbon footprint offset tracker utilizing real-time IoT smart meter telemetry and verified green validator nodes.",
      metricKicker: "PROJECTED TELEMETRY",
      metricValue: "94.2%",
      metricUnit: "Synced",
      metricType: "sparkline",
      crewCount: "+1",
      stack: ["Node.js", "React Native", "Pitch / Deck"],
      highlightStack: "Pitch / Deck",
      roles: ["Frontend", "Backend", "Product"],
      experience: "intermediate",
      created: 10
    },
    {
      id: "bytecraft",
      name: "ByteCraft",
      hackathon: "Figma DevFest 2026",
      spots: 2,
      spotLabel: "2 SPOTS LEFT",
      spotClass: "spots-indigo",
      description: "Collaborative canvas editor optimized for ultra low-latency design handoffs, compiling Figma nodes directly into production Tailwind code.",
      metricKicker: "ENGINE TARGET",
      metricValue: "60 FPS",
      metricUnit: "Canvas",
      metricType: "pill",
      metricPill: "14ms RTT",
      metricIcon: "gauge",
      crewCount: "+1",
      stack: ["Wasm", "TypeScript", "Prod Mgmt"],
      highlightStack: "Prod Mgmt",
      roles: ["Frontend", "UI/UX Design"],
      experience: "advanced",
      created: 9
    },
    {
      id: "scribedoc",
      name: "ScribeDoc",
      hackathon: "HealthHacks 2026",
      spots: 1,
      spotLabel: "1 SPOT LEFT",
      spotClass: "spots-red",
      description: "Automated medical transcription platform with clinical action-item parsing, HIPAA-compliant on-device vector storage, and instant EHR export.",
      metricKicker: "ACCURACY SPRINT",
      metricValue: "99.4%",
      metricUnit: "WER",
      metricType: "pill",
      metricPill: "HIPAA Ready",
      crewCount: "+1",
      stack: ["Python", "FastAPI", "UI/UX Design"],
      highlightStack: "UI/UX Design",
      roles: ["Frontend", "AI / LLM Ops", "Backend"],
      experience: "advanced",
      created: 8
    },
    {
      id: "quasar",
      name: "Quasar Game Studio",
      hackathon: "Web3 Play Arena",
      spots: 1,
      spotLabel: "1 SPOT LEFT",
      spotClass: "spots-red",
      description: "Multiplayer cosmic space arena game built with custom deterministic physics, zero-server trust, and browser-native WebGL / WebGPU shading.",
      metricKicker: "PHYSICS CORE",
      metricValue: "120 Hz",
      metricUnit: "Tick",
      metricType: "pill",
      metricPill: "Demo Playable",
      metricIcon: "gamepad",
      crewCount: "+1",
      stack: ["C++", "WebGL", "Rust"],
      highlightStack: "Rust",
      roles: ["Frontend", "Web3 / Smart Contracts"],
      experience: "intermediate",
      created: 7
    },
    {
      id: "neuralforge",
      name: "NeuralForge",
      hackathon: "EthGlobal 2026",
      spots: 2,
      spotLabel: "2 SPOTS LEFT",
      spotClass: "spots-indigo",
      description: "On-device inference mesh that shards open-weight models across a squad laptop cluster with cryptographic job receipts.",
      metricKicker: "INFERENCE ENGINE",
      metricValue: "12 ms",
      metricUnit: "P50",
      metricType: "pill",
      metricPill: "WASM Node",
      crewCount: "+2",
      stack: ["Rust", "Wasm", "Python"],
      highlightStack: "Python",
      roles: ["Backend", "AI / LLM Ops"],
      experience: "advanced",
      created: 6
    },
    {
      id: "greenledger",
      name: "GreenLedger",
      hackathon: "GreenTech Hack",
      spots: 3,
      spotLabel: "3 SPOTS LEFT",
      spotClass: "spots-blue",
      description: "Public goods ledger for verified carbon credits, with zk attestations from municipal sensors and community validators.",
      metricKicker: "VERIFICATION CORE",
      metricValue: "zk-SNARK",
      metricUnit: "Attest",
      metricType: "pill",
      metricPill: "Gas Optimized",
      crewCount: "+1",
      stack: ["Solidity", "Circom", "Next.js"],
      highlightStack: "Circom",
      roles: ["Web3 / Smart Contracts", "Backend"],
      experience: "beginner",
      created: 5
    },
    {
      id: "orbitops",
      name: "OrbitOps",
      hackathon: "SaaS DevSprint",
      spots: 2,
      spotLabel: "2 SPOTS LEFT",
      spotClass: "spots-indigo",
      description: "Mission-control dashboard for DAO contributor routing, pairing open bounties with verified skill graphs in real time.",
      metricKicker: "ROUTING LATENCY",
      metricValue: "98.8%",
      metricUnit: "Precision",
      metricType: "pill",
      metricPill: "Instant Match",
      crewCount: "+3",
      stack: ["Go", "React", "GraphQL"],
      highlightStack: "GraphQL",
      roles: ["Product", "Frontend", "UI/UX Design"],
      experience: "intermediate",
      created: 4
    },
    {
      id: "pulsekit",
      name: "PulseKit",
      hackathon: "HealthHacks 2026",
      spots: 1,
      spotLabel: "1 SPOT LEFT",
      spotClass: "spots-red",
      description: "Wearable telemetry kit that streams athlete vitals into a privacy-preserving coach copilot during live events.",
      metricKicker: "TELEMETRY EDGE",
      metricValue: "4.2 ms",
      metricUnit: "Stream",
      metricType: "pill",
      metricPill: "HIPAA Compliant",
      crewCount: "+2",
      stack: ["Swift", "Node.js", "Postgres"],
      highlightStack: "Postgres",
      roles: ["Frontend", "Product"],
      experience: "beginner",
      created: 3
    }
  ];

  // State Management
  const state = {
    selectedRole: "Frontend", // Frontend active as shown in Figma
    query: "",
    spots: [],
    hackathons: [],
    experience: "all",
    sort: "recent",
    page: 1
  };

  // DOM Elements cache
  const dom = {};

  function initDomElements() {
    dom.rolesContainer = document.getElementById("roles-container");
    dom.squadsGrid = document.getElementById("squads-grid");
    dom.readyCountBadge = document.getElementById("ready-count-badge");
    dom.paginationStatus = document.getElementById("pagination-status");
    dom.paginationControls = document.getElementById("pagination-controls");
    dom.sortSelect = document.getElementById("sort-select");
    dom.heroSearchInput = document.getElementById("hero-search-input");
    dom.headerSearchInput = document.getElementById("header-search-input");
    dom.heroSearchForm = document.getElementById("hero-search-form");
    dom.resetFiltersBtn = document.getElementById("reset-filters-btn");
    dom.filtersSidebar = document.getElementById("filters-sidebar");
    dom.toast = document.getElementById("toast-notification");
    dom.toastText = document.getElementById("toast-text");
    dom.modalOverlay = document.getElementById("modal-overlay");
    dom.modalTitle = document.getElementById("modal-title");
    dom.modalKicker = document.getElementById("modal-kicker");
    dom.modalBody = document.getElementById("modal-body");
    dom.modalForm = document.getElementById("modal-form");
  }

  // Filter Logic
  function getFilteredSquads() {
    const q = state.query.trim().toLowerCase();

    return SQUADS.filter((squad) => {
      // Role matching (if a specific role is selected)
      const matchesRole =
        !state.selectedRole ||
        state.selectedRole === "all" ||
        squad.roles.includes(state.selectedRole);

      // Search query matching
      const matchesQuery =
        !q ||
        squad.name.toLowerCase().includes(q) ||
        squad.hackathon.toLowerCase().includes(q) ||
        squad.description.toLowerCase().includes(q) ||
        squad.stack.some((tech) => tech.toLowerCase().includes(q));

      // Spots Available matching
      let matchesSpots = true;
      if (state.spots.length > 0) {
        matchesSpots = state.spots.some((spotVal) => {
          if (spotVal === "1") return squad.spots === 1;
          if (spotVal === "2") return squad.spots === 2;
          if (spotVal === "3+") return squad.spots >= 3;
          return false;
        });
      }

      // Hackathon matching
      let matchesHackathon = true;
      if (state.hackathons.length > 0) {
        matchesHackathon = state.hackathons.some((h) => {
          const lowerH = h.toLowerCase().replace(/[\s-]/g, "");
          const squadH = squad.hackathon.toLowerCase().replace(/[\s-]/g, "");
          return squadH.includes(lowerH) || lowerH.includes(squadH);
        });
      }

      // Experience matching
      let matchesExp = true;
      if (state.experience !== "all") {
        matchesExp = squad.experience === state.experience;
      }

      return matchesRole && matchesQuery && matchesSpots && matchesHackathon && matchesExp;
    }).sort((a, b) => {
      if (state.sort === "name") return a.name.localeCompare(b.name);
      if (state.sort === "spots") return a.spots - b.spots;
      return b.created - a.created; // 'recent'
    });
  }

  // Render Role Pills
  function renderRolePills() {
    if (!dom.rolesContainer) return;

    dom.rolesContainer.innerHTML = ROLES.map((role) => {
      const isActive = state.selectedRole === role.id;
      return `
        <button type="button" class="role-pill ${isActive ? "is-active" : ""}" data-role-id="${role.id}">
          ${role.iconSvg}
          <span>${role.label}</span>
          <span class="draft-badge">${role.count}</span>
        </button>
      `;
    }).join("");
  }

  // Render Single Squad Card
  function renderSquadCard(squad) {
    let metricRightHtml = "";

    if (squad.metricType === "sparkline") {
      metricRightHtml = `
        <svg class="sparkline-svg" viewBox="0 0 90 28" aria-hidden="true">
          <path class="sparkline-path" d="M 4,18 Q 24,2 45,14 T 86,6" />
        </svg>
      `;
    } else if (squad.metricType === "pill") {
      let icon = "";
      if (squad.metricIcon === "gauge") {
        icon = `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><polyline points="12 7 12 12 15 15"></polyline></svg>`;
      } else if (squad.metricIcon === "gamepad") {
        icon = `<svg viewBox="0 0 24 24"><rect x="2" y="6" width="20" height="12" rx="6"></rect><line x1="6" y1="12" x2="10" y2="12"></line><line x1="8" y1="10" x2="8" y2="14"></line><circle cx="16" cy="10" r="1"></circle><circle cx="18" cy="12" r="1"></circle></svg>`;
      }
      metricRightHtml = `
        <span class="metric-pill-badge">
          ${icon}
          ${squad.metricPill}
        </span>
      `;
    }

    const stackTagsHtml = squad.stack.map((tech) => {
      const isHighlighted = tech === squad.highlightStack;
      return `<span class="stack-tag ${isHighlighted ? "is-highlighted" : ""}">${tech}</span>`;
    }).join("");

    return `
      <article class="squad-card" data-squad-id="${squad.id}">
        <div class="card-top-row">
          <div class="card-title-group">
            <h3>${squad.name}</h3>
            <div class="card-hackathon-name">${squad.hackathon}</div>
          </div>
          <span class="card-spot-badge ${squad.spotClass}">${squad.spotLabel}</span>
        </div>

        <p class="card-description">${squad.description}</p>

        <div class="card-metric-box">
          <div class="metric-left">
            <span class="metric-label-kicker">${squad.metricKicker}</span>
            <div class="metric-highlight-value">${squad.metricValue} <span>${squad.metricUnit}</span></div>
          </div>
          <div class="metric-right">
            ${metricRightHtml}
          </div>
        </div>

        <div class="card-meta-row">
          <div class="meta-col-crew">
            <span class="meta-kicker">Current Crew</span>
            <div class="crew-avatars">
              <span class="crew-avatar-chip">${squad.crewCount}</span>
            </div>
          </div>
          <div class="meta-col-stack">
            <span class="meta-kicker">Target Stack</span>
            <div class="target-stack-tags">
              ${stackTagsHtml}
            </div>
          </div>
        </div>

        <div class="card-actions-row">
          <button type="button" class="btn-view-idea" data-action="view-idea" data-id="${squad.id}">View Idea</button>
          <button type="button" class="btn-request-join" data-action="request-join" data-id="${squad.id}">Request to Join</button>
        </div>
      </article>
    `;
  }

  // Render Pagination Controls
  function renderPagination(totalMatches, pageCount) {
    if (!dom.paginationControls || !dom.paginationStatus) return;

    dom.paginationStatus.textContent = `Showing ${totalMatches ? (state.page - 1) * PAGE_SIZE + 1 : 0}-${Math.min(state.page * PAGE_SIZE, totalMatches)} of ${TOTAL_ACTIVE_DISPLAY} active squads`;

    if (pageCount <= 1) {
      dom.paginationControls.innerHTML = "";
      return;
    }

    let buttonsHtml = `
      <button type="button" class="btn-page-step" data-page="${Math.max(1, state.page - 1)}" ${state.page === 1 ? 'disabled' : ''}>Previous</button>
    `;

    for (let i = 1; i <= pageCount; i++) {
      buttonsHtml += `
        <button type="button" class="btn-page-num ${i === state.page ? 'is-active' : ''}" data-page="${i}">${i}</button>
      `;
    }

    buttonsHtml += `
      <button type="button" class="btn-page-step" data-page="${Math.min(pageCount, state.page + 1)}" ${state.page === pageCount ? 'disabled' : ''}>Next</button>
    `;

    dom.paginationControls.innerHTML = buttonsHtml;
  }

  // Render Full Squad Grid
  function renderSquads() {
    const matches = getFilteredSquads();
    const pageCount = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
    if (state.page > pageCount) state.page = pageCount;

    if (dom.readyCountBadge) {
      dom.readyCountBadge.textContent = `${matches.length} SQUADS READY TO DEPLOY`;
    }

    if (matches.length === 0) {
      dom.squadsGrid.innerHTML = `
        <div class="empty-results-box">
          <h4>No matching squads found</h4>
          <p>Try adjusting your search criteria, clearing filter constraints, or selecting another role category.</p>
        </div>
      `;
      renderPagination(0, 0);
      return;
    }

    const startIndex = (state.page - 1) * PAGE_SIZE;
    const pageSquads = matches.slice(startIndex, startIndex + PAGE_SIZE);

    dom.squadsGrid.innerHTML = pageSquads.map(renderSquadCard).join("");
    renderPagination(matches.length, pageCount);
  }

  // Toast Notification
  let toastTimer = null;
  function showToast(message) {
    if (!dom.toast) return;
    dom.toastText.textContent = message;
    dom.toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      dom.toast.classList.remove("is-visible");
    }, 2800);
  }

  // Modal Handling
  function openModal(title, kicker, bodyHtml, submitText, onConfirm) {
    if (!dom.modalOverlay) return;
    dom.modalTitle.textContent = title;
    dom.modalKicker.textContent = kicker;
    dom.modalBody.innerHTML = bodyHtml;

    const submitBtn = dom.modalForm.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.textContent = submitText || "Confirm";
    }

    dom.modalForm.onsubmit = function (e) {
      e.preventDefault();
      if (onConfirm) onConfirm();
      closeModal();
    };

    dom.modalOverlay.classList.add("is-open");
  }

  function closeModal() {
    if (dom.modalOverlay) {
      dom.modalOverlay.classList.remove("is-open");
    }
  }

  // Reset Filters
  function resetAllFilters() {
    state.selectedRole = "Frontend";
    state.query = "";
    state.spots = [];
    state.hackathons = [];
    state.experience = "all";
    state.sort = "recent";
    state.page = 1;

    // Reset inputs
    if (dom.heroSearchInput) dom.heroSearchInput.value = "";
    if (dom.headerSearchInput) dom.headerSearchInput.value = "";
    if (dom.sortSelect) dom.sortSelect.value = "recent";

    if (dom.filtersSidebar) {
      dom.filtersSidebar.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
        cb.checked = false;
      });
      const allRadio = dom.filtersSidebar.querySelector('input[name="experience"][value="all"]');
      if (allRadio) allRadio.checked = true;
    }

    renderRolePills();
    renderSquads();
    showToast("All filters have been reset.");
  }

  // Event Listeners
  function attachEventListeners() {
    // Role pill clicks
    if (dom.rolesContainer) {
      dom.rolesContainer.addEventListener("click", (e) => {
        const pill = e.target.closest("[data-role-id]");
        if (!pill) return;
        const roleId = pill.dataset.roleId;
        state.selectedRole = roleId;
        state.page = 1;
        renderRolePills();
        renderSquads();
      });
    }

    // Filters sidebar changes (checkboxes & radios)
    if (dom.filtersSidebar) {
      dom.filtersSidebar.addEventListener("change", (e) => {
        const checkedSpots = [
          ...dom.filtersSidebar.querySelectorAll('input[name="spots"]:checked')
        ].map((i) => i.value);

        const checkedHackathons = [
          ...dom.filtersSidebar.querySelectorAll('input[name="hackathon"]:checked')
        ].map((i) => i.value);

        const checkedExp = dom.filtersSidebar.querySelector('input[name="experience"]:checked');

        state.spots = checkedSpots;
        state.hackathons = checkedHackathons;
        state.experience = checkedExp ? checkedExp.value : "all";
        state.page = 1;

        renderSquads();
      });
    }

    // Reset filters button
    if (dom.resetFiltersBtn) {
      dom.resetFiltersBtn.addEventListener("click", resetAllFilters);
    }

    // Search input sync
    function handleSearch(val) {
      state.query = val;
      state.page = 1;
      if (dom.heroSearchInput && dom.heroSearchInput.value !== val) {
        dom.heroSearchInput.value = val;
      }
      if (dom.headerSearchInput && dom.headerSearchInput.value !== val) {
        dom.headerSearchInput.value = val;
      }
      renderSquads();
    }

    if (dom.heroSearchInput) {
      dom.heroSearchInput.addEventListener("input", (e) => handleSearch(e.target.value));
    }

    if (dom.headerSearchInput) {
      dom.headerSearchInput.addEventListener("input", (e) => handleSearch(e.target.value));
    }

    if (dom.heroSearchForm) {
      dom.heroSearchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        handleSearch(dom.heroSearchInput ? dom.heroSearchInput.value : "");
        const target = document.getElementById("matching-squads-section");
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      });
    }

    // Sort dropdown
    if (dom.sortSelect) {
      dom.sortSelect.addEventListener("change", (e) => {
        state.sort = e.target.value;
        state.page = 1;
        renderSquads();
      });
    }

    // Pagination clicks
    if (dom.paginationControls) {
      dom.paginationControls.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-page]");
        if (!btn || btn.hasAttribute("disabled")) return;
        state.page = Number(btn.dataset.page);
        renderSquads();
        const section = document.getElementById("matching-squads-section");
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      });
    }

    // Card buttons: View Idea & Request to Join
    if (dom.squadsGrid) {
      dom.squadsGrid.addEventListener("click", (e) => {
        const actionBtn = e.target.closest("[data-action]");
        if (!actionBtn) return;
        const action = actionBtn.dataset.action;
        const squadId = actionBtn.dataset.id;
        const squad = SQUADS.find((s) => s.id === squadId);
        if (!squad) return;

        if (action === "request-join") {
          openModal(
            `Request to Join ${squad.name}`,
            "SQUAD SYNTHESIS DISPATCH",
            `
              <p>You are applying to join <strong>${squad.name}</strong> for <em>${squad.hackathon}</em>.</p>
              <div class="form-field" style="margin-top: 14px;">
                <label for="applicant-role">Select your primary role</label>
                <input type="text" id="applicant-role" value="Frontend Architect" required />
              </div>
              <div class="form-field">
                <label for="applicant-github">Portfolio / GitHub</label>
                <input type="url" id="applicant-github" placeholder="https://github.com/alexmorgan" required />
              </div>
              <div class="form-field">
                <label for="applicant-note">Brief Introduction & Pitch</label>
                <textarea id="applicant-note" rows="3" placeholder="How can you accelerate this squad's sprint velocity?"></textarea>
              </div>
            `,
            "Dispatch Request",
            () => {
              showToast(`Application successfully dispatched to ${squad.name}!`);
            }
          );
        } else if (action === "view-idea") {
          openModal(
            `${squad.name} — Architecture Brief`,
            "SPECIFICATION DOSSIER",
            `
              <p><strong>Hackathon:</strong> ${squad.hackathon}</p>
              <p style="margin: 8px 0;"><strong>Mission:</strong> ${squad.description}</p>
              <div style="background: rgba(5, 9, 23, 0.8); border: 1px solid rgba(255,255,255,0.06); padding: 12px; border-radius: 8px; margin: 12px 0;">
                <p style="font-size: 0.78rem; color: #38bdf8;"><strong>${squad.metricKicker}:</strong> ${squad.metricValue} ${squad.metricUnit}</p>
                <p style="font-size: 0.78rem; color: #94a3b8; margin-top: 4px;"><strong>Target Stack:</strong> ${squad.stack.join(" · ")}</p>
                <p style="font-size: 0.78rem; color: #94a3b8; margin-top: 4px;"><strong>Target Roles:</strong> ${squad.roles.join(", ")}</p>
              </div>
            `,
            "Close Brief",
            () => {}
          );
        }
      });
    }

    // Modal close button & backdrop
    const modalCloseBtn = document.getElementById("modal-close-btn");
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener("click", closeModal);
    }
    if (dom.modalOverlay) {
      dom.modalOverlay.addEventListener("click", (e) => {
        if (e.target === dom.modalOverlay) closeModal();
      });
    }

    // Create Team / Build Crew buttons
    document.querySelectorAll('[data-action="create-team"]').forEach((btn) => {
      btn.addEventListener("click", () => {
        openModal(
          "Draft a New Squad Matrix",
          "NEW COLLECTIVE INITIALIZATION",
          `
            <p>Assemble a dream team with targeted hacker roles and skill graph validation.</p>
            <div class="form-field" style="margin-top: 14px;">
              <label for="squad-name">Squad Name</label>
              <input type="text" id="squad-name" placeholder="e.g. ApexHyperloop" required />
            </div>
            <div class="form-field">
              <label for="squad-hackathon">Target Hackathon</label>
              <input type="text" id="squad-hackathon" placeholder="e.g. ETHGlobal 2026" required />
            </div>
            <div class="form-field">
              <label for="squad-roles">Needed Roles (comma-separated)</label>
              <input type="text" id="squad-roles" placeholder="UI/UX Design, Rust Systems, AI Ops" required />
            </div>
          `,
          "Initialize Squad",
          () => {
            showToast("Draft squad initialized! Ready for applicant routing.");
          }
        );
      });
    });

    // Keyboard shortcut Cmd+K / Ctrl+K
    window.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dom.headerSearchInput) {
          dom.headerSearchInput.focus();
        } else if (dom.heroSearchInput) {
          dom.heroSearchInput.focus();
        }
      }
      if (e.key === "Escape") {
        closeModal();
      }
    });

    // Notification bell click
    const notifBtn = document.getElementById("notif-btn");
    if (notifBtn) {
      notifBtn.addEventListener("click", () => {
        showToast("You have 1 pending squad review from EcoTrack.");
      });
    }

    // Sync / Load teams.json from file upload
    const btnImportTeams = document.getElementById("btn-import-teams");
    const importTeamsInput = document.getElementById("import-teams-input");
    if (btnImportTeams && importTeamsInput) {
      btnImportTeams.addEventListener("click", () => {
        importTeamsInput.click();
      });

      importTeamsInput.addEventListener("change", (e) => {
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const parsed = JSON.parse(event.target.result);
            const teams = Array.isArray(parsed) ? parsed : (parsed.teams || []);
            if (teams.length > 0) {
              try {
                localStorage.setItem('crewlyy_teams', JSON.stringify(teams, null, 2));
              } catch (err) {}
              mergeSquads(teams);
              showToast(`Synced ${teams.length} ${teams.length === 1 ? 'squad' : 'squads'} from ${file.name}!`);
            } else {
              showToast("No valid squad records found in the selected file.");
            }
          } catch (err) {
            showToast("Failed to parse JSON file: " + err.message);
          }
        };
        reader.readAsText(file);
        importTeamsInput.value = "";
      });
    }
  }

  // Normalize team data from teams.json / Team Builder into a Squad Matrix card object
  function normalizeTeamToSquad(t) {
    if (!t) return null;
    const name = t.name || (t.team && t.team.name) || 'Untitled Squad';
    const id = t.id || t.teamId || ('squad_' + name.toLowerCase().replace(/[^a-z0-9]+/g, '_'));
    const desc = t.description || (t.team && t.team.description) || t.elevatorPitch || (t.team && t.team.elevatorPitch) || 'New hackathon squad forming.';
    const dates = t.dates || (t.team && t.team.dates) || '';
    const hackathon = t.hackathon || (dates ? `Hackathon (${dates})` : 'GreenTech Hack 2026');
    const skills = Array.isArray(t.skillsRequired) ? t.skillsRequired : (t.team && Array.isArray(t.team.skillsRequired) ? t.team.skillsRequired : (t.stack || ['React', 'TypeScript']));
    const spots = typeof t.spots === 'number' ? t.spots : ((t.roster && t.roster.vacantSlots) || (t.team && t.team.roster && t.team.roster.vacantSlots) || 3);
    const spotClass = spots === 1 ? 'spots-red' : (spots === 2 ? 'spots-indigo' : 'spots-blue');
    const spotLabel = `${spots} ${spots === 1 ? 'SPOT' : 'SPOTS'} LEFT`;

    // Derive roles from skills
    let roles = t.roles;
    if (!roles || !Array.isArray(roles) || roles.length === 0) {
      roles = [];
      const joined = skills.join(' ').toLowerCase();
      if (joined.includes('react') || joined.includes('front') || joined.includes('vue') || joined.includes('ui') || joined.includes('html') || joined.includes('css')) roles.push('Frontend');
      if (joined.includes('node') || joined.includes('back') || joined.includes('python') || joined.includes('fastapi') || joined.includes('api') || joined.includes('sql')) roles.push('Backend');
      if (joined.includes('design') || joined.includes('figma') || joined.includes('ux')) roles.push('UI/UX Design');
      if (joined.includes('ai') || joined.includes('ml') || joined.includes('llm') || joined.includes('gpt') || joined.includes('vision')) roles.push('AI / LLM Ops');
      if (joined.includes('web3') || joined.includes('solidity') || joined.includes('crypto') || joined.includes('smart') || joined.includes('contract')) roles.push('Web3 / Smart Contracts');
      if (joined.includes('product') || joined.includes('pitch') || joined.includes('mgmt') || joined.includes('deck')) roles.push('Product');
      if (roles.length === 0) roles.push('Frontend', 'Product');
    }

    return {
      id: id,
      name: name,
      hackathon: hackathon,
      spots: spots,
      spotLabel: spotLabel,
      spotClass: spotClass,
      description: desc,
      metricKicker: t.metricKicker || "SQUAD EQUILIBRIUM",
      metricValue: t.metricValue || (t.roster && t.roster.equilibrium) || "48%",
      metricUnit: t.metricUnit || "Matrix",
      metricType: "pill",
      metricPill: t.recruitmentOpen !== false ? "Recruiting" : "Private",
      metricIcon: "gauge",
      crewCount: t.crewCount || "+2",
      stack: skills,
      highlightStack: t.highlightStack || skills[0] || "React",
      roles: Array.from(new Set(roles)),
      experience: t.experience || "intermediate",
      created: t.created || (t.confirmedAt ? new Date(t.confirmedAt).getTime() : Date.now()),
      pitch: t.elevatorPitch || (t.team && t.team.elevatorPitch) || desc,
      roster: t.roster || (t.team && t.team.roster) || null
    };
  }

  // Merge squad list into SQUADS array
  function mergeSquads(teamList) {
    if (!Array.isArray(teamList)) return;
    teamList.forEach((team) => {
      const squadObj = normalizeTeamToSquad(team);
      if (!squadObj) return;
      const existingIdx = SQUADS.findIndex(
        (s) => s.id === squadObj.id || s.name.toLowerCase() === squadObj.name.toLowerCase()
      );
      if (existingIdx >= 0) {
        SQUADS[existingIdx] = squadObj;
      } else {
        SQUADS.unshift(squadObj);
      }
    });
    renderSquads();
  }

  // Load custom teams from localStorage and teams.json
  function loadStoredSquads() {
    // 1. Instantly merge from localStorage so client navigation is immediate
    try {
      const stored = localStorage.getItem('crewlyy_teams');
      if (stored) {
        const parsed = JSON.parse(stored);
        const storedTeams = Array.isArray(parsed) ? parsed : (parsed.teams || []);
        mergeSquads(storedTeams);
      }
    } catch (e) {
      console.warn("Could not read crewlyy_teams from localStorage:", e);
    }

    // 2. Fetch teams.json file to keep sync with disk/server
    fetch('teams.json')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) {
          const fileTeams = Array.isArray(data) ? data : (data.teams || []);
          mergeSquads(fileTeams);
        }
      })
      .catch(() => {});
  }

  // Initialize
  document.addEventListener("DOMContentLoaded", () => {
    initDomElements();
    loadStoredSquads();
    renderRolePills();
    renderSquads();
    attachEventListeners();
  });
})();
