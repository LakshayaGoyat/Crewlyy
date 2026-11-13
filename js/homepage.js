document.addEventListener("DOMContentLoaded", () => {
  // 1. Sign In Button Redirect
  const signInBtn = document.getElementById("create-team-btn");
  if (signInBtn) {
    signInBtn.addEventListener("click", () => {
      window.location.href = "login.html";
    });
  }

  // 2. Notification Bell Click
  const notifBtn = document.getElementById("notif-btn");
  if (notifBtn) {
    notifBtn.addEventListener("click", () => {
      const dot = notifBtn.querySelector(".tb-notif-dot");
      if (dot) dot.style.display = "none";
      alert("No new notifications right now.");
    });
  }

  // 3. Smooth Scroll for Anchor Links (#features)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // 4. Animate Metric Counters on Scroll
  const counters = document.querySelectorAll(".counter");
  const speed = 100;

  const animateCounters = () => {
    counters.forEach((counter) => {
      const updateCount = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed);

        if (count < target) {
          counter.innerText = Math.min(count + increment, target);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };

  const metricsGrid = document.querySelector(".metrics-grid");
  if (metricsGrid && counters.length > 0) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounters();
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(metricsGrid);
  }
});