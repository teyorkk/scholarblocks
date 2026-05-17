"use client";

import { useState, useEffect, useRef } from "react";
import type { CSSProperties, ReactNode, RefObject } from "react";
import {
  BookOpen, Shield, Zap, Users, ChevronDown, Download, QrCode,
  CheckCircle, ArrowRight, Database, Lock, FileText, Bell,
  BarChart2, Globe, Award, TrendingUp, Cpu, Layers,
  AlertTriangle, Clock, X, Menu, GraduationCap,
  Blocks, ScanLine, Key, ScrollText, UserCog, ChevronRight
} from "lucide-react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

/* ─── Design Tokens ──────────────────────────────────────────────────────── */
const T = {
  bg:         "#fdf6ee",
  bgAlt:      "#fef9f4",
  bgSection:  "#fff8f0",
  white:      "#ffffff",
  orange:     "#f97316",
  orangeDark: "#ea580c",
  orangeDeep: "#c2410c",
  orangeSoft: "#fed7aa",
  orangePale: "#fff7ed",
  orangeTint: "#fff1e6",
  ink:        "#1c1917",
  inkMid:     "#44403c",
  inkLight:   "#78716c",
  inkFaint:   "#a8a29e",
  border:     "#e7e0d8",
  borderSoft: "#f0ebe4",
  green:      "#16a34a",
  greenBg:    "#f0fdf4",
  greenBorder:"#bbf7d0",
  red:        "#dc2626",
  redBg:      "#fef2f2",
  redBorder:  "#fecaca",
} as const;

/* ─── Helpers ────────────────────────────────────────────────────────────── */
const useInView = (threshold = 0.1): [RefObject<HTMLDivElement | null>, boolean] => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver((entries) => {
      const e = entries[0];
      if (e && e.isIntersecting) setVis(true);
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => {
      if (ref.current) obs.unobserve(ref.current);
      obs.disconnect();
    };
  }, [threshold]);
  return [ref, vis];
};

interface FadeProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  className?: string;
  style?: CSSProperties;
}

const Fade = ({ children, delay = 0, y = 24, x = 0, className = "", style = {} }: FadeProps) => {
  const [ref, vis] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "none" : `translate(${x}px,${y}px)`,
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
};

interface CounterProps {
  target: number;
  decimals?: number;
}

const Counter = ({ target, decimals = 0 }: CounterProps) => {
  const [v, setV] = useState(0);
  const [ref, vis] = useInView();
  useEffect(() => {
    if (!vis) return;
    let cur = 0;
    const step = target / 80;
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { setV(target); clearInterval(t); }
      else setV(cur);
    }, 18);
    return () => clearInterval(t);
  }, [vis, target]);
  return <span ref={ref}>{v.toFixed(decimals)}</span>;
};

/* ─── Reusable UI ────────────────────────────────────────────────────────── */
const SectionTag = ({ children }: { children: ReactNode }) => (
  <div style={{
    display: "inline-flex", alignItems: "center", gap: 8,
    background: T.orangeTint, border: `1.5px solid ${T.orangeSoft}`,
    borderRadius: 99, padding: "5px 14px", marginBottom: 14,
  }}>
    <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.orange }} />
    <span style={{
      color: T.orangeDark, fontSize: 11, fontWeight: 800,
      letterSpacing: "0.12em", fontFamily: "'Courier New',monospace",
    }}>{children}</span>
  </div>
);

const H2 = ({ children }: { children: ReactNode }) => (
  <h2 style={{
    fontSize: "clamp(26px,3.5vw,42px)", fontWeight: 900, color: T.ink,
    lineHeight: 1.12, fontFamily: "'Georgia',serif", marginBottom: 48,
  }}>
    {children}
  </h2>
);

const OSpan = ({ children }: { children: ReactNode }) => (
  <span style={{ color: T.orange }}>{children}</span>
);

interface CardProps {
  children: ReactNode;
  style?: CSSProperties;
  accent?: boolean;
}

const Card = ({ children, style = {}, accent = false }: CardProps) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: T.white,
        borderRadius: 16,
        border: accent ? `2px solid ${T.orange}` : `1.5px solid ${T.border}`,
        padding: 28,
        boxShadow: hov
          ? "0 12px 36px rgba(249,115,22,0.13),0 2px 8px rgba(0,0,0,0.05)"
          : "0 2px 10px rgba(0,0,0,0.05)",
        transition: "box-shadow 0.25s, transform 0.25s",
        transform: hov ? "translateY(-3px)" : "none",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

const OBadge = ({ children }: { children: ReactNode }) => (
  <span style={{
    display: "inline-block", background: T.orangeTint, color: T.orangeDark,
    border: `1px solid ${T.orangeSoft}`, borderRadius: 99,
    padding: "4px 13px", fontSize: 12, fontWeight: 700,
    fontFamily: "'Courier New',monospace", margin: "3px 3px",
  }}>{children}</span>
);

const PillTag = ({ children }: { children: ReactNode }) => (
  <span style={{
    display: "inline-flex", alignItems: "center", gap: 5,
    background: T.bgSection, border: `1px solid ${T.border}`,
    borderRadius: 99, padding: "5px 12px", fontSize: 12,
    fontWeight: 600, color: T.inkMid, margin: "3px 3px",
  }}>
    <div style={{ width: 5, height: 5, borderRadius: "50%", background: T.orange }} />
    {children}
  </span>
);

interface BlobProps {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size?: number;
  opacity?: number;
  color?: string;
}

const Blob = ({ top, left, right, bottom, size = 500, opacity = 0.5, color = "#f97316" }: BlobProps) => (
  <div style={{
    position: "absolute", top, left, right, bottom,
    width: size, height: size, borderRadius: "50%",
    background: `radial-gradient(circle, ${color}22 0%, transparent 70%)`,
    pointerEvents: "none", filter: "blur(40px)", opacity,
  }} />
);

const MeshBg = ({ opacity = 0.04 }: { opacity?: number }) => {
  const pts = Array.from({ length: 12 }, (_, i) => ({
    x: (i * 173.1) % 100,
    y: (i * 113.7) % 100,
    r: 2 + (i % 3) * 2,
  }));
  return (
    <svg
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity, pointerEvents: "none" }}
      preserveAspectRatio="none"
    >
      {pts.map((a, i) =>
        pts.slice(i + 1, i + 3).map((b, j) => (
          <line
            key={`${i}-${j}`}
            x1={`${a.x}%`} y1={`${a.y}%`}
            x2={`${b.x}%`} y2={`${b.y}%`}
            stroke={T.orange} strokeWidth="0.8"
          />
        ))
      )}
      {pts.map((p, i) => (
        <circle key={i} cx={`${p.x}%`} cy={`${p.y}%`} r={p.r} fill={T.orange} />
      ))}
    </svg>
  );
};

