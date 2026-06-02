import React, { useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, RadarChart, Radar,
  PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from "recharts";
import {
  LayoutGrid, Users, Compass, CalendarDays, Building2, Wallet,
  ArrowUpRight, ArrowDownRight, Lock, Share2, Sparkles, MapPin, Repeat,
} from "lucide-react";

/* ============================== THEME ============================== */
const C = {
  bg: "#0f0d0a",
  panel: "#17140f",
  panel2: "#1c1813",
  line: "rgba(232,168,56,0.12)",
  hair: "rgba(255,255,255,0.06)",
  txt: "#f4efe6",
  mut: "#9b9384",
  faint: "#5f594d",
  amber: "#e8a838",
  amberHi: "#f5c25e",
  teal: "#5fb3a3",
  rose: "#d98b7a",
  sage: "#a3b08a",
  blue: "#7a93c4",
};
const SERIES = [C.amber, C.blue, C.teal, C.rose, C.sage];

/* ============================== MOCK DATA ============================== */
const engagement = [
  { w: "Wk 1", reach: 4200, saves: 310, attend: 188 },
  { w: "Wk 2", reach: 5100, saves: 402, attend: 240 },
  { w: "Wk 3", reach: 4800, saves: 388, attend: 235 },
  { w: "Wk 4", reach: 6300, saves: 540, attend: 322 },
  { w: "Wk 5", reach: 7100, saves: 631, attend: 401 },
  { w: "Wk 6", reach: 6800, saves: 598, attend: 380 },
  { w: "Wk 7", reach: 8200, saves: 742, attend: 470 },
  { w: "Wk 8", reach: 9100, saves: 869, attend: 558 },
  { w: "Wk 9", reach: 8700, saves: 812, attend: 521 },
  { w: "Wk 10", reach: 10400, saves: 1003, attend: 651 },
  { w: "Wk 11", reach: 11200, saves: 1140, attend: 742 },
  { w: "Wk 12", reach: 12600, saves: 1320, attend: 868 },
];
const interests = [
  { name: "Live Music", v: 34, base: 22 },
  { name: "Art & Design", v: 21, base: 14 },
  { name: "Food & Drink", v: 18, base: 19 },
  { name: "Nightlife", v: 12, base: 16 },
  { name: "Wellness", v: 9, base: 11 },
  { name: "Tech & Talks", v: 6, base: 18 },
];
const districts = [
  { name: "Bangsar", v: 24 },
  { name: "Mont Kiara", v: 19 },
  { name: "KLCC / Bukit Bintang", v: 17 },
  { name: "Petaling Jaya", v: 15 },
  { name: "Damansara", v: 13 },
  { name: "Cheras", v: 7 },
  { name: "Other", v: 5 },
];
const ageBands = [
  { name: "18–24", v: 28 },
  { name: "25–34", v: 41 },
  { name: "35–44", v: 21 },
  { name: "45+", v: 10 },
];
const discovery = [
  { name: "Swipe deck", v: 44 },
  { name: "Social graph", v: 27 },
  { name: "Search", v: 18 },
  { name: "Direct / shared", v: 11 },
];
const newReturning = [
  { name: "New", v: 63 },
  { name: "Returning", v: 37 },
];
const spending = [
  { name: "Premium · RM150+", v: 22 },
  { name: "Mid · RM50–150", v: 48 },
  { name: "Budget · under RM50", v: 30 },
];
const occupation = [
  { name: "Working professional", v: 58 },
  { name: "Student", v: 31 },
  { name: "Other", v: 11 },
];
const residency = [
  { name: "Local", v: 71 },
  { name: "International", v: 29 },
];
const nationality = [
  { name: "Malaysia", v: 71 },
  { name: "Singapore", v: 9 },
  { name: "Indonesia", v: 6 },
  { name: "China", v: 5 },
  { name: "India", v: 4 },
  { name: "Other", v: 5 },
];
const trafficOrigin = [
  { name: "Online", v: 82 },
  { name: "Offline / others", v: 18 },
];
const saveVelocity = [
  { d: "Day 0", s: 40 }, { d: "Day 2", s: 130 }, { d: "Day 4", s: 260 },
  { d: "Day 6", s: 430 }, { d: "Day 8", s: 690 }, { d: "Day 10", s: 880 },
  { d: "Day 12", s: 1010 }, { d: "Day 14", s: 1120 },
];
const events = [
  { name: "Neon Nights: Synthwave Live", date: "12 May", reach: 12600, saves: 1320, conv: 65.8, rev: 8420 },
  { name: "Kopi & Canvas — Art Jam", date: "5 May", reach: 7400, saves: 612, conv: 58.2, rev: 2110 },
  { name: "Friday Floor: House Sessions", date: "2 May", reach: 9800, saves: 951, conv: 61.4, rev: 5640 },
  { name: "Makan Market Pop-up", date: "27 Apr", reach: 6200, saves: 488, conv: 44.1, rev: 1390 },
  { name: "Spoken Word Circle", date: "24 Apr", reach: 3100, saves: 214, conv: 71.0, rev: 640 },
];
const funnel = [
  { stage: "Impressions", v: 12600, pct: 100 },
  { stage: "Saves", v: 1320, pct: 10.5 },
  { stage: "Reminder set", v: 1042, pct: 8.3 },
  { stage: "Attended", v: 868, pct: 6.9 },
];
const dropoff = [
  { reason: "Timing clash", v: 38 },
  { reason: "Price sensitivity", v: 29 },
  { reason: "Distance / transit", v: 21 },
  { reason: "Unspecified", v: 12 },
];
const programmingFit = [
  { cat: "Live Music", fit: 92 },
  { cat: "Club / DJ", fit: 81 },
  { cat: "Art", fit: 74 },
  { cat: "Food", fit: 58 },
  { cat: "Talks", fit: 36 },
  { cat: "Wellness", fit: 44 },
];
const repeatTrend = [
  { m: "Jan", r: 18 }, { m: "Feb", r: 22 }, { m: "Mar", r: 27 },
  { m: "Apr", r: 31 }, { m: "May", r: 37 },
];
const revenueStreams = [
  { m: "Jan", affiliate: 1200, boosted: 400, lens: 0 },
  { m: "Feb", affiliate: 1800, boosted: 700, lens: 0 },
  { m: "Mar", affiliate: 2600, boosted: 1100, lens: 500 },
  { m: "Apr", affiliate: 3400, boosted: 1600, lens: 500 },
  { m: "May", affiliate: 4800, boosted: 2400, lens: 900 },
];
// Utilization heatmap: rows = days, cols = time blocks, value 0-100
const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const blocks = ["Morning", "Afternoon", "Evening", "Late"];
const utilization = [
  [10, 22, 35, 8], [12, 20, 41, 12], [15, 28, 52, 18], [18, 34, 68, 30],
  [22, 40, 88, 72], [35, 58, 95, 85], [28, 44, 60, 24],
];

/* ============================== PRIMITIVES ============================== */
const fmt = (n) => n >= 1000 ? (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "k" : "" + n;

function Panel({ title, sub, children, style, span }) {
  return (
    <div className="gl-panel" style={{ gridColumn: span ? `span ${span}` : undefined, ...style }}>
      {title && (
        <div className="gl-panel-head">
          <div>
            <div className="gl-panel-title">{title}</div>
            {sub && <div className="gl-panel-sub">{sub}</div>}
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

function Kpi({ label, value, unit, delta, up, hint }) {
  return (
    <div className="gl-kpi">
      <div className="gl-kpi-label">{label}</div>
      <div className="gl-kpi-value">
        {value}<span className="gl-kpi-unit">{unit}</span>
      </div>
      <div className="gl-kpi-foot">
        <span className={`gl-delta ${up ? "up" : "down"}`}>
          {up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}{delta}
        </span>
        <span className="gl-kpi-hint">{hint}</span>
      </div>
    </div>
  );
}

const tipStyle = {
  background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 8,
  fontSize: 12, color: C.txt, padding: "8px 10px",
};
const axis = { fontSize: 11, fill: C.faint };

/* ============================== SURFACES ============================== */
function Overview() {
  return (
    <>
      <div className="gl-kpi-row">
        <Kpi label="Total Reach" value="12.6" unit="k" delta="18%" up hint="swipe impressions" />
        <Kpi label="Saves" value="1,320" delta="16%" up hint="intent signal" />
        <Kpi label="Save → Attend" value="65.8" unit="%" delta="4.2pt" up hint="conversion" />
        <Kpi label="Cost / Save" value="RM 0.41" delta="9%" up hint="vs RM 0.45" />
        <Kpi label="Demand Index" value="84" unit="/100" delta="7" up hint="GridWay proprietary" />
      </div>

      <div className="gl-grid">
        <Panel title="Engagement trend" sub="12-week reach, saves & attendance" span={2}>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={engagement} margin={{ top: 8, right: 8, left: -12, bottom: 0 }}>
              <defs>
                <linearGradient id="gA" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.amber} stopOpacity={0.35} />
                  <stop offset="100%" stopColor={C.amber} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={C.hair} vertical={false} />
              <XAxis dataKey="w" tick={axis} axisLine={false} tickLine={false} />
              <YAxis tick={axis} axisLine={false} tickLine={false} tickFormatter={fmt} />
              <Tooltip contentStyle={tipStyle} />
              <Area type="monotone" dataKey="reach" stroke={C.amber} fill="url(#gA)" strokeWidth={2} />
              <Line type="monotone" dataKey="saves" stroke={C.blue} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="attend" stroke={C.teal} strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>

        <Panel title="Demand vs supply" sub="latent interest in catchment vs events run">
          <div className="gl-demand">
            <div className="gl-demand-row">
              <span>Latent demand</span><span className="gl-demand-bar"><i style={{ width: "88%", background: C.amber }} /></span><b>88</b>
            </div>
            <div className="gl-demand-row">
              <span>Events supplied</span><span className="gl-demand-bar"><i style={{ width: "52%", background: C.blue }} /></span><b>52</b>
            </div>
            <div className="gl-gap">
              <Sparkles size={14} color={C.amberHi} />
              <span><b>36-point demand gap.</b> Your district wants more live programming than is currently scheduled — room to add 2–3 weekly slots.</span>
            </div>
          </div>
        </Panel>
      </div>

      <Panel title="Top events this period" sub="ranked by reach">
        <table className="gl-table">
          <thead><tr><th>Event</th><th>Date</th><th>Reach</th><th>Saves</th><th>Conv.</th><th>Revenue</th></tr></thead>
          <tbody>
            {events.map((e) => (
              <tr key={e.name}>
                <td className="gl-strong">{e.name}</td>
                <td>{e.date}</td>
                <td>{fmt(e.reach)}</td>
                <td>{e.saves}</td>
                <td>{e.conv}%</td>
                <td>RM {e.rev.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
    </>
  );
}

function Audience() {
  return (
    <>
      <div className="gl-moat">
        <Sparkles size={16} color={C.amberHi} />
        <span><b>Intent, not attention.</b> Lens reads <i>why</i> your crowd engaged from on-platform taste signals — not just who bought a ticket. Your audience over-indexes <b>+12pts on Live Music</b> and <b>+7pts on Art</b> against the KL baseline.</span>
      </div>
      <div className="gl-grid">
        <Panel title="Audience interest clusters" sub="your crowd vs KL baseline" span={2}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={interests} layout="vertical" margin={{ left: 24, right: 16 }}>
              <CartesianGrid stroke={C.hair} horizontal={false} />
              <XAxis type="number" tick={axis} axisLine={false} tickLine={false} unit="%" />
              <YAxis type="category" dataKey="name" tick={{ ...axis, fill: C.mut }} axisLine={false} tickLine={false} width={92} />
              <Tooltip contentStyle={tipStyle} />
              <Bar dataKey="base" fill={C.faint} radius={[0, 3, 3, 0]} barSize={9} name="KL baseline" />
              <Bar dataKey="v" fill={C.amber} radius={[0, 3, 3, 0]} barSize={9} name="Your audience" />
            </BarChart>
          </ResponsiveContainer>
        </Panel>
        <Panel title="New vs returning" sub="audience composition">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={newReturning} dataKey="v" innerRadius={58} outerRadius={86} paddingAngle={3} stroke="none">
                {newReturning.map((_, i) => <Cell key={i} fill={i ? C.blue : C.amber} />)}
              </Pie>
              <Tooltip contentStyle={tipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="gl-legend">
            <span><i style={{ background: C.amber }} />New 63%</span>
            <span><i style={{ background: C.blue }} />Returning 37%</span>
          </div>
        </Panel>
      </div>
      <div className="gl-grid">
        <Panel title="Catchment" sub="where your audience comes from">
          {districts.map((d) => (
            <div className="gl-bar-row" key={d.name}>
              <MapPin size={12} color={C.faint} />
              <span className="gl-bar-label">{d.name}</span>
              <span className="gl-bar-track"><i style={{ width: `${d.v * 3}%`, background: C.teal }} /></span>
              <b>{d.v}%</b>
            </div>
          ))}
        </Panel>
        <Panel title="Age distribution" sub="of engaged audience">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ageBands} margin={{ left: -16 }}>
              <CartesianGrid stroke={C.hair} vertical={false} />
              <XAxis dataKey="name" tick={axis} axisLine={false} tickLine={false} />
              <YAxis tick={axis} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={tipStyle} />
              <Bar dataKey="v" radius={[3, 3, 0, 0]} barSize={38}>
                {ageBands.map((_, i) => <Cell key={i} fill={SERIES[i % SERIES.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Panel>
      </div>

      <div className="gl-grid">
        <Panel title="Spending power" sub="estimated spend tier per attendee" span={2}>
          <div className="gl-spend-hi">
            <div>
              <div className="gl-spend-label">Avg. spend / attendee</div>
              <div className="gl-spend-val">RM 86</div>
            </div>
            <span className="gl-delta up"><ArrowUpRight size={12} />+14% vs KL avg</span>
          </div>
          {spending.map((s, i) => (
            <div className="gl-bar-row" key={s.name}>
              <span className="gl-bar-label xwide">{s.name}</span>
              <span className="gl-bar-track"><i style={{ width: `${s.v * 1.7}%`, background: SERIES[i % SERIES.length] }} /></span>
              <b>{s.v}%</b>
            </div>
          ))}
        </Panel>
        <Panel title="Working vs students" sub="life-stage mix">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={occupation} dataKey="v" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3} stroke="none">
                {occupation.map((_, i) => <Cell key={i} fill={SERIES[i % SERIES.length]} />)}
              </Pie>
              <Tooltip contentStyle={tipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="gl-legend wrap">
            {occupation.map((o, i) => (
              <span key={o.name}><i style={{ background: SERIES[i % SERIES.length] }} />{o.name} {o.v}%</span>
            ))}
          </div>
        </Panel>
      </div>

      <div className="gl-grid">
        <Panel title="Local vs international" sub="resident vs visitor">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={residency} dataKey="v" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3} stroke="none">
                {residency.map((_, i) => <Cell key={i} fill={i ? C.rose : C.teal} />)}
              </Pie>
              <Tooltip contentStyle={tipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="gl-legend">
            <span><i style={{ background: C.teal }} />Local 71%</span>
            <span><i style={{ background: C.rose }} />International 29%</span>
          </div>
        </Panel>
        <Panel title="Top nationalities" sub="where your guests come from" span={2}>
          {nationality.map((n, i) => (
            <div className="gl-bar-row" key={n.name}>
              <span className="gl-bar-label">{n.name}</span>
              <span className="gl-bar-track"><i style={{ width: `${n.v}%`, background: i === 0 ? C.teal : C.rose }} /></span>
              <b>{n.v}%</b>
            </div>
          ))}
          <div className="gl-gap" style={{ marginTop: 12 }}>
            <Sparkles size={14} color={C.amberHi} />
            <span><b>29% international.</b> A meaningful visitor share — a signal for tourism boards and a wedge competitors covering only ticketing or tourism listings can't match.</span>
          </div>
        </Panel>
      </div>
    </>
  );
}

function Discovery() {
  return (
    <>
      <div className="gl-grid">
        <Panel title="Discovery channels" sub="how your audience found you">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={discovery} dataKey="v" nameKey="name" innerRadius={54} outerRadius={84} paddingAngle={3} stroke="none">
                {discovery.map((_, i) => <Cell key={i} fill={SERIES[i % SERIES.length]} />)}
              </Pie>
              <Tooltip contentStyle={tipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="gl-legend wrap">
            {discovery.map((d, i) => (
              <span key={d.name}><i style={{ background: SERIES[i % SERIES.length] }} />{d.name} {d.v}%</span>
            ))}
          </div>
        </Panel>

        <Panel title="Social graph propagation" sub="the GridWay moat" span={2}>
          <div className="gl-moat tight">
            <Share2 size={16} color={C.amberHi} />
            <span><b>27% of discovery came through your audience's social graph</b> — friends-of-attendees who'd never seen your listing. No ticketing or listings competitor can show you this.</span>
          </div>
          <div className="gl-prop">
            <div className="gl-prop-node"><b>1</b><span>save</span></div>
            <div className="gl-prop-arrow">→</div>
            <div className="gl-prop-node"><b>3.4</b><span>downstream views</span></div>
            <div className="gl-prop-arrow">→</div>
            <div className="gl-prop-node"><b>1.1</b><span>new saves</span></div>
            <div className="gl-prop-arrow">→</div>
            <div className="gl-prop-node hi"><b>1.6×</b><span>organic reach multiplier</span></div>
          </div>
        </Panel>
      </div>
      <div className="gl-grid">
        <Panel title="Traffic origin" sub="online vs offline acquisition">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={trafficOrigin} dataKey="v" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={3} stroke="none">
                {trafficOrigin.map((_, i) => <Cell key={i} fill={i ? C.faint : C.amber} />)}
              </Pie>
              <Tooltip contentStyle={tipStyle} />
            </PieChart>
          </ResponsiveContainer>
          <div className="gl-legend">
            <span><i style={{ background: C.amber }} />Online 82%</span>
            <span><i style={{ background: C.faint }} />Offline / others 18%</span>
          </div>
        </Panel>
        <Panel title="Save velocity" sub="cumulative saves after listing went live" span={2}>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={saveVelocity} margin={{ left: -14 }}>
              <CartesianGrid stroke={C.hair} vertical={false} />
              <XAxis dataKey="d" tick={axis} axisLine={false} tickLine={false} />
              <YAxis tick={axis} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tipStyle} />
              <Line type="monotone" dataKey="s" stroke={C.amber} strokeWidth={2.5} dot={{ r: 3, fill: C.amber }} />
            </LineChart>
          </ResponsiveContainer>
        </Panel>
      </div>
    </>
  );
}

function Events() {
  return (
    <>
      <Panel title="Event performance" sub="all events this period">
        <table className="gl-table">
          <thead><tr><th>Event</th><th>Date</th><th>Reach</th><th>Saves</th><th>Conv.</th><th>Revenue</th></tr></thead>
          <tbody>
            {events.map((e, i) => (
              <tr key={e.name} className={i === 0 ? "gl-sel" : ""}>
                <td className="gl-strong">{e.name}{i === 0 && <span className="gl-pill">selected</span>}</td>
                <td>{e.date}</td><td>{fmt(e.reach)}</td><td>{e.saves}</td><td>{e.conv}%</td>
                <td>RM {e.rev.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
      <div className="gl-grid">
        <Panel title="Conversion funnel" sub="Neon Nights: Synthwave Live" span={2}>
          {funnel.map((f, i) => (
            <div className="gl-funnel-row" key={f.stage}>
              <span className="gl-funnel-stage">{f.stage}</span>
              <span className="gl-funnel-bar">
                <i style={{ width: `${f.pct === 100 ? 100 : f.pct / 0.105}%`, background: SERIES[i % SERIES.length] }}>
                  {f.v.toLocaleString()}
                </i>
              </span>
              <b>{f.pct}%</b>
            </div>
          ))}
        </Panel>
        <Panel title="Inferred drop-off" sub="saved but didn't attend">
          {dropoff.map((d, i) => (
            <div className="gl-bar-row" key={d.reason}>
              <span className="gl-bar-label wide">{d.reason}</span>
              <span className="gl-bar-track"><i style={{ width: `${d.v * 2.4}%`, background: SERIES[i % SERIES.length] }} /></span>
              <b>{d.v}%</b>
            </div>
          ))}
        </Panel>
      </div>
      <Panel title="Cohort benchmark" sub="vs similar Live Music events in KL (anonymised)">
        <div className="gl-bench">
          {[["Save rate", 10.5, 6.8], ["Conversion", 65.8, 51.2], ["Cost / save", 0.41, 0.62, true]].map(([l, you, peer, inv]) => (
            <div className="gl-bench-row" key={l}>
              <span className="gl-bar-label wide">{l}</span>
              <span className="gl-bench-you">You {inv ? "RM " : ""}{you}{inv ? "" : "%"}</span>
              <span className="gl-bench-peer">Peers {inv ? "RM " : ""}{peer}{inv ? "" : "%"}</span>
              <span className={`gl-delta up`}><ArrowUpRight size={12} />ahead</span>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}

function Venue() {
  const cellColor = (v) => {
    const t = v / 100;
    return `rgba(232,168,56,${0.08 + t * 0.85})`;
  };
  return (
    <>
      <div className="gl-kpi-row four">
        <Kpi label="Space utilisation" value="58" unit="%" delta="6pt" up hint="of bookable slots" />
        <Kpi label="Repeat-visitor rate" value="37" unit="%" delta="6pt" up hint="loyal crowd building" />
        <Kpi label="Avg. footfall / event" value="612" delta="11%" up hint="across May" />
        <Kpi label="Dead nights" value="3" unit="/wk" delta="1" up hint="Mon–Wed early" />
      </div>
      <Panel title="Utilisation heatmap" sub="demand by day & time block — spot the dead slots">
        <div className="gl-heat">
          <div className="gl-heat-corner" />
          {blocks.map((b) => <div className="gl-heat-col" key={b}>{b}</div>)}
          {days.map((d, r) => (
            <React.Fragment key={d}>
              <div className="gl-heat-row">{d}</div>
              {utilization[r].map((v, c) => (
                <div key={c} className="gl-heat-cell" style={{ background: cellColor(v) }} title={`${v}%`}>
                  <span style={{ color: v > 55 ? C.bg : C.mut }}>{v}</span>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </Panel>
      <div className="gl-grid">
        <Panel title="Programming fit" sub="which categories perform in this space">
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={programmingFit} outerRadius={92}>
              <PolarGrid stroke={C.hair} />
              <PolarAngleAxis dataKey="cat" tick={{ fontSize: 11, fill: C.mut }} />
              <PolarRadiusAxis tick={false} axisLine={false} />
              <Radar dataKey="fit" stroke={C.amber} fill={C.amber} fillOpacity={0.32} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </Panel>
        <Panel title="Repeat-visitor trend" sub="share of returning attendees">
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={repeatTrend} margin={{ left: -16 }}>
              <defs>
                <linearGradient id="gR" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={C.teal} stopOpacity={0.4} />
                  <stop offset="100%" stopColor={C.teal} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={C.hair} vertical={false} />
              <XAxis dataKey="m" tick={axis} axisLine={false} tickLine={false} />
              <YAxis tick={axis} axisLine={false} tickLine={false} unit="%" />
              <Tooltip contentStyle={tipStyle} />
              <Area type="monotone" dataKey="r" stroke={C.teal} fill="url(#gR)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </Panel>
      </div>
    </>
  );
}

function Revenue() {
  return (
    <>
      <div className="gl-kpi-row four">
        <Kpi label="Total revenue (MoM)" value="RM 8.1" unit="k" delta="34%" up hint="May" />
        <Kpi label="Revenue / save" value="RM 6.38" delta="12%" up hint="up from RM 5.70" />
        <Kpi label="Boosted-listing ROI" value="3.2" unit="×" delta="0.4×" up hint="spend → ticket rev" />
        <Kpi label="Affiliate take" value="RM 4.8" unit="k" delta="41%" up hint="ticket links" />
      </div>
      <Panel title="Revenue streams" sub="monetisation mix building toward Lens subscription">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={revenueStreams} margin={{ left: -10 }}>
            <CartesianGrid stroke={C.hair} vertical={false} />
            <XAxis dataKey="m" tick={axis} axisLine={false} tickLine={false} />
            <YAxis tick={axis} axisLine={false} tickLine={false} tickFormatter={(v) => "RM" + fmt(v)} />
            <Tooltip contentStyle={tipStyle} />
            <Bar dataKey="affiliate" stackId="a" fill={C.amber} name="Affiliate tickets" />
            <Bar dataKey="boosted" stackId="a" fill={C.blue} name="Boosted listings" />
            <Bar dataKey="lens" stackId="a" fill={C.teal} radius={[3, 3, 0, 0]} name="Lens subscription" />
          </BarChart>
        </ResponsiveContainer>
        <div className="gl-legend">
          <span><i style={{ background: C.amber }} />Affiliate tickets</span>
          <span><i style={{ background: C.blue }} />Boosted listings</span>
          <span><i style={{ background: C.teal }} />Lens subscription</span>
        </div>
      </Panel>
    </>
  );
}

/* ============================== SHELL ============================== */
const NAV = [
  { id: "overview", label: "Overview", icon: LayoutGrid, view: Overview },
  { id: "audience", label: "Audience", icon: Users, view: Audience },
  { id: "discovery", label: "Discovery", icon: Compass, view: Discovery },
  { id: "events", label: "Events", icon: CalendarDays, view: Events, persp: "host" },
  { id: "venue", label: "Venue", icon: Building2, view: Venue, persp: "venue" },
  { id: "revenue", label: "Revenue", icon: Wallet, view: Revenue },
];

export default function GridWayLens() {
  const [tab, setTab] = useState("overview");
  const [persp, setPersp] = useState("host"); // host | venue
  const active = NAV.find((n) => n.id === tab) || NAV[0];
  const View = active.view;

  return (
    <div className="gl-root">
      <style>{CSS}</style>

      {/* Sidebar */}
      <aside className="gl-side">
        <div className="gl-brand">
          <span className="gl-logo">◴</span>
          <div>
            <div className="gl-brand-name">GridWay <b>Lens</b></div>
            <div className="gl-brand-sub">audience intelligence</div>
          </div>
        </div>
        <nav className="gl-nav">
          {NAV.map((n) => {
            const Icon = n.icon;
            const dim = (n.persp === "host" && persp === "venue") || (n.persp === "venue" && persp === "host");
            return (
              <button key={n.id} className={`gl-nav-item ${tab === n.id ? "on" : ""}`}
                onClick={() => setTab(n.id)}>
                <Icon size={16} />{n.label}
                {dim && <span className="gl-nav-tag">{n.persp}</span>}
              </button>
            );
          })}
        </nav>
        <div className="gl-locked">
          <Lock size={13} /><div>
            <b>Government tier</b>
            <span>District demand-intelligence — preview</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="gl-main">
        <header className="gl-top">
          <div>
            <div className="gl-acct">Kongsi KL</div>
            <div className="gl-acct-sub">Creative venue & event organiser · Kuala Lumpur</div>
          </div>
          <div className="gl-controls">
            <div className="gl-toggle">
              {["host", "venue"].map((p) => (
                <button key={p} className={persp === p ? "on" : ""} onClick={() => setPersp(p)}>
                  {p === "host" ? "Event host" : "Venue"}
                </button>
              ))}
            </div>
            <div className="gl-range">Last 12 weeks ▾</div>
          </div>
        </header>
        <div className="gl-body">
          <h1 className="gl-h1">{active.label}</h1>
          <View />
        </div>
      </main>
    </div>
  );
}

/* ============================== STYLES ============================== */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700&family=DM+Mono:wght@400;500&display=swap');
* { box-sizing: border-box; }
.gl-root {
  display: flex; min-height: 640px; font-family: 'DM Sans', sans-serif;
  background:
    radial-gradient(circle at 1px 1px, rgba(232,168,56,0.045) 1px, transparent 0) 0 0 / 22px 22px,
    ${C.bg};
  color: ${C.txt}; border-radius: 14px; overflow: hidden;
  border: 1px solid ${C.line}; letter-spacing: -0.01em;
}
/* Sidebar */
.gl-side { width: 232px; flex-shrink: 0; background: ${C.panel}; border-right: 1px solid ${C.line};
  padding: 22px 16px; display: flex; flex-direction: column; gap: 26px; }
.gl-brand { display: flex; gap: 11px; align-items: center; }
.gl-logo { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 9px;
  background: linear-gradient(135deg, ${C.amber}, ${C.amberHi}); color: ${C.bg}; font-size: 19px; font-weight: 700; }
.gl-brand-name { font-size: 16px; font-weight: 500; }
.gl-brand-name b { font-family: 'DM Serif Display', serif; font-weight: 400; font-style: italic; color: ${C.amberHi}; }
.gl-brand-sub { font-size: 10.5px; color: ${C.faint}; text-transform: uppercase; letter-spacing: 0.14em; margin-top: 2px; }
.gl-nav { display: flex; flex-direction: column; gap: 3px; }
.gl-nav-item { display: flex; align-items: center; gap: 11px; padding: 9px 11px; border: none;
  background: none; color: ${C.mut}; font-size: 13.5px; font-family: inherit; font-weight: 500;
  border-radius: 8px; cursor: pointer; text-align: left; transition: all .15s; position: relative; }
.gl-nav-item:hover { background: ${C.panel2}; color: ${C.txt}; }
.gl-nav-item.on { background: rgba(232,168,56,0.1); color: ${C.amberHi}; }
.gl-nav-tag { margin-left: auto; font-size: 9px; text-transform: uppercase; letter-spacing: 0.08em;
  color: ${C.faint}; border: 1px solid ${C.hair}; border-radius: 4px; padding: 1px 5px; }
.gl-locked { margin-top: auto; display: flex; gap: 10px; align-items: flex-start; padding: 12px;
  border: 1px dashed ${C.line}; border-radius: 10px; color: ${C.mut}; }
.gl-locked b { display: block; font-size: 12px; color: ${C.txt}; }
.gl-locked span { font-size: 10.5px; color: ${C.faint}; }
/* Main */
.gl-main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.gl-top { display: flex; justify-content: space-between; align-items: center; padding: 20px 28px;
  border-bottom: 1px solid ${C.line}; }
.gl-acct { font-family: 'DM Serif Display', serif; font-size: 20px; }
.gl-acct-sub { font-size: 11.5px; color: ${C.faint}; margin-top: 2px; }
.gl-controls { display: flex; gap: 12px; align-items: center; }
.gl-toggle { display: flex; background: ${C.panel}; border: 1px solid ${C.line}; border-radius: 9px; padding: 3px; }
.gl-toggle button { border: none; background: none; color: ${C.mut}; font-family: inherit; font-size: 12.5px;
  font-weight: 600; padding: 6px 14px; border-radius: 6px; cursor: pointer; transition: all .15s; }
.gl-toggle button.on { background: ${C.amber}; color: ${C.bg}; }
.gl-range { font-size: 12px; color: ${C.mut}; border: 1px solid ${C.line}; border-radius: 8px;
  padding: 7px 12px; background: ${C.panel}; cursor: pointer; }
.gl-body { padding: 24px 28px 40px; overflow-y: auto; }
.gl-h1 { font-family: 'DM Serif Display', serif; font-size: 26px; font-weight: 400; margin: 0 0 18px; }
/* KPI */
.gl-kpi-row { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; margin-bottom: 16px; }
.gl-kpi-row.four { grid-template-columns: repeat(4, 1fr); }
.gl-kpi { background: ${C.panel}; border: 1px solid ${C.line}; border-radius: 12px; padding: 15px 16px; }
.gl-kpi-label { font-size: 11px; color: ${C.mut}; text-transform: uppercase; letter-spacing: 0.07em; }
.gl-kpi-value { font-family: 'DM Serif Display', serif; font-size: 27px; margin: 7px 0 6px; line-height: 1; }
.gl-kpi-unit { font-size: 14px; color: ${C.mut}; margin-left: 2px; }
.gl-kpi-foot { display: flex; align-items: center; gap: 8px; }
.gl-delta { display: inline-flex; align-items: center; gap: 2px; font-size: 11px; font-weight: 600;
  font-family: 'DM Mono', monospace; }
.gl-delta.up { color: ${C.teal}; } .gl-delta.down { color: ${C.rose}; }
.gl-kpi-hint { font-size: 10.5px; color: ${C.faint}; }
/* Panels & grid */
.gl-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-bottom: 16px; }
.gl-panel { background: ${C.panel}; border: 1px solid ${C.line}; border-radius: 14px; padding: 18px; margin-bottom: 16px; }
.gl-panel-head { display: flex; justify-content: space-between; margin-bottom: 14px; }
.gl-panel-title { font-size: 14px; font-weight: 600; }
.gl-panel-sub { font-size: 11px; color: ${C.faint}; margin-top: 2px; }
/* Moat callout */
.gl-moat { display: flex; gap: 11px; align-items: flex-start; background: rgba(232,168,56,0.07);
  border: 1px solid ${C.line}; border-left: 3px solid ${C.amber}; border-radius: 10px;
  padding: 14px 16px; margin-bottom: 16px; font-size: 13px; line-height: 1.5; color: ${C.txt}; }
.gl-moat.tight { margin-bottom: 18px; }
.gl-moat i { color: ${C.amberHi}; font-style: italic; }
/* Tables */
.gl-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.gl-table th { text-align: left; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.07em;
  color: ${C.faint}; font-weight: 600; padding: 0 0 10px; border-bottom: 1px solid ${C.line}; }
.gl-table th:not(:first-child), .gl-table td:not(:first-child) { text-align: right; }
.gl-table td { padding: 11px 0; border-bottom: 1px solid ${C.hair}; color: ${C.mut}; }
.gl-table tr:last-child td { border-bottom: none; }
.gl-strong { color: ${C.txt} !important; font-weight: 500; }
.gl-sel { background: rgba(232,168,56,0.05); }
.gl-pill { font-size: 9px; text-transform: uppercase; letter-spacing: 0.06em; color: ${C.amberHi};
  border: 1px solid ${C.line}; border-radius: 4px; padding: 1px 6px; margin-left: 9px; }
/* Demand panel */
.gl-demand-row { display: flex; align-items: center; gap: 10px; font-size: 12.5px; color: ${C.mut}; margin-bottom: 12px; }
.gl-demand-row span:first-child { width: 110px; }
.gl-demand-bar { flex: 1; height: 9px; background: ${C.panel2}; border-radius: 5px; overflow: hidden; }
.gl-demand-bar i { display: block; height: 100%; border-radius: 5px; }
.gl-demand-row b { font-family: 'DM Mono', monospace; color: ${C.txt}; width: 28px; text-align: right; }
.gl-gap { display: flex; gap: 9px; align-items: flex-start; margin-top: 16px; padding-top: 14px;
  border-top: 1px solid ${C.hair}; font-size: 12px; line-height: 1.5; color: ${C.mut}; }
.gl-gap b { color: ${C.txt}; }
/* Bar rows */
.gl-bar-row { display: flex; align-items: center; gap: 9px; margin-bottom: 11px; font-size: 12.5px; color: ${C.mut}; }
.gl-bar-label { width: 92px; flex-shrink: 0; }
.gl-bar-label.wide { width: 120px; }
.gl-bar-label.xwide { width: 150px; }
.gl-spend-hi { display: flex; align-items: center; justify-content: space-between;
  padding: 0 0 14px; margin-bottom: 14px; border-bottom: 1px solid ${C.hair}; }
.gl-spend-label { font-size: 11px; color: ${C.mut}; text-transform: uppercase; letter-spacing: 0.07em; }
.gl-spend-val { font-family: 'DM Serif Display', serif; font-size: 28px; margin-top: 4px; }
.gl-bar-track { flex: 1; height: 8px; background: ${C.panel2}; border-radius: 5px; overflow: hidden; }
.gl-bar-track i { display: block; height: 100%; border-radius: 5px; }
.gl-bar-row b { font-family: 'DM Mono', monospace; color: ${C.txt}; width: 34px; text-align: right; }
/* Legend */
.gl-legend { display: flex; gap: 18px; justify-content: center; margin-top: 10px; font-size: 11.5px; color: ${C.mut}; flex-wrap: wrap; }
.gl-legend.wrap { gap: 12px 18px; }
.gl-legend i { display: inline-block; width: 9px; height: 9px; border-radius: 2px; margin-right: 6px; vertical-align: middle; }
/* Propagation */
.gl-prop { display: flex; align-items: center; justify-content: space-between; gap: 4px; margin-top: 4px; }
.gl-prop-node { flex: 1; text-align: center; background: ${C.panel2}; border: 1px solid ${C.line};
  border-radius: 10px; padding: 14px 6px; }
.gl-prop-node.hi { background: rgba(232,168,56,0.12); border-color: ${C.amber}; }
.gl-prop-node b { font-family: 'DM Serif Display', serif; font-size: 22px; display: block; }
.gl-prop-node.hi b { color: ${C.amberHi}; }
.gl-prop-node span { font-size: 10.5px; color: ${C.faint}; }
.gl-prop-arrow { color: ${C.faint}; font-size: 16px; }
/* Funnel */
.gl-funnel-row { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; font-size: 12.5px; }
.gl-funnel-stage { width: 96px; color: ${C.mut}; }
.gl-funnel-bar { flex: 1; }
.gl-funnel-bar i { display: flex; align-items: center; padding-left: 10px; height: 30px; border-radius: 6px;
  color: ${C.bg}; font-weight: 700; font-style: normal; font-size: 12px; min-width: 56px; }
.gl-funnel-row b { font-family: 'DM Mono', monospace; color: ${C.txt}; width: 44px; text-align: right; }
/* Bench */
.gl-bench-row { display: flex; align-items: center; gap: 14px; padding: 11px 0; border-bottom: 1px solid ${C.hair}; font-size: 12.5px; }
.gl-bench-row:last-child { border-bottom: none; }
.gl-bench-you { color: ${C.amberHi}; font-weight: 600; }
.gl-bench-peer { color: ${C.faint}; }
.gl-bench-row .gl-delta { margin-left: auto; }
/* Heatmap */
.gl-heat { display: grid; grid-template-columns: 56px repeat(4, 1fr); gap: 5px; }
.gl-heat-corner {}
.gl-heat-col { font-size: 10.5px; color: ${C.faint}; text-align: center; padding-bottom: 4px; text-transform: uppercase; letter-spacing: 0.05em; }
.gl-heat-row { font-size: 11.5px; color: ${C.mut}; display: flex; align-items: center; }
.gl-heat-cell { height: 42px; border-radius: 7px; display: grid; place-items: center;
  font-family: 'DM Mono', monospace; font-size: 11px; }
@media (max-width: 920px) {
  .gl-kpi-row, .gl-kpi-row.four { grid-template-columns: repeat(2, 1fr); }
  .gl-grid { grid-template-columns: 1fr; }
}
`;
