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
  const [schedules, setSchedules] = useState([]);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [newSchedule, setNewSchedule] = useState({ title: '', description: '', companyId: '', operatorId: '', status: '' });

  const isAdmin = user && user.role === 'ADMIN';
  const isManager = user && user.role === 'MANAGER';
  const isAdminOrManager = isAdmin || isManager;

  // Fetch schedules based on user role
  const fetchSchedules = async () => {
    try {
      const token = localStorage.getItem('token');
      // Admin/Manager sees all company schedules
      // Operator sees their own schedules
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

  useEffect(() => {
    if (user) {
      fetchSchedules();
    }
  }, [user]);

  // Create schedule
  const handleCreateSchedule = async () => {
    if (!newSchedule.title || !newSchedule.operatorId) {
      alert("Please fill in title and operator ID");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/schedule', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
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

  // Login
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
      } else {
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setMessage('Server is not running or CORS error!');
    }
  };

  // Register
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/operators/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
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

  // Logout
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
  };

  // Delete
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

  // Edit
  const handleEditClick = (operator) => {
    setEditingUser(operator);
    setEditForm({ name: operator.name, email: operator.email });
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/operators/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
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

  if (user) {
    // ADMIN OR MANAGER DASHBOARD
    if (isAdminOrManager) {
      return (
        <div className="dashboard">
          <div className="sidebar">
            <h2>My Dashboard</h2>
            <ul>
              <li>Overview</li>
              <li>Operators</li>
              <li>Schedule</li>
              <li>Settings</li>
            </ul>
            <div style={{ marginTop: 'auto' }}>
              <button onClick={handleLogout} className="logout-btn" style={{ width: '100%' }}>Logout</button>
            </div>
          </div>

          <div className="main-content">
            <h1 className="dashboard-header">Welcome, {user.name}!</h1>

            <div className="profile-card">
              <h3>Profile Details</h3>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Company ID:</strong> {user.companyId}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </div>

            <div className="data-section">
              <h3>All Schedules</h3>
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
            <li>My Profile</li>
            <li>My Schedules</li>
            <li>Settings</li>
          </ul>
          <div style={{ marginTop: 'auto' }}>
            <button onClick={handleLogout} className="logout-btn" style={{ width: '100%' }}>Logout</button>
          </div>
        </div>

        <div className="main-content">
          <h1 className="dashboard-header">Welcome, {user.name}!</h1>

          <div className="profile-card">
            <h3>My Profile Details</h3>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Company ID:</strong> {user.companyId}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>

          <div className="data-section">
            <h3>My Schedules</h3>
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
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">{isRegistering ? 'Create Account' : 'Operator Login'}</h1>
        <form onSubmit={isRegistering ? handleRegister : handleLogin}>
          {isRegistering && (
            <div className="form-group">
              <select value={role} onChange={(e) => setRole(e.target.value)} className="form-input">
                <option value="USER">User</option>
                <option value="MANAGER">Manager</option>
                <option value="ADMIN">Admin</option>
              </select>
              <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="form-input" />
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
