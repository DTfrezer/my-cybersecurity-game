// // import React, { useState, useEffect, useCallback } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';

// // const PHISH_HUNTER_GAME = () => {
// //   // Game States
// //   const [stage, setStage] = useState('menu'); // menu, tutorial, battle, results
// //   const [currentEmail, setCurrentEmail] = useState(null);
// //   const [emailIndex, setEmailIndex] = useState(0);
// //   const [score, setScore] = useState(0);
// //   const [streak, setStreak] = useState(0);
// //   const [securityLevel, setSecurityLevel] = useState(100);
// //   const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
// //   const [gameResult, setGameResult] = useState(null);
// //   const [analyzedEmails, setAnalyzedEmails] = useState([]);
// //   const [showAnalysis, setShowAnalysis] = useState(false);
// //   const [selectedTool, setSelectedTool] = useState(null);
// //   const [tutorialStep, setTutorialStep] = useState(0);
// //   const [isPaused, setIsPaused] = useState(false);

// //   // Email Database
// //   const emailDatabase = [
// //     // Batch 1: Obvious Phishing
// //     {
// //       id: 1,
// //       batch: 1,
// //       from: "support@netfliix.com",
// //       fromDisplay: "Netflix Support",
// //       subject: "URGENT: Account Suspension!",
// //       preview: "Your account will be suspended...",
// //       isPhishing: true,
// //       content: {
// //         greeting: "Dear Customer,",
// //         body: "Your Netflix account will be SUSPENDED in 24 hours due to payment issues. Click below to update your payment information immediately.",
// //         button: "UPDATE PAYMENT NOW",
// //         link: "http://netfliix-secure.com/update",
// //         attachments: []
// //       },
// //       analysis: {
// //         redFlags: ["Misspelled domain (netfliix)", "Urgency tactics", "Generic greeting", "HTTP link (not secure)"],
// //         headers: {
// //           spf: "FAIL",
// //           dkim: "NONE",
// //           location: "Nigeria (VPN detected)"
// //         },
// //         linkAnalysis: {
// //           displayText: "UPDATE PAYMENT NOW",
// //           actualURL: "http://netfliix-secure.com/update",
// //           risk: "HIGH"
// //         }
// //       }
// //     },
// //     {
// //       id: 2,
// //       batch: 1,
// //       from: "security@paypal.com",
// //       fromDisplay: "PayPal Security",
// //       subject: "Verify Your Account",
// //       preview: "We need to verify your account...",
// //       isPhishing: true,
// //       content: {
// //         greeting: "Dear User,",
// //         body: "We've detected suspicious activity on your PayPal account. Please verify your identity to prevent permanent suspension.",
// //         button: "VERIFY NOW",
// //         link: "https://paypal-secure.info/login",
// //         attachments: []
// //       },
// //       analysis: {
// //         redFlags: ["Generic greeting", "Suspicious domain (.info)", "Unsolicited verification request"],
// //         headers: {
// //           spf: "SOFTFAIL",
// //           dkim: "FAIL",
// //           location: "Unknown"
// //         },
// //         linkAnalysis: {
// //           displayText: "VERIFY NOW",
// //           actualURL: "https://paypal-secure.info/login",
// //           risk: "HIGH"
// //         }
// //       }
// //     },
// //     {
// //       id: 3,
// //       batch: 1,
// //       from: "no-reply@amazon.com",
// //       fromDisplay: "Amazon",
// //       subject: "Your Order #123-4567890",
// //       preview: "Your package has been shipped...",
// //       isPhishing: false,
// //       content: {
// //         greeting: "Hello John,",
// //         body: "Your order has been shipped and will arrive by Friday. You can track your package using the link below.",
// //         button: "TRACK PACKAGE",
// //         link: "https://amazon.com/track/123-4567890",
// //         attachments: ["invoice.pdf"]
// //       },
// //       analysis: {
// //         redFlags: [],
// //         headers: {
// //           spf: "PASS",
// //           dkim: "PASS",
// //           location: "USA (Amazon Server)"
// //         },
// //         linkAnalysis: {
// //           displayText: "TRACK PACKAGE",
// //           actualURL: "https://amazon.com/track/123-4567890",
// //           risk: "LOW"
// //         }
// //       }
// //     },
// //     // Batch 2: Sophisticated Phishing
// //     {
// //       id: 4,
// //       batch: 2,
// //       from: "john.smith@company.com",
// //       fromDisplay: "John Smith (CEO)",
// //       subject: "Quick Request - Urgent",
// //       preview: "I need you to handle this...",
// //       isPhishing: true,
// //       content: {
// //         greeting: "Hi,",
// //         body: "I'm in a meeting and need you to urgently purchase gift cards for client appreciation. Please buy $500 in Apple gift cards and send me the codes immediately.",
// //         button: "VIEW DETAILS",
// //         link: "https://company-docs.com/urgent-request",
// //         attachments: ["client_list.xlsx"]
// //       },
// //       analysis: {
// //         redFlags: ["Unusual request (gift cards)", "Urgency from CEO", "External document link", "Request for codes via email"],
// //         headers: {
// //           spf: "PASS",
// //           dkim: "FAIL",
// //           location: "Spoofed - Actual sender: hacker@tempmail.com"
// //         },
// //         linkAnalysis: {
// //           displayText: "VIEW DETAILS",
// //           actualURL: "https://company-docs.com/urgent-request",
// //           risk: "CRITICAL"
// //         }
// //       }
// //     },
// //     {
// //       id: 5,
// //       batch: 2,
// //       from: "hr@company.com",
// //       fromDisplay: "HR Department",
// //       subject: "Annual Bonus Announcement",
// //       preview: "Congratulations on your bonus...",
// //       isPhishing: false,
// //       content: {
// //         greeting: "Dear Team Member,",
// //         body: "We're pleased to announce your annual bonus has been processed. Please log into the HR portal to view your details and update tax information.",
// //         button: "VIEW BONUS DETAILS",
// //         link: "https://hr.company.com/bonus-2024",
// //         attachments: ["bonus_statement.pdf"]
// //       },
// //       analysis: {
// //         redFlags: [],
// //         headers: {
// //           spf: "PASS",
// //           dkim: "PASS",
// //           location: "Company Server"
// //         },
// //         linkAnalysis: {
// //           displayText: "VIEW BONUS DETAILS",
// //           actualURL: "https://hr.company.com/bonus-2024",
// //           risk: "LOW"
// //         }
// //       }
// //     },
// //     // Batch 3: Advanced Threats
// //     {
// //       id: 6,
// //       batch: 3,
// //       from: "microsoft@teams-notification.com",
// //       fromDisplay: "Microsoft Teams",
// //       subject: "New Meeting Invite",
// //       preview: "You've been invited to a meeting...",
// //       isPhishing: true,
// //       content: {
// //         greeting: "Hello,",
// //         body: "You've been invited to an urgent meeting. Please scan the QR code below to join immediately from your mobile device.",
// //         button: "",
// //         link: "",
// //         qrCode: true,
// //         attachments: []
// //       },
// //       analysis: {
// //         redFlags: ["QR code instead of link", "Suspicious domain", "Unusual meeting method", "Mobile-only access"],
// //         headers: {
// //           spf: "FAIL",
// //           dkim: "NONE",
// //           location: "Unknown (Cloudflare hidden)"
// //         },
// //         linkAnalysis: {
// //           displayText: "QR Code",
// //           actualURL: "phishing-site.com/steam-credentials",
// //           risk: "CRITICAL"
// //         }
// //       }
// //     },
// //     {
// //       id: 7,
// //       batch: 3,
// //       from: "bank@security-alert.com",
// //       fromDisplay: "Bank Security Alert",
// //       subject: "Suspicious Login Attempt",
// //       preview: "We detected a login attempt...",
// //       isPhishing: true,
// //       content: {
// //         greeting: "Dear Valued Customer,",
// //         body: "We detected a login attempt from a new device. If this wasn't you, please click below to secure your account and enable two-factor authentication.",
// //         button: "SECURE ACCOUNT",
// //         link: "https://bank-security-alert.com/secure",
// //         attachments: []
// //       },
// //       analysis: {
// //         redFlags: ["Unusual domain", "Fake security alert", "MFA bypass attempt", "No bank name specified"],
// //         headers: {
// //           spf: "FAIL",
// //           dkim: "NONE",
// //           location: "Datacenter in Russia"
// //         },
// //         linkAnalysis: {
// //           displayText: "SECURE ACCOUNT",
// //           actualURL: "https://bank-security-alert.com/secure",
// //           risk: "CRITICAL"
// //         }
// //       }
// //     }
// //   ];

// //   // Tutorial Steps
// //   const tutorialSteps = [
// //     {
// //       title: "Welcome to Phish Hunter!",
// //       content: "You're a Cyber Security Analyst. Your mission: Identify phishing attacks before they breach our systems.",
// //       highlight: null
// //     },
// //     {
// //       title: "Analyze the Email",
// //       content: "Look at the sender, subject, and content. Use your investigation tools to check for red flags.",
// //       highlight: "email"
// //     },
// //     {
// //       title: "Use Investigation Tools",
// //       content: "Click on 🔍 Link Inspector, 📧 Header Analysis, or 🚨 Red Flag Detector to analyze the email thoroughly.",
// //       highlight: "tools"
// //     },
// //     {
// //       title: "Make Your Decision",
// //       content: "Decide if the email is LEGITIMATE or PHISHING. Correct decisions earn points and maintain security level.",
// //       highlight: "decision"
// //     },
// //     {
// //       title: "Protect the Company!",
// //       content: "Wrong decisions lower security level. If it reaches 0, the company is breached! Good luck, Hunter!",
// //       highlight: null
// //     }
// //   ];

// //   // Initialize Game
// //   const startGame = useCallback(() => {
// //     setStage('battle');
// //     setEmailIndex(0);
// //     setScore(0);
// //     setStreak(0);
// //     setSecurityLevel(100);
// //     setTimeLeft(180);
// //     setAnalyzedEmails([]);
// //     setCurrentEmail(emailDatabase[0]);
// //   }, []);

// //   // Timer Effect
// //   useEffect(() => {
// //     if (stage === 'battle' && timeLeft > 0 && !isPaused) {
// //       const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
// //       return () => clearTimeout(timer);
// //     } else if (timeLeft === 0 && stage === 'battle') {
// //       endGame();
// //     }
// //   }, [timeLeft, stage, isPaused]);

// //   // Handle Email Decision
// //   const handleDecision = (isPhishing) => {
// //     const correct = currentEmail.isPhishing === isPhishing;
// //     let points = 0;
// //     let securityChange = 0;

// //     if (correct) {
// //       points = isPhishing ? 100 : 50;
// //       securityChange = 0;
// //       setStreak(streak + 1);
// //       if (streak >= 2) points += 25; // Streak bonus
// //     } else {
// //       points = -200;
// //       securityChange = -20;
// //       setStreak(0);
// //     }

// //     setScore(Math.max(0, score + points));
// //     setSecurityLevel(Math.max(0, Math.min(100, securityLevel + securityChange)));
    
// //     setAnalyzedEmails([...analyzedEmails, {
// //       ...currentEmail,
// //       userDecision: isPhishing,
// //       correct: correct,
// //       points: points
// //     }]);

// //     // Next Email
// //     const nextIndex = emailIndex + 1;
// //     if (nextIndex < emailDatabase.length && securityLevel > 0) {
// //       setTimeout(() => {
// //         setEmailIndex(nextIndex);
// //         setCurrentEmail(emailDatabase[nextIndex]);
// //         setShowAnalysis(false);
// //         setSelectedTool(null);
// //       }, 1500);
// //     } else {
// //       endGame();
// //     }
// //   };

// //   // End Game
// //   const endGame = () => {
// //     setStage('results');
// //     setGameResult(securityLevel > 0 ? 'win' : 'lose');
// //   };

// //   // Reset Game
// //   const resetGame = () => {
// //     setStage('menu');
// //     setCurrentEmail(null);
// //     setEmailIndex(0);
// //     setScore(0);
// //     setStreak(0);
// //     setSecurityLevel(100);
// //     setTimeLeft(180);
// //     setGameResult(null);
// //     setAnalyzedEmails([]);
// //     setShowAnalysis(false);
// //     setSelectedTool(null);
// //   };

// //   // Format Time
// //   const formatTime = (seconds) => {
// //     const mins = Math.floor(seconds / 60);
// //     const secs = seconds % 60;
// //     return `${mins}:${secs.toString().padStart(2, '0')}`;
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
// //       {/* Background Animation */}
// //       <div className="absolute inset-0">
// //         {[...Array(20)].map((_, i) => (
// //           <div
// //             key={i}
// //             className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-30"
// //             style={{
// //               left: `${Math.random() * 100}%`,
// //               top: `${Math.random() * 100}%`,
// //               animation: `float ${10 + Math.random() * 20}s linear infinite`,
// //               animationDelay: `${Math.random() * 10}s`
// //             }}
// //           />
// //         ))}
// //       </div>

// //       <div className="relative z-10 w-full h-full">
// //         <AnimatePresence mode="wait">
          
// //           {/* MENU STAGE */}
// //           {stage === 'menu' && (
// //             <motion.div 
// //               key="menu"
// //               initial={{ opacity: 0, scale: 0.9 }}
// //               animate={{ opacity: 1, scale: 1 }}
// //               exit={{ opacity: 0, scale: 1.1 }}
// //               className="w-full h-full flex flex-col items-center justify-center p-4"
// //             >
// //               <div className="text-center">
// //                 {/* Logo */}
// //                 <div className="relative w-32 h-32 mx-auto mb-6">
// //                   <motion.div 
// //                     className="absolute inset-0 border-4 border-blue-500 rounded-full"
// //                     animate={{ rotate: 360 }}
// //                     transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
// //                   />
// //                   <div className="absolute inset-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.5)]">
// //                     <span className="text-4xl">🎣</span>
// //                   </div>
// //                 </div>

// //                 <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-2 tracking-wider">
// //                   PHISH HUNTER
// //                 </h1>
// //                 <p className="text-blue-400 text-sm mb-8 uppercase tracking-widest">
// //                   Cyber Security Analyst Training
// //                 </p>

// //                 <div className="space-y-4">
// //                   <motion.button
// //                     onClick={() => setStage('tutorial')}
// //                     whileHover={{ scale: 1.05, boxShadow: "0px 0px 30px rgba(59,130,246,0.5)" }}
// //                     whileTap={{ scale: 0.95 }}
// //                     className="px-12 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-black font-bold text-lg uppercase tracking-widest rounded-lg shadow-2xl"
// //                   >
// //                     Start Training
// //                   </motion.button>
                  
// //                   <div className="text-center text-xs text-gray-500 space-y-1">
// //                     <p>🎯 Identify Phishing Attacks</p>
// //                     <p>🛡️ Protect Company Assets</p>
// //                     <p>📈 Master Security Analysis</p>
// //                   </div>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           )}

// //           {/* TUTORIAL STAGE */}
// //           {stage === 'tutorial' && (
// //             <motion.div 
// //               key="tutorial"
// //               initial={{ opacity: 0, x: -50 }}
// //               animate={{ opacity: 1, x: 0 }}
// //               exit={{ opacity: 0, x: 50 }}
// //               className="w-full h-full flex flex-col items-center justify-center p-4"
// //             >
// //               <div className="w-full max-w-2xl">
// //                 <div className="bg-black/60 backdrop-blur-xl border border-blue-900/50 rounded-2xl p-8 shadow-2xl">
// //                   <div className="text-center mb-6">
// //                     <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(59,130,246,0.5)]">
// //                       <span className="text-3xl">🎓</span>
// //                     </div>
// //                     <h2 className="text-2xl font-bold text-blue-400 mb-2">
// //                       {tutorialSteps[tutorialStep].title}
// //                     </h2>
// //                   </div>

// //                   <p className="text-gray-300 text-center mb-8 text-lg">
// //                     {tutorialSteps[tutorialStep].content}
// //                   </p>

// //                   <div className="flex justify-between items-center">
// //                     <button 
// //                       onClick={() => setTutorialStep(Math.max(0, tutorialStep - 1))}
// //                       className="px-6 py-2 border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-300 transition-colors rounded-lg"
// //                     >
// //                       Previous
// //                     </button>

// //                     <div className="flex gap-2">
// //                       {tutorialSteps.map((_, i) => (
// //                         <div
// //                           key={i}
// //                           className={`w-2 h-2 rounded-full transition-all ${
// //                             i === tutorialStep ? 'bg-blue-500 w-8' : 'bg-gray-700'
// //                           }`}
// //                         />
// //                       ))}
// //                     </div>

// //                     {tutorialStep < tutorialSteps.length - 1 ? (
// //                       <button 
// //                         onClick={() => setTutorialStep(tutorialStep + 1)}
// //                         className="px-6 py-2 bg-blue-500 text-black font-bold hover:bg-blue-400 transition-colors rounded-lg"
// //                       >
// //                         Next
// //                       </button>
// //                     ) : (
// //                       <button 
// //                         onClick={startGame}
// //                         className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-black font-bold hover:from-green-400 hover:to-emerald-400 transition-all rounded-lg shadow-lg"
// //                       >
// //                         Start Mission
// //                       </button>
// //                     )}
// //                   </div>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           )}

// //           {/* BATTLE STAGE */}
// //           {stage === 'battle' && currentEmail && (
// //             <motion.div 
// //               key="battle"
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               className="w-full h-full flex flex-col"
// //             >
// //               {/* Header HUD */}
// //               <div className="bg-black/60 backdrop-blur-sm border-b border-blue-900/50 px-6 py-4">
// //                 <div className="flex justify-between items-center">
// //                   <div className="flex items-center gap-6">
// //                     <div>
// //                       <div className="text-xs text-blue-400 uppercase">Score</div>
// //                       <div className="text-2xl font-bold">{score}</div>
// //                     </div>
// //                     <div>
// //                       <div className="text-xs text-blue-400 uppercase">Streak</div>
// //                       <div className="text-2xl font-bold text-yellow-400">{streak}🔥</div>
// //                     </div>
// //                   </div>

// //                   <div className="text-center">
// //                     <div className="text-xs text-blue-400 uppercase mb-1">Security Level</div>
// //                     <div className="w-48 h-3 bg-gray-800 rounded-full overflow-hidden">
// //                       <motion.div 
// //                         className={`h-full transition-all ${
// //                           securityLevel > 60 ? 'bg-green-500' :
// //                           securityLevel > 30 ? 'bg-yellow-500' :
// //                           'bg-red-500'
// //                         }`}
// //                         animate={{ width: `${securityLevel}%` }}
// //                       />
// //                     </div>
// //                     <div className="text-sm mt-1 font-bold">{securityLevel}%</div>
// //                   </div>

