import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./welcome.scss";

// ---------------------------------------------------------------------------
// Configuration: font-weight ranges per text type
// ---------------------------------------------------------------------------
const FONT_WEIGHTS = Object.freeze({
  subtitle: { min: 100, max: 400, default: 100 },
  title:    { min: 400, max: 900, default: 400 },
});

// ---------------------------------------------------------------------------
// Helper: split text into individually-styled <span> elements
// ---------------------------------------------------------------------------
const renderText = (text, classNames, baseWeight = 400) =>
  [...text].map((char, i) => (
    <span
      key={i}
      className={classNames}
      style={{ fontVariationSettings: `"wght" ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

// ---------------------------------------------------------------------------
// GSAP motion-tracking: attach mousemove / mouseleave to a text container
// Returns a cleanup function (always a function, never undefined)
// ---------------------------------------------------------------------------
const setupTextHover = (container, type) => {
  // Critical fix: always return a callable cleanup so React never throws
  // "cleanup is not a function" during unmount garbage collection
  if (!container) return () => {};

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (letter, weight, duration = 0.25) => {
    gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `"wght" ${Math.round(weight)}`,
    });
  };

  const handleMouseMove = (event) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = event.clientX - left;

    letters.forEach((letter) => {
      const { left: L, width: W } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (L - left + W / 2));
      const intensity = Math.exp(-Math.pow(distance, 2) / 20000);
      animateLetter(letter, Math.round(min + (max - min) * intensity));
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => animateLetter(letter, base, 0.3));
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  // Cleanup: remove event listeners when component unmounts
  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

// ---------------------------------------------------------------------------
// Welcome component
// ---------------------------------------------------------------------------
const Welcome = () => {
  const titleRef    = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    const titleCleanup    = setupTextHover(titleRef.current,    "title");
    const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");

    return () => {
      subtitleCleanup();
      titleCleanup();
    };
  }, []);

  return (
    <section id="welcome">
      <p ref={subtitleRef}>
        {renderText("Hey, I'm ingchrist. Welcome to my", "text-3xl font-georama", 100)}
      </p>

      <h1 ref={titleRef} className="margin-top-7">
        {renderText("portfolio", "text-9xl italic font-georama")}
      </h1>

      <div className="small-screen">
        <p>This portfolio is designed for desktop and tablet screens only.</p>
      </div>
    </section>
  );
};

export default Welcome;
