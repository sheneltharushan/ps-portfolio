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

/* ---------- Scroll indicator ---------- */
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

  gsap.set(sideNav, { width: 56 });
  gsap.set(labels, { opacity: 0, x: -8 });

  const navTl = gsap
    .timeline({ paused: true })
    .to(sideNav, {
      width: 240,
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

/* ---------- Acknowledgment section: intro + pinned zoom ---------- */
const ackTl = gsap
  .timeline({
    scrollTrigger: {
      trigger: "#acknowledgment",
      start: "top top",
      end: "+=120%",
      scrub: true,
      pin: true,
    },
  })
  .fromTo(
    ".ack-content",
    { scale: 0.9, opacity: 0.0 },
    { scale: 1.3, opacity: 1, ease: "none" }
  );

const lec1Tl = gsap
  .timeline({ paused: true })
  .from(".lec1-title-block", {
    x: -80,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  })
  .from(
    ".lec1-body",
    {
      y: 24,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    },
    "-=0.35"
  )
  .from(
    "#lecture-1 .lec-card",
    {
      y: 30,
      opacity: 0,
      duration: 0.55,
      stagger: 0.08,
      ease: "power3.out",
    },
    "-=0.25"
  )
  .from(
    "#lecture-1 .sticky-note",
    {
      opacity: 0,
      duration: 0.55,
      stagger: 0.08,
      ease: "power3.out",
    },
    "-=0.35"
  );

ScrollTrigger.create({
  trigger: "#lecture-1",
  start: "top 75%",
  end: "bottom 25%",
  onEnter: () => lec1Tl.play(),
  onEnterBack: () => lec1Tl.restart(),
  onLeave: () => lec1Tl.reverse(),
  onLeaveBack: () => lec1Tl.reverse(),
});

/* Lecture 1 parallax */
gsap.to(".lec1-parallax", {
  yPercent: -25,
  ease: "none",
  scrollTrigger: {
    trigger: "#lecture-1",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});

/* ---------- Lecture 2 title + content animation ---------- */
const lec2Tl = gsap
  .timeline({ paused: true })
  .from(".lec2-title-block", {
    x: -80,
    opacity: 0,
    duration: 0.8,
    ease: "power3.out",
  })
  .from(
    ".lec2-body",
    {
      y: 24,
      opacity: 0,
      duration: 0.6,
      ease: "power3.out",
    },
    "-=0.35"
  )
  .from(
    "#lecture-2 .lec-card",
    {
      y: 30,
      opacity: 0,
      duration: 0.55,
      stagger: 0.08,
      ease: "power3.out",
    },
    "-=0.25"
  )
  .from(
    "#lecture-2 .sticky-note",
    {
      opacity: 0,
      duration: 0.55,
      ease: "power3.out",
    },
    "-=0.3"
  );

ScrollTrigger.create({
  trigger: "#lecture-2",
  start: "top 75%",
  end: "bottom 25%",
  onEnter: () => lec2Tl.play(),
  onEnterBack: () => lec2Tl.restart(),
  onLeave: () => lec2Tl.reverse(),
  onLeaveBack: () => lec2Tl.reverse(),
});

/* Lecture 2 parallax */
gsap.to(".lec2-parallax", {
  yPercent: -20,
  ease: "none",
  scrollTrigger: {
    trigger: "#lecture-2",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});