// //                   <div className="text-right">
// //                     <div className="text-xs text-blue-400 uppercase">Time</div>
// //                     <div className={`text-2xl font-bold ${timeLeft < 30 ? 'text-red-500 animate-pulse' : ''}`}>
// //                       {formatTime(timeLeft)}
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Email Analysis Area */}
// //               <div className="flex-1 flex">
// //                 {/* Email List */}
// //                 <div className="w-80 bg-black/40 border-r border-blue-900/30 p-4 overflow-y-auto">
// //                   <h3 className="text-xs font-bold text-blue-400 uppercase mb-3">Inbox ({emailDatabase.length})</h3>
// //                   <div className="space-y-2">
// //                     {emailDatabase.map((email, i) => (
// //                       <motion.div
// //                         key={email.id}
// //                         onClick={() => {
// //                           setEmailIndex(i);
// //                           setCurrentEmail(email);
// //                           setShowAnalysis(false);
// //                           setSelectedTool(null);
// //                         }}
// //                         className={`p-3 rounded-lg border cursor-pointer transition-all ${
// //                           i === emailIndex 
// //                             ? 'bg-blue-500/20 border-blue-500' 
// //                             : 'bg-black/40 border-gray-800 hover:border-gray-600'
// //                         } ${i < emailIndex ? 'opacity-50' : ''}`}
// //                         whileHover={{ scale: i === emailIndex ? 1 : 1.02 }}
// //                       >
// //                         <div className="flex justify-between items-start mb-1">
// //                           <span className="text-sm font-bold text-white truncate">
// //                             {email.fromDisplay}
// //                           </span>
// //                           {i < emailIndex && (
// //                             <span className={`text-xs ${analyzedEmails[i]?.correct ? 'text-green-500' : 'text-red-500'}`}>
// //                               {analyzedEmails[i]?.correct ? '✓' : '✗'}
// //                             </span>
// //                           )}
// //                         </div>
// //                         <div className="text-xs text-gray-400 truncate">{email.subject}</div>
// //                         <div className="text-xs text-gray-600 truncate mt-1">{email.preview}</div>
// //                       </motion.div>
// //                     ))}
// //                   </div>
// //                 </div>

// //                 {/* Email Content */}
// //                 <div className="flex-1 p-6 overflow-y-auto">
// //                   <div className="max-w-3xl mx-auto">
// //                     <motion.div 
// //                       className="bg-black/60 backdrop-blur-xl border border-blue-900/50 rounded-xl p-6 shadow-2xl"
// //                       initial={{ opacity: 0, y: 20 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                     >
// //                       {/* Email Header */}
// //                       <div className="border-b border-gray-800 pb-4 mb-4">
// //                         <div className="flex justify-between items-start mb-2">
// //                           <div>
// //                             <h2 className="text-xl font-bold text-white">{currentEmail.subject}</h2>
// //                             <div className="text-sm text-gray-400 mt-1">
// //                               From: <span className="text-blue-400">{currentEmail.fromDisplay}</span> 
// //                               <span className="text-gray-600"> &lt;{currentEmail.from}&gt;</span>
// //                             </div>
// //                           </div>
// //                           <div className={`px-3 py-1 rounded-full text-xs font-bold ${
// //                             currentEmail.batch === 1 ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
// //                             currentEmail.batch === 2 ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30' :
// //                             'bg-purple-500/20 text-purple-400 border border-purple-500/30'
// //                           }`}>
// //                             Batch {currentEmail.batch}
// //                           </div>
// //                         </div>
// //                       </div>

// //                       {/* Email Body */}
// //                       <div className="mb-6">
// //                         <p className="text-gray-300 mb-4">{currentEmail.content.greeting}</p>
// //                         <p className="text-gray-300 mb-4">{currentEmail.content.body}</p>
                        
// //                         {currentEmail.content.button && (
// //                           <div className="my-4">
// //                             <button className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition-colors">
// //                               {currentEmail.content.button}
// //                             </button>
// //                           </div>
// //                         )}

// //                         {currentEmail.content.qrCode && (
// //                           <div className="my-4 p-4 bg-white rounded-lg w-32 h-32 mx-auto flex items-center justify-center">
// //                             <div className="text-black text-xs text-center">QR CODE<br/>(SCAN NOW)</div>
// //                           </div>
// //                         )}

// //                         {currentEmail.content.attachments.length > 0 && (
// //                           <div className="mt-4 p-3 bg-gray-800/50 rounded-lg">
// //                             <div className="text-xs text-gray-500 mb-2">Attachments:</div>
// //                             {currentEmail.content.attachments.map((att, i) => (
// //                               <div key={i} className="text-sm text-blue-400">📎 {att}</div>
// //                             ))}
// //                           </div>
// //                         )}
// //                       </div>

// //                       {/* Investigation Tools */}
// //                       <div className="border-t border-gray-800 pt-4">
// //                         <div className="text-xs text-blue-400 font-bold uppercase mb-3">Investigation Tools:</div>
// //                         <div className="grid grid-cols-3 gap-3">
// //                           <motion.button
// //                             onClick={() => setSelectedTool(selectedTool === 'link' ? null : 'link')}
// //                             whileHover={{ scale: 1.05 }}
// //                             whileTap={{ scale: 0.95 }}
// //                             className={`p-3 rounded-lg border transition-all ${
// //                               selectedTool === 'link' 
// //                                 ? 'bg-blue-500/20 border-blue-500' 
// //                                 : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
// //                             }`}
// //                           >
// //                             <div className="text-2xl mb-1">🔍</div>
// //                             <div className="text-xs">Link Inspector</div>
// //                           </motion.button>

// //                           <motion.button
// //                             onClick={() => setSelectedTool(selectedTool === 'headers' ? null : 'headers')}
// //                             whileHover={{ scale: 1.05 }}
// //                             whileTap={{ scale: 0.95 }}
// //                             className={`p-3 rounded-lg border transition-all ${
// //                               selectedTool === 'headers' 
// //                                 ? 'bg-blue-500/20 border-blue-500' 
// //                                 : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
// //                             }`}
// //                           >
// //                             <div className="text-2xl mb-1">📧</div>
// //                             <div className="text-xs">Header Analysis</div>
// //                           </motion.button>

// //                           <motion.button
// //                             onClick={() => setSelectedTool(selectedTool === 'flags' ? null : 'flags')}
// //                             whileHover={{ scale: 1.05 }}
// //                             whileTap={{ scale: 0.95 }}
// //                             className={`p-3 rounded-lg border transition-all ${
// //                               selectedTool === 'flags' 
// //                                 ? 'bg-blue-500/20 border-blue-500' 
// //                                 : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
// //                             }`}
// //                           >
// //                             <div className="text-2xl mb-1">🚩</div>
// //                             <div className="text-xs">Red Flags</div>
// //                           </motion.button>
// //                         </div>

// //                         {/* Tool Results */}
// //                         <AnimatePresence>
// //                           {selectedTool && (
// //                             <motion.div
// //                               initial={{ opacity: 0, height: 0 }}
// //                               animate={{ opacity: 1, height: 'auto' }}
// //                               exit={{ opacity: 0, height: 0 }}
// //                               className="mt-4 p-4 bg-black/40 rounded-lg border border-gray-800"
// //                             >
// //                               {selectedTool === 'link' && currentEmail.content.link && (
// //                                 <div>
// //                                   <div className="text-sm font-bold text-blue-400 mb-2">Link Analysis:</div>
// //                                   <div className="space-y-2 text-sm">
// //                                     <div>
// //                                       <span className="text-gray-500">Display Text:</span>
// //                                       <span className="text-white ml-2">{currentEmail.analysis.linkAnalysis.displayText}</span>
// //                                     </div>
// //                                     <div>
// //                                       <span className="text-gray-500">Actual URL:</span>
// //                                       <span className={`ml-2 font-mono ${
// //                                         currentEmail.analysis.linkAnalysis.risk === 'HIGH' || currentEmail.analysis.linkAnalysis.risk === 'CRITICAL' 
// //                                           ? 'text-red-400' : 'text-green-400'
// //                                       }`}>
// //                                         {currentEmail.analysis.linkAnalysis.actualURL}
// //                                       </span>
// //                                     </div>
// //                                     <div>
// //                                       <span className="text-gray-500">Risk Level:</span>
// //                                       <span className={`ml-2 font-bold ${
// //                                         currentEmail.analysis.linkAnalysis.risk === 'HIGH' ? 'text-red-500' :
// //                                         currentEmail.analysis.linkAnalysis.risk === 'CRITICAL' ? 'text-red-600' :
// //                                         'text-green-500'
// //                                       }`}>
// //                                         {currentEmail.analysis.linkAnalysis.risk}
// //                                       </span>
// //                                     </div>
// //                                   </div>
// //                                 </div>
// //                               )}

// //                               {selectedTool === 'headers' && (
// //                                 <div>
// //                                   <div className="text-sm font-bold text-blue-400 mb-2">Email Headers:</div>
// //                                   <div className="space-y-2 text-sm">
// //                                     <div>
// //                                       <span className="text-gray-500">SPF:</span>
// //                                       <span className={`ml-2 font-bold ${
// //                                         currentEmail.analysis.headers.spf === 'PASS' ? 'text-green-500' : 'text-red-500'
// //                                       }`}>
// //                                         {currentEmail.analysis.headers.spf}
// //                                       </span>
// //                                     </div>
// //                                     <div>
// //                                       <span className="text-gray-500">DKIM:</span>
// //                                       <span className={`ml-2 font-bold ${
// //                                         currentEmail.analysis.headers.dkim === 'PASS' ? 'text-green-500' : 'text-red-500'
// //                                       }`}>
// //                                         {currentEmail.analysis.headers.dkim}
// //                                       </span>
// //                                     </div>
// //                                     <div>
// //                                       <span className="text-gray-500">Location:</span>
// //                                       <span className="text-white ml-2">{currentEmail.analysis.headers.location}</span>
// //                                     </div>
// //                                   </div>
// //                                 </div>
// //                               )}

// //                               {selectedTool === 'flags' && (
// //                                 <div>
// //                                   <div className="text-sm font-bold text-blue-400 mb-2">Red Flags Detected:</div>
// //                                   {currentEmail.analysis.redFlags.length > 0 ? (
// //                                     <ul className="space-y-1">
// //                                       {currentEmail.analysis.redFlags.map((flag, i) => (
// //                                         <li key={i} className="text-sm text-red-400 flex items-start">
// //                                           <span className="mr-2">⚠️</span>
// //                                           {flag}
// //                                         </li>
// //                                       ))}
// //                                     </ul>
// //                                   ) : (
// //                                     <div className="text-sm text-green-400">✅ No red flags detected</div>
// //                                   )}
// //                                 </div>
// //                               )}
// //                             </motion.div>
// //                           )}
// //                         </AnimatePresence>
// //                       </div>

// //                       {/* Decision Buttons */}
// //                       <div className="border-t border-gray-800 pt-4 mt-6">
// //                         <div className="grid grid-cols-2 gap-4">
// //                           <motion.button
// //                             onClick={() => handleDecision(true)}
// //                             whileHover={{ scale: 1.02 }}
// //                             whileTap={{ scale: 0.98 }}
// //                             className="px-6 py-3 bg-red-500/20 border-2 border-red-500 text-red-400 font-bold hover:bg-red-500/30 transition-all rounded-lg"
// //                           >
// //                             🚩 FLAG AS PHISHING
// //                           </motion.button>
// //                           <motion.button
// //                             onClick={() => handleDecision(false)}
// //                             whileHover={{ scale: 1.02 }}
// //                             whileTap={{ scale: 0.98 }}
// //                             className="px-6 py-3 bg-green-500/20 border-2 border-green-500 text-green-400 font-bold hover:bg-green-500/30 transition-all rounded-lg"
// //                           >
// //                             ✅ MARK LEGITIMATE
// //                           </motion.button>
// //                         </div>
// //                       </div>
// //                     </motion.div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </motion.div>
// //           )}

// //           {/* RESULTS STAGE */}
// //           {stage === 'results' && (
// //             <motion.div 
// //               key="results"
// //               initial={{ opacity: 0, scale: 0.9 }}
// //               animate={{ opacity: 1, scale: 1 }}
// //               className="w-full h-full flex items-center justify-center p-4"
// //             >
// //               <div className="w-full max-w-4xl">
// //                 <motion.div 
// //                   className="bg-black/80 backdrop-blur-xl border border-blue-900/50 rounded-2xl p-8 shadow-2xl"
// //                   initial={{ y: 50 }}
// //                   animate={{ y: 0 }}
// //                 >
// //                   {/* Result Header */}
// //                   <div className="text-center mb-8">
// //                     <div className={`text-6xl font-black mb-4 ${
// //                       gameResult === 'win' ? 'text-green-500' : 'text-red-500'
// //                     }`}>
// //                       {gameResult === 'win' ? '🛡️ MISSION SUCCESS' : '🚨 BREACH DETECTED'}
// //                     </div>
// //                     <p className="text-xl text-gray-300">
// //                       {gameResult === 'win' 
// //                         ? 'You successfully protected the company from phishing attacks!' 
// //                         : 'The company security has been compromised!'}
// //                     </p>
// //                   </div>

// //                   {/* Stats Grid */}
// //                   <div className="grid grid-cols-4 gap-4 mb-8">
// //                     <div className="bg-black/40 rounded-lg p-4 text-center border border-gray-800">
// //                       <div className="text-3xl font-bold text-blue-400">{score}</div>
// //                       <div className="text-xs text-gray-500 uppercase">Final Score</div>
// //                     </div>
// //                     <div className="bg-black/40 rounded-lg p-4 text-center border border-gray-800">
// //                       <div className="text-3xl font-bold text-yellow-400">{streak}</div>
// //                       <div className="text-xs text-gray-500 uppercase">Best Streak</div>
// //                     </div>
// //                     <div className="bg-black/40 rounded-lg p-4 text-center border border-gray-800">
// //                       <div className="text-3xl font-bold text-green-400">
// //                         {analyzedEmails.filter(e => e.correct).length}
// //                       </div>
// //                       <div className="text-xs text-gray-500 uppercase">Correct</div>
// //                     </div>
// //                     <div className="bg-black/40 rounded-lg p-4 text-center border border-gray-800">
// //                       <div className="text-3xl font-bold text-red-400">
// //                         {analyzedEmails.filter(e => !e.correct).length}
// //                       </div>
// //                       <div className="text-xs text-gray-500 uppercase">Wrong</div>
// //                     </div>
// //                   </div>

// //                   {/* Email Analysis Results */}
// //                   <div className="mb-8">
// //                     <h3 className="text-lg font-bold text-blue-400 mb-4">Email Analysis Results:</h3>
// //                     <div className="space-y-2 max-h-64 overflow-y-auto">
// //                       {analyzedEmails.map((email, i) => (
// //                         <motion.div
// //                           key={i}
// //                           initial={{ opacity: 0, x: -20 }}
// //                           animate={{ opacity: 1, x: 0 }}
// //                           transition={{ delay: i * 0.1 }}
// //                           className={`p-3 rounded-lg border flex justify-between items-center ${
// //                             email.correct 
// //                               ? 'bg-green-500/10 border-green-500/30' 
// //                               : 'bg-red-500/10 border-red-500/30'
// //                           }`}
// //                         >
// //                           <div className="flex-1">
// //                             <div className="text-sm font-bold text-white">{email.subject}</div>
// //                             <div className="text-xs text-gray-500">From: {email.fromDisplay}</div>
// //                           </div>
// //                           <div className="text-right">
// //                             <div className={`text-sm font-bold ${
// //                               email.correct ? 'text-green-500' : 'text-red-500'
// //                             }`}>
// //                               {email.correct ? '✓ CORRECT' : '✗ WRONG'}
// //                             </div>
// //                             <div className={`text-xs ${
// //                               email.points > 0 ? 'text-green-400' : 'text-red-400'
// //                             }`}>
// //                               {email.points > 0 ? '+' : ''}{email.points} pts
// //                             </div>
// //                           </div>
// //                         </motion.div>
// //                       ))}
// //                     </div>
// //                   </div>

// //                   {/* Security Tips */}
// //                   <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mb-8">
// //                     <h3 className="text-lg font-bold text-blue-400 mb-4">🎯 Key Lessons Learned:</h3>
// //                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
// //                       <div>• Always check the actual URL by hovering over links</div>
// //                       <div>• Verify sender email addresses carefully</div>
// //                       <div>• Be suspicious of urgency and threats</div>
// //                       <div>• Never send gift card codes via email</div>
// //                       <div>• QR codes can hide malicious links</div>
// //                       <div>• Legitimate companies use proper security (SPF/DKIM)</div>
// //                     </div>
// //                   </div>

// //                   {/* Action Buttons */}
// //                   <div className="flex gap-4">
// //                     <motion.button
// //                       onClick={resetGame}
// //                       whileHover={{ scale: 1.05 }}
// //                       whileTap={{ scale: 0.95 }}
// //                       className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-black font-bold rounded-lg hover:from-blue-400 hover:to-cyan-400 transition-all"
// //                     >
// //                       Play Again
// //                     </motion.button>
// //                     <motion.button
// //                       onClick={() => setStage('menu')}
// //                       whileHover={{ scale: 1.05 }}
// //                       whileTap={{ scale: 0.95 }}
// //                       className="flex-1 px-6 py-3 bg-gray-800 text-white font-bold rounded-lg hover:bg-gray-700 transition-all border border-gray-700"
// //                     >
// //                       Main Menu
// //                     </motion.button>
// //                   </div>
// //                 </motion.div>
// //               </div>
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //       </div>

// //       <style jsx global>{`
// //         @keyframes float {
// //           0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
// //           10% { opacity: 0.3; }
// //           90% { opacity: 0.3; }
// //           100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default PHISH_HUNTER_GAME;




// import React, { useState, useEffect, useCallback } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';

// const PHISH_HUNTER_STORY = () => {
//   // Game States
//   const [stage, setStage] = useState('intro'); // intro, dialogue, briefing, battle, breach, results
//   const [dialogueIndex, setDialogueIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [streak, setStreak] = useState(0);
//   const [securityLevel, setSecurityLevel] = useState(100);
//   const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
//   const [gameResult, setGameResult] = useState(null);
//   const [emailIndex, setEmailIndex] = useState(0);
//   const [currentEmail, setCurrentEmail] = useState(null);
//   const [analyzedEmails, setAnalyzedEmails] = useState([]);
//   const [showAnalysis, setShowAnalysis] = useState(false);
//   const [selectedTool, setSelectedTool] = useState(null);
//   const [breachProgress, setBreachProgress] = useState(0);
//   const [alertActive, setAlertActive] = useState(false);

