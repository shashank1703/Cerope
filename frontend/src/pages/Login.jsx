import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [serverError, setServerError] = useState(""); // NEW: show server errors
  const [loading, setLoading] = useState(false); // NEW: button loading state
  const navigate = useNavigate();

  const validateEmail = (val) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    const next = { email: "", password: "" };
    if (!validateEmail(email)) next.email = "Invalid Email ID!";
    if (password.trim().length < 6) next.password = "Incorrect Password, try again";
    setErrors(next);

    const ok = !next.email && !next.password;
    if (!ok) return;

    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data?.msg || "Invalid credentials");
        return;
      }

      const token = data?.token || data?.jwt || data?.accessToken;

      if (!token) {
        setServerError("Login succeeded but no token was returned by the server.");
        return;
      }

      // NEW: store token and route based on profile completion
      // localStorage.setItem("token", token);
      // const completed = localStorage.getItem("profileCompleted") === "true";
      // navigate(completed ? "/dashboard" : "/profile-setup", { replace: true });
      localStorage.setItem("token", token);
      localStorage.setItem("profileCompleted", "false");
      navigate("/profile-setup", { replace: true });


    } catch (err) {
      setServerError("Unable to reach the server. Please try again.");
    } finally {
        console.log("finally");
        setLoading(false);
    }
  };

  return (
    <div className="login-root">
      
    <Navbar />
      {/* Main */}
      <main className="main">
        {/* Left: Form panel */}
        <section className="form-panel">
          <div className="bg-fade" aria-hidden="true" />
          <div className="form-card">
            {serverError && <div className="alert-error">{serverError}</div>}
            <h1 className="title">Welcome Back to Cerope</h1>
            <p className="subtitle">Your personalized fashion journey awaits.</p>

            <form onSubmit={handleSubmit} noValidate>
              <label className="field">
                <span className="label">Email</span>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-err" : undefined}
                />
                {errors.email && (
                  <span id="email-err" className="error">
                    {errors.email}
                  </span>
                )}
              </label>

              <label className="field">
                <span className="label">Password</span>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={!!errors.password}
                  aria-describedby={errors.password ? "pwd-err" : undefined}
                />
                {errors.password && (
                  <span id="pwd-err" className="error">
                    {errors.password}
                  </span>
                )}
              </label>

              <div className="row-between">
                <label className="remember">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                  />
                  <span>Remember me</span>
                </label>
                <a href="#" className="link subtle">
                  Forgot Password?
                </a>
              </div>

              <button className="btn btn-primary" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <div className="divider">
                <span>or</span>
              </div>

              <div className="providers">
                <button type="button" className="btn btn-muted provider">
                  <span className="provider-icon">G</span> Google
                </button>
                <button type="button" className="btn btn-muted provider">
                  <span className="provider-icon"></span> Apple
                </button>
              </div>

              <p className="signup">
                Don’t have an account?{" "}
                <a href="#" className="link">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </section>

        {/* Right: Hero banner */}
        <aside className="hero">
          <div className="hero-card">
            <img className="hero-img" src="banner2.png" alt="Fashion hero" />
            <div className="hero-brand">
              <img src="logo.png" alt="Cerope" />
              <span>Cerope</span>
            </div>
          </div>
        </aside>
      </main>
    <Footer />

      {/* Page Styles (scoped to this component) */}
      <style>{`
        :root{
          --bg: #f4f1f8;
          --ink: #0f0f12;
          --muted: #676b73;
          --panel: #ffffff;
          --ring: rgba(99,102,241,0.55);
          --shadow: 0 10px 30px rgba(0,0,0,0.10);
          --radius: 16px;
        }
        .login-root{
          min-height: 100vh;
          display:flex;
          flex-direction:column;
          background:
            linear-gradient(180deg, rgba(183,164,255,0.25) 0%, rgba(255,255,255,0) 35%),
            linear-gradient(0deg, rgba(255,170,221,0.18) 0%, rgba(255,255,255,0) 30%),
            var(--bg);
          color: var(--ink);
        }
        .topbar{
          height: 66px;
          padding: 0 24px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          backdrop-filter: saturate(120%) blur(6px);
        }
        .topbar__left{ display:flex; align-items:center; gap:10px; }
        .brand-logo{ width:30px; height:30px; object-fit:contain; }
        .brand-name{ font-weight:700; font-size:18px; letter-spacing:.2px; }

        .topbar__right{ display:flex; align-items:center; gap:12px; }
        .btn{ border:1px solid rgba(0,0,0,0.08); border-radius:12px; padding:10px 14px; background:#fff; cursor:pointer; }
        .btn-explore{ background:#eee9ff; border-color:#d6ccff; font-weight:600; }
        .btn-explore .plus{ margin-left:6px; color:#7042ff; }
        .avatar{ width:36px; height:36px; border-radius:50%; background:#f5f5f7; display:grid; place-items:center; }

        .main{
          width:100%;
          max-width:1200px;
          margin: 28px auto 60px;
          display:grid;
          grid-template-columns: 1.1fr .9fr;
          gap:40px;
          padding: 0 24px;
        }

        /* Left: form area */
        .form-panel{
          position:relative;
          min-height:540px;
          display:flex;
          align-items:center;
          justify-content:center;
        }
        .bg-fade{
          position:absolute; inset:0;
          background-image: url('/images/bg.png'); /* CHANGED */
          background-size:cover; background-position:center;
          opacity:.08; /* 8% opacity within your 5–10% range */
          border-radius: var(--radius);
        }
        .form-card{
          position:relative;
          width:100%;
          max-width:420px;
          background: var(--panel);
          border-radius: var(--radius);
          box-shadow: var(--shadow);
          padding: 28px 24px;
        }

        .alert-error{
          background:#fde8ea;
          color:#b4232d;
          border:1px solid #f6c5ca;
          padding:10px 12px;
          border-radius:10px;
          font-size:12px;
          margin-bottom:12px;
        }
        .title{ margin:0; font-size:22px; font-weight:800; }
        .subtitle{ margin:6px 0 18px; color: var(--muted); font-size:14px; }

        .field{ display:block; margin-bottom:14px; }
        .label{ display:block; font-size:12px; color:#3a3d44; margin-bottom:6px; }
        .field input{
          width:100%; padding:12px 14px; border-radius:10px;
          border:1px solid #d9dce2; outline:0; background:#fff;
          font-size:14px;
        }
        .field input:focus{ border-color:#c8c9ff; box-shadow:0 0 0 4px rgba(99,102,241,0.12); }
        .error{ display:block; margin-top:6px; color:#d11a2a; font-size:12px; }

        .row-between{
          display:flex; align-items:center; justify-content:space-between;
          margin: 6px 0 16px;
        }
        .remember{ display:flex; align-items:center; gap:8px; font-size:13px; color:#3a3d44; }
        .link{ color:#3b5bff; text-decoration:none; }
        .link:hover{ text-decoration:underline; }
        .subtle{ color: var(--muted); }

        .btn-primary{
          width:100%; border-radius:28px; padding:12px 16px;
          background:#151515; color:#fff; border:none; font-weight:700;
        }

        .divider{
          display:flex; align-items:center; gap:12px;
          margin: 12px 0; color: var(--muted); font-size:12px;
        }
        .divider:before, .divider:after{
          content:""; height:1px; flex:1; background:#e7e8ec;
        }

        .providers{ display:flex; gap:12px; }
        .btn-muted{
          background:#fff; border:1px solid #e1e4ea; width:50%; padding:10px 12px;
        }
        .provider{ display:flex; align-items:center; justify-content:center; gap:8px; }
        .provider-icon{ width:20px; height:20px; display:inline-grid; place-items:center; }

        .signup{ margin:14px 0 0; text-align:center; font-size:13px; color: var(--muted); }

        /* Right: hero banner */
        .hero{ display:flex; align-items:center; justify-content:center; }
        .hero-card{
          position:relative; width:100%; max-width:420px; border-radius:22px; overflow:hidden;
          box-shadow: var(--shadow);
        }
        .hero-img{ display:block; width:100%; height:520px; object-fit:cover; }
        .hero-brand{
          position:absolute; top:14px; right:14px; display:flex; align-items:center; gap:8px;
          background: rgba(255,255,255,0.75); border:1px solid rgba(0,0,0,0.08);
          padding:6px 10px; border-radius:999px; backdrop-filter: blur(4px);
        }
        .hero-brand img{ width:22px; height:22px; object-fit:contain; }
        .hero-brand span{ font-weight:700; font-size:13px; }

        /* Footer */
        .footer{ background:#0c0c0e; color:#fff; padding:52px 24px 26px; }
        .footer-grid{
          width:100%; max-width:1200px; margin:0 auto; display:grid; gap:28px;
          grid-template-columns: 1.2fr 1fr 1fr 1fr;
        }
        .brand-row{ display:flex; align-items:center; gap:12px; font-size:28px; font-weight:800; }
        .brand-row img{ width:40px; height:40px; }
        .foot-tag{ color:#c4c6cc; margin-top:10px; max-width:340px; }
        .links-col h4{ margin:0 0 8px; font-size:14px; color:#cfd2d9; }
        .links-col ul{ list-style:none; padding:0; margin:0; display:grid; gap:6px; }
        .links-col .link{ color:#e8e9ee; }
        .links-col .muted{ color:#81859a; font-size:12px; }
        .foot-sep{ border:0; height:1px; background:#2b2d34; margin:28px auto 16px; max-width:1200px; }
        .copyright{ text-align:center; color:#a7a9b2; font-size:12px; }

        /* Mobile layout */
        @media (max-width: 960px){
          .main{ grid-template-columns: 1fr; gap:24px; margin:12px auto 40px; }
          .hero-card{ max-width:760px; }
          .hero-img{ height:320px; }
          .form-card{ max-width:760px; }
          .footer-grid{ grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px){
          .topbar{ padding:0 14px; }
          .topbar__right .avatar{ display:none; }
          .btn-explore{ padding:8px 12px; }
          .hero{ order:-1; } /* banner on top on mobile */
          .hero-brand{ top:10px; right:10px; }
          .footer-grid{ grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}