import { useState, useEffect } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [companyUsers, setCompanyUsers] = useState([]);
  const [showCompany, setShowCompany] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [role, setRole] = useState('USER');
  const [editingUser, setEditingUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', phoneNumber: '' });
  const [rateForm, setRateForm] = useState({ rate: '' });
  const [rateUser, setRateUser] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [showJobForm, setShowJobForm] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', description: '', location: '', startDate: '', endDate: '', rate: '' });
  const [offDayRequests, setOffDayRequests] = useState([]);
  const [myOffDayRequests, setMyOffDayRequests] = useState([]);
  const [showOffDayForm, setShowOffDayForm] = useState(false);
  const [newOffDay, setNewOffDay] = useState({ requestedDate: '', reason: '' });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [activePage, setActivePage] = useState('Overview');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nric, setNric] = useState('');
  const [jobPosition, setJobPosition] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [publicHolidays, setPublicHolidays] = useState([
    { date: '2026-01-01', name: 'New Year\'s Day' },
    { date: '2026-02-17', name: 'Chinese New Year' },
    { date: '2026-02-18', name: 'Chinese New Year' },
    { date: '2026-04-03', name: 'Good Friday' },
    { date: '2026-05-01', name: 'Labour Day' },
    { date: '2026-05-21', name: 'Vesak Day' },
    { date: '2026-06-08', name: 'Hari Raya Puasa' },
    { date: '2026-08-09', name: 'National Day' },
    { date: '2026-09-17', name: 'Hari Raya Haji' },
    { date: '2026-10-20', name: 'Deepavali' },
    { date: '2026-12-25', name: 'Christmas Day' }
  ]);

  const [allFeedback, setAllFeedback] = useState([]);
  const [myFeedback, setMyFeedback] = useState([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [newFeedback, setNewFeedback] = useState({ jobTitle: '', rating: 5, comment: '' });
  const [documents, setDocuments] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newDocument, setNewDocument] = useState({ fileName: '', fileType: '' });
  const [fileUrl, setFileUrl] = useState('');
  const [viewingDocs, setViewingDocs] = useState(null);
  const [relieveRequests, setRelieveRequests] = useState([]);
  const [newRelieve, setNewRelieve] = useState({ date: '', jobPosition: '' });

  const isAdmin = user && user.role === 'ADMIN';
  const isManager = user && user.role === 'MANAGER';
  const isAdminOrManager = isAdmin || isManager;
  const LOGO_URL = 'https://res.cloudinary.com/uywj26ei/image/upload/v1788451739/The_Only1_Profile_Management_Logo_A4.png';

  const fetchOffDays = async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/offday/company/${user.companyId}`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (response.ok) { const data = await response.json(); setOffDayRequests(data); setMyOffDayRequests(data); }
    } catch (error) { console.log("Could not fetch off days"); }
  };

  const fetchRelieve = async () => {
    if (!user) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/relieve/company/${user.companyId}`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (response.ok) { const data = await response.json(); setRelieveRequests(data); }
    } catch (error) { console.log("Could not fetch relieve requests"); }
  };

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/jobs/company/${user.companyId}`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (response.ok) { const data = await response.json(); setJobs(data); }
    } catch (error) { console.log("Could not fetch jobs"); }
  };

  const fetchFeedback = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = isAdminOrManager ? 'https://operator-backend-1jjp.onrender.com/api/feedback/all' : `https://operator-backend-1jjp.onrender.com/api/feedback/operator/${user.id}`;
      const response = await fetch(url, { headers: { 'Authorization': `Bearer ${token}` } });
      if (response.ok) { const data = await response.json(); setAllFeedback(data); setMyFeedback(data); }
    } catch (error) { console.log("Could not fetch feedback"); }
  };

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/documents/operator/${user.id}`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (response.ok) { const data = await response.json(); setDocuments(data); }
    } catch (error) { console.log("Could not fetch documents"); }
  };

  const fetchOperatorDocs = async (operatorId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/documents/operator/${operatorId}`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (response.ok) { const data = await response.json(); setViewingDocs(data); } else { setViewingDocs([]); }
    } catch (error) { console.log("Could not fetch documents"); }
  };

  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/uywj26ei/auto/upload';
  const UPLOAD_PRESET = 'my_preset';

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    const formData = new FormData(); formData.append('file', file); formData.append('upload_preset', UPLOAD_PRESET);
    try { const response = await fetch(CLOUDINARY_URL, { method: 'POST', body: formData }); const data = await response.json(); setFileUrl(data.secure_url); setNewDocument({ fileName: file.name, fileType: file.type }); alert("File uploaded to Cloudinary!"); } catch (error) { alert("Error uploading file."); }
  };

  const handleSaveDocument = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/documents/upload', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ ...newDocument, fileUrl, operatorId: user.id }) });
      if (response.ok) { alert("Document saved!"); setShowUploadForm(false); setFileUrl(''); fetchDocuments(); } else { alert("Failed to save document."); }
    } catch (error) { alert("Error saving document."); }
  };

  const handleCreateFeedback = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/feedback/submit', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ ...newFeedback, operatorId: user.id, operatorName: user.name, companyId: user.companyId }) });
      if (response.ok) { alert("Feedback submitted successfully!"); setNewFeedback({ jobTitle: '', rating: 5, comment: '' }); setShowFeedbackForm(false); fetchFeedback(); } else { alert("Failed to submit feedback."); }
    } catch (error) { alert("Error submitting feedback."); }
  };

  const handleCreateJob = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/jobs/create', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ ...newJob, companyId: user.companyId }) });
      if (response.ok) { alert("Job posted successfully!"); setNewJob({ title: '', description: '', location: '', startDate: '', endDate: '', rate: '' }); setShowJobForm(false); fetchJobs(); } else { alert("Failed to create job."); }
    } catch (error) { alert("Error creating job."); }
  };

  const handleCancelOffDay = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this request?")) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/offday/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ status: 'REJECTED' }) });
      if (response.ok) { alert("Request cancelled!"); fetchOffDays(); } else { alert("Failed to cancel request."); }
    } catch (error) { alert("Error cancelling request."); }
  };

  const handleCreateOffDay = async () => {
    if (!newOffDay.requestedDate) { alert("Please select a date first!"); return; }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/offday/request', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ ...newOffDay, operatorId: user.id, operatorName: user.name, companyId: user.companyId }) });
      if (response.ok) { alert("Off day request submitted!"); setNewOffDay({ requestedDate: '', reason: '' }); setShowOffDayForm(false); fetchOffDays(); } else { alert("Failed to submit request."); }
    } catch (error) { alert("Error submitting request."); }
  };

  const handleCreateRelieve = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/relieve/create', { method: 'POST', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ ...newRelieve, relieverId: user.id, relieverName: user.name, companyId: user.companyId }) });
      if (response.ok) { alert("Relieve request submitted!"); setNewRelieve({ date: '', jobPosition: '' }); fetchRelieve(); } else { alert("Failed to submit request."); }
    } catch (error) { alert("Error submitting request."); }
  };

  const handleApproveReject = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/offday/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ status }) });
      if (response.ok) { alert("Request updated!"); fetchOffDays(); } else { alert("Failed to update request."); }
    } catch (error) { alert("Error updating request."); }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/operators/${user.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ name: user.name, email: user.email, rate: user.rate, homeAddress, phoneNumber, nric, jobPosition }) });
      const data = await response.json();
      if (response.ok) { alert("Profile updated successfully!"); setUser(data); } else { alert("Failed to update profile."); }
    } catch (error) { alert("Error updating profile."); }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/operators/change-password/${user.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ password: oldPassword, newPassword: newPassword }) });
      const data = await response.json();
      if (response.ok) { setPasswordMessage('Password changed successfully!'); setOldPassword(''); setNewPassword(''); } else { setPasswordMessage(`Error: ${data.message}`); }
    } catch (error) { setPasswordMessage('Error changing password'); }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/operators/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      const data = await response.json();
      if (response.ok) { localStorage.setItem('token', data.token); setUser(data.user); localStorage.setItem('userData', JSON.stringify(data.user)); setActivePage('Overview'); localStorage.setItem('currentPage', 'Overview'); fetchOffDays(); fetchRelieve(); } else { setMessage(`Error: ${data.message}`); }
    } catch (error) { setMessage('Server is not running or CORS error!'); }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/operators/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, password, role, homeAddress, phoneNumber }) });
      const data = await response.json();
      if (response.ok) { setMessage('Account created! Please log in.'); setIsRegistering(false); setEmail(''); setPassword(''); setName(''); } else { setMessage(`Error: ${data.message}`); }
    } catch (error) { setMessage('Server is not running or CORS error!'); }
  };

  const handleLogout = async () => {
    try { const token = localStorage.getItem('token'); await fetch(`https://operator-backend-1jjp.onrender.com/api/operators/logout/${user.id}`, { method: 'POST', headers: { 'Authorization': `Bearer ${token}` } }); } catch (error) { console.log("Could not reach server for logout"); }
    localStorage.removeItem('token'); localStorage.removeItem('userData'); localStorage.removeItem('currentPage'); setUser(null); setMessage(''); setEmail(''); setPassword(''); setActiveUsers([]); setCompanyUsers([]); setShowCompany(false); setRateUser(null); setShowForgotPassword(false); setForgotEmail(''); setForgotMessage(''); setJobs([]); setOffDayRequests([]); setMyOffDayRequests([]); setAllFeedback([]); setMyFeedback([]); setDocuments([]); setViewingDocs(null); setRelieveRequests([]);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this operator?")) return;
    try { const token = localStorage.getItem('token'); const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/operators/${id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } }); if (response.ok) { setCompanyUsers(companyUsers.filter(op => op.id !== id)); setActiveUsers(activeUsers.filter(op => op.id !== id)); } else { alert("Failed to delete user."); } } catch (error) { alert("Error deleting user."); }
  };

  const handleEditClick = (operator) => { setEditingUser(operator); setEditForm({ name: operator.name, email: operator.email, phoneNumber: operator.phoneNumber }); };

  const handleSaveEdit = async () => {
    try { const token = localStorage.getItem('token'); const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/operators/${editingUser.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ name: editForm.name, email: editForm.email, phoneNumber: editForm.phoneNumber }) }); if (response.ok) { setCompanyUsers(companyUsers.map(op => op.id === editingUser.id ? { ...op, ...editForm } : op)); setActiveUsers(activeUsers.map(op => op.id === editingUser.id ? { ...op, ...editForm } : op)); setEditingUser(null); alert("User updated successfully!"); } else { alert("Failed to update user."); } } catch (error) { alert("Error updating user."); }
  };

  const handleSaveRate = async () => {
    try { const token = localStorage.getItem('token'); const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/operators/${rateUser.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, body: JSON.stringify({ name: rateUser.name, email: rateUser.email, rate: parseFloat(rateForm.rate) }) }); if (response.ok) { alert("Rate updated successfully!"); setCompanyUsers(companyUsers.map(op => op.id === rateUser.id ? { ...op, rate: parseFloat(rateForm.rate) } : op)); setRateUser(null); setRateForm({ rate: '' }); } else { alert("Failed to update rate."); } } catch (error) { alert("Error updating rate."); }
  };

  const fetchCompanyUsers = async () => {
    try { const token = localStorage.getItem('token'); const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/operators/company/${user.companyId}`, { headers: { 'Authorization': `Bearer ${token}` } }); if (response.ok) { const data = await response.json(); setCompanyUsers(data); setShowCompany(true); } } catch (error) { console.log("Could not fetch company users"); }
  };

  const getDaysInMonth = (date) => { return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate(); };
  const getFirstDayOfMonth = (date) => { return new Date(date.getFullYear(), date.getMonth(), 1).getDay(); };

  const isPublicHoliday = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return publicHolidays.find(h => h.date === dateStr);
  };

  const getOffDayStatus = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const request = offDayRequests.find(r => r.requestedDate === dateStr);
    return request ? { ...request, dateStr: dateStr } : null;
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try { const response = await fetch('https://operator-backend-1jjp.onrender.com/api/operators/forgot-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: forgotEmail }) }); const data = await response.json(); if (response.ok) { setForgotMessage(`Password reset successful! Please use this temporary password: ${data.message.split(': ')[1]} to log in, then change it in Settings.`); } else { setForgotMessage(`Error: ${data.message}`); } } catch (error) { setForgotMessage('Server is not running or CORS error!'); }
  };

  useEffect(() => {
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser); setHomeAddress(parsedUser.homeAddress || ''); setPhoneNumber(parsedUser.phoneNumber || ''); setNric(parsedUser.nric || ''); setJobPosition(parsedUser.jobPosition || '');
        const page = localStorage.getItem('currentPage'); setActivePage(page || 'Overview');
        const token = localStorage.getItem('token');
        if (token && parsedUser) { fetchOffDays(); fetchRelieve(); }
      } catch (e) { localStorage.removeItem('userData'); }
    }
  }, []);

  useEffect(() => {
    if (user && activePage === 'Requests') { fetchOffDays(); }
  }, [user, activePage]);

  if (user && isAdminOrManager) {
    return (
      <div className="dashboard">
        <div className="sidebar">
          <img src={LOGO_URL} alt="Company Logo" style={{ maxWidth: '80px', margin: '0 auto 15px', display: 'block', borderRadius: '8px' }} />
          <div style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>
            <p style={{ fontSize: '14px', fontWeight: 'bold' }}>THE ONLY1PROFILEMANAGEMENT</p>
            <p style={{ fontSize: '12px', opacity: 0.8 }}>UEN: 53530731D</p>
          </div>
          <ul>
            <li onClick={() => { setActivePage('Overview'); localStorage.setItem('currentPage', 'Overview'); }}>Overview</li>
            <li onClick={() => { setActivePage('Operators'); localStorage.setItem('currentPage', 'Operators'); fetchCompanyUsers(); }}>Operators</li>
            <li onClick={() => { setActivePage('Jobs'); localStorage.setItem('currentPage', 'Jobs'); }}>Jobs</li>
            <li onClick={() => { setActivePage('Requests'); localStorage.setItem('currentPage', 'Requests'); fetchOffDays(); }}>Off Day Requests{offDayRequests.some(r => r.status === 'PENDING') && (<span className="blinking"> 🔴</span>)}</li>
            <li onClick={() => { setActivePage('Feedback'); localStorage.setItem('currentPage', 'Feedback'); }}>Feedback</li>
            <li onClick={() => { setActivePage('Calendar'); localStorage.setItem('currentPage', 'Calendar'); fetchOffDays(); fetchRelieve(); }}>Calendar</li>
            <li onClick={() => { setActivePage('Settings'); localStorage.setItem('currentPage', 'Settings'); }}>Settings</li>
          </ul>
          <div style={{ marginTop: 'auto' }}><button onClick={handleLogout} className="logout-btn" style={{ width: '100%' }}>Logout</button></div>
        </div>

        <div className="main-content">
          {activePage === 'Overview' && (<><h1 className="dashboard-header">Welcome, {user.name}!</h1><div className="profile-card"><h3>Profile Details</h3><p><strong>Email:</strong> {user.email}</p><p><strong>Company ID:</strong> {user.companyId}</p><p><strong>Role:</strong> {user.role}</p></div></>)}

          {activePage === 'Operators' && (<><h1 className="dashboard-header">Company Operators</h1>{showCompany && (<div className="data-section"><h3>Company {user.companyId} Operators</h3>{companyUsers.length > 0 ? (<ul className="data-list">{companyUsers.map((op) => (<li key={op.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><span>{op.name} ({op.email}) - Phone: {op.phoneNumber} - NRIC: {op.nric} - Job: {op.jobPosition} - Address: {op.homeAddress}</span><div>{isAdmin && (<button onClick={() => handleDelete(op.id)} style={{ backgroundColor: '#e53e3e', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', marginLeft: '8px' }}>Delete</button>)}<button onClick={() => handleEditClick(op)} style={{ backgroundColor: '#3498db', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', marginLeft: '8px' }}>Edit</button><a href={`tel:${op.phoneNumber}`} style={{ marginLeft: '8px', backgroundColor: '#4CAF50', color: 'white', padding: '4px 10px', borderRadius: '4px', textDecoration: 'none', fontSize: '14px' }}>Call</a><button onClick={() => fetchOperatorDocs(op.id)} style={{ marginLeft: '8px', backgroundColor: '#f59e0b', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>View Files</button></div></li>))}</ul>) : (<p>No operators found for this company.</p>)}</div>)}

          {viewingDocs && (<div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}><div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', maxWidth: '500px', width: '90%', maxHeight: '80vh', overflowY: 'auto', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}><h3 style={{ color: '#f59e0b', marginBottom: '15px' }}>📄 Operator Documents</h3>{viewingDocs.length > 0 ? (<ul style={{ listStyle: 'none', padding: 0 }}>{viewingDocs.map((doc) => (<li key={doc.id} style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}><a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#3498db', textDecoration: 'none', fontWeight: '500' }}>📎 {doc.fileName || "Untitled Document"}</a><span style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>({doc.fileType || "Unknown"})</span></li>))}</ul>) : (<p style={{ color: '#666' }}>No documents found for this operator.</p>)}<button onClick={() => setViewingDocs(null)} style={{ marginTop: '15px', backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '8px 20px', borderRadius: '5px', cursor: 'pointer', fontSize: '14px' }}>Close</button></div></div>)}

          {activePage === 'Jobs' && (<><h1 className="dashboard-header">Job Board</h1><div className="data-section"><button onClick={() => setShowJobForm(!showJobForm)} className="action-btn">+ Post Job</button>{showJobForm && (<div style={{ marginBottom: '10px' }}><input placeholder="Title (e.g. Relief, Adhoc)" value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} className="form-input" /><input placeholder="Description" value={newJob.description} onChange={(e) => setNewJob({ ...newJob, description: e.target.value })} className="form-input" /><input placeholder="Location" value={newJob.location} onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} className="form-input" /><input type="date" placeholder="Start Date" value={newJob.startDate} onChange={(e) => setNewJob({ ...newJob, startDate: e.target.value })} className="form-input" /><input type="date" placeholder="End Date" value={newJob.endDate} onChange={(e) => setNewJob({ ...newJob, endDate: e.target.value })} className="form-input" /><input placeholder="Rate ($)" value={newJob.rate} onChange={(e) => setNewJob({ ...newJob, rate: e.target.value })} className="form-input" /><button onClick={handleCreateJob} className="action-btn">Post Job</button></div>)}{jobs.length > 0 ? (<ul className="data-list">{jobs.map((job) => (<li key={job.id}><strong>{job.title}</strong> - {job.location} - ${job.rate}<br />{job.description}</li>))}</ul>) : (<p>No jobs posted yet.</p>)}</div></>)}

          {activePage === 'Requests' && (<><h1 className="dashboard-header">Off Day Requests</h1><div className="data-section">{offDayRequests.length > 0 ? (<ul className="data-list">{offDayRequests.map((req) => (<li key={req.id} style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}><strong>{req.operatorName}</strong> - Date: <strong>{req.requestedDate ? req.requestedDate.split('T')[0] : (req.date ? req.date : "Date Not Found")}</strong> - Status: <strong style={{ color: req.status === 'PENDING' ? 'orange' : req.status === 'APPROVED' ? 'green' : 'red' }}>{req.status}</strong><br />Reason: {req.reason}{req.status === 'PENDING' && (<button onClick={() => handleCancelOffDay(req.id)} style={{ backgroundColor: '#e53e3e', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>Cancel</button>)}{isManager && req.status === 'PENDING' && (<div style={{ marginTop: '10px', marginLeft: '10px', display: 'inline-block' }}><button onClick={() => handleApproveReject(req.id, 'APPROVED')} style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', marginRight: '10px' }}>Approve</button><button onClick={() => handleApproveReject(req.id, 'REJECTED')} style={{ backgroundColor: '#e53e3e', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}>Reject</button></div>)}</li>))}</ul>) : (<p>No off day requests.</p>)}</div></>)}

          {activePage === 'Feedback' && (<><h1 className="dashboard-header">All Feedback</h1><div className="data-section">{allFeedback.length > 0 ? (<ul className="data-list">{allFeedback.map((fb) => (<li key={fb.id}><strong>{fb.operatorName}</strong> rated <strong>{fb.jobTitle}</strong><br />Rating: {fb.rating} / 5<br />Comment: {fb.comment}</li>))}</ul>) : (<p>No feedback available.</p>)}</div></>)}

          {activePage === 'Calendar' && (<><h1 className="dashboard-header">Singapore Calendar</h1><div className="data-section"><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}><button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="action-btn">← Prev</button><h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2><button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="action-btn">Next →</button></div><div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>{['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (<div key={day} style={{ textAlign: 'center', fontWeight: 'bold', padding: '10px' }}>{day}</div>))}{Array.from({ length: getFirstDayOfMonth(currentDate) }).map((_, i) => (<div key={`empty-${i}`}></div>))}{Array.from({ length: getDaysInMonth(currentDate) }).map((_, i) => {const day = i + 1;
           const holiday = isPublicHoliday(day); const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`; const offDayStatus = getOffDayStatus(day); return (<div key={day} onClick={() => {if (!holiday && (!offDayStatus || offDayStatus.status === 'REJECTED')) { const reason = window.prompt(`Do you want to request ${formattedDate} off? Please enter a reason:`); if (reason) { setNewOffDay({ requestedDate: formattedDate, reason: reason }); setTimeout(() => handleCreateOffDay(), 100); } } else if (offDayStatus && offDayStatus.status === 'PENDING') { alert("Off day request already pending."); } else if (offDayStatus && offDayStatus.status === 'APPROVED') { alert("Off day already approved."); }}} style={{ padding: '10px', textAlign: 'center', border: '1px solid #eee', borderRadius: '5px', cursor: 'pointer', backgroundColor: holiday ? '#ffeb3b' : offDayStatus === 'APPROVED' ? '#c8e6c9' : offDayStatus === 'PENDING' ? '#ffe0b2' : offDayStatus === 'REJECTED' ? '#ffcdd2' : 'white' }}><strong>{day}</strong>{holiday && <div style={{ fontSize: '10px', color: '#f57f17' }}>{holiday.name}</div>}{offDayStatus && <div style={{ fontSize: '10px', fontWeight: 'bold' }}>{offDayStatus.operatorName} {offDayStatus.status}</div>}{relieveRequests.filter(r => r.date === formattedDate).map((relief) => (<div key={relief.id} style={{ fontSize: '10px', color: '#007bff' }}>Relief: {relief.relieverName}</div>))}</div>);})}</div></div></>)}

          {activePage === 'Settings' && (<><h1 className="dashboard-header">Settings</h1><div className="data-section"><h3>Change Password</h3><form onSubmit={handleChangePassword}><input type="password" placeholder="Current Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="form-input" /><input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-input" /><button type="submit" className="action-btn">Change Password</button></form></div></>)}
