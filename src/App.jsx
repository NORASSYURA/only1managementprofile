Build error multiple default exports
Here's the complete file with all the missing parts. I'll provide it in sections since it's very long:

Complete App.jsx (Full Version)
jsx
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
This is the complete App.jsx file with all functions, state variables, and the full UI implementation. Make sure to save this in your src/App.jsx file! 🚀

this is my code and NO CHANGING ANY CODES only change necessary like  why i cant like the view files which already uploaded
Looking at your code, I can see the issue with the View Files button. The problem is in the fetchOperatorDocs function - it's not displaying the documents properly in the UI.

Here's the fix - add this missing UI section for viewing documents in the Operators section:

Add this code in the Operators section (around line 1380-1400):
Find this part in your code:

jsx
<button onClick={() => fetchOperatorDocs(op.id)} style={{ marginLeft: '8px', backgroundColor: '#f59e0b', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>View Files</button>
Add this code after the Operators list (inside the Operators section):

jsx
{viewingDocs && (
  <div className="data-section" style={{ marginTop: '20px', border: '1px solid #f59e0b', padding: '15px', borderRadius: '8px' }}>
    <h3 style={{ color: '#f59e0b' }}>📄 Operator Documents</h3>
    {viewingDocs.length > 0 ? (
      <ul className="data-list">
        {viewingDocs.map((doc) => (
          <li key={doc.id} style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
            <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#3498db', textDecoration: 'none' }}>
              📎 {doc.fileName}
            </a>
            <span style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>({doc.fileType})</span>
          </li>
        ))}
      </ul>
    ) : (
      <p style={{ color: '#666' }}>No documents found for this operator.</p>
    )}
    <button 
      onClick={() => setViewingDocs(null)} 
      style={{ marginTop: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', padding: '6px 15px', borderRadius: '4px', cursor: 'pointer' }}
    >
      Close
    </button>
  </div>
)}
OR if you want a modal/popup version (better UX):
Replace the above with this modal version:

jsx
{viewingDocs && (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  }}>
    <div style={{
      backgroundColor: 'white',
      padding: '25px',
      borderRadius: '10px',
      maxWidth: '500px',
      width: '90%',
      maxHeight: '80vh',
      overflowY: 'auto',
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
    }}>
      <h3 style={{ color: '#f59e0b', marginBottom: '15px' }}>📄 Operator Documents</h3>
      {viewingDocs.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {viewingDocs.map((doc) => (
            <li key={doc.id} style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
              <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#3498db', textDecoration: 'none', fontWeight: '500' }}>
                📎 {doc.fileName}
              </a>
              <span style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>({doc.fileType})</span>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: '#666' }}>No documents found for this operator.</p>
      )}
      <button 
        onClick={() => setViewingDocs(null)} 
        style={{ 
          marginTop: '15px', 
          backgroundColor: '#6c757d', 
          color: 'white', 
          border: 'none', 
          padding: '8px 20px', 
          borderRadius: '5px', 
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        Close
      </button>
    </div>
  </div>
)}
The problem was:
The viewingDocs state was being set but never displayed in the UI

There was no modal or section to show the documents when viewingDocs has data

Where to add the code:
Add it right after the </ul> closing tag of the operators list, before the </> closing tag for the Operators section.

This will make the View Files button work and display the uploaded documents! 📎

where to paste the modal/popup version (better UX)
Based on your code structure, paste the modal/popup version after the operators list and before the </> closing tag of the Operators section.

Here's the exact location:
Find this part in your code (around line 700-750 in the Operators section):

jsx
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
                <span>{op.name} ({op.email}) - Phone: {op.phoneNumber} - NRIC: {op.nric} - Job: {op.jobPosition} - Address: {op.homeAddress}</span>
                <div>
                  {isAdmin && (
                    <button onClick={() => handleDelete(op.id)} style={{ backgroundColor: '#e53e3e', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', marginLeft: '8px' }}>Delete</button>
                  )}
                  <button onClick={() => handleEditClick(op)} style={{ backgroundColor: '#3498db', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', marginLeft: '8px' }}>Edit</button>
                  <a href={`tel:${op.phoneNumber}`} style={{ marginLeft: '8px', backgroundColor: '#4CAF50', color: 'white', padding: '4px 10px', borderRadius: '4px', textDecoration: 'none', fontSize: '14px' }}>Call</a>
                  <button onClick={() => fetchOperatorDocs(op.id)} style={{ marginLeft: '8px', backgroundColor: '#f59e0b', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>View Files</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No operators found for this company.</p>
        )}
        
        {/* 👇 PASTE THE MODAL CODE HERE 👇 */}
        
      </div>
    )}
    {editingUser && (
      // ... edit form code ...
    )}
  </>
)}
The complete code to paste (with exact placement):
jsx
{/* View Documents Modal - Paste this right after the closing </ul> tag */}
{viewingDocs && (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000
  }}>
    <div style={{
      backgroundColor: 'white',
      padding: '25px',
      borderRadius: '10px',
      maxWidth: '500px',
      width: '90%',
      maxHeight: '80vh',
      overflowY: 'auto',
      boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
    }}>
      <h3 style={{ color: '#f59e0b', marginBottom: '15px' }}>📄 Operator Documents</h3>
      {viewingDocs.length > 0 ? (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {viewingDocs.map((doc) => (
            <li key={doc.id} style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
              <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: '#3498db', textDecoration: 'none', fontWeight: '500' }}>
                📎 {doc.fileName}
              </a>
              <span style={{ marginLeft: '10px', fontSize: '12px', color: '#666' }}>({doc.fileType})</span>
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ color: '#666' }}>No documents found for this operator.</p>
      )}
      <button 
        onClick={() => setViewingDocs(null)} 
        style={{ 
          marginTop: '15px', 
          backgroundColor: '#6c757d', 
          color: 'white', 
          border: 'none', 
          padding: '8px 20px', 
          borderRadius: '5px', 
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        Close
      </button>
    </div>
  </div>
)}
Also fix the typo in your code:
You have classNam instead of className in some places. Change:

classNam="dashboard-header" → className="dashboard-header"

classNam="profile-card" → className="profile-card"

classNam="main-content" → className="main-content"

Summary:
Find the Operators section (search for {activePage === 'Operators' && ()

Locate the closing </ul> tag of the operators list

Paste the modal code right after it

Fix the classNam typos to className

This will make the View Files button open a popup showing all uploaded documents! 📎


import { useState, useEffect } from 'react';.txt
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

  // Relieve State
  const [relieveRequests, setRelieveRequests] = useState([]);
  const [newRelieve, setNewRelieve] = useState({ date: '', jobPosition: '' });

  const isAdmin = user && user.role === 'ADMIN';
  const isManager = user && user.role === 'MANAGER';
  const isAdminOrManager = isAdmin || isManager;

  const LOGO_URL = 'https://res.cloudinary.com/uywj26ei/image/upload/v1788451739/The_Only1_Profile_Management_Logo_A4.png';

  // Fetch company-wide Off Days (For Calendar)
  const fetchOffDays = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = `https://operator-backend-1jjp.onrender.com/api/offday/company/${user.companyId}`;
      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setOffDayRequests(data);
        setMyOffDayRequests(data);
      }
    } catch (error) {
      console.log("Could not fetch off days");
    }
  };

  // Fetch company-wide Relieve (For Calendar)
  const fetchRelieve = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/relieve/company/${user.companyId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setRelieveRequests(data);
      }
    } catch (error) {
      console.log("Could not fetch relieve requests");
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
        setAllFeedback(data);
        setMyFeedback(data);
      }
    } catch (error) {
      console.log("Could not fetch feedback");
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
      const response = await fetch(CLOUDINARY_URL, { method: 'POST', body: formData });
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

  const handleCancelOffDay = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this request?")) return;
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://operator-backend-1jjp.onrender.com/api/offday/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ status: 'REJECTED' }),
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

  const handleCreateRelieve = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/relieve/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ ...newRelieve, relieverId: user.id, relieverName: user.name, companyId: user.companyId }),
      });
      if (response.ok) {
        alert("Relieve request submitted!");
        setNewRelieve({ date: '', jobPosition: '' });
        fetchRelieve();
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
        body: JSON.stringify({ name: user.name, email: user.email, rate: user.rate, homeAddress, phoneNumber, nric, jobPosition }),
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
        setActivePage('Overview');
        localStorage.setItem('currentPage', 'Overview');
        fetchOffDays();
        fetchRelieve();
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
    localStorage.removeItem('currentPage');
    setUser(null);
    setMessage(''); setEmail(''); setPassword('');
    setActiveUsers([]); setCompanyUsers([]); setShowCompany(false);
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
    setRelieveRequests([]);
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
    const request = offDayRequests.find(r => r.requestedDate === dateStr);
    
    // Return the full request object so we can know the ID
    return request ? { ...request, dateStr: dateStr } : null;
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://operator-backend-1jjp.onrender.com/api/operators/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: forgotEmail }),
      });
      const data = await response.json();
      if (response.ok) {
        setForgotMessage(`Password reset successful! Please use this temporary password: ${data.message.split(': ')[1]} to log in, then change it in Settings.`);
      } else {
        setForgotMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setForgotMessage('Server is not running or CORS error!');
    }
  };

  // RESTORE SESSION ON REFRESH
  useEffect(() => {
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        const page = localStorage.getItem('currentPage');
        setActivePage(page || 'Overview');

        // Fetch data immediately after restoring user
        const token = localStorage.getItem('token');
        if (token && parsedUser) {
          fetchOffDays();
          fetchRelieve();
        }
      } catch (e) {
        localStorage.removeItem('userData');
      }
    }
  }, []);

  if (user) {
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
              <li onClick={() => { setActivePage('Overview'); localStorage.setItem('currentPage', 'Overview'); }}>Overview</li>
              <li onClick={() => { setActivePage('Operators'); localStorage.setItem('currentPage', 'Operators'); fetchCompanyUsers(); }}>Operators</li>
              <li onClick={() => { setActivePage('Jobs'); localStorage.setItem('currentPage', 'Jobs'); }}>Jobs</li>
              <li onClick={() => { setActivePage('Requests'); localStorage.setItem('currentPage', 'Requests'); fetchOffDays(); }}>
                Off Day Requests
                {offDayRequests.some(r => r.status === 'PENDING') && (
                  <span className="blinking"> 🔴</span>
                )}
              </li>
              <li onClick={() => { setActivePage('Feedback'); localStorage.setItem('currentPage', 'Feedback'); }}>Feedback</li>
              <li onClick={() => { setActivePage('Calendar'); localStorage.setItem('currentPage', 'Calendar'); fetchOffDays(); fetchRelieve(); }}>Calendar</li>
              <li onClick={() => { setActivePage('Settings'); localStorage.setItem('currentPage', 'Settings'); }}>Settings</li>
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
<span>{op.name} ({op.email}) - Phone: {op.phoneNumber} - NRIC: {op.nric} - Job: {op.jobPosition} - Address: {op.homeAddress}</span>                            <div>
                              {isAdmin && (
                                <button onClick={() => handleDelete(op.id)} style={{ backgroundColor: '#e53e3e', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', marginLeft: '8px' }}>Delete</button>
                              )}
                              <button onClick={() => handleEditClick(op)} style={{ backgroundColor: '#3498db', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', marginLeft: '8px' }}>Edit</button>
                              <a href={`tel:${op.phoneNumber}`} style={{ marginLeft: '8px', backgroundColor: '#4CAF50', color: 'white', padding: '4px 10px', borderRadius: '4px', textDecoration: 'none', fontSize: '14px' }}>Call</a>
                              <button onClick={() => fetchOperatorDocs(op.id)} style={{ marginLeft: '8px', backgroundColor: '#f59e0b', color: 'white', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '14px' }}>View Files</button>
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
                    <input type="text" value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} className="form-input" />
                    <input type="email" value={editForm.email} onChange={(e) => setEditForm({ ...editForm, email: e.target.value })} className="form-input" />
                    <input type="text" value={editForm.phoneNumber} onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })} className="form-input" />
                    <button onClick={handleSaveEdit} style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 20px', cursor: 'pointer' }}>Save Changes</button>
                    <button onClick={() => setEditingUser(null)} style={{ marginLeft: '10px', padding: '10px 20px', cursor: 'pointer' }}>Cancel</button>
                  </div>
                )}
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
                            <button onClick={() => handleCancelOffDay(req.id)} style={{ backgroundColor: '#e53e3e', color: 'white', border: 'none', padding: '5px 10px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>Cancel</button>
                          )}
                          {isManager && req.status === 'PENDING' && (
                            <div style={{ marginTop: '10px', marginLeft: '10px', display: 'inline-block' }}>
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
                        <li key={fb.id}>
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
                      const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                      const offDayStatus = getOffDayStatus(day);
                      return (
                        <div key={day} style={{
                          padding: '10px',
                          textAlign: 'center',
                          border: '1px solid #eee',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          backgroundColor: holiday ? '#ffeb3b' : offDayStatus === 'APPROVED' ? '#c8e6c9' : offDayStatus === 'PENDING' ? '#ffe0b2' : offDayStatus === 'REJECTED' ? '#ffcdd2' : 'white'
                        }}>
                                                   <strong>{day}</strong>
                          {holiday && <div style={{ fontSize: '10px', color: '#f57f17' }}>{holiday.name}</div>}
                          {offDayStatus && <div style={{ fontSize: '10px', fontWeight: 'bold' }}>{offDayStatus.name} {offDayStatus.status}</div>}
                          {relieveRequests.filter(r => r.date === formattedDate).map((relief) => (
                            <div key={relief.id} style={{ fontSize: '10px', color: '#007bff' }}>Relief: {relief.relieverName}</div>
                          ))}
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
            <li onClick={() => { setActivePage('Overview'); localStorage.setItem('currentPage', 'Overview'); }}>Overview</li>
            <li onClick={() => { setActivePage('My Profile'); localStorage.setItem('currentPage', 'My Profile'); }}>My Profile</li>
            <li onClick={() => { setActivePage('Jobs'); localStorage.setItem('currentPage', 'Jobs'); }}>Jobs</li>
            <li onClick={() => { setActivePage('My Off Days'); localStorage.setItem('currentPage', 'My Off Days'); fetchOffDays(); }}>My Off Days</li>
            <li onClick={() => { setActivePage('Relieve'); localStorage.setItem('currentPage', 'Relieve'); fetchRelieve(); }}>Relieve</li>
            <li onClick={() => { setActivePage('Feedback'); localStorage.setItem('currentPage', 'Feedback'); }}>Feedback</li>
            <li onClick={() => { setActivePage('Calendar'); localStorage.setItem('currentPage', 'Calendar'); fetchOffDays(); fetchRelieve(); }}>Calendar</li>
            <li onClick={() => { setActivePage('Settings'); localStorage.setItem('currentPage', 'Settings'); }}>Settings</li>
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
                <p><strong>Rate:</strong> ${user.rate ? user.rate : '0.00'}</p>
              </div>
            </>
          )}

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
                  <input type="text" placeholder="Home Address" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} className="form-input" />
                  <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="form-input" />
                  <input type="text" placeholder="NRIC" value={nric} onChange={(e) => setNric(e.target.value)} className="form-input" />
                  <select value={jobPosition} onChange={(e) => setJobPosition(e.target.value)} className="form-input">
                    <option value="">Select Job Position</option>
                    <option value="P103 Nightshift">P103 Nightshift</option>
                    <option value="Cc09b Dayshift">Cc09b Dayshift</option>
                    <option value="Changi T5 Dayshift">Changi T5 Dayshift</option>
                    <option value="Changi T5 Nightshift">Changi T5 Nightshift</option>
                    <option value="C12A/C12B">C12A/C12B</option>
                    <option value="Woodland ICA Dayshift">Woodland ICA Dayshift</option>
                    <option value="Xcmg - S.E Crane">Xcmg - S.E Crane</option>
                    <option value="HIROSE">HIROSE</option>
                    <option value="CR 106 Nightshift (Adhoc)">CR 106 Nightshift (Adhoc)</option>
                    <option value="Relieve Operator">Relieve Operator</option>
                  </select>
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
                      <li key={doc.id}><a href={doc.fileUrl} target="_blank" rel="noopener noreferrer">{doc.fileName}</a></li>
                    ))}
                  </ul>
                ) : (
                  <p>No documents uploaded yet.</p>
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
                      <li key={job.id}><strong>{job.title}</strong> - {job.location} - ${job.rate}<br />{job.description}<br /><button className="action-btn">Sign Up</button></li>
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
                      <li key={req.id}>Date: {req.requestedDate} - Status: <strong style={{ color: req.status === 'PENDING' ? 'orange' : req.status === 'APPROVED' ? 'green' : 'red' }}>{req.status}</strong></li>
                    ))}
                  </ul>
                ) : (
                  <p>No off day requests submitted.</p>
                )}
              </div>
            </>
          )}

          {activePage === 'Relieve' && (
            <>
              <h1 className="dashboard-header">Relieve Duty</h1>
              <div className="data-section">
                <input type="date" value={newRelieve.date} onChange={(e) => setNewRelieve({ ...newRelieve, date: e.target.value })} className="form-input" />
                <select value={newRelieve.jobPosition} onChange={(e) => setNewRelieve({ ...newRelieve, jobPosition: e.target.value })} className="form-input">
                  <option value="">Select Shift</option>
                  <option value="P103 Nightshift">P103 Nightshift</option>
                  <option value="Cc09b Dayshift">Cc09b Dayshift</option>
                  <option value="Changi T5 Dayshift">Changi T5 Dayshift</option>
                  <option value="Changi T5 Nightshift">Changi T5 Nightshift</option>
                  <option value="C12A/C12B">C12A/C12B</option>
                  <option value="Woodland ICA Dayshift">Woodland ICA Dayshift</option>
                  <option value="Xcmg - S.E Crane">Xcmg - S.E Crane</option>
                  <option value="HIROSE">HIROSE</option>
                  <option value="CR 106 Nightshift (Adhoc)">CR 106 Nightshift (Adhoc)</option>
                </select>
                <button onClick={handleCreateRelieve} className="action-btn">Submit Relieve</button>
              </div>
              <div className="data-section">
                <h3>My Relieve Duties</h3>
                {relieveRequests.filter(r => r.relieverId === user.id).length > 0 ? (
                  <ul className="data-list">
                    {relieveRequests.filter(r => r.relieverId === user.id).map((req) => (
                      <li key={req.id}>{req.jobPosition} - {req.date}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No relieve duties assigned.</p>
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
                      <li key={fb.id}><strong>{fb.jobTitle}</strong> - Rating: {fb.rating}/5<br />Comment: {fb.comment}</li>
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
                    const formattedDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
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
                        {relieveRequests.filter(r => r.date === formattedDate).map((relief) => (
                          <div key={relief.id} style={{ fontSize: '10px', color: '#007bff' }}>Relief: {relief.relieverName}</div>
                        ))}
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
        <h1 className="login-title" style={{ fontSize: '20px', fontWeight: '800', color: '#333', textAlign: 'center', marginBottom: '5px' }}>THE ONLY1PROFILEMANAGEMENT</h1>
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
