/**
 * FILE: script.js
 * DESKRIPSI: JavaScript untuk website Syamsinar CCTV
 */

// DOM Content Loaded
document.addEventListener("DOMContentLoaded", function () {
  // Initialize Feather Icons
  feather.replace();

  // ===== MOBILE NAVIGATION TOGGLE =====
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // ===== HERO SLIDER =====
  let slideIndex = 0;
  const slides = document.getElementsByClassName("slides");

  function showSlides() {
    for (let i = 0; i < slides.length; i++) {
      slides[i].classList.remove("active");
    }

    slideIndex++;
    if (slideIndex > slides.length) {
      slideIndex = 1;
    }

    slides[slideIndex - 1].classList.add("active");
    setTimeout(showSlides, 4000);
  }

  // Mulai slider
  if (slides.length > 0) {
    showSlides();
  }

  // ===== CLOSE MOBILE MENU WHEN CLICKING LINKS =====
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // ===== HEADER SCROLL EFFECT =====
  const header = document.querySelector("header");
  const backToTop = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
      backToTop.classList.add("active");
    } else {
      header.classList.remove("scrolled");
      backToTop.classList.remove("active");
    }
  });

  // ===== SMOOTH SCROLLING =====
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");

      if (targetId === "#") return;

      e.preventDefault();
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // ===== SCROLL DOWN INDICATOR =====
  const scrollDown = document.querySelector(".scroll-down");
  if (scrollDown) {
    scrollDown.addEventListener("click", function () {
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    });
  }

  // ===== TOAST NOTIFICATION =====
  function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  // ===== SEND EMAIL FUNCTION =====
  document.getElementById("sendEmail").addEventListener("click", function () {
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let message = document.getElementById("message").value;

    if (!name || !email || !phone || !message) {
      showToast("Harap lengkapi semua field!");
      return;
    }

    let mailtoLink =
      "mailto:mutmutmainna1502@gmail.com?subject=Pesan dari " +
      encodeURIComponent(name) +
      "&body=" +
      encodeURIComponent(
        `Nama: ${name}\nEmail: ${email}\nTelepon: ${phone}\n\nPesan:\n${message}`
      );

    window.location.href = mailtoLink;
    showToast("Mengalihkan ke Email...");
  });

  // ===== SEND WHATSAPP FUNCTION =====
  document
    .getElementById("sendWhatsapp")
    .addEventListener("click", function () {
      let name = document.getElementById("name").value;
      let email = document.getElementById("email").value;
      let phone = document.getElementById("phone").value;
      let message = document.getElementById("message").value;

      if (!name || !email || !phone || !message) {
        showToast("Harap lengkapi semua field!");
        return;
      }

      let whatsappNumber = "6285143976400";
      let whatsappUrl =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(
          `Halo Admin Syamsinar CCTV, Nama: ${name} Email: ${email} Telepon: ${phone} Pesan: ${message}`
        );

      window.open(whatsappUrl, "_blank");
      showToast("Mengalihkan ke WhatsApp...");
    });

  // ===== ACTIVE NAV LINK ON SCROLL =====
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.clientHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        currentSection = "#" + section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === currentSection) {
        link.classList.add("active");
      }
    });
  }

  // ===== SCROLL ANIMATIONS =====
  function checkScroll() {
    const elements = document.querySelectorAll(
      ".service-card, .product-card, .about-content, .contact-content, .contact-card, .social-card, .advantage-card"
    );

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementTop < windowHeight - 100) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Set initial state untuk animasi
  document
    .querySelectorAll(
      ".service-card, .product-card, .about-content, .contact-content, .contact-card, .social-card, .advantage-card"
    )
    .forEach((element) => {
      element.style.opacity = "0";
      element.style.transform = "translateY(20px)";
      element.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    });

  // ===== FORM VALIDATION =====
  const phoneInput = document.getElementById("phone");

  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      this.value = this.value.replace(/[^0-9+\-\s()]/g, "");
    });
  }

  // ===== RIPPLE EFFECT FOR BUTTONS =====
  document.querySelectorAll(".btn").forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
      `;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // ===== TYPING EFFECT FOR HERO TEXT (Optional) =====
  function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.innerHTML = "";

    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }

    type();
  }

  // Uncomment untuk mengaktifkan efek mengetik di hero
  /*
  const heroTitle = document.querySelector('.hero-content h1');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = "";
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 50);
    }, 500);
  }
  */

  // ===== PARALLAX EFFECT =====
  window.addEventListener("scroll", function () {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll(".parallax");

    parallaxElements.forEach((element) => {
      const speed = element.getAttribute("data-speed") || 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });

  // ===== INITIALIZE FUNCTIONS =====
  window.addEventListener("scroll", function () {
    updateActiveNavLink();
    checkScroll();
  });

  window.addEventListener("load", function () {
    updateActiveNavLink();
    checkScroll();

    // Add CSS for ripple animation
    const style = document.createElement("style");
    style.textContent = `
      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  });

  // Initialize checkScroll on load
  checkScroll();

  // ===== COUNTER ANIMATION (Optional) =====
  // Uncomment untuk menambahkan counter animasi
  /*
  function startCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const count = +counter.innerText;
      const increment = target / speed;
      
      if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => startCounterAnimation(), 1);
      } else {
        counter.innerText = target;
      }
    });
  }
  
  // Panggil fungsi saat section keunggulan masuk viewport
  const observerOptions = {
    threshold: 0.5
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounterAnimation();
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  const advantagesSection = document.querySelector('.advantages');
  if (advantagesSection) {
    observer.observe(advantagesSection);
  }
  */
});