//   // Email Database with more realistic content
//   const emailDatabase = [
//     {
//       id: 1,
//       from: "security@microsoft.com",
//       fromDisplay: "Microsoft Security Team",
//       subject: "URGENT: Your Account Will Be Suspended",
//       preview: "We've detected unusual activity. Click here to verify...",
//       isPhishing: true,
//       batch: 1,
//       content: {
//         greeting: "Dear User,",
//         body: "We've detected suspicious login attempts on your Microsoft account. To prevent suspension, you must verify your identity immediately. Failure to do so will result in permanent account termination within 24 hours.",
//         button: "VERIFY ACCOUNT NOW",
//         link: "https://microsoft-security-verify.com/login",
//         attachments: []
//       },
//       analysis: {
//         linkAnalysis: {
//           displayText: "VERIFY ACCOUNT NOW",
//           actualURL: "microsoft-security-verify.com",
//           risk: "CRITICAL"
//         },
//         headers: {
//           spf: "FAIL",
//           dkim: "FAIL",
//           location: "Unknown (VPN)"
//         },
//         redFlags: [
//           "Urgency language used",
//           "Threat of account suspension",
//           "Fake Microsoft domain",
//           "SPF/DKIM authentication failed"
//         ]
//       }
//     },
//     {
//       id: 2,
//       from: "hr@techcorp.com",
//       fromDisplay: "HR Department",
//       subject: "Updated Employee Handbook 2024",
//       preview: "Please review the updated policies and acknowledge...",
//       isPhishing: false,
//       batch: 1,
//       content: {
//         greeting: "Hello Team,",
//         body: "The 2024 Employee Handbook has been updated with new remote work policies and security guidelines. Please review the attached document and acknowledge receipt by end of week.",
//         button: null,
//         link: null,
//         attachments: ["Employee_Handbook_2024.pdf"]
//       },
//       analysis: {
//         linkAnalysis: null,
//         headers: {
//           spf: "PASS",
//           dkim: "PASS",
//           location: "New York, USA"
//         },
//         redFlags: []
//       }
//     },
//     {
//       id: 3,
//       from: "ceo@company.com",
//       fromDisplay: "Robert Johnson (CEO)",
//       subject: "Quick Favor - Gift Cards Needed",
//       preview: "I'm in a meeting and need you to purchase gift cards...",
//       isPhishing: true,
//       batch: 2,
//       content: {
//         greeting: "Hi,",
//         body: "I'm in an important meeting and can't make calls. I need you to purchase $500 in Apple gift cards for client rewards. Scratch off the back and email me the codes immediately. I'll reimburse you tomorrow.",
//         button: null,
//         link: null,
//         attachments: []
//       },
//       analysis: {
//         linkAnalysis: null,
//         headers: {
//           spf: "SOFTFAIL",
//           dkim: "FAIL",
//           location: "Nigeria"
//         },
//         redFlags: [
//           "Unusual request from CEO",
//           "Gift card purchase request",
//           "Urgent payment needed",
//           "Suspicious email origin"
//         ]
//       }
//     },
//     {
//       id: 4,
//       from: "amazon@amazon.com",
//       fromDisplay: "Amazon",
//       subject: "Your Order #123-4567890 Has Shipped",
//       preview: "Track your package and view delivery details...",
//       isPhishing: false,
//       batch: 1,
//       content: {
//         greeting: "Hello,",
//         body: "Your recent order has shipped and is on its way. You can track your package using the link below. Expected delivery: 3-5 business days.",
//         button: "Track Package",
//         link: "https://www.amazon.com/tracking/123-4567890",
//         attachments: []
//       },
//       analysis: {
//         linkAnalysis: {
//           displayText: "Track Package",
//           actualURL: "www.amazon.com/tracking/123-4567890",
//           risk: "LOW"
//         },
//         headers: {
//           spf: "PASS",
//           dkim: "PASS",
//           location: "Seattle, USA"
//         },
//         redFlags: []
//       }
//     },
//     {
//       id: 5,
//       from: "it-support@company.com",
//       fromDisplay: "IT Support",
//       subject: "SYSTEM ALERT: Password Reset Required",
//       preview: "Our systems detected a security breach. Reset now...",
//       isPhishing: true,
//       batch: 3,
//       content: {
//         greeting: "IMPORTANT SECURITY NOTICE",
//         body: "We've detected unauthorized access attempts on company systems. All employees must reset their passwords immediately using the secure portal below. This is mandatory.",
//         button: "RESET PASSWORD NOW",
//         link: "https://company-secure-reset.com/auth",
//         qrCode: true,
//         attachments: []
//       },
//       analysis: {
//         linkAnalysis: {
//           displayText: "RESET PASSWORD NOW",
//           actualURL: "company-secure-reset.com",
//           risk: "CRITICAL"
//         },
//         headers: {
//           spf: "FAIL",
//           dkim: "FAIL",
//           location: "Eastern Europe"
//         },
//         redFlags: [
//           "Fake IT support email",
//           "Suspicious password reset link",
//           "QR code for malicious site",
//           "High-risk domain detected"
//         ]
//       }
//     }
//   ];

//   // Dialogue System
//   const dialogues = {
//     intro: [
//       {
//         speaker: "AI",
//         text: "Good morning, Agent. I'm ARIA - Advanced Response & Intelligence Assistant.",
//         emotion: "neutral"
//       },
//       {
//         speaker: "Student",
//         text: "Good morning, ARIA. Ready for today's training session.",
//         emotion: "neutral"
//       },
//       {
//         speaker: "AI",
//         text: "Excellent. Today we're conducting a critical security simulation. Our company has been experiencing increased phishing attempts.",
//         emotion: "serious"
//       },
//       {
//         speaker: "Student",
//         text: "I've been studying the latest phishing techniques. I'm ready to help.",
//         emotion: "confident"
//       },
//       {
//         speaker: "AI",
//         text: "Perfect. You'll be analyzing incoming emails in real-time. Your decisions will impact our company's security level.",
//         emotion: "neutral"
//       },
//       {
//         speaker: "Student",
//         text: "Understood. I'll be thorough in my analysis.",
//         emotion: "determined"
//       },
//       {
//         speaker: "AI",
//         text: "Let's begin the briefing. The company's security depends on you.",
//         emotion: "serious"
//       }
//     ],
//     breach: [
//       {
//         speaker: "AI",
//         text: "ALERT! Multiple security breaches detected!",
//         emotion: "alert"
//       },
//       {
//         speaker: "Student",
//         text: "What happened? Did I miss something?",
//         emotion: "worried"
//       },
//       {
//         speaker: "AI",
//         text: "Several phishing emails got through. Attackers are accessing our systems now.",
//         emotion: "urgent"
//       },
//       {
//         speaker: "Student",
//         text: "No... I need to stop this!",
//         emotion: "panicked"
//       },
//       {
//         speaker: "AI",
//         text: "It's too late. The damage is done. This is a critical learning moment.",
//         emotion: "somber"
//       }
//     ]
//   };

//   // Initialize game
//   useEffect(() => {
//     if (stage === 'battle' && emailDatabase.length > 0) {
//       setCurrentEmail(emailDatabase[0]);
//     }
//   }, [stage]);

//   // Timer countdown
//   useEffect(() => {
//     if (stage === 'battle' && timeLeft > 0) {
//       const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
//       return () => clearTimeout(timer);
//     } else if (timeLeft === 0 && stage === 'battle') {
//       endGame();
//     }
//   }, [timeLeft, stage]);

//   // Breach simulation
//   useEffect(() => {
//     if (stage === 'battle' && securityLevel < 30 && !alertActive) {
//       setAlertActive(true);
//       setTimeout(() => {
//         setStage('breach');
//         setDialogueIndex(0);
//       }, 2000);
//     }
//   }, [securityLevel, stage]);

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins}:${secs.toString().padStart(2, '0')}`;
//   };

//   const handleDecision = (isPhishing) => {
//     const email = currentEmail;
//     const correct = isPhishing === email.isPhishing;
//     let points = 0;

//     if (correct) {
//       points = 100 + (streak * 10);
//       setScore(score + points);
//       setStreak(streak + 1);
//       setSecurityLevel(Math.min(100, securityLevel + 5));
//     } else {
//       points = -50;
//       setScore(Math.max(0, score + points));
//       setStreak(0);
//       setSecurityLevel(Math.max(0, securityLevel - 15));
      
//       // Show breach warning
//       if (securityLevel <= 30) {
//         setBreachProgress(breachProgress + 20);
//       }
//     }

//     // Record analysis
//     const analysis = {
//       ...email,
//       userDecision: isPhishing,
//       correct: correct,
//       points: points
//     };
//     setAnalyzedEmails([...analyzedEmails, analysis]);

//     // Move to next email
//     if (emailIndex < emailDatabase.length - 1) {
//       const nextIndex = emailIndex + 1;
//       setEmailIndex(nextIndex);
//       setCurrentEmail(emailDatabase[nextIndex]);
//       setSelectedTool(null);
//     } else {
//       endGame();
//     }
//   };

//   const endGame = () => {
//     const correctCount = analyzedEmails.filter(e => e.correct).length;
//     const accuracy = (correctCount / analyzedEmails.length) * 100;
    
//     if (securityLevel > 70) {
//       setGameResult('win');
//     } else {
//       setGameResult('breach');
//     }
//     setStage('results');
//   };

//   const resetGame = () => {
//     setStage('intro');
//     setDialogueIndex(0);
//     setScore(0);
//     setStreak(0);
//     setSecurityLevel(100);
//     setTimeLeft(300);
//     setEmailIndex(0);
//     setAnalyzedEmails([]);
//     setShowAnalysis(false);
//     setSelectedTool(null);
//     setBreachProgress(0);
//     setAlertActive(false);
//     setGameResult(null);
//   };

//   const nextDialogue = () => {
//     const currentDialogue = stage === 'intro' ? dialogues.intro : dialogues.breach;
//     if (dialogueIndex < currentDialogue.length - 1) {
//       setDialogueIndex(dialogueIndex + 1);
//     } else {
//       if (stage === 'intro') {
//         setStage('battle');
//       } else {
//         setStage('results');
//       }
//     }
//   };

//   return (
//     <div className="game-container">
//       <style jsx>{`
//         * {
//           margin: 0;
//           padding: 0;
//           box-sizing: border-box;
//         }

//         body {
//           font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
//           background: #0a0e27;
//           color: #ffffff;
//           overflow: hidden;
//         }

//         .game-container {
//           min-height: 100vh;
//           background: linear-gradient(135deg, #0a0e27 0%, #1a1f3a 50%, #2d1b69 100%);
//           position: relative;
//           overflow: hidden;
//         }

//         /* Animated Background */
//         .bg-animation {
//           position: absolute;
//           width: 100%;
//           height: 100%;
//           top: 0;
//           left: 0;
//           z-index: 0;
//         }

//         .floating-code {
//           position: absolute;
//           color: rgba(59, 130, 246, 0.1);
//           font-family: 'Courier New', monospace;
//           font-size: 14px;
//           animation: float 20s infinite linear;
//         }

//         @keyframes float {
//           from { transform: translateY(100vh) rotate(0deg); }
//           to { transform: translateY(-100px) rotate(360deg); }
//         }

//         .grid-overlay {
//           position: absolute;
//           width: 100%;
//           height: 100%;
//           background-image: 
//             linear-gradient(rgba(59, 130, 246, 0.03) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(59, 130, 246, 0.03) 1px, transparent 1px);
//           background-size: 50px 50px;
//           animation: grid-move 10s linear infinite;
//         }

//         @keyframes grid-move {
//           0% { transform: translate(0, 0); }
//           100% { transform: translate(50px, 50px); }
//         }

//         /* Dialogue Screen */
//         .dialogue-screen {
//           position: relative;
//           z-index: 10;
//           min-height: 100vh;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//           align-items: center;
//           padding: 2rem;
//         }

//         .dialogue-container {
//           max-width: 900px;
//           width: 100%;
//           background: rgba(15, 23, 42, 0.95);
//           backdrop-filter: blur(20px);
//           border: 1px solid rgba(59, 130, 246, 0.3);
//           border-radius: 1rem;
//           padding: 2rem;
//           box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
//         }

//         .dialogue-header {
//           text-align: center;
//           margin-bottom: 2rem;
//         }

//         .dialogue-title {
//           font-size: 2.5rem;
//           font-weight: 800;
//           background: linear-gradient(135deg, #3b82f6, #8b5cf6);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           margin-bottom: 0.5rem;
//         }

//         .dialogue-subtitle {
//           color: #94a3b8;
//           font-size: 1rem;
//         }

//         .dialogue-scene {
//           background: rgba(30, 41, 59, 0.5);
//           border-radius: 0.75rem;
//           padding: 2rem;
//           margin-bottom: 2rem;
//           min-height: 200px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .character {
//           text-align: center;
//           animation: fadeIn 0.5s ease;
//         }

//         @keyframes fadeIn {
//           from { opacity: 0; transform: translateY(10px); }
//           to { opacity: 1; transform: translateY(0); }
//         }

//         .character-avatar {
//           width: 100px;
//           height: 100px;
//           margin: 0 auto 1rem;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 2.5rem;
//         }

//         .ai-avatar {
//           background: linear-gradient(135deg, #3b82f6, #06b6d4);
//           box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
//         }

//         .student-avatar {
//           background: linear-gradient(135deg, #8b5cf6, #ec4899);
//           box-shadow: 0 0 30px rgba(139, 92, 246, 0.5);
//         }

//         .character-name {
//           font-size: 1.25rem;
//           font-weight: 700;
//           margin-bottom: 0.5rem;
//         }

//         .ai-name {
//           color: #60a5fa;
//         }

//         .student-name {
//           color: #c084fc;
//         }

//         .dialogue-text {
//           background: rgba(15, 23, 42, 0.8);
//           border-left: 4px solid #3b82f6;
//           padding: 1.5rem;
//           border-radius: 0.5rem;
//           font-size: 1.125rem;
//           line-height: 1.6;
//           color: #e2e8f0;
//           margin-top: 1rem;
//           animation: slideIn 0.3s ease;
//         }

//         @keyframes slideIn {
//           from { opacity: 0; transform: translateX(-20px); }
//           to { opacity: 1; transform: translateX(0); }
//         }

//         .dialogue-controls {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .dialogue-progress {
//           display: flex;
//           gap: 0.5rem;
//         }

//         .progress-dot {
//           width: 8px;
//           height: 8px;
//           border-radius: 50%;
//           background: #475569;
//           transition: all 0.3s ease;
//         }

//         .progress-dot.active {
//           background: #3b82f6;
//           transform: scale(1.5);
//         }

//         .continue-button {
//           padding: 0.75rem 2rem;
//           background: linear-gradient(135deg, #3b82f6, #8b5cf6);
//           color: white;
//           border: none;
//           border-radius: 0.5rem;
//           font-weight: 700;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .continue-button:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
//         }

//         /* Battle Screen */
//         .battle-screen {
//           position: relative;
//           z-index: 10;
//           min-height: 100vh;
//           display: flex;
//           flex-direction: column;
//         }

//         .hud-header {
//           background: rgba(15, 23, 42, 0.95);
//           backdrop-filter: blur(10px);
//           border-bottom: 1px solid rgba(59, 130, 246, 0.3);
//           padding: 1rem 2rem;
//         }

//         .hud-content {
//           max-width: 1400px;
//           margin: 0 auto;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .hud-section {
//           display: flex;
//           gap: 2rem;
//         }

//         .hud-item {
//           text-align: center;
//         }

//         .hud-label {
//           font-size: 0.75rem;
//           color: #64748b;
//           text-transform: uppercase;
//           letter-spacing: 0.05em;
//           margin-bottom: 0.25rem;
//         }

//         .hud-value {
//           font-size: 1.5rem;
//           font-weight: 700;
//           color: #ffffff;
//         }

//         .security-bar {
//           width: 120px;
//           height: 8px;
//           background: #1e293b;
//           border-radius: 4px;
//           overflow: hidden;
//           margin: 0.5rem auto;
//         }

//         .security-fill {
//           height: 100%;
//           transition: all 0.3s ease;
//         }

//         .security-fill.high {
//           background: linear-gradient(90deg, #10b981, #34d399);
//         }

//         .security-fill.medium {
//           background: linear-gradient(90deg, #f59e0b, #fbbf24);
//         }

//         .security-fill.low {
//           background: linear-gradient(90deg, #ef4444, #f87171);
//         }

//         .battle-content {
//           flex: 1;
//           display: flex;
//           padding: 2rem;
//           gap: 2rem;
//           max-width: 1400px;
//           margin: 0 auto;
//           width: 100%;
//         }

//         .email-list {
//           width: 350px;
//           background: rgba(15, 23, 42, 0.5);
//           border: 1px solid rgba(59, 130, 246, 0.2);
//           border-radius: 0.75rem;
//           padding: 1rem;
//           overflow-y: auto;
//         }

//         .email-list-header {
//           font-size: 0.875rem;
//           font-weight: 700;
//           color: #60a5fa;
//           text-transform: uppercase;
//           letter-spacing: 0.05em;
//           margin-bottom: 1rem;
//           padding-bottom: 0.5rem;
//           border-bottom: 1px solid rgba(59, 130, 246, 0.2);
//         }

//         .email-item {
//           padding: 1rem;
//           background: rgba(30, 41, 59, 0.5);
//           border: 1px solid rgba(59, 130, 246, 0.1);
//           border-radius: 0.5rem;
//           margin-bottom: 0.75rem;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .email-item:hover {
//           background: rgba(59, 130, 246, 0.1);
//           border-color: rgba(59, 130, 246, 0.3);
//           transform: translateX(4px);
//         }

//         .email-item.active {
//           background: rgba(59, 130, 246, 0.2);
//           border-color: #3b82f6;
//         }

//         .email-item.analyzed {
//           opacity: 0.5;
//         }

//         .email-sender {
//           font-size: 0.875rem;
//           font-weight: 700;
//           color: white;
//           margin-bottom: 0.25rem;
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//         }

//         .email-subject {
//           font-size: 0.875rem;
//           color: #94a3b8;
//           margin-bottom: 0.25rem;
//         }

//         .email-preview {
//           font-size: 0.75rem;
//           color: #64748b;
//         }

//         .email-view {
//           flex: 1;
//           background: rgba(15, 23, 42, 0.5);
//           border: 1px solid rgba(59, 130, 246, 0.2);
//           border-radius: 0.75rem;
//           padding: 2rem;
//           overflow-y: auto;
//         }

//         .email-container {
//           max-width: 800px;
//           margin: 0 auto;
//         }

//         .email-box {
//           background: rgba(30, 41, 59, 0.5);
//           border: 1px solid rgba(59, 130, 246, 0.2);
//           border-radius: 0.75rem;
//           padding: 2rem;
//         }

//         .email-header {
//           border-bottom: 1px solid rgba(59, 130, 246, 0.2);
//           padding-bottom: 1rem;
//           margin-bottom: 1.5rem;
//         }

//         .email-title {
//           font-size: 1.5rem;
//           font-weight: 700;
//           color: white;
//           margin-bottom: 0.75rem;
//         }

//         .email-meta {
//           font-size: 0.875rem;
//           color: #94a3b8;
//         }

//         .email-from {
//           color: #60a5fa;
//         }

//         .batch-badge {
//           display: inline-block;
//           padding: 0.25rem 0.75rem;
//           font-size: 0.75rem;
//           font-weight: 700;
//           border-radius: 9999px;
//           text-transform: uppercase;
//           letter-spacing: 0.05em;
//           margin-left: 1rem;
//         }

//         .batch-badge.beginner {
//           background: rgba(239, 68, 68, 0.2);
//           color: #ef4444;
//           border: 1px solid rgba(239, 68, 68, 0.3);
//         }

//         .batch-badge.intermediate {
//           background: rgba(245, 158, 11, 0.2);
//           color: #f59e0b;
//           border: 1px solid rgba(245, 158, 11, 0.3);
//         }

//         .batch-badge.advanced {
//           background: rgba(168, 85, 247, 0.2);
//           color: #a855f7;
//           border: 1px solid rgba(168, 85, 247, 0.3);
//         }

//         .email-body {
//           color: #e2e8f0;
//           line-height: 1.6;
//           margin-bottom: 2rem;
//         }

//         .email-greeting {
//           margin-bottom: 1rem;
//           font-weight: 600;
//         }

//         .email-message {
//           margin-bottom: 1rem;
//         }

