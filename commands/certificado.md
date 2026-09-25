# /certificado

**Descrição:** Gera um certificado fictício em Markdown para um usuário que concluiu uma trilha do Geo-Explorer.

---

## Como usar

```
/certificado <nome_usuario> <nome_trilha>
```

**Exemplos:**
```
/certificado "João Silva" "Fundamentos de Python para Data Science"
/certificado "Maria Oliveira" "Desenvolvedor Full Stack JavaScript"
/certificado "Carlos Mendes" "DevOps e CI/CD com Docker e Kubernetes"
```

---

## Comportamento

1. Recebe o nome do usuário e o nome da trilha.
2. Busca a trilha correspondente em `data/trilhas_geo.json` para obter tecnologia, nível e XP.
3. Gera um ID único de certificado no formato `GEO-{ANO}-{HASH_6_CHARS}`.
4. Renderiza o certificado completo em Markdown.
5. Salva o arquivo em `certificados-emitidos/{nome_usuario}_{id_certificado}.md`.

---

## Formato de saída

```markdown
---
certificado_id: GEO-2025-A3F7C1
emitido_em: {data_atual}
usuario: {nome_usuario}
trilha: {nome_trilha}
tecnologia: {tecnologia}
nivel: {nivel}
xp_obtido: {xp_total}
valido: true
---

# 🎓 Certificado de Conclusão

---

> *O Geo-Explorer certifica que*

## {NOME DO USUÁRIO}

> *concluiu com êxito a trilha de aprendizagem*

## 🌍 {Nome da Trilha}

---

| Campo | Detalhe |
|-------|---------|
| 🖥️ Tecnologia | {tecnologia} |
| 📊 Nível | {nivel} |
| 📦 Módulos concluídos | {numero_modulos} |
| ⭐ XP obtido | {xp_total} XP |
| 📅 Data de conclusão | {data_atual} |
| 🔑 ID do Certificado | `GEO-{ANO}-{HASH}` |

---

## 🏅 Badges conquistadas

{lista de badges da trilha}

---

> *Este certificado é emitido pelo Geo-Explorer e comprova*
> *a dedicação e o esforço do(a) aluno(a) na jornada de aprendizado.*

---

**Geo-Explorer**
https://github.com/TGianoni/Geo-Explorer · Emitido via Geo-Explorer MCP Server

---
*Verificação: `GEO-{ANO}-{HASH}` · Documento fictício gerado automaticamente.*
```

---

## Tratamento de erros

- **Trilha não encontrada:** `❌ Trilha "{nome_trilha}" não encontrada em trilhas_geo.json. Verifique o nome e tente novamente.`
- **Nome do usuário vazio:** `❌ Informe o nome do usuário. Ex: /certificado "João Silva" "React"`
- **Parâmetros insuficientes:** `ℹ️ Uso correto: /certificado <nome_usuario> <nome_trilha>`
