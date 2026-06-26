/* ========================================
   RIZWAN PASHA – JavaScript
======================================== */

(function () {
  "use strict";

  // ─── NAVBAR SCROLL ───────────────────────────────────
  const navbar = document.getElementById("navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  function onScroll() {
    // Sticky nav style
    if (window.scrollY > 60) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Active nav link highlight
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });

    // Back to top
    const backToTop = document.getElementById("backToTop");
    if (window.scrollY > 400) {
      backToTop.classList.add("visible");
    } else {
      backToTop.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  // ─── HAMBURGER MENU ──────────────────────────────────
  const hamburger = document.getElementById("hamburger");
  const navLinksContainer = document.getElementById("navLinks");

  hamburger.addEventListener("click", () => {
    navLinksContainer.classList.toggle("open");
    hamburger.classList.toggle("active");
  });

  // Close menu on link click
  navLinksContainer.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinksContainer.classList.remove("open");
      hamburger.classList.remove("active");
    });
  });

  // ─── BACK TO TOP ─────────────────────────────────────
  document.getElementById("backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ─── SCROLL REVEAL ───────────────────────────────────
  const revealElements = document.querySelectorAll(
    ".service-card, .why-card, .review-card, .process-step, .about-content, .about-image-wrapper, .contact-info-card, .contact-form-col, .section-header"
  );

  revealElements.forEach((el) => el.classList.add("reveal"));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // ─── SKILL BAR ANIMATION ─────────────────────────────
  const skillFills = document.querySelectorAll(".skill-fill");
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          skillObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );
  skillFills.forEach((fill) => skillObserver.observe(fill));

  // ─── FLOATING PARTICLES ──────────────────────────────
  function createParticles() {
    const container = document.getElementById("particles");
    if (!container) return;
    const count = window.innerWidth < 600 ? 15 : 30;

    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.classList.add("particle");
      const size = Math.random() * 4 + 1;
      p.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${Math.random() * 100}%;
        bottom: -10px;
        animation-duration: ${Math.random() * 15 + 10}s;
        animation-delay: ${Math.random() * 8}s;
        opacity: ${Math.random() * 0.5 + 0.1};
      `;
      container.appendChild(p);
    }
  }

  createParticles();

  // ─── COUNTER ANIMATION ───────────────────────────────
  function animateCounter(el, target, suffix) {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        start = target;
        clearInterval(timer);
      }
      el.textContent = Math.round(start) + suffix;
    }, 16);
  }

  const statNumbers = document.querySelectorAll(".stat-number");
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const text = el.textContent;
          if (text.includes("500")) animateCounter(el, 500, "+");
          else if (text.includes("5")) animateCounter(el, 5, "★");
          else if (text.includes("24")) { el.textContent = "24hr"; }
          statsObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );
  statNumbers.forEach((n) => statsObserver.observe(n));

  // ─── CONTACT FORM ────────────────────────────────────
  const form = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = form.querySelector("#fname").value.trim();
      const phone = form.querySelector("#fphone").value.trim();
      const device = form.querySelector("#fdevice").value;
      const service = form.querySelector("#fservice").value;
      const message = form.querySelector("#fmessage").value.trim();

      if (!name || !phone) {
        alert("Please fill in your name and phone number.");
        return;
      }

      // Build WhatsApp message
      const wa = `Hi Rizwan bhai!%0A%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0ADevice: ${encodeURIComponent(device || "Not specified")}%0AService: ${encodeURIComponent(service || "Not specified")}%0AProblem: ${encodeURIComponent(message || "Will discuss on call")}%0A%0ASent from your website.`;

      // Show success message
      formSuccess.style.display = "block";
      form.reset();

      // Open WhatsApp after short delay
      setTimeout(() => {
        window.open(`https://wa.me/917013645643?text=${wa}`, "_blank");
      }, 800);

      setTimeout(() => {
        formSuccess.style.display = "none";
      }, 5000);
    });
  }

  // ─── SMOOTH ANCHOR SCROLLING ─────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        const navH = navbar.offsetHeight + 20;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navH;
        window.scrollTo({ top: targetPos, behavior: "smooth" });
      }
    });
  });

  // ─── SERVICE CARD HOVER GLOW ─────────────────────────
  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(0,212,255,0.08) 0%, rgba(13,22,48,0.7) 60%)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.background = "";
    });
  });

  // ─── TYPING EFFECT FOR HERO SUBTITLE ─────────────────
  const heroSub = document.querySelector(".hero-subtitle");
  if (heroSub) {
    const fullText = heroSub.textContent;
    heroSub.textContent = "";
    let i = 0;
    const type = () => {
      if (i < fullText.length) {
        heroSub.textContent += fullText[i];
        i++;
        setTimeout(type, 28);
      }
    };
    setTimeout(type, 1000);
  }

  // ─── PAGE LOAD ANIMATION ─────────────────────────────
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";
  window.addEventListener("load", () => {
    document.body.style.opacity = "1";
  });

  // ─── PHOTO SLIDER (ABOUT SECTION) ───────────────────
  (function initSlider() {
    const slides = document.querySelectorAll(".slider-img");
    const dots   = document.querySelectorAll(".slider-dot");
    const slider = document.getElementById("aboutSlider");
    if (!slides.length) return;

    let current = 0;
    let autoPlay;

    function goTo(index) {
      slides[current].classList.remove("active");
      dots[current].classList.remove("active");
      current = (index + slides.length) % slides.length;
      slides[current].classList.add("active");
      dots[current].classList.add("active");
    }

    function startAuto() {
      autoPlay = setInterval(() => goTo(current + 1), 3500);
    }

    function stopAuto() {
      clearInterval(autoPlay);
    }

    // Dot click
    dots.forEach((dot, i) => {
      dot.addEventListener("click", (e) => {
        e.stopPropagation();
        stopAuto();
        goTo(i);
        startAuto();
      });
    });

    // Click slider to advance
    if (slider) {
      slider.addEventListener("click", () => {
        stopAuto();
        goTo(current + 1);
        startAuto();
      });
    }

    startAuto();
  })();

  // Init scroll state
  onScroll();

})();