//         .email-button {
//           display: inline-block;
//           padding: 0.75rem 1.5rem;
//           background: #3b82f6;
//           color: white;
//           font-weight: 700;
//           border-radius: 0.5rem;
//           text-decoration: none;
//           transition: all 0.3s ease;
//           margin: 1rem 0;
//           cursor: pointer;
//           border: none;
//         }

//         .email-button:hover {
//           background: #60a5fa;
//           transform: translateY(-2px);
//         }

//         .qr-code {
//           width: 128px;
//           height: 128px;
//           background: white;
//           border-radius: 0.5rem;
//           margin: 1rem auto;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           color: black;
//           text-align: center;
//           font-size: 0.75rem;
//           font-weight: 700;
//         }

//         .email-attachments {
//           background: rgba(30, 41, 59, 0.5);
//           border-radius: 0.5rem;
//           padding: 1rem;
//           margin-top: 1rem;
//         }

//         .attachment-label {
//           font-size: 0.75rem;
//           color: #64748b;
//           margin-bottom: 0.5rem;
//         }

//         .attachment-item {
//           font-size: 0.875rem;
//           color: #60a5fa;
//           margin-bottom: 0.25rem;
//         }

//         .tools-section {
//           border-top: 1px solid rgba(59, 130, 246, 0.2);
//           padding-top: 1.5rem;
//           margin-top: 2rem;
//         }

//         .tools-header {
//           font-size: 0.875rem;
//           font-weight: 700;
//           color: #60a5fa;
//           text-transform: uppercase;
//           letter-spacing: 0.05em;
//           margin-bottom: 1rem;
//         }

//         .tools-grid {
//           display: grid;
//           grid-template-columns: repeat(3, 1fr);
//           gap: 1rem;
//         }

//         .tool-button {
//           padding: 1rem;
//           background: rgba(30, 41, 59, 0.5);
//           border: 1px solid rgba(59, 130, 246, 0.2);
//           border-radius: 0.5rem;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           text-align: center;
//         }

//         .tool-button:hover {
//           background: rgba(59, 130, 246, 0.1);
//           border-color: rgba(59, 130, 246, 0.4);
//           transform: translateY(-2px);
//         }

//         .tool-button.active {
//           background: rgba(59, 130, 246, 0.2);
//           border-color: #3b82f6;
//         }

//         .tool-icon {
//           font-size: 2rem;
//           margin-bottom: 0.5rem;
//         }

//         .tool-name {
//           font-size: 0.875rem;
//           color: #e2e8f0;
//         }

//         .tool-results {
//           margin-top: 1.5rem;
//           padding: 1.5rem;
//           background: rgba(15, 23, 42, 0.5);
//           border-radius: 0.5rem;
//           border: 1px solid rgba(59, 130, 246, 0.2);
//         }

//         .tool-result-title {
//           font-size: 1rem;
//           font-weight: 700;
//           color: #60a5fa;
//           margin-bottom: 1rem;
//         }

//         .tool-result-item {
//           display: flex;
//           font-size: 0.875rem;
//           margin-bottom: 0.75rem;
//           align-items: center;
//         }

//         .tool-result-label {
//           color: #64748b;
//           margin-right: 1rem;
//           min-width: 120px;
//         }

//         .tool-result-value {
//           color: white;
//           font-weight: 600;
//         }

//         .tool-result-value.danger {
//           color: #ef4444;
//         }

//         .tool-result-value.safe {
//           color: #10b981;
//         }

//         .red-flags {
//           list-style: none;
//           padding: 0;
//         }

//         .red-flag {
//           display: flex;
//           align-items: flex-start;
//           font-size: 0.875rem;
//           color: #ef4444;
//           margin-bottom: 0.5rem;
//         }

//         .red-flag-icon {
//           margin-right: 0.75rem;
//         }

//         .no-flags {
//           font-size: 0.875rem;
//           color: #10b981;
//           font-weight: 600;
//         }

//         .decision-section {
//           border-top: 1px solid rgba(59, 130, 246, 0.2);
//           padding-top: 2rem;
//           margin-top: 2rem;
//         }

//         .decision-buttons {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 1rem;
//         }

//         .decision-button {
//           padding: 1rem 2rem;
//           font-weight: 700;
//           border: 2px solid;
//           border-radius: 0.5rem;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           text-align: center;
//           font-size: 1rem;
//         }

//         .decision-button.phishing {
//           background: rgba(239, 68, 68, 0.2);
//           border-color: #ef4444;
//           color: #ef4444;
//         }

//         .decision-button.phishing:hover {
//           background: rgba(239, 68, 68, 0.3);
//           transform: translateY(-2px);
//         }

//         .decision-button.legitimate {
//           background: rgba(16, 185, 129, 0.2);
//           border-color: #10b981;
//           color: #10b981;
//         }

//         .decision-button.legitimate:hover {
//           background: rgba(16, 185, 129, 0.3);
//           transform: translateY(-2px);
//         }

//         /* Breach Alert */
//         .breach-alert {
//           position: fixed;
//           top: 50%;
//           left: 50%;
//           transform: translate(-50%, -50%);
//           background: rgba(239, 68, 68, 0.95);
//           border: 2px solid #ef4444;
//           border-radius: 1rem;
//           padding: 2rem;
//           z-index: 1000;
//           animation: alert-pulse 1s ease-in-out infinite;
//         }

//         @keyframes alert-pulse {
//           0%, 100% { transform: translate(-50%, -50%) scale(1); }
//           50% { transform: translate(-50%, -50%) scale(1.05); }
//         }

//         .breach-alert-title {
//           font-size: 2rem;
//           font-weight: 800;
//           color: white;
//           margin-bottom: 1rem;
//           text-align: center;
//         }

//         .breach-alert-text {
//           font-size: 1.125rem;
//           color: white;
//           text-align: center;
//         }

//         /* Results Screen */
//         .results-screen {
//           position: relative;
//           z-index: 10;
//           min-height: 100vh;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           padding: 2rem;
//         }

//         .results-container {
//           width: 100%;
//           max-width: 1000px;
//         }

//         .results-box {
//           background: rgba(15, 23, 42, 0.95);
//           backdrop-filter: blur(20px);
//           border: 1px solid rgba(59, 130, 246, 0.3);
//           border-radius: 1rem;
//           padding: 3rem;
//           box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
//         }

//         .results-header {
//           text-align: center;
//           margin-bottom: 3rem;
//         }

//         .results-title {
//           font-size: 3rem;
//           font-weight: 900;
//           margin-bottom: 1rem;
//         }

//         .results-title.success {
//           background: linear-gradient(135deg, #10b981, #34d399);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }

//         .results-title.breach {
//           background: linear-gradient(135deg, #ef4444, #f87171);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//         }

//         .results-message {
//           font-size: 1.25rem;
//           color: #94a3b8;
//         }

//         .stats-grid {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 1.5rem;
//           margin-bottom: 3rem;
//         }

//         .stat-card {
//           background: rgba(30, 41, 59, 0.5);
//           border: 1px solid rgba(59, 130, 246, 0.2);
//           border-radius: 0.75rem;
//           padding: 1.5rem;
//           text-align: center;
//         }

//         .stat-value {
//           font-size: 2.5rem;
//           font-weight: 800;
//           margin-bottom: 0.5rem;
//         }

//         .stat-label {
//           font-size: 0.875rem;
//           color: #64748b;
//           text-transform: uppercase;
//           letter-spacing: 0.05em;
//         }

//         .analysis-results {
//           margin-bottom: 3rem;
//         }

//         .analysis-header {
//           font-size: 1.25rem;
//           font-weight: 700;
//           color: #60a5fa;
//           margin-bottom: 1.5rem;
//         }

//         .analysis-list {
//           max-height: 300px;
//           overflow-y: auto;
//         }

//         .analysis-item {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 1rem;
//           background: rgba(30, 41, 59, 0.5);
//           border: 1px solid rgba(59, 130, 246, 0.2);
//           border-radius: 0.5rem;
//           margin-bottom: 0.75rem;
//         }

//         .analysis-item.correct {
//           background: rgba(16, 185, 129, 0.1);
//           border-color: rgba(16, 185, 129, 0.3);
//         }

//         .analysis-item.incorrect {
//           background: rgba(239, 68, 68, 0.1);
//           border-color: rgba(239, 68, 68, 0.3);
//         }

//         .analysis-info {
//           flex: 1;
//         }

//         .analysis-subject {
//           font-size: 1rem;
//           font-weight: 700;
//           color: white;
//           margin-bottom: 0.25rem;
//         }

//         .analysis-from {
//           font-size: 0.875rem;
//           color: #64748b;
//         }

//         .analysis-result {
//           text-align: right;
//         }

//         .analysis-status {
//           font-size: 1rem;
//           font-weight: 700;
//           margin-bottom: 0.25rem;
//         }

//         .analysis-status.correct {
//           color: #10b981;
//         }

//         .analysis-status.incorrect {
//           color: #ef4444;
//         }

//         .analysis-points {
//           font-size: 0.875rem;
//         }

//         .analysis-points.positive {
//           color: #10b981;
//         }

//         .analysis-points.negative {
//           color: #ef4444;
//         }

//         .lessons-section {
//           background: rgba(59, 130, 246, 0.1);
//           border: 1px solid rgba(59, 130, 246, 0.3);
//           border-radius: 0.75rem;
//           padding: 2rem;
//           margin-bottom: 3rem;
//         }

//         .lessons-header {
//           font-size: 1.25rem;
//           font-weight: 700;
//           color: #60a5fa;
//           margin-bottom: 1.5rem;
//         }

//         .lessons-grid {
//           display: grid;
//           grid-template-columns: repeat(2, 1fr);
//           gap: 1rem;
//         }

//         .lesson-item {
//           font-size: 1rem;
//           color: #e2e8f0;
//           display: flex;
//           align-items: center;
//         }

//         .lesson-item::before {
//           content: "✓";
//           color: #10b981;
//           font-weight: bold;
//           margin-right: 0.75rem;
//         }

//         .action-buttons {
//           display: flex;
//           gap: 1.5rem;
//         }

//         .action-button {
//           flex: 1;
//           padding: 1rem 2rem;
//           font-weight: 700;
//           border-radius: 0.5rem;
//           cursor: pointer;
//           transition: all 0.3s ease;
//           text-align: center;
//           font-size: 1rem;
//           border: none;
//         }

//         .action-button.primary {
//           background: linear-gradient(135deg, #3b82f6, #8b5cf6);
//           color: white;
//         }

//         .action-button.primary:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 10px 20px rgba(59, 130, 246, 0.3);
//         }

//         .action-button.secondary {
//           background: rgba(30, 41, 59, 0.5);
//           color: white;
//           border: 1px solid rgba(59, 130, 246, 0.3);
//         }

//         .action-button.secondary:hover {
//           background: rgba(59, 130, 246, 0.2);
//         }

//         .warning-pulse {
//           animation: warning-pulse 1s ease-in-out infinite;
//         }

//         @keyframes warning-pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.5; }
//         }
//       `}</style>

//       {/* Background Animation */}
//       <div className="bg-animation">
//         <div className="grid-overlay" />
//         {[...Array(15)].map((_, i) => (
//           <div
//             key={i}
//             className="floating-code"
//             style={{
//               left: `${Math.random() * 100}%`,
//               animationDelay: `${Math.random() * 20}s`,
//               top: `${Math.random() * 100}%`
//             }}
//           >
//             {['0x4841', '0x434B', '0x5345', '0x4355', '0x5249', '0x5459'][Math.floor(Math.random() * 6)]}
//           </div>
//         ))}
//       </div>

//       <AnimatePresence mode="wait">
        
//         {/* INTRO DIALOGUE */}
//         {stage === 'intro' && (
//           <motion.div 
//             key="intro"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="dialogue-screen"
//           >
//             <div className="dialogue-container">
//               <div className="dialogue-header">
//                 <h1 className="dialogue-title">PHISH HUNTER</h1>
//                 <p className="dialogue-subtitle">Cyber Security Training Simulation</p>
//               </div>

//               <div className="dialogue-scene">
//                 <div className="character">
//                   <div className={`character-avatar ${dialogues.intro[dialogueIndex].speaker === 'AI' ? 'ai-avatar' : 'student-avatar'}`}>
//                     {dialogues.intro[dialogueIndex].speaker === 'AI' ? '🤖' : '👨‍💻'}
//                   </div>
//                   <div className={`character-name ${dialogues.intro[dialogueIndex].speaker === 'AI' ? 'ai-name' : 'student-name'}`}>
//                     {dialogues.intro[dialogueIndex].speaker}
//                   </div>
//                   <div className="dialogue-text">
//                     {dialogues.intro[dialogueIndex].text}
//                   </div>
//                 </div>
//               </div>

//               <div className="dialogue-controls">
//                 <div className="dialogue-progress">
//                   {dialogues.intro.map((_, i) => (
//                     <div
//                       key={i}
//                       className={`progress-dot ${i === dialogueIndex ? 'active' : ''}`}
//                     />
//                   ))}
//                 </div>
//                 <button 
//                   onClick={nextDialogue}
//                   className="continue-button"
//                 >
//                   Continue →
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* BATTLE STAGE */}
//         {stage === 'battle' && currentEmail && (
//           <motion.div 
//             key="battle"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="battle-screen"
//           >
//             {/* HUD Header */}
//             <div className="hud-header">
//               <div className="hud-content">
//                 <div className="hud-section">
//                   <div className="hud-item">
//                     <div className="hud-label">Score</div>
//                     <div className="hud-value">{score}</div>
//                   </div>
//                   <div className="hud-item">
//                     <div className="hud-label">Streak</div>
//                     <div className="hud-value" style={{ color: '#fbbf24' }}>
//                       {streak}🔥
//                     </div>
//                   </div>
//                 </div>

//                 <div className="hud-item">
//                   <div className="hud-label">Security Level</div>
//                   <div className="security-bar">
//                     <div 
//                       className={`security-fill ${
//                         securityLevel > 60 ? 'high' :
//                         securityLevel > 30 ? 'medium' :
//                         'low'
//                       }`}
//                       style={{ width: `${securityLevel}%` }}
//                     />
//                   </div>
//                   <div className="hud-value">{securityLevel}%</div>
//                 </div>

//                 <div className="hud-item" style={{ textAlign: 'right' }}>
//                   <div className="hud-label">Time</div>
//                   <div className={`hud-value ${timeLeft < 30 ? 'warning-pulse' : ''}`}
//                        style={{ color: timeLeft < 30 ? '#ef4444' : 'white' }}>
//                     {formatTime(timeLeft)}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Breach Alert */}
//             {alertActive && (
//               <div className="breach-alert">
//                 <div className="breach-alert-title">⚠️ SECURITY BREACH IMMINENT ⚠️</div>
//                 <div className="breach-alert-text">
//                   Multiple threats detected! Security level critical!
//                 </div>
//               </div>
//             )}

//             {/* Email Analysis Area */}
//             <div className="battle-content">
//               {/* Email List */}
//               <div className="email-list">
//                 <div className="email-list-header">
//                   Inbox ({emailDatabase.length})
//                 </div>
//                 {emailDatabase.map((email, i) => (
//                   <motion.div
//                     key={email.id}
//                     onClick={() => {
//                       setEmailIndex(i);
//                       setCurrentEmail(email);
//                       setShowAnalysis(false);
//                       setSelectedTool(null);
//                     }}
//                     className={`email-item ${
//                       i === emailIndex ? 'active' : ''
//                     } ${i < emailIndex ? 'analyzed' : ''}`}
//                     whileHover={{ scale: i === emailIndex ? 1 : 1.02 }}
//                   >
//                     <div className="email-sender">
//                       <span>{email.fromDisplay}</span>
//                       {i < emailIndex && analyzedEmails[i] && (
//                         <span className={analyzedEmails[i].correct ? 'text-green-500' : 'text-red-500'}>
//                           {analyzedEmails[i].correct ? '✓' : '✗'}
//                         </span>
//                       )}
//                     </div>
//                     <div className="email-subject">{email.subject}</div>
//                     <div className="email-preview">{email.preview}</div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Email Content */}
//               <div className="email-view">
//                 <div className="email-container">
//                   <div className="email-box">
//                     {/* Email Header */}
//                     <div className="email-header">
//                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
//                         <div>
//                           <h2 className="email-title">{currentEmail.subject}</h2>
//                           <div className="email-meta">
//                             From: <span className="email-from">{currentEmail.fromDisplay}</span> 
//                             <span style={{ color: '#64748b' }}> &lt;{currentEmail.from}&gt;</span>
//                           </div>
//                         </div>
//                         <div className={`batch-badge ${
//                           currentEmail.batch === 1 ? 'beginner' :
//                           currentEmail.batch === 2 ? 'intermediate' :
//                           'advanced'
//                         }`}>
//                           Batch {currentEmail.batch}
//                         </div>
//                       </div>
//                     </div>

//                     {/* Email Body */}
//                     <div className="email-body">
//                       <p className="email-greeting">{currentEmail.content.greeting}</p>
//                       <p className="email-message">{currentEmail.content.body}</p>
                      
//                       {currentEmail.content.button && (
//                         <div>
//                           <button className="email-button">
//                             {currentEmail.content.button}
//                           </button>
//                         </div>
//                       )}

//                       {currentEmail.content.qrCode && (
//                         <div className="qr-code">
//                           QR CODE<br/>(SCAN NOW)
//                         </div>
//                       )}

//                       {currentEmail.content.attachments.length > 0 && (
//                         <div className="email-attachments">
//                           <div className="attachment-label">Attachments:</div>
//                           {currentEmail.content.attachments.map((att, i) => (
//                             <div key={i} className="attachment-item">📎 {att}</div>
//                           ))}
//                         </div>
//                       )}
//                     </div>

//                     {/* Investigation Tools */}
//                     <div className="tools-section">
//                       <div className="tools-header">Investigation Tools:</div>
//                       <div className="tools-grid">
//                         <motion.button
//                           onClick={() => setSelectedTool(selectedTool === 'link' ? null : 'link')}
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           className={`tool-button ${selectedTool === 'link' ? 'active' : ''}`}
//                         >
//                           <div className="tool-icon">🔍</div>
//                           <div className="tool-name">Link Inspector</div>
//                         </motion.button>

//                         <motion.button
//                           onClick={() => setSelectedTool(selectedTool === 'headers' ? null : 'headers')}
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           className={`tool-button ${selectedTool === 'headers' ? 'active' : ''}`}
//                         >
//                           <div className="tool-icon">📧</div>
//                           <div className="tool-name">Header Analysis</div>
//                         </motion.button>

//                         <motion.button
//                           onClick={() => setSelectedTool(selectedTool === 'flags' ? null : 'flags')}
//                           whileHover={{ scale: 1.05 }}
//                           whileTap={{ scale: 0.95 }}
//                           className={`tool-button ${selectedTool === 'flags' ? 'active' : ''}`}
//                         >
//                           <div className="tool-icon">🚩</div>
//                           <div className="tool-name">Red Flags</div>
//                         </motion.button>
//                       </div>

