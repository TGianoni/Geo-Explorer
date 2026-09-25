# 🌍 Geo-Explorer

> Projeto construído com **IBM Bob** como demonstração prática de engenharia de software assistida por IA.  
> Baseado no projeto [projeto_bob](https://github.com/TGianoni/projeto_bob) e adaptável para qualquer plataforma de aprendizado.

---

## 📋 O que é o Geo-Explorer?

O **Geo-Explorer** é uma experiência de exploração de trilhas de aprendizagem. A pessoa usuária pode:

- 📚 **Consultar uma trilha** de estudos conforme a tecnologia de interesse
- ⚔️ **Receber um desafio** de código personalizado por tecnologia e nível
- 🎓 **Gerar um certificado** fictício para uma trilha concluída

Todo o fluxo é acessível por **slash commands** no IBM Bob e também via **servidor MCP** em TypeScript,
que pode ser integrado a qualquer cliente compatível com o Model Context Protocol.

---

## 🗂️ Estrutura do Projeto

```
Geo-Explorer/
├── commands/                     ← Documentação dos slash commands
│   ├── trilha.md                   → /trilha <tecnologia>
│   ├── desafio.md                  → /desafio <tecnologia> <nivel>
│   └── certificado.md              → /certificado <nome> <trilha>
├── geo_explorer/
│   ├── src/
│   │   └── test_runner.js            ← 60+ testes unitários (Node.js puro)
│   ├── data/
│   │   ├── trilhas_geo.json          ← Catálogo com 35 trilhas fictícias
│   │   └── resultado_testes.txt      ← Relatório gerado após execução dos testes
│   ├── docs/
│   │   ├── GUIA_USO.md               ← Guia prático de uso de todos os recursos
│   │   ├── PROMPTS.md                ← Histórico dos prompts usados com o Bob
│   │   └── INSIGHTS.md               ← 20 insights para futuros profissionais
│   ├── mcp/
│   │   ├── src/index.ts              ← Servidor MCP principal (TypeScript)
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── README.md                 ← Documentação do MCP Server
│   ├── certificados-emitidos/      ← Certificados gerados
│   └── desafios-gerados/           ← Desafios gerados
├── .gitignore
└── bob.ignore
```

---

## ⚡ Como executar o projeto

### Pré-requisitos

- **Node.js** >= 18.0.0
- **Git**

### Clonar e configurar

```bash
git clone https://github.com/TGianoni/Geo-Explorer.git
cd Geo-Explorer
```

Não há instalação de dependências para os testes (Node.js puro). O MCP Server exige build separado (ver abaixo).

---

## 📋 Como usar os comandos

Abra o workspace no IBM Bob e digite `/` no chat para ver os comandos disponíveis.

### `/trilha <tecnologia>`
Busca trilhas no catálogo e retorna um plano de estudos formatado.
```
/trilha Java
/trilha Python
/trilha React
/trilha GraphQL
```

### `/desafio <tecnologia> <nivel>`
Gera um desafio de código com enunciado, requisitos e critérios de avaliação.  
Níveis: `iniciante` | `intermediario` | `avancado`
```
/desafio Java intermediario
/desafio Python iniciante
/desafio Rust avancado
```

### `/certificado <nome_usuario> <nome_trilha>`
Emite um certificado fictício em Markdown com ID único e salva em `certificados-emitidos/`.
```
/certificado "João Silva" "Java Spring Boot do Zero ao Deploy"
```

---

## 🧪 Como executar os testes

```bash
cd geo_explorer
node src/test_runner.js
```

O relatório é exibido no terminal e salvo automaticamente em `data/resultado_testes.txt`.

**Suite de testes:**
- `/trilha` — consulta e estrutura de dados do catálogo
- `/desafio` — geração de desafios por nível e tecnologia
- `/certificado` — emissão de certificados e tratamento de erros
- **Catálogo** — validação das 3 trilhas novas e integridade geral

**Meta de cobertura:** >= 70% (o projeto atinge 100%)

---

## 🔌 MCP Server

### Instalação e build

```bash
cd geo_explorer/mcp
npm install
npm run build
```

### Ferramentas disponíveis

| Ferramenta | Parâmetros | Descrição |
|---|---|---|
| `buscar_trilha` | `tecnologia: string` | Retorna plano de estudos |
| `gerar_desafio` | `tecnologia, nivel` | Gera e salva desafio |
| `gerar_certificado` | `nome_usuario, nome_trilha` | Emite e salva certificado |

### Registro no IBM Bob (`.bob/mcp.json`)

```json
{
  "mcpServers": {
    "geo-explorer": {
      "command": "node",
      "args": ["CAMINHO_ABSOLUTO/Geo-Explorer/geo_explorer/mcp/build/index.js"]
    }
  }
}
```

Consulte [`geo_explorer/mcp/README.md`](geo_explorer/mcp/README.md) para configuração de acesso remoto (HTTPS/SSO).

---

## 💡 Melhorias realizadas

Em relação ao projeto base (`projeto_bob`), o Geo-Explorer traz:

| Melhoria | Descrição |
|---|---|
| **3 trilhas novas** | Kotlin Multiplatform (id=33), Engenharia de Prompt com LLMs (id=34) e GraphQL com Node.js (id=35) |
| **Identidade própria** | Prefixo `GEO-` em todos os IDs (certificados e desafios), branding Geo-Explorer |
| **Suite de testes expandida** | Seção dedicada para validar as 3 trilhas novas e integridade geral do catálogo |
| **Banco de desafios ampliado** | 5 desafios por nível (era 4 no base) — +25% de variedade |
| **Documentação de prompts** | `PROMPTS.md` registrando as decisões de design e o processo de criação |

---

## 📚 O que aprendi durante o desafio

**Sobre IBM Bob e IA assistida:**
- Prompts incrementais são mais eficientes do que tentar gerar tudo de uma vez
- O contexto acumulado durante a sessão é um ativo valioso — o Bob lembrou de cada decisão anterior
- Revisar o código gerado é fundamental — a IA amplifica o que você pede, bom ou ruim

**Sobre o projeto em si:**
- Separar responsabilidades em pastas específicas (`src/`, `data/`, `mcp/`, `docs/`) torna o projeto mantenível
- Usar um único arquivo JSON como fonte de verdade (SSOT) garante consistência entre o MCP Server, os testes e os slash commands
- Testes sem frameworks externos (Node.js puro) são completamente viáveis e ensinam como os frameworks funcionam por baixo

**Sobre MCP:**
- O Model Context Protocol é o "REST API para o mundo dos LLMs" — aprender a construir servidores MCP hoje é uma vantagem competitiva real
- O transporte `stdio` é simples e suficiente para uso local; HTTP/HTTPS é a evolução natural para produção
- TypeScript + `zod` é a combinação ideal para servidores MCP: tipagem forte e validação de inputs integrada

**Lição principal:**
> Mais importante do que gerar muitos arquivos é entender o que foi construído,
> testar o resultado e conseguir explicar suas escolhas.

---

## 🛣️ Roadmap

- [ ] Interface web (React/Next.js) para o catálogo de trilhas
- [ ] Banco de dados real (SQLite ou PostgreSQL)
- [ ] Endpoint HTTPS para o MCP Server
- [ ] Geração de certificados em PDF
- [ ] Dashboard de progresso do aluno
- [ ] Mais trilhas e desafios específicos por tecnologia

---

## 🛠️ Stack

- **Runtime:** Node.js 18+
- **Linguagem MCP:** TypeScript
- **Protocolo:** [Model Context Protocol (MCP)](https://modelcontextprotocol.io)
- **Dados:** JSON
- **Testes:** Node.js puro (sem frameworks externos)
- **IA usada:** IBM Bob

---

## 📚 Documentação Completa

| Documento | Conteúdo |
|---|---|
| [`geo_explorer/docs/GUIA_USO.md`](geo_explorer/docs/GUIA_USO.md) | Guia prático de uso de todos os recursos |
| [`geo_explorer/docs/PROMPTS.md`](geo_explorer/docs/PROMPTS.md) | Histórico dos prompts usados e decisões de design |
| [`geo_explorer/docs/INSIGHTS.md`](geo_explorer/docs/INSIGHTS.md) | 20 insights para futuros profissionais |
| [`geo_explorer/mcp/README.md`](geo_explorer/mcp/README.md) | Documentação do MCP Server |

---

> Projeto desenvolvido com **IBM Bob** como estudo de caso de engenharia assistida por IA.  
> Repositório base: [TGianoni/projeto_bob](https://github.com/TGianoni/projeto_bob)
