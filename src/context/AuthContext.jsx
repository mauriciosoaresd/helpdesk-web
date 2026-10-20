import { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        // Recupera o token e dados salvos no carregamento inicial
        const tokenSalvo = localStorage.getItem('token');
        const usuarioSalvo = localStorage.getItem('usuario');

        if (tokenSalvo && usuarioSalvo) {
            setUsuario(JSON.parse(usuarioSalvo));
        }
        setCarregando(false);
    }, []);

    const login = async (email, senha) => {
        try {
            const response = await api.post('/usuarios/login', { email, senha });
            const { token, usuario: dadosUsuario } = response.data;

            // Salva no localStorage para manter a sessão ativa ao recarregar a página
            localStorage.setItem('token', token);
            localStorage.setItem('usuario', JSON.stringify(dadosUsuario));

            setUsuario(dadosUsuario);
            return { sucesso: true };
        } catch (error) {
            const mensagemErro = error.response?.data?.mensagem || 'Falha ao realizar login. Verifique suas credenciais.';
            return { sucesso: false, erro: mensagemErro };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, estaAutenticado: !!usuario, login, logout, carregando }}>
            {children}
        </AuthContext.Provider>
    );
};