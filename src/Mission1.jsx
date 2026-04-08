import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import systemImg from "./assets/Mascot.png";
import studentImg from "./assets/Student.png";

const SECURITY_TIPS = [
  { icon: "🔑", title: "Use Passphrases", desc: "Combine 4+ random words for memorable, strong passwords" },
  { icon: "🔄", title: "Unique Per Service", desc: "Never reuse passwords across different accounts" },
  { icon: "🛡️", title: "Enable 2FA", desc: "Add an extra layer of security with two-factor authentication" },
  { icon: "🕵️", title: "Data Mining", desc: "Hackers scour social media and forms for personal details." },
  { icon: "📕", title: "Dictionary Attacks", desc: "Common passwords like '123456' are tried first by bots." },
  { icon: "👣", title: "Digital Footprint", desc: "Avoid filling unnecessary online forms." },
];

const ScanLines = () => (
  <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden">
    <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,255,255,0.02)_2px,rgba(0,255,255,0.02)_4px)]" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(0,0,0,0.4)]" />
    <motion.div
      className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent"
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
    />
    <motion.div
      className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/8 to-transparent"
      animate={{ top: ["100%", "0%"] }}
      transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

const CRTFlicker = () => (
  <>
    <motion.div
      className="absolute inset-0 pointer-events-none z-50"
      animate={{ opacity: [0, 0.03, 0, 0.015, 0] }}
      transition={{ duration: 0.15, repeat: Infinity, repeatDelay: Math.random() * 4 }}
      style={{ background: "rgba(0,255,255,0.04)" }}
    />
    <motion.div
      className="absolute inset-0 pointer-events-none z-50"
      animate={{ opacity: [0, 0, 0.01, 0] }}
      transition={{ duration: 0.08, repeat: Infinity, repeatDelay: Math.random() * 7 }}
      style={{ background: "rgba(255,255,255,0.02)" }}
    />
  </>
);

const ScreenGlare = () => (
  <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden rounded-[16px]">
    <div
      className="absolute inset-0"
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 40%, transparent 60%, rgba(0,255,255,0.01) 100%)",
      }}
    />
    <div
      className="absolute -top-1/2 -left-1/2 w-full h-full rounded-full"
      style={{
        background: "radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.03) 0%, transparent 50%)",
      }}
    />
  </div>
);

const ScreenCurvature = () => (
  <div className="absolute inset-0 pointer-events-none z-40 rounded-[16px]"
    style={{
      boxShadow: "inset 0 0 100px rgba(0,0,0,0.3), inset 0 0 30px rgba(0,0,0,0.2)",
      background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.25) 100%)",
    }}
  />
);

const MatrixRain = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF";
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);
    const draw = () => {
      ctx.fillStyle = "rgba(0, 8, 4, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillStyle = Math.random() > 0.98 ? "#fff" : `rgba(0,255,255,${Math.random() * 0.3})`;
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const interval = setInterval(draw, 50);
    return () => clearInterval(interval);
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30" />;
};

