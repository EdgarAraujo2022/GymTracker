import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import  LoginPage  from '../features/login/pages/LoginPage';
import  DashboardPage from '../features/dashboard/pages/DashboardPage';
import BodyMeasurementsPage from '@/features/bodymeasurements/pages/BodyMeasurementsPage';

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/bodymeasurements" element={<BodyMeasurementsPage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}