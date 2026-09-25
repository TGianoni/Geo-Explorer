# Guia de Uso — Geo-Explorer

> Referência prática para usar todos os recursos do projeto no dia a dia.

---

## 1. Slash Commands no IBM Bob

Para usar os comandos, abra o workspace `Geo-Explorer` no Bob e digite `/` no chat.

---

### `/trilha <tecnologia>`

Busca trilhas no catálogo e exibe um plano de estudos completo.

**Exemplos:**
```
/trilha Java
/trilha Python
/trilha React
/trilha Docker
/trilha GraphQL
```

**O que você vai receber:**
- Nome completo da trilha
- Tecnologia, nível e total de módulos
- Lista numerada de módulos
- Badges disponíveis ao concluir
- Lives relacionadas (gravadas ou ao vivo)
- Status da promoção atual

**Dicas:**
- A busca é **case-insensitive**: `/trilha java` e `/trilha JAVA` funcionam igual
- Você pode buscar por parte do nome: `/trilha Spring` retorna trilhas de Spring Boot
- Se mais de uma trilha for encontrada, todas serão exibidas

---

### `/desafio <tecnologia> <nivel>`

Gera um desafio de código personalizado com enunciado, requisitos e critérios de avaliação.

**Exemplos:**
```
/desafio Java intermediario
/desafio Python iniciante
/desafio Rust avancado
/desafio JavaScript intermediario
```

**Níveis aceitos:** `iniciante` | `intermediario` | `avancado`

**O que você vai receber:**
- ID único do desafio (`GEO-JAVA-XXXX`)
- Enunciado detalhado
- Checklist de requisitos para conclusão
- Dicas técnicas relevantes
- Tabela de critérios de avaliação
- XP e badge de recompensa

---

### `/certificado <nome_usuario> <nome_trilha>`

Emite um certificado fictício em Markdown e o salva no projeto.

**Exemplos:**
```
/certificado "João Silva" "Java Spring Boot do Zero ao Deploy"
/certificado "Maria Oliveira" "Machine Learning com Scikit-Learn"
/certificado "Carlos Mendes" "DevOps e CI/CD com Docker e Kubernetes"
```

**O que você vai receber:**
- Certificado formatado com frontmatter YAML
- ID único no formato `GEO-{ANO}-{HASH6}`
- Tabela com todos os dados da trilha
- Lista de badges conquistadas
- Arquivo salvo automaticamente em `certificados-emitidos/`

---

## 2. MCP Server (Ferramentas via IA)

Quando o workspace está aberto no Bob, o servidor MCP `geo-explorer` é carregado automaticamente.
Você pode pedir ao Bob para usar as ferramentas em linguagem natural:

```
"Busque as trilhas de Python disponíveis"
"Gere um desafio avançado de TypeScript para mim"
"Emita o certificado de 'Ana Lima' para a trilha de React"
```

O Bob chama as ferramentas `buscar_trilha`, `gerar_desafio` e `gerar_certificado` automaticamente.

---

## 3. Executar os Testes

```bash
cd geo_explorer
node src/test_runner.js
```

O relatório é exibido no terminal **e** salvo em `data/resultado_testes.txt`.

Para adicionar novos testes, edite `src/test_runner.js` e use a função `assert()`:

```javascript
assert("Descrição do teste", condicaoBooleana, "Detalhe do erro opcional");
```

---

## 4. Rebuild do MCP Server

Se você modificar `mcp/src/index.ts`, reconstrua o servidor:

```bash
cd geo_explorer/mcp
npm install
npm run build
```

O Bob recarrega automaticamente o servidor após o rebuild.

---

## 5. Adicionar novas trilhas ao catálogo

Edite o arquivo `data/trilhas_geo.json` e adicione um novo objeto no array `trilhas`:

```json
{
  "id": 36,
  "nome": "Nome da Nova Trilha",
  "tecnologia": "Tecnologia",
  "nivel": "Iniciante | Intermediário | Avançado",
  "numero_modulos": 10,
  "xp_total": 5000,
  "badges_disponiveis": ["Badge 1", "Trilha Concluída"],
  "promocoes": {
    "ativa": false,
    "desconto_percentual": 0,
    "validade": null
  },
  "vitalicio": true,
  "lives": [
    { "titulo": "Live de lançamento", "data": "2025-08-01", "gravada": false }
  ]
}
```

Lembre de atualizar `total_trilhas` e `ultima_atualizacao` no final do arquivo.