const PowerLED = () => (
  <div className="flex items-center justify-center">
    <motion.div
      className="w-2.5 h-2.5 rounded-full bg-cyan-400"
      animate={{
        boxShadow: [
          "0 0 4px rgba(0,255,255,0.6), 0 0 8px rgba(0,255,255,0.3)",
          "0 0 6px rgba(0,255,255,0.8), 0 0 14px rgba(0,255,255,0.4)",
          "0 0 4px rgba(0,255,255,0.6), 0 0 8px rgba(0,255,255,0.3)",
        ],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>
);

const ComputerFrame = ({ children, stage }) => {
  const showRain = stage === "battle" || stage === "intro";
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full p-2 md:p-4">
      {/* Monitor outer body - thick bezel look */}
      <div className="relative w-full max-w-6xl flex flex-col">
        {/* Top bezel with brand */}
        <div className="relative bg-gradient-to-b from-[#1e1e2e] via-[#181828] to-[#151524] px-5 md:px-8 pt-4 pb-2 rounded-t-[28px] border-t border-x border-[#2a2a44]/80"
          style={{
            boxShadow: "0 -4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
        >
          {/* Inner bezel highlight */}
          <div className="absolute top-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

          <div className="flex items-center justify-between">
            {/* Brand logo area */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded bg-gradient-to-br from-cyan-500/30 to-blue-600/30 border border-cyan-500/20 flex items-center justify-center">
                  <span className="text-[8px] font-black text-cyan-400">C</span>
                </div>
                <div>
                  <div className="text-[9px] text-gray-400 tracking-[0.2em] uppercase font-bold leading-none">CyberCorp</div>
                  <div className="text-[7px] text-gray-600 tracking-[0.15em] uppercase leading-none mt-0.5">PROFESSIONAL SERIES</div>
                </div>
              </div>
            </div>

            {/* Status indicators */}
            <div className="flex items-center gap-4">
              <motion.div
                className="flex items-center gap-1.5"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(0,255,0,0.6)]" />
                <span className="text-[8px] text-green-500/60 tracking-[0.15em] uppercase">Connected</span>
              </motion.div>
              <div className="w-px h-3 bg-gray-700/50" />
              <span className="text-[8px] text-gray-600 tracking-[0.15em] uppercase hidden md:block">Terminal v4.2.1</span>
            </div>
          </div>

          {/* Sub-bezel bar with model info */}
          <div className="flex items-center justify-between mt-2 px-1">
            <span className="text-[7px] text-gray-700 tracking-widest uppercase">CC-MON27QHD</span>
            <div className="flex items-center gap-3">
              <span className="text-[7px] text-gray-700 tracking-widest uppercase">2560×1440</span>
              <span className="text-[7px] text-gray-700 tracking-widest uppercase">165Hz</span>
            </div>
          </div>
        </div>

        {/* Screen area with inner bezel */}
        <div className="relative bg-[#0c0c14] px-3 md:px-4 py-3 md:py-4 border-x border-[#2a2a44]/80">
          {/* Inner shadow to create depth illusion */}
          <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] pointer-events-none z-10" />

          {/* The actual screen */}
          <div
            className="relative h-[82vh] max-h-[720px] rounded-[16px] overflow-hidden"
            style={{
              boxShadow: "0 0 0 1px rgba(0,255,255,0.05), 0 0 60px rgba(0,255,255,0.06), 0 0 120px rgba(0,255,255,0.03), inset 0 0 60px rgba(0,0,0,0.5)",
            }}
          >
            <div className="absolute inset-0 bg-[#020a08]" />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-transparent to-green-900/5 pointer-events-none" />
            {showRain && <MatrixRain />}
            <div className="relative w-full h-full overflow-hidden">
              {children}
            </div>
            <ScanLines />
            <CRTFlicker />
            <ScreenGlare />
            <ScreenCurvature />
          </div>
        </div>

        {/* Bottom bezel */}
        <div className="relative bg-gradient-to-t from-[#151524] via-[#181828] to-[#1a1a2c] px-5 md:px-8 pt-2 pb-3 rounded-b-[28px] border-b border-x border-[#2a2a44]/80 flex items-center justify-between"
          style={{
            boxShadow: "0 4px 20px rgba(0,0,0,0.5), inset 0 -1px 0 rgba(255,255,255,0.02)",
          }}
        >
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full border border-gray-700/50 bg-gray-800/50 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-gray-700/50" />
            </div>
            <div className="w-5 h-5 rounded-full border border-gray-700/50 bg-gray-800/50 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-gray-700/50" />
            </div>
          </div>

          <PowerLED />

          <div className="flex items-center gap-3">
            <span className="text-[7px] text-gray-700 tracking-widest uppercase hidden md:block">HDMI 2.1</span>
            <span className="text-[7px] text-gray-700 tracking-widest uppercase hidden md:block">DisplayPort</span>
          </div>
        </div>

        {/* Monitor stand - neck */}
        <div className="relative mx-auto">
          <div className="w-16 md:w-20 h-12 bg-gradient-to-b from-[#181828] to-[#12121f] border-x border-[#2a2a44]/60"
            style={{
              boxShadow: "inset 2px 0 4px rgba(255,255,255,0.02), inset -2px 0 4px rgba(0,0,0,0.3)",
              clipPath: "polygon(15% 0%, 85% 0%, 100% 100%, 0% 100%)",
            }}
          />
        </div>

        {/* Monitor stand - base */}
        <div className="relative mx-auto">
          <div
            className="w-48 md:w-64 h-4 bg-gradient-to-b from-[#181828] to-[#0e0e1a] rounded-b-xl border border-[#2a2a44]/60 border-t-0"
            style={{
              boxShadow: "0 8px 30px rgba(0,0,0,0.6), 0 2px 10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)",
            }}
          />
          {/* Base shadow on desk */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-56 md:w-72 h-6 bg-black/40 blur-xl rounded-full" />
        </div>

        {/* Ambient light bleed from screen onto desk */}
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[70%] h-16 bg-cyan-500/[0.04] blur-[40px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[50%] h-8 bg-cyan-400/[0.03] blur-[20px] rounded-full pointer-events-none" />
      </div>
    </div>
  );
};

const TerminalPrompt = ({ children, className = "" }) => (
  <div className={`font-mono ${className}`}>
    <span className="text-cyan-500">root@cybersec</span>
    <span className="text-gray-600">:</span>
    <span className="text-blue-400">~</span>
    <span className="text-gray-600">$</span>
    <span className="ml-2">{children}</span>
  </div>
);

const TypingText = ({ text, speed = 30, className = "" }) => {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return (
    <span className={className}>
      {displayed}
      {!done && <span className="animate-pulse text-cyan-400">▊</span>}
    </span>
  );
};

const GameMascot = ({ type, isActive }) => {
  const avatarSrc = type === 'system' ? systemImg : studentImg;
  const glowColor = type === 'system' ? "rgba(0,255,255,0.4)" : "rgba(168,85,247,0.4)";
  const ringColor = type === 'system' ? "border-cyan-400/60" : "border-purple-400/60";
  const bgGlow = type === 'system' ? "from-cyan-500/20 to-blue-600/20" : "from-purple-500/20 to-pink-600/20";
  const labelColor = type === 'system' ? "text-cyan-400" : "text-purple-400";
  const labelBg = type === 'system' ? "bg-cyan-500/10 border-cyan-500/20" : "bg-purple-500/10 border-purple-500/20";

  return (
    <motion.div
      className="flex flex-col items-center gap-2"
      animate={{ scale: isActive ? 1.05 : 1 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
    >
      {/* Outer glow ring */}
      <motion.div
        className="relative"
        animate={{
          boxShadow: isActive
            ? `0 0 30px ${glowColor}, 0 0 60px ${glowColor}, 0 0 90px ${glowColor}`
            : `0 0 10px ${glowColor.replace('0.4', '0.1')}`,
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Spinning ring when active */}
        {isActive && (
          <motion.div
            className={`absolute -inset-2 rounded-full border-2 border-dashed ${type === 'system' ? 'border-cyan-400/30' : 'border-purple-400/30'}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        )}
        {/* Static ring */}
        <div className={`absolute -inset-1.5 rounded-full border ${ringColor} opacity-30`} />
        {/* Background glow */}
        <div className={`absolute -inset-3 rounded-full bg-gradient-to-br ${bgGlow} blur-md opacity-50`} />
        {/* Avatar */}
        <div className={`relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 ${ringColor} bg-gray-900`}>
          <img src={avatarSrc} alt={type} className="w-full h-full object-cover" />
          {/* Inner highlight */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/20 rounded-full" />
        </div>
      </motion.div>

      {/* Name label */}
      <motion.div
        className={`px-3 py-1 border rounded-full text-[9px] uppercase tracking-[0.2em] font-bold ${labelBg} ${labelColor}`}
        animate={{ opacity: isActive ? 1 : 0.5 }}
        transition={{ duration: 0.3 }}
      >
        {type === 'system' ? 'System AI' : 'Student'}
      </motion.div>

      {/* Speaking indicator */}
      {isActive && (
        <motion.div
          className="flex items-end gap-0.5 h-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              className={`w-1 rounded-full ${type === 'system' ? 'bg-cyan-400' : 'bg-purple-400'}`}
              animate={{ height: ["4px", "12px", "4px"] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
};

export default function Mission1() {
  const [stage, setStage] = useState("menu");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [userInfo, setUserInfo] = useState({ name: "", dob: "", phone: "" });
  const [introStep, setIntroStep] = useState(0);
  const [isCracking, setIsCracking] = useState(false);
  const [currentAttempt, setCurrentAttempt] = useState("");
  const [attemptIndex, setAttemptIndex] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [crackedPasswords, setCrackedPasswords] = useState([]);
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameResult, setGameResult] = useState(null);
  const [showWarning, setShowWarning] = useState(false);
  const [matchedAttempt, setMatchedAttempt] = useState("");
  const [vulnerabilityLevel, setVulnerabilityLevel] = useState("low");
  const [bootLines, setBootLines] = useState([]);
  const [bootDone, setBootDone] = useState(false);
  const [configStep, setConfigStep] = useState(0);

  const crackTimerRef = useRef(null);
  const countdownTimerRef = useRef(null);
  const attemptsPerSecond = 3;

  useEffect(() => {
    if (stage !== "menu") return;
    setBootDone(false);
    setBootLines([]);
    const lines = [
      { text: "[BIOS] CyberCorp Security Terminal v4.2.1", delay: 0 },
      { text: "[BIOS] Memory check: 16384 MB OK", delay: 200 },
      { text: "[BIOS] GPU: NeuralNet Accelerator initialized", delay: 400 },
      { text: "[KERNEL] Loading crypto modules...", delay: 700 },
      { text: "[KERNEL] Mounting /dev/security... OK", delay: 1000 },
      { text: "[NET] Connecting to threat database... OK", delay: 1300 },
      { text: "[SEC] Password analysis engine ready", delay: 1600 },
      { text: "[SYS] All systems operational.", delay: 1900 },
    ];
    lines.forEach((line, i) => {
      setTimeout(() => {
        setBootLines(prev => [...prev, line.text]);
        if (i === lines.length - 1) setTimeout(() => setBootDone(true), 400);
      }, line.delay);
    });
  }, [stage]);

  useEffect(() => {
    if (!password) { setPasswordStrength(0); setVulnerabilityLevel("low"); return; }
    let strength = 0;
    const hasUpper = /[A-Z]/.test(password), hasLower = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password), hasSpecial = /[^A-Za-z0-9]/.test(password);
    strength += Math.min(password.length * 4, 40);
    if (hasUpper) strength += 10; if (hasLower) strength += 10;
    if (hasNumber) strength += 10; if (hasSpecial) strength += 15;
    const commonPasswords = ["password","123456","qwerty","admin","letmein"];
    if (commonPasswords.some(cp => password.toLowerCase().includes(cp))) strength = Math.max(strength - 30, 0);
    if (userInfo.name && password.toLowerCase().includes(userInfo.name.toLowerCase())) strength = Math.max(strength - 20, 0);
    strength = Math.min(strength, 100);
    setPasswordStrength(strength);
    if (strength < 30 || commonPasswords.some(cp => password.toLowerCase().includes(cp))) setVulnerabilityLevel("high");
    else if (strength < 60 || (userInfo.name && password.toLowerCase().includes(userInfo.name.toLowerCase()))) setVulnerabilityLevel("medium");
    else if (strength >= 80 && password.length >= 12 && hasUpper && hasLower && hasNumber && hasSpecial) setVulnerabilityLevel("none");
    else setVulnerabilityLevel("low");
  }, [password, userInfo]);

  const generateAttackDictionary = useMemo(() => {
    const personalAttacks = [];
    const commonAttacks = [];
    const bruteAttacks = [];

    if (password) personalAttacks.push(password);
    if (password) {
      personalAttacks.push(password.toLowerCase(), password.toUpperCase(), password + "123", password + "!", password + "2024", "123" + password, "!" + password);
    }

    const suffixes = ["", "123", "1234", "12345", "123456", "!", "@", "#", "1", "12", "2024", "2023", "2025", "@123", "#1", "01", "007", "11", "21", "99", "00", "69", "321", "_", ".", "-", "*", "love", "@gmail.com"];

    if (userInfo.name) {
      const names = userInfo.name.toLowerCase().split(" ").filter(Boolean);
      const firstName = names[0];
      const lastName = names[names.length - 1];
      const initials = names.map(n => n[0]).join("");
      const nameVariants = new Set();
      const baseNames = [firstName, lastName, firstName + lastName, lastName + firstName, initials];
      baseNames.forEach(n => {
        if (!n) return;
        nameVariants.add(n);
        nameVariants.add(n[0].toUpperCase() + n.slice(1));
        nameVariants.add(n.toUpperCase());
      });
      nameVariants.forEach(n => { suffixes.forEach(s => personalAttacks.push(n + s)); });
      baseNames.forEach(n => {
        if (!n || n.length < 2) return;
        const rev = n.split("").reverse().join("");
        personalAttacks.push(rev, rev + "123", rev + "!");
      });
      if (userInfo.dob) {
        const parts = userInfo.dob.split("-");
        const year = parts[0], month = parts[1], day = parts[2];
        const dateCombos = [year, month, day, month + day, day + month, day + month + year, year + month + day, month + day + year, userInfo.dob.replace(/-/g, ""), userInfo.dob.replace(/-/g, "").slice(2), userInfo.dob.replace(/-/g, "").slice(-4)];
        nameVariants.forEach(n => { dateCombos.forEach(d => { personalAttacks.push(n + d, d + n); }); });
      }
      if (userInfo.phone && userInfo.phone.length >= 4) {
        const last4 = userInfo.phone.slice(-4);
        const last6 = userInfo.phone.slice(-6);
        const last8 = userInfo.phone.slice(-8);
        nameVariants.forEach(n => { personalAttacks.push(n + last4, n + last6, n + last8, last4 + n, last6 + n); });
      }
      if (firstName.length >= 3) {
        const leetMap = { a: "4", e: "3", i: "1", o: "0", s: "5", t: "7" };
        const leet1 = firstName.split("").map(c => leetMap[c.toLowerCase()] || c).join("");
        [leet1].forEach(l => { personalAttacks.push(l, l + "123", l + "!"); });
      }
    }

    const commonPasswords = ["password","123456","123456789","qwerty","abc123","password123","admin","letmein","welcome","monkey","1234567890","password1","iloveyou","starwars","football","dragon","master","shadow","killer","ninja","princess","oracle","mysql","root","changeme","trustno1","sunshine","michael","charlie","access","batman"];
    const commonSuffixes = ["","123","!","2024","1","1234","@","2023","2025","12345","#","!!","qwert","abc","pass","321"];
    commonPasswords.forEach(pwd => { commonSuffixes.forEach(s => commonAttacks.push(pwd + s)); });
    const keyboardPatterns = ["qwerty","qwert","asdf","asdfgh","zxcvbn","qazwsx","1qaz2wsx","!@#$%","1234qwer","qwer1234","abc123","abcdef","abcdefgh"];
    keyboardPatterns.forEach(p => { commonAttacks.push(p, p + "123", p + "!"); });

    const extraWords = ["super","warrior","hacker","secure","love","baby","angel","rocky","james","bond","batman","spider","iron","captain","india","hindi","computer","laptop","mobile","game","player","cool","awesome","great","nice","good","best","power","king","queen","hero","legend","god","devil","angel"];
    extraWords.forEach(word => { bruteAttacks.push(word, word + "123", word + "!", word + "@123", word + "2024"); });
    for (let y = 1990; y <= 2025; y++) { bruteAttacks.push(y.toString(), "password" + y); }
    for (let i = 0; i <= 999; i++) { bruteAttacks.push(i.toString().padStart(3, "0")); }

    return [...new Set([...personalAttacks, ...commonAttacks, ...bruteAttacks])];
  }, [userInfo, password]);

  const dialogueSequence = useMemo(() => {
    if (vulnerabilityLevel === "high") return [
      { speaker:"system", text:"🚨 CRITICAL: Maximum vulnerability detected! This password will be compromised in seconds." },
      { speaker:"student", text:"But I thought my password was clever! How can you be so sure?" },
      { speaker:"system", text:"Common patterns + personal info = guaranteed breach. Attackers have databases of billions of passwords." },
      { speaker:"student", text:"Show me exactly how fast it gets cracked..." },
      { speaker:"system", text:"💀 OBLITERATION PROTOCOL ENGAGED. Watch your security vanish." },
    ];
    if (vulnerabilityLevel === "medium") return [
      { speaker:"system", text:"⚠️ WARNING: Moderate vulnerability detected. Password might survive basic attacks." },
      { speaker:"student", text:"So I have a 50/50 chance? That's not too bad, right?" },
      { speaker:"system", text:"Attackers use hybrid attacks. Your password might last minutes, not hours." },
      { speaker:"student", text:"Let's see what happens with a determined attack." },
      { speaker:"system", text:"🔥 ADVANCED ATTACK SEQUENCE INITIATED. Testing all vectors." },
    ];
    if (vulnerabilityLevel === "none") return [
      { speaker:"system", text:"🛡️ MAXIMUM SECURITY: This password is essentially uncrackable with current technology." },
      { speaker:"student", text:"Really? Nothing can break it?" },
      { speaker:"system", text:"Even with quantum computing, this would take centuries. The attack will fail." },
      { speaker:"student", text:"Let's see you try!" },
      { speaker:"system", text:"⚡ QUANTUM ATTACK SIMULATION: All systems engaged. Prepare for failure." },
    ];
    if (passwordStrength >= 80) return [
      { speaker:"system", text:`🛡️ FORTRESS LEVEL: Strong encryption detected. Password strength: ${passwordStrength}%` },
      { speaker:"student", text:"I created a complex passphrase. Can anything break this?" },
      { speaker:"system", text:"It would take years with current technology. But let's test anyway." },
      { speaker:"student", text:"Bring it on. My password is ready for battle." },
      { speaker:"system", text:"⚡ MAXIMUM FORCE ATTACK INITIATED. All systems online." },
    ];
    return [
      { speaker:"system", text:"📊 ANALYSIS: Moderate security posture detected. No immediate vulnerabilities." },
      { speaker:"student", text:"I think my password is pretty good. What's the verdict?" },
      { speaker:"system", text:"It's... adequate. But adequate isn't secure in today's threat landscape." },
      { speaker:"student", text:"Let's see how it holds up against a real attack." },
      { speaker:"system", text:"🔍 PENETRATION TEST COMMENCING. Monitor all attack vectors." },
    ];
  }, [userInfo, passwordStrength, vulnerabilityLevel]);

  const startBattle = () => {
    setStage("battle");
    setTimeout(() => startCracking(), 800);
  };

  const startCracking = () => {
    setIsCracking(true);
    setAttemptIndex(0);
    setCrackedPasswords([]);
    setTimeLeft(30);
    setMatchedAttempt("");
    const attackPool = generateAttackDictionary;
    setTotalAttempts(attackPool.length);
    let currentIndex = 0, found = false;
    const processAttempts = () => {
      if (found || currentIndex >= attackPool.length || timeLeft <= 0) {
        if (found) { setGameResult("lose"); setShowWarning(true); setTimeout(()=>setShowWarning(false),3000); }
        else setGameResult("win");
        setIsCracking(false);
        clearInterval(crackTimerRef.current); clearInterval(countdownTimerRef.current);
        return;
      }
      const attempt = attackPool[currentIndex];
      setCurrentAttempt(attempt);
      setAttemptIndex(currentIndex + 1);
      setCrackedPasswords(prev => [...prev.slice(-6), attempt]);
      if (attempt.toLowerCase() === password.toLowerCase()) { found = true; setMatchedAttempt(attempt); }
      currentIndex++;
    };
    crackTimerRef.current = setInterval(processAttempts, 1000 / attemptsPerSecond);
    countdownTimerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          if (!found) { setGameResult("win"); setIsCracking(false); clearInterval(crackTimerRef.current); clearInterval(countdownTimerRef.current); }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resetGame = () => {
    setStage("menu"); setPassword(""); setPasswordStrength(0);
    setUserInfo({name:"",dob:"",phone:""}); setIntroStep(0);
    setIsCracking(false); setCurrentAttempt(""); setAttemptIndex(0);
    setTotalAttempts(0); setCrackedPasswords([]); setTimeLeft(30);
    setGameResult(null); setShowWarning(false); setMatchedAttempt("");
    setVulnerabilityLevel("low"); setConfigStep(0);
  };

  useEffect(() => {
    if (stage !== "intro") return;
    const timer = setTimeout(() => {
      if (introStep < dialogueSequence.length - 1) setIntroStep(prev => prev + 1);
      else setTimeout(() => startBattle(), 800);
    }, 3500);
    return () => clearTimeout(timer);
  }, [stage, introStep, dialogueSequence]);

  const calculateCrackTime = () => {
    if (!password) return "N/A";
    if (vulnerabilityLevel==="high") return "< 1 sec"; if (vulnerabilityLevel==="medium") return "Minutes";
    if (vulnerabilityLevel==="none") return "∞ Never"; if (passwordStrength>=80) return "Centuries";
    if (passwordStrength>=60) return "Years"; return "Days";
  };

  const vulnColor = vulnerabilityLevel === 'none' ? 'text-green-400 border-green-500/30 bg-green-500/10'
    : vulnerabilityLevel === 'high' ? 'text-red-400 border-red-500/30 bg-red-500/10'
    : vulnerabilityLevel === 'medium' ? 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10'
    : 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10';

  const strengthBarColor = vulnerabilityLevel === 'none' ? 'bg-green-500'
    : vulnerabilityLevel === 'high' ? 'bg-red-500'
    : vulnerabilityLevel === 'medium' ? 'bg-yellow-500'
    : passwordStrength >= 80 ? 'bg-cyan-500' : 'bg-gray-600';

  return (
    <div className={`relative w-full h-screen overflow-hidden bg-[#08080c] text-white font-mono ${showWarning ? 'animate-shake' : ''}`}>
      {/* Desk surface gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#08080c] via-[#0a0a10] to-[#060608]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/[0.03] blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-600/[0.04] blur-[120px] rounded-full pointer-events-none" />

      <ComputerFrame stage={stage}>
        <AnimatePresence mode="wait">

          {/* ===== MENU ===== */}
          {stage === "menu" && (
            <motion.div key="menu" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="w-full h-full flex flex-col items-center justify-center p-6 relative">
              <div className="absolute top-4 left-4 right-4 space-y-1 text-[10px] text-green-500/60 max-h-[180px] overflow-hidden">
                {bootLines.map((line, i) => (
                  <motion.div key={i} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{duration:0.2}}>
                    {line}
                  </motion.div>
                ))}
              </div>

              <motion.div className="text-center relative z-10" initial={{opacity:0,y:30}} animate={{opacity:bootDone?1:0,y:bootDone?0:30}} transition={{duration:0.8}}>
                {/* Animated logo rings */}
                <div className="relative w-36 h-36 mx-auto mb-8">
                  <motion.div className="absolute inset-0 rounded-full border border-cyan-500/20" animate={{rotate:360}} transition={{duration:20,repeat:Infinity,ease:"linear"}} />
                  <motion.div className="absolute inset-3 rounded-full border border-dashed border-cyan-500/10" animate={{rotate:-360}} transition={{duration:30,repeat:Infinity,ease:"linear"}} />
                  <motion.div className="absolute inset-6 rounded-full border border-cyan-400/15" animate={{rotate:360}} transition={{duration:15,repeat:Infinity,ease:"linear"}} />
                  {/* Glowing core */}
                  <div className="absolute inset-8 rounded-full bg-gradient-to-br from-cyan-900/60 to-blue-900/60 border border-cyan-500/30 flex items-center justify-center"
                    style={{ boxShadow: "0 0 40px rgba(0,255,255,0.15), 0 0 80px rgba(0,255,255,0.08), inset 0 0 30px rgba(0,255,255,0.1)" }}
                  >
                    <span className="text-5xl" style={{ filter: "drop-shadow(0 0 10px rgba(0,255,255,0.4))" }}>🔐</span>
                  </div>
                </div>

                <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-[0.15em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-cyan-300 mb-2"
                  style={{ textShadow: "0 0 40px rgba(0,255,255,0.2)" }}
                >
                  Password Cracker
                </h1>
                <p className="text-cyan-700 text-[10px] tracking-[0.4em] uppercase mb-10">Real-World Attack Simulation</p>

                <motion.button
                  onClick={() => setStage("config")}
                  whileHover={{scale:1.03, boxShadow:"0 0 40px rgba(0,255,255,0.25), 0 0 80px rgba(0,255,255,0.1)"}}
                  whileTap={{scale:0.97}}
                  className="relative px-12 py-4 bg-transparent border border-cyan-500/50 text-cyan-400 font-bold text-sm uppercase tracking-[0.3em] overflow-hidden group cursor-pointer rounded-sm"
                >
                  <span className="relative z-10">Initialize Attack</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-cyan-500/5 to-cyan-500/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.button>

                <div className="mt-8 flex items-center justify-center gap-5 text-[9px] text-gray-600 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-red-500/40" />Dict Attack</span>
                  <span className="text-cyan-900">•</span>
                  <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-yellow-500/40" />Brute Force</span>
                  <span className="text-cyan-900">•</span>
                  <span className="flex items-center gap-1.5"><span className="w-1 h-1 rounded-full bg-purple-500/40" />Social Eng.</span>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ===== CONFIG ===== */}
          {stage === "config" && (
            <motion.div key="config" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="w-full h-full flex flex-col items-center justify-center p-4 md:p-8">
              <div className="w-full max-w-2xl">
                <div className="flex items-center gap-2 mb-4 px-1">
                  <div className="w-3 h-3 rounded-full bg-red-500/70 shadow-[0_0_4px_rgba(255,0,0,0.3)]" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70 shadow-[0_0_4px_rgba(255,255,0,0.3)]" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70 shadow-[0_0_4px_rgba(0,255,0,0.3)]" />
                  <span className="ml-3 text-[10px] text-gray-600 tracking-widest uppercase">target-config.sh</span>
                </div>

                <div className="bg-black/70 border border-[#1a3a2a] rounded-lg overflow-hidden"
                  style={{ boxShadow: "0 0 30px rgba(0,255,255,0.03), inset 0 0 30px rgba(0,0,0,0.3)" }}
                >
                  <div className="bg-[#0a1510] border-b border-[#1a3a2a] px-4 py-2 flex items-center justify-between">
                    <TerminalPrompt><span className="text-green-400">./target-config</span> --mode=attack</TerminalPrompt>
                    <span className="text-[9px] text-gray-700">bash</span>
                  </div>

                  <div className="p-5 md:p-6 space-y-5">
                    <div className="flex items-center gap-2 mb-2">
                      {[0,1,2].map(i => (
                        <React.Fragment key={i}>
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all ${configStep > i ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(0,255,255,0.4)]' : configStep === i ? 'border border-cyan-500 text-cyan-400 shadow-[0_0_8px_rgba(0,255,255,0.15)]' : 'border border-gray-700 text-gray-600'}`}>
                            {configStep > i ? '✓' : i + 1}
                          </div>
                          {i < 2 && <div className={`h-px flex-1 transition-colors ${configStep > i ? 'bg-cyan-500/50' : 'bg-gray-800'}`} />}
                        </React.Fragment>
                      ))}
                      <span className="text-[9px] text-gray-600 ml-2 uppercase">
                        {configStep === 0 ? 'Password' : configStep === 1 ? 'Intel' : 'Ready'}
                      </span>
                    </div>

                    <AnimatePresence mode="wait">
                      {configStep === 0 && (
                        <motion.div key="s0" initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:20}}>
                          <label className="block text-[10px] text-cyan-500/70 uppercase tracking-widest mb-2">
                            <span className="text-gray-600">$</span> Set target password
                          </label>
                          <input
                            type="text" value={password} onChange={(e)=>setPassword(e.target.value)}
                            className="w-full bg-[#050a08] border border-[#1a3a2a] px-4 py-3 text-lg text-cyan-300 focus:border-cyan-500 outline-none tracking-[0.2em] text-center font-bold placeholder-gray-800 transition-all"
                            style={{ boxShadow: password ? "0 0 20px rgba(0,255,255,0.05)" : "none" }}
                            placeholder="••••••••"
                            autoFocus
                          />
                          {password && (
                            <motion.div initial={{opacity:0}} animate={{opacity:1}} className="mt-3 space-y-2">
                              <div className="flex items-center gap-3">
                                <div className="h-2 flex-1 bg-gray-900 overflow-hidden rounded-full border border-gray-800">
                                  <motion.div className={`h-full rounded-full ${strengthBarColor}`} animate={{width:`${passwordStrength}%`}} transition={{duration:0.3}} />
                                </div>
                                <span className="text-xs text-gray-500 w-10 text-right">{passwordStrength}%</span>
                              </div>
                              <div className="flex items-center justify-between text-[10px]">
                                <span className={`px-2 py-0.5 border rounded ${vulnColor}`}>
                                  {vulnerabilityLevel === 'none' ? 'SECURE' : vulnerabilityLevel.toUpperCase()}
                                </span>
                                <span className="text-gray-600">Crack time: <span className="text-gray-400">{calculateCrackTime()}</span></span>
                              </div>
                            </motion.div>
                          )}
                          <div className="mt-4 flex justify-end">
                            <button onClick={()=>password && setConfigStep(1)} disabled={!password} className="px-6 py-2 text-[10px] uppercase tracking-widest border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all disabled:opacity-20 disabled:cursor-not-allowed cursor-pointer rounded-sm">
                              Continue →
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {configStep === 1 && (
                        <motion.div key="s1" initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:20}}>
                          <label className="block text-[10px] text-cyan-500/70 uppercase tracking-widest mb-3">
                            <span className="text-gray-600">$</span> Gather leaked intel <span className="text-gray-700">(optional, makes attack smarter)</span>
                          </label>
                          <div className="space-y-3 bg-[#050a08] border border-[#1a3a2a] p-4 rounded">
                            <div className="flex items-center gap-2 text-[10px] text-yellow-500/70 mb-2">
                              <span>⚠</span> This simulates data leaked from social media / breaches
                            </div>
                            <div className="relative">
                              <span className="absolute left-0 top-0 text-[10px] text-gray-700">name&gt;</span>
                              <input type="text" value={userInfo.name} onChange={(e)=>setUserInfo({...userInfo,name:e.target.value})} className="w-full bg-transparent border-b border-gray-800 pl-10 pr-1 py-1.5 focus:border-cyan-500 outline-none text-sm text-green-400 placeholder-gray-800 transition-colors" placeholder="John Doe" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="relative">
                                <span className="absolute left-0 top-0 text-[10px] text-gray-700">dob&gt;</span>
                                <input type="date" value={userInfo.dob} onChange={(e)=>setUserInfo({...userInfo,dob:e.target.value})} className="w-full bg-transparent border-b border-gray-800 pl-8 pr-1 py-1.5 focus:border-cyan-500 outline-none text-sm text-green-400 text-gray-600 transition-colors" />
                              </div>
                              <div className="relative">
                                <span className="absolute left-0 top-0 text-[10px] text-gray-700">tel&gt;</span>
                                <input type="tel" value={userInfo.phone} onChange={(e)=>setUserInfo({...userInfo,phone:e.target.value})} className="w-full bg-transparent border-b border-gray-800 pl-8 pr-1 py-1.5 focus:border-cyan-500 outline-none text-sm text-green-400 placeholder-gray-800 transition-colors" placeholder="+1..." />
                              </div>
                            </div>
                          </div>
                          <div className="mt-4 flex justify-between">
                            <button onClick={()=>setConfigStep(0)} className="px-6 py-2 text-[10px] uppercase tracking-widest border border-gray-800 text-gray-500 hover:border-gray-600 transition-all cursor-pointer rounded-sm">← Back</button>
                            <button onClick={()=>setConfigStep(2)} className="px-6 py-2 text-[10px] uppercase tracking-widest border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-all cursor-pointer rounded-sm">Continue →</button>
                          </div>
                        </motion.div>
                      )}

                      {configStep === 2 && (
                        <motion.div key="s2" initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:20}}>
                          <div className="bg-[#050a08] border border-[#1a3a2a] p-4 rounded space-y-2 text-xs">
                            <div className="text-[10px] text-gray-600 uppercase tracking-widest mb-3">Attack Summary</div>
                            <div className="flex justify-between"><span className="text-gray-600">Password:</span><span className="text-cyan-400 tracking-widest font-bold">{'*'.repeat(password.length)}</span></div>
                            <div className="flex justify-between"><span className="text-gray-600">Strength:</span><span className={`${strengthBarColor.replace('bg-','text-')}`}>{passwordStrength}%</span></div>
                            <div className="flex justify-between"><span className="text-gray-600">Vulnerability:</span><span className={vulnColor.split(' ')[0]}>{vulnerabilityLevel.toUpperCase()}</span></div>
                            <div className="flex justify-between"><span className="text-gray-600">Intel gathered:</span><span className="text-yellow-500">{(userInfo.name?1:0)+(userInfo.dob?1:0)+(userInfo.phone?1:0)}/3 sources</span></div>
                            <div className="flex justify-between"><span className="text-gray-600">Dictionary size:</span><span className="text-gray-400">{generateAttackDictionary.length} entries</span></div>
                            <div className="flex justify-between"><span className="text-gray-600">Personal attacks:</span><span className="text-red-400">{generateAttackDictionary.indexOf(password) >= 0 ? `Position #${generateAttackDictionary.indexOf(password) + 1}` : 'Not found'}</span></div>
                          </div>
                          <div className="mt-4 flex justify-between">
                            <button onClick={()=>setConfigStep(1)} className="px-6 py-2 text-[10px] uppercase tracking-widest border border-gray-800 text-gray-500 hover:border-gray-600 transition-all cursor-pointer rounded-sm">← Back</button>
                            <motion.button
                              onClick={()=>{setIntroStep(0);setStage("intro");}}
                              whileHover={{boxShadow:"0 0 30px rgba(255,0,0,0.25)"}}
                              className="px-6 py-2 text-[10px] uppercase tracking-widest border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-all cursor-pointer rounded-sm"
                            >
                              ⚡ Launch Attack
                            </motion.button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ===== INTRO ===== */}
          {stage === "intro" && (
            <motion.div key="intro" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="w-full h-full flex flex-col justify-end p-4 md:p-8 relative">
              {/* Mascots at top - MUCH BIGGER */}
              <div className="absolute top-6 md:top-8 left-0 right-0 flex justify-between items-start px-6 md:px-16 pointer-events-none">
                <GameMascot type="system" isActive={dialogueSequence[introStep]?.speaker==='system'} />
                <GameMascot type="student" isActive={dialogueSequence[introStep]?.speaker==='student'} />
              </div>

              {/* Connection line between mascots */}
              <div className="absolute top-[140px] md:top-[180px] left-[15%] right-[15%] h-px pointer-events-none">
                <div className="w-full h-full bg-gradient-to-r from-cyan-500/20 via-gray-800/30 to-purple-500/20" />
                <motion.div
                  className="absolute top-0 w-8 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, cyan, transparent)" }}
                  animate={{ left: ["0%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>

              <motion.div key={introStep} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:0.3}} className="max-w-3xl mx-auto w-full relative z-10">
                <div className={`border backdrop-blur-sm ${dialogueSequence[introStep]?.speaker==='system' ? 'border-cyan-500/30 bg-cyan-950/30' : 'border-purple-500/30 bg-purple-950/30'} rounded-lg overflow-hidden`}
                  style={{ boxShadow: dialogueSequence[introStep]?.speaker==='system' ? "0 0 30px rgba(0,255,255,0.05)" : "0 0 30px rgba(168,85,247,0.05)" }}
                >
                  <div className={`px-4 py-2 flex items-center gap-2 text-[10px] uppercase tracking-widest ${dialogueSequence[introStep]?.speaker==='system' ? 'bg-cyan-500/10 text-cyan-400' : 'bg-purple-500/10 text-purple-400'}`}>
                    <div className={`w-1.5 h-1.5 rounded-full ${dialogueSequence[introStep]?.speaker==='system' ? 'bg-cyan-400 shadow-[0_0_4px_rgba(0,255,255,0.5)]' : 'bg-purple-400 shadow-[0_0_4px_rgba(168,85,247,0.5)]'}`} />
                    {dialogueSequence[introStep]?.speaker==='system' ? 'System AI' : 'Student'}
                    <span className="ml-auto text-[8px] opacity-50">{introStep + 1}/{dialogueSequence.length}</span>
                  </div>
                  <div className="p-4 md:p-6">
                    <p className="text-sm md:text-xl text-gray-200 leading-relaxed font-light">
                      <TypingText text={dialogueSequence[introStep]?.text || ""} speed={18} />
                    </p>
                    <div className="flex items-center gap-3 mt-4">
                      <div className="flex-1 h-0.5 bg-gray-800/50 rounded overflow-hidden">
                        <motion.div className={`h-full ${dialogueSequence[introStep]?.speaker==='system' ? 'bg-cyan-500/50' : 'bg-purple-500/50'}`} initial={{width:"0%"}} animate={{width:"100%"}} transition={{duration:3.5,ease:"linear"}} />
                      </div>
                      <span className="text-[8px] text-gray-700 uppercase">auto</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}

          {/* ===== BATTLE ===== */}
          {stage === "battle" && !gameResult && (
            <motion.div key="battle" initial={{opacity:0}} animate={{opacity:1}} className="w-full h-full relative flex flex-col">
              {/* Status bar */}
              <div className="flex items-center justify-between px-3 md:px-6 py-2.5 bg-black/50 border-b border-[#1a3a2a] relative z-10 backdrop-blur-sm">
                <div className="flex items-center gap-3 md:gap-6">
                  <div>
                    <div className="text-[8px] text-gray-600 uppercase tracking-widest">Attempts</div>
                    <div className="text-sm md:text-xl font-bold text-white tabular-nums">{attemptIndex}<span className="text-gray-600 text-xs">/{totalAttempts}</span></div>
                  </div>
                  <div className="w-px h-6 bg-gray-800/50" />
                  <div>
                    <div className="text-[8px] text-gray-600 uppercase tracking-widest">Speed</div>
                    <div className="text-sm md:text-xl font-bold text-cyan-400">{attemptsPerSecond}<span className="text-gray-600 text-xs">/s</span></div>
                  </div>
                  <div className="w-px h-6 bg-gray-800/50 hidden md:block" />
                  <div className="hidden md:block">
                    <div className="text-[8px] text-gray-600 uppercase tracking-widest">Phase</div>
                    <div className="text-[10px] font-bold text-yellow-400 uppercase tracking-wider">
                      {attemptIndex <= 50 ? '⚡ Personal' : attemptIndex <= 500 ? '📕 Dictionary' : '🔨 Brute Force'}
                    </div>
                  </div>
                </div>
                <div className="text-center">
                  <div className={`text-[9px] px-2.5 py-1 border rounded ${vulnColor} uppercase tracking-wider font-bold`}>
                    {vulnerabilityLevel === 'none' ? '🛡️ Secure' : `⚠️ ${vulnerabilityLevel}`}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[8px] text-gray-600 uppercase tracking-widest">Time</div>
                  <div className={`text-sm md:text-xl font-bold tabular-nums ${timeLeft <= 10 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
                    {timeLeft}<span className="text-gray-600 text-xs">s</span>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center justify-center p-3 md:p-6 gap-4 md:gap-6 overflow-hidden">
                {/* Current attempt display */}
                <div className="text-center">
                  <div className="text-[9px] text-gray-600 uppercase tracking-[0.3em] mb-3">Currently Testing</div>
                  <motion.div
                    className={`text-2xl md:text-5xl font-bold tracking-[0.2em] transition-all duration-200 px-4 py-2 rounded ${
                      currentAttempt && currentAttempt.toLowerCase() === password.toLowerCase()
                        ? 'text-red-500 bg-red-500/10 border border-red-500/30'
                        : 'text-cyan-300'
                    }`}
                    style={{
                      textShadow: currentAttempt && currentAttempt.toLowerCase() === password.toLowerCase()
                        ? "0 0 40px rgba(255,0,0,0.5), 0 0 80px rgba(255,0,0,0.3)"
                        : "0 0 30px rgba(0,255,255,0.15)",
                    }}
                    animate={isCracking ? {opacity:[0.7,1,0.7]} : {opacity:1}}
                    transition={{duration:0.3,repeat:isCracking?Infinity:0}}
                  >
                    {currentAttempt || "INITIALIZING..."}
                  </motion.div>
                  {currentAttempt && currentAttempt.toLowerCase() === password.toLowerCase() && (
                    <motion.div initial={{opacity:0,scale:0.5}} animate={{opacity:1,scale:1}} className="text-red-500 text-lg md:text-2xl mt-3 font-bold tracking-widest">
                      ⚡ MATCH FOUND ⚡
                    </motion.div>
                  )}
                </div>

                {/* Progress bar */}
                <div className="w-full max-w-xl">
                  <div className="h-1.5 bg-gray-900/50 overflow-hidden rounded-full border border-gray-800/50">
                    <motion.div className={`h-full rounded-full ${strengthBarColor}`} animate={{width:`${(attemptIndex/totalAttempts)*100}%`}} transition={{duration:0.2}} />
                  </div>
                  <div className="flex justify-between mt-1 text-[8px] text-gray-700">
                    <span>{Math.round((attemptIndex/totalAttempts)*100)}% scanned</span>
                    <span>Dictionary: {totalAttempts.toLocaleString()} words</span>
                  </div>
                </div>

                {/* Attack log */}
                <div className="w-full max-w-xl flex-1 min-h-0 max-h-[250px] overflow-hidden">
                  <div className="h-full bg-black/70 border border-[#1a3a2a] rounded overflow-hidden flex flex-col"
                    style={{ boxShadow: "inset 0 0 20px rgba(0,0,0,0.4)" }}
                  >
                    <div className="px-3 py-1.5 bg-[#0a1510] border-b border-[#1a3a2a] flex items-center justify-between">
                      <span className="text-[9px] text-gray-600 uppercase tracking-widest">Attack Log</span>
                      <motion.div className="flex items-center gap-1" animate={{opacity:[0.3,1,0.3]}} transition={{duration:1,repeat:Infinity}}>
                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_4px_rgba(255,0,0,0.5)]" />
                        <span className="text-[8px] text-red-500/70 uppercase">Live</span>
                      </motion.div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-0.5 scrollbar-thin">
                      {crackedPasswords.map((pwd, i) => {
                        const isMatch = pwd.toLowerCase() === password.toLowerCase();
                        return (
                          <motion.div
                            key={i}
                            initial={{opacity:0,x:-10}}
                            animate={{opacity:1,x:0}}
                            transition={{duration:0.1}}
                            className={`text-[11px] flex items-center gap-2 px-1.5 py-0.5 rounded ${isMatch ? 'text-red-400 bg-red-500/15' : 'text-gray-500'}`}
                          >
                            <span className="text-gray-700 w-10 text-right flex-shrink-0 text-[9px]">#{attemptIndex - crackedPasswords.length + i + 1}</span>
                            <span className="font-mono tracking-wider flex-1 truncate">{pwd}</span>
                            <span className={`text-[9px] flex-shrink-0 font-bold ${isMatch ? 'text-red-400' : 'text-gray-700'}`}>
                              {isMatch ? '✓ MATCH' : '✗ FAIL'}
                            </span>
                          </motion.div>
                        );
                      })}
                      {isCracking && (
                        <div className="text-[11px] text-gray-700 flex items-center gap-2 px-1.5 py-0.5">
                          <span className="text-gray-800 w-10 text-right flex-shrink-0 text-[9px]">...</span>
                          <motion.span animate={{opacity:[0.3,0.8,0.3]}} transition={{duration:0.5,repeat:Infinity}}>Scanning...</motion.span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <AnimatePresence>
                {showWarning && (
                  <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="absolute inset-0 flex items-center justify-center bg-black/90 backdrop-blur-md z-50">
                    <motion.div initial={{scale:0.5,opacity:0}} animate={{scale:1,opacity:1}} transition={{type:"spring",stiffness:200}}
                      className="text-center p-10 border border-red-500/40 bg-red-950/30 rounded-xl"
                      style={{ boxShadow: "0 0 60px rgba(255,0,0,0.15), 0 0 120px rgba(255,0,0,0.05)" }}
                    >
                      <div className="text-5xl md:text-7xl font-black text-red-500 uppercase tracking-[0.2em] mb-4"
                        style={{ textShadow: "0 0 40px rgba(255,0,0,0.5), 0 0 80px rgba(255,0,0,0.3)" }}
                      >BREACHED</div>
                      <div className="text-gray-400 text-sm">Cracked in <span className="text-white font-bold text-lg">{attemptIndex}</span> attempts</div>
                      <div className="text-cyan-400 text-xs mt-2">Match: <span className="font-mono bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">"{matchedAttempt}"</span></div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* ===== RESULTS ===== */}
          {gameResult && (
            <motion.div key="results" initial={{opacity:0}} animate={{opacity:1}} className="w-full h-full overflow-y-auto p-4 md:p-8 scrollbar-thin">
              <div className="max-w-3xl mx-auto">
                <div className="text-center mb-6 pt-4">
                  {gameResult === "win" ? (
                    <>
                      <motion.div
                        initial={{scale:0}}
                        animate={{scale:1}}
                        transition={{type:"spring",stiffness:150,delay:0.2}}
                        className="text-5xl md:text-7xl font-black text-cyan-400 uppercase tracking-[0.2em] mb-3"
                        style={{ textShadow: "0 0 40px rgba(0,255,255,0.4), 0 0 80px rgba(0,255,255,0.2)" }}
                      >SECURE</motion.div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest">All {attemptIndex.toLocaleString()} attempts failed • Time survived: {30-timeLeft}s</div>
                    </>
                  ) : (
                    <>
                      <motion.div
                        initial={{scale:0}}
                        animate={{scale:1}}
                        transition={{type:"spring",stiffness:150,delay:0.2}}
                        className="text-5xl md:text-7xl font-black text-red-500 uppercase tracking-[0.2em] mb-3"
                        style={{ textShadow: "0 0 40px rgba(255,0,0,0.4), 0 0 80px rgba(255,0,0,0.2)" }}
                      >BREACHED</motion.div>
                      <div className="text-xs text-gray-500 uppercase tracking-widest">Compromised in {attemptIndex} attempts • Time: {30-timeLeft}s</div>
                      {matchedAttempt && <div className="text-xs text-cyan-400/70 mt-1">Match: <span className="font-mono bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">"{matchedAttempt}"</span></div>}
                    </>
                  )}
                </div>

                {/* Stats grid */}
                <div className="bg-black/50 border border-[#1a3a2a] rounded-lg p-4 mb-6"
                  style={{ boxShadow: "inset 0 0 30px rgba(0,0,0,0.3)" }}
                >
                  <div className="text-[9px] text-gray-600 uppercase tracking-widest mb-3">Debrief Report</div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label:"Password", value: password, cls: gameResult==='win'?'text-cyan-400':'text-red-400' },
                      { label:"Attempts", value: attemptIndex.toLocaleString(), cls:"text-white" },
                      { label:"Time", value: `${30-timeLeft}s`, cls:"text-white" },
                      { label:"Vuln Level", value: vulnerabilityLevel==='none'?'NONE':vulnerabilityLevel.toUpperCase(), cls:vulnColor.split(' ')[0] },
                    ].map((s,i) => (
                      <div key={i} className="bg-[#050a08] border border-[#1a3a2a] p-3 rounded text-center"
                        style={{ boxShadow: "inset 0 0 10px rgba(0,0,0,0.3)" }}
                      >
                        <div className="text-[8px] text-gray-600 uppercase tracking-wider mb-1">{s.label}</div>
                        <div className={`text-sm font-bold ${s.cls} truncate`}>{s.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Why it failed */}
                {gameResult === "lose" && (
                  <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.3}}
                    className="bg-red-950/20 border border-red-500/20 p-4 rounded-lg mb-6"
                    style={{ boxShadow: "0 0 20px rgba(255,0,0,0.05)" }}
                  >
                    <div className="text-[10px] text-red-400 font-bold uppercase tracking-widest mb-2">⚠ Why It Failed</div>
                    <ul className="text-[11px] text-gray-400 space-y-1.5">
                      {vulnerabilityLevel === 'high' ? (
                        <>
                          <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">›</span>Contains common patterns or dictionary words</li>
                          <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">›</span>Uses personal information (name, DOB, phone) found in data leaks</li>
                          <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">›</span>Too short or lacks character variety (special chars, mixed case)</li>
                          <li className="flex items-start gap-2"><span className="text-red-500 mt-0.5">›</span>Attackers build <span className="text-red-300 font-bold">targeted dictionaries</span> from your social media before trying generic passwords</li>
                        </>
                      ) : (
                        <>
                          <li className="flex items-start gap-2"><span className="text-yellow-500 mt-0.5">›</span>Moderate complexity but predictable structure</li>
                          <li className="flex items-start gap-2"><span className="text-yellow-500 mt-0.5">›</span>Targeted attack vectors exploited weak patterns</li>
                          <li className="flex items-start gap-2"><span className="text-yellow-500 mt-0.5">›</span>A dedicated attacker with your personal data can crack this</li>
                        </>
                      )}
                    </ul>
                  </motion.div>
                )}

                {/* Security tips */}
                <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.5}} className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-cyan-500 text-sm">◈</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Security Recommendations</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {SECURITY_TIPS.map((tip,i) => (
                      <motion.div
                        key={i}
                        initial={{opacity:0,x:-10}}
                        animate={{opacity:1,x:0}}
                        transition={{delay:0.6 + i * 0.08}}
                        className="bg-black/40 border border-gray-800/50 p-3 rounded flex gap-3 items-start hover:border-cyan-500/20 transition-colors"
                      >
                        <span className="text-xl">{tip.icon}</span>
                        <div>
                          <div className="text-[10px] font-bold text-cyan-400/80 uppercase tracking-wider">{tip.title}</div>
                          <div className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">{tip.desc}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                <motion.button
                  onClick={resetGame}
                  whileHover={{scale:1.01,boxShadow:"0 0 30px rgba(0,255,255,0.15)"}}
                  whileTap={{scale:0.99}}
                  className="w-full py-3.5 border border-cyan-500/30 text-cyan-400 text-[10px] uppercase tracking-[0.3em] hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all cursor-pointer mb-4 rounded-sm"
                >
                  ↻ New Attack
                </motion.button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </ComputerFrame>

      <style jsx global>{`
        .animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }
        @keyframes shake {
          10%,90%{transform:translate3d(-1px,0,0)} 20%,80%{transform:translate3d(2px,0,0)}
          30%,50%,70%{transform:translate3d(-4px,0,0)} 40%,60%{transform:translate3d(4px,0,0)}
        }
        .scrollbar-thin::-webkit-scrollbar { width: 4px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #1a3a2a; border-radius: 2px; }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover { background: #2a5a3a; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(0.3); cursor: pointer; }
        * { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
      `}</style>
    </div>
  );
}