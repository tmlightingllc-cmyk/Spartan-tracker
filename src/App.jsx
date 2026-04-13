import { useState, useEffect, useCallback } from “react”;

const RACES = [
{ id: “sprint”, name: “Spartan Sprint”, date: “2026-05-17”, dist: “5K / 20 obstacles”, location: “Big Bear, CA”, color: “#e63946”, phase: 1 },
{ id: “super”, name: “Spartan Super”, date: “2026-07-12”, dist: “10K / 25 obstacles”, location: “Huntsville, UT”, color: “#f4a261”, phase: 2 },
{ id: “beast”, name: “Spartan Beast”, date: “2026-11-07”, dist: “21K / 30 obstacles”, location: “San Luis Obispo, CA”, color: “#2a9d8f”, phase: 3 },
];

const PHASES = [
{
id: 1, label: “Phase 1”, title: “Re-Entry & Base”, weeks: “Weeks 1-4”,
raceId: “sprint”, color: “#e63946”, daysPerWeek: 4, runMileage: “8-12 mi/wk”,
focus: “Rebuild movement patterns, joint prep, re-establish aerobic base”,
schedule: [
{ day: “Monday”, type: “Strength”, tag: “GYM”, tagColor: “#e63946”,
sets: [“Squat 3x8”, “Deadlift 3x6”, “Push-up 3x15”, “Row 3x10”, “Plank 3x45s”, “Dead bug 3x10”],
notes: “Light weight - focus on form, not load.” },
{ day: “Tuesday”, type: “Easy Run”, tag: “CARDIO”, tagColor: “#457b9d”,
sets: [“Easy 2-3 mile run at conversational pace”, “Walk breaks every mile if needed”, “Trail preferred if accessible”],
notes: “Target: finish feeling like you could do more.” },
{ day: “Wednesday”, type: “Rest / Mobility”, tag: “RECOVERY”, tagColor: “#6d6875”,
sets: [“20 min mobility: hip flexors, hamstrings, thoracic”, “Foam rolling - quads, IT band, calves”, “Optional: light walk”],
notes: “No structured training. Protect recovery.” },
{ day: “Thursday”, type: “Obstacle Prep + Grip”, tag: “OCR”, tagColor: “#2a9d8f”,
sets: [“Dead hang 3x max hold”, “Farmer carry 3x40 yds”, “Box step-ups 3x12 each leg”, “Burpees 5x5 perfect form”, “Sandbag carry 40-50 lbs x 100 yds”],
notes: “Sandbag: fill a duffel or bag with sand or dirt.” },
{ day: “Friday”, type: “Run”, tag: “CARDIO”, tagColor: “#457b9d”,
sets: [“3-4 mile easy run”, “2x30s surges at faster pace mid-run”, “5 min walk cooldown”],
notes: “Slightly longer than Tuesday. Keep it easy.” },
{ day: “Saturday”, type: “Long Hike / Ruck”, tag: “ENDURANCE”, tagColor: “#f4a261”,
sets: [“1-2 hr hike with elevation gain”, “Weighted vest or pack: 10-15 lbs optional”, “Focus: time on feet, not speed”],
notes: “Replaces long run to protect joints during re-entry.” },
{ day: “Sunday”, type: “Full Rest”, tag: “REST”, tagColor: “#555”,
sets: [“Complete rest”, “Hydrate, sleep, eat well”],
notes: “True rest - this is where adaptation happens.” },
],
},
{
id: 2, label: “Phase 2”, title: “Build & OCR Foundation”, weeks: “Weeks 5-12”,
raceId: “super”, color: “#f4a261”, daysPerWeek: 5, runMileage: “15-22 mi/wk”,
focus: “Build run volume, increase carrying capacity, obstacle skill development”,
schedule: [
{ day: “Monday”, type: “Strength - Lower”, tag: “GYM”, tagColor: “#e63946”,
sets: [“Back Squat 4x5”, “Romanian Deadlift 3x8”, “Bulgarian split squat 3x10 each”, “Sled push 3x20 yds”, “Ab wheel 3x8”, “Copenhagen plank 3x20s”],
notes: “Increase squat and DL weight 5 lbs each week if form holds.” },
{ day: “Tuesday”, type: “Interval Run”, tag: “CARDIO”, tagColor: “#457b9d”,
sets: [“Warm-up: 1 mile easy”, “6x400m at 5K effort, 90s rest”, “30 burpees after every other interval”, “Cool-down: 1 mile easy”],
notes: “Total approx 5-6 miles. OCR simulation via burpees mid-run.” },
{ day: “Wednesday”, type: “Strength - Upper + Grip”, tag: “GYM”, tagColor: “#e63946”,
sets: [“Pull-ups 5x max reps, band if needed”, “DB press 4x8”, “Bent row 4x8”, “Rope climb or towel pull-ups”, “Dead hang 3x max”, “Weighted carry circuit”],
notes: “Goal: 10+ unassisted pull-ups by week 12.” },
{ day: “Thursday”, type: “OCR Simulation”, tag: “OCR”, tagColor: “#2a9d8f”,
sets: [“3-4 mile run with obstacles every half mile”, “Each obstacle stop: 10 burpees + carry or hang”, “Bucket carry quarter mile”, “Spear throw: 20 reps”, “Finish: 50 burpees for time”],
notes: “Track your 50-burpee time each week - should improve.” },
{ day: “Friday”, type: “Easy Run + Mobility”, tag: “ACTIVE REC”, tagColor: “#6d6875”,
sets: [“4-5 mile easy zone 2 run”, “Post-run: 20 min full-body mobility”, “Hip openers, hamstrings, thoracic rotation”],
notes: “Keep HR under 145. This is recovery, not training.” },
{ day: “Saturday”, type: “Long Trail Run”, tag: “ENDURANCE”, tagColor: “#f4a261”,
sets: [“Wk 5-8: 6-8 miles, 500-800 ft elevation”, “Wk 9-12: 8-10 miles, 800-1200 ft elevation”, “Wear race pack - practice eating and drinking”, “Ruck last mile: 20 lb pack”],
notes: “Trail surface preferred. Hike steep sections to save legs.” },
{ day: “Sunday”, type: “Full Rest”, tag: “REST”, tagColor: “#555”,
sets: [“Complete rest”, “Foam roll legs + calves”, “Meal prep for the week”],
notes: “” },
],
},
{
id: 3, label: “Phase 3”, title: “Beast Mode”, weeks: “Weeks 13-30”,
raceId: “beast”, color: “#2a9d8f”, daysPerWeek: 5, runMileage: “25-35 mi/wk”,
focus: “High mileage, elevation, heavy carries, mental durability, race-specific conditioning”,
schedule: [
{ day: “Monday”, type: “Strength - Max Effort Lower”, tag: “GYM”, tagColor: “#e63946”,
sets: [“Deadlift: heavy 3-rep set”, “Hex bar carry 4x50 yds heavy”, “Box jump 4x5 explosive”, “Reverse lunge KB 4x10 each”, “Nordic hamstring curl 3x6”, “Weighted plank 3x45s”],
notes: “Track your deadlift PR each cycle. Aim to hit 315+ by race.” },
{ day: “Tuesday”, type: “Tempo Run”, tag: “CARDIO”, tagColor: “#457b9d”,
sets: [“2 mile easy warm-up”, “4-5 miles at tempo comfortably hard”, “3x1 min hill sprints mid-run”, “1 mile cool-down”],
notes: “Total 8-9 miles. Tempo means you can speak in short phrases.” },
{ day: “Wednesday”, type: “Strength - Upper Pull”, tag: “GYM”, tagColor: “#e63946”,
sets: [“Weighted pull-ups 5x5”, “Muscle-up progressions or ring rows”, “Rope climb: 5 ascents”, “Single-arm DB row 4x10”, “Turkish get-up 3x3 each”, “Overhead carry 3x40 yds”],
notes: “Rope climb: use legs for efficiency - conserve grip for obstacles.” },
{ day: “Thursday”, type: “OCR Brick Session”, tag: “OCR”, tagColor: “#2a9d8f”,
sets: [“5 mile trail run with full OCR circuit every mile”, “Rotate: burpees, carries, crawls, hangs, climbs”, “40-lb sandbag required”, “Finish: 100 burpees for time, track weekly”],
notes: “100 burpee time is your Beast readiness benchmark.” },
{ day: “Friday”, type: “Zone 2 + Obstacle Skill”, tag: “ACTIVE REC”, tagColor: “#6d6875”,
sets: [“5-6 miles easy HR under 140”, “Post-run: 30 min obstacle skill work”, “Focus: spear throw, atlas carry, rig”, “Grip endurance: 4x max hang”],
notes: “Spear throw: 20 reps every Friday. Consistency equals success rate.” },
{ day: “Saturday”, type: “Long Run / Ruck”, tag: “ENDURANCE”, tagColor: “#f4a261”,
sets: [“Wk 13-18: 10-14 mi, 1000-1500 ft gain”, “Wk 19-26: 14-18 mi, 1500-2500 ft gain”, “Wk 27-29: 18-20 mi, 2000+ ft gain”, “Carry 20-30 lb pack last 20-30% of run”, “Eat every 45 min - practice race nutrition”],
notes: “SLO is rolling coastal hills. Train on similar terrain.” },
{ day: “Sunday”, type: “Full Rest”, tag: “REST”, tagColor: “#555”,
sets: [“True rest”, “Walk or swim OK”, “Prioritize 8+ hrs sleep”],
notes: “” },
],
},
];

const STORAGE_KEY = “spartan-tracker-v1”;

function loadFromStorage() {
try {
const raw = localStorage.getItem(STORAGE_KEY);
return raw ? JSON.parse(raw) : { logs: {}, customSets: {} };
} catch (e) {
return { logs: {}, customSets: {} };
}
}

function saveToStorage(data) {
try {
localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
} catch (e) {}
}

function daysUntil(dateStr) {
const d = new Date(dateStr + “T00:00:00”);
const now = new Date();
now.setHours(0, 0, 0, 0);
return Math.ceil((d - now) / 86400000);
}

function formatDate(dateStr) {
return new Date(dateStr + “T00:00:00”).toLocaleDateString(“en-US”, { month: “short”, day: “numeric”, year: “numeric” });
}

function pct(val, max) {
return Math.min(100, Math.round((val / max) * 100));
}

const Icon = ({ name, size = 16, color = “currentColor” }) => {
const icons = {
check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
edit: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>,
plus: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
trash: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>,
save: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" /></svg>,
back: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><polyline points="15 18 9 12 15 6" /></svg>,
x: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
};
return icons[name] || null;
};

export default function SpartanTracker() {
const [view, setView] = useState(“dashboard”);
const [selectedPhase, setSelectedPhase] = useState(0);
const [selectedDay, setSelectedDay] = useState(null);
const [logs, setLogs] = useState({});
const [customSets, setCustomSets] = useState({});
const [editingSet, setEditingSet] = useState(null);
const [newSetText, setNewSetText] = useState(””);
const [logForm, setLogForm] = useState({ rpe: 7, notes: “”, date: new Date().toISOString().slice(0, 10) });
const [toast, setToast] = useState(null);

useEffect(() => {
const data = loadFromStorage();
setLogs(data.logs || {});
setCustomSets(data.customSets || {});
}, []);

const persistSave = useCallback((newLogs, newSets) => {
saveToStorage({ logs: newLogs, customSets: newSets });
}, []);

const showToast = (msg, color = “#2a9d8f”) => {
setToast({ msg, color });
setTimeout(() => setToast(null), 2500);
};

const phase = PHASES[selectedPhase];
const race = RACES.find((r) => r.id === phase.raceId);

function getSets(phaseId, day) {
const key = phaseId + “-” + day;
if (customSets[key]) return customSets[key];
return PHASES.find((p) => p.id === phaseId)?.schedule.find((s) => s.day === day)?.sets || [];
}

function getCompletedCount(phaseId) {
return Object.keys(logs).filter((k) => k.startsWith(phaseId + “-”) && logs[k]?.completed).length;
}

function getAllLogs() {
return Object.entries(logs)
.filter(([, v]) => v.completed)
.map(([k, v]) => ({ key: k, …v }))
.sort((a, b) => (b.date || “”).localeCompare(a.date || “”));
}

function logWorkout() {
const dayInfo = phase.schedule[selectedDay];
const key = phase.id + “-” + dayInfo.day + “-” + logForm.date;
const newLogs = { …logs, [key]: { completed: true, rpe: logForm.rpe, notes: logForm.notes, date: logForm.date, type: dayInfo.type, phase: phase.id, tag: dayInfo.tag } };
setLogs(newLogs);
persistSave(newLogs, customSets);
showToast(“Workout logged!”);
setView(“phase”);
}

function updateSet(phaseId, day, idx, val) {
const key = phaseId + “-” + day;
const current = getSets(phaseId, day);
const updated = current.map((s, i) => (i === idx ? val : s));
const newSets = { …customSets, [key]: updated };
setCustomSets(newSets);
persistSave(logs, newSets);
}

function addSet(phaseId, day) {
if (!newSetText.trim()) return;
const key = phaseId + “-” + day;
const current = getSets(phaseId, day);
const newSets = { …customSets, [key]: […current, newSetText.trim()] };
setCustomSets(newSets);
persistSave(logs, newSets);
setNewSetText(””);
showToast(“Exercise added!”);
}

function removeSet(phaseId, day, idx) {
const key = phaseId + “-” + day;
const current = getSets(phaseId, day);
const newSets = { …customSets, [key]: current.filter((_, i) => i !== idx) };
setCustomSets(newSets);
persistSave(logs, newSets);
}

function resetSets(phaseId, day) {
const key = phaseId + “-” + day;
const rest = { …customSets };
delete rest[key];
setCustomSets(rest);
persistSave(logs, rest);
showToast(“Reset to default!”);
}

const S = {
app: { fontFamily: “‘Barlow Condensed’, Impact, sans-serif”, background: “#080808”, minHeight: “100vh”, color: “#eeebe4”, maxWidth: 480, margin: “0 auto” },
header: { background: “#0e0e0e”, borderBottom: “1px solid #1a1a1a”, padding: “14px 16px”, display: “flex”, alignItems: “center”, gap: 10, position: “sticky”, top: 0, zIndex: 50 },
body: { padding: “16px”, paddingBottom: 80 },
card: { background: “#111”, border: “1px solid #1e1e1e”, borderRadius: 6, padding: “14px 16px”, marginBottom: 10 },
btn: (bg, color = “#fff”) => ({ background: bg, color, border: “none”, borderRadius: 4, padding: “10px 18px”, fontFamily: “‘Barlow Condensed’, sans-serif”, fontWeight: 700, fontSize: 14, letterSpacing: 1, cursor: “pointer”, display: “flex”, alignItems: “center”, gap: 6 }),
tag: (color) => ({ fontSize: 9, fontWeight: 700, letterSpacing: 2, padding: “2px 7px”, background: color + “25”, color, borderRadius: 2, fontFamily: “sans-serif”, display: “inline-block” }),
input: { background: “#1a1a1a”, border: “1px solid #2a2a2a”, borderRadius: 4, color: “#eee”, fontFamily: “sans-serif”, fontSize: 14, padding: “8px 12px”, width: “100%” },
rpeBtn: (v, active, color) => ({ width: 36, height: 36, borderRadius: 4, border: active ? “2px solid “ + color : “1px solid #222”, background: active ? color + “30” : “#111”, color: active ? color : “#666”, fontWeight: 800, fontSize: 13, cursor: “pointer”, fontFamily: “sans-serif” }),
};

const phaseColor = phase.color;

if (view === “dashboard”) {
const allLogged = getAllLogs();
return (
<div style={S.app}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800;900&family=Barlow:wght@300;400;500&display=swap'); * { box-sizing: border-box; margin: 0; padding: 0; } ::-webkit-scrollbar{width:3px} ::-webkit-scrollbar-thumb{background:#e63946} button:hover{filter:brightness(1.1)} input:focus,textarea:focus{outline:none}`}</style>
<div style={{ background: “linear-gradient(160deg,#0f0f0f 0%,#1a0808 100%)”, padding: “28px 16px 20px”, borderBottom: “2px solid #e63946” }}>
<div style={{ fontSize: 10, color: “#e63946”, letterSpacing: 4, fontWeight: 700, marginBottom: 4 }}>SPARTAN TRIFECTA</div>
<h1 style={{ fontSize: 42, fontWeight: 900, letterSpacing: -1, lineHeight: 1, textTransform: “uppercase” }}>TRAINING<br /><span style={{ color: “#e63946” }}>TRACKER</span></h1>
<div style={{ fontFamily: “sans-serif”, fontSize: 12, color: “#666”, marginTop: 8 }}>240 LB ATHLETE  |  30 WEEKS  |  {allLogged.length} SESSIONS LOGGED</div>
</div>
<div style={S.body}>
<div style={{ fontSize: 10, color: “#666”, letterSpacing: 3, marginBottom: 10, fontWeight: 700 }}>RACE COUNTDOWN</div>
{RACES.map((r) => {
const d = daysUntil(r.date);
const done = d <= 0;
return (
<div key={r.id} style={{ …S.card, borderColor: done ? “#1a1a1a” : r.color + “33”, marginBottom: 8 }}>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “flex-start” }}>
<div>
<div style={{ fontSize: 11, color: r.color, letterSpacing: 2, fontWeight: 700 }}>PHASE {r.phase}</div>
<div style={{ fontSize: 20, fontWeight: 900, textTransform: “uppercase”, color: done ? “#444” : “#eee” }}>{r.name}</div>
<div style={{ fontFamily: “sans-serif”, fontSize: 12, color: “#666”, marginTop: 2 }}>{r.dist} - {r.location}</div>
<div style={{ fontFamily: “sans-serif”, fontSize: 12, color: “#888”, marginTop: 2 }}>{formatDate(r.date)}</div>
</div>
<div style={{ textAlign: “right” }}>
{done ? <div style={{ fontSize: 13, color: “#555” }}>COMPLETE</div> : <>
<div style={{ fontSize: 36, fontWeight: 900, color: r.color, lineHeight: 1 }}>{d}</div>
<div style={{ fontFamily: “sans-serif”, fontSize: 10, color: “#666” }}>DAYS OUT</div>
</>}
</div>
</div>
</div>
);
})}

```
      <div style={{ fontSize: 10, color: "#666", letterSpacing: 3, margin: "20px 0 10px", fontWeight: 700 }}>TRAINING PHASES</div>
      {PHASES.map((p, i) => {
        const done = getCompletedCount(p.id);
        const totalSessions = p.schedule.filter((s) => s.tag !== "REST" && s.tag !== "RECOVERY").length * (i === 0 ? 4 : i === 1 ? 8 : 18);
        return (
          <div key={p.id} onClick={() => { setSelectedPhase(i); setView("phase"); }} style={{ ...S.card, borderColor: p.color + "44", cursor: "pointer", marginBottom: 8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 4, height: 50, background: p.color, borderRadius: 2 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: p.color, letterSpacing: 3, fontWeight: 700 }}>{p.label} - {p.weeks}</div>
                <div style={{ fontSize: 20, fontWeight: 900, textTransform: "uppercase" }}>{p.title}</div>
                <div style={{ height: 3, background: "#1a1a1a", borderRadius: 2, marginTop: 6 }}>
                  <div style={{ height: 3, background: p.color, width: pct(done, totalSessions) + "%", borderRadius: 2 }} />
                </div>
                <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "#555", marginTop: 3 }}>{done} sessions logged</div>
              </div>
              <div style={{ color: "#444" }}>›</div>
            </div>
          </div>
        );
      })}

      {allLogged.length > 0 && <>
        <div style={{ fontSize: 10, color: "#666", letterSpacing: 3, margin: "20px 0 10px", fontWeight: 700 }}>RECENT SESSIONS</div>
        {allLogged.slice(0, 5).map((l, i) => (
          <div key={i} style={{ ...S.card, marginBottom: 6 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={S.tag(PHASES.find((p) => p.id === l.phase)?.color || "#888")}>{l.tag}</span>
                <div style={{ fontSize: 16, fontWeight: 800, marginTop: 4, textTransform: "uppercase" }}>{l.type}</div>
                <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "#666" }}>{l.date}</div>
              </div>
              <div style={{ fontSize: 24, fontWeight: 900, color: "#e63946" }}>RPE {l.rpe}</div>
            </div>
            {l.notes ? <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#666", marginTop: 6, borderTop: "1px solid #1a1a1a", paddingTop: 6 }}>{l.notes}</div> : null}
          </div>
        ))}
      </>}
    </div>
    <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, background: "#0e0e0e", borderTop: "1px solid #1a1a1a", display: "flex", zIndex: 50 }}>
      {[["dashboard", "Home"], ["stats", "Stats"]].map(([v, label]) => (
        <button key={v} onClick={() => setView(v)} style={{ flex: 1, padding: "12px 0", background: "none", border: "none", cursor: "pointer", color: view === v ? "#e63946" : "#444", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>
          {label}
        </button>
      ))}
    </div>
    {toast && <div style={{ position: "fixed", bottom: 80, left: "50%", transform: "translateX(-50%)", background: toast.color, color: "#fff", padding: "10px 20px", borderRadius: 4, fontWeight: 700, fontSize: 14, zIndex: 100, whiteSpace: "nowrap" }}>{toast.msg}</div>}
  </div>
);
```

}

if (view === “stats”) {
const allLogged = getAllLogs();
const byPhase = [1, 2, 3].map((pid) => ({ pid, count: allLogged.filter((l) => l.phase === pid).length }));
const avgRPE = allLogged.length ? (allLogged.reduce((a, b) => a + (b.rpe || 0), 0) / allLogged.length).toFixed(1) : “–”;
return (
<div style={S.app}>
<div style={S.header}>
<button onClick={() => setView(“dashboard”)} style={{ background: “none”, border: “none”, cursor: “pointer” }}><Icon name="back" size={22} color="#e63946" /></button>
<span style={{ fontSize: 22, fontWeight: 900, textTransform: “uppercase” }}>Statistics</span>
</div>
<div style={S.body}>
<div style={{ display: “grid”, gridTemplateColumns: “1fr 1fr”, gap: 10, marginBottom: 16 }}>
{[[“Total Sessions”, allLogged.length, “#e63946”], [“Avg RPE”, avgRPE, “#f4a261”]].map(([label, val, color]) => (
<div key={label} style={{ …S.card, textAlign: “center” }}>
<div style={{ fontSize: 32, fontWeight: 900, color }}>{val}</div>
<div style={{ fontFamily: “sans-serif”, fontSize: 11, color: “#666”, marginTop: 2 }}>{label}</div>
</div>
))}
</div>
<div style={{ fontSize: 10, color: “#666”, letterSpacing: 3, marginBottom: 10, fontWeight: 700 }}>BY PHASE</div>
{byPhase.map(({ pid, count }) => {
const p = PHASES.find((x) => x.id === pid);
return (
<div key={pid} style={{ …S.card, marginBottom: 8 }}>
<div style={{ display: “flex”, justifyContent: “space-between”, alignItems: “center”, marginBottom: 6 }}>
<span style={{ fontWeight: 800, textTransform: “uppercase”, fontSize: 15 }}>{p.title}</span>
<span style={{ fontWeight: 900, color: p.color, fontSize: 18 }}>{count}</span>
</div>
<div style={{ height: 4, background: “#1a1a1a”, borderRadius: 2 }}>
<div style={{ height: 4, background: p.color, width: (count > 0 ? Math.min(100, count * 5) : 0) + “%”, borderRadius: 2 }} />
</div>
</div>
);
})}
<div style={{ fontSize: 10, color: “#666”, letterSpacing: 3, margin: “20px 0 10px”, fontWeight: 700 }}>HISTORY</div>
{allLogged.length === 0 && <div style={{ fontFamily: “sans-serif”, color: “#444”, fontSize: 14, textAlign: “center”, padding: 30 }}>No sessions logged yet. Get after it!</div>}
{allLogged.slice(0, 30).map((l, i) => (
<div key={i} style={{ …S.card, marginBottom: 6, padding: “10px 14px” }}>
<div style={{ display: “flex”, justifyContent: “space-between” }}>
<div>
<span style={S.tag(PHASES.find((p) => p.id === l.phase)?.color || “#888”)}>{l.tag}</span>
<div style={{ fontSize: 14, fontWeight: 800, marginTop: 3, textTransform: “uppercase” }}>{l.type}</div>
<div style={{ fontFamily: “sans-serif”, fontSize: 11, color: “#555” }}>{l.date}</div>
</div>
<div style={{ fontSize: 22, fontWeight: 900, color: l.rpe >= 8 ? “#e63946” : l.rpe >= 6 ? “#f4a261” : “#2a9d8f” }}>RPE {l.rpe}</div>
</div>
{l.notes ? <div style={{ fontFamily: “sans-serif”, fontSize: 12, color: “#666”, marginTop: 6, borderTop: “1px solid #1a1a1a”, paddingTop: 6 }}>{l.notes}</div> : null}
</div>
))}
</div>
<div style={{ position: “fixed”, bottom: 0, left: “50%”, transform: “translateX(-50%)”, width: “100%”, maxWidth: 480, background: “#0e0e0e”, borderTop: “1px solid #1a1a1a”, display: “flex”, zIndex: 50 }}>
{[[“dashboard”, “Home”], [“stats”, “Stats”]].map(([v, label]) => (
<button key={v} onClick={() => setView(v)} style={{ flex: 1, padding: “12px 0”, background: “none”, border: “none”, cursor: “pointer”, color: view === v ? “#e63946” : “#444”, fontFamily: “‘Barlow Condensed’, sans-serif”, fontWeight: 700, fontSize: 13, letterSpacing: 2 }}>
{label}
</button>
))}
</div>
</div>
);
}

if (view === “phase”) {
return (
<div style={S.app}>
<div style={{ …S.header, borderBottom: “1px solid “ + phaseColor + “44” }}>
<button onClick={() => setView(“dashboard”)} style={{ background: “none”, border: “none”, cursor: “pointer” }}><Icon name="back" size={22} color={phaseColor} /></button>
<div style={{ flex: 1 }}>
<div style={{ fontSize: 10, color: phaseColor, letterSpacing: 3, fontWeight: 700 }}>{phase.label}</div>
<div style={{ fontSize: 20, fontWeight: 900, textTransform: “uppercase” }}>{phase.title}</div>
</div>
<div style={{ textAlign: “right” }}>
<div style={{ fontSize: 10, color: “#555”, letterSpacing: 2 }}>RACE IN</div>
<div style={{ fontSize: 20, fontWeight: 900, color: phaseColor }}>{Math.max(0, daysUntil(race.date))}d</div>
</div>
</div>
<div style={S.body}>
<div style={{ …S.card, borderColor: phaseColor + “55”, background: phaseColor + “0d”, marginBottom: 16 }}>
<div style={{ fontSize: 10, color: phaseColor, letterSpacing: 3, fontWeight: 700 }}>TARGET</div>
<div style={{ fontSize: 22, fontWeight: 900, textTransform: “uppercase” }}>{race.name}</div>
<div style={{ fontFamily: “sans-serif”, fontSize: 12, color: “#888” }}>{race.dist} - {race.location} - {formatDate(race.date)}</div>
<div style={{ fontFamily: “sans-serif”, fontSize: 12, color: “#666”, marginTop: 6 }}>{phase.focus}</div>
</div>
<div style={{ display: “flex”, gap: 10, marginBottom: 16 }}>
<div style={{ …S.card, flex: 1, textAlign: “center”, margin: 0, padding: “10px 12px” }}>
<div style={{ fontSize: 22, fontWeight: 900, color: phaseColor }}>{phase.daysPerWeek}</div>
<div style={{ fontFamily: “sans-serif”, fontSize: 10, color: “#555” }}>DAYS/WK</div>
</div>
<div style={{ …S.card, flex: 1.5, textAlign: “center”, margin: 0, padding: “10px 12px” }}>
<div style={{ fontSize: 18, fontWeight: 900, color: phaseColor }}>{phase.runMileage}</div>
<div style={{ fontFamily: “sans-serif”, fontSize: 10, color: “#555” }}>RUN MILEAGE</div>
</div>
<div style={{ …S.card, flex: 1, textAlign: “center”, margin: 0, padding: “10px 12px” }}>
<div style={{ fontSize: 22, fontWeight: 900, color: phaseColor }}>{getCompletedCount(phase.id)}</div>
<div style={{ fontFamily: “sans-serif”, fontSize: 10, color: “#555” }}>LOGGED</div>
</div>
</div>
<div style={{ fontSize: 10, color: “#555”, letterSpacing: 3, marginBottom: 10, fontWeight: 700 }}>WEEKLY SCHEDULE</div>
{phase.schedule.map((item, i) => {
const hasLog = Object.keys(logs).some((k) => k.startsWith(phase.id + “-” + item.day + “-”) && logs[k]?.completed);
return (
<div key={i} onClick={() => { setSelectedDay(i); setLogForm({ rpe: 7, notes: “”, date: new Date().toISOString().slice(0, 10) }); setView(“workout”); }}
style={{ …S.card, cursor: “pointer”, marginBottom: 8, borderColor: hasLog ? phaseColor + “44” : “#1e1e1e”, display: “flex”, alignItems: “center”, gap: 12 }}>
<div style={{ width: 3, height: 44, background: item.tagColor, borderRadius: 2 }} />
<div style={{ flex: 1 }}>
<div style={{ display: “flex”, alignItems: “center”, gap: 8 }}>
<span style={{ fontWeight: 900, fontSize: 16, textTransform: “uppercase” }}>{item.day}</span>
<span style={S.tag(item.tagColor)}>{item.tag}</span>
{hasLog && <span style={{ fontSize: 9, color: phaseColor, fontFamily: “sans-serif”, fontWeight: 600 }}>LOGGED</span>}
</div>
<div style={{ fontFamily: “sans-serif”, fontSize: 13, color: “#777”, marginTop: 1 }}>{item.type}</div>
</div>
<div style={{ color: “#333” }}>›</div>
</div>
);
})}
<div style={{ fontSize: 10, color: “#555”, letterSpacing: 3, margin: “20px 0 10px”, fontWeight: 700 }}>SWITCH PHASE</div>
<div style={{ display: “flex”, gap: 8 }}>
{PHASES.map((p, i) => (
<button key={i} onClick={() => setSelectedPhase(i)} style={{ …S.btn(i === selectedPhase ? p.color : “#1a1a1a”, i === selectedPhase ? “#fff” : “#555”), flex: 1, justifyContent: “center”, fontSize: 12, padding: “10px 6px” }}>
{p.label}
</button>
))}
</div>
</div>
{toast && <div style={{ position: “fixed”, bottom: 20, left: “50%”, transform: “translateX(-50%)”, background: toast.color, color: “#fff”, padding: “10px 20px”, borderRadius: 4, fontWeight: 700, fontSize: 14, zIndex: 100 }}>{toast.msg}</div>}
</div>
);
}

if (view === “workout” && selectedDay !== null) {
const dayInfo = phase.schedule[selectedDay];
const sets = getSets(phase.id, dayInfo.day);
const isCustomized = !!customSets[phase.id + “-” + dayInfo.day];
const isRest = dayInfo.tag === “REST” || dayInfo.tag === “RECOVERY”;
const recentLogs = Object.entries(logs).filter(([k]) => k.startsWith(phase.id + “-” + dayInfo.day + “-”)).sort((a, b) => b[0].localeCompare(a[0]));

```
return (
  <div style={S.app}>
    <div style={{ ...S.header, borderBottom: "1px solid " + dayInfo.tagColor + "44" }}>
      <button onClick={() => setView("phase")} style={{ background: "none", border: "none", cursor: "pointer" }}><Icon name="back" size={22} color={dayInfo.tagColor} /></button>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 10, color: dayInfo.tagColor, letterSpacing: 3, fontWeight: 700 }}>{dayInfo.tag}</div>
        <div style={{ fontSize: 20, fontWeight: 900, textTransform: "uppercase" }}>{dayInfo.day}</div>
      </div>
      {isCustomized && <button onClick={() => resetSets(phase.id, dayInfo.day)} style={{ background: "none", border: "none", cursor: "pointer", color: "#555", fontFamily: "sans-serif", fontSize: 11 }}>RESET</button>}
    </div>
    <div style={S.body}>
      <div style={{ ...S.card, borderColor: dayInfo.tagColor + "33", marginBottom: 16 }}>
        <div style={{ fontSize: 20, fontWeight: 900, textTransform: "uppercase", marginBottom: 4 }}>{dayInfo.type}</div>
        {dayInfo.notes ? <div style={{ fontFamily: "sans-serif", fontSize: 13, color: "#888", lineHeight: 1.5 }}>{dayInfo.notes}</div> : null}
      </div>
      <div style={{ fontSize: 10, color: "#555", letterSpacing: 3, marginBottom: 10, fontWeight: 700 }}>
        EXERCISES {isCustomized ? <span style={{ color: dayInfo.tagColor }}>- MODIFIED</span> : null}
      </div>
      {sets.map((s, i) => (
        <div key={i} style={{ ...S.card, marginBottom: 6, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 2, height: 28, background: dayInfo.tagColor, borderRadius: 2, flexShrink: 0 }} />
          {editingSet === String(i) ? (
            <div style={{ flex: 1, display: "flex", gap: 6 }}>
              <input defaultValue={s} id={"set-edit-" + i} style={{ ...S.input, flex: 1, fontSize: 13, padding: "6px 10px" }} />
              <button onClick={() => { const el = document.getElementById("set-edit-" + i); updateSet(phase.id, dayInfo.day, i, el.value); setEditingSet(null); }} style={{ ...S.btn(dayInfo.tagColor), padding: "6px 10px" }}><Icon name="save" size={14} /></button>
              <button onClick={() => setEditingSet(null)} style={{ ...S.btn("#222"), padding: "6px 10px" }}><Icon name="x" size={14} /></button>
            </div>
          ) : (
            <>
              <span style={{ fontFamily: "sans-serif", flex: 1, fontSize: 14, color: "#ccc" }}>{s}</span>
              <button onClick={() => setEditingSet(String(i))} style={{ background: "none", border: "none", cursor: "pointer", color: "#444" }}><Icon name="edit" size={14} /></button>
              <button onClick={() => removeSet(phase.id, dayInfo.day, i)} style={{ background: "none", border: "none", cursor: "pointer", color: "#333" }}><Icon name="trash" size={14} /></button>
            </>
          )}
        </div>
      ))}
      <div style={{ display: "flex", gap: 8, marginTop: 10, marginBottom: 20 }}>
        <input value={newSetText} onChange={(e) => setNewSetText(e.target.value)} onKeyDown={(e) => e.key === "Enter" && addSet(phase.id, dayInfo.day)} placeholder="Add exercise e.g. Pull-ups 4x10" style={{ ...S.input, flex: 1 }} />
        <button onClick={() => addSet(phase.id, dayInfo.day)} style={{ ...S.btn(dayInfo.tagColor), padding: "8px 14px", flexShrink: 0 }}><Icon name="plus" size={16} /></button>
      </div>
      {!isRest && <>
        <div style={{ fontSize: 10, color: "#555", letterSpacing: 3, marginBottom: 10, fontWeight: 700 }}>LOG THIS WORKOUT</div>
        <div style={S.card}>
          <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#666", marginBottom: 8 }}>Date</div>
          <input type="date" value={logForm.date} onChange={(e) => setLogForm((f) => ({ ...f, date: e.target.value }))} style={{ ...S.input, marginBottom: 14 }} />
          <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#666", marginBottom: 8 }}>RPE (Rate of Perceived Exertion)</div>
          <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((v) => (
              <button key={v} onClick={() => setLogForm((f) => ({ ...f, rpe: v }))} style={S.rpeBtn(v, logForm.rpe === v, dayInfo.tagColor)}>{v}</button>
            ))}
          </div>
          <div style={{ fontFamily: "sans-serif", fontSize: 11, color: "#444", marginBottom: 12 }}>
            {logForm.rpe <= 3 ? "Easy - barely felt it" : logForm.rpe <= 5 ? "Moderate - comfortable" : logForm.rpe <= 7 ? "Hard - working" : logForm.rpe <= 9 ? "Very hard - pushing limits" : "Max effort - all out"}
          </div>
          <div style={{ fontFamily: "sans-serif", fontSize: 12, color: "#666", marginBottom: 8 }}>Notes</div>
          <textarea value={logForm.notes} onChange={(e) => setLogForm((f) => ({ ...f, notes: e.target.value }))} placeholder="e.g. Hit 185 squat, ran 3.2 miles in 28 min..." style={{ ...S.input, minHeight: 80, resize: "vertical", lineHeight: 1.5 }} />
          <button onClick={logWorkout} style={{ ...S.btn(dayInfo.tagColor), width: "100%", justifyContent: "center", marginTop: 14, padding: "12px 0", fontSize: 15, letterSpacing: 2 }}>
            <Icon name="check" size={18} /> LOG WORKOUT
          </button>
        </div>
      </>}
      {recentLogs.length > 0 && <>
        <div style={{ fontSize: 10, color: "#555", letterSpacing: 3, margin: "20px 0 10px", fontWeight: 700 }}>PAST LOGS</div>
        {recentLogs.slice(0, 5).map(([key, log]) => (
          <div key={key} style={{ ...S.card, marginBottom: 6, padding: "10px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "sans-serif", fontSize: 12, color: "#666" }}>{log.date}</span>
              <span style={{ fontWeight: 900, color: log.rpe >= 8 ? "#e63946" : log.rpe >= 6 ? "#f4a261" : "#2a9d8f" }}>RPE {log.rpe}</span>
            </div>
            {log.notes ? <div style={{ fontFamily: "sans-serif", fontSize: 13, color: "#888", marginTop: 6 }}>{log.notes}</div> : null}
          </div>
        ))}
      </>}
    </div>
    {toast && <div style={{ position: "fixed", bottom: 20, left: "50%", transform: "translateX(-50%)", background: toast.color, color: "#fff", padding: "10px 20px", borderRadius: 4, fontWeight: 700, fontSize: 14, zIndex: 100 }}>{toast.msg}</div>}
  </div>
);
```

}

return null;
}
