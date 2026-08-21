import gsap from "gsap";

export function initialFX() {
  document.body.style.overflowY = "auto";
  document.getElementsByTagName("main")[0]?.classList.add("main-active");

  // Fade in nav and social icons
  gsap.fromTo(
    [".navbar", ".icons-section", ".nav-fade"],
    { opacity: 0 },
    { opacity: 1, duration: 1, ease: "power2.out", delay: 0.5 }
  );
}