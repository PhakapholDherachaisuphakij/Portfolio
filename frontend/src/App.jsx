// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AuthGuard from './components/auth/AuthGuard';
import Home from './pages/Home';
import ProjectGrid from './pages/ProjectGrid';
import Activity from './pages/Activity';
import CharacterStats from './pages/CharactorStats';
import ContactPage from './pages/ContactPage';
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import ActivityManage from './pages/admin/ActivityManage';
import ProjectManage from './pages/admin/ProjectManage';
import ProfileManage from './pages/admin/ProfileManage';
import SkillsManage from './pages/admin/SkillsManage';
import ExperienceManage from './pages/admin/ExperienceManage';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="quests" element={<ProjectGrid />} />
        <Route path="activities" element={<Activity />} />
        <Route path="character" element={<CharacterStats />} />
        <Route path="contact" element={<ContactPage />} />
      </Route>

      {/* Admin Auth */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Routes */}
      <Route 
        path="/admin/dashboard" 
        element={
          <AuthGuard>
            <AdminDashboard />
          </AuthGuard>
        } 
      />
      <Route 
        path="/admin/activities" 
        element={
          <AuthGuard>
            <ActivityManage />
          </AuthGuard>
        } 
      />
      <Route 
        path="/admin/projects" 
        element={
          <AuthGuard>
            <ProjectManage />
          </AuthGuard>
        } 
      />
      <Route 
        path="/admin/profile" 
        element={
          <AuthGuard>
            <ProfileManage />
          </AuthGuard>
        } 
      />
      <Route 
        path="/admin/skills" 
        element={
          <AuthGuard>
            <SkillsManage />
          </AuthGuard>
        } 
      />
      <Route 
        path="/admin/experience" 
        element={
          <AuthGuard>
            <ExperienceManage />
          </AuthGuard>
        } 
      />
    </Routes>
  );
}



export default App;