// Shared motion variants and easing functions from DESIGN_AND_MOTION.md section 5
export const transitions = {
  easeOut: [0.2, 0.8, 0.2, 1],
  easeInOut: [0.65, 0, 0.35, 1],
  durFast: 0.16,
  durBase: 0.42,
  durSlow: 0.8,
};

export const fadeIn = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0, transition: { duration: transitions.durBase, ease: transitions.easeOut } },
};
