import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SignupPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [strength, setStrength] = useState(0);

  // Password strength logic
  const calculateStrength = (pwd) => {
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 10) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[\W_]/.test(pwd)) score += 1;
    setStrength(score);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (!email || !password || !confirmPassword) {
      setError("⚠️ All fields are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("❌ Invalid email format!");
      return;
    }

    if (password.length < 6) {
      setError("🔒 Password must be at least 6 characters!");
      return;
    }

    if (password !== confirmPassword) {
      setError("❌ Passwords do not match!");
      return;
    }

    // Success
    setError("");
    navigate("/");
  };

  const getStrengthColor = () => {
    if (strength <= 1) return "bg-red-500";
    if (strength <= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center relative overflow-hidden font-sans">
      
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#1e293b_0%,_#020617_70%)]" />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-orange-400/20 rounded-full"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: Math.random() * 4 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* --- MAIN CARD --- */}
      <motion.div
        className="relative z-10 w-full max-w-md px-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="text-center mb-6">
          <motion.h1
            className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 via-orange-500 to-red-600 uppercase tracking-wide"
            style={{ textShadow: "2px 2px 0px #000, 4px 4px 10px rgba(0,0,0,0.5)" }}
          >
            JOIN US
          </motion.h1>
          <p className="text-gray-400 mt-2 tracking-widest text-sm uppercase">Create your hero identity</p>
        </div>

        {/* Form Card */}
        <div className="bg-black/40 border-2 border-yellow-700/50 rounded-xl p-8 shadow-[0_0_20px_rgba(0,0,0,0.5)] backdrop-blur-sm">
          
          <form className="flex flex-col gap-4" onSubmit={handleSignup}>
            {/* Input: Email */}
            <div className="relative">
              <label className="absolute -top-2 left-4 bg-[#0f172a] text-orange-500 text-[10px] px-1 uppercase tracking-wider font-bold">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hero@email.com"
                className="w-full bg-gray-900/80 border border-gray-700 text-white px-4 py-3 rounded-lg outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
            </div>

            {/* Input: Password */}
            <div className="relative">
              <label className="absolute -top-2 left-4 bg-[#0f172a] text-orange-500 text-[10px] px-1 uppercase tracking-wider font-bold">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); calculateStrength(e.target.value); }}
                placeholder="Create password"
                className="w-full bg-gray-900/80 border border-gray-700 text-white px-4 py-3 rounded-lg outline-none focus:border-orange-500 transition-all"
              />
              {/* Strength Meter */}
              <div className="flex gap-1 mt-2">
                {[1,2,3,4,5].map((i) => (
                  <div key={i} className={`h-1 w-full rounded-full transition-all duration-300 ${i <= strength ? getStrengthColor() : 'bg-gray-700'}`} />
                ))}
              </div>
            </div>

            {/* Input: Confirm */}
            <div className="relative">
              <label className="absolute -top-2 left-4 bg-[#0f172a] text-orange-500 text-[10px] px-1 uppercase tracking-wider font-bold">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full bg-gray-900/80 border border-gray-700 text-white px-4 py-3 rounded-lg outline-none focus:border-orange-500 transition-all"
              />
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                className="bg-red-900/30 border border-red-500 text-red-400 text-sm p-3 rounded-lg flex items-center gap-2"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
              >
                <span className="font-bold text-lg">⚠</span> {error}
              </motion.div>
            )}

            {/* Signup Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-2 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 rounded-lg uppercase tracking-widest shadow-lg border-b-4 border-orange-700 hover:from-orange-400 hover:to-red-500 transition-all"
            >
              Create Hero
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px w-full bg-gray-700" />
          </div>

          {/* Login Link */}
          <p className="text-center text-gray-400 text-sm">
            Already a hero?{" "}
            <button
              onClick={() => navigate("/")}
              className="text-yellow-400 font-bold hover:text-yellow-300 transition-colors"
            >
              Login Here
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}