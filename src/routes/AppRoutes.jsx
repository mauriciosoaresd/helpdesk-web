import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import { RotaProtegida } from './RotaProtegida';

export function AppRoutes() {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Rotas Privadas */}
            <Route element={<RotaProtegida />}>
                <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Redirecionamento Padrão */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
}