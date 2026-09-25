# Insights para Futuros Profissionais — Geo-Explorer

> Lições aprendidas, padrões descobertos e reflexões sobre o uso de IA no desenvolvimento
> de software. Este documento foi escrito com base na experiência real de construir este
> projeto do zero usando IBM Bob.

---

## 🧠 Sobre usar IA como parceiro de desenvolvimento

### 1. A IA não substitui o raciocínio — ela amplifica

O Bob não "inventou" o projeto. Ele executou com precisão cada instrução dada.
A qualidade do output é diretamente proporcional à qualidade do input (o prompt).

> **Princípio fundamental:** Garbage in, garbage out — mas com IA o efeito é amplificado.
> Um prompt vago produz código vago. Um prompt preciso produz código de produção.

### 2. Iteração incremental supera o prompt perfeito

Não existe um único prompt mágico que gera tudo de uma vez. Este projeto foi construído
em prompts incrementais, cada um adicionando uma camada sobre a anterior.

**Padrão recomendado:**
```
Prompt 1: estrutura e scaffolding
Prompt 2: dados e modelos
Prompt 3: lógica de negócio
Prompt 4: interface (commands/APIs)
Prompt 5: testes e validação
Prompt 6: infraestrutura (MCP/deploy)
Prompt 7: documentação
```

### 3. Contexto acumulado é um ativo valioso

O Bob lembrou de cada decisão anterior ao longo de toda a sessão — nomes de arquivos,
estrutura de pastas, dados do JSON. Referencie trabalho anterior sem repetir detalhes.

---

## 🏗️ Sobre arquitetura e estrutura de projetos

### 4. Separe responsabilidades desde o início

A estrutura `src/`, `data/`, `commands/`, `mcp/`, `docs/` não foi acidental.
Cada pasta tem uma responsabilidade única:

| Pasta | Responsabilidade |
|---|---|
| `src/` | Lógica executável (testes, scripts) |
| `data/` | Dados e estado persistido |
| `commands/` | Interface do usuário (slash commands documentados) |
| `mcp/` | Camada de integração e exposição de API |
| `docs/` | Conhecimento e memória do projeto |

### 5. O JSON como fonte de verdade (SSOT)

Usar `trilhas_geo.json` como única fonte de verdade para os três comandos e para o MCP Server
garante **consistência automática**: mudar um dado no JSON reflete em todos os consumidores.

### 6. .gitkeep e arquivos de controle

Adicionar `.gitkeep` em pastas vazias garante que a estrutura do projeto seja versionada
mesmo antes de ter conteúdo.

---

## 🔌 Sobre MCP (Model Context Protocol)

### 7. MCP é o futuro das integrações com IA

O protocolo MCP padroniza como ferramentas externas se comunicam com LLMs.
Ao construir um servidor MCP, você torna seu projeto consumível por IBM Bob, Claude Desktop
e qualquer futuro cliente compatível com MCP.

> Pense no MCP como o "REST API para o mundo dos LLMs".

### 8. stdio vs HTTP — quando usar cada um

| Transporte | Quando usar |
|---|---|
| `stdio` | Uso local, desenvolvimento, projetos pessoais |
| `HTTP/HTTPS` | Equipes, produção, acesso remoto |
| `SSO/OAuth` | Empresas, dados sensíveis, multi-usuário |

### 9. TypeScript para servidores MCP

TypeScript é a escolha certa para servidores MCP: tipagem forte, SDK oficial com tipos
completos, `zod` para validação de inputs, e binário compilado portável.

---

## 🧪 Sobre testes e qualidade

### 10. Testes sem frameworks externos são possíveis — e úteis

O `test_runner.js` usa apenas Node.js puro. Entender como um framework de testes
funciona internamente torna você um desenvolvedor melhor.

### 11. A meta de 70% é um piso, não um teto

Especificamos 70% de cobertura como meta mínima. Boa cobertura de testes não é
sobre porcentagem — é sobre testar os casos que importam.

### 12. Artefatos de teste são parte do produto

Os testes não apenas validam — eles **produzem artefatos reais**:
certificados, desafios e relatórios gerados durante os testes.

---

## 📝 Sobre slash commands e automação

### 13. Slash commands são prompts versionados

Um arquivo `.md` em `commands/` é essencialmente um **prompt salvo e reutilizável**.
Você pode versionar seus prompts junto com o código (Git) e sua equipe compartilha
os mesmos prompts, garantindo consistência.

### 14. Comandos locais vs globais

| Localização | Escopo |
|---|---|
| `.bob/commands/` | Apenas este projeto |
| `~/.bob/commands/` | Todos os projetos |

---

## 🚀 Sobre crescimento profissional

### 15. Documente enquanto constrói, não depois

Documentar enquanto você constrói é mais fácil e mais preciso — os detalhes ainda estão frescos.

### 16. O projeto como portfólio

Este projeto demonstra na prática:
- Conhecimento de estrutura de projetos
- Capacidade de trabalhar com JSON e dados
- Entendimento de protocolo MCP e integrações
- Escrita de testes unitários
- Uso eficiente de ferramentas de IA
- Documentação técnica clara

### 17. Aprenda os protocolos, não só as ferramentas

As ferramentas mudam. Os protocolos ficam. REST, Git, MCP — investir em entender
**como** funcionam é um diferencial duradouro.

### 18. A IA como aceleradora do aprendizado

Use o Bob para entender código, aprender padrões, resolver problemas específicos
e gerar código boilerplate. Mas sempre **leia e entenda** o que foi gerado.

### 19. Melhorias pequenas, funcionando e bem explicadas

Uma melhoria pequena, funcionando e bem explicada já representa uma ótima evolução.
O Geo-Explorer adicionou 3 trilhas novas (KMP, Prompt Engineering, GraphQL) e
expandiu a suíte de testes com casos específicos para essas novas entradas.

### 20. Construa, quebre, conserte — e documente tudo

O código é o produto. O processo é o conhecimento. Este arquivo é o legado.
