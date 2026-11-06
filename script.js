// Small progressive enhancement: reveal subtle motion only when requested.
document.documentElement.classList.add("js");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealables = document.querySelectorAll(".section, .venture-card");

if (reduceMotion || !("IntersectionObserver" in window)) {
  revealables.forEach((node) => node.classList.add("in-view"));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealables.forEach((node) => observer.observe(node));
}

const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".site-header nav a");

if ("IntersectionObserver" in window) {
  const activeSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navigationLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${entry.target.id}`;
        link.toggleAttribute("aria-current", isCurrent);
      });
    });
  }, { rootMargin: "-30% 0px -60% 0px" });
  sections.forEach((section) => activeSectionObserver.observe(section));
}