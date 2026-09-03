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
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [rateForm, setRateForm] = useState({ rate: '' });
  const [rateUser, setRateUser] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({ title: '', description: '', companyId: '', operatorId: '', status: '' });
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [activePage, setActivePage] = useState('Overview');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
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

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [publicHolidays, setPublicHolidays] = useState([]);

  const isAdmin = user && user.role === 'ADMIN';
  const isManager = user && user.role === 'MANAGER';
  const isAdminOrManager = isAdmin || isManager;

  // Fetch Singapore Public Holidays
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const year = currentDate.getFullYear();
        const response = await fetch(`https://date.nager.at/Api/v2/PublicHolidays/${year}/SG`);
        const data = await response.json();
        setPublicHolidays(data);
      } catch (error) {
        console.log("Could not fetch holidays");
      }
    };
    fetchHolidays();
  }, [currentDate]);

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

  useEffect(() => {
    if (user) {
      setHomeAddress(user.homeAddress || '');
      setPhoneNumber(user.phoneNumber || '');
      fetchSchedules();
      fetchJobs();
      fetchOffDays();
    }
  }, [user]);

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
        setActivePage(data.user.role === 'ADMIN' || data.user.role === 'MANAGER' ? 'Overview' : 'My Profile');
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
    setEditForm({ name: operator.name, email: operator.email });
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/operators/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(editForm),
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

  // Calendar Helper Functions
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
    // ADMIN OR MANAGER DASHBOARD
    if (isAdminOrManager) {
      return (
        <div className="dashboard">
          <div className="sidebar">
            <h2>My Dashboard</h2>
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
                            <span>{op.name} ({op.email}) - Rate: ${op.rate}</span>
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
                          <strong>{req.operatorName}</strong> - Date: {req.requestedDate} - Status: <strong style={{ color: req.status === 'PENDING' ? 'orange' : 'green' }}>{req.status}</strong>
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

    // NORMAL USER DASHBOARD
    return (
      <div className="dashboard">
        <div className="sidebar">
          <h2>My Dashboard</h2>
          <ul>
            <li onClick={() => setActivePage('My Profile')}>My Profile</li>
            <li onClick={() => setActivePage('My Schedules')}>My Schedules</li>
            <li onClick={() => setActivePage('Jobs')}>Jobs</li>
            <li onClick={() => setActivePage('My Off Days')}>My Off Days</li>
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
                    <input type="date
