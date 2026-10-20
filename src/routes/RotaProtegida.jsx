import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export function RotaProtegida() {
    const { estaAutenticado, carregando } = useContext(AuthContext);

    if (carregando) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-3" />
                <p className="text-sm font-medium text-gray-500">Verificando autenticação...</p>
            </div>
        );
    }

    return estaAutenticado ? <Outlet /> : <Navigate to="/login" replace />;
}