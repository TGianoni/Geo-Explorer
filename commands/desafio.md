# /desafio

**Descrição:** Gera um desafio de código aleatório com base no nível e na tecnologia escolhidos pelo usuário.

---

## Como usar

```
/desafio <tecnologia> <nivel>
```

**Níveis aceitos:** `iniciante` | `intermediario` | `avancado`

**Exemplos:**
```
/desafio Python iniciante
/desafio JavaScript intermediario
/desafio Rust avancado
```

---

## Comportamento

1. Valida os parâmetros `tecnologia` e `nivel`.
2. Seleciona aleatoriamente um desafio do banco interno compatível com o nível informado.
3. Exibe o enunciado, os requisitos, dicas e critérios de avaliação.

---

## Banco de desafios (exemplos por nível)

### Iniciante
- Crie uma classe com atributos básicos e implemente os métodos getters, setters e toString().
- Escreva um programa que leia uma lista de números e retorne apenas os pares.
- Implemente uma função que verifique se uma string é um palíndromo.
- Crie um contador de palavras que receba uma frase e retorne a frequência de cada palavra.
- Escreva um programa que calcule o fatorial de um número.

### Intermediário
- Implemente uma API REST com operações CRUD completas para gerenciar uma entidade de sua escolha.
- Crie um sistema de autenticação simples usando JWT com rotas protegidas.
- Desenvolva uma estrutura de dados de fila (Queue) do zero com enqueue, dequeue e peek.
- Implemente o padrão Observer para um sistema de notificações de eventos.
- Crie um sistema de cache simples com TTL (time-to-live).

### Avançado
- Projete e implemente um sistema de cache distribuído com TTL e invalidação por chave.
- Crie um pipeline de processamento assíncrono com filas de mensagens e dead-letter queue.
- Implemente um motor de busca com índice invertido e suporte a busca por prefixo.
- Desenvolva um ORM minimalista com suporte a migrations e relacionamentos.
- Crie um interpretador de expressões matemáticas usando árvore sintática abstrata (AST).

---

## Formato de saída

```markdown
# ⚔️ Desafio Geo-Explorer — {tecnologia} ({nivel})

**ID do Desafio:** #{id_aleatorio}
**Dificuldade:** {nivel}
**Tecnologia:** {tecnologia}
**Tempo estimado:** {tempo}

---

## 📋 Enunciado

{descrição detalhada do desafio}

---

## ✅ Requisitos

- [ ] {requisito 1}
- [ ] {requisito 2}

---

## 💡 Dicas

> {dica 1}

---

## 🏆 Critérios de Avaliação

| Critério | Peso |
|----------|------|
| Funcionalidade | 40% |
| Qualidade do código | 30% |
| Boas práticas | 20% |
| Criatividade | 10% |

---

## 🎁 Recompensa
**+{xp} XP** ao concluir · Badge: **{nome_badge}**
```

---

## Tratamento de erros

- **Nível inválido:** `❌ Nível "{nivel}" não reconhecido. Use: iniciante, intermediario ou avancado.`
- **Parâmetros ausentes:** `ℹ️ Uso correto: /desafio <tecnologia> <nivel>. Ex: /desafio Python iniciante`