//                       {/* Tool Results */}
//                       <AnimatePresence>
//                         {selectedTool && (
//                           <motion.div
//                             initial={{ opacity: 0, height: 0 }}
//                             animate={{ opacity: 1, height: 'auto' }}
//                             exit={{ opacity: 0, height: 0 }}
//                             className="tool-results"
//                           >
//                             {selectedTool === 'link' && currentEmail.content.link && (
//                               <div>
//                                 <div className="tool-result-title">Link Analysis:</div>
//                                 <div style={{ marginTop: '0.5rem' }}>
//                                   <div className="tool-result-item">
//                                     <span className="tool-result-label">Display Text:</span>
//                                     <span className="tool-result-value">{currentEmail.analysis.linkAnalysis.displayText}</span>
//                                   </div>
//                                   <div className="tool-result-item">
//                                     <span className="tool-result-label">Actual URL:</span>
//                                     <span className={`tool-result-value ${
//                                       currentEmail.analysis.linkAnalysis.risk === 'HIGH' || currentEmail.analysis.linkAnalysis.risk === 'CRITICAL' 
//                                         ? 'danger' : 'safe'
//                                     }`}>
//                                       {currentEmail.analysis.linkAnalysis.actualURL}
//                                     </span>
//                                   </div>
//                                   <div className="tool-result-item">
//                                     <span className="tool-result-label">Risk Level:</span>
//                                     <span className={`tool-result-value font-bold ${
//                                       currentEmail.analysis.linkAnalysis.risk === 'HIGH' ? 'text-red-500' :
//                                       currentEmail.analysis.linkAnalysis.risk === 'CRITICAL' ? 'text-red-600' :
//                                       'text-green-500'
//                                     }`}>
//                                       {currentEmail.analysis.linkAnalysis.risk}
//                                     </span>
//                                   </div>
//                                 </div>
//                               </div>
//                             )}

//                             {selectedTool === 'headers' && (
//                               <div>
//                                 <div className="tool-result-title">Email Headers:</div>
//                                 <div style={{ marginTop: '0.5rem' }}>
//                                   <div className="tool-result-item">
//                                     <span className="tool-result-label">SPF:</span>
//                                     <span className={`tool-result-value font-bold ${
//                                       currentEmail.analysis.headers.spf === 'PASS' ? 'text-green-500' : 'text-red-500'
//                                     }`}>
//                                       {currentEmail.analysis.headers.spf}
//                                     </span>
//                                   </div>
//                                   <div className="tool-result-item">
//                                     <span className="tool-result-label">DKIM:</span>
//                                     <span className={`tool-result-value font-bold ${
//                                       currentEmail.analysis.headers.dkim === 'PASS' ? 'text-green-500' : 'text-red-500'
//                                     }`}>
//                                       {currentEmail.analysis.headers.dkim}
//                                     </span>
//                                   </div>
//                                   <div className="tool-result-item">
//                                     <span className="tool-result-label">Location:</span>
//                                     <span className="tool-result-value">{currentEmail.analysis.headers.location}</span>
//                                   </div>
//                                 </div>
//                               </div>
//                             )}

//                             {selectedTool === 'flags' && (
//                               <div>
//                                 <div className="tool-result-title">Red Flags Detected:</div>
//                                 {currentEmail.analysis.redFlags.length > 0 ? (
//                                   <ul className="red-flags">
//                                     {currentEmail.analysis.redFlags.map((flag, i) => (
//                                       <li key={i} className="red-flag">
//                                         <span className="red-flag-icon">⚠️</span>
//                                         {flag}
//                                       </li>
//                                     ))}
//                                   </ul>
//                                 ) : (
//                                   <div className="no-flags">✅ No red flags detected</div>
//                                 )}
//                               </div>
//                             )}
//                           </motion.div>
//                         )}
//                       </AnimatePresence>
//                     </div>

//                     {/* Decision Buttons */}
//                     <div className="decision-section">
//                       <div className="decision-buttons">
//                         <motion.button
//                           onClick={() => handleDecision(true)}
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                           className="decision-button phishing"
//                         >
//                           🚩 FLAG AS PHISHING
//                         </motion.button>
//                         <motion.button
//                           onClick={() => handleDecision(false)}
//                           whileHover={{ scale: 1.02 }}
//                           whileTap={{ scale: 0.98 }}
//                           className="decision-button legitimate"
//                         >
//                           ✅ MARK LEGITIMATE
//                         </motion.button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* BREACH DIALOGUE */}
//         {stage === 'breach' && (
//           <motion.div 
//             key="breach"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="dialogue-screen"
//           >
//             <div className="dialogue-container" style={{ background: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.5)' }}>
//               <div className="dialogue-header">
//                 <h1 className="dialogue-title" style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
//                   DATA BREACH
//                 </h1>
//                 <p className="dialogue-subtitle">Security Compromise Detected</p>
//               </div>

//               <div className="dialogue-scene" style={{ background: 'rgba(239, 68, 68, 0.05)' }}>
//                 <div className="character">
//                   <div className={`character-avatar ${dialogues.breach[dialogueIndex].speaker === 'AI' ? 'ai-avatar' : 'student-avatar'}`}
//                        style={{ background: dialogues.breach[dialogueIndex].speaker === 'AI' ? 
//                          'linear-gradient(135deg, #ef4444, #f87171)' : 
//                          'linear-gradient(135deg, #8b5cf6, #ec4899)' }}>
//                     {dialogues.breach[dialogueIndex].speaker === 'AI' ? '🚨' : '😱'}
//                   </div>
//                   <div className={`character-name ${dialogues.breach[dialogueIndex].speaker === 'AI' ? 'ai-name' : 'student-name'}`}
//                        style={{ color: dialogues.breach[dialogueIndex].speaker === 'AI' ? '#f87171' : '#c084fc' }}>
//                     {dialogues.breach[dialogueIndex].speaker}
//                   </div>
//                   <div className="dialogue-text" style={{ borderLeftColor: '#ef4444', background: 'rgba(239, 68, 68, 0.1)' }}>
//                     {dialogues.breach[dialogueIndex].text}
//                   </div>
//                 </div>
//               </div>

//               <div className="dialogue-controls">
//                 <div className="dialogue-progress">
//                   {dialogues.breach.map((_, i) => (
//                     <div
//                       key={i}
//                       className={`progress-dot ${i === dialogueIndex ? 'active' : ''}`}
//                       style={{ backgroundColor: i === dialogueIndex ? '#ef4444' : '#475569' }}
//                     />
//                   ))}
//                 </div>
//                 <button 
//                   onClick={nextDialogue}
//                   className="continue-button"
//                   style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)' }}
//                 >
//                   Continue →
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         )}

//         {/* RESULTS STAGE */}
//         {stage === 'results' && (
//           <motion.div 
//             key="results"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             className="results-screen"
//           >
//             <div className="results-container">
//               <div className="results-box">
//                 {/* Result Header */}
//                 <div className="results-header">
//                   <div className={`results-title ${gameResult === 'win' ? 'success' : 'breach'}`}>
//                     {gameResult === 'win' ? '🛡️ MISSION SUCCESS' : '🚨 DATA BREACH'}
//                   </div>
//                   <p className="results-message">
//                     {gameResult === 'win' 
//                       ? 'You successfully protected the company from phishing attacks!' 
//                       : 'Critical security breach! Company data has been compromised!'}
//                   </p>
//                 </div>

//                 {/* Stats Grid */}
//                 <div className="stats-grid">
//                   <div className="stat-card">
//                     <div className="stat-value" style={{ color: '#3b82f6' }}>{score}</div>
//                     <div className="stat-label">Final Score</div>
//                   </div>
//                   <div className="stat-card">
//                     <div className="stat-value" style={{ color: '#fbbf24' }}>{streak}</div>
//                     <div className="stat-label">Best Streak</div>
//                   </div>
//                   <div className="stat-card">
//                     <div className="stat-value" style={{ color: '#10b981' }}>
//                       {analyzedEmails.filter(e => e.correct).length}
//                     </div>
//                     <div className="stat-label">Correct</div>
//                   </div>
//                   <div className="stat-card">
//                     <div className="stat-value" style={{ color: '#ef4444' }}>
//                       {analyzedEmails.filter(e => !e.correct).length}
//                     </div>
//                     <div className="stat-label">Wrong</div>
//                   </div>
//                 </div>

//                 {/* Email Analysis Results */}
//                 <div className="analysis-results">
//                   <h3 className="analysis-header">Email Analysis Results:</h3>
//                   <div className="analysis-list">
//                     {analyzedEmails.map((email, i) => (
//                       <motion.div
//                         key={i}
//                         initial={{ opacity: 0, x: -20 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ delay: i * 0.1 }}
//                         className={`analysis-item ${email.correct ? 'correct' : 'incorrect'}`}
//                       >
//                         <div className="analysis-info">
//                           <div className="analysis-subject">{email.subject}</div>
//                           <div className="analysis-from">From: {email.fromDisplay}</div>
//                         </div>
//                         <div className="analysis-result">
//                           <div className={`analysis-status ${email.correct ? 'correct' : 'incorrect'}`}>
//                             {email.correct ? '✓ CORRECT' : '✗ WRONG'}
//                           </div>
//                           <div className={`analysis-points ${email.points > 0 ? 'positive' : 'negative'}`}>
//                             {email.points > 0 ? '+' : ''}{email.points} pts
//                           </div>
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Security Tips */}
//                 <div className="lessons-section">
//                   <h3 className="lessons-header">🎯 Critical Security Lessons:</h3>
//                   <div className="lessons-grid">
//                     <div className="lesson-item">Always verify sender email addresses</div>
//                     <div className="lesson-item">Check actual URLs before clicking</div>
//                     <div className="lesson-item">Be suspicious of urgent requests</div>
//                     <div className="lesson-item">Never share gift card codes via email</div>
//                     <div className="lesson-item">QR codes can hide malicious links</div>
//                     <div className="lesson-item">Validate email authentication (SPF/DKIM)</div>
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="action-buttons">
//                   <motion.button
//                     onClick={resetGame}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="action-button primary"
//                   >
//                     Try Again
//                   </motion.button>
//                   <motion.button
//                     onClick={() => window.location.reload()}
//                     whileHover={{ scale: 1.05 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="action-button secondary"
//                   >
//                     Exit Training
//                   </motion.button>
//                 </div>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default PHISH_HUNTER_STORY;


import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import studentImg from "./assets/Student.png";
import mascotImg from "./assets/Mascot.png";

