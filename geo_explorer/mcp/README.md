# Geo-Explorer MCP Server

Servidor MCP que expõe as funcionalidades do Geo-Explorer como ferramentas consumíveis por qualquer cliente compatível com o [Model Context Protocol](https://modelcontextprotocol.io) — incluindo IBM Bob, Claude Desktop, e integrações HTTP/SSO/API externas.

---

## 🛠️ Ferramentas disponíveis

| Ferramenta | Descrição |
|---|---|
| `buscar_trilha` | Busca trilhas por tecnologia e retorna plano de estudos formatado |
| `gerar_desafio` | Gera desafio de código aleatório por tecnologia e nível |
| `gerar_certificado` | Emite certificado fictício em Markdown para o aluno |

---

## ⚙️ Instalação e build

```bash
cd geo_explorer/mcp
npm install
npm run build
```

O binário compilado ficará em `mcp/build/index.js`.

---

## 🚀 Uso local (stdio — IBM Bob)

Após o build, registre no `.bob/mcp.json` do projeto:

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

Reinicie o Bob. As ferramentas aparecerão automaticamente no painel MCP.

---

## 🌐 Acesso remoto (HTTPS / API / SSO)

O servidor utiliza transporte **stdio** por padrão, que é o modo recomendado para uso local.
Para expô-lo via HTTPS, utilize um proxy HTTP na frente:

```bash
npm install -g @modelcontextprotocol/proxy
mcp-proxy --port 3000 -- node geo_explorer/mcp/build/index.js
```

Para registro remoto no Bob:

```json
{
  "mcpServers": {
    "geo-explorer-remote": {
      "url": "https://seu-dominio.com/mcp",
      "headers": {
        "Authorization": "Bearer ${env:GEO_API_TOKEN}"
      }
    }
  }
}
```

---

## 🔐 Variáveis de ambiente

| Variável | Uso | Obrigatória |
|---|---|---|
| `GEO_API_TOKEN` | Token Bearer para acesso remoto via HTTPS | Somente no modo remoto |
| `GEO_DATA_PATH` | Caminho alternativo para `trilhas_geo.json` | Não (usa padrão relativo) |

---

## 📁 Estrutura

```
mcp/
├── src/
│   └── index.ts        ← Servidor MCP principal
├── build/              ← Gerado por `npm run build`
│   └── index.js
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📋 Exemplos de uso (via Bob)

```
Busque a trilha de Java
→ Chama: buscar_trilha({ tecnologia: "Java" })

Gere um desafio de Python nível avançado
→ Chama: gerar_desafio({ tecnologia: "Python", nivel: "avancado" })

Emita o certificado de "Maria Silva" para a trilha "React"
→ Chama: gerar_certificado({ nome_usuario: "Maria Silva", nome_trilha: "React" })
```
