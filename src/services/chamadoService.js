import api from './api';

export const chamadoService = {
    listarTodos: async () => {
        const response = await api.get('/chamados');
        return response.data;
    },

    criarChamado: async (dadosChamado, clienteId) => {
        const response = await api.post(`/chamados?clienteId=${clienteId}`, dadosChamado);
        return response.data;
    },

    atualizarStatus: async (id, status) => {
        const response = await api.patch(`/chamados/${id}/status?status=${status}`);
        return response.data;
    },

    atribuirTecnico: async (id, tecnicoId) => {
        const response = await api.patch(`/chamados/${id}/tecnico?tecnicoId=${tecnicoId}`);
        return response.data;
    }
};