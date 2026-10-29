/**
 * CREWLYY — Global Navbar Interactions
 * Handles search focus shortcut (Cmd/Ctrl + K), notification clicks,
 * and user profile redirection to profile.html
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Profile Redirection
  const profileMenu = document.getElementById('user-profile-menu');
  if (profileMenu) {
    profileMenu.addEventListener('click', () => {
      window.location.href = 'profile.html';
    });

    profileMenu.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        window.location.href = 'profile.html';
      }
    });
  }

  // 2. Global Search Shortcut (Cmd+K / Ctrl+K)
  const searchInput = document.getElementById('global-search') || document.getElementById('header-search-input');
  window.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (searchInput) {
        searchInput.focus();
        searchInput.select();
      }
    }
  });

  // 3. Notification Button Interaction
  const notifBtn = document.getElementById('notif-btn');
  if (notifBtn) {
    notifBtn.addEventListener('click', () => {
      const dot = notifBtn.querySelector('.tb-notif-dot, .notification-dot');
      if (dot) dot.style.display = 'none';
      alert('You have 2 notifications:\n• Jordan Chen joined your squad "Pixel Pioneers"\n• Hackathon kickoff starts in 3 days');
    });
  }
});
