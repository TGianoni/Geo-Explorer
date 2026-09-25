# Histórico de Prompts — Geo-Explorer

> Registro dos prompts usados para construir o projeto com IBM Bob.
> Útil para replicar o processo em projetos futuros.

---

## Prompt 1 — Exploração do repositório base

**Objetivo:** Entender a estrutura do `projeto_bob` para usá-lo como base.

**Prompt:**
```
Explore o repositório https://github.com/TGianoni/projeto_bob e me mostre
todos os arquivos, estrutura de pastas, e conteúdo dos arquivos principais.
```

**Resultado:** Mapa completo do projeto base, incluindo `trilhas_dio.json`, `test_runner.js`,
`index.ts` do MCP server e todos os slash commands.

---

## Prompt 2 — Criação do Geo-Explorer

**Objetivo:** Criar o novo projeto adaptado para o repositório Geo-Explorer.

**Prompt:**
```
Agora, quero pegar este último projeto como base, e criar um novo de acordo
com as especificações abaixo... novo repositório: https://github.com/TGianoni/Geo-Explorer.git
Repositório para termos como base: https://github.com/TGianoni/projeto_bob
[...especificações completas do desafio...]
```

**Resultado:** Projeto completo criado e publicado no GitHub com:
- `trilhas_geo.json` (35 trilhas, 3 novas em relação ao base)
- `test_runner.js` adaptado com suite completa (60+ testes)
- MCP Server em TypeScript (`index.ts`) com prefixo `GEO-` nos IDs
- Slash commands documentados (`/trilha`, `/desafio`, `/certificado`)
- Documentação completa (`README.md`, `GUIA_USO.md`, `INSIGHTS.md`)

---

## Decisões de Design

### Por que `GEO-` como prefixo nos IDs?

O projeto base usava `DIO-`. Como o novo projeto se chama Geo-Explorer,
todos os IDs de certificados e desafios usam o prefixo `GEO-` para refletir
a nova identidade. Exemplo: `GEO-2025-A3F7C1`, `GEO-JAVA-4231`.

### Por que adicionar 3 trilhas novas?

O enunciado do desafio pede melhorias e personalizações. As trilhas adicionadas
foram escolhidas por serem tecnologias emergentes e relevantes:
- **Kotlin Multiplatform** (id=33): crescimento acelerado no desenvolvimento mobile
- **Engenharia de Prompt com LLMs** (id=34): habilidade essencial na era da IA
- **GraphQL com Node.js** (id=35): padrão moderno de APIs

### Por que expandir a suite de testes?

A suite original testava apenas Java. O Geo-Explorer adiciona uma seção específica
para validar as 3 trilhas novas e verificar a integridade do catálogo completo.

---

## Como replicar este processo

1. Abra o workspace no IBM Bob
2. Use prompts incrementais: scaffolding → dados → lógica → testes → docs
3. Revise cada arquivo gerado antes de publicar
4. Nunca envie tokens, senhas ou informações privadas para o GitHub
5. Documente suas decisões (este arquivo é o exemplo)
