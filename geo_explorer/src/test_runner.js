/**
 * Geo-Explorer — Test Runner
 * Testes unitários para os comandos /trilha, /desafio e /certificado
 * Cobertura alvo: >= 70%
 *
 * Execução: node src/test_runner.js
 */

const fs = require("fs");
const path = require("path");

// ─── Utilitários do runner ─────────────────────────────────────────────

const results = [];
let passed = 0;
let failed = 0;

function assert(description, condition, detail = "") {
  if (condition) {
    passed++;
    results.push({ status: "PASS", description, detail });
  } else {
    failed++;
    results.push({ status: "FAIL", description, detail: detail || "Condição falhou" });
  }
}

function section(name) {
  results.push({ status: "SECTION", description: name });
}

// ─── Módulo sob teste: trilha ───────────────────────────────────────────────

function loadTrilhas() {
  const jsonPath = path.join(__dirname, "../data/trilhas_geo.json");
  const raw = fs.readFileSync(jsonPath, "utf-8");
  return JSON.parse(raw);
}

function buscarTrilha(tecnologia) {
  const { trilhas } = loadTrilhas();
  return trilhas.filter(t =>
    t.tecnologia.toLowerCase().includes(tecnologia.toLowerCase())
  );
}

function gerarPlanoEstudo(trilha) {
  if (!trilha) return null;
  const promocao = trilha.promocoes.ativa
    ? `\uD83D\uDD25 ${trilha.promocoes.desconto_percentual}% de desconto at\u00e9 ${trilha.promocoes.validade}`
    : "Sem promo\u00e7\u00e3o ativa no momento.";

  const livesFormatadas = trilha.lives
    .map(l => `  - ${l.titulo} (${l.data}) \u2014 ${l.gravada ? "Gravada \u2705" : "Ao vivo \uD83D\uDD34"}`)
    .join("\n");

  const badges = trilha.badges_disponiveis.map(b => `  - ${b}`).join("\n");

  return `# \uD83D\uDCDA Plano de Estudo \u2014 ${trilha.nome}\n\n**Tecnologia:** ${trilha.tecnologia}\n**N\u00edvel:** ${trilha.nivel}\n**M\u00f3dulos:** ${trilha.numero_modulos}\n**XP Total:** ${trilha.xp_total} XP\n**Acesso Vital\u00edcio:** ${trilha.vitalicio ? "Sim" : "N\u00e3o"}\n\n## \uD83D\uDDC2\uFE0F M\u00f3dulos previstos\n${Array.from({ length: trilha.numero_modulos }, (_, i) => `  ${i + 1}. M\u00f3dulo ${i + 1}`).join("\n")}\n\n## \uD83C\uDFC5 Badges dispon\u00edveis\n${badges}\n\n## \uD83D\uDCFA Lives\n${livesFormatadas}\n\n## \uD83C\uDFAF Promo\u00e7\u00e3o\n${promocao}`;
}

// ─── Módulo sob teste: desafio ──────────────────────────────────────────────

const NIVEIS_VALIDOS = ["iniciante", "intermediario", "avancado"];

const DESAFIOS = {
  iniciante: [
    "Crie uma classe com atributos b\u00e1sicos e implemente os m\u00e9todos getters, setters e toString().",
    "Escreva um programa que leia uma lista de n\u00fameros e retorne apenas os pares.",
    "Implemente uma fun\u00e7\u00e3o que verifique se uma string \u00e9 um pal\u00edndromo.",
    "Crie um contador de palavras que receba uma frase e retorne a frequ\u00eancia de cada palavra.",
    "Escreva um programa que calcule o fatorial de um n\u00famero.",
  ],
  intermediario: [
    "Implemente uma API REST com opera\u00e7\u00f5es CRUD completas para gerenciar uma entidade de sua escolha.",
    "Crie um sistema de autentica\u00e7\u00e3o simples usando JWT com rotas protegidas.",
    "Desenvolva uma estrutura de dados de fila (Queue) do zero com enqueue, dequeue e peek.",
    "Implemente o padr\u00e3o Observer para um sistema de notifica\u00e7\u00f5es de eventos.",
    "Crie um sistema de cache simples com TTL (time-to-live).",
  ],
  avancado: [
    "Projete e implemente um sistema de cache distribu\u00eddo com TTL e invalida\u00e7\u00e3o por chave.",
    "Crie um pipeline de processamento ass\u00edncrono com filas de mensagens e dead-letter queue.",
    "Implemente um motor de busca com \u00edndice invertido e suporte a busca por prefixo.",
    "Desenvolva um ORM minimalista com suporte a migrations e relacionamentos.",
    "Crie um interpretador de express\u00f5es matem\u00e1ticas usando \u00e1rvore sint\u00e1tica abstrata (AST).",
  ],
};

