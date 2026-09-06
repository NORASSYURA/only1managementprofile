import React, { useState, useMemo, useRef } from 'react';
import { Truck, AlertTriangle, Calendar, Camera, FileText, CheckCircle2, Clock, Plus, Printer, Phone, MapPin, Users, ShieldAlert, DollarSign, X, ChevronRight, Search, Upload, Share2, HardHat, Send, Building, CheckSquare, Square, Award, IdCard, UserCheck, BellRing, ExternalLink, Briefcase } from 'lucide-react';

export default function CoordinatorDashboard() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showReplacementModal, setShowReplacementModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState(null);
  const fileInputRef = useRef(null);
  const showToast = (msg) => { setNotification(msg); setTimeout(() => setNotification(null), 4000); };

  // --- 1. FULL OPERATORS DATABASE (Op01 to Op26) ---
  const [operators, setOperators] = useState([
    { id: 'Op01', code: 'Op01', name: 'Denno Bin Kamsaim', hp: '94241490', rate: 30, project: 'Terminal 5 Substructure Project (T5)', status: 'Active' },
    { id: 'Op02', code: 'Op02', name: 'Johari Bin Mohd Yasin', hp: '86066359', rate: 32, project: 'P103 Punggol Nightshift', status: 'Active' },
    { id: 'Op03', code: 'Op03', name: 'Helfian Bin Jamain', hp: '80232226', rate: 30, project: 'Cc09b Dayshift', status: 'Active' },
    { id: 'Op04', code: 'Op04', name: 'Shamsul Hairol', hp: '80694561', rate: 30, project: 'C12A/C12B Substructure', status: 'Active' },
    { id: 'Op05', code: 'Op05', name: 'Muhammad Asyrul Mursalin Bin Muhamad Izad', hp: '84390062', rate: 32, project: 'Cc09b Dayshift', status: 'Active' },
    { id: 'Op06', code: 'Op06', name: 'Muhammad Hafiz Bin Yahya', hp: '84044089', rate: 35, project: 'Pasir Ris & J105 / J107', status: 'Active' },
    { id: 'Op07', code: 'Op07', name: 'Syaikhan Bin Samad', hp: '87525011', rate: 30, project: 'Cr 106 Nightshift', status: 'Active' },
    { id: 'Op08', code: 'Op08', name: 'Muhammad Syarizuan Wildan Bin Muhamad Akbar', hp: '86546951', rate: 30, project: 'Cr 106 Nightshift', status: 'Active' },
    { id: 'Op09', code: 'Op09', name: 'Muhammad Amsyar Afiq', hp: '89670369', rate: 30, project: 'General Pool', status: 'Active' },
    { id: 'Op10', code: 'Op10', name: 'Muhammad Faisal Bin Abdul Kader', hp: '88369476', rate: 32, project: 'Cc09b Reliever', status: 'Active' },
    { id: 'Op11', code: 'Op11', name: 'Danial Bin Kamsaim', hp: '91832570', rate: 30, project: 'Changi T5 Reliever', status: 'Active' },
    { id: 'Op12', code: 'Op12', name: 'Ryzan Rzywandy Bin Abdul Aziz', hp: '81716223', rate: 30, project: 'General Pool', status: 'Active' },
    { id: 'Op13', code: 'Op13', name: 'Muhaimmin Bin Hairul Azzat', hp: '84953343', rate: 30, project: 'Cr 106 Nightshift', status: 'Active' },
    { id: 'Op14', code: 'Op14', name: 'Muhammad Syabbani Bin Sabtu', hp: '87502604', rate: 30, project: 'General Pool', status: 'Active' },
    { id: 'Op15', code: 'Op15', name: 'Syaiful Nizam Bin Jamil', hp: '88931992', rate: 30, project: 'General Pool', status: 'Active' },
    { id: 'Op16', code: 'Op16', name: 'Jamaluddin Bin Salleh', hp: '86954800', rate: 32, project: 'C12A/C12B Reliever', status: 'Active' },
    { id: 'Op17', code: 'Op17', name: 'Danial Mustaqim Bin Zulkafly', hp: '91773075', rate: 30, project: 'Woodland ICA Extension', status: 'Active' },
    { id: 'Op18', code: 'Op18', name: 'Muhammad Aimin Bin Rosli', hp: '89078353', rate: 30, project: 'General Pool', status: 'Active' },
    { id: 'Op19', code: 'Op19', name: 'Muhammad Zulkifli Bin Zakariah', hp: '93403447', rate: 30, project: 'General Pool', status: 'Active' },
    { id: 'Op20', code: 'Op20', name: 'Muhammad Zuhaily', hp: '82664348', rate: 32, project: 'Changi T5 Reliever', status: 'Active' },
    { id: 'Op21', code: 'Op21', name: 'Muhammad Nur Danial Bin Jamaludin', hp: '86002369', rate: 30, project: 'General Pool', status: 'Active' },
    { id: 'Op22', code: 'Op22', name: 'Abdul Rashid Bin Abdul Kader', hp: '89016702', rate: 30, project: 'General Pool', status: 'Active' },
    { id: 'Op23', code: 'Op23', name: 'Muhammad Alazmi Bin Abdul Malek', hp: '92392441', rate: 30, project: 'General Pool', status: 'Active' },
    { id: 'Op24', code: 'Op24', name: 'Badaruddin Bin Malek', hp: '80227441', rate: 30, project: 'General Pool', status: 'Active' },
    { id: 'Op25', code: 'Op25', name: 'Muhammad Zul Khairi', hp: '80200994', rate: 30, project: 'General Pool', status: 'Active' },
    { id: 'Op26', code: 'Op26', name: 'Farouk', hp: '85991636', rate: 30, project: 'General Pool', status: 'Active' }
  ]);
  const [selectedOpId, setSelectedOpId] = useState('Op01');
  const currentOperator = operators.find((o) => o.id === selectedOpId) || operators[0];

  // --- 2. GOOGLE DEVELOPER BADGES ---
  const developerBadges = [
    { title: 'NVIDIA Developer & AI Integration', url: 'https://developers.google.com/profile/badges/nvidia-developer?u=1profileManagement' },
    { title: 'Androidify Action Solutions', url: 'https://developers.google.com/profile/badges/playlists/solutions/androidify/action?u=1profileManagement' },
    { title: 'Androidify Learning Track', url: 'https://developers.google.com/profile/badges/playlists/solutions/androidify/learn?u=1profileManagement' },
    { title: 'Androidify Complete Achievement', url: 'https://developers.google.com/profile/badges/playlists/solutions/androidify/complete?u=1profileManagement' },
    { title: 'Data Connect Grounded Agents', url: 'https://developers.google.com/profile/badges/playlists/solutions/data-connect-grounded-agents/complete?u=1profileManagement' },
    { title: 'Google Developer Profile Creator', url: 'https://developers.google.com/profile/badges/profile/created-profile?u=1profileManagement' },
    { title: 'Google Maps Innovator', url: 'https://developers.google.com/profile/badges/community/innovators/maps?u=1profileManagement' },
    { title: 'SDLC Agents & GCA Agents', url: 'https://developers.google.com/profile/badges/community/sdlcagents/gca-agents?u=1profileManagement' }
  ];

  // --- 3. SEPTEMBER 2026 OFF-DAY & REPLACEMENT ROSTER ---
  const [reliefSchedules, setReliefSchedules] = useState([
    { id: 'REL-01', category: 'Permanent', project: 'P103 Punggol Nightshift', primaryOperator: 'Tan Kok Kheong', leaveTotal: '4 Days Leave', status: 'Action Required', schedule: [ { date: '4/9', reliever: 'Asyurl Relieve', status: 'Assigned' }, { date: '5/9', reliever: 'Asyrul Relieve', status: 'Assigned' }, { date: '6/9', reliever: 'Asyrul Relieve', status: 'Assigned' }, { date: '9/9', reliever: '⚠️ Unassigned (Need Reliever)', status: 'Open' } ] },
    { id: 'REL-02', category: 'Permanent', project: 'Cc09b Dayshift', primaryOperator: 'Muhammad Asyrul', leaveTotal: '4 Days Leave', status: 'Fully Covered', schedule: [ { date: '4/9', reliever: 'Faisal Kader Relieve', status: 'Assigned' }, { date: '5/9', reliever: 'Faisal Kader Relieve', status: 'Assigned' }, { date: '6/9', reliever: 'Faisal Kader Relieve', status: 'Assigned' }, { date: '7/9', reliever: 'Faisal Kader Relieve', status: 'Assigned' } ] },
    { id: 'REL-03', category: 'Permanent', project: 'Changi T5 Dayshift', primaryOperator: 'Denno Bin Kamsaim (Op01)', leaveTotal: '3 Days Leave', status: 'Fully Covered', schedule: [ { date: '3/9/26', reliever: 'Danial Kamsaim Relieve', status: 'Assigned' }, { date: '12/9/26', reliever: 'Danial Kamsaim Relieve t5', status: 'Assigned' }, { date: '20/9/26', reliever: 'Danial Kamsaim Relieve', status: 'Assigned' } ] },
    { id: 'REL-04', category: 'Permanent', project: 'Changi T5 Nightshift', primaryOperator: 'Joeyasin', leaveTotal: '5 Days Leave', status: 'Action Required', schedule: [ { date: '6/9', reliever: '⚠️ Operator Not Decided', status: 'Open' }, { date: '7/9', reliever: 'Zuhaily Relieve', status: 'Assigned' }, { date: '8/9', reliever: 'Dani Relieve', status: 'Assigned' }, { date: '9/9', reliever: 'Dani Relieve', status: 'Assigned' }, { date: '10/9', reliever: 'Dani Relieve', status: 'Assigned' } ] },
    { id: 'REL-05', category: 'Permanent', project: 'Changi T5 Nightshift (Lks)', primaryOperator: 'Lks', leaveTotal: '3 Days Leave', status: 'Action Required', schedule: [ { date: '6/9', reliever: '⚠️ Operator Not Decided', status: 'Open' }, { date: '7/9', reliever: '⚠️ Pending Match', status: 'Open' }, { date: '8/9', reliever: '⚠️ Pending Match', status: 'Open' } ] },
    { id: 'REL-06', category: 'Permanent', project: 'C12A / C12B Substructure', primaryOperator: 'Shamsol Hairol', leaveTotal: '4 Days Leave', status: 'Action Required', schedule: [ { date: '21/9', reliever: '⚠️ Pending Match', status: 'Open' }, { date: '22/9', reliever: '⚠️ Pending Match', status: 'Open' }, { date: '26/9', reliever: 'Jamal Relieve', status: 'Assigned' }, { date: '28/9', reliever: 'Jamal Relieve', status: 'Assigned' } ] },
    { id: 'REL-07', category: 'Adhoc', project: 'Cr 106 Nightshift (Extended From Last Month)', primaryOperator: 'Ad-Hoc Pool Rotation', leaveTotal: 'Active Deployment', status: 'Active', schedule: [ { date: '1/9', reliever: 'Muhaimmin', status: 'Completed' }, { date: '2/9', reliever: 'Sharizuan', status: 'Completed' }, { date: '3/9', reliever: 'Sharizuan', status: 'Completed' }, { date: '4/9', reliever: 'Muhaimmin', status: 'Completed' }, { date: '5/9', reliever: 'Muhaimmin', status: 'Assigned' }, { date: '6/9', reliever: 'Sharizuan', status: 'Assigned' } ] },
    { id: 'REL-08', category: 'Adhoc', project: 'Pasir Ris & J105 / J107 Sites (Hafiz Bam)', primaryOperator: 'Hafiz Bam (Relief Operator)', leaveTotal: 'Ad-Hoc Relief', status: 'Active', schedule: [ { date: '5/9', reliever: 'Pasir Ris Relieve Tengku Rudy', status: 'Assigned' }, { date: '6/9', reliever: 'Pasir Ris Relieve Tengku Rudy', status: 'Assigned' }, { date: '7/9', reliever: 'J105 / J107 Site', status: 'Assigned' }, { date: '8/9', reliever: 'J105 / J107 Site', status: 'Assigned' }, { date: '9/9', reliever: 'J105 / J107 Site', status: 'Assigned' } ] },
    { id: 'REL-09', category: 'Planning', project: 'Woodland Extension ICA Immigration (Dayshift)', primaryOperator: 'Muhammad Razif (Naga)', leaveTotal: '5 Days Leave', status: 'Fully Covered', machine: 'XCMG / S.E Crane (Hirose)', schedule: [ { date: '6/9', reliever: 'Dan Mustaqim Relieve', status: 'Assigned' }, { date: '7/9', reliever: 'Dan Mustaqim Relieve', status: 'Assigned' }, { date: '8/9', reliever: 'Dan Mustaqim Relieve', status: 'Assigned' }, { date: '9/9', reliever: 'Dan Mustaqim Relieve', status: 'Assigned' }, { date: '10/9', reliever: 'Dan Mustaqim Relieve', status: 'Assigned' } ] },
    { id: 'REL-10', category: 'Planning', project: 'Sentosa MBS (Dayshift & Nightshift - 2 Operators)', primaryOperator: 'New Deployment Planning', leaveTotal: 'Pending Setup', status: 'Planning', machine: 'Sany / S.E Crane', schedule: [ { date: 'Dayshift', reliever: '⚠️ Unassigned Operator', status: 'Open' }, { date: 'Nightshift', reliever: '⚠️ Unassigned Operator', status: 'Open' } ] }
  ]);
  const unassignedCount = useMemo(() => { let count = 0; reliefSchedules.forEach((item) => { item.schedule.forEach((s) => { if (s.reliever.includes('Unassigned') || s.reliever.includes('Not Decided') || s.reliever.includes('Pending') || s.reliever.includes('⚠️')) { count++; } }); }); return count; }, [reliefSchedules]);
  const [timesheetForm, setTimesheetForm] = useState({ dailyHours: 12, totalDays: 1, shiftType: 'Day Shift', includeLtw: true, transportAllowance: 0, paymentDate: new Date().toISOString().split('T')[0], paymentRef: 'PAYNOW-TOP-' + Math.floor(1000 + Math.random() * 9000) });
  const claimSummary = useMemo(() => { const rate = Number(currentOperator.rate) || 30; const hours = Number(timesheetForm.dailyHours) || 12; const days = Number(timesheetForm.totalDays) || 1; const allowance = Number(timesheetForm.transportAllowance) || 0; const basePay = rate * hours * days; const total = basePay + allowance; return { rate, hours, days, basePay, allowance, total }; }, [currentOperator, timesheetForm]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans">
      {notification && ( <div className="fixed top-4 right-4 z-50 bg-amber-500 text-neutral-950 px-4 py-3 rounded-lg shadow-2xl font-bold flex items-center gap-2 border border-amber-300 animate-bounce"> <AlertTriangle className="w-5 h-5 text-neutral-950" /> <span>{notification}</span> </div> )}
      <header className="bg-neutral-900 border-b border-neutral-800 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-amber-500 p-2.5 rounded-xl shadow-lg flex items-center justify-center text-neutral-950"> <HardHat className="w-6 h-6" /> </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap"> <h1 className="font-black text-sm sm:text-lg tracking-wide uppercase text-white"> THE ONLY1PROFILEMANAGEMENT </h1> <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded font-mono border border-amber-500/40"> UEN: 53530731D </span> </div>
              <p className="text-xs text-neutral-400"> Farhan Aziz • Crane Controller Coordinator • Singapore </p>
            </div>
          </div>
          <div className="flex items-center gap-2"> <button onClick={() => setShowReplacementModal(true)} className="bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-bold px-3 py-2 rounded-lg flex items-center gap-1.5 shadow-lg cursor-pointer" > <AlertTriangle className="w-4 h-4 animate-pulse" /> <span>Urgent Replacement ⚠️</span> </button> </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex gap-1 overflow-x-auto py-2 border-t border-neutral-800/80 no-scrollbar">
          {[ { id: 'profile', label: 'My Professional Profile & Badges 🏆', icon: Award }, { id: 'relief-roster', label: 'Off-Day & Relief Roster 🔄', icon: BellRing, badge: unassignedCount }, { id: 'operators-db', label: 'Operators Database (Op01-Op26) 👥', icon: Users, badge: operators.length }, { id: 'timesheet-pay', label: 'Timesheet & PayNow Claim 💰', icon: FileText }, { id: 'partners', label: 'Strategic Business Partners 🤝', icon: Building } ].map((tab) => { const Icon = tab.icon; const isActive = activeTab === tab.id; return ( <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${ isActive ? 'bg-amber-500 text-neutral-950 font-bold shadow-md' : 'text-neutral-400 hover:text-white hover:bg-neutral-800' }`} > <Icon className="w-4 h-4" /> <span>{tab.label}</span> {tab.badge > 0 && tab.id === 'relief-roster' && ( <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-red-600 text-white animate-pulse"> {tab.badge} ⚠️ </span> )} </button> ); })}
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex-1 w-full">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-6">
              <div className="w-28 h-28 rounded-2xl bg-neutral-950 border-2 border-amber-500 flex items-center justify-center text-amber-400 font-black text-3xl shadow-inner shrink-0"> TOP </div>
              <div className="flex-1 text-center md:text-left space-y-2">
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2"> <h2 className="text-xl sm:text-2xl font-black text-white">Farhan bin Abdul Aziz</h2> <span className="bg-amber-500 text-neutral-950 text-xs font-bold px-2.5 py-0.5 rounded-full"> Managing Director & Controller Coordinator </span> </div>
                <p className="text-xs sm:text-sm text-neutral-300 font-mono"> THE ONLY1PROFILEMANAGEMENT • UEN: 53530731D • Singapore </p>
                <p className="text-xs text-neutral-400 max-w-2xl"> Specialized in heavy crane operations logistics, freelance crane operator deployment around Singapore, safety compliance under MOM standards, and automated digital coordination. </p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2 text-xs font-mono text-neutral-300"> <span className="bg-neutral-950 px-3 py-1 rounded-lg border border-neutral-800">📱 WhatsApp: +65 8124 3369</span> <span className="bg-neutral-950 px-3 py-1 rounded-lg border border-neutral-800">✉️ Admin@anciiner1profilemanagement.com</span> </div>
              </div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3"> <div className="flex items-center gap-2"> <Award className="w-6 h-6 text-amber-500" /> <h3 className="font-bold text-base text-white">Google Developer & Technical Achievements</h3> </div> <span className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full"> Verified Google Profile </span> </div>
              <p className="text-xs text-neutral-400"> Verified badges earned through Google Developer training, AI integrations, data solutions, and technical automation tracks: </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"> {developerBadges.map((badge, idx) => ( <a key={idx} href={badge.url} target="_blank" rel="noreferrer" className="bg-neutral-950 hover:bg-neutral-800/80 border border-neutral-800 hover:border-amber-500/50 p-4 rounded-xl flex flex-col justify-between transition-all group cursor-pointer shadow" > <div className="flex items-start justify-between gap-2 mb-3"> <div className="bg-amber-500/10 p-2 rounded-lg text-amber-400 group-hover:scale-110 transition-transform"> <Award className="w-4 h-4" /> </div> <ExternalLink className="w-3.5 h-3.5 text-neutral-600 group-hover:text-amber-400 shrink-0" /> </div> <div className="font-semibold text-xs text-neutral-200 group-hover:text-white line-clamp-2"> {badge.title} </div> <span className="text-[10px] text-neutral-500 font-mono mt-2 block"> Google Developer Badge #{idx + 1} </span> </a> ))} </div>
            </div>
          </div>
        )}
        {activeTab === 'relief-roster' && (
          <div className="space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div> <h2 className="font-bold text-base sm:text-lg text-white flex items-center gap-2"> <BellRing className="w-5 h-5 text-amber-500 animate-bounce" /> Operator Off-Day & Relief Master Schedule (September 2026) </h2> <p className="text-xs text-neutral-400"> Automated replacement tracking for permanent leave, ongoing ad-hoc extensions, and new planning projects. </p> </div>
              {unassignedCount > 0 && ( <div className="bg-red-950/80 border border-red-700 text-red-300 text-xs px-3 py-2 rounded-lg font-bold flex items-center gap-2"> <AlertTriangle className="w-4 h-4 text-red-500 animate-pulse" /> <span>{unassignedCount} Unassigned Reliever Slots Need Attention!</span> </div> )}
            </div>
            <div className="space-y-6">
              {['Permanent', 'Adhoc', 'Planning'].map((catKey) => {
                const filteredSchedules = reliefSchedules.filter((r) => r.category === catKey);
                if (filteredSchedules.length === 0) return null;
                return ( <div key={catKey} className="space-y-3"> <div className="flex items-center gap-2 border-b border-neutral-800 pb-2"> <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> <h3 className="font-black text-sm uppercase tracking-wider text-amber-400"> {catKey === 'Permanent' && '🔒 JOB PERMANENT - Leave & Reliever Roster'} {catKey === 'Adhoc' && '⚡ AD-HOC JOB ON GOING & EXTENSIONS'} {catKey === 'Planning' && '🏗️ NEW JOB ON PLANNING & DEPLOYMENT'} </h3> </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> {filteredSchedules.map((item) => ( <div key={item.id} className={`bg-neutral-900 border rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-md relative transition-all ${ item.status === 'Action Required' ? 'border-red-600/70 shadow-red-950/40' : 'border-neutral-800' }`} > <div>
                  <div className="flex items-center justify-between mb-2"> <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded ${ item.status === 'Fully Covered' || item.status === 'Active' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-red-950 text-red-400 border border-red-800 animate-pulse' }`} > {item.status === 'Action Required' ? '⚠️ RELIEVER NOT DECIDED' : item.status} </span> <span className="text-xs font-mono text-neutral-400">{item.leaveTotal}</span> </div>
                  <h4 className="font-bold text-white text-base mb-1">{item.project}</h4> <p className="text-xs text-neutral-400 mb-3"> Primary Operator: <span className="text-amber-400 font-semibold">{item.primaryOperator}</span> {item.machine && <span className="block text-[11px] text-neutral-500 font-mono mt-0.5">Machine: {item.machine}</span>} </p>
                  <div className="bg-neutral-950 border border-neutral-800 rounded-lg p-3 space-y-1.5 mb-4"> <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wide mb-1"> Off-Day / Leave Reliever Schedule: </div> {item.schedule.map((sch, idx) => ( <div key={idx} className="flex items-center justify-between text-xs py-0.5 border-b border-neutral-900 last:border-0"> <span className="font-mono text-neutral-300 font-bold min-w-[60px]">{sch.date}:</span> <span className={`font-medium ${sch.reliever.includes('⚠️') || sch.reliever.includes('Unassigned') || sch.reliever.includes('Not Decided') ? 'text-red-400 font-bold' : 'text-emerald-300'}`}> {sch.reliever} </span> </div> ))} </div> </div>
                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between"> <button onClick={() => { let scheduleText = item.schedule.map((s) => `• ${s.date}: ${s.reliever}`).join('\n'); const text = `📋 *OFF-DAY & RELIEF ROSTER*\n🏗️ Project: ${item.project}\n👷 Primary: ${item.primaryOperator}\n\n${scheduleText}`; window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank'); showToast(`Dispatched roster for ${item.project}!`); }} className="bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all cursor-pointer border border-emerald-800/40" > <Share2 className="w-3.5 h-3.5" /> <span>Send Roster (WA)</span> </button>
                <button onClick={() => { const relName = prompt(`Assign or replace reliever operator name for ${item.project}:`); if (relName) { setReliefSchedules((prev) => prev.map((r) => { if (r.id === item.id) { const updatedSch = r.schedule.map((s, i) => i === 0 ? { ...s, reliever: `${relName} Relieve`, status: 'Assigned' } : s); return { ...r, schedule: updatedSch, status: 'Fully Covered' }; } return r; }) ); showToast(`Assigned ${relName} to ${item.project}!`); } }} className="text-xs text-amber-400 hover:text-amber-300 font-medium hover:underline cursor-pointer" > + Assign Reliever </button> </div> </div> ))} </div> </div> ); })} </div>
          </div>
        )}
        {activeTab === 'operators-db' && (
          <div className="space-y-6">
            <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div> <h2 className="font-bold text-base sm:text-lg text-white flex items-center gap-2"> <Users className="w-5 h-5 text-amber-500" /> Full Operators Database (Op01 to Op26) </h2> <p className="text-xs text-neutral-400"> Manage all registered freelance and permanent crane operators, contact numbers, PayNow numbers, and assignments. </p> </div>
              <div className="relative"> <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-3" /> <input type="text" placeholder="Search operator ID or name..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-neutral-950 border border-neutral-700 text-xs text-white pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:border-amber-500 w-60" /> </div>
            </div>
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-sm"> <div className="overflow-x-auto"> <table className="w-full text-left text-xs sm:text-sm"> <thead className="bg-neutral-950 text-neutral-400 uppercase text-[11px] font-semibold border-b border-neutral-800"> <tr> <th className="px-4 py-3">ID</th> <th className="px-4 py-3">Operator Full Name</th> <th className="px-4 py-3">Mobile / PayNow Number</th> <th className="px-4 py-3">Current Assignment</th> <th className="px-4 py-3 text-right">Action</th> </tr> </thead> <tbody className="divide-y divide-neutral-800/80"> {operators .filter( (op) => op.name.toLowerCase().includes(searchQuery.toLowerCase()) || op.code.toLowerCase().includes(searchQuery.toLowerCase()) || op.hp.includes(searchQuery) ) .map((op) => ( <tr key={op.id} className="hover:bg-neutral-800/50 transition-colors"> <td className="px-4 py-3.5 font-mono font-bold text-amber-400">{op.code}</td> <td className="px-4 py-3.5 font-medium text-white">{op.name}</td> <td className="px-4 py-3.5 font-mono text-neutral-300"> <span className="flex items-center gap-1.5"> <Phone className="w-3.5 h-3.5 text-emerald-400" /> {op.hp} </span> </td> <td className="px-4 py-3.5 text-neutral-300">{op.project}</td> <td className="px-4 py-3.5 text-right"> <button onClick={() =>
