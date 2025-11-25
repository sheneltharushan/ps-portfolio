gsap.registerPlugin(ScrollTrigger);

/* ---------- Lenis smooth scroll ---------- */
const lenis = new Lenis({
  lerp: 0.12,
  smoothWheel: true,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// keep ScrollTrigger in sync with Lenis
lenis.on("scroll", () => {
  ScrollTrigger.update();
});

/* ---------- Hero intro / outro ---------- */
const heroTl = gsap
  .timeline({ paused: true })
  .fromTo(
    ".hero-line-1",
    { y: 40, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      ease: "power3.out",
    }
  )
  .fromTo(
    ".hero-line-2",
    { y: 70, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: "power3.out",
    },
    "-=0.15"
  );

ScrollTrigger.create({
  trigger: "#hero",
  start: "top 75%",
  end: "bottom 25%",
  onEnter: () => heroTl.play(),
  onEnterBack: () => heroTl.play(),
  onLeave: () => heroTl.reverse(),
  onLeaveBack: () => heroTl.reverse(),
});

/* ---------- Hero parallax ---------- */
gsap.to(".hero-title", {
  yPercent: -35,
  ease: "none",
  scrollTrigger: {
    trigger: "#hero",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});

/* ---------- Scroll indicator behaviour ---------- */
ScrollTrigger.create({
  trigger: "#hero",
  start: "top 90%",
  end: "bottom top",
  onEnter: () =>
    gsap.to("#scroll-indicator", {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    }),
  onEnterBack: () =>
    gsap.to("#scroll-indicator", {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out",
    }),
  onLeave: () =>
    gsap.to("#scroll-indicator", {
      opacity: 0,
      y: 10,
      duration: 0.3,
      ease: "power2.in",
    }),
  onLeaveBack: () =>
    gsap.to("#scroll-indicator", {
      opacity: 0,
      y: 10,
      duration: 0.3,
      ease: "power2.in",
    }),
});

/* ---------- Side nav expand / collapse ---------- */
const sideNav = document.querySelector("#side-nav");

if (sideNav) {
  const labels = sideNav.querySelectorAll(".nav-label");

  // starting state: collapsed
  gsap.set(sideNav, { width: 56 }); // Tailwind w-14 = 56px
  gsap.set(labels, { opacity: 0, x: -8 });

  const navTl = gsap
    .timeline({ paused: true })
    .to(sideNav, {
      width: 224, // Tailwind w-56 ≈ 224px
      duration: 0.35,
      ease: "power3.out",
    })
    .to(
      labels,
      {
        opacity: 1,
        x: 0,
        duration: 0.25,
        stagger: 0.03,
        ease: "power2.out",
      },
      "<0.05"
    );

  sideNav.addEventListener("mouseenter", () => navTl.play());
  sideNav.addEventListener("mouseleave", () => navTl.reverse());
}

/* ---------- Acknowledgment section fade-in ---------- */
const ackTl = gsap
  .timeline({ paused: true })
  .from(".ack-label", {
    y: 24,
    opacity: 0,
    duration: 0.6,
    ease: "power3.out",
  })
  .from(
    ".ack-para-main",
    {
      y: 28,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    },
    "-=0.3"
  )
  .from(
    ".ack-para-lecturers",
    {
      y: 28,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    },
    "-=0.35"
  );

ScrollTrigger.create({
  trigger: "#acknowledgment",
  start: "top 75%",
  onEnter: () => ackTl.play(),
  onEnterBack: () => ackTl.restart(),
});

/* ---------- Acknowledgment pinned zoom ---------- */
gsap.fromTo(
  ".ack-content",
  { scale: 1 },
  {
    scale: 1.18,
    ease: "power2.out",
    scrollTrigger: {
      trigger: "#acknowledgment",
      start: "top top",
      end: "+=100%", // how long it stays pinned; adjust to taste
      scrub: true,
      pin: true,
      anticipatePin: 1,
    },
  }
);
