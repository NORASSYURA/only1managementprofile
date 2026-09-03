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
  const [schedules, setSchedules] = useState([]);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({ title: '', description: '', companyId: '', operatorId: '', status: '' });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
const [activePage, setActivePage] = useState(() => localStorage.getItem('currentPage') || 'Overview');  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotMessage, setForgotMessage] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [jobs, setJobs] = useState([]);
  const [showJobForm, setShowJobForm] = useState(false);
  const [newJob, setNewJob] = useState({ title: '', description: '', location: '', startDate: '', endDate: '', rate: '' });
  const [offDayRequests, setOffDayRequests] = useState([]);
  const [myOffDayRequests, setMyOffDayRequests] = useState([]);
  const [showOffDayForm, setShowOffDayForm] = useState(false);
  const [newOffDay, setNewOffDay] = useState({ requestedDate: '', reason: '' });
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

  // Feedback State
  const [allFeedback, setAllFeedback] = useState([]);
  const [myFeedback, setMyFeedback] = useState([]);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [newFeedback, setNewFeedback] = useState({ jobTitle: '', rating: 5, comment: '' });

  // Document State
  const [documents, setDocuments] = useState([]);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [newDocument, setNewDocument] = useState({ fileName: '', fileType: '' });
  const [fileUrl, setFileUrl] = useState('');
  const [viewingDocs, setViewingDocs] = useState(null);

  const isAdmin = user && user.role === 'ADMIN';
  const isManager = user && user.role === 'MANAGER';
  const isAdminOrManager = isAdmin || isManager;

  const LOGO_URL = 'https://res.cloudinary.com/uywj26ei/image/upload/v1788451739/The_Only1_Profile_Management_Logo_A4.png';

    // Restore user on refresh
  useEffect(() => {
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
        // Also set the active page so it doesn't try to render a blank page
        setActivePage(localStorage.getItem('currentPage') || 'My Profile');
      } catch (e) {
        // If the data is corrupted, clear it out and show the login page
        localStorage.removeItem('userData');
        setUser(null);
      }
    }
  }, []);  useEffect(() => {
    if (user) {
      setHomeAddress(user.homeAddress || '');
      setPhoneNumber(user.phoneNumber || '');
      fetchSchedules();
      fetchJobs();
      fetchFeedback();
      fetchOffDays();
      fetchDocuments();
    }
  }, [user]);

  const fetchSchedules = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = isAdminOrManager 
        ? `https://operator-backend-1jjp.onrender.com/api/schedule/company/${user.companyId}`
        : `https://operator-backend-1jjp.onrender.com/api/schedule/operator/${user.id}`;
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setSchedules(data);
      }
    } catch (error) {
      console.log("Could not fetch schedules");
    }
  };

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/jobs/company/${user.companyId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
      }
    } catch (error) {
      console.log("Could not fetch jobs");
    }
  };

  const fetchFeedback = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = isAdminOrManager 
        ? 'https://operator-backend-1jjp.onrender.com/api/feedback/all'
        : `https://operator-backend-1jjp.onrender.com/api/feedback/operator/${user.id}`;
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        if (isAdminOrManager) {
          setAllFeedback(data);
        } else {
          setMyFeedback(data);
        }
      }
    } catch (error) {
      console.log("Could not fetch feedback");
    }
  };

  const fetchOffDays = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = isAdminOrManager 
        ? `https://operator-backend-1jjp.onrender.com/api/offday/company/${user.companyId}`
        : `https://operator-backend-1jjp.onrender.com/api/offday/operator/${user.id}`;
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        if (isAdminOrManager) {
          setOffDayRequests(data);
        } else {
          setMyOffDayRequests(data);
        }
      }
    } catch (error) {
      console.log("Could not fetch off days");
    }
  };

  const fetchDocuments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/documents/operator/${user.id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setDocuments(data);
      }
    } catch (error) {
      console.log("Could not fetch documents");
    }
  };

  const fetchOperatorDocs = async (operatorId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/documents/operator/${operatorId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setViewingDocs(data);
      } else {
        setViewingDocs([]);
      }
    } catch (error) {
      console.log("Could not fetch documents");
    }
  };

  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/uywj26ei/auto/upload';
  const UPLOAD_PRESET = 'my_preset';

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setFileUrl(data.secure_url);
      setNewDocument({ fileName: file.name, fileType: file.type });
      alert("File uploaded to Cloudinary!");
    } catch (error) {
      alert("Error uploading file.");
    }
  };

  const handleSaveDocument = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/documents/upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...newDocument, fileUrl, operatorId: user.id }),
      });
      if (response.ok) {
        alert("Document saved!");
        setShowUploadForm(false);
        setFileUrl('');
        fetchDocuments();
      } else {
        alert("Failed to save document.");
      }
    } catch (error) {
      alert("Error saving document.");
    }
  };

  const handleCreateFeedback = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/feedback/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...newFeedback, operatorId: user.id, operatorName: user.name, companyId: user.companyId }),
      });
      if (response.ok) {
        alert("Feedback submitted successfully!");
        setNewFeedback({ jobTitle: '', rating: 5, comment: '' });
        setShowFeedbackForm(false);
        fetchFeedback();
      } else {
        alert("Failed to submit feedback.");
      }
    } catch (error) {
      alert("Error submitting feedback.");
    }
  };

  const handleCreateJob = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/jobs/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...newJob, companyId: user.companyId }),
      });
      if (response.ok) {
        alert("Job posted successfully!");
        setNewJob({ title: '', description: '', location: '', startDate: '', endDate: '', rate: '' });
        setShowJobForm(false);
        fetchJobs();
      } else {
        alert("Failed to create job.");
      }
    } catch (error) {
      alert("Error creating job.");
    }
  };

  const handleCreateOffDay = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/offday/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...newOffDay, operatorId: user.id, operatorName: user.name, companyId: user.companyId }),
      });
      if (response.ok) {
        alert("Off day request submitted!");
        setNewOffDay({ requestedDate: '', reason: '' });
        setShowOffDayForm(false);
        fetchOffDays();
      } else {
        alert("Failed to submit request.");
      }
    } catch (error) {
      alert("Error submitting request.");
    }
  };

  // Cancel Off Day Function
  const handleCancelOffDay = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this request?")) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/offday/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: 'REJECTED' }), // Operator cancels by setting to REJECTED
      });
      if (response.ok) {
        alert("Request cancelled!");
        fetchOffDays();
      } else {
        alert("Failed to cancel request.");
      }
    } catch (error) {
      alert("Error cancelling request.");
    }
  };

  const handleApproveReject = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/offday/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        alert("Request updated!");
        fetchOffDays();
      } else {
        alert("Failed to update request.");
      }
    } catch (error) {
      alert("Error updating request.");
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/operators/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ name: user.name, email: user.email, rate: user.rate, homeAddress, phoneNumber }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Profile updated successfully!");
        setUser(data);
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      alert("Error updating profile.");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/operators/change-password/${user.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ password: oldPassword, newPassword: newPassword }),
      });
      const data = await response.json();
      if (response.ok) {
        setPasswordMessage('Password changed successfully!');
        setOldPassword('');
        setNewPassword('');
      } else {
        setPasswordMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setPasswordMessage('Error changing password');
    }
  };

  const handleCreateSchedule = async () => {
    if (!newSchedule.title || !newSchedule.operatorId) {
      alert("Please fill in title and operator ID");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...newSchedule, companyId: user.companyId }),
      });
      if (response.ok) {
        alert("Schedule created successfully!");
        setNewSchedule({ title: '', description: '', operatorId: '', status: '' });
        setShowScheduleForm(false);
        fetchSchedules();
      } else {
        alert("Failed to create schedule.");
      }
    } catch (error) {
      alert("Error creating schedule.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/operators/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        setUser(data.user);
                       localStorage.setItem('userData', JSON.stringify(data.user));
        setActivePage('Overview'); // <-- NEW LINE
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage('Server is not running or CORS error!');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/operators/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, homeAddress, phoneNumber }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage('Account created! Please log in.');
        setIsRegistering(false);
        setEmail(''); setPassword(''); setName('');
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage('Server is not running or CORS error!');
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      await fetch(`https://operator-backend-1jjp.onrender.com/api/operators/logout/${user.id}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
    } catch (error) {
      console.log("Could not reach server for logout");
    }
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    setUser(null);
    setMessage(''); setEmail(''); setPassword('');
    setActiveUsers([]); setCompanyUsers([]); setShowCompany(false);
    setSchedules([]);
    setRateUser(null);
    setShowForgotPassword(false);
    setForgotEmail('');
    setForgotMessage('');
    setJobs([]);
    setOffDayRequests([]);
    setMyOffDayRequests([]);
    setAllFeedback([]);
    setMyFeedback([]);
    setDocuments([]);
    setViewingDocs(null);
        localStorage.removeItem('currentPage');
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this operator?")) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/operators/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        setCompanyUsers(companyUsers.filter(op => op.id !== id));
        setActiveUsers(activeUsers.filter(op => op.id !== id));
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      alert("Error deleting user.");
    }
  };

  const handleEditClick = (operator) => {
    setEditingUser(operator);
    setEditForm({ name: operator.name, email: operator.email, phoneNumber: operator.phoneNumber });
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/operators/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ name: editForm.name, email: editForm.email, phoneNumber: editForm.phoneNumber }),
      });
      if (response.ok) {
        setCompanyUsers(companyUsers.map(op => op.id === editingUser.id ? { ...op, ...editForm } : op));
        setActiveUsers(activeUsers.map(op => op.id === editingUser.id ? { ...op, ...editForm } : op));
        setEditingUser(null);
        alert("User updated successfully!");
      } else {
        alert("Failed to update user.");
      }
    } catch (error) {
      alert("Error updating user.");
    }
  };

  const handleSaveRate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/operators/${rateUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ name: rateUser.name, email: rateUser.email, rate: parseFloat(rateForm.rate) }),
      });
      if (response.ok) {
        alert("Rate updated successfully!");
        setCompanyUsers(companyUsers.map(op => op.id === rateUser.id ? { ...op, rate: parseFloat(rateForm.rate) } : op));
        setRateUser(null);
        setRateForm({ rate: '' });
      } else {
        alert("Failed to update rate.");
      }
    } catch (error) {
      alert("Error updating rate.");
    }
  };

  const fetchCompanyUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/operators/company/${user.companyId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setCompanyUsers(data);
        setShowCompany(true);
      }
    } catch (error) {
      console.log("Could not fetch company users");
    }
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const isPublicHoliday = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return publicHolidays.find(h => h.date === dateStr);
  };

  const getOffDayStatus = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const request = myOffDayRequests.find(r => r.requestedDate === dateStr);
    return request ? request.status : null;
  };

  if (user) {
      // Redirection Fix: If the page is blank, go to a valid page
  if (!activePage) {
    setActivePage(isAdminOrManager ? 'Overview' : 'My Profile');
  }
    if (isAdminOrManager) {
      return (
        <div className="dashboard">
          <div className="sidebar">
            <img src={LOGO_URL} alt="Company Logo" style={{ maxWidth: '80px', margin: '0 auto 15px', display: 'block', borderRadius: '8px' }} />
            <div style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>
              <p style={{ fontSize: '14px', fontWeight: 'bold' }}>THE ONLY1PROFILEMANAGEMENT</p>
              <p style={{ fontSize: '12px', opacity: 0.8 }}>UEN: 53530731D</p>
            </div>
            <ul>
              <li onClick={() => setActivePage('Overview')}>Overview</li>
              <li onClick={() => { setActivePage('Operators'); if (activePage !== 'Operators') fetchCompanyUsers(); }}>Operators</li>
              <li onClick={() => setActivePage('Schedule')}>Schedule</li>
              <li onClick={() => setActivePage('Jobs')}>Jobs</li>
              <li onClick={() => setActivePage('Requests')}>
                Off Day Requests
                {offDayRequests.some(r => r.status === 'PENDING') && (
                  <span className="blinking"> 🔴</span>
                )}
              </li>
              <li onClick={() => setActivePage('Feedback')}>Feedback</li>
              <li onClick={() => setActivePage('Calendar')}>Calendar</li>
              <li onClick={() => setActivePage('Settings')}>Settings</li>
            </ul>
            <div style={{ marginTop: 'auto' }}>
              <button onClick={handleLogout} className="logout-btn" style={{ width: '100%' }}>Logout</button>
            </div>
          </div>

          <div className="main-content">
            {activePage === 'Overview' && (
              <>
                <h1 className="dashboard-header">Welcome, {user.name}!</h1>
                <div className="profile-card">
                  <h3>Profile Details</h3>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Company ID:</strong> {user.companyId}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                </div>
              </>
            )}

            {activePage === 'Operators' && (
              <>
                <h1 className="dashboard-header">Company Operators</h1>
                {showCompany && (
                  <div className="data-section">
                    <h3>Company {user.companyId} Operators</h3>
                    {companyUsers.length > 0 ? (
                      <ul className="data-list">
                        {companyUsers.map((op) => (
                          <li key={op.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span>{op.name} ({op.email}) - Rate: ${op.rate} - Phone: {op.phoneNumber}</span>
                            <div>
                              <button onClick={() => { setRateUser(op); setRateForm({ rate: op.rate }); }}>Edit Rate</button>
                              {isAdmin && (
                                <button 
                                  onClick={() => handleDelete(op.id)}
                                  style={{ 
                                    backgroundColor: '#e53e3e', 
                                    color: 'white', 
                                    border: 'none', 
                                    padding: '4px 10px', 
                                    borderRadius: '4px', 
                                    cursor: 'pointer', 
                                    marginLeft: '8px' 
                                  }}
                                >
                                  Delete
                                </button>
                              )}
                              <button 
                                onClick={() => handleEditClick(op)}
                                style={{ 
                                  backgroundColor: '#3498db', 
                                  color: 'white', 
                                  border: 'none', 
                                  padding: '4px 10px', 
                                  borderRadius: '4px', 
                                  cursor: 'pointer', 
                                  marginLeft: '8px' 
                                }}
                              >
                                Edit
                              </button>
                              <a href={`tel:${op.phoneNumber}`} style={{ marginLeft: '8px', backgroundColor: '#4CAF50', color: 'white', padding: '4px 10px', borderRadius: '4px', textDecoration: 'none', fontSize: '14px' }}>Call</a>
                              <button 
                                onClick={() => fetchOperatorDocs(op.id)}
                                style={{ 
                                  marginLeft: '8px', 
                                  backgroundColor: '#f59e0b', 
                                  color: 'white', 
                                  border: 'none', 
                                  padding: '4px 10px', 
                                  borderRadius: '4px', 
                                  cursor: 'pointer', 
                                  fontSize: '14px' 
                                }}
                              >
                                View Files
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No operators found for this company.</p>
                    )}
                  </div>
                )}
                {editingUser && (
                  <div className="data-section" style={{ marginTop: '20px' }}>
                    <h3>Edit Operator</h3>
                    <input 
                      type="text" 
                      value={editForm.name} 
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
                    />
                    <input 
                      type="email" 
                      value={editForm.email} 
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
                    />
                    <input 
                      type="text" 
                      value={editForm.phoneNumber} 
                      onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })}
                      style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
                    />
                    <button 
                      onClick={handleSaveEdit}
                      style={{ 
                        backgroundColor: '#28a745', 
                        color: 'white', 
                        border: 'none', 
                        padding: '10px 20px', 
                        cursor: 'pointer' 
                      }}
                    >
                      Save Changes
                    </button>
                    <button 
                      onClick={() => setEditingUser(null)}
                      style={{ marginLeft: '10px', padding: '10px 20px', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
                {rateUser && (
                  <div className="data-section" style={{ marginTop: '20px' }}>
                    <h3>Edit Rate for {rateUser.name}</h3>
                    <input 
                      type="number" 
                      placeholder="Rate" 
                      value={rateForm.rate} 
                      onChange={(e) => setRateForm({ rate: e.target.value })}
                      style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
                    />
                    <button 
                      onClick={handleSaveRate}
                      style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}
                    >
                      Save Rate
                    </button>
                    <button 
                      onClick={() => setRateUser(null)}
                      style={{ marginLeft: '10px', padding: '10px 20px', cursor: 'pointer' }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
                {viewingDocs && (
                  <div className="data-section" style={{ marginTop: '20px' }}>
                    <h3>Uploaded Files</h3>
                    <button onClick={() => setViewingDocs(null)} className="action-btn" style={{ backgroundColor: '#e53e3e' }}>Close</button>
                    <ul className="data-list">
                      {viewingDocs.length > 0 ? (
                        viewingDocs.map((doc) => (
                          <li key={doc.id}>
                            <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">{doc.fileName}</a>
                          </li>
                        ))
                      ) : (
                        <p>No documents uploaded for this operator.</p>
                      )}
                    </ul>
                  </div>
                )}
              </>
            )}

            {activePage === 'Schedule' && (
              <>
                <h1 className="dashboard-header">All Schedules</h1>
                <div className="data-section">
                  <button onClick={() => setShowScheduleForm(!showScheduleForm)} className="action-btn">+ Create Schedule</button>
                  {showScheduleForm && (
                    <div style={{ marginBottom: '10px' }}>
                      <input placeholder="Title" value={newSchedule.title} onChange={(e) => setNewSchedule({ ...newSchedule, title: e.target.value })} className="form-input" />
                      <input placeholder="Description" value={newSchedule.description} onChange={(e) => setNewSchedule({ ...newSchedule, description: e.target.value })} className="form-input" />
                      <input placeholder="Operator ID" value={newSchedule.operatorId} onChange={(e) => setNewSchedule({ ...newSchedule, operatorId: e.target.value })} className="form-input" />
                      <button onClick={handleCreateSchedule} className="action-btn">Save Schedule</button>
                    </div>
                  )}
                  {schedules.length > 0 ? (
                    <ul className="data-list">
                      {schedules.map((sch) => (
                        <li key={sch.id}>{sch.title} (Operator {sch.operator?.id})</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No schedules yet.</p>
                  )}
                </div>
              </>
            )}

            {activePage === 'Jobs' && (
              <>
                <h1 className="dashboard-header">Job Board</h1>
                <div className="data-section">
                  <button onClick={() => setShowJobForm(!showJobForm)} className="action-btn">+ Post Job</button>
                  {showJobForm && (
                    <div style={{ marginBottom: '10px' }}>
                      <input placeholder="Title (e.g. Relief, Adhoc)" value={newJob.title} onChange={(e) => setNewJob({ ...newJob, title: e.target.value })} className="form-input" />
                      <input placeholder="Description" value={newJob.description} onChange={(e) => setNewJob({ ...newJob, description: e.target.value })} className="form-input" />
                      <input placeholder="Location" value={newJob.location} onChange={(e) => setNewJob({ ...newJob, location: e.target.value })} className="form-input" />
                      <input type="date" placeholder="Start Date" value={newJob.startDate} onChange={(e) => setNewJob({ ...newJob, startDate: e.target.value })} className="form-input" />
                      <input type="date" placeholder="End Date" value={newJob.endDate} onChange={(e) => setNewJob({ ...newJob, endDate: e.target.value })} className="form-input" />
                      <input placeholder="Rate ($)" value={newJob.rate} onChange={(e) => setNewJob({ ...newJob, rate: e.target.value })} className="form-input" />
                      <button onClick={handleCreateJob} className="action-btn">Post Job</button>
                    </div>
                  )}
                  {jobs.length > 0 ? (
                    <ul className="data-list">
                      {jobs.map((job) => (
                        <li key={job.id}>
                          <strong>{job.title}</strong> - {job.location} - ${job.rate} 
                          <br />{job.description}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No jobs posted yet.</p>
                  )}
                </div>
              </>
            )}

            {activePage === 'Requests' && (
              <>
                <h1 className="dashboard-header">Off Day Requests</h1>
                <div className="data-section">
                  {offDayRequests.length > 0 ? (
                    <ul className="data-list">
                      {offDayRequests.map((req) => (
                        <li key={req.id} style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                          <strong>{req.operatorName}</strong> - Date: {req.requestedDate} - Status: <strong style={{ color: req.status === 'PENDING' ? 'orange' : req.status === 'APPROVED' ? 'green' : 'red' }}>{req.status}</strong>
                          <br />Reason: {req.reason}
                          {req.status === 'PENDING' && (
                            <div style={{ marginTop: '10px' }}>
                              <button onClick={() => handleApproveReject(req.id, 'APPROVED')} style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', marginRight: '10px' }}>Approve</button>
                              <button onClick={() => handleApproveReject(req.id, 'REJECTED')} style={{ backgroundColor: '#e53e3e', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px' }}>Reject</button>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No off day requests.</p>
                  )}
                </div>
              </>
            )}

            {activePage === 'Feedback' && (
              <>
                <h1 className="dashboard-header">All Feedback</h1>
                <div className="data-section">
                  {allFeedback.length > 0 ? (
                    <ul className="data-list">
                      {allFeedback.map((fb) => (
                        <li key={fb.id} style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
                          <strong>{fb.operatorName}</strong> rated <strong>{fb.jobTitle}</strong> 
                          <br />Rating: {fb.rating} / 5
                          <br />Comment: {fb.comment}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No feedback available.</p>
                  )}
                </div>
              </>
            )}

            {activePage === 'Calendar' && (
              <>
                <h1 className="dashboard-header">Singapore Calendar</h1>
                <div className="data-section">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="action-btn">← Prev</button>
                    <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                    <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="action-btn">Next →</button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                      <div key={day} style={{ textAlign: 'center', fontWeight: 'bold', padding: '10px' }}>{day}</div>
                    ))}
                    {Array.from({ length: getFirstDayOfMonth(currentDate) }).map((_, i) => (
                      <div key={`empty-${i}`}></div>
                    ))}
                    {Array.from({ length: getDaysInMonth(currentDate) }).map((_, i) => {
                      const day = i + 1;
                      const holiday = isPublicHoliday(day);
                      const offDayStatus = getOffDayStatus(day);
                      return (
                        <div key={day} style={{
                          padding: '10px',
                          textAlign: 'center',
                          border: '1px solid #eee',
                          borderRadius: '5px',
                          backgroundColor: holiday ? '#ffeb3b' : offDayStatus === 'APPROVED' ? '#c8e6c9' : offDayStatus === 'PENDING' ? '#ffe0b2' : offDayStatus === 'REJECTED' ? '#ffcdd2' : 'white'
                        }}>
                          <strong>{day}</strong>
                          {holiday && <div style={{ fontSize: '10px', color: '#f57f17' }}>{holiday.name}</div>}
                          {offDayStatus && <div style={{ fontSize: '10px' }}>{offDayStatus}</div>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {activePage === 'Settings' && (
              <>
                <h1 className="dashboard-header">Settings</h1>
                <div className="data-section">
                  <h3>Change Password</h3>
                  <form onSubmit={handleChangePassword}>
                    <input type="password" placeholder="Current Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="form-input" />
                    <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-input" />
                    <button type="submit" className="action-btn">Change Password</button>
                  </form>
                  {passwordMessage && <p style={{ color: passwordMessage.includes('Error') ? '#e53e3e' : '#38a169', marginTop: '10px' }}>{passwordMessage}</p>}
                </div>
              </>
            )}
          </div>
        </div>
      );
    }

    return (
      <div className="dashboard">
        <div className="sidebar">
          <img src={LOGO_URL} alt="Company Logo" style={{ maxWidth: '80px', margin: '0 auto 15px', display: 'block', borderRadius: '8px' }} />
          <div style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>
            <p style={{ fontSize: '14px', fontWeight: 'bold' }}>THE ONLY1PROFILEMANAGEMENT</p>
            <p style={{ fontSize: '12px', opacity: 0.8 }}>UEN: 53530731D</p>
          </div>
          <ul>
            <li onClick={() => setActivePage('My Profile')}>My Profile</li>
            <li onClick={() => setActivePage('My Schedules')}>My Schedules</li>
            <li onClick={() => setActivePage('Jobs')}>Jobs</li>
            <li onClick={() => setActivePage('My Off Days')}>My Off Days</li>
            <li onClick={() => setActivePage('Feedback')}>Feedback</li>
            <li onClick={() => setActivePage('Calendar')}>Calendar</li>
            <li onClick={() => setActivePage('Settings')}>Settings</li>
          </ul>
          <div style={{ marginTop: 'auto' }}>
            <button onClick={handleLogout} className="logout-btn" style={{ width: '100%' }}>Logout</button>
          </div>
        </div>

        <div className="main-content">
          {activePage === 'My Profile' && (
            <>
              <h1 className="dashboard-header">Welcome, {user.name}!</h1>
              <div className="profile-card">
                <h3>My Profile Details</h3>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Company ID:</strong> {user.companyId}</p>
                <p><strong>Role:</strong> {user.role}</p>
                <p><strong>Rate:</strong> ${user.rate ? user.rate : '0.00'}</p>
              </div>
              <div className="data-section" style={{ marginTop: '20px' }}>
                <h3>Update My Profile</h3>
                <form onSubmit={handleProfileUpdate}>
                  <input 
                    type="text" 
                    placeholder="Home Address" 
                    value={homeAddress} 
                    onChange={(e) => setHomeAddress(e.target.value)} 
                    className="form-input" 
                  />
                  <input 
                    type="text" 
                    placeholder="Phone Number" 
                    value={phoneNumber} 
                    onChange={(e) => setPhoneNumber(e.target.value)} 
                    className="form-input" 
                  />
                  <button type="submit" className="action-btn">Update Profile</button>
                </form>
              </div>
              <div className="data-section" style={{ marginTop: '20px' }}>
                <h3>Upload Documents</h3>
                <button onClick={() => setShowUploadForm(!showUploadForm)} className="action-btn">+ Upload File</button>
                {showUploadForm && (
                  <div style={{ marginBottom: '15px' }}>
                    <input type="file" onChange={handleFileUpload} className="form-input" />
                    {fileUrl && <button onClick={handleSaveDocument} className="action-btn" style={{ marginTop: '10px' }}>Save Document</button>}
                  </div>
                )}
                {documents.length > 0 ? (
                  <ul className="data-list">
                    {documents.map((doc) => (
                      <li key={doc.id}>
                        <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">{doc.fileName}</a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No documents uploaded yet.</p>
                )}
              </div>
            </>
          )}

          {activePage === 'My Schedules' && (
            <>
              <h1 className="dashboard-header">My Schedules</h1>
              <div className="data-section">
                {schedules.length > 0 ? (
                  <ul className="data-list">
                    {schedules.map((sch) => (
                      <li key={sch.id}>{sch.title}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No schedules available right now.</p>
                )}
              </div>
            </>
          )}

          {activePage === 'Jobs' && (
            <>
              <h1 className="dashboard-header">Job Board</h1>
              <div className="data-section">
                {jobs.length > 0 ? (
                  <ul className="data-list">
                    {jobs.map((job) => (
                      <li key={job.id}>
                        <strong>{job.title}</strong> - {job.location} - ${job.rate} 
                        <br />{job.description}
                        <br /><button className="action-btn">Sign Up</button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No jobs available.</p>
                )}
              </div>
            </>
          )}

          {activePage === 'My Off Days' && (
            <>
              <h1 className="dashboard-header">My Off Days</h1>
              <div className="data-section">
                <button onClick={() => setShowOffDayForm(!showOffDayForm)} className="action-btn">+ Request Off Day</button>
                {showOffDayForm && (
                  <div style={{ marginBottom: '15px' }}>
                    <input type="date" value={newOffDay.requestedDate} onChange={(e) => setNewOffDay({ ...newOffDay, requestedDate: e.target.value })} className="form-input" />
                    <input placeholder="Reason" value={newOffDay.reason} onChange={(e) => setNewOffDay({ ...newOffDay, reason: e.target.value })} className="form-input" />
                    <button onClick={handleCreateOffDay} className="action-btn">Submit Request</button>
                  </div>
                )}
                {myOffDayRequests.length > 0 ? (
                  <ul className="data-list">
                    {myOffDayRequests.map((req) => (
                      <li key={req.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          Date: {req.requestedDate} - Status: <strong style={{ color: req.status === 'PENDING' ? 'orange' : req.status === 'APPROVED' ? 'green' : 'red' }}>{req.status}</strong>
                        </div>
                        {/* Cancel Button for Operator */}
                                                {req.status === 'PENDING' && (
                          <button 
                            onClick={() => handleCancelOffDay(req.id)}
                            style={{ 
                              backgroundColor: '#e53e3e', 
                              color: 'white', 
                              border: 'none', 
                              padding: '4px 10px', 
                              borderRadius: '4px', 
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            Cancel
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No off day requests submitted.</p>
                )}
              </div>
            </>
          )}

          {activePage === 'Feedback' && (
            <>
              <h1 className="dashboard-header">My Feedback</h1>
              <div className="data-section">
                <button onClick={() => setShowFeedbackForm(!showFeedbackForm)} className="action-btn">+ Submit Feedback</button>
                {showFeedbackForm && (
                  <div style={{ marginBottom: '15px' }}>
                    <input placeholder="Job Title" value={newFeedback.jobTitle} onChange={(e) => setNewFeedback({ ...newFeedback, jobTitle: e.target.value })} className="form-input" />
                    <input placeholder="Comment" value={newFeedback.comment} onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })} className="form-input" />
                    <select value={newFeedback.rating} onChange={(e) => setNewFeedback({ ...newFeedback, rating: parseInt(e.target.value) })} className="form-input">
                      <option value="5">5 Stars</option>
                      <option value="4">4 Stars</option>
                      <option value="3">3 Stars</option>
                      <option value="2">2 Stars</option>
                      <option value="1">1 Star</option>
                    </select>
                    <button onClick={handleCreateFeedback} className="action-btn">Submit Feedback</button>
                  </div>
                )}
                {myFeedback.length > 0 ? (
                  <ul className="data-list">
                    {myFeedback.map((fb) => (
                      <li key={fb.id}>
                        <strong>{fb.jobTitle}</strong> - Rating: {fb.rating}/5
                        <br />Comment: {fb.comment}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No feedback submitted yet.</p>
                )}
              </div>
            </>
          )}

          {activePage === 'Calendar' && (
            <>
              <h1 className="dashboard-header">Singapore Calendar</h1>
              <div className="data-section">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))} className="action-btn">← Prev</button>
                  <h2>{currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
                  <button onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))} className="action-btn">Next →</button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px' }}>
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} style={{ textAlign: 'center', fontWeight: 'bold', padding: '10px' }}>{day}</div>
                  ))}
                  {Array.from({ length: getFirstDayOfMonth(currentDate) }).map((_, i) => (
                    <div key={`empty-${i}`}></div>
                  ))}
                  {Array.from({ length: getDaysInMonth(currentDate) }).map((_, i) => {
                    const day = i + 1;
                    const holiday = isPublicHoliday(day);
                    const offDayStatus = getOffDayStatus(day);
                    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

                    return (
                      <div key={day}
                        onClick={() => {
                          if (!holiday) {
                            if (window.confirm(`Do you want to request ${formattedDate} off?`)) {
                              setNewOffDay({ requestedDate: formattedDate, reason: 'Off Day Requested from Calendar' });
                              setTimeout(() => handleCreateOffDay(), 100);
                            }
                          }
                        }}
                        style={{
                          padding: '10px',
                          textAlign: 'center',
                          border: '1px solid #eee',
                          borderRadius: '5px',
                          cursor: holiday ? 'default' : 'pointer',
                          backgroundColor: holiday ? '#ffeb3b' : offDayStatus === 'APPROVED' ? '#c8e6c9' : offDayStatus === 'PENDING' ? '#ffe0b2' : offDayStatus === 'REJECTED' ? '#ffcdd2' : 'white'
                        }}
                      >
                        <strong>{day}</strong>
                        {holiday && <div style={{ fontSize: '10px', color: '#f57f17' }}>{holiday.name}</div>}
                        {offDayStatus && <div style={{ fontSize: '10px' }}>{offDayStatus}</div>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {activePage === 'Settings' && (
            <>
              <h1 className="dashboard-header">Settings</h1>
              <div className="data-section">
                <h3>Change Password</h3>
                <form onSubmit={handleChangePassword}>
                  <input type="password" placeholder="Current Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="form-input" />
                  <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-input" />
                  <button type="submit" className="action-btn">Change Password</button>
                </form>
                {passwordMessage && <p style={{ color: passwordMessage.includes('Error') ? '#e53e3e' : '#38a169', marginTop: '10px' }}>{passwordMessage}</p>}
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={LOGO_URL} alt="Company Logo" style={{ display: 'block', margin: '0 auto 15px', width: '150px', borderRadius: '10px', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }} />
        <h1 className="login-title" style={{ fontSize: '20px', fontWeight: '800', color: '#333', textAlign: 'center', marginBottom: '5px' }}>
          THE ONLY1PROFILEMANAGEMENT
        </h1>
        <p style={{ textAlign: 'center', marginBottom: '25px', color: '#666', fontSize: '14px' }}>UEN: 53530731D</p>

        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          {isRegistering && (
            <div className="form-group">
              <select value={role} onChange={(e) => setRole(e.target.value)} className="form-input">
                <option value="USER">User</option>
                <option value="MANAGER">Manager</option>
                <option value="ADMIN">Admin</option>
              </select>
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="form-input" />
              <input type="text" placeholder="Home Address" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} className="form-input" />
              <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="form-input" />
            </div>
          )}
          <div className="form-group">
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-input" />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-input" />
          </div>
          <button type="submit" className="login-btn">{isRegistering ? 'Sign Up' : 'Login'}</button>
        </form>
        <div style={{ textAlign: 'center', marginTop: '10px' }}>
          <button onClick={() => setShowForgotPassword(true)} style={{ color: '#667eea', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px' }}>Forgot Password?</button>
        </div>
        {showForgotPassword && (
          <div style={{ marginTop: '10px' }}>
            <form onSubmit={handleForgotPassword}>
              <input type="email" placeholder="Enter your email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} className="form-input" />
              <button type="submit" className="login-btn" style={{ marginTop: '10px' }}>Reset Password</button>
            </form>
            {forgotMessage && <p style={{ color: forgotMessage.includes('Error') ? '#e53e3e' : '#38a169', marginTop: '10px', textAlign: 'center', fontWeight: 'bold', padding: '10px', borderRadius: '5px', backgroundColor: forgotMessage.includes('Error') ? '#fce4e4' : '#e6fffa' }}>{forgotMessage}</p>}
          </div>
        )}
        <div className="error-msg">{message}</div>
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          {isRegistering ? (
            <p>Already have an account? <button onClick={() => setIsRegistering(false)} style={{ color: '#667eea', background: 'none', border: 'none', cursor: 'pointer' }}>Login</button></p>
          ) : (
            <p>Don't have an account? <button onClick={() => setIsRegistering(true)} style={{ color: '#667eea', background: 'none', border: 'none', cursor: 'pointer' }}>Sign Up</button></p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
