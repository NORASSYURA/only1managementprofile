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

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/jobs/company/${user.companyId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) { const data = await response.json(); setJobs(data); }
    } catch (error) { console.log("Could not fetch jobs"); }
  };

  const fetchOffDays = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = `https://operator-backend-1jjp.onrender.com/api/offday/company/${user.companyId}`;
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) { const data = await response.json(); setOffDayRequests(data); setMyOffDayRequests(data); }
    } catch (error) { console.log("Could not fetch off days"); }
  };

  const fetchRelieve = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/relieve/company/${user.companyId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) { const data = await response.json(); setRelieveRequests(data); }
    } catch (error) { console.log("Could not fetch relieve requests"); }
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
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/documents/operator/${user.id}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) { const data = await response.json(); setDocuments(data); }
    } catch (error) { console.log("Could not fetch documents"); }
  };

  const fetchOperatorDocs = async (operatorId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/documents/operator/${operatorId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) { const data = await response.json(); setViewingDocs(data); }
      else { setViewingDocs([]); }
    } catch (error) { console.log("Could not fetch documents"); }
  };

  const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/uywj26ei/auto/upload';
  const UPLOAD_PRESET = 'my_preset';

  const handleFileUpload = async (e) => {
    const file = e.target.files[0]; if (!file) return;
    const formData = new FormData();
    formData.append('file', file); formData.append('upload_preset', UPLOAD_PRESET);
    try {
      const response = await fetch(CLOUDINARY_URL, { method: 'POST', body: formData });
      const data = await response.json();
      setFileUrl(data.secure_url); setNewDocument({ fileName: file.name, fileType: file.type });
      alert("File uploaded to Cloudinary!");
    } catch (error) { alert("Error uploading file."); }
  };

  const handleSaveDocument = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/documents/upload', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, 
        body: JSON.stringify({ ...newDocument, fileUrl, operatorId: user.id }) 
      });
      if (response.ok) { 
        alert("Document saved!"); 
        setShowUploadForm(false); 
        setFileUrl(''); 
        fetchDocuments(); 
      } else { 
        alert("Failed to save document."); 
      }
    } catch (error) { alert("Error saving document."); }
  };

  const handleCreateFeedback = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/feedback/submit', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, 
        body: JSON.stringify({ ...newFeedback, operatorId: user.id, operatorName: user.name, companyId: user.companyId }) 
      });
      if (response.ok) { 
        alert("Feedback submitted successfully!"); 
        setNewFeedback({ jobTitle: '', rating: 5, comment: '' }); 
        setShowFeedbackForm(false); 
        fetchFeedback(); 
      } else { 
        alert("Failed to submit feedback."); 
      }
    } catch (error) { alert("Error submitting feedback."); }
  };

  const handleCreateJob = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/jobs/create', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, 
        body: JSON.stringify({ ...newJob, companyId: user.companyId }) 
      });
      if (response.ok) { 
        alert("Job posted successfully!"); 
        setNewJob({ title: '', description: '', location: '', startDate: '', endDate: '', rate: '' }); 
        setShowJobForm(false); 
        fetchJobs(); 
      } else { 
        alert("Failed to create job."); 
      }
    } catch (error) { alert("Error creating job."); }
  };

  const handleCancelOffDay = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this request?")) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/offday/${id}`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, 
        body: JSON.stringify({ status: 'REJECTED' }) 
      });
      if (response.ok) { alert("Request cancelled!"); fetchOffDays(); } 
      else { alert("Failed to cancel request."); }
    } catch (error) { alert("Error cancelling request."); }
  };

  const handleCreateOffDay = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/offday/request', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, 
        body: JSON.stringify({ ...newOffDay, operatorId: user.id, operatorName: user.name, companyId: user.companyId }) 
      });
      if (response.ok) { 
        alert("Off day request submitted!"); 
        setNewOffDay({ requestedDate: '', reason: '' }); 
        setShowOffDayForm(false); 
        fetchOffDays(); 
      } else { 
        alert("Failed to submit request."); 
      }
    } catch (error) { alert("Error submitting request."); }
  };

  const handleCreateRelieve = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/relieve/create', { 
        method: 'POST', 
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, 
        body: JSON.stringify({ ...newRelieve, relieverId: user.id, relieverName: user.name, companyId: user.companyId }) 
      });
      if (response.ok) { 
        alert("Relieve request submitted!"); 
        setNewRelieve({ date: '', jobPosition: '' }); 
        fetchRelieve(); 
      } else { 
        alert("Failed to submit request."); 
      }
    } catch (error) { alert("Error submitting request."); }
  };

  const handleApproveReject = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/offday/${id}`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, 
        body: JSON.stringify({ status }) 
      });
      if (response.ok) { alert("Request updated!"); fetchOffDays(); } 
      else { alert("Failed to update request."); }
    } catch (error) { alert("Error updating request."); }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/operators/${user.id}`, { 
        method: 'PUT', 
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }, 
        body: JSON.stringify({ 
          name: user.name, 
          email: user.email, 
          rate: user.rate, 
          homeAddress, 
          phoneNumber, 
          nric, 
          jobPosition 
        }) 
      });
      if (response.ok) { 
        alert("Profile updated successfully!"); 
        const updatedUser = await response.json(); 
        setUser(updatedUser); 
      } else { 
        alert("Failed to update profile."); 
      }
    } catch (error) { alert("Error updating profile."); }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setUser(data.user);
        setMessage('Login successful!');
        setEmail('');
        setPassword('');
      } else {
        setMessage('Invalid credentials');
      }
    } catch (error) {
      setMessage('Login error');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role })
      });
      if (response.ok) {
        setMessage('Registration successful! Please login.');
        setIsRegistering(false);
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setMessage('Registration failed');
      }
    } catch (error) {
      setMessage('Registration error');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setActivePage('Overview');
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ oldPassword, newPassword })
      });
      if (response.ok) {
        setPasswordMessage('Password changed successfully!');
        setOldPassword('');
        setNewPassword('');
      } else {
        setPasswordMessage('Failed to change password');
      }
    } catch (error) {
      setPasswordMessage('Error changing password');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail })
      });
      if (response.ok) {
        setForgotMessage('Password reset link sent to your email!');
        setForgotEmail('');
      } else {
        setForgotMessage('Email not found');
      }
    } catch (error) {
      setForgotMessage('Error sending reset link');
    }
  };

  const fetchActiveUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/operators/active', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setActiveUsers(data);
      }
    } catch (error) {
      console.log('Error fetching active users');
    }
  };

  const fetchCompanyUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/operators/company/${user.companyId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setCompanyUsers(data);
      }
    } catch (error) {
      console.log('Error fetching company users');
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditForm({ name: user.name, email: user.email, phoneNumber: user.phoneNumber || '' });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/operators/${editingUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify(editForm)
      });
      if (response.ok) {
        alert('User updated successfully!');
        setEditingUser(null);
        fetchCompanyUsers();
      } else {
        alert('Failed to update user');
      }
    } catch (error) {
      alert('Error updating user');
    }
  };

  const handleRateUser = (user) => {
    setRateUser(user);
    setRateForm({ rate: user.rate || '' });
  };

  const handleUpdateRate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/operators/${rateUser.id}/rate`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ rate: parseFloat(rateForm.rate) })
      });
      if (response.ok) {
        alert('Rate updated successfully!');
        setRateUser(null);
        fetchCompanyUsers();
      } else {
        alert('Failed to update rate');
      }
    } catch (error) {
      alert('Error updating rate');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/operators/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        alert('User deleted successfully!');
        fetchCompanyUsers();
      } else {
        alert('Failed to delete user');
      }
    } catch (error) {
      alert('Error deleting user');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Fetch user data
      fetch('https://operator-backend-1jjp.onrender.com/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          if (data.id) {
            setUser(data);
            setHomeAddress(data.homeAddress || '');
            setPhoneNumber(data.phoneNumber || '');
            setNric(data.nric || '');
            setJobPosition(data.jobPosition || '');
          }
        })
        .catch(() => console.log('Not authenticated'));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchJobs();
      fetchOffDays();
      fetchRelieve();
      fetchFeedback();
      fetchDocuments();
      if (isAdminOrManager) {
        fetchCompanyUsers();
        fetchActiveUsers();
      }
    }
  }, [user]);

  // Render login page
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800/50 backdrop-blur-lg rounded-2xl shadow-2xl p-8 w-full max-w-md border border-gray-700">
          <div className="text-center mb-8">
            <img src={LOGO_URL} alt="Logo" className="h-20 mx-auto mb-4 rounded-lg" />
            <h1 className="text-3xl font-bold text-white">Operator Management</h1>
            <p className="text-gray-400 mt-2">{isRegistering ? 'Create your account' : 'Sign in to your account'}</p>
          </div>

          {message && (
            <div className={`p-3 rounded-lg mb-4 ${message.includes('success') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {message}
            </div>
          )}

          <form onSubmit={isRegistering ? handleRegister : handleLogin} className="space-y-4">
            {isRegistering && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="USER">User</option>
                    <option value="MANAGER">Manager</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </div>
              </>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              {isRegistering ? 'Register' : 'Login'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => {
                setIsRegistering(!isRegistering);
                setMessage('');
              }}
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              {isRegistering ? 'Already have an account? Login' : "Don't have an account? Register"}
            </button>
          </div>

          {!isRegistering && (
            <div className="mt-2 text-center">
              <button
                onClick={() => setShowForgotPassword(true)}
                className="text-gray-400 hover:text-gray-300 text-sm"
              >
                Forgot Password?
              </button>
            </div>
          )}
        </div>

        {showForgotPassword && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">Reset Password</h2>
              {forgotMessage && (
                <div className="p-3 rounded-lg mb-4 bg-green-500/20 text-green-400">
                  {forgotMessage}
                </div>
              )}
              <form onSubmit={handleForgotPassword}>
                <input
                  type="email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 mb-4"
                  required
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Send Reset Link
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowForgotPassword(false);
                      setForgotMessage('');
                    }}
                    className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Main dashboard
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Navigation */}
      <nav className="bg-gray-800/90 backdrop-blur-lg border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <img src={LOGO_URL} alt="Logo" className="h-10 w-10 rounded-lg object-cover" />
              <span className="text-white font-bold text-lg">Operator Management</span>
              <span className="text-gray-400 text-sm hidden md:inline">| {user.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-300 text-sm hidden md:inline">Welcome, {user.name}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800/50 backdrop-blur-lg border-r border-gray-700 p-4 overflow-y-auto hidden md:block">
          <div className="space-y-1">
            {[
              { id: 'Overview', label: '📊 Overview' },
              { id: 'Jobs', label: '💼 Jobs' },
              { id: 'OffDay', label: '📅 Off-Day Requests' },
              { id: 'Relieve', label: '🔄 Relieve Requests' },
              { id: 'Feedback', label: '⭐ Feedback' },
              { id: 'Profile', label: '👤 Profile' },
              { id: 'Password', label: '🔑 Change Password' },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  activePage === item.id
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {item.label}
              </button>
            ))}
            {isAdminOrManager && (
              <>
                <div className="border-t border-gray-700 my-2 pt-2">
                  <button
                    onClick={() => setActivePage('Users')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activePage === 'Users'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    👥 Users
                  </button>
                  <button
                    onClick={() => setActivePage('Documents')}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      activePage === 'Documents'
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    📄 Documents
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {/* Overview Page */}
          {activePage === 'Overview' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Dashboard Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <h3 className="text-gray-400 text-sm">Jobs</h3>
                  <p className="text-2xl font-bold text-white">{jobs.length}</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <h3 className="text-gray-400 text-sm">Off-Day Requests</h3>
                  <p className="text-2xl font-bold text-white">{offDayRequests.length}</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                  <h3 className="text-gray-400 text-sm">Feedback</h3>
                  <p className="text-2xl font-bold text-white">{myFeedback.length}</p>
                </div>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <h3 className="text-white font-semibold mb-2">Current Date & Time</h3>
                <p className="text-gray-300">{currentDate.toLocaleString()}</p>
              </div>

              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mt-4">
                <h3 className="text-white font-semibold mb-2">Public Holidays 2026</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {publicHolidays.map((holiday, index) => (
                    <div key={index} className="text-gray-300 text-sm">
                      <span className="text-gray-400">{holiday.date}:</span> {holiday.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Jobs Page */}
          {activePage === 'Jobs' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Jobs</h2>
                {isAdminOrManager && (
                  <button
                    onClick={() => setShowJobForm(!showJobForm)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    {showJobForm ? 'Cancel' : 'Post Job'}
                  </button>
                )}
              </div>

              {showJobForm && isAdminOrManager && (
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mb-4">
                  <h3 className="text-white font-semibold mb-4">Post New Job</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Job Title"
                      value={newJob.title}
                      onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={newJob.location}
                      onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                    <textarea
                      placeholder="Description"
                      value={newJob.description}
                      onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 md:col-span-2"
                      rows="3"
                    />
                    <input
                      type="date"
                      value={newJob.startDate}
                      onChange={(e) => setNewJob({ ...newJob, startDate: e.target.value })}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="date"
                      value={newJob.endDate}
                      onChange={(e) => setNewJob({ ...newJob, endDate: e.target.value })}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="number"
                      placeholder="Rate ($/hr)"
                      value={newJob.rate}
                      onChange={(e) => setNewJob({ ...newJob, rate: e.target.value })}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    onClick={handleCreateJob}
                    className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Submit Job
                  </button>
                </div>
              )}

              <div className="space-y-4">
                {jobs.length === 0 && (
                  <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 text-center">
                    <p className="text-gray-400">No jobs posted yet.</p>
                  </div>
                )}
                {jobs.map((job) => (
                  <div key={job.id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <h3 className="text-white font-semibold text-lg">{job.title}</h3>
                    <p className="text-gray-300 mt-1">{job.description}</p>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-400">
                      <span>📍 {job.location}</span>
                      <span>📅 {job.startDate} - {job.endDate}</span>
                      <span>💰 ${job.rate}/hr</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Off-Day Page */}
          {activePage === 'OffDay' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Off-Day Requests</h2>
                <button
                  onClick={() => setShowOffDayForm(!showOffDayForm)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {showOffDayForm ? 'Cancel' : 'Request Off-Day'}
                </button>
              </div>

              {showOffDayForm && (
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mb-4">
                  <h3 className="text-white font-semibold mb-4">New Off-Day Request</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="date"
                      value={newOffDay.requestedDate}
                      onChange={(e) => setNewOffDay({ ...newOffDay, requestedDate: e.target.value })}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                    <textarea
                      placeholder="Reason"
                      value={newOffDay.reason}
                      onChange={(e) => setNewOffDay({ ...newOffDay, reason: e.target.value })}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      rows="2"
                    />
                  </div>
                  <button
                    onClick={handleCreateOffDay}
                    className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Submit Request
                  </button>
                </div>
              )}

              <div className="space-y-4">
                {offDayRequests.length === 0 && (
                  <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 text-center">
                    <p className="text-gray-400">No off-day requests.</p>
                  </div>
                )}
                {offDayRequests.map((request) => (
                  <div key={request.id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">{request.operatorName}</p>
                        <p className="text-gray-300 text-sm">Date: {request.requestedDate}</p>
                        <p className="text-gray-300 text-sm">Reason: {request.reason}</p>
                      </div>
                      <div>
                        <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                          request.status === 'APPROVED' ? 'bg-green-500/20 text-green-400' :
                          request.status === 'REJECTED' ? 'bg-red-500/20 text-red-400' :
                          'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {request.status || 'PENDING'}
                        </span>
                        {isAdminOrManager && request.status === 'PENDING' && (
                          <div className="mt-2 flex gap-2">
                            <button
                              onClick={() => handleApproveReject(request.id, 'APPROVED')}
                              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs transition-colors"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleApproveReject(request.id, 'REJECTED')}
                              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs transition-colors"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Relieve Page */}
          {activePage === 'Relieve' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Relieve Requests</h2>
                <button
                  onClick={() => setNewRelieve({ date: '', jobPosition: '' })}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Request Relieve
                </button>
              </div>

              {newRelieve.date && (
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mb-4">
                  <h3 className="text-white font-semibold mb-4">New Relieve Request</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="date"
                      value={newRelieve.date}
                      onChange={(e) => setNewRelieve({ ...newRelieve, date: e.target.value })}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Job Position"
                      value={newRelieve.jobPosition}
                      onChange={(e) => setNewRelieve({ ...newRelieve, jobPosition: e.target.value })}
                      className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button
                    onClick={handleCreateRelieve}
                    className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Submit Request
                  </button>
                  <button
                    onClick={() => setNewRelieve({ date: '', jobPosition: '' })}
                    className="mt-4 ml-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}

              <div className="space-y-4">
                {relieveRequests.length === 0 && (
                  <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 text-center">
                    <p className="text-gray-400">No relieve requests.</p>
                  </div>
                )}
                {relieveRequests.map((request) => (
                  <div key={request.id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">{request.relieverName}</p>
                        <p className="text-gray-300 text-sm">Date: {request.date}</p>
                        <p className="text-gray-300 text-sm">Position: {request.jobPosition}</p>
                      </div>
                      <span className="text-gray-400 text-sm">
                        {request.status || 'PENDING'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Feedback Page */}
          {activePage === 'Feedback' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-white">Feedback</h2>
                <button
                  onClick={() => setShowFeedbackForm(!showFeedbackForm)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {showFeedbackForm ? 'Cancel' : 'Submit Feedback'}
                </button>
              </div>

              {showFeedbackForm && (
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mb-4">
                  <h3 className="text-white font-semibold mb-4">New Feedback</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Job Title"
                      value={newFeedback.jobTitle}
                      onChange={(e) => setNewFeedback({ ...newFeedback, jobTitle: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    />
                    <select
                      value={newFeedback.rating}
                      onChange={(e) => setNewFeedback({ ...newFeedback, rating: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                    >
                      <option value="5">⭐⭐⭐⭐⭐ - Excellent</option>
                      <option value="4">⭐⭐⭐⭐ - Good</option>
                      <option value="3">⭐⭐⭐ - Average</option>
                      <option value="2">⭐⭐ - Poor</option>
                      <option value="1">⭐ - Terrible</option>
                    </select>
                    <textarea
                      placeholder="Comment"
                      value={newFeedback.comment}
                      onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      rows="3"
                    />
                  </div>
                  <button
                    onClick={handleCreateFeedback}
                    className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                  >
                    Submit Feedback
                  </button>
                </div>
              )}

              <div className="space-y-4">
                {(isAdminOrManager ? allFeedback : myFeedback).length === 0 && (
                  <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 text-center">
                    <p className="text-gray-400">No feedback yet.</p>
                  </div>
                )}
                {(isAdminOrManager ? allFeedback : myFeedback).map((fb) => (
                  <div key={fb.id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-white font-semibold">{fb.jobTitle}</p>
                        <p className="text-yellow-400">{"⭐".repeat(fb.rating)}</p>
                        <p className="text-gray-300 text-sm mt-1">{fb.comment}</p>
                        <p className="text-gray-400 text-xs mt-1">By: {fb.operatorName}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Profile Page */}
          {activePage === 'Profile' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">My Profile</h2>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={user.name || ''}
                        onChange={(e) => setUser({ ...user, name: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                      <input
                        type="email"
                        value={user.email || ''}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">NRIC</label>
                      <input
                        type="text"
                        value={nric}
                        onChange={(e) => setNric(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Job Position</label>
                      <input
                        type="text"
                        value={jobPosition}
                        onChange={(e) => setJobPosition(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Rate ($/hr)</label>
                      <input
                        type="number"
                        value={user.rate || ''}
                        onChange={(e) => setUser({ ...user, rate: parseFloat(e.target.value) })}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300 mb-1">Home Address</label>
                      <textarea
                        value={homeAddress}
                        onChange={(e) => setHomeAddress(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        rows="3"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Update Profile
                  </button>
                </form>
              </div>

              {/* Documents Section */}
              <div className="mt-6">
                <h3 className="text-xl font-bold text-white mb-4">My Documents</h3>
                <button
                  onClick={() => setShowUploadForm(!showUploadForm)}
                  className="mb-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                >
                  {showUploadForm ? 'Cancel' : 'Upload Document'}
                </button>

                {showUploadForm && (
                  <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mb-4">
                    <h4 className="text-white font-semibold mb-4">Upload New Document</h4>
                    <div className="space-y-4">
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        className="w-full text-gray-300"
                      />
                      {fileUrl && (
                        <div>
                          <input
                            type="text"
                            placeholder="File Name"
                            value={newDocument.fileName}
                            onChange={(e) => setNewDocument({ ...newDocument, fileName: e.target.value })}
                            className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 mb-2"
                          />
                          <button
                            onClick={handleSaveDocument}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                          >
                            Save Document
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  {documents.length === 0 && (
                    <div className="bg-gray-800/50 rounded-xl p-8 border border-gray-700 text-center">
                      <p className="text-gray-400">No documents uploaded.</p>
                    </div>
                  )}
                  {documents.map((doc) => (
                    <div key={doc.id} className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-white font-semibold">{doc.fileName}</p>
                          <p className="text-gray-400 text-sm">{doc.fileType}</p>
                        </div>
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                        >
                          View
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Change Password Page */}
          {activePage === 'Password' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Change Password</h2>
              <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 max-w-md">
                {passwordMessage && (
                  <div className={`p-3 rounded-lg mb-4 ${passwordMessage.includes('success') ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {passwordMessage}
                  </div>
                )}
                <form onSubmit={handlePasswordChange}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Current Password</label>
                      <input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Change Password
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Users Page - Admin Only */}
          {activePage === 'Users' && isAdminOrManager && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Users Management</h2>
              
              <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mb-6">
                <h3 className="text-white font-semibold mb-2">Company Users</h3>
                <div className="space-y-2">
                  {companyUsers.length === 0 && (
                    <p className="text-gray-400">No users found.</p>
                  )}
                  {companyUsers.map((u) => (
                    <div key={u.id} className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                      <div>
                        <p className="text-white font-semibold">{u.name}</p>
                        <p className="text-gray-400 text-sm">{u.email}</p>
                        <p className="text-gray-400 text-sm">Rate: ${u.rate || 0}/hr</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditUser(u)}
                          className="px-3 py-1 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg text-xs transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleRateUser(u)}
                          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg text-xs transition-colors"
                        >
                          Rate
                        </button>
                        <button
                          onClick={() => fetchOperatorDocs(u.id)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs transition-colors"
                        >
                          Docs
                        </button>
                        {isAdmin && (
                          <button
                            onClick={() => handleDeleteUser(u.id)}
                            className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs transition-colors"
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Edit User Modal */}
              {editingUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                  <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700">
                    <h3 className="text-white font-bold text-xl mb-4">Edit User</h3>
                    <form onSubmit={handleUpdateUser}>
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder="Name"
                        />
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder="Email"
                        />
                        <input
                          type="text"
                          value={editForm.phoneNumber}
                          onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })}
                          className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                          placeholder="Phone Number"
                        />
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button
                          type="submit"
                          className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingUser(null)}
                          className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Rate User Modal */}
              {rateUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                  <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-700">
                    <h3 className="text-white font-bold text-xl mb-4">Update Rate for {rateUser.name}</h3>
                    <form onSubmit={handleUpdateRate}>
                      <input
                        type="number"
                        step="0.5"
                        value={rateForm.rate}
                        onChange={(e) => setRateForm({ rate: e.target.value })}
                        className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
                        placeholder="Rate ($/hr)"
                      />
                      <div className="flex gap-2 mt-4">
                        <button
                          type="submit"
                          className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                        >
                          Update Rate
                        </button>
                        <button
                          type="button"
                          onClick={() => setRateUser(null)}
                          className="flex-1 py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* View Documents Modal */}
              {viewingDocs && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                  <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-2xl border border-gray-700 max-h-[80vh] overflow-y-auto">
                    <h3 className="text-white font-bold text-xl mb-4">User Documents</h3>
                    {viewingDocs.length === 0 && (
                      <p className="text-gray-400">No documents found.</p>
                    )}
                    <div className="space-y-2">
                      {viewingDocs.map((doc) => (
                        <div key={doc.id} className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                          <div>
                            <p className="text-white">{doc.fileName}</p>
                            <p className="text-gray-400 text-sm">{doc.fileType}</p>
                          </div>
                          <a
                            href={doc.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition-colors"
                          >
                            View
                          </a>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => setViewingDocs(null)}
                      className="mt-4 w-full py-2 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
