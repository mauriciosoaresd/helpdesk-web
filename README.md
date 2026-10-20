# HelpDesk OS — Frontend Web

Interface web moderna e responsiva para a plataforma de gestão de chamados e suporte técnico (**HelpDesk OS**), desenvolvida com **React**, **Vite**, **Tailwind CSS** e **JavaScript**.

---

## 🛠️ Tecnologias Utilizadas

- **[React 18](https://react.dev/)**: Biblioteca principal para construção da interface baseada em componentes.
- **[Vite](https://vitejs.dev/)**: Build tool e ambiente de desenvolvimento ultrarrápido.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Framework CSS utilitário para estilização responsiva e moderna.
- **[React Router DOM](https://reactrouter.com/)**: Gerenciamento de rotas e navegação da aplicação.
- **[Axios](https://axios-http.com/)**: Cliente HTTP com suporte a interceptores para injeção automática de tokens JWT.
- **[Lucide React](https://lucide.dev/)**: Conjunto de ícones vetoriais leves e consistentes.

---

## 🏛️ Estrutura do Projeto

```text
src/
├── components/      # Componentes reutilizáveis de UI
├── context/         # Gerenciamento de estado global (AuthContext)
├── pages/           # Telas da aplicação (Login, Dashboard)
├── routes/          # Proteção e mapeamento de rotas (AppRoutes, RotaProtegida)
├── services/        # Configuração do Axios e integração com a API Spring Boot
├── App.jsx          # Provedores globais e entrada de rotas
├── index.css        # Importações globais do Tailwind CSS
└── main.jsx         # Ponto de entrada da aplicação React

🔑 Funcionalidades Principais
[x] Autenticação JWT: Login com e-mail e senha integrado ao backend Spring Boot.

[x] Gestão de Sessão: Armazenamento seguro de token JWT no localStorage.

[x] Rotas Protegidas: Restrição de acesso ao Dashboard para usuários não autenticados.

[x] Interceptor Axios: Anexação automática do cabeçalho Authorization: Bearer <token> em todas as requisições protegidas.

[x] Dashboard Responsivo: Painel interativo com estatísticas de chamados (Em Aberto, Em Andamento, Concluídos) e listagem estilizada.

🚀 Como Executar o Projeto
Pré-requisitos
Node.js: v18+ instalado

Backend Spring Boot: Em execução na porta 8080 (http://localhost:8080)

Passo a Passo
# 1. Instalar as dependências do projeto
npm install

# 2. Iniciar o servidor de desenvolvimento Vite
npm run dev
A aplicação estará acessível em: http://localhost:5173