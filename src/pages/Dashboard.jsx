import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { 
    LogOut, 
    LifeBuoy, 
    CheckCircle2, 
    Clock, 
    AlertCircle, 
    Plus, 
    Search, 
    Filter,
    User
} from 'lucide-react';

export function Dashboard() {
    const { usuario, logout } = useContext(AuthContext);

    // Mock inicial de chamados para visualização da interface
    const chamadosExemplo = [
        { id: 'OS-1001', titulo: 'Erro ao emitir relatório PDF', cliente: 'Tech Solutions', prioridade: 'ALTA', status: 'EM_ANDAMENTO', data: '19/10/2026' },
        { id: 'OS-1002', titulo: 'Impressora de etiquetas offline', cliente: 'Logística Express', prioridade: 'MEDIA', status: 'ABERTO', data: '19/10/2026' },
        { id: 'OS-1003', titulo: 'Reset de senha de usuário', cliente: 'Financeiro Corp', prioridade: 'BAIXA', status: 'CONCLUIDO', data: '18/10/2026' },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            
            {/* Topbar / Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    
                    {/* Brand */}
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-600 text-white rounded-xl shadow-sm">
                            <LifeBuoy className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-gray-900 leading-none">HelpDesk OS</h1>
                            <span className="text-xs text-gray-500 font-medium">Gestão de Chamados</span>
                        </div>
                    </div>

                    {/* Perfil do Usuário & Logout */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                            <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-700 font-semibold flex items-center justify-center text-sm border border-blue-200">
                                {usuario?.nome ? usuario.nome.charAt(0).toUpperCase() : <User className="w-5 h-5" />}
                            </div>
                            <div className="hidden sm:block text-left">
                                <p className="text-sm font-semibold text-gray-900 leading-tight">
                                    {usuario?.nome || 'Usuário'}
                                </p>
                                <span className="inline-block px-2 py-0.5 text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-100 rounded-md uppercase tracking-wider">
                                    {usuario?.perfil || 'TECNICO'}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={logout}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer"
                            title="Sair do Sistema"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>

                </div>
            </header>

            {/* Conteúdo Principal */}
            <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                
                {/* Header da Página */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Painel Principal</h2>
                        <p className="text-sm text-gray-500">Acompanhe as ordens de serviço e chamados ativos</p>
                    </div>
                    <button className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-semibold text-sm shadow-sm hover:shadow transition-all cursor-pointer">
                        <Plus className="w-4 h-4" />
                        <span>Novo Chamado</span>
                    </button>
                </div>

                {/* Cards de Métricas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    
                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
                        <div className="p-3 bg-amber-50 text-amber-600 rounded-xl border border-amber-100">
                            <Clock className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Em Aberto</p>
                            <h3 className="text-2xl font-bold text-gray-900">8</h3>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
                        <div className="p-3 bg-blue-50 text-blue-600 rounded-xl border border-blue-100">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Em Andamento</p>
                            <h3 className="text-2xl font-bold text-gray-900">3</h3>
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
                        <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-100">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Concluídos Hoje</p>
                            <h3 className="text-2xl font-bold text-gray-900">14</h3>
                        </div>
                    </div>

                </div>

                {/* Tabela de Chamados */}
                <div className="bg-white rounded-2xl border border-gray-100 shadow-xs overflow-hidden">
                    
                    {/* Filtros da Tabela */}
                    <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="relative w-full sm:w-80">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                            <input
                                type="text"
                                placeholder="Buscar por código ou título..."
                                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-blue-600 transition-all"
                            />
                        </div>
                        <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 py-2 border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 rounded-xl text-sm font-medium transition-colors cursor-pointer">
                            <Filter className="w-4 h-4 text-gray-500" />
                            <span>Filtrar</span>
                        </button>
                    </div>

                    {/* Tabela */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-sm">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="px-6 py-3.5">Código</th>
                                    <th className="px-6 py-3.5">Título / Solicitante</th>
                                    <th className="px-6 py-3.5">Prioridade</th>
                                    <th className="px-6 py-3.5">Status</th>
                                    <th className="px-6 py-3.5">Data</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-gray-700">
                                {chamadosExemplo.map((chamado) => (
                                    <tr key={chamado.id} className="hover:bg-gray-50/60 transition-colors cursor-pointer">
                                        <td className="px-6 py-4 font-mono font-medium text-blue-600">{chamado.id}</td>
                                        <td className="px-6 py-4">
                                            <p className="font-semibold text-gray-900">{chamado.titulo}</p>
                                            <p className="text-xs text-gray-400">{chamado.cliente}</p>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                chamado.prioridade === 'ALTA' ? 'bg-red-50 text-red-700 border border-red-100' :
                                                chamado.prioridade === 'MEDIA' ? 'bg-amber-50 text-amber-700 border border-amber-100' :
                                                'bg-gray-100 text-gray-700'
                                            }`}>
                                                {chamado.prioridade}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                chamado.status === 'CONCLUIDO' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' :
                                                chamado.status === 'EM_ANDAMENTO' ? 'bg-blue-50 text-blue-700 border border-blue-100' :
                                                'bg-amber-50 text-amber-700 border border-amber-100'
                                            }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${
                                                    chamado.status === 'CONCLUIDO' ? 'bg-emerald-500' :
                                                    chamado.status === 'EM_ANDAMENTO' ? 'bg-blue-500' :
                                                    'bg-amber-500'
                                                }`} />
                                                {chamado.status.replace('_', ' ')}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-xs text-gray-500">{chamado.data}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                </div>

            </main>
        </div>
    );
}