/* ─── NAVBAR ─────────────────────────────────────────────────────────────── */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const links = ["Abstract", "Introduction", "Objectives", "Methodology", "Architecture", "Results", "Conclusion", "References"];

  const go = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(253,246,238,0.96)" : "rgba(253,246,238,0.75)",
      backdropFilter: "blur(18px)",
      borderBottom: scrolled ? `1px solid ${T.border}` : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <div style={{
        maxWidth: 1240, margin: "0 auto", padding: "0 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 64,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36,
            background: "linear-gradient(135deg,#f97316,#ea580c)",
            borderRadius: 10, display: "flex", alignItems: "center",
            justifyContent: "center", boxShadow: "0 4px 12px rgba(249,115,22,0.35)",
          }}>
            <GraduationCap size={18} color="white" />
          </div>
          <span style={{ fontWeight: 900, fontSize: 17, color: T.ink, fontFamily: "'Georgia',serif" }}>
            IskolarBlock
          </span>
        </div>

        <div style={{ display: "flex", gap: 2 }} className="nav-desktop">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => go(l)}
              style={{
                background: "none", border: "none", color: T.inkMid,
                cursor: "pointer", fontSize: 13, fontWeight: 600,
                padding: "6px 10px", borderRadius: 8, transition: "color 0.2s,background 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.color = T.orange;
                (e.target as HTMLButtonElement).style.background = T.orangeTint;
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.color = T.inkMid;
                (e.target as HTMLButtonElement).style.background = "none";
              }}
            >
              {l}
            </button>
          ))}
        </div>

        <button
          className="nav-cta"
          style={{
            background: "linear-gradient(135deg,#f97316,#ea580c)", color: "white",
            border: "none", borderRadius: 10, padding: "9px 20px",
            fontWeight: 800, fontSize: 13, cursor: "pointer",
            boxShadow: "0 4px 14px rgba(249,115,22,0.35)",
          }}
        >
          Get Started
        </button>

        <button
          onClick={() => setOpen(!open)}
          className="nav-hamburger"
          style={{ display: "none", background: "none", border: "none", color: T.ink, cursor: "pointer" }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div style={{ background: T.bg, borderTop: `1px solid ${T.border}`, padding: "10px 24px 18px" }}>
          {links.map((l) => (
            <button
              key={l}
              onClick={() => go(l)}
              style={{
                display: "block", background: "none", border: "none",
                color: T.inkMid, cursor: "pointer", fontSize: 14,
                fontWeight: 600, padding: "9px 0", width: "100%", textAlign: "left",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

/* ─── HERO ───────────────────────────────────────────────────────────────── */
const Hero = () => {
  const authors = [
    "Kharyz Ranielle Dela Cruz",
    "Moises Theo Atienza",
    "Roy Christian Cruz",
    "Zeus Sulit",
  ];

  const heroButtons = [
    { l: "View Research", icon: <BookOpen size={15} />, primary: true },
    { l: "View Results",  icon: <BarChart2 size={15} />, primary: false },
    { l: "Scan References", icon: <QrCode size={15} />, primary: false },
  ];

  const dashMetrics = [
    { l: "Applications",    v: "247",    icon: <Users size={13} /> },
    { l: "Approved",        v: "189",    icon: <CheckCircle size={13} /> },
    { l: "Blockchain TXs",  v: "1,204",  icon: <Database size={13} /> },
    { l: "Pass Rate",       v: "98.68%", icon: <TrendingUp size={13} /> },
  ];

  const txLog = [
    { h: "0x7f3a...9c2e", s: "CONFIRMED" },
    { h: "0x2b1d...4f8a", s: "PENDING" },
    { h: "0xae5c...7b3f", s: "CONFIRMED" },
  ];

  const floatingBadges = [
    { top: -16, right: -16, bottom: undefined, left: undefined, label: "Polygon Blockchain", icon: <Blocks size={12} /> },
    { bottom: -16, left: -16, top: undefined, right: undefined, label: "OCR Powered", icon: <ScanLine size={12} /> },
  ];

  return (
    <section id="hero" style={{
      position: "relative", minHeight: "100vh", display: "flex",
      alignItems: "center", overflow: "hidden", paddingTop: 64,
      background: "linear-gradient(160deg,#fff7ed 0%,#fef3e8 40%,#fde8d0 100%)",
    }}>
      <Blob top="-10%" left="-8%" size={700} opacity={0.55} color="#f97316" />
      <Blob bottom="-10%" right="-5%" size={600} opacity={0.35} color="#fb923c" />
      <Blob top="30%" right="15%" size={350} opacity={0.25} color="#fbbf24" />
      <MeshBg opacity={0.05} />

      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "80px 24px", width: "100%", position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 440px", gap: 64, alignItems: "center" }} className="hero-grid">
          {/* Left column */}
          <div>
            <Fade delay={0.05}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "rgba(249,115,22,0.1)", border: "1.5px solid rgba(249,115,22,0.25)",
                borderRadius: 99, padding: "6px 16px", marginBottom: 24,
              }}>
                <Blocks size={13} color={T.orange} />
                <span style={{ color: T.orangeDark, fontSize: 11, fontWeight: 800, letterSpacing: "0.12em" }}>
                  IMRAD RESEARCH SHOWCASE · 2024
                </span>
              </div>
            </Fade>

            <Fade delay={0.12}>
              <h1 style={{
                fontSize: "clamp(30px,4vw,56px)", fontWeight: 900, lineHeight: 1.1,
                color: T.ink, fontFamily: "'Georgia',serif", marginBottom: 22,
              }}>
                <OSpan>IskolarBlock:</OSpan>
                <br />A Blockchain-Enabled Platform for Transparent Scholarship Processing
              </h1>
            </Fade>

            <Fade delay={0.2}>
              <p style={{ color: T.inkLight, fontSize: 16, lineHeight: 1.85, marginBottom: 36, maxWidth: 560 }}>
                A blockchain-enabled scholarship management platform integrating OCR, secure
                authentication, and immutable blockchain logging to improve transparency,
                integrity, and efficiency in barangay scholarship processing.
              </p>
            </Fade>

            <Fade delay={0.28}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 44 }}>
                {heroButtons.map((b) => (
                  <button
                    key={b.l}
                    style={{
                      display: "flex", alignItems: "center", gap: 8,
                      padding: "11px 22px", borderRadius: 10, fontWeight: 700,
                      fontSize: 14, cursor: "pointer",
                      background: b.primary ? "linear-gradient(135deg,#f97316,#ea580c)" : T.white,
                      color: b.primary ? "white" : T.inkMid,
                      border: b.primary ? "none" : `1.5px solid ${T.border}`,
                      boxShadow: b.primary ? "0 4px 18px rgba(249,115,22,0.38)" : "0 1px 4px rgba(0,0,0,0.07)",
                      transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; }}
                  >
                    {b.icon}{b.l}
                  </button>
                ))}
              </div>
            </Fade>

            <Fade delay={0.36}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
                {authors.map((a) => (
                  <div key={a} style={{
                    background: T.white, border: `1.5px solid ${T.border}`,
                    borderRadius: 10, padding: "8px 14px",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
                  }}>
                    <p style={{ color: T.orange, fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", margin: 0 }}>AUTHOR</p>
                    <p style={{ color: T.ink, fontSize: 13, fontWeight: 700, margin: 0 }}>{a}</p>
                  </div>
                ))}
              </div>
              <p style={{ color: T.inkFaint, fontSize: 12 }}>
                College of Information Technology and Engineering · La Consolacion University Philippines
              </p>
            </Fade>
          </div>

          {/* Dashboard mockup */}
          <Fade delay={0.25} x={32} y={0}>
            <div style={{ position: "relative" }}>
              <div style={{
                background: T.white, borderRadius: 20, overflow: "hidden",
                border: `1.5px solid ${T.border}`,
                boxShadow: "0 20px 60px rgba(249,115,22,0.15),0 4px 16px rgba(0,0,0,0.08)",
              }}>
                {/* Window chrome */}
                <div style={{
                  background: T.bgSection, padding: "11px 16px",
                  borderBottom: `1px solid ${T.border}`,
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  {(["#ef4444", "#f59e0b", "#22c55e"] as const).map((c, i) => (
                    <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
                  ))}
                  <span style={{ color: T.inkFaint, fontSize: 11, marginLeft: 8, fontFamily: "monospace" }}>
                    iskolarblock.app — Dashboard
                  </span>
                </div>

                <div style={{ padding: 20 }}>
                  {/* Metrics grid */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
                    {dashMetrics.map((m) => (
                      <div key={m.l} style={{
                        background: T.orangeTint, border: `1px solid ${T.orangeSoft}`,
                        borderRadius: 10, padding: "10px 12px",
                      }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 5, color: T.orange, marginBottom: 4 }}>
                          {m.icon}
                          <span style={{ fontSize: 10, color: T.inkLight }}>{m.l}</span>
                        </div>
                        <div style={{ fontWeight: 900, fontSize: 18, color: T.ink }}>{m.v}</div>
                      </div>
                    ))}
                  </div>

                  {/* Blockchain log */}
                  <div style={{
                    background: T.bgSection, border: `1px solid ${T.border}`,
                    borderRadius: 10, padding: 12,
                  }}>
                    <p style={{ color: T.inkFaint, fontSize: 10, margin: "0 0 8px", fontFamily: "monospace" }}>
                      BLOCKCHAIN LOG
                    </p>
                    {txLog.map((tx, i) => (
                      <div key={i} style={{
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                        padding: "5px 0",
                        borderBottom: i < 2 ? `1px solid ${T.borderSoft}` : "none",
                      }}>
                        <span style={{ color: T.orange, fontSize: 10, fontFamily: "monospace" }}>{tx.h}</span>
                        <span style={{
                          background: tx.s === "CONFIRMED"
                            ? "rgba(22,163,74,0.1)"
                            : "rgba(245,158,11,0.12)",
                          color: tx.s === "CONFIRMED" ? T.green : "#d97706",
                          fontSize: 9, fontWeight: 800, padding: "2px 8px", borderRadius: 99,
                        }}>{tx.s}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 10, display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {["OCR", "JWT", "Polygon", "ISO 25010"].map((t) => (
                      <span key={t} style={{
                        background: T.orangeTint, color: T.orangeDark, fontSize: 9,
                        fontWeight: 800, padding: "3px 8px", borderRadius: 99,
                        border: `1px solid ${T.orangeSoft}`,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              {floatingBadges.map((n, i) => (
                <div key={i} style={{
                  position: "absolute",
                  top: n.top,
                  right: n.right,
                  bottom: n.bottom,
                  left: n.left,
                  background: "linear-gradient(135deg,#f97316,#ea580c)",
                  borderRadius: 10, padding: "8px 14px",
                  display: "flex", alignItems: "center", gap: 6,
                  boxShadow: "0 4px 18px rgba(249,115,22,0.4)", zIndex: 10,
                }}>
                  <span style={{ color: "white" }}>{n.icon}</span>
                  <span style={{ color: "white", fontSize: 11, fontWeight: 800 }}>{n.label}</span>
                </div>
              ))}
            </div>
          </Fade>
        </div>
      </div>

      <div style={{
        position: "absolute", bottom: 28, left: "50%",
        transform: "translateX(-50%)", animation: "bounce 2s infinite", color: T.inkFaint,
      }}>
        <ChevronDown size={22} />
      </div>
    </section>
  );
};

/* ─── ABSTRACT ───────────────────────────────────────────────────────────── */
const Abstract = () => {
  const kw = [
    "Blockchain", "OCR", "Scholarship Management", "OTP Authentication",
    "ISO/IEC 25010", "Polygon Blockchain", "Transparency", "Data Integrity",
  ];
  return (
    <section id="abstract" style={{ padding: "100px 24px", background: T.white, position: "relative", overflow: "hidden" }}>
      <Blob top="-20%" right="-10%" size={400} opacity={0.3} color="#f97316" />
      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative" }}>
        <Fade><SectionTag>Abstract</SectionTag></Fade>
        <Fade delay={0.06}><H2>Research <OSpan>Overview</OSpan></H2></Fade>
        <Fade delay={0.12}>
          <Card accent style={{ padding: 40, marginBottom: 32 }}>
            <div style={{ width: 48, height: 4, background: "linear-gradient(90deg,#f97316,#fbbf24)", borderRadius: 2, marginBottom: 24 }} />
            <p style={{ color: T.inkMid, fontSize: 16, lineHeight: 2, marginBottom: 20 }}>
              <strong style={{ color: T.orange }}>IskolarBlock</strong> is a blockchain-enabled web platform designed to improve transparency,
              integrity, and efficiency in barangay-level scholarship processing. The system integrates Optical Character
              Recognition (OCR), secure OTP authentication, automated document extraction, role-based administration,
              and blockchain transaction logging to modernize scholarship management workflows.
            </p>
            <p style={{ color: T.inkMid, fontSize: 16, lineHeight: 2, marginBottom: 20 }}>
              Developed using <strong style={{ color: T.ink }}>Agile Scrum methodology</strong>, the platform was evaluated through structured
              manual testing and ISO/IEC 25010:2023 software quality assessment. Results from{" "}
              <strong style={{ color: T.orange }}>51 respondents</strong> and{" "}
              <strong style={{ color: T.orange }}>76 test cases</strong> showed progressive improvement, achieving a final pass
              rate of <strong style={{ color: T.orange }}>98.68%</strong> and an overall ISO evaluation mean of{" "}
              <strong style={{ color: T.orange }}>4.85</strong> — interpreted as{" "}
              <strong style={{ color: T.green }}>"Excellent."</strong>
            </p>
            <p style={{ color: T.inkMid, fontSize: 16, lineHeight: 2 }}>
              Findings confirm IskolarBlock is{" "}
              <strong style={{ color: T.ink }}>reliable, secure, usable, and deployment-ready</strong> for real-world barangay scholarship operations.
            </p>
          </Card>
        </Fade>
        <Fade delay={0.22}>
          <p style={{ color: T.inkFaint, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", marginBottom: 10 }}>KEYWORDS</p>
          <div>{kw.map((k) => <OBadge key={k}>{k}</OBadge>)}</div>
        </Fade>
      </div>
    </section>
  );
};

/* ─── INTRODUCTION ───────────────────────────────────────────────────────── */
const Introduction = () => {
  const problems = [
    { icon: <AlertTriangle size={16} />, t: "Manual Processing", d: "Paper-based workflows introduce delays and human errors across all scholarship steps." },
    { icon: <Clock size={16} />, t: "Processing Delays", d: "Redundant verification slows approval timelines significantly for applicants." },
    { icon: <X size={16} />, t: "Fraud Risks", d: "Absence of tamper-proof records enables document manipulation and fraudulent claims." },
    { icon: <FileText size={16} />, t: "Lack of Transparency", d: "Applicants cannot track application status, eroding public trust in the system." },
  ];

  const solutions = [
    { icon: <Shield size={16} />, t: "Blockchain Immutability", d: "Every record hashed and stored on Polygon — permanently auditable and tamper-proof." },
    { icon: <Cpu size={16} />, t: "OCR Automation", d: "Tesseract OCR auto-extracts form data from uploads, eliminating manual data entry." },
    { icon: <Key size={16} />, t: "Secure OTP Auth", d: "One-Time Passwords ensure verified stakeholder access at every login." },
    { icon: <Globe size={16} />, t: "Real-Time Tracking", d: "Applicants monitor status live; admins manage workflows from a unified dashboard." },
  ];

  const theories = [
    { l: "Decentralization Theory", d: "Distributed ledger eliminates single points of failure and central authority." },
    { l: "Immutable Ledger Theory", d: "Cryptographic hashing ensures permanent, tamper-proof scholarship records." },
    { l: "E-Governance Framework", d: "Digital public service delivery modernizes barangay-level administration." },
  ];

  return (
    <section id="introduction" style={{ padding: "100px 24px", background: T.bgAlt, position: "relative", overflow: "hidden" }}>
      <MeshBg opacity={0.04} />
      <Blob bottom="-15%" left="-8%" size={500} opacity={0.25} color="#f97316" />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <Fade><SectionTag>Introduction & Background</SectionTag></Fade>
        <Fade delay={0.06}>
          <H2>The Problem <OSpan>& The Solution</OSpan></H2>
          <p style={{ color: T.inkLight, fontSize: 16, lineHeight: 1.85, maxWidth: 620, marginTop: -32, marginBottom: 40 }}>
            Barangay San Miguel's scholarship program faced systemic inefficiencies rooted in legacy
            paper-based workflows. IskolarBlock applies decentralization theory and immutable ledger
            principles to enable genuine digital governance.
          </p>
        </Fade>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }} className="two-col">
          {/* Problems */}
          <Fade delay={0.1} x={-24} y={0}>
            <div>
              <div style={{
                display: "flex", alignItems: "center", gap: 10, marginBottom: 18,
                padding: "12px 16px", background: T.redBg,
                border: `1px solid ${T.redBorder}`, borderRadius: 12,
              }}>
                <AlertTriangle size={16} color={T.red} />
                <span style={{ color: T.red, fontWeight: 800, fontSize: 15 }}>Traditional System Challenges</span>
              </div>
              {problems.map((p, i) => (
                <Fade key={p.t} delay={0.14 + i * 0.07}>
                  <div style={{
                    display: "flex", gap: 12, marginBottom: 12, padding: 16,
                    background: T.redBg, border: `1px solid ${T.redBorder}`,
                    borderRadius: 12, alignItems: "flex-start",
                  }}>
                    <div style={{ color: T.red, flexShrink: 0, marginTop: 1 }}>{p.icon}</div>
                    <div>
                      <div style={{ color: T.ink, fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{p.t}</div>
                      <div style={{ color: T.inkLight, fontSize: 13, lineHeight: 1.65 }}>{p.d}</div>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </Fade>

          {/* Solutions */}
          <Fade delay={0.15} x={24} y={0}>
            <div>
              <div style={{
                display: "flex", alignItems: "center", gap: 10, marginBottom: 18,
                padding: "12px 16px", background: T.orangeTint,
                border: `1px solid ${T.orangeSoft}`, borderRadius: 12,
              }}>
                <Zap size={16} color={T.orange} />
                <span style={{ color: T.orangeDark, fontWeight: 800, fontSize: 15 }}>IskolarBlock Advantages</span>
              </div>
              {solutions.map((s, i) => (
                <Fade key={s.t} delay={0.14 + i * 0.07}>
                  <div style={{
                    display: "flex", gap: 12, marginBottom: 12, padding: 16,
                    background: T.orangeTint, border: `1px solid ${T.orangeSoft}`,
                    borderRadius: 12, alignItems: "flex-start",
                  }}>
                    <div style={{ color: T.orange, flexShrink: 0, marginTop: 1 }}>{s.icon}</div>
                    <div>
                      <div style={{ color: T.ink, fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{s.t}</div>
                      <div style={{ color: T.inkLight, fontSize: 13, lineHeight: 1.65 }}>{s.d}</div>
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </Fade>
        </div>

        <Fade delay={0.5}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginTop: 40 }} className="three-col">
            {theories.map((t) => (
              <Card key={t.l} style={{ padding: 20, borderLeft: `3px solid ${T.orange}` }}>
                <div style={{ color: T.orange, fontWeight: 800, fontSize: 13, marginBottom: 6 }}>{t.l}</div>
                <div style={{ color: T.inkLight, fontSize: 12, lineHeight: 1.65 }}>{t.d}</div>
              </Card>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
};

/* ─── OBJECTIVES ─────────────────────────────────────────────────────────── */
const Objectives = () => {
  const specific = [
    "Integrate secure OTP authentication and OCR-based document processing.",
    "Implement blockchain logging for tamper-proof scholarship records.",
    "Evaluate system acceptability through structured manual testing.",
    "Assess software quality using ISO/IEC 25010:2023 standards.",
    "Support SDG 4, SDG 9, and SDG 16 through transparent digital governance.",
  ];

  const sdgs = [
    { num: "4",  label: "Quality Education",   color: "#e63946", bg: "#fef2f2", d: "Ensuring inclusive and equitable quality education and promoting lifelong learning for all." },
    { num: "9",  label: "Industry & Innovation", color: "#f97316", bg: "#fff7ed", d: "Building resilient infrastructure, promoting inclusive industrialization and innovation." },
    { num: "16", label: "Peace & Justice",       color: "#1d4ed8", bg: "#eff6ff", d: "Promoting peaceful, just and inclusive societies with strong, accountable institutions." },
  ];

  return (
    <section id="objectives" style={{ padding: "100px 24px", background: T.white, position: "relative", overflow: "hidden" }}>
      <Blob top="-10%" right="-5%" size={400} opacity={0.25} color="#fbbf24" />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <Fade><SectionTag>Research Objectives</SectionTag></Fade>
        <Fade delay={0.06}><H2>Goals & <OSpan>Objectives</OSpan></H2></Fade>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 56 }} className="two-col">
          <Fade delay={0.1}>
            <Card accent style={{ height: "100%" }}>
              <p style={{ color: T.orange, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", marginBottom: 16 }}>
                GENERAL OBJECTIVE
              </p>
              <div style={{ width: 40, height: 3, background: "linear-gradient(90deg,#f97316,#fbbf24)", borderRadius: 2, marginBottom: 20 }} />
              <p style={{ color: T.ink, fontSize: 17, lineHeight: 1.85, fontStyle: "italic", fontFamily: "'Georgia',serif" }}>
                "To develop a blockchain-enabled scholarship management platform that enhances transparency,
                data integrity, and operational efficiency in barangay scholarship processing."
              </p>
            </Card>
          </Fade>

          <Fade delay={0.14}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {specific.map((s, i) => (
                <div key={i} style={{
                  display: "flex", gap: 12, alignItems: "flex-start",
                  padding: "13px 16px", background: T.orangeTint,
                  border: `1px solid ${T.orangeSoft}`, borderRadius: 12,
                }}>
                  <div style={{
                    width: 26, height: 26, borderRadius: "50%",
                    background: "linear-gradient(135deg,#f97316,#ea580c)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0, fontSize: 12, fontWeight: 900, color: "white",
                  }}>{i + 1}</div>
                  <span style={{ color: T.inkMid, fontSize: 13, lineHeight: 1.65, paddingTop: 3 }}>{s}</span>
                </div>
              ))}
            </div>
          </Fade>
        </div>

        <Fade delay={0.28}>
          <p style={{ color: T.inkFaint, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", marginBottom: 18 }}>
            ALIGNED SUSTAINABLE DEVELOPMENT GOALS
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="three-col">
            {sdgs.map((s, i) => (
              <Fade key={s.num} delay={0.32 + i * 0.08}>
                <div style={{ borderRadius: 16, overflow: "hidden", border: `1.5px solid ${T.border}`, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
                  <div style={{ background: s.color, padding: "20px 20px 16px" }}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", fontWeight: 700, marginBottom: 4 }}>SDG {s.num}</div>
                    <div style={{ color: "white", fontWeight: 900, fontSize: 17, lineHeight: 1.2 }}>{s.label}</div>
                  </div>
                  <div style={{ background: s.bg, padding: 16 }}>
                    <p style={{ color: T.inkMid, fontSize: 12, lineHeight: 1.65, margin: 0 }}>{s.d}</p>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
};

/* ─── METHODOLOGY ────────────────────────────────────────────────────────── */
const Methodology = () => {
  const stack = [
    { n: "Next.js",         c: "Frontend"   },
    { n: "TypeScript",      c: "Language"   },
    { n: "Tailwind CSS",    c: "Styling"    },
    { n: "Supabase",        c: "Database"   },
    { n: "Tesseract OCR",   c: "AI/ML"      },
    { n: "PDF.js",          c: "Document"   },
    { n: "ethers.js",       c: "Web3"       },
    { n: "Polygon Testnet", c: "Blockchain" },
    { n: "JWT Auth",        c: "Security"   },
    { n: "n8n Automation",  c: "Workflow"   },
  ];

  const features = [
    { icon: <Key size={18} />,      t: "OTP Authentication", d: "One-Time Password for verified access" },
    { icon: <ScanLine size={18} />, t: "OCR Extraction",     d: "Automated data parsing from uploads" },
    { icon: <Database size={18} />, t: "Blockchain Logging", d: "Immutable records on Polygon testnet" },
    { icon: <UserCog size={18} />,  t: "Admin Dashboard",    d: "Centralized management for staff" },
    { icon: <TrendingUp size={18} />, t: "App Tracking",     d: "Real-time status visibility" },
    { icon: <ScrollText size={18} />, t: "PDF/Excel Reports", d: "Exportable analytics & audits" },
    { icon: <Bell size={18} />,     t: "Notifications",      d: "Automated email and in-app alerts" },
    { icon: <Layers size={18} />,   t: "Role-Based Access",  d: "Granular permission tiers per role" },
  ];

  const scrum = ["Plan", "Design", "Develop", "Test", "Deploy"];
  const respondents = [
    { l: "Total Respondents",  v: "51" },
    { l: "Student Applicants", v: "47" },
    { l: "IT Experts",         v: "3"  },
    { l: "Barangay Staff",     v: "1"  },
  ];

  return (
    <section id="methodology" style={{ padding: "100px 24px", background: T.bgSection, position: "relative", overflow: "hidden" }}>
      <MeshBg opacity={0.04} />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <Fade><SectionTag>Methodology</SectionTag></Fade>
        <Fade delay={0.06}><H2>Research Design <OSpan>& Process</OSpan></H2></Fade>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 48 }} className="two-col">
          <Fade delay={0.1}>
            <Card>
              <p style={{ color: T.orange, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", marginBottom: 16 }}>
                RESEARCH DESIGN
              </p>
              <p style={{ color: T.inkMid, fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
                Descriptive research design with cluster sampling technique applied across all respondent groups.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {respondents.map((r) => (
                  <div key={r.l} style={{
                    background: T.orangeTint, border: `1px solid ${T.orangeSoft}`,
                    borderRadius: 12, padding: "10px 18px", textAlign: "center", flex: 1, minWidth: 90,
                  }}>
                    <div style={{ color: T.orange, fontWeight: 900, fontSize: 24, lineHeight: 1 }}>{r.v}</div>
                    <div style={{ color: T.inkLight, fontSize: 11, marginTop: 4 }}>{r.l}</div>
                  </div>
                ))}
              </div>
            </Card>
          </Fade>

          <Fade delay={0.15}>
            <Card>
              <p style={{ color: T.orange, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", marginBottom: 16 }}>
                AGILE SCRUM WORKFLOW
              </p>
              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                marginBottom: 20, flexWrap: "wrap", gap: 4,
              }}>
                {scrum.map((s, i) => (
                  <span key={s}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                      <div style={{
                        width: 46, height: 46, borderRadius: "50%",
                        background: "linear-gradient(135deg,#f97316,#ea580c)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "white", fontWeight: 900, fontSize: 12,
                        boxShadow: "0 3px 12px rgba(249,115,22,0.3)",
                      }}>{i + 1}</div>
                      <span style={{ color: T.inkMid, fontSize: 11, fontWeight: 700 }}>{s}</span>
                    </div>
                    {i < 5 && <ChevronRight size={14} color={T.inkFaint} style={{ marginBottom: 16 }} />}
                  </span>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {["Sprint-based", "Trello", "Stakeholder Feedback", "Continuous Testing"].map((t) => (
                  <PillTag key={t}>{t}</PillTag>
                ))}
              </div>
            </Card>
          </Fade>
        </div>

        <Fade delay={0.2}>
          <p style={{ color: T.inkFaint, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", marginBottom: 16 }}>
            TECHNOLOGIES USED
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 48 }}>
            {stack.map((t, i) => (
              <Fade key={t.n} delay={0.22 + i * 0.04}>
                <div style={{
                  background: T.white, border: `1.5px solid ${T.border}`, borderRadius: 10,
                  padding: "9px 16px", display: "flex", alignItems: "center", gap: 10,
                  boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.orange }} />
                  <div>
                    <div style={{ color: T.ink, fontWeight: 700, fontSize: 13 }}>{t.n}</div>
                    <div style={{ color: T.inkFaint, fontSize: 10 }}>{t.c}</div>
                  </div>
                </div>
              </Fade>
            ))}
          </div>
        </Fade>

        <Fade delay={0.3}>
          <p style={{ color: T.inkFaint, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", marginBottom: 16 }}>
            SYSTEM FEATURES
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }} className="four-col">
            {features.map((f, i) => (
              <Fade key={f.t} delay={0.32 + i * 0.05}>
                <Card style={{ padding: 18, textAlign: "center" }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 12, background: T.orangeTint,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: T.orange, margin: "0 auto 12px",
                  }}>{f.icon}</div>
                  <div style={{ color: T.ink, fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{f.t}</div>
                  <div style={{ color: T.inkLight, fontSize: 11, lineHeight: 1.55 }}>{f.d}</div>
                </Card>
              </Fade>
            ))}
          </div>
        </Fade>
      </div>
    </section>
  );
};

/* ─── ARCHITECTURE ───────────────────────────────────────────────────────── */
const Architecture = () => {
  const flow = [
    { label: "User",       icon: <Users size={20} />,    sub: "Applicant / Admin" },
    { label: "OCR Engine", icon: <Cpu size={20} />,      sub: "Tesseract OCR"    },
    { label: "Supabase DB", icon: <Database size={20} />, sub: "PostgreSQL"       },
    { label: "Blockchain", icon: <Shield size={20} />,   sub: "Polygon Network"  },
  ];

  const archCards = [
    {
      t: "OCR Processing",
      icon: <ScanLine size={20} />,
      d: "Tesseract OCR parses uploaded scholarship documents, extracting key fields automatically to eliminate manual data entry and reduce processing time.",
    },
    {
      t: "Blockchain Hashing",
      icon: <Shield size={20} />,
      d: "Records are hashed using keccak256 and broadcast to the Polygon testnet, creating a permanent, tamper-proof audit trail for all transactions.",
    },
    {
      t: "JWT Authentication",
      icon: <Lock size={20} />,
      d: "Secure JSON Web Tokens combined with OTP verification provide multi-layer authentication and role-based access control for all users.",
    },
  ];

  return (
    <section id="architecture" style={{ padding: "100px 24px", background: T.white, position: "relative", overflow: "hidden" }}>
      <Blob top="-15%" right="-8%" size={400} opacity={0.25} color="#f97316" />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <Fade><SectionTag>System Architecture</SectionTag></Fade>
        <Fade delay={0.06}><H2>Technical <OSpan>Architecture</OSpan></H2></Fade>

        <Fade delay={0.1}>
          <Card accent style={{ marginBottom: 36, padding: 40 }}>
            <p style={{ color: T.inkFaint, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", marginBottom: 28 }}>
              DATA FLOW PIPELINE
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, overflowX: "auto", paddingBottom: 4 }}>
              {flow.map((f, i) => (
                <span key={f.label} style={{ display: "contents" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, flex: 1, minWidth: 110 }}>
                    <div style={{
                      width: 64, height: 64, borderRadius: 18,
                      background: "linear-gradient(135deg,#f97316,#ea580c)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "white", boxShadow: "0 6px 20px rgba(249,115,22,0.3)",
                    }}>{f.icon}</div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ color: T.ink, fontWeight: 700, fontSize: 13 }}>{f.label}</div>
                      <div style={{ color: T.inkFaint, fontSize: 11 }}>{f.sub}</div>
                    </div>
                  </div>
                  {i < 3 && (
                    <div style={{ display: "flex", alignItems: "center", gap: 2, flex: 0, padding: "0 8px", marginBottom: 16 }}>
                      <div style={{ width: 20, height: 2, background: `linear-gradient(90deg,${T.orange},${T.orangeSoft})` }} />
                      <ArrowRight size={16} color={T.orange} />
                    </div>
                  )}
                </span>
              ))}
            </div>
          </Card>
        </Fade>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="three-col">
          {archCards.map((c, i) => (
            <Fade key={c.t} delay={0.2 + i * 0.1}>
              <Card style={{ height: "100%" }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12, background: T.orangeTint,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: T.orange, marginBottom: 14,
                }}>{c.icon}</div>
                <div style={{ color: T.ink, fontWeight: 700, fontSize: 15, marginBottom: 10 }}>{c.t}</div>
                <div style={{ color: T.inkLight, fontSize: 13, lineHeight: 1.75 }}>{c.d}</div>
              </Card>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── RESULTS ────────────────────────────────────────────────────────────── */
interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: T.white, border: `1px solid ${T.border}`,
      borderRadius: 10, padding: "10px 14px",
      boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
    }}>
      <p style={{ color: T.ink, fontWeight: 700, margin: "0 0 4px", fontSize: 13 }}>
        {label ?? payload[0]?.name}
      </p>
      <p style={{ color: T.orange, margin: 0, fontWeight: 800 }}>{payload[0]?.value}</p>
    </div>
  );
};

const Results = () => {
  const testData = [
    { cycle: "Cycle 1", rate: 82.89 },
    { cycle: "Cycle 2", rate: 94.74 },
    { cycle: "Cycle 3", rate: 98.68 },
  ];

  const isoData = [
    { name: "Functional Suitability",  val: 4.87 },
    { name: "Performance Efficiency",  val: 4.80 },
    { name: "Compatibility",           val: 4.84 },
    { name: "Interaction Capability",  val: 4.86 },
    { name: "Reliability",             val: 4.86 },
    { name: "Security",                val: 4.85 },
    { name: "Maintainability",         val: 4.87 },
    { name: "Flexibility",             val: 4.91 },
    { name: "Safety",                  val: 4.76 },
  ];

  return (
    <section id="results" style={{ padding: "100px 24px", background: T.bgSection, position: "relative", overflow: "hidden" }}>
      <MeshBg opacity={0.04} />
      <Blob top="-10%" right="-5%" size={450} opacity={0.25} color="#fbbf24" />
      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative" }}>
        <Fade><SectionTag>Results & Findings</SectionTag></Fade>
        <Fade delay={0.06}><H2>Evaluation <OSpan>Results</OSpan></H2></Fade>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 40 }} className="two-col">
          <Fade delay={0.1}>
            <Card>
              <p style={{ color: T.orange, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", marginBottom: 20 }}>
                MANUAL TESTING PASS RATES
              </p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={testData} barSize={52}>
                  <defs>
                    <linearGradient id="barG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f97316" />
                      <stop offset="100%" stopColor="#ea580c" />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.borderSoft} />
                  <XAxis dataKey="cycle" tick={{ fill: T.inkLight, fontSize: 12 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[70, 100]} tick={{ fill: T.inkFaint, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="rate" fill="url(#barG)" radius={[7, 7, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Fade>

          <Fade delay={0.15}>
            <Card>
              <p style={{ color: T.orange, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", marginBottom: 20 }}>
                TESTING CYCLE PROGRESSION
              </p>
              {testData.map((t) => (
                <div key={t.cycle} style={{ marginBottom: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 7 }}>
                    <span style={{ color: T.ink, fontSize: 14, fontWeight: 700 }}>{t.cycle}</span>
                    <span style={{ color: T.orange, fontWeight: 900, fontSize: 14 }}>{t.rate}%</span>
                  </div>
                  <div style={{ height: 8, background: T.bgSection, borderRadius: 99, overflow: "hidden", border: `1px solid ${T.border}` }}>
                    <div style={{
                      height: "100%",
                      width: `${((t.rate - 70) / 30) * 100}%`,
                      background: "linear-gradient(90deg,#f97316,#fbbf24)",
                      borderRadius: 99,
                    }} />
                  </div>
                </div>
              ))}
              <div style={{
                marginTop: 20, padding: 14,
                background: T.greenBg, border: `1px solid ${T.greenBorder}`, borderRadius: 12,
              }}>
                <div style={{ color: T.green, fontWeight: 800, fontSize: 13, display: "flex", alignItems: "center", gap: 7 }}>
                  <CheckCircle size={15} />Near-Complete Production Stability
                </div>
                <div style={{ color: T.inkLight, fontSize: 12, marginTop: 5, lineHeight: 1.6 }}>
                  Final cycle: 98.68% pass rate across 76 test cases.
                </div>
              </div>
            </Card>
          </Fade>
        </div>

        <Fade delay={0.2}>
          <Card accent style={{ marginBottom: 32 }}>
            <p style={{ color: T.orange, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", marginBottom: 24 }}>
              ISO/IEC 25010:2023 QUALITY CHARACTERISTICS
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14 }} className="three-col">
              {isoData.map((item, i) => (
                <Fade key={item.name} delay={0.22 + i * 0.04}>
                  <div style={{
                    background: T.orangeTint, border: `1px solid ${T.orangeSoft}`,
                    borderRadius: 12, padding: "14px 16px",
                  }}>
                    <div style={{ color: T.inkLight, fontSize: 11, marginBottom: 6, lineHeight: 1.4 }}>{item.name}</div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                      <span style={{ color: T.orange, fontWeight: 900, fontSize: 28, lineHeight: 1 }}>
                        <Counter target={item.val} decimals={2} />
                      </span>
                      <span style={{ color: T.inkFaint, fontSize: 11 }}>/ 5.00</span>
                    </div>
                    <div style={{ height: 4, background: "rgba(249,115,22,0.15)", borderRadius: 99, marginTop: 8, overflow: "hidden" }}>
                      <div style={{
                        height: "100%",
                        width: `${(item.val / 5) * 100}%`,
                        background: "linear-gradient(90deg,#f97316,#fbbf24)",
                        borderRadius: 99,
                      }} />
                    </div>
                  </div>
                </Fade>
              ))}
            </div>
          </Card>
        </Fade>

        <Fade delay={0.5}>
          <div style={{
            textAlign: "center", padding: "56px 32px",
            background: "linear-gradient(135deg,#fff7ed,#fef3e8,#fde8d0)",
            border: `2px solid ${T.orangeSoft}`, borderRadius: 24,
            boxShadow: "0 8px 40px rgba(249,115,22,0.1)",
          }}>
            <div style={{ color: T.orange, fontSize: 11, fontWeight: 800, letterSpacing: "0.15em", marginBottom: 14 }}>
              FINAL GRAND MEAN · ISO/IEC 25010:2023
            </div>
            <div style={{ fontSize: 88, fontWeight: 900, color: T.ink, lineHeight: 1, marginBottom: 10, fontFamily: "'Georgia',serif" }}>
              <Counter target={4.85} decimals={2} />
            </div>
            <div style={{ fontSize: 26, fontWeight: 800, color: T.orange, marginBottom: 20 }}>"Excellent"</div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: T.greenBg, border: `1.5px solid ${T.greenBorder}`,
              borderRadius: 99, padding: "12px 28px",
            }}>
              <CheckCircle size={18} color={T.green} />
              <span style={{ color: T.green, fontWeight: 800, fontSize: 15 }}>System Ready for Deployment</span>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
};

/* ─── CONCLUSION ─────────────────────────────────────────────────────────── */
const Conclusion = () => {
  const pts = [
    { icon: <Shield size={18} />,      t: "Tamper-Proof Records",    d: "Blockchain immutability eliminates document manipulation and ensures data integrity across all scholarship transactions." },
    { icon: <TrendingUp size={18} />,  t: "Improved Efficiency",     d: "Automated OCR processing and role-based workflows significantly reduce manual verification burdens on staff." },
    { icon: <Users size={18} />,       t: "Institutional Trust",     d: "Transparent tracking and immutable audit trails increase public confidence in the scholarship program." },
    { icon: <Globe size={18} />,       t: "Digital Transformation",  d: "Demonstrates viability of blockchain technology for local government e-governance modernization." },
    { icon: <Award size={18} />,       t: "Strong Quality Evaluation", d: "ISO/IEC 25010 mean of 4.85 confirms production-level software quality across all nine characteristics." },
    { icon: <CheckCircle size={18} />, t: "Deployment Readiness",   d: "98.68% manual test pass rate with Excellent ISO rating confirms the system's operational readiness." },
  ];

  return (
    <section id="conclusion" style={{ padding: "100px 24px", background: T.white, position: "relative", overflow: "hidden" }}>
      <Blob top="-10%" left="-8%" size={400} opacity={0.25} color="#f97316" />
      <div style={{ maxWidth: 1000, margin: "0 auto", position: "relative", textAlign: "center" }}>
        <Fade><SectionTag>Conclusion</SectionTag></Fade>
        <Fade delay={0.06}><H2>Research <OSpan>Conclusions</OSpan></H2></Fade>
        <Fade delay={0.1}>
          <p style={{ color: T.inkLight, fontSize: 16, lineHeight: 1.9, maxWidth: 700, margin: "0 auto 56px" }}>
            IskolarBlock successfully demonstrates the synergy of{" "}
            <strong style={{ color: T.orange }}>OCR and blockchain technology</strong> in modernizing
            local government scholarship management — enabling scholarship accessibility, secure public
            service delivery, and genuine digital transformation at the barangay level.
          </p>
        </Fade>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, textAlign: "left" }} className="three-col">
          {pts.map((p, i) => (
            <Fade key={p.t} delay={0.14 + i * 0.07}>
              <Card>
                <div style={{
                  width: 40, height: 40, borderRadius: 11, background: T.orangeTint,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: T.orange, marginBottom: 14,
                }}>{p.icon}</div>
                <div style={{ color: T.ink, fontWeight: 700, fontSize: 14, marginBottom: 8 }}>{p.t}</div>
                <div style={{ color: T.inkLight, fontSize: 12, lineHeight: 1.7 }}>{p.d}</div>
              </Card>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── RECOMMENDATIONS ────────────────────────────────────────────────────── */
const Recommendations = () => {
  const recs = [
    { n: "01", t: "AI-Enhanced OCR",                d: "Integrate deep learning models to improve OCR accuracy for handwritten documents and non-standard formats." },
    { n: "02", t: "Biometric Authentication",        d: "Add fingerprint or facial recognition for stronger identity verification in scholarship applications." },
    { n: "03", t: "Inter-Barangay Scalability",      d: "Expand the platform architecture to support multi-barangay deployments with federated data management." },
    { n: "04", t: "Cost-Benefit Analysis",           d: "Conduct formal economic analysis to quantify ROI of blockchain deployment versus traditional systems." },
    { n: "05", t: "Longitudinal Impact Studies",     d: "Perform multi-year follow-up studies to measure the long-term effects on scholarship access and equity." },
    { n: "06", t: "Self-Sovereign Identity (SSI)",   d: "Explore SSI integration enabling citizens to own and control their scholarship credentials on-chain." },
  ];

  return (
    <section style={{ padding: "100px 24px", background: T.bgAlt, position: "relative", overflow: "hidden" }}>
      <MeshBg opacity={0.04} />
      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
        <Fade><SectionTag>Recommendations</SectionTag></Fade>
        <Fade delay={0.06}><H2>Future <OSpan>Directions</OSpan></H2></Fade>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="three-col">
          {recs.map((r, i) => (
            <Fade key={r.n} delay={0.1 + i * 0.07}>
              <Card style={{ height: "100%" }}>
                <div style={{
                  color: T.orangeSoft, fontWeight: 900, fontSize: 44,
                  lineHeight: 1, marginBottom: 14, fontFamily: "'Georgia',serif",
                }}>{r.n}</div>
                <div style={{ color: T.ink, fontWeight: 800, fontSize: 15, marginBottom: 10 }}>{r.t}</div>
                <div style={{ color: T.inkLight, fontSize: 13, lineHeight: 1.7 }}>{r.d}</div>
              </Card>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ─── REFERENCES + FOOTER ────────────────────────────────────────────────── */
const References = () => {
  const refs = [
    "Nakamoto, S. (2008). Bitcoin: A Peer-to-Peer Electronic Cash System.",
    "Buterin, V. (2014). A Next-Generation Smart Contract and Decentralized Application Platform. Ethereum Whitepaper.",
    "ISO/IEC 25010:2023. Systems and software engineering — Systems and software Quality Requirements and Evaluation (SQuaRE).",
    "Smith, J. et al. (2022). Blockchain Applications in Public Administration. Journal of E-Governance, 45(2), 112–128.",
    "Tesseract OCR. (2023). Open Source OCR Engine. Google LLC.",
    "OpenZeppelin. (2023). Solidity Smart Contract Security Standards.",
    "United Nations. (2015). Transforming Our World: The 2030 Agenda for Sustainable Development.",
    "Philippine Statistics Authority. (2023). Digital Governance and E-Services Report.",
  ];

  const refButtons = [
    { l: "Download Full IMRaD Paper", i: <Download size={15} /> }
  ];

  return (
    <section id="references" style={{ position: "relative" }}>
      <div style={{ padding: "100px 24px 0", background: T.white, position: "relative", overflow: "hidden" }}>
        <Blob top="-15%" right="-5%" size={400} opacity={0.25} color="#fbbf24" />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative" }}>
          <Fade><SectionTag>References</SectionTag></Fade>
          <Fade delay={0.06}><H2>Research <OSpan>References</OSpan></H2></Fade>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginBottom: 72 }} className="two-col">
            <Fade delay={0.1}>
              <Card accent style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
                <div style={{
                  width: 140, height: 140, background: T.orangeTint,
                  border: `2px dashed ${T.orangeSoft}`, borderRadius: 18,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexDirection: "column", gap: 8,
                }}>
                  <QrCode size={52} color={T.orange} />
                  <span style={{ color: T.inkFaint, fontSize: 10, fontWeight: 600 }}>Scan for Full Paper</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%" }}>
                  {refButtons.map((b) => (
                    <a
                      key={b.l}
                      href="https://fuecadlwggbsrwkvwqkd.supabase.co/storage/v1/object/public/documents/public/Iskolarblock-IMRaD.pdf"
                      download="Iskolarblock-IMRaD.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                        padding: "12px 20px", borderRadius: 10, fontWeight: 700, fontSize: 14,
                        cursor: "pointer", background: "linear-gradient(135deg,#f97316,#ea580c)",
                        color: "white", border: "none", textDecoration: "none",
                        boxShadow: "0 4px 16px rgba(249,115,22,0.3)", transition: "transform 0.2s",
                      }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; }}
                    >
                      {b.i}{b.l}
                    </a>
                  ))}
                </div>
              </Card>
            </Fade>

            <Fade delay={0.15}>
              <Card style={{ maxHeight: 300, overflowY: "auto" }}>
                <p style={{ color: T.orange, fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", marginBottom: 16 }}>
                  ACADEMIC REFERENCES
                </p>
                {refs.map((r, i) => (
                  <div key={i} style={{
                    display: "flex", gap: 12, marginBottom: 12, paddingBottom: 12,
                    borderBottom: i < refs.length - 1 ? `1px solid ${T.borderSoft}` : "none",
                  }}>
                    <span style={{ color: T.orange, fontSize: 11, fontWeight: 800, flexShrink: 0, marginTop: 1 }}>
                      [{i + 1}]
                    </span>
                    <span style={{ color: T.inkMid, fontSize: 12, lineHeight: 1.65 }}>{r}</span>
                  </div>
                ))}
              </Card>
            </Fade>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{
        background: "linear-gradient(160deg,#1c1917 0%,#292524 60%,#3b2e26 100%)",
        padding: "56px 24px 36px", position: "relative", overflow: "hidden",
      }}>
        <MeshBg opacity={0.07} />
        <Blob top="-30%" left="-10%" size={400} opacity={0.12} color="#f97316" />
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}>
            <div style={{
              width: 44, height: 44, background: "linear-gradient(135deg,#f97316,#ea580c)",
              borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 16px rgba(249,115,22,0.4)",
            }}>
              <GraduationCap size={22} color="white" />
            </div>
            <span style={{ color: "white", fontWeight: 900, fontSize: 24, fontFamily: "'Georgia',serif" }}>
              IskolarBlock
            </span>
          </div>
          <p style={{ color: T.orange, fontWeight: 800, fontSize: 20, margin: "0 0 10px", letterSpacing: "0.04em" }}>
            Transparent. Secure. Immutable.
          </p>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, margin: "0 0 28px", lineHeight: 1.7 }}>
            Empowering Digital Governance Through Blockchain Technology.
          </p>
          <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
            {["Polygon Blockchain", "Tesseract OCR", "ISO/IEC 25010:2023", "Agile Scrum", "Next.js", "Supabase"].map((t) => (
              <span key={t} style={{
                background: "rgba(249,115,22,0.12)", color: "#fb923c",
                border: "1px solid rgba(249,115,22,0.25)", borderRadius: 99,
                padding: "5px 14px", fontSize: 11, fontWeight: 700,
                fontFamily: "'Courier New',monospace",
              }}>{t}</span>
            ))}
          </div>
          <div style={{ height: 1, background: "rgba(255,255,255,0.1)", marginBottom: 24 }} />
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, margin: 0 }}>
            © 2024 IskolarBlock Research Team · La Consolacion University Philippines · College of Information Technology and Engineering
          </p>
        </div>
      </footer>
    </section>
  );
};

/* ─── ROOT ───────────────────────────────────────────────────────────────── */
export function IMRaDPageClient() {
  return (
    <div style={{ fontFamily: "'Segoe UI',system-ui,sans-serif", background: T.bg, color: T.ink }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${T.bgAlt}; }
        ::-webkit-scrollbar-thumb { background: ${T.orange}; border-radius: 3px; }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50%       { transform: translateX(-50%) translateY(8px); }
        }
        @media (max-width: 960px) {
          .hero-grid   { grid-template-columns: 1fr !important; }
          .two-col     { grid-template-columns: 1fr !important; }
          .three-col   { grid-template-columns: 1fr 1fr !important; }
          .four-col    { grid-template-columns: 1fr 1fr !important; }
          .nav-desktop { display: none !important; }
          .nav-cta     { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
        @media (max-width: 600px) {
          .three-col { grid-template-columns: 1fr !important; }
          .four-col  { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <Navbar />
      <Hero />
      <Abstract />
      <Introduction />
      <Objectives />
      <Methodology />
      <Architecture />
      <Results />
      <Conclusion />
      <Recommendations />
      <References />
    </div>
  );
}