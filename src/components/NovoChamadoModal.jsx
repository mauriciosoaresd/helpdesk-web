import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { chamadoService } from '../services/chamadoService';

export function NovoChamadoModal({ isOpen, onClose, onChamadoCriado, usuarioLogadoId }) {
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [prioridade, setPrioridade] = useState('MEDIA');
    const [loading, setLoading] = useState(false);
    const [erro, setErro] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro('');

        if (!titulo.trim() || !descricao.trim()) {
            setErro('Preencha todos os campos obrigatórios.');
            return;
        }

        try {
            setLoading(true);
            // Usamos o ID do usuário logado como cliente (ou padrão 1 caso não venha definido)
            const clienteId = usuarioLogadoId || 1; 
            
            const dadosNovoChamado = {
                titulo,
                descricao,
                prioridade
            };

            await chamadoService.criarChamado(dadosNovoChamado, clienteId);
            
            // Limpa o formulário e fecha o modal
            setTitulo('');
            setDescricao('');
            setPrioridade('MEDIA');
            onChamadoCriado(); // Recarrega a lista no Dashboard
            onClose();
        } catch (err) {
            console.error('Erro ao criar chamado:', err);
            setErro('Erro ao cadastrar o chamado. Verifique os dados.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-100 animate-in fade-in zoom-in duration-200">
                
                {/* Header do Modal */}
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">Abrir Novo Chamado</h3>
                    <button
                        onClick={onClose}
                        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Formulário */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {erro && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                            <AlertCircle className="w-4 h-4 shrink-0" />
                            <span>{erro}</span>
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                            Título do Chamado
                        </label>
                        <input
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Ex: Falha na conexão com a impressora"
                            className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-blue-600 transition-all"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                            Prioridade
                        </label>
                        <select
                            value={prioridade}
                            onChange={(e) => setPrioridade(e.target.value)}
                            className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-blue-600 transition-all"
                        >
                            <option value="BAIXA">Baixa</option>
                            <option value="MEDIA">Média</option>
                            <option value="ALTA">Alta</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                            Descrição Detalhada
                        </label>
                        <textarea
                            value={descricao}
                            onChange={(e) => setDescricao(e.target.value)}
                            rows="4"
                            placeholder="Descreva detalhadamente o problema ou solicitação..."
                            className="w-full px-4 py-2 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:border-blue-600 transition-all resize-none"
                            required
                        />
                    </div>

                    {/* Botões de Ação */}
                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-5 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all cursor-pointer disabled:opacity-50"
                        >
                            {loading ? 'Salvando...' : 'Criar Chamado'}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}