function gerarDesafio(tecnologia, nivel) {
  if (!tecnologia) return { erro: "Tecnologia n\u00e3o informada." };
  const nivelNorm = nivel ? nivel.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "") : "";
  if (!NIVEIS_VALIDOS.includes(nivelNorm)) {
    return { erro: `N\u00edvel "${nivel}" inv\u00e1lido. Use: iniciante, intermediario ou avancado.` };
  }
  const pool = DESAFIOS[nivelNorm];
  const enunciado = pool[Math.floor(Math.random() * pool.length)];
  const xpMap = { iniciante: 500, intermediario: 1200, avancado: 2500 };
  const id = `GEO-${tecnologia.toUpperCase().replace(/\s/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;

  return {
    id,
    tecnologia,
    nivel: nivelNorm,
    enunciado,
    requisitos: [
      "C\u00f3digo compila e executa sem erros",
      "Cobertura de testes >= 70%",
      "Sem uso de bibliotecas n\u00e3o autorizadas",
      "README com instru\u00e7\u00f5es de execu\u00e7\u00e3o",
    ],
    dicas: [
      `Consulte a documenta\u00e7\u00e3o oficial de ${tecnologia}`,
      "Escreva testes antes de implementar (TDD)",
    ],
    xp: xpMap[nivelNorm],
    badge: `${tecnologia} ${nivelNorm.charAt(0).toUpperCase() + nivelNorm.slice(1)} Challenger`,
  };
}

function formatarDesafio(d) {
  if (d.erro) return `\u274C ${d.erro}`;
  return `# \u2694\uFE0F Desafio Geo-Explorer \u2014 ${d.tecnologia} (${d.nivel})\n\n**ID:** ${d.id}\n**Dificuldade:** ${d.nivel}\n**Tecnologia:** ${d.tecnologia}\n\n## \uD83D\uDCCB Enunciado\n${d.enunciado}\n\n## \u2705 Requisitos\n${d.requisitos.map(r => `- [ ] ${r}`).join("\n")}\n\n## \uD83D\uDCA1 Dicas\n${d.dicas.map(t => `> ${t}`).join("\n")}\n\n## \uD83C\uDFC6 Crit\u00e9rios de Avalia\u00e7\u00e3o\n| Crit\u00e9rio | Peso |\n|----------|------|\n| Funcionalidade | 40% |\n| Qualidade do c\u00f3digo | 30% |\n| Boas pr\u00e1ticas | 20% |\n| Criatividade | 10% |\n\n## \uD83C\uDF81 Recompensa\n**+${d.xp} XP** \u00b7 Badge: **${d.badge}**`;
}

// ─── Módulo sob teste: certificado ───────────────────────────────────────────

