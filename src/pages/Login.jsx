import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LogIn, Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

export function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    const [carregando, setCarregando] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');
        setCarregando(true);

        const resultado = await login(email, senha);

        if (resultado.sucesso) {
            navigate('/dashboard');
        } else {
            setErro(resultado.erro);
        }
        setCarregando(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-8 space-y-6">
                
                {/* Header */}
                <div className="text-center space-y-2">
                    <div className="inline-flex p-3 bg-blue-50 text-blue-600 rounded-xl mb-1">
                        <LogIn className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                        HelpDesk OS
                    </h2>
                    <p className="text-sm text-gray-500">
                        Entre com suas credenciais para acessar a plataforma
                    </p>
                </div>

                {/* Mensagem de Erro */}
                {erro && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm animate-fade-in">
                        <AlertCircle className="w-5 h-5 shrink-0 text-red-500" />
                        <span className="font-medium">{erro}</span>
                    </div>
                )}

                {/* Formulário */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    
                    {/* Campo E-mail */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            E-mail
                        </label>
                        <div className="relative flex items-center">
                            <Mail className="w-5 h-5 text-gray-400 absolute left-3.5 pointer-events-none" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="seu@email.com"
                                required
                                className="w-full pl-11 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all text-gray-900 placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Campo Senha */}
                    <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                            Senha
                        </label>
                        <div className="relative flex items-center">
                            <Lock className="w-5 h-5 text-gray-400 absolute left-3.5 pointer-events-none" />
                            <input
                                type="password"
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                placeholder="••••••••"
                                required
                                className="w-full pl-11 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all text-gray-900 placeholder:text-gray-400"
                            />
                        </div>
                    </div>

                    {/* Botão de Submit */}
                    <button
                        type="submit"
                        disabled={carregando}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl shadow-sm hover:shadow transition-all duration-200 cursor-pointer disabled:cursor-not-allowed mt-2"
                    >
                        {carregando ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                <span>Autenticando...</span>
                            </>
                        ) : (
                            <span>Entrar</span>
                        )}
                    </button>
                </form>

            </div>
        </div>
    );
}