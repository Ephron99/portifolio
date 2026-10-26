import { motion, useScroll, useSpring } from 'framer-motion';

/** Thin cyan bar at the top of the viewport showing page scroll progress. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 20, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[70] h-0.5 w-full origin-left bg-accent"
    />
  );
}