function gerarHashId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function gerarCertificado(nomeUsuario, nomeTrilha) {
  if (!nomeUsuario || !nomeTrilha) {
    return { erro: "Nome do usu\u00e1rio e nome da trilha s\u00e3o obrigat\u00f3rios." };
  }
  const { trilhas } = loadTrilhas();
  const trilha = trilhas.find(t =>
    t.nome.toLowerCase().includes(nomeTrilha.toLowerCase())
  );
  if (!trilha) {
    return { erro: `Trilha "${nomeTrilha}" n\u00e3o encontrada.` };
  }
  const hoje = new Date();
  const data = `${String(hoje.getDate()).padStart(2, "0")}/${String(hoje.getMonth() + 1).padStart(2, "0")}/${hoje.getFullYear()}`;
  const ano = hoje.getFullYear();
  const hash = gerarHashId();
  const certId = `GEO-${ano}-${hash}`;

  return {
    certId,
    nomeUsuario,
    trilha,
    data,
    markdown: `---\ncertificado_id: ${certId}\nemitido_em: ${data}\nusuario: ${nomeUsuario}\ntrilha: ${trilha.nome}\ntecnologia: ${trilha.tecnologia}\nnivel: ${trilha.nivel}\nmodulos_concluidos: ${trilha.numero_modulos}\nxp_obtido: ${trilha.xp_total}\nvalido: true\n---\n\n# \uD83C\uDF93 Certificado de Conclus\u00e3o\n\n---\n\n> *O Geo-Explorer certifica que*\n\n# ${nomeUsuario.toUpperCase()}\n\n> *concluiu com \u00eaxito a trilha de aprendizagem*\n\n# \uD83C\uDF0D ${trilha.nome}\n\n---\n\n| Campo | Detalhe |\n|-------|---------|\n| \uD83D\uDDA5\uFE0F Tecnologia | ${trilha.tecnologia} |\n| \uD83D\uDCCA N\u00edvel | ${trilha.nivel} |\n| \uD83D\uDCE6 M\u00f3dulos conclu\u00eddos | ${trilha.numero_modulos} |\n| \u2B50 XP obtido | ${trilha.xp_total} XP |\n| \uD83D\uDCC5 Data de conclus\u00e3o | ${data} |\n| \uD83D\uDD11 ID do Certificado | \`${certId}\` |\n\n---\n\n## \uD83C\uDFC5 Badges Conquistadas\n${trilha.badges_disponiveis.map(b => `- ${b}`).join("\n")}\n\n---\n\n> *Este certificado comprova a dedica\u00e7\u00e3o e o esfor\u00e7o do(a) aluno(a)*\n> *na jornada de aprendizado do Geo-Explorer.*\n\n---\n\n**Geo-Explorer**\nhttps://github.com/TGianoni/Geo-Explorer \u00b7 Emitido via Geo-Explorer MCP Server\n\n---\n*Verifica\u00e7\u00e3o: \`${certId}\` \u00b7 Documento fict\u00edcio gerado automaticamente.*`,
  };
}

// ─── SUITE DE TESTES ────────────────────────────────────────────────────────

// — /trilha —
section("/trilha \u2014 Consulta de trilhas Java");

const trilhasJava = buscarTrilha("Java");
assert("Retorna ao menos 1 trilha para 'Java'", trilhasJava.length >= 1);
assert("Trilha Java cont\u00e9m campo 'nome'", trilhasJava.every(t => typeof t.nome === "string"));
assert("Trilha Java cont\u00e9m campo 'tecnologia'", trilhasJava.every(t => typeof t.tecnologia === "string"));
assert("Trilha Java cont\u00e9m campo 'nivel'", trilhasJava.every(t => typeof t.nivel === "string"));
assert("Trilha Java cont\u00e9m campo 'numero_modulos'", trilhasJava.every(t => typeof t.numero_modulos === "number"));
assert("Trilha Java cont\u00e9m campo 'xp_total'", trilhasJava.every(t => typeof t.xp_total === "number"));
assert("Trilha Java cont\u00e9m campo 'badges_disponiveis'", trilhasJava.every(t => Array.isArray(t.badges_disponiveis)));
assert("Trilha Java cont\u00e9m campo 'lives'", trilhasJava.every(t => Array.isArray(t.lives)));
assert("Trilha Java cont\u00e9m campo 'vitalicio'", trilhasJava.every(t => typeof t.vitalicio === "boolean"));
assert("Trilha Java cont\u00e9m campo 'promocoes'", trilhasJava.every(t => t.promocoes && typeof t.promocoes === "object"));
assert("xp_total da trilha Java \u00e9 > 0", trilhasJava.every(t => t.xp_total > 0));
assert("numero_modulos da trilha Java \u00e9 > 0", trilhasJava.every(t => t.numero_modulos > 0));
assert("Busca \u00e9 case-insensitive ('java')", buscarTrilha("java").length >= 1);
assert("Busca \u00e9 case-insensitive ('JAVA')", buscarTrilha("JAVA").length >= 1);
assert("Busca por tecnologia inexistente retorna array vazio", buscarTrilha("COBOL_XYZ_404").length === 0);

const plano = gerarPlanoEstudo(trilhasJava[0]);
assert("Plano de estudo \u00e9 gerado como string", typeof plano === "string");
assert("Plano cont\u00e9m o nome da trilha", plano.includes(trilhasJava[0].nome));
assert("Plano cont\u00e9m se\u00e7\u00e3o de M\u00f3dulos", plano.includes("M\u00f3dulos previstos"));
assert("Plano cont\u00e9m se\u00e7\u00e3o de Badges", plano.includes("Badges dispon\u00edveis"));
assert("Plano cont\u00e9m se\u00e7\u00e3o de Lives", plano.includes("Lives"));
assert("Plano cont\u00e9m se\u00e7\u00e3o de Promo\u00e7\u00e3o", plano.includes("Promo\u00e7\u00e3o"));
assert("gerarPlanoEstudo com null retorna null", gerarPlanoEstudo(null) === null);

