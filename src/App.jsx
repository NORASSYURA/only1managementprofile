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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/operators/login', {
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

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/operators/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
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
      await fetch(`http://localhost:8080/api/operators/logout/${user.id}`, {
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
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this operator?")) return;
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/operators/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      if (response.ok) {
        // Update the list without the deleted user
        setCompanyUsers(companyUsers.filter(op => op.id !== id));
        setActiveUsers(activeUsers.filter(op => op.id !== id));
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      alert("Error deleting user.");
    }
  };

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/operators/active', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setActiveUsers(data);
        }
      } catch (error) {
        console.log("Could not fetch active users");
      }
    };
    if (user) fetchActiveUsers();
  }, [user]);

  const fetchCompanyUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:8080/api/operators/company/${user.companyId}`, {
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
    return (
      <div className="dashboard">
        <div className="sidebar">
          <h2>My Dashboard</h2>
          <ul>
            <li>Overview</li>
            <li>Operators</li>
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
          </div>

          <div className="data-section">
            <h3>Currently Active Operators</h3>
            {activeUsers.length > 0 ? (
              <ul className="data-list">
                {activeUsers.map((op) => (
                  <li key={op.id}>{op.name} ({op.email})</li>
                ))}
              </ul>
            ) : (
              <p>No active operators right now.</p>
            )}
          </div>

          <button onClick={fetchCompanyUsers} className="action-btn">
            Show My Company Operators
          </button>

          {showCompany && (
            <div className="data-section">
              <h3>Company {user.companyId} Operators</h3>
              {companyUsers.length > 0 ? (
                <ul className="data-list">
                  {companyUsers.map((op) => (
                    <li key={op.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span>{op.name} ({op.email})</span>
                      <button 
                        onClick={() => handleDelete(op.id)}
                        style={{ 
                          backgroundColor: '#e53e3e', 
                          color: 'white', 
                          border: 'none', 
                          padding: '4px 10px', 
                          borderRadius: '4px', 
                          cursor: 'pointer' 
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No operators found for this company.</p>
              )}
            </div>
          )}
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