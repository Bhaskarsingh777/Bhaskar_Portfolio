document.addEventListener("DOMContentLoaded", function () {

  /* ================= TYPEWRITER ================= */
  const texts = [
    "Passionate Full Stack Developer skilled in HTML, CSS, JavaScript, " +
    "React.js and Python. " +
    "I build responsive, user-friendly and performance-focused web " +
    "applications."
  ];

  let i = 0;
  let j = 0;
  let isDeleting = false;

  function typeEffect() {
    const el = document.getElementById("typing");
    if (!el) return;

    const currentText = texts[i];

    if (!isDeleting) {
      j++;
      el.textContent = currentText.substring(0, j);

      if (j === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1200);
        return;
      }
    } else {
      j--;
      el.textContent = currentText.substring(0, j);

      if (j === 0) {
        isDeleting = false;
        i = (i + 1) % texts.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? 50 : 80);
  }

  typeEffect();


  /* ================= SMOOTH SCROLL ================= */
  document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute("href"));

      if (target) {
        target.scrollIntoView({
          behavior: "smooth"
        });
      }

      // CLOSE MOBILE NAV AFTER CLICK (IMPORTANT FIX)
      const nav = document.getElementById("nav");
      if (nav) nav.classList.remove("show");
    });
  });


  /* ================= ACTIVE NAV HIGHLIGHT ================= */
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;

      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });


  /* ================= NAVBAR TOGGLE (MOBILE FIX) ================= */
  const toggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }


  /* ================= EMAILJS CONTACT FORM ================= */
  if (typeof emailjs !== "undefined") {
    emailjs.init("CBcKaDHcfsi98VWAk"); // replace if needed
  }

  const form = document.querySelector("form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const btn = form.querySelector("button");
      const originalText = btn.textContent;

      btn.textContent = "Sending...";
      btn.disabled = true;

      emailjs.sendForm(
        "service_a4k1qre",
        "template_xkefe9g",
        this
      )
        .then(() => {
          btn.textContent = "Message Sent ✔";
          btn.style.background = "#22c55e";

          setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
            form.reset();
          }, 2000);
        })
        .catch((error) => {
          console.log("EmailJS Error:", error);

          btn.textContent = "Failed ❌";
          btn.style.background = "#ef4444";

          setTimeout(() => {
            btn.textContent = originalText;
            btn.disabled = false;
          }, 2000);
        });

    });
  }

});