const PHISH_HUNTER_STORY = () => {
  const [stage, setStage] = useState('intro');
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [securityLevel, setSecurityLevel] = useState(100);
  const [timeLeft, setTimeLeft] = useState(300);
  const [alertActive, setAlertActive] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [emailIndex, setEmailIndex] = useState(0);
  const [currentEmail, setCurrentEmail] = useState(null);
  const [analyzedEmails, setAnalyzedEmails] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [showToolPanel, setShowToolPanel] = useState(false);
  const [hoveringLink, setHoveringLink] = useState(false);
  const [starredEmails, setStarredEmails] = useState([]);

  const emailDatabase = [
    {
      id: 1,
      batch: 1,
      from: "security@paypal.com",
      fromDisplay: "PayPal",
      subject: "URGENT: Account Suspension Notice",
      preview: "Your account will be suspended unless you verify...",
      date: "Dec 14, 2024, 9:41 AM",
      read: false,
      hasAttachment: false,
      content: {
        greeting: "Dear Valued Customer,",
        body: "We've detected suspicious activity on your PayPal account. Your account will be suspended within 24 hours unless you verify your identity immediately.\n\nClick the button below to secure your account and prevent unauthorized access.",
        button: "Verify Account Now",
        link: "https://secure-paypal-verify.com/login",
        attachments: [],
        qrCode: false
      },
      analysis: {
        linkAnalysis: {
          displayText: "https://secure-paypal-verify.com/login",
          actualURL: "http://phishing-site.ru/paypal-login",
          risk: "CRITICAL"
        },
        headers: {
          spf: "FAIL",
          dkim: "FAIL",
          location: "Unknown (VPN detected)",
          replyTo: "admin@phishing-site.ru"
        },
        redFlags: [
          "Urgent action required with threat",
          "Account suspension scare tactic",
          "Fake security alert from non-PayPal domain",
          "Suspicious sender domain (not paypal.com)",
          "Failed SPF and DKIM authentication",
          "Reply-to address doesn't match sender"
        ]
      },
      isPhishing: true
    },
    {
      id: 2,
      batch: 1,
      from: "newsletter@amazon.com",
      fromDisplay: "Amazon",
      subject: "Your Weekly Deals Are Here! 🎁",
      preview: "Check out these amazing deals just for you...",
      date: "Dec 14, 2024, 8:15 AM",
      read: false,
      hasAttachment: false,
      content: {
        greeting: "Hello,",
        body: "We've selected some amazing deals based on your shopping history.\n\nSave up to 70% on electronics, books, and home goods this week only. These deals expire Sunday at midnight.",
        button: "Shop Deals",
        link: "https://www.amazon.com/deals/weekly",
        attachments: [],
        qrCode: false
      },
      analysis: {
        linkAnalysis: {
          displayText: "https://www.amazon.com/deals/weekly",
          actualURL: "https://www.amazon.com/deals/weekly",
          risk: "LOW"
        },
        headers: {
          spf: "PASS",
          dkim: "PASS",
          location: "Seattle, WA, USA",
          replyTo: "newsletter@amazon.com"
        },
        redFlags: []
      },
      isPhishing: false
    },
    {
      id: 3,
      batch: 1,
      from: "hr@techcorp.com",
      fromDisplay: "Sarah Chen - HR Department",
      subject: "Updated Employee Handbook - Action Required",
      preview: "Please review the updated policies and acknowledge...",
      date: "Dec 13, 2024, 4:30 PM",
      read: false,
      hasAttachment: true,
      content: {
        greeting: "Dear Team,",
        body: "We've updated our employee handbook with new remote work policies and benefits information for 2025.\n\nPlease review the attached document and acknowledge receipt by Friday, December 20th.\n\nIf you have any questions, feel free to reach out to HR.",
        button: null,
        link: null,
        attachments: ["Employee_Handbook_2024.pdf (2.4 MB)"],
        qrCode: false
      },
      analysis: {
        headers: {
          spf: "PASS",
          dkim: "PASS",
          location: "New York, NY, USA",
          replyTo: "hr@techcorp.com"
        },
        redFlags: []
      },
      isPhishing: false
    },
    {
      id: 4,
      batch: 1,
      from: "microsoft@security-update.com",
      fromDisplay: "Microsoft Security Team",
      subject: "⚠️ CRITICAL: Windows Security Update Required",
      preview: "Your computer is at risk - update now...",
      date: "Dec 14, 2024, 7:22 AM",
      read: false,
      hasAttachment: true,
      content: {
        greeting: "IMPORTANT SECURITY NOTICE",
        body: "Your Windows system has detected critical vulnerabilities that could lead to data loss and system compromise.\n\nImmediate action required. Download and install the security patch now to protect your computer.\n\nFailure to update may result in:",
        button: "Download Security Patch",
        link: "https://windows-update-secure.com/patch",
        attachments: ["SecurityPatch_KB5034441.exe (847 KB)"],
        qrCode: false,
        bulletPoints: [
          "Unauthorized access to personal files",
          "Ransomware infection",
          "Credential theft"
        ]
      },
      analysis: {
        linkAnalysis: {
          displayText: "https://windows-update-secure.com/patch",
          actualURL: "http://malware-distribution.net/windows-patch.exe",
          risk: "CRITICAL"
        },
        headers: {
          spf: "FAIL",
          dkim: "FAIL",
          location: "Eastern Europe",
          replyTo: "support@malware-distribution.net"
        },
        redFlags: [
          "Microsoft never sends patches via email",
          "Fake Microsoft domain (security-update.com)",
          "Executable attachment (.exe) - extremely dangerous",
          "Urgent security threat language",
          "Failed SPF and DKIM authentication",
          "Reply-to exposes real malicious domain"
        ]
      },
      isPhishing: true
    },
    {
      id: 5,
      batch: 1,
      from: "info@netflix.com",
      fromDisplay: "Netflix",
      subject: "Update your payment method",
      preview: "We couldn't process your last payment...",
      date: "Dec 13, 2024, 11:48 AM",
      read: false,
      hasAttachment: false,
      content: {
        greeting: "Hi there,",
        body: "We were unable to process your monthly payment of $15.99.\n\nPlease update your payment information to avoid service interruption. We accept all major credit cards, debit cards, and PayPal.\n\nIf you believe this is an error, please contact our support team.",
        button: "Update Payment Info",
        link: "https://www.netflix.com/payment/update",
        attachments: [],
        qrCode: false
      },
      analysis: {
        linkAnalysis: {
          displayText: "https://www.netflix.com/payment/update",
          actualURL: "https://www.netflix.com/payment/update",
          risk: "LOW"
        },
        headers: {
          spf: "PASS",
          dkim: "PASS",
          location: "Los Gatos, CA, USA",
          replyTo: "info@netflix.com"
        },
        redFlags: []
      },
      isPhishing: false
    },
    {
      id: 6,
      batch: 2,
      from: "ceo@company-executive.com",
      fromDisplay: "John Smith",
      subject: "Quick favor needed",
      preview: "I'm in a meeting and need your help...",
      date: "Dec 14, 2024, 10:05 AM",
      read: false,
      hasAttachment: false,
      content: {
        greeting: "Hi,",
        body: "I'm stuck in an important meeting and need to close a deal quickly. Can you purchase $500 in Apple gift cards and send me the codes?\n\nI'll reimburse you immediately through expense report. This is time-sensitive - need it within the hour.\n\nPlease keep this between us for now.\n\nThanks,\nJohn",
        button: null,
        link: null,
        attachments: [],
        qrCode: false
      },
      analysis: {
        headers: {
          spf: "SOFTFAIL",
          dkim: "FAIL",
          location: "Unknown (Proxy detected)",
          replyTo: "john.smith.personal@gmail.com"
        },
        redFlags: [
          "CEO impersonation (common BEC attack)",
          "Urgent gift card request (huge red flag)",
          "Unusual payment method for business",
          "Request for secrecy ('keep between us')",
          "External email domain for internal CEO",
          "Reply-to is a personal Gmail account"
        ]
      },
      isPhishing: true
    },
    {
      id: 7,
      batch: 2,
      from: "no-reply@dhl-shipment.com",
      fromDisplay: "DHL Express Shipping",
      subject: "Delivery Failed - Action Required",
      preview: "We couldn't deliver your package today...",
      date: "Dec 14, 2024, 6:33 AM",
      read: false,
      hasAttachment: true,
      content: {
        greeting: "Dear Customer,",
        body: "Our delivery driver attempted to deliver your package (Tracking: DHL-2024-8847291) but encountered an issue.\n\nA customs fee of $25.50 is required before we can release your package for redelivery.\n\nPlease scan the QR code below or click the link to make the payment. Your package will be scheduled for redelivery within 24 hours of payment confirmation.",
        button: "Pay Customs Fee",
        link: "https://dhl-customs-payment.com/fee",
        attachments: ["Shipping_Invoice_DHL.pdf (156 KB)"],
        qrCode: true
      },
      analysis: {
        linkAnalysis: {
          displayText: "https://dhl-customs-payment.com/fee",
          actualURL: "http://fake-dhl-phishing.site/payment",
          risk: "HIGH"
        },
        headers: {
          spf: "FAIL",
          dkim: "FAIL",
          location: "Asia Pacific",
          replyTo: "payments@fake-dhl-phishing.site"
        },
        redFlags: [
          "DHL doesn't use dhl-shipment.com domain",
          "Unexpected customs fee demand",
          "QR code payment request (growing threat)",
          "Fake tracking number format",
          "Urgent delivery pressure",
          "Failed all authentication checks"
        ]
      },
      isPhishing: true
    },
    {
      id: 8,
      batch: 2,
      from: "notifications@linkedin.com",
      fromDisplay: "LinkedIn",
      subject: "You have 5 new profile views",
      preview: "See who's checking out your profile...",
      date: "Dec 13, 2024, 3:12 PM",
      read: false,
      hasAttachment: false,
      content: {
        greeting: "Hi,",
        body: "Your profile is getting noticed! 5 people viewed your profile this week, including someone from Google.\n\nSee who they are and connect with them to expand your professional network.",
        button: "See Who Viewed Your Profile",
        link: "https://www.linkedin.com/analytics/profile",
        attachments: [],
        qrCode: false
      },
      analysis: {
        linkAnalysis: {
          displayText: "https://www.linkedin.com/analytics/profile",
          actualURL: "https://www.linkedin.com/analytics/profile",
          risk: "LOW"
        },
        headers: {
          spf: "PASS",
          dkim: "PASS",
          location: "Sunnyvale, CA, USA",
          replyTo: "notifications@linkedin.com"
        },
        redFlags: []
      },
      isPhishing: false
    },
    {
      id: 9,
      batch: 2,
      from: "bank-secure@chase.com",
      fromDisplay: "Chase Bank Security",
      subject: "Suspicious Login Attempt Detected",
      preview: "Someone tried to access your account from Russia...",
      date: "Dec 14, 2024, 5:17 AM",
      read: false,
      hasAttachment: true,
      content: {
        greeting: "Dear Chase Customer,",
        body: "We detected a login attempt to your Chase account from a new device:\n\n• Location: Moscow, Russia\n• Device: Unknown Windows PC\n• Time: December 14, 2024 at 5:12 AM EST\n\nIf this wasn't you, your account may be compromised. Please secure your account immediately by verifying your identity below.\n\nWe recommend changing your password and enabling two-factor authentication.",
        button: "Secure My Account",
        link: "https://chase.secure-login.com/verify",
        attachments: ["Login_Attempt_Report.pdf (89 KB)"],
        qrCode: false
      },
      analysis: {
        linkAnalysis: {
          displayText: "https://chase.secure-login.com/verify",
          actualURL: "http://chase-phishing.ru/account/login",
          risk: "CRITICAL"
        },
        headers: {
          spf: "FAIL",
          dkim: "FAIL",
          location: "Moscow, Russia",
          replyTo: "security@chase-phishing.ru"
        },
        redFlags: [
          "Chase doesn't use chase.secure-login.com",
          "Fake domain impersonating Chase",
          "Fear-based social engineering (Russia location)",
          "Detailed fake login attempt info",
          "Reply-to exposes Russian phishing domain",
          "Failed authentication completely"
        ]
      },
      isPhishing: true
    },
    {
      id: 10,
      batch: 2,
      from: "feedback@slack.com",
      fromDisplay: "Slack",
      subject: "You were mentioned in #general",
      preview: "John mentioned you in a conversation...",
      date: "Dec 13, 2024, 2:45 PM",
      read: false,
      hasAttachment: false,
      content: {
        greeting: "Hello,",
        body: "John mentioned you in #general:\n\n\"Hey @you, do you have the latest report? Need it for the 3pm meeting.\"\n\n—\nSlack",
        button: "Open Slack",
        link: "https://slack.com/messages/mention",
        attachments: [],
        qrCode: false
      },
      analysis: {
        linkAnalysis: {
          displayText: "https://slack.com/messages/mention",
          actualURL: "https://slack.com/messages/mention",
          risk: "LOW"
        },
        headers: {
          spf: "PASS",
          dkim: "PASS",
          location: "San Francisco, CA, USA",
          replyTo: "feedback@slack.com"
        },
        redFlags: []
      },
      isPhishing: false
    },
    {
      id: 11,
      batch: 3,
      from: "no-reply@microsftonline.com",
      fromDisplay: "Microsoft 365",
      subject: "John Doe shared a document with you",
      preview: "Q4_Financial_Report.xlsx - Open in Microsoft 365...",
      date: "Dec 14, 2024, 8:55 AM",
      read: false,
      hasAttachment: true,
      content: {
        greeting: "Hi,",
        body: "John Doe has shared a document with you:\n\n📄 Q4_Financial_Report.xlsx\n\nThis file requires Microsoft 365 to view. Please sign in to your account to access the shared document.",
        button: "Open in Microsoft 365",
        link: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
        attachments: ["Q4_Financial_Report.xlsx (1.2 MB)"],
        qrCode: false
      },
      analysis: {
        linkAnalysis: {
          displayText: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
          actualURL: "http://fake-microsoft-login.com/steal-credentials",
          risk: "CRITICAL"
        },
        headers: {
          spf: "SOFTFAIL",
          dkim: "FAIL",
          location: "Unknown (Cloudflare bypass)",
          replyTo: "no-reply@microsftonline.com"
        },
        redFlags: [
          "Typosquatting: 'microsft' not 'microsoft'",
          "Fake OAuth endpoint (looks real but isn't)",
          "Document sharing lure (very common attack)",
          "Credential harvesting via fake login",
          "SOFTFAIL SPF means domain is suspicious"
        ]
      },
      isPhishing: true
    },
    {
      id: 12,
      batch: 3,
      from: "no-reply@google.com",
      fromDisplay: "Google",
      subject: "Account recovery attempt",
      preview: "A recovery attempt was made on your account...",
      date: "Dec 14, 2024, 4:28 AM",
      read: false,
      hasAttachment: false,
      content: {
        greeting: "Hello,",
        body: "We noticed someone tried to recover your Google account.\n\nIf this was you, you can ignore this email.\n\nIf this wasn't you, please secure your account by reviewing your recent activity and changing your password.",
        button: "Review Account Activity",
        link: "https://myaccount.google.com/security-alert",
        attachments: [],
        qrCode: false
      },
      analysis: {
        linkAnalysis: {
          displayText: "https://myaccount.google.com/security-alert",
          actualURL: "https://myaccount.google.com/security-alert",
          risk: "LOW"
        },
        headers: {
          spf: "PASS",
          dkim: "PASS",
          location: "Mountain View, CA, USA",
          replyTo: "no-reply@google.com"
        },
        redFlags: []
      },
      isPhishing: false
    },
    {
      id: 13,
      batch: 3,
      from: "it-support@company-helpdesk.tech",
      fromDisplay: "IT Help Desk",
      subject: "[ACTION REQUIRED] VPN Certificate Expiry",
      preview: "Your VPN certificate will expire in 24 hours...",
      date: "Dec 14, 2024, 7:00 AM",
      read: false,
      hasAttachment: true,
      content: {
        greeting: "Dear Employee,",
        body: "Your VPN access certificate will expire in 24 hours.\n\nTo avoid disruption to your remote work capability, please download and install the new certificate from our secure portal.\n\nThis is mandatory for all remote workers. Non-compliance may result in loss of VPN access.\n\nSteps:\n1. Download the new certificate\n2. Follow the installation guide\n3. Test your VPN connection\n\nContact IT Support if you encounter any issues.",
        button: "Download New Certificate",
        link: "https://vpn.company-helpdesk.tech/certificates",
        attachments: ["New_VPN_Certificate.crt (4 KB)", "VPN_Installation_Guide.pdf (890 KB)"],
        qrCode: false
      },
      analysis: {
        linkAnalysis: {
          displayText: "https://vpn.company-helpdesk.tech/certificates",
          actualURL: "http://company-vpn-phishing.net/steal-credentials",
          risk: "HIGH"
        },
        headers: {
          spf: "FAIL",
          dkim: "FAIL",
          location: "Unknown (Tor exit node)",
          replyTo: "it-support@company-helpdesk.tech"
        },
        redFlags: [
          "Fake IT domain (.tech instead of company domain)",
          "Certificate expiration creates urgency",
          "Suspicious file downloads (.crt can be manipulated)",
          "Tor exit node location (highly suspicious)",
          "Mandatory compliance language pressure"
        ]
      },
      isPhishing: true
    },
    {
      id: 14,
      batch: 3,
      from: "shipment-tracking@amazon.com",
      fromDisplay: "Amazon",
      subject: "Your package has been delivered",
      preview: "Great news! Your package has arrived...",
      date: "Dec 13, 2024, 1:22 PM",
      read: false,
      hasAttachment: false,
      content: {
        greeting: "Hello,",
        body: "Great news! Your package has been delivered.\n\n📦 Order #123-4567890-1234567\nDelivered to: Front door\n\nTrack all your deliveries and manage your orders in Your Orders.",
        button: "Track Package",
        link: "https://www.amazon.com/your-orders",
        attachments: [],
        qrCode: false
      },
      analysis: {
        linkAnalysis: {
          displayText: "https://www.amazon.com/your-orders",
          actualURL: "https://www.amazon.com/your-orders",
          risk: "LOW"
        },
        headers: {
          spf: "PASS",
          dkim: "PASS",
          location: "Seattle, WA, USA",
          replyTo: "shipment-tracking@amazon.com"
        },
        redFlags: []
      },
      isPhishing: false
    },
    {
      id: 15,
      batch: 3,
      from: "security-team@company-alerts.com",
      fromDisplay: "INTERNAL: Security Team",
      subject: "🚨 IMMEDIATE: Data Breach - All Staff",
      preview: "Our systems have detected unauthorized access...",
      date: "Dec 14, 2024, 3:45 AM",
      read: false,
      hasAttachment: true,
      content: {
        greeting: "ATTENTION ALL STAFF",
        body: "EMERGENCY SECURITY NOTICE\n\nWe've detected a data breach affecting employee accounts. Preliminary analysis indicates unauthorized access to HR databases.\n\nIMMEDIATELY change your password using the secure emergency link below. Do NOT use your old password. Do NOT discuss this with anyone outside the security team.\n\nThis is not a drill. Failure to comply within 2 hours will result in mandatory account lockout.\n\n— Security Operations Center",
        button: "EMERGENCY PASSWORD RESET",
        link: "https://password-reset.company-security.com/emergency",
        attachments: ["Breach_Report_CONFIDENTIAL.pdf (234 KB)"],
        qrCode: false
      },
      analysis: {
        linkAnalysis: {
          displayText: "https://password-reset.company-security.com/emergency",
          actualURL: "http://company-breach-phishing.ru/password-harvest",
          risk: "CRITICAL"
        },
        headers: {
          spf: "FAIL",
          dkim: "FAIL",
          location: "North Korea",
          replyTo: "soc@company-breach-phishing.ru"
        },
        redFlags: [
          "Exploiting real breach fears (meta-phishing)",
          "Fake internal security domain",
          "Password harvesting via fake emergency",
          "North Korea origin (nation-state indicator)",
          "'Do not discuss' = prevent verification",
          "Reply-to completely exposes the scam"
        ]
      },
      isPhishing: true
    }
  ];

  const dialogues = {
    intro: [
      {
        speaker: "AI",
        text: "Welcome to PHISH HUNTER, trainee. I'm ARIA, your AI security instructor. Today you'll face a real-world phishing simulation."
      },
      {
        speaker: "Student",
        text: "ARIA? What's happening? I heard there's a security threat..."
      },
      {
        speaker: "AI",
        text: "Correct. Our email filters have flagged suspicious messages that made it to employee inboxes. You'll analyze each email and decide: phishing or legitimate."
      },
      {
        speaker: "Student",
        text: "How will I know the difference? Some phishing emails look so real..."
      },
      {
        speaker: "AI",
        text: "That's exactly the point. Use the investigation tools — inspect links, analyze headers, check for red flags. Look for what doesn't add up."
      },
      {
        speaker: "Student",
        text: "What happens if I make a wrong call?"
      },
      {
        speaker: "AI",
        text: "Each mistake weakens our security level. If it drops too low... we face a data breach. Stay sharp. Let's begin."
      }
    ],
    breach: [
      {
        speaker: "AI",
        text: "🚨 CRITICAL ALERT. Our perimeter has been breached. Multiple accounts compromised."
      },
      {
        speaker: "Student",
        text: "No... some of those emails were so convincing. I didn't see the signs..."
      },
      {
        speaker: "AI",
        text: "The attackers used CEO impersonation, typosquatting, fake OAuth pages. They exploited urgency and trust."
      },
      {
        speaker: "Student",
        text: "Is there anything we can do now?"
      },
      {
        speaker: "AI",
        text: "We initiate incident response. But understand — in reality, breaches cost companies millions. Your mistakes here are lessons that prevent real damage."
      },
      {
        speaker: "Student",
        text: "I won't let this happen again. Show me what I missed."
      },
      {
        speaker: "AI",
        text: "That's the right mindset. Let's review every email and learn exactly what gave them away."
      }
    ]
  };

  useEffect(() => {
    if (emailDatabase.length > 0) {
      setCurrentEmail(emailDatabase[0]);
    }
  }, []);

  useEffect(() => {
    if (stage === 'battle' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && stage === 'battle') {
      endGame(false);
    }
  }, [timeLeft, stage]);

  useEffect(() => {
    if (securityLevel <= 30 && !alertActive && stage === 'battle') {
      setAlertActive(true);
      setTimeout(() => {
        setAlertActive(false);
        if (securityLevel <= 20) {
          setStage('breach');
          setDialogueIndex(0);
        }
      }, 3000);
    }
  }, [securityLevel, alertActive, stage]);

  const nextDialogue = () => {
    const currentDialogues = stage === 'intro' ? dialogues.intro : dialogues.breach;
    if (dialogueIndex < currentDialogues.length - 1) {
      setDialogueIndex(dialogueIndex + 1);
    } else {
      if (stage === 'intro') {
        setStage('battle');
      } else if (stage === 'breach') {
        endGame(false);
      }
    }
  };

  const handleDecision = (isPhishing) => {
    if (!currentEmail) return;
    const correct = isPhishing === currentEmail.isPhishing;
    let points = 0;
    let securityChange = 0;

    if (correct) {
      points = currentEmail.batch * 100 + (streak * 10);
      securityChange = 8;
      setScore(score + points);
      const newStreak = streak + 1;
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
      setSecurityLevel(Math.min(100, securityLevel + securityChange));
    } else {
      points = -(currentEmail.batch * 50);
      securityChange = -18;
      setScore(score + points);
      setStreak(0);
      setSecurityLevel(Math.max(0, securityLevel + securityChange));
    }

    const analysis = {
      ...currentEmail,
      userDecision: isPhishing,
      correct: correct,
      points: points
    };
    setAnalyzedEmails([...analyzedEmails, analysis]);

    if (emailIndex < emailDatabase.length - 1) {
      const nextIndex = emailIndex + 1;
      setEmailIndex(nextIndex);
      setCurrentEmail(emailDatabase[nextIndex]);
      setSelectedTool(null);
      setShowToolPanel(false);
    } else {
      endGame(securityLevel > 50);
    }
  };

  const endGame = (won) => {
    setGameResult(won ? 'win' : 'breach');
    setStage('results');
  };

  const resetGame = () => {
    setStage('intro');
    setDialogueIndex(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setSecurityLevel(100);
    setTimeLeft(300);
    setAlertActive(false);
    setGameResult(null);
    setEmailIndex(0);
    setCurrentEmail(emailDatabase[0]);
    setAnalyzedEmails([]);
    setShowToolPanel(false);
    setSelectedTool(null);
    setStarredEmails([]);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getSenderInitial = (name) => {
    return name.charAt(0).toUpperCase();
  };

  const getSenderColor = (email) => {
    const colors = ['#4285f4', '#ea4335', '#fbbc04', '#34a853', '#ff6d01', '#46bdc6', '#7baaf7', '#f07b72'];
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      hash = email.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const getRiskColor = (risk) => {
    switch (risk) {
      case 'CRITICAL': return '#dc2626';
      case 'HIGH': return '#ea580c';
      case 'MEDIUM': return '#d97706';
      case 'LOW': return '#16a34a';
      default: return '#6b7280';
    }
  };

  return (
    <div className="game-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Google+Sans:wght@400;500;700&family=Roboto:wght@300;400;500;700&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Roboto', 'Segoe UI', system-ui, sans-serif;
          background: #1a1a2e;
          color: #e0e0e0;
          overflow-x: hidden;
        }

        .game-root {
          min-height: 100vh;
          background: #1a1a2e;
        }

        /* ===== DIALOGUE SCREENS ===== */
        .dialogue-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: radial-gradient(ellipse at center, #1e2a4a 0%, #1a1a2e 70%);
        }

        .dialogue-box {
          width: 100%;
          max-width: 720px;
          background: linear-gradient(145deg, #1e2a4a, #162036);
          border: 1px solid rgba(99, 132, 255, 0.15);
          border-radius: 16px;
          padding: 2.5rem;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05);
        }

        .dialogue-logo {
          text-align: center;
          margin-bottom: 2rem;
        }

        .dialogue-logo h1 {
          font-family: 'Google Sans', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #6384ff, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.5px;
        }

        .dialogue-logo p {
          color: #6b7fa3;
          font-size: 0.9rem;
          margin-top: 0.35rem;
        }

        .dialogue-scene {
          background: rgba(0,0,0,0.2);
          border-radius: 12px;
          padding: 1.75rem;
          margin-bottom: 1.75rem;
          border: 1px solid rgba(99, 132, 255, 0.08);
        }

        .char-row {
          display: flex;
          gap: 1.25rem;
          align-items: flex-start;
        }

        .char-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          overflow: hidden;
          flex-shrink: 0;
          border: 2px solid rgba(99,132,255,0.3);
        }

        .char-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .char-content {
          flex: 1;
        }

        .char-name {
          font-family: 'Google Sans', sans-serif;
          font-weight: 700;
          font-size: 0.85rem;
          color: #6384ff;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .char-text {
          font-size: 1.05rem;
          line-height: 1.65;
          color: #c8d6e5;
        }

        .dialogue-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .dots {
          display: flex;
          gap: 6px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #2a3a5c;
          transition: all 0.3s;
        }

        .dot.active {
          background: #6384ff;
          box-shadow: 0 0 8px rgba(99,132,255,0.5);
        }

        .btn-continue {
          font-family: 'Google Sans', sans-serif;
          background: linear-gradient(135deg, #6384ff, #7c6fff);
          color: white;
          border: none;
          padding: 0.7rem 1.75rem;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-continue:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(99,132,255,0.35);
        }

        /* ===== BREACH DIALOGUE ===== */
        .breach-dialogue .dialogue-box {
          border-color: rgba(239, 68, 68, 0.3);
          background: linear-gradient(145deg, #2a1a1a, #1a1a2e);
        }

        .breach-dialogue .char-name {
          color: #f87171;
        }

        .breach-dialogue .dot.active {
          background: #ef4444;
          box-shadow: 0 0 8px rgba(239,68,68,0.5);
        }

        .breach-dialogue .btn-continue {
          background: linear-gradient(135deg, #dc2626, #ef4444);
        }

        /* ===== BATTLE SCREEN ===== */
        .battle-screen {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #0f0f1a;
        }

        /* Top Bar */
        .top-bar {
          background: #1a1a2e;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 0.6rem 1.25rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 100;
        }

        .top-left {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .game-title {
          font-family: 'Google Sans', sans-serif;
          font-weight: 700;
          font-size: 1.1rem;
          color: #6384ff;
        }

        .security-pill {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(0,0,0,0.3);
          padding: 0.35rem 0.85rem;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .security-label {
          font-size: 0.75rem;
          color: #6b7fa3;
          font-weight: 500;
        }

        .security-bar-mini {
          width: 80px;
          height: 6px;
          background: #2a2a4a;
          border-radius: 3px;
          overflow: hidden;
        }

        .security-fill-mini {
          height: 100%;
          border-radius: 3px;
          transition: width 0.5s ease, background 0.3s;
        }

        .security-fill-mini.high { background: #22c55e; }
        .security-fill-mini.medium { background: #eab308; }
        .security-fill-mini.low { background: #ef4444; }

        .security-pct {
          font-size: 0.8rem;
          font-weight: 700;
          min-width: 32px;
        }

        .top-right {
          display: flex;
          align-items: center;
          gap: 1.5rem;
        }

        .stat-chip {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          font-size: 0.85rem;
        }

        .stat-chip-label {
          color: #6b7fa3;
          font-size: 0.75rem;
        }

        .stat-chip-value {
          font-weight: 700;
          font-family: 'Google Sans', sans-serif;
        }

        .time-display {
          font-family: 'Google Sans', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          padding: 0.3rem 0.75rem;
          background: rgba(0,0,0,0.3);
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.08);
        }

        .time-display.critical {
          color: #ef4444;
          border-color: rgba(239,68,68,0.3);
          animation: pulse-red 1s infinite;
        }

        @keyframes pulse-red {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }

        /* Main Layout */
        .battle-main {
          flex: 1;
          display: grid;
          grid-template-columns: 380px 1fr;
          overflow: hidden;
        }

        /* ===== EMAIL LIST (Sidebar) ===== */
        .email-sidebar {
          background: #141428;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex;
          flex-direction: column;
          height: calc(100vh - 52px);
        }

        .sidebar-header {
          padding: 1rem 1.25rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .sidebar-title {
          font-family: 'Google Sans', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          color: #e0e0e0;
        }

        .email-count {
          font-size: 0.8rem;
          color: #6b7fa3;
          background: rgba(255,255,255,0.05);
          padding: 0.15rem 0.6rem;
          border-radius: 10px;
        }

        .email-list-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 0.5rem;
        }

        .email-list-scroll::-webkit-scrollbar {
          width: 6px;
        }

        .email-list-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .email-list-scroll::-webkit-scrollbar-thumb {
          background: rgba(99,132,255,0.2);
          border-radius: 3px;
        }

        .email-row {
          display: flex;
          gap: 0.75rem;
          padding: 0.85rem;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s;
          border: 1px solid transparent;
          margin-bottom: 2px;
          position: relative;
        }

        .email-row:hover {
          background: rgba(99,132,255,0.06);
        }

        .email-row.active {
          background: rgba(99,132,255,0.1);
          border-color: rgba(99,132,255,0.2);
        }

        .email-row.analyzed-correct {
          opacity: 0.6;
        }

        .email-row.analyzed-wrong {
          opacity: 0.6;
        }

        .email-row-status {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          font-size: 0.75rem;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .email-row-status.correct {
          background: rgba(34,197,94,0.2);
          color: #22c55e;
        }

        .email-row-status.wrong {
          background: rgba(239,68,68,0.2);
          color: #ef4444;
        }

        .email-row-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1rem;
          color: white;
          flex-shrink: 0;
        }

        .email-row-content {
          flex: 1;
          min-width: 0;
        }

        .email-row-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.2rem;
        }

        .email-row-sender {
          font-weight: 600;
          font-size: 0.85rem;
          color: #e0e0e0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .email-row-date {
          font-size: 0.7rem;
          color: #6b7fa3;
          flex-shrink: 0;
          margin-left: 0.5rem;
        }

        .email-row-subject {
          font-size: 0.82rem;
          color: #a0aec0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-bottom: 0.15rem;
        }

        .email-row-preview {
          font-size: 0.75rem;
          color: #4a5568;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .email-row-preview .attachment-icon {
          color: #6b7fa3;
          flex-shrink: 0;
        }

        /* ===== EMAIL DETAIL PANEL ===== */
        .email-detail {
          background: #1a1a2e;
          display: flex;
          flex-direction: column;
          height: calc(100vh - 52px);
          overflow: hidden;
        }

        .email-detail-scroll {
          flex: 1;
          overflow-y: auto;
          padding: 2rem;
        }

        .email-detail-scroll::-webkit-scrollbar {
          width: 8px;
        }

        .email-detail-scroll::-webkit-scrollbar-track {
          background: transparent;
        }

        .email-detail-scroll::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 4px;
        }

        /* Email Header Area */
        .email-subject-line {
          font-family: 'Google Sans', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1.25rem;
          line-height: 1.3;
        }

        .email-meta-bar {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding-bottom: 1.25rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }

        .meta-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.1rem;
          color: white;
          flex-shrink: 0;
        }

        .meta-info {
          flex: 1;
        }

        .meta-sender-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          margin-bottom: 0.15rem;
        }

        .meta-sender-name {
          font-weight: 600;
          font-size: 0.95rem;
          color: #e0e0e0;
        }

        .meta-date {
          font-size: 0.8rem;
          color: #6b7fa3;
        }

        .meta-email-addr {
          font-size: 0.82rem;
          color: #6b7fa3;
        }

        .meta-to {
          font-size: 0.82rem;
          color: #4a5568;
          margin-top: 0.15rem;
        }

        .batch-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .batch-tag.b1 {
          background: rgba(34,197,94,0.12);
          color: #22c55e;
        }

        .batch-tag.b2 {
          background: rgba(234,179,8,0.12);
          color: #eab308;
        }

        .batch-tag.b3 {
          background: rgba(239,68,68,0.12);
          color: #ef4444;
        }

        /* Email Body */
        .email-body-content {
          margin-bottom: 2rem;
        }

        .email-greeting-text {
          font-size: 0.95rem;
          color: #c8d6e5;
          margin-bottom: 1rem;
        }

        .email-body-text {
          font-size: 0.9rem;
          color: #a0aec0;
          line-height: 1.7;
          white-space: pre-line;
        }

        .email-bullet-list {
          margin: 1rem 0;
          padding-left: 1.25rem;
        }

        .email-bullet-list li {
          font-size: 0.9rem;
          color: #a0aec0;
          line-height: 1.6;
          margin-bottom: 0.35rem;
        }

        .email-signature {
          margin-top: 1.5rem;
          color: #a0aec0;
          font-size: 0.9rem;
        }

        /* CTA Button in Email */
        .email-cta {
          display: inline-block;
          margin: 1.5rem 0;
          padding: 0.75rem 1.75rem;
          background: linear-gradient(135deg, #4285f4, #357ae8);
          color: white;
          border-radius: 6px;
          font-weight: 600;
          font-size: 0.9rem;
          text-decoration: none;
          cursor: default;
          position: relative;
        }

        .email-cta::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(66,133,244,0.3);
        }

        /* QR Code in Email */
        .email-qr-block {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          margin: 1.5rem 0;
          padding: 1rem;
          background: white;
          border-radius: 8px;
        }

        .email-qr-canvas {
          width: 120px;
          height: 120px;
          background: #f0f0f0;
          border-radius: 4px;
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          grid-template-rows: repeat(8, 1fr);
          gap: 1px;
          padding: 4px;
        }

        .qr-cell {
          border-radius: 1px;
        }

        .qr-cell.dark { background: #1a1a1a; }
        .qr-cell.light { background: #f0f0f0; }

        .email-qr-label {
          font-size: 0.7rem;
          color: #666;
          margin-top: 0.5rem;
          font-weight: 500;
        }

        /* Attachments */
        .email-attachments-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin: 1.5rem 0;
          padding: 1rem;
          background: rgba(0,0,0,0.15);
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .attachment-chip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.85rem;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 6px;
          cursor: default;
          transition: all 0.15s;
        }

        .attachment-chip.dangerous {
          border-color: rgba(239,68,68,0.3);
          background: rgba(239,68,68,0.05);
        }

        .attachment-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
        }

        .attachment-icon-wrap.pdf {
          background: rgba(239,68,68,0.15);
          color: #ef4444;
        }

        .attachment-icon-wrap.exe {
          background: rgba(239,68,68,0.25);
          color: #ef4444;
        }

        .attachment-icon-wrap.other {
          background: rgba(99,132,255,0.15);
          color: #6384ff;
        }

        .attachment-name {
          font-size: 0.8rem;
          color: #a0aec0;
          font-weight: 500;
        }

        .attachment-size {
          font-size: 0.7rem;
          color: #4a5568;
        }

        /* ===== TOOL PANEL ===== */
        .tool-toggle-bar {
          padding: 1rem 2rem;
          border-top: 1px solid rgba(255,255,255,0.06);
          background: #141428;
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .tool-toggle-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: rgba(99,132,255,0.08);
          border: 1px solid rgba(99,132,255,0.15);
          border-radius: 6px;
          color: #6384ff;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.15s;
          font-family: 'Google Sans', sans-serif;
        }

        .tool-toggle-btn:hover {
          background: rgba(99,132,255,0.15);
        }

        .tool-toggle-btn.active {
          background: rgba(99,132,255,0.2);
          border-color: rgba(99,132,255,0.4);
        }

        .tool-tabs {
          display: flex;
          gap: 0.25rem;
          margin-left: 1rem;
        }

        .tool-tab {
          padding: 0.4rem 0.85rem;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 5px;
          color: #6b7fa3;
          font-size: 0.8rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s;
        }

        .tool-tab:hover {
          color: #a0aec0;
          background: rgba(255,255,255,0.04);
        }

        .tool-tab.active {
          color: #6384ff;
          background: rgba(99,132,255,0.1);
          border-color: rgba(99,132,255,0.2);
        }

        .tool-panel {
          background: #0f0f1a;
          border-top: 1px solid rgba(99,132,255,0.15);
          max-height: 260px;
          overflow-y: auto;
        }

        .tool-panel-inner {
          padding: 1.25rem 2rem;
        }

        .tool-panel-title {
          font-family: 'Google Sans', sans-serif;
          font-weight: 700;
          font-size: 0.9rem;
          color: #6384ff;
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        /* Link Inspector */
        .link-compare {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .link-box {
          background: rgba(0,0,0,0.2);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 8px;
          padding: 0.85rem;
        }

        .link-box-label {
          font-size: 0.7rem;
          color: #6b7fa3;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.4rem;
          font-weight: 600;
        }

        .link-box-url {
          font-family: 'Courier New', monospace;
          font-size: 0.78rem;
          color: #a0aec0;
          word-break: break-all;
          line-height: 1.4;
        }

        .link-box-url.malicious {
          color: #ef4444;
        }

        .link-box-url.safe {
          color: #22c55e;
        }

        .risk-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.3rem 0.75rem;
          border-radius: 4px;
          font-size: 0.78rem;
          font-weight: 700;
          font-family: 'Google Sans', sans-serif;
        }

        .risk-badge.critical {
          background: rgba(220,38,38,0.15);
          color: #dc2626;
          border: 1px solid rgba(220,38,38,0.3);
        }

        .risk-badge.high {
          background: rgba(234,88,12,0.15);
          color: #ea580c;
          border: 1px solid rgba(234,88,12,0.3);
        }

        .risk-badge.low {
          background: rgba(22,163,74,0.15);
          color: #16a34a;
          border: 1px solid rgba(22,163,74,0.3);
        }

        .link-diff-note {
          font-size: 0.82rem;
          color: #fbbf24;
          margin-top: 0.75rem;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }

        /* Header Analysis */
        .header-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.75rem;
          margin-bottom: 1rem;
        }

        .header-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.85rem;
          background: rgba(0,0,0,0.2);
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.04);
        }

        .header-item-label {
          font-size: 0.7rem;
          color: #6b7fa3;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          font-weight: 600;
          min-width: 48px;
        }

        .header-item-value {
          font-size: 0.85rem;
          font-weight: 700;
          font-family: 'Google Sans', sans-serif;
        }

        .header-item-value.pass {
          color: #22c55e;
        }

        .header-item-value.fail {
          color: #ef4444;
        }

        .header-item-value.softfail {
          color: #fbbf24;
        }

        .header-item-value.location {
          color: #a0aec0;
          font-weight: 500;
          font-size: 0.8rem;
        }

        .reply-to-section {
          margin-top: 0.5rem;
          padding: 0.75rem;
          background: rgba(0,0,0,0.2);
          border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.04);
        }

        .reply-to-label {
          font-size: 0.7rem;
          color: #6b7fa3;
          text-transform: uppercase;
          letter-spacing: 0.3px;
          font-weight: 600;
          margin-bottom: 0.3rem;
        }

        .reply-to-value {
          font-family: 'Courier New', monospace;
          font-size: 0.8rem;
          word-break: break-all;
        }

        .reply-to-value.mismatch {
          color: #ef4444;
        }

        .reply-to-value.match {
          color: #22c55e;
        }

        .reply-to-note {
          font-size: 0.78rem;
          color: #fbbf24;
          margin-top: 0.4rem;
        }

        /* Red Flags */
        .flags-list {
          list-style: none;
          padding: 0;
        }

        .flag-item {
          display: flex;
          align-items: flex-start;
          gap: 0.65rem;
          padding: 0.55rem 0;
          border-bottom: 1px solid rgba(255,255,255,0.03);
          font-size: 0.85rem;
          color: #e0e0e0;
        }

        .flag-item:last-child {
          border-bottom: none;
        }

        .flag-icon {
          color: #ef4444;
          flex-shrink: 0;
          margin-top: 0.1rem;
        }

        .no-flags-msg {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem;
          background: rgba(22,163,74,0.08);
          border: 1px solid rgba(22,163,74,0.15);
          border-radius: 8px;
          color: #22c55e;
          font-weight: 600;
          font-size: 0.9rem;
        }

        /* ===== DECISION BAR ===== */
        .decision-bar {
          padding: 1rem 2rem;
          background: #141428;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex;
          gap: 1rem;
          align-items: center;
        }

        .decision-bar-label {
          font-family: 'Google Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 600;
          color: #6b7fa3;
          margin-right: 0.5rem;
        }

        .decision-btn {
          flex: 1;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-family: 'Google Sans', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.15s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          border: 2px solid;
        }

        .decision-btn.phishing {
          background: rgba(239,68,68,0.08);
          border-color: rgba(239,68,68,0.3);
          color: #ef4444;
        }

        .decision-btn.phishing:hover {
          background: rgba(239,68,68,0.15);
          border-color: #ef4444;
          transform: translateY(-1px);
        }

        .decision-btn.safe {
          background: rgba(34,197,94,0.08);
          border-color: rgba(34,197,94,0.3);
          color: #22c55e;
        }

        .decision-btn.safe:hover {
          background: rgba(34,197,94,0.15);
          border-color: #22c55e;
          transform: translateY(-1px);
        }

        .email-progress {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.8rem;
          color: #6b7fa3;
          white-space: nowrap;
        }

        /* ===== BREACH ALERT OVERLAY ===== */
        .breach-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
          animation: fadeIn 0.3s;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .breach-popup {
          background: linear-gradient(145deg, #2a1010, #1a0a0a);
          border: 2px solid rgba(239,68,68,0.5);
          border-radius: 16px;
          padding: 2.5rem;
          text-align: center;
          max-width: 420px;
          box-shadow: 0 0 60px rgba(239,68,68,0.2);
          animation: breachPulse 1.5s ease-in-out infinite;
        }

        @keyframes breachPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }

        .breach-popup-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .breach-popup-title {
          font-family: 'Google Sans', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #ef4444;
          margin-bottom: 0.5rem;
        }

        .breach-popup-text {
          color: #a0aec0;
          font-size: 0.95rem;
        }

        /* ===== RESULTS SCREEN ===== */
        .results-screen {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          background: radial-gradient(ellipse at center, #1e2a4a 0%, #1a1a2e 70%);
        }

        .results-container {
          width: 100%;
          max-width: 900px;
        }

        .results-card {
          background: linear-gradient(145deg, #1e2a4a, #162036);
          border: 1px solid rgba(99,132,255,0.15);
          border-radius: 16px;
          padding: 3rem;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4);
        }

        .results-card.breach-result {
          border-color: rgba(239,68,68,0.2);
          background: linear-gradient(145deg, #2a1a1a, #1a1a2e);
        }

        .results-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .results-icon {
          font-size: 3.5rem;
          margin-bottom: 1rem;
        }

        .results-title {
          font-family: 'Google Sans', sans-serif;
          font-size: 2.25rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }

        .results-title.win {
          background: linear-gradient(135deg, #22c55e, #4ade80);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .results-title.lose {
          background: linear-gradient(135deg, #ef4444, #f87171);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .results-subtitle {
          color: #6b7fa3;
          font-size: 1.05rem;
        }

        .stats-row {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          margin-bottom: 2.5rem;
        }

        .stats-item {
          background: rgba(0,0,0,0.2);
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 10px;
          padding: 1.25rem;
          text-align: center;
        }

        .stats-number {
          font-family: 'Google Sans', sans-serif;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
        }

        .stats-label {
          font-size: 0.75rem;
          color: #6b7fa3;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .review-section {
          margin-bottom: 2.5rem;
        }

        .review-title {
          font-family: 'Google Sans', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          color: #6384ff;
          margin-bottom: 1rem;
        }

        .review-list {
          max-height: 280px;
          overflow-y: auto;
        }

        .review-list::-webkit-scrollbar {
          width: 6px;
        }

        .review-list::-webkit-scrollbar-thumb {
          background: rgba(255,255,255,0.1);
          border-radius: 3px;
        }

        .review-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 0.85rem;
          background: rgba(0,0,0,0.15);
          border: 1px solid rgba(255,255,255,0.04);
          border-radius: 8px;
          margin-bottom: 0.5rem;
        }

        .review-row.correct-row {
          border-color: rgba(22,163,74,0.15);
          background: rgba(22,163,74,0.05);
        }

        .review-row.wrong-row {
          border-color: rgba(239,68,68,0.15);
          background: rgba(239,68,68,0.05);
        }

        .review-status-icon {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
          flex-shrink: 0;
        }

        .review-status-icon.correct {
          background: rgba(22,163,74,0.2);
          color: #22c55e;
        }

        .review-status-icon.wrong {
          background: rgba(239,68,68,0.2);
          color: #ef4444;
        }

        .review-info {
          flex: 1;
          min-width: 0;
        }

        .review-subject {
          font-weight: 600;
          font-size: 0.88rem;
          color: #e0e0e0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .review-from {
          font-size: 0.78rem;
          color: #6b7fa3;
        }

        .review-pts {
          font-family: 'Google Sans', sans-serif;
          font-weight: 700;
          font-size: 0.88rem;
          flex-shrink: 0;
        }

        .review-pts.positive { color: #22c55e; }
        .review-pts.negative { color: #ef4444; }

        .lessons-box {
          background: rgba(99,132,255,0.06);
          border: 1px solid rgba(99,132,255,0.12);
          border-radius: 10px;
          padding: 1.5rem;
          margin-bottom: 2.5rem;
        }

        .lessons-title {
          font-family: 'Google Sans', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          color: #6384ff;
          margin-bottom: 1rem;
        }

        .lessons-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.65rem;
        }

        .lesson {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          font-size: 0.88rem;
          color: #a0aec0;
        }

        .lesson-check {
          color: #22c55e;
          flex-shrink: 0;
        }

        .results-actions {
          display: flex;
          gap: 1rem;
        }

        .results-btn {
          flex: 1;
          padding: 0.85rem 1.5rem;
          border-radius: 8px;
          font-family: 'Google Sans', sans-serif;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.15s;
          text-align: center;
        }

        .results-btn.primary {
          background: linear-gradient(135deg, #6384ff, #7c6fff);
          color: white;
          border: none;
        }

        .results-btn.primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(99,132,255,0.3);
        }

        .results-btn.secondary {
          background: transparent;
          color: #6b7fa3;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .results-btn.secondary:hover {
          background: rgba(255,255,255,0.04);
          color: #a0aec0;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .battle-main {
            grid-template-columns: 1fr;
          }
          .email-sidebar {
            height: 250px;
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.06);
          }
          .email-detail {
            height: calc(100vh - 302px);
          }
          .stats-row {
            grid-template-columns: repeat(2, 1fr);
          }
          .lessons-grid {
            grid-template-columns: 1fr;
          }
          .link-compare {
            grid-template-columns: 1fr;
          }
          .header-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <AnimatePresence mode="wait">
        {/* ===== INTRO ===== */}
        {stage === 'intro' && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="dialogue-screen"
          >
            <div className="dialogue-box">
              <div className="dialogue-logo">
                <h1>🔒 PHISH HUNTER</h1>
                <p>Cybersecurity Awareness Training Simulation</p>
              </div>
              <div className="dialogue-scene">
                <div className="char-row">
                  <div className="char-avatar">
                    <img src={dialogues.intro[dialogueIndex].speaker === 'AI' ? mascotImg : studentImg} alt="" />
                  </div>
                  <div className="char-content">
                    <div className="char-name">{dialogues.intro[dialogueIndex].speaker}</div>
                    <div className="char-text">{dialogues.intro[dialogueIndex].text}</div>
                  </div>
                </div>
              </div>
              <div className="dialogue-footer">
                <div className="dots">
                  {dialogues.intro.map((_, i) => (
                    <div key={i} className={`dot ${i === dialogueIndex ? 'active' : ''}`} />
                  ))}
                </div>
                <button onClick={nextDialogue} className="btn-continue">Continue →</button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ===== BATTLE ===== */}
        {stage === 'battle' && currentEmail && (
          <motion.div
            key="battle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="battle-screen"
          >
            {/* Top Bar */}
            <div className="top-bar">
              <div className="top-left">
                <span className="game-title">🔒 Phish Hunter</span>
                <div className="security-pill">
                  <span className="security-label">Security</span>
                  <div className="security-bar-mini">
                    <div
                      className={`security-fill-mini ${securityLevel > 60 ? 'high' : securityLevel > 30 ? 'medium' : 'low'}`}
                      style={{ width: `${securityLevel}%` }}
                    />
                  </div>
                  <span className="security-pct" style={{ color: securityLevel > 60 ? '#22c55e' : securityLevel > 30 ? '#eab308' : '#ef4444' }}>
                    {securityLevel}%
                  </span>
                </div>
              </div>
              <div className="top-right">
                <div className="stat-chip">
                  <span className="stat-chip-label">Score</span>
                  <span className="stat-chip-value" style={{ color: '#6384ff' }}>{score}</span>
                </div>
                <div className="stat-chip">
                  <span className="stat-chip-label">Streak</span>
                  <span className="stat-chip-value" style={{ color: '#fbbf24' }}>{streak}🔥</span>
                </div>
                <div className={`time-display ${timeLeft < 30 ? 'critical' : ''}`}>
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>

            {/* Breach Alert */}
            {alertActive && (
              <div className="breach-overlay">
                <div className="breach-popup">
                  <div className="breach-popup-icon">🚨</div>
                  <div className="breach-popup-title">SECURITY BREACH IMMINENT</div>
                  <div className="breach-popup-text">Security level critical! Multiple threats detected!</div>
                </div>
              </div>
            )}

            {/* Main Area */}
            <div className="battle-main">
              {/* Sidebar */}
              <div className="email-sidebar">
                <div className="sidebar-header">
                  <span className="sidebar-title">Inbox</span>
                  <span className="email-count">{analyzedEmails.length}/{emailDatabase.length}</span>
                </div>
                <div className="email-list-scroll">
                  {emailDatabase.map((email, i) => {
                    const isAnalyzed = i < analyzedEmails.length;
                    return (
                      <div
                        key={email.id}
                        onClick={() => {
                          setEmailIndex(i);
                          setCurrentEmail(email);
                          setSelectedTool(null);
                          setShowToolPanel(false);
                        }}
                        className={`email-row ${i === emailIndex ? 'active' : ''} ${
                          isAnalyzed ? (analyzedEmails[i].correct ? 'analyzed-correct' : 'analyzed-wrong') : ''
                        }`}
                      >
                        {isAnalyzed && (
                          <div className={`email-row-status ${analyzedEmails[i].correct ? 'correct' : 'wrong'}`}>
                            {analyzedEmails[i].correct ? '✓' : '✗'}
                          </div>
                        )}
                        <div
                          className="email-row-avatar"
                          style={{ background: getSenderColor(email.from) }}
                        >
                          {getSenderInitial(email.fromDisplay)}
                        </div>
                        <div className="email-row-content">
                          <div className="email-row-top">
                            <span className="email-row-sender">{email.fromDisplay}</span>
                            <span className="email-row-date">{email.date.split(',')[0]}</span>
                          </div>
                          <div className="email-row-subject">{email.subject}</div>
                          <div className="email-row-preview">
                            {email.hasAttachment && <span className="attachment-icon">📎</span>}
                            {email.preview}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Email Detail */}
              <div className="email-detail">
                <div className="email-detail-scroll">
                  {/* Subject */}
                  <h1 className="email-subject-line">{currentEmail.subject}</h1>

                  {/* Meta Bar */}
                  <div className="email-meta-bar">
                    <div
                      className="meta-avatar"
                      style={{ background: getSenderColor(currentEmail.from) }}
                    >
                      {getSenderInitial(currentEmail.fromDisplay)}
                    </div>
                    <div className="meta-info">
                      <div className="meta-sender-row">
                        <span className="meta-sender-name">{currentEmail.fromDisplay}</span>
                        <span className="meta-date">{currentEmail.date}</span>
                      </div>
                      <div className="meta-email-addr">&lt;{currentEmail.from}&gt;</div>
                      <div className="meta-to">to: me</div>
                    </div>
                    <span className={`batch-tag b${currentEmail.batch}`}>
                      Batch {currentEmail.batch}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="email-body-content">
                    <p className="email-greeting-text">{currentEmail.content.greeting}</p>
                    <p className="email-body-text">{currentEmail.content.body}</p>

                    {currentEmail.content.bulletPoints && (
                      <ul className="email-bullet-list">
                        {currentEmail.content.bulletPoints.map((bp, i) => (
                          <li key={i}>{bp}</li>
                        ))}
                      </ul>
                    )}

                    {currentEmail.content.button && (
                      <div className="email-cta">{currentEmail.content.button}</div>
                    )}

                    {currentEmail.content.qrCode && (
                      <div className="email-qr-block">
                        <div className="email-qr-canvas">
                          {Array.from({ length: 64 }).map((_, i) => {
                            const row = Math.floor(i / 8);
                            const col = i % 8;
                            const isCorner = (row < 2 && col < 2) || (row < 2 && col > 5) || (row > 5 && col < 2);
                            const isDark = isCorner || Math.random() > 0.5;
                            return <div key={i} className={`qr-cell ${isDark ? 'dark' : 'light'}`} />;
                          })}
                        </div>
                        <span className="email-qr-label">Scan to pay</span>
                      </div>
                    )}

                    {currentEmail.content.attachments.length > 0 && (
                      <div className="email-attachments-bar">
                        {currentEmail.content.attachments.map((att, i) => {
                          const ext = att.split('.').pop().toLowerCase();
                          const isDangerous = ext === 'exe' || ext === 'scr' || ext === 'bat';
                          return (
                            <div key={i} className={`attachment-chip ${isDangerous ? 'dangerous' : ''}`}>
                              <div className={`attachment-icon-wrap ${ext === 'pdf' ? 'pdf' : isDangerous ? 'exe' : 'other'}`}>
                                {ext === 'pdf' ? '📄' : isDangerous ? '⚙️' : '📎'}
                              </div>
                              <div>
                                <div className="attachment-name">{att.split(' (')[0]}</div>
                                <div className="attachment-size">{att.includes('(') ? att.match(/\(([^)]+)\)/)?.[1] : ''}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Tool Toggle */}
                <div className="tool-toggle-bar">
                  <button
                    onClick={() => setShowToolPanel(!showToolPanel)}
                    className={`tool-toggle-btn ${showToolPanel ? 'active' : ''}`}
                  >
                    🔍 Investigation Tools
                  </button>
                  {showToolPanel && (
                    <div className="tool-tabs">
                      <button
                        onClick={() => setSelectedTool('link')}
                        className={`tool-tab ${selectedTool === 'link' ? 'active' : ''}`}
                      >
                        Link Inspector
                      </button>
                      <button
                        onClick={() => setSelectedTool('headers')}
                        className={`tool-tab ${selectedTool === 'headers' ? 'active' : ''}`}
                      >
                        Email Headers
                      </button>
                      <button
                        onClick={() => setSelectedTool('flags')}
                        className={`tool-tab ${selectedTool === 'flags' ? 'active' : ''}`}
                      >
                        Red Flags
                      </button>
                    </div>
                  )}
                  <div style={{ flex: 1 }} />
                  <div className="email-progress">
                    Email {emailIndex + 1} of {emailDatabase.length}
                  </div>
                </div>

                {/* Tool Panel */}
                <AnimatePresence>
                  {showToolPanel && selectedTool && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="tool-panel"
                    >
                      <div className="tool-panel-inner">
                        {selectedTool === 'link' && currentEmail.content.link && (
                          <div>
                            <div className="tool-panel-title">🔗 Link Analysis</div>
                            <div className="link-compare">
                              <div className="link-box">
                                <div className="link-box-label">What you see</div>
                                <div className="link-box-url">{currentEmail.analysis.linkAnalysis.displayText}</div>
                              </div>
                              <div className="link-box">
                                <div className="link-box-label">Where it actually goes</div>
                                <div className={`link-box-url ${currentEmail.isPhishing ? 'malicious' : 'safe'}`}>
                                  {currentEmail.analysis.linkAnalysis.actualURL}
                                </div>
                              </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                              <span style={{ fontSize: '0.8rem', color: '#6b7fa3' }}>Risk Level:</span>
                              <span className={`risk-badge ${currentEmail.analysis.linkAnalysis.risk.toLowerCase()}`}>
                                {currentEmail.analysis.linkAnalysis.risk === 'CRITICAL' && '🔴'}
                                {currentEmail.analysis.linkAnalysis.risk === 'HIGH' && '🟠'}
                                {currentEmail.analysis.linkAnalysis.risk === 'LOW' && '🟢'}
                                {currentEmail.analysis.linkAnalysis.risk}
                              </span>
                            </div>
                            {currentEmail.isPhishing && currentEmail.analysis.linkAnalysis.displayText !== currentEmail.analysis.linkAnalysis.actualURL && (
                              <div className="link-diff-note">
                                ⚠️ The displayed URL does NOT match the actual destination. This is a classic phishing technique.
                              </div>
                            )}
                          </div>
                        )}

                        {selectedTool === 'link' && !currentEmail.content.link && (
                          <div>
                            <div className="tool-panel-title">🔗 Link Analysis</div>
                            <div className="no-flags-msg">ℹ️ No links found in this email</div>
                          </div>
                        )}

                        {selectedTool === 'headers' && (
                          <div>
                            <div className="tool-panel-title">📧 Email Header Analysis</div>
                            <div className="header-grid">
                              <div className="header-item">
                                <span className="header-item-label">SPF</span>
                                <span className={`header-item-value ${currentEmail.analysis.headers.spf.toLowerCase()}`}>
                                  {currentEmail.analysis.headers.spf}
                                </span>
                              </div>
                              <div className="header-item">
                                <span className="header-item-label">DKIM</span>
                                <span className={`header-item-value ${currentEmail.analysis.headers.dkim.toLowerCase()}`}>
                                  {currentEmail.analysis.headers.dkim}
                                </span>
                              </div>
                            </div>
                            <div className="header-item" style={{ marginBottom: '0.75rem' }}>
                              <span className="header-item-label">Origin</span>
                              <span className="header-item-value location">{currentEmail.analysis.headers.location}</span>
                            </div>
                            <div className="reply-to-section">
                              <div className="reply-to-label">Reply-To Address</div>
                              <div className={`reply-to-value ${
                                currentEmail.analysis.headers.replyTo !== currentEmail.from ? 'mismatch' : 'match'
                              }`}>
                                {currentEmail.analysis.headers.replyTo}
                              </div>
                              {currentEmail.analysis.headers.replyTo !== currentEmail.from && (
                                <div className="reply-to-note">
                                  ⚠️ Reply-To doesn't match the sender address — suspicious!
                                </div>
                              )}
                            </div>
                            {(currentEmail.analysis.headers.spf !== 'PASS' || currentEmail.analysis.headers.dkim !== 'PASS') && (
                              <div className="link-diff-note" style={{ marginTop: '0.75rem' }}>
                                ⚠️ Authentication failures (SPF/DKIM) indicate the email may not be from who it claims.
                              </div>
                            )}
                          </div>
                        )}

                        {selectedTool === 'flags' && (
                          <div>
                            <div className="tool-panel-title">🚩 Red Flags</div>
                            {currentEmail.analysis.redFlags.length > 0 ? (
                              <ul className="flags-list">
                                {currentEmail.analysis.redFlags.map((flag, i) => (
                                  <li key={i} className="flag-item">
                                    <span className="flag-icon">⚠️</span>
                                    {flag}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <div className="no-flags-msg">✅ No red flags detected — this email appears legitimate</div>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Decision Bar */}
                <div className="decision-bar">
                  <span className="decision-bar-label">Verdict:</span>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDecision(true)}
                    className="decision-btn phishing"
                  >
                    🚩 Phishing
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleDecision(false)}
                    className="decision-btn safe"
                  >
                    ✅ Legitimate
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ===== BREACH DIALOGUE ===== */}
        {stage === 'breach' && (
          <motion.div
            key="breach"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="dialogue-screen breach-dialogue"
          >
            <div className="dialogue-box">
              <div className="dialogue-logo">
                <h1 style={{ background: 'linear-gradient(135deg, #ef4444, #f87171)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  🚨 DATA BREACH
                </h1>
                <p>Security Compromise Detected</p>
              </div>
              <div className="dialogue-scene">
                <div className="char-row">
                  <div className="char-avatar" style={{ borderColor: 'rgba(239,68,68,0.4)' }}>
                    <img src={dialogues.breach[dialogueIndex].speaker === 'AI' ? mascotImg : studentImg} alt="" />
                  </div>
                  <div className="char-content">
                    <div className="char-name">{dialogues.breach[dialogueIndex].speaker}</div>
                    <div className="char-text">{dialogues.breach[dialogueIndex].text}</div>
                  </div>
                </div>
              </div>
              <div className="dialogue-footer">
                <div className="dots">
                  {dialogues.breach.map((_, i) => (
                    <div key={i} className={`dot ${i === dialogueIndex ? 'active' : ''}`} />
                  ))}
                </div>
                <button onClick={nextDialogue} className="btn-continue">Continue →</button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ===== RESULTS ===== */}
        {stage === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="results-screen"
          >
            <div className="results-container">
              <div className={`results-card ${gameResult !== 'win' ? 'breach-result' : ''}`}>
                <div className="results-header">
                  <div className="results-icon">{gameResult === 'win' ? '🛡️' : '💀'}</div>
                  <div className={`results-title ${gameResult === 'win' ? 'win' : 'lose'}`}>
                    {gameResult === 'win' ? 'MISSION SUCCESS' : 'DATA BREACH'}
                  </div>
                  <p className="results-subtitle">
                    {gameResult === 'win'
                      ? 'You successfully protected the company from phishing attacks!'
                      : 'Critical breach — company data has been compromised.'}
                  </p>
                </div>

                <div className="stats-row">
                  <div className="stats-item">
                    <div className="stats-number" style={{ color: '#6384ff' }}>{score}</div>
                    <div className="stats-label">Score</div>
                  </div>
                  <div className="stats-item">
                    <div className="stats-number" style={{ color: '#fbbf24' }}>{bestStreak}</div>
                    <div className="stats-label">Best Streak</div>
                  </div>
                  <div className="stats-item">
                    <div className="stats-number" style={{ color: '#22c55e' }}>
                      {analyzedEmails.filter(e => e.correct).length}
                    </div>
                    <div className="stats-label">Correct</div>
                  </div>
                  <div className="stats-item">
                    <div className="stats-number" style={{ color: '#ef4444' }}>
                      {analyzedEmails.filter(e => !e.correct).length}
                    </div>
                    <div className="stats-label">Wrong</div>
                  </div>
                </div>

                <div className="review-section">
                  <div className="review-title">Email Review</div>
                  <div className="review-list">
                    {analyzedEmails.map((email, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className={`review-row ${email.correct ? 'correct-row' : 'wrong-row'}`}
                      >
                        <div className={`review-status-icon ${email.correct ? 'correct' : 'wrong'}`}>
                          {email.correct ? '✓' : '✗'}
                        </div>
                        <div className="review-info">
                          <div className="review-subject">{email.subject}</div>
                          <div className="review-from">{email.fromDisplay}</div>
                        </div>
                        <div className={`review-pts ${email.points > 0 ? 'positive' : 'negative'}`}>
                          {email.points > 0 ? '+' : ''}{email.points}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="lessons-box">
                  <div className="lessons-title">🎯 Key Takeaways</div>
                  <div className="lessons-grid">
                    <div className="lesson"><span className="lesson-check">✓</span> Always verify the sender's actual email address</div>
                    <div className="lesson"><span className="lesson-check">✓</span> Hover over links to see where they really go</div>
                    <div className="lesson"><span className="lesson-check">✓</span> Be suspicious of urgency and threats</div>
                    <div className="lesson"><span className="lesson-check">✓</span> Never buy gift cards for anyone via email</div>
                    <div className="lesson"><span className="lesson-check">✓</span> QR codes can hide malicious URLs</div>
                    <div className="lesson"><span className="lesson-check">✓</span> Check SPF/DKIM — fails mean danger</div>
                    <div className="lesson"><span className="lesson-check">✓</span> Reply-To mismatch is a major red flag</div>
                    <div className="lesson"><span className="lesson-check">✓</span> .exe attachments are almost always malware</div>
                  </div>
                </div>

                <div className="results-actions">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={resetGame} className="results-btn primary">
                    Play Again
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => window.location.reload()} className="results-btn secondary">
                    Exit
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PHISH_HUNTER_STORY;