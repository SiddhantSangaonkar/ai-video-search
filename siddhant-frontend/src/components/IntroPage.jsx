import { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function IntroPage({ onStart, isDarkMode, toggleTheme }) {
  // --- ADVANCED MAGNETIC ENGINE (Physics-based) ---
  const btnWrapperRef = useRef(null);
  const magnetX = useMotionValue(0);
  const magnetY = useMotionValue(0);
  
  // Physics config: stiffness controls speed, damping controls "bounciness"
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const smoothX = useSpring(magnetX, springConfig);
  const smoothY = useSpring(magnetY, springConfig);
  
  // Parallax Text: text moves 50% MORE than the button for a 3D depth illusion
  const textX = useTransform(smoothX, (v) => v * 1.5);
  const textY = useTransform(smoothY, (v) => v * 1.5);

  const handleMagnetMove = (e) => {
    if (!btnWrapperRef.current) return;
    const rect = btnWrapperRef.current.getBoundingClientRect();
    // Calculate distance from center of the anchored wrapper
    const hX = e.clientX - (rect.left + rect.width / 2);
    const hY = e.clientY - (rect.top + rect.height / 2);
    magnetX.set(hX * 0.3);
    magnetY.set(hY * 0.3);
  };

  const handleMagnetLeave = () => {
    magnetX.set(0);
    magnetY.set(0);
  };

  // --- GLOBAL MOUSE PARALLAX ENGINE ---
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const px = useSpring(pointerX, { stiffness: 60, damping: 20 });
  const py = useSpring(pointerY, { stiffness: 60, damping: 20 });

  const gridX = useTransform(px, [0, 1], [30, -30]);
  const gridY = useTransform(py, [0, 1], [16, -16]);
  const beamX = useTransform(px, [0, 1], [60, -60]);
  const contentX = useTransform(px, [0, 1], [-14, 14]);
  const contentY = useTransform(py, [0, 1], [-10, 10]);

  useEffect(() => {
    const handler = (e) => {
      pointerX.set(e.clientX / window.innerWidth);
      pointerY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener('pointermove', handler);
    return () => window.removeEventListener('pointermove', handler);
  }, [pointerX, pointerY]);

  const titleWords = 'AI Video Search'.split(' ');

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  // --- DETERMINISTIC PARTICLE FIELD ---
  const particles = Array.from({ length: 35 }, (_, i) => {
    const seed = (i * 9301 + 49297) % 233280;
    const rnd = seed / 233280;
    const seed2 = (i * 4096 + 150889) % 714025;
    const rnd2 = seed2 / 714025;
    return {
      left: `${(rnd * 100).toFixed(2)}%`,
      top: `${(rnd2 * 100).toFixed(2)}%`,
      size: 1.5 + (i % 3) * 1.5,
      duration: 12 + rnd2 * 15,
      delay: rnd * 10,
      drift: 20 + rnd * 30,
    };
  });

  // --- DETERMINISTIC SHOOTING DATA STREAKS ---
  const streaks = Array.from({ length: 8 }, (_, i) => {
    const r = ((i * 7919) % 1000) / 1000;
    const r2 = ((i * 104729) % 1000) / 1000;
    return {
      top: `${(8 + r * 80).toFixed(1)}%`,
      width: 160 + r2 * 240,
      duration: 4.5 + r2 * 4.5, 
      delay: r * 12,
      repeatDelay: 6 + r2 * 10, 
    };
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen relative overflow-hidden text-center transition-colors duration-700 bg-slate-50 dark:bg-[#02060f]">
      
      {/* ===== THEME TOGGLER ===== */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 z-50 p-3 rounded-full dark:bg-white/10 bg-slate-900/5 backdrop-blur-md border dark:border-white/20 border-slate-900/10 hover:scale-110 transition-transform dark:text-sky-100 text-slate-800 shadow-sm"
        aria-label="Toggle Theme"
      >
        {isDarkMode ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </button>

      {/* ===== AURORA GRADIENT WASH ===== */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: isDarkMode
            ? 'conic-gradient(from 0deg at 50% 50%, rgba(56,189,248,0.03), rgba(99,102,241,0.04), rgba(14,165,233,0.02), rgba(56,189,248,0.03))'
            : 'conic-gradient(from 0deg at 50% 50%, rgba(14,165,233,0.08), rgba(99,102,241,0.08), rgba(56,189,248,0.08), rgba(14,165,233,0.08))',
          filter: 'blur(80px)',
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 75, repeat: Infinity, ease: 'linear' }}
      />

      {/* ===== PERSPECTIVE GRID FLOOR ===== */}
      <motion.div
        style={{ x: gridX, y: gridY }}
        className="absolute inset-0 z-0 pointer-events-none [perspective:600px]"
      >
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[65%] origin-bottom dark:opacity-60 opacity-80"
          style={{
            transform: 'rotateX(72deg)',
            backgroundImage: isDarkMode
              ? 'linear-gradient(to right, rgba(56,189,248,0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(56,189,248,0.25) 1px, transparent 1px)'
              : 'linear-gradient(to right, rgba(14,165,233,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(14,165,233,0.35) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'linear-gradient(to top, black, transparent 80%)',
            WebkitMaskImage: 'linear-gradient(to top, black, transparent 80%)',
          }}
          animate={{ backgroundPositionY: ['0px', '60px'] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* ===== ROTATING LIGHT BEAMS ===== */}
      <motion.div
        style={{ x: beamX }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[160vmax] h-[160vmax] z-0 pointer-events-none opacity-40"
      >
        <motion.div
          className="w-full h-full rounded-full"
          style={{
            background: isDarkMode
              ? 'conic-gradient(from 0deg, transparent 0deg, rgba(56,189,248,0.08) 12deg, transparent 24deg, transparent 180deg, rgba(99,102,241,0.08) 192deg, transparent 204deg)'
              : 'conic-gradient(from 0deg, transparent 0deg, rgba(14,165,233,0.15) 12deg, transparent 24deg, transparent 180deg, rgba(99,102,241,0.15) 192deg, transparent 204deg)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
        />
      </motion.div>

      {/* ===== FLOATING PARTICLE FIELD ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full dark:bg-cyan-300 bg-sky-500"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              boxShadow: isDarkMode ? '0 0 12px rgba(34,211,238,0.9)' : '0 0 10px rgba(14,165,233,0.7)',
            }}
            animate={{ y: [0, -p.drift, 0], opacity: [0, 1, 0] }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
      </div>

      {/* ===== SHOOTING DATA STREAKS ===== */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {streaks.map((s, i) => (
          <motion.div
            key={i}
            className="absolute h-px"
            style={{
              top: s.top,
              width: s.width,
              background: isDarkMode
                ? 'linear-gradient(90deg, transparent, rgba(56,189,248,0.9), transparent)'
                : 'linear-gradient(90deg, transparent, rgba(14,165,233,0.7), transparent)',
            }}
            initial={{ left: '-25%', opacity: 0 }}
            animate={{ left: ['-25%', '125%'], opacity: [0, 1, 0] }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Infinity,
              repeatDelay: s.repeatDelay,
              ease: 'easeIn',
            }}
          />
        ))}
      </div>

      {/* ===== SCANNING SWEEP LINE ===== */}
      <motion.div
        className="absolute left-0 right-0 h-px z-0 pointer-events-none dark:bg-gradient-to-r dark:from-transparent dark:via-cyan-400/70 dark:to-transparent bg-gradient-to-r from-transparent via-sky-500/60 to-transparent"
        style={{ boxShadow: isDarkMode ? '0 0 18px rgba(34,211,238,0.5)' : '0 0 15px rgba(14,165,233,0.3)' }}
        initial={{ top: '-5%' }}
        animate={{ top: ['-5%', '105%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', repeatDelay: 4 }}
      />

      {/* ===== MAIN CONTENT ===== */}
      <motion.div
        style={{ x: contentX, y: contentY }}
        className="z-10 max-w-4xl px-4 flex flex-col items-center relative"
      >
        {/* Glowing pulsing core behind the title */}
        <motion.div
          aria-hidden
          className="absolute -top-12 left-1/2 -translate-x-1/2 -z-10 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: isDarkMode ? 'rgba(56,189,248,0.15)' : 'rgba(14,165,233,0.2)', filter: 'blur(60px)' }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 flex flex-wrap justify-center gap-x-4">
          {titleWords.map((w, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0, y: 40, filter: 'blur(16px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.9, delay: 0.25 + i * 0.18, ease: [0.2, 0.65, 0.3, 0.9] }}
              style={{ willChange: 'filter, transform, opacity' }}
            >
              <span className="inline-block text-transparent bg-clip-text bg-gradient-to-b dark:from-white dark:via-cyan-100 dark:to-sky-400 from-slate-900 via-sky-700 to-sky-900 drop-shadow-sm">
                {w}
              </span>
            </motion.span>
          ))}
        </h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.95 }}
          className="dark:text-sky-100/90 text-slate-700 text-lg md:text-2xl font-light tracking-wide mb-6 max-w-2xl leading-relaxed transition-colors duration-500"
        >
          Upload any lecture, meeting, or tutorial. Our local neural network instantly transcribes the audio, allowing you to search the timeline naturally.
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 1.1 }}
          className="dark:text-sky-300/60 text-slate-500 text-sm md:text-base font-light tracking-widest mb-16 uppercase transition-colors duration-500"
        >
          Zero Cloud Dependencies • Total Privacy • Instant Scrubbing
        </motion.p>

        {/* ===== UPGRADED: TRUE PHYSICS-BASED MAGNETIC BUTTON ===== */}
        {/* The wrapper handles the hover detection and anchors the outer rings */}
        <motion.div
          ref={btnWrapperRef}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.25, ease: 'backOut' }}
          onMouseMove={handleMagnetMove}
          onMouseLeave={handleMagnetLeave}
          className="relative w-48 h-48 group flex items-center justify-center cursor-pointer"
        >
          {/* ANCHORED ELEMENTS: These stay perfectly still while the button moves */}
          <span className="absolute inset-[-10px] rounded-full border dark:border-cyan-400/40 border-sky-500/30 animate-[ping_4s_cubic-bezier(0,0,0.2,1)_infinite] opacity-75 pointer-events-none" />
          <span className="absolute inset-0 rounded-full border dark:border-cyan-400/20 border-sky-500/20 animate-[ping_6s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50 pointer-events-none" />

          <motion.span
            className="absolute inset-[-22px] rounded-full border border-dashed dark:border-cyan-400/40 border-sky-500/40 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          <motion.span
            className="absolute inset-[-22px] rounded-full pointer-events-none"
            animate={{ rotate: -360 }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          >
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full dark:bg-cyan-400 bg-sky-500 dark:shadow-[0_0_12px_rgba(34,211,238,0.95)] shadow-[0_0_12px_rgba(14,165,233,0.8)]" />
          </motion.span>

          {/* DYNAMIC ELEMENT: The actual button that gets pulled by the mouse */}
          <motion.button
            onClick={onStart}
            style={{ x: smoothX, y: smoothY }}
            whileTap={{ scale: 0.95 }}
            className="absolute inset-0 rounded-full border dark:border-cyan-500/40 border-sky-500/30 dark:bg-slate-900/60 bg-white/70 backdrop-blur-md transition-colors duration-500 dark:shadow-[0_0_30px_rgba(34,211,238,0.15)] shadow-[0_0_30px_rgba(14,165,233,0.15)] dark:group-hover:shadow-[0_0_60px_rgba(34,211,238,0.3)] group-hover:shadow-[0_0_60px_rgba(14,165,233,0.3)] overflow-hidden flex items-center justify-center z-10"
          >
            {/* The sheen inside the moving button */}
            <span
              className="absolute inset-[-1px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: isDarkMode
                  ? 'conic-gradient(from 0deg, transparent, rgba(34,211,238,0.4), transparent 40%)'
                  : 'conic-gradient(from 0deg, transparent, rgba(14,165,233,0.3), transparent 40%)',
                animation: 'spin 6s linear infinite',
              }}
            />

            {/* PARALLAX TEXT: The text moves slightly more than the button for 3D depth! */}
            <motion.span 
              style={{ x: textX, y: textY }}
              className="z-10 flex flex-col items-center gap-1 dark:text-cyan-300 text-sky-700 font-bold tracking-widest group-hover:tracking-[0.2em] transition-all duration-300 pointer-events-none"
            >
              INITIALIZE
              <motion.span
                className="block w-6 h-px bg-current"
                animate={{ scaleX: [1, 1.6, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>

    </div>
  );
}