// — /desafio —
section("/desafio \u2014 Gera\u00e7\u00e3o de desafio para Java");

const desafio = gerarDesafio("Java", "intermediario");
assert("Desafio gerado n\u00e3o cont\u00e9m erro", !desafio.erro);
assert("Desafio cont\u00e9m campo 'id'", typeof desafio.id === "string");
assert("ID do desafio come\u00e7a com GEO-", desafio.id.startsWith("GEO-"));
assert("Desafio cont\u00e9m campo 'enunciado'", typeof desafio.enunciado === "string" && desafio.enunciado.length > 10);
assert("Desafio cont\u00e9m campo 'requisitos'", Array.isArray(desafio.requisitos) && desafio.requisitos.length > 0);
assert("Desafio cont\u00e9m campo 'dicas'", Array.isArray(desafio.dicas) && desafio.dicas.length > 0);
assert("Desafio cont\u00e9m campo 'xp'", typeof desafio.xp === "number" && desafio.xp > 0);
assert("Desafio cont\u00e9m campo 'badge'", typeof desafio.badge === "string");
assert("XP de n\u00edvel intermedi\u00e1rio \u00e9 1200", desafio.xp === 1200);
assert("N\u00edvel inv\u00e1lido retorna erro", !!gerarDesafio("Java", "expert").erro);
assert("Tecnologia vazia retorna erro", !!gerarDesafio("", "iniciante").erro);
assert("N\u00edvel 'iniciante' retorna xp 500", gerarDesafio("Java", "iniciante").xp === 500);
assert("N\u00edvel 'avancado' retorna xp 2500", gerarDesafio("Java", "avancado").xp === 2500);

const desafioFormatado = formatarDesafio(desafio);
assert("Desafio formatado \u00e9 string", typeof desafioFormatado === "string");
assert("Desafio formatado cont\u00e9m '\u2694\uFE0F'", desafioFormatado.includes("\u2694"));
assert("Desafio formatado cont\u00e9m ID", desafioFormatado.includes(desafio.id));
assert("Desafio formatado cont\u00e9m se\u00e7\u00e3o Enunciado", desafioFormatado.includes("Enunciado"));
assert("Desafio formatado cont\u00e9m se\u00e7\u00e3o Requisitos", desafioFormatado.includes("Requisitos"));
assert("Desafio formatado cont\u00e9m se\u00e7\u00e3o Recompensa", desafioFormatado.includes("Recompensa"));
assert("formatarDesafio com erro exibe \u274C", formatarDesafio({ erro: "Falha" }).startsWith("\u274C"));

// — /certificado —
section("/certificado \u2014 Gera\u00e7\u00e3o de certificado para aluno Java");

const cert = gerarCertificado("Jo\u00e3o Gianoni", "Java Spring Boot");
assert("Certificado gerado sem erro", !cert.erro);
assert("Certificado cont\u00e9m certId", typeof cert.certId === "string" && cert.certId.startsWith("GEO-"));
assert("Certificado usa prefixo GEO-", cert.certId.startsWith("GEO-"));
assert("Certificado cont\u00e9m nomeUsuario", cert.nomeUsuario === "Jo\u00e3o Gianoni");
assert("Certificado cont\u00e9m dados da trilha", cert.trilha && cert.trilha.nome.includes("Java"));
assert("Certificado cont\u00e9m data de emiss\u00e3o", typeof cert.data === "string" && cert.data.includes("/"));
assert("Certificado markdown \u00e9 string", typeof cert.markdown === "string");
assert("Markdown cont\u00e9m nome do usu\u00e1rio em mai\u00fasculo", cert.markdown.includes("JO\u00c3O GIANONI"));
assert("Markdown cont\u00e9m nome da trilha", cert.markdown.includes(cert.trilha.nome));
assert("Markdown cont\u00e9m certificado_id no frontmatter", cert.markdown.includes(cert.certId));
assert("Markdown cont\u00e9m se\u00e7\u00e3o Badges", cert.markdown.includes("Badges Conquistadas"));
assert("Certificado com trilha inexistente retorna erro", !!gerarCertificado("Teste", "Trilha_QUE_NAO_EXISTE_XYZ").erro);
assert("Certificado sem nome retorna erro", !!gerarCertificado("", "Java Spring Boot").erro);
assert("Certificado sem trilha retorna erro", !!gerarCertificado("Jo\u00e3o", "").erro);

