# Sistema de Pessoas Desaparecidas
## Polícia Judiciária Civil do Estado de Mato Grosso

### Descrição

Aplicação web moderna para consulta e registro de informações sobre pessoas desaparecidas em Mato Grosso. Desenvolvida em React com TypeScript, seguindo as melhores práticas de desenvolvimento frontend.

### Funcionalidades
- 🔍 Busca avançada de pessoas desaparecidas com filtros
- 📊 Estatísticas em tempo real
- 📱 Design responsivo para todos os dispositivos
- 📄 Visualização detalhada de casos
- 📷 Upload de fotos e informações por cidadãos
- ⚡ Carregamento otimizado com lazy loading
- 🔒 Tratamento robusto de erros

### Tecnologias Utilizadas
- **Frontend**: React 18 + TypeScript
- **Roteamento**: React Router com lazy loading
- **Estado**: TanStack Query (React Query)
- **Formulários**: React Hook Form + Zod
- **Estilização**: Tailwind CSS
- **Build**: Vite
- **Container**: Docker + Nginx

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- Docker (para containerização)

### Instalação e Execução

#### Desenvolvimento Local
```bash
# Clone o repositório
git clone https://github.com/viniciusdemoraess/rest-api-missing-persons.git
```

```bash
cd rest-api-missing-persons
```

```bash
# Instale as dependências
npm install
```

```bash
# Execute em modo de desenvolvimento
npm run dev
```

Acesse: http://localhost:5173

#### Docker
```bash
# Build da imagem
docker build -t rest-api-missing-persons .

# Execute o container
docker run -p 5173:80 rest-api-missing-persons

# Acesse: http://localhost:5173
```

### Usando Docker Compose (Para ficar ainda mais simples)

```bash
# Subir containers
docker-compose up -d
```

```bash
# Parar containers
docker-compose down
```
A aplicação ficará disponível em http://localhost:5173

O Docker Compose facilita subir múltiplos serviços se futuramente houver backend ou banco de dados.

### Execução de Testes

```bash
# Executa todos os testes
npm run test
```


### Scripts Disponíveis
- `npm run dev` - Servidor de desenvolvimento
- `npm run build` - Build de produção
- `npm run preview` - Preview do build
- `npm run lint` - Análise de código
- `npm run test` - Executa os testes da aplicação

### Estrutura do Projeto
```
src/
├── components/          # Componentes reutilizáveis
│   ├── Layout/         # Header, Footer
│   ├── Search/         # Busca e filtros
│   ├── Forms/          # Formulários
│   └── UI/             # Componentes base
├── pages/              # Páginas da aplicação
├── services/           # Integração com API
├── types/              # Tipos TypeScript
└── App.tsx            # Componente principal
```

### API Integration
A aplicação consome a API REST da Polícia Civil MT:
- Base URL: `https://abitus-api.geia.vip`
- Endpoints utilizados:
  - `/v1/pessoas/aberto/filtro` - Busca de pessoas
  - `/v1/pessoas/{id}` - Detalhes
  - `/v1/ocorrencias/informacoes-desaparecido` - Informações
  - `/v1/pessoas/aberto/estatistico` - Estatísticas

### Responsividade
- **Mobile**: < 768px - Layout em coluna única
- **Tablet**: 768px - 1024px - Grid adaptativo
- **Desktop**: > 1024px - Layout completo com múltiplas colunas

### Segurança e Performance
- Validação de formulários com Zod
- Tratamento de erros robusto
- Otimização de imagens
- Cache inteligente
- Lazy loading de rotas
- Headers de segurança (nginx)

---
*Desenvolvido para resolução do PROJETO PRÁTICO – IMPLEMENTAÇÃO FRONT-END da empresa DESENVOLVE MT*