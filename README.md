# AutoU Email Classifier - Frontend

Frontend em React + Vite + Tailwind CSS para consumir a API de classificação de emails da AutoU.

## 🚀 Tecnologias

- **React 18** - Biblioteca para construção de interfaces
- **Vite** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **React Router DOM** - Roteamento do lado do cliente
- **Axios** - Cliente HTTP para comunicação com a API
- **Lucide React** - Ícones SVG
- **React Hot Toast** - Notificações elegantes

## 📋 Funcionalidades Implementadas

### ✅ Autenticação
- [x] Login com email e senha
- [x] Registro de novos usuários  
- [x] Autenticação JWT com localStorage
- [x] Rotas protegidas
- [x] Logout automático em caso de token inválido

### ✅ Processamento de Emails
- [x] Envio de texto para classificação
- [x] Upload de arquivos PDF/TXT
- [x] Validação de tipos de arquivo
- [x] Feedback visual durante processamento

### ✅ Histórico e Resultados
- [x] Listagem de emails processados
- [x] Exibição de status (Processando/Concluído/Falhou)
- [x] Classificação (Produtivo/Improdutivo)
- [x] Respostas sugeridas pela IA
- [x] Expandir/recolher detalhes dos emails

### ✅ Interface e UX
- [x] Tema escuro responsivo
- [x] Componentes reutilizáveis
- [x] Loading states e feedback visual
- [x] Notificações toast
- [x] Validação de formulários

## 🛠️ Como Executar

### Pré-requisitos
- Node.js 18+
- API Backend rodando em `http://127.0.0.1:8000`

### Passos
```bash
git clone git@github.com:ViniciusLugli/AutoU-Email-Front.git
cd AutoU-Email-Front
npm install
npm run dev
```

Acesse: http://localhost:5173

## 📡 API Consumida
- `POST /auth/register` - Registro
- `POST /auth/login` - Login  
- `POST /texts/processar_email` - Processar email
- `GET /texts/` - Listar emails

Para mais detalhes da API, consulte: [API_README.md](./API_README.md)