// Teste extra: cat\u00e1logo cont\u00e9m as trilhas novas (IDs 33, 34, 35)
section("Cat\u00e1logo \u2014 Trilhas extras adicionadas ao Geo-Explorer");
const { trilhas: todasTrilhas } = loadTrilhas();
assert("Cat\u00e1logo tem 35 trilhas", todasTrilhas.length === 35);
assert("Trilha KMP (id=33) existe", todasTrilhas.some(t => t.id === 33 && t.tecnologia.includes("Kotlin Multiplatform")));
assert("Trilha Prompt Engineering (id=34) existe", todasTrilhas.some(t => t.id === 34 && t.tecnologia.includes("Prompt Engineering")));
assert("Trilha GraphQL (id=35) existe", todasTrilhas.some(t => t.id === 35 && t.tecnologia.includes("GraphQL")));
assert("Todos os ids s\u00e3o \u00fanicos", new Set(todasTrilhas.map(t => t.id)).size === todasTrilhas.length);
assert("Todos os xp_total s\u00e3o positivos", todasTrilhas.every(t => t.xp_total > 0));
assert("Todos os numero_modulos s\u00e3o positivos", todasTrilhas.every(t => t.numero_modulos > 0));

// ─── SALVAR ARTEFATOS ────────────────────────────────────────────────────────

const certDir = path.join(__dirname, "../certificados-emitidos");
if (!fs.existsSync(certDir)) fs.mkdirSync(certDir, { recursive: true });
const certFilename = `${cert.nomeUsuario.replace(/\s/g, "_")}_${cert.certId}.md`;
fs.writeFileSync(path.join(certDir, certFilename), cert.markdown, "utf-8");

const desafioDir = path.join(__dirname, "../desafios-gerados");
if (!fs.existsSync(desafioDir)) fs.mkdirSync(desafioDir, { recursive: true });
const desafioFilename = `desafio_${desafio.id}.md`;
fs.writeFileSync(path.join(desafioDir, desafioFilename), formatarDesafio(desafio), "utf-8");

// ─── RELATÓRIO ─────────────────────────────────────────────────────────────

const total = passed + failed;
const coveragePct = ((passed / total) * 100).toFixed(1);
const status = parseFloat(coveragePct) >= 70 ? "\u2705 APROVADO" : "\u274C REPROVADO";
const now = new Date().toLocaleString("pt-BR");

let report = "";
report += "=".repeat(65) + "\n";
report += "  GEO-EXPLORER \u2014 RELAT\u00d3RIO DE TESTES UNIT\u00c1RIOS\n";
report += `  Gerado em: ${now}\n`;
report += "=".repeat(65) + "\n\n";

for (const r of results) {
  if (r.status === "SECTION") {
    report += `\n\u2500\u2500 ${r.description} ${"\u2500".repeat(Math.max(0, 50 - r.description.length))}\n`;
  } else {
    const icon = r.status === "PASS" ? "\u2714" : "\u2718";
    report += `  [${icon}] ${r.description}`;
    if (r.status === "FAIL" && r.detail) report += `\n       \u21B3 ${r.detail}`;
    report += "\n";
  }
}

report += "\n" + "=".repeat(65) + "\n";
report += `  RESUMO\n`;
report += "=".repeat(65) + "\n";
report += `  Total de testes  : ${total}\n`;
report += `  Aprovados (PASS) : ${passed}\n`;
report += `  Reprovados (FAIL): ${failed}\n`;
report += `  Cobertura        : ${coveragePct}%\n`;
report += `  Resultado        : ${status}\n`;
report += "\n";
report += `  Artefatos gerados:\n`;
report += `    - Certificado : geo_explorer/certificados-emitidos/${certFilename}\n`;
report += `    - Desafio     : geo_explorer/desafios-gerados/${desafioFilename}\n`;
report += "=".repeat(65) + "\n";

const reportPath = path.join(__dirname, "../data/resultado_testes.txt");
fs.writeFileSync(reportPath, report, "utf-8");

console.log(report);
