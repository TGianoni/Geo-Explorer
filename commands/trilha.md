# /trilha

**Descrição:** Recebe o nome de uma tecnologia e retorna um plano de estudo detalhado com base nas trilhas cadastradas em `data/trilhas_geo.json`.

---

## Como usar

```
/trilha <tecnologia>
```

**Exemplos:**
```
/trilha Python
/trilha React
/trilha Docker
```

---

## Comportamento

1. Lê o arquivo `data/trilhas_geo.json`.
2. Busca todas as trilhas cujo campo `tecnologia` contenha o termo informado (case-insensitive).
3. Para cada trilha encontrada, exibe o plano de estudo formatado abaixo.
4. Se nenhuma trilha for encontrada, exibe uma mensagem de erro amigável.

---

## Formato de saída

```markdown
# 📚 Plano de Estudo — {nome da trilha}

**Tecnologia:** {tecnologia}
**Nível:** {nivel}
**Total de Módulos:** {numero_modulos}
**XP Total:** {xp_total} XP
**Acesso Vitalício:** {Sim | Não}

---

## 🗂️ Módulos

| # | Módulo | Estimativa |
|---|--------|------------|
| 1 | Introdução à {tecnologia} | ~2h |
| 2 | Configuração do ambiente | ~1h |
| ... | ... | ... |
| {numero_modulos} | Projeto final e deploy | ~4h |

---

## 🏅 Badges disponíveis
{lista de badges}

---

## 📺 Lives relacionadas
{lista de lives com data e status (gravada/ao vivo)}

---

## 🎯 Promoção
{se ativa: "🔥 {desconto}% de desconto até {validade}" | se inativa: "Sem promoção ativa no momento"}
```

---

## Tratamento de erros

- **Tecnologia não encontrada:** `❌ Nenhuma trilha encontrada para "{tecnologia}". Tente: Python, React, AWS, Docker, Kotlin...`
- **Múltiplos resultados:** lista todas as trilhas encontradas e pede ao usuário para confirmar qual deseja ver.
