const questions = [
  ["Quando preciso resolver um problema, costumo:", "Tomar decisões rapidamente.", "Conversar com outras pessoas.", "Manter a calma e observar.", "Analisar todos os detalhes."],
  ["Em uma equipe, geralmente sou a pessoa que:", "Assume a liderança.", "Motiva e anima os colegas.", "Ajuda e apoia os demais.", "Organiza e planeja."],
  ["Quando surge uma mudança inesperada:", "Encaro o desafio imediatamente.", "Tento ver o lado positivo.", "Adapto-me com tranquilidade.", "Fico pensando nas consequências."],
  ["As pessoas costumam me descrever como:", "Determinado.", "Comunicativo.", "Calmo.", "Cuidadoso."],
  ["Diante de uma dificuldade:", "Procuro resolver rapidamente.", "Busco apoio e converso.", "Espero e observo.", "Analiso todas as possibilidades."],
  ["No trabalho, valorizo:", "Resultados.", "Relacionamentos.", "Harmonia.", "Qualidade."],
  ["Em reuniões eu:", "Dou opiniões rapidamente.", "Participo bastante.", "Escuto mais do que falo.", "Penso antes de falar."],
  ["Quando estou sob pressão:", "Fico mais ativo.", "Procuro conversar.", "Tento manter a calma.", "Fico preocupado com erros."],
  ["Meu ritmo costuma ser:", "Rápido.", "Entusiasmado.", "Constante.", "Cuidadoso."],
  ["Prefiro atividades:", "Desafiadoras.", "Dinâmicas.", "Estáveis.", "Organizadas."],
  ["Quando há conflitos:", "Enfrento diretamente.", "Tento aproximar as pessoas.", "Evito discussões.", "Analiso quem está certo."],
  ["Costumo:", "Decidir.", "Incentivar.", "Cooperar.", "Planejar."],
  ["Em grupos:", "Lidero.", "Interajo.", "Apoio.", "Organizo."],
  ["Meu maior ponto forte é:", "Determinação.", "Entusiasmo.", "Paciência.", "Atenção aos detalhes."],
  ["Quando erro:", "Sigo em frente.", "Converso sobre isso.", "Aceito com tranquilidade.", "Reflito bastante."],
  ["Prefiro pessoas:", "Objetivas.", "Alegres.", "Gentis.", "Responsáveis."],
  ["Em tarefas:", "Quero terminar logo.", "Gosto de trabalhar em grupo.", "Mantenho o ritmo.", "Busco perfeição."],
  ["Em ambientes novos:", "Assumo a iniciativa.", "Faço amizades rapidamente.", "Observo primeiro.", "Analiso o ambiente."],
  ["Costumo ser:", "Competitivo.", "Espontâneo.", "Tranquilo.", "Perfeccionista."],
  ["Quando recebo críticas:", "Reajo imediatamente.", "Converso sobre elas.", "Aceito calmamente.", "Penso bastante nelas."],
  ["Gosto de:", "Desafios.", "Pessoas.", "Estabilidade.", "Organização."],
  ["Sou conhecido por:", "Coragem.", "Simpatia.", "Serenidade.", "Responsabilidade."],
  ["Em decisões:", "Sou rápido.", "Considero as pessoas.", "Espero o momento certo.", "Analiso cuidadosamente."],
  ["Meu ambiente ideal é:", "Dinâmico.", "Alegre.", "Tranquilo.", "Organizado."],
  ["Em projetos:", "Impulsiono as ações.", "Uno a equipe.", "Dou suporte.", "Estruturo os detalhes."],
  ["Tenho facilidade para:", "Liderar.", "Comunicar.", "Conciliar.", "Planejar."],
  ["Minha principal característica:", "Determinação.", "Sociabilidade.", "Paciência.", "Organização."],
  ["Quando trabalho:", "Busco resultados.", "Busco interação.", "Busco estabilidade.", "Busco qualidade."],
  ["Em situações difíceis:", "Enfrento.", "Incentivo.", "Acalmo.", "Analiso."],
  ["Eu me identifico mais com alguém que:", "Toma decisões.", "Motiva pessoas.", "Mantém a paz.", "Cuida dos detalhes."]
];

const profiles = [
  { name: "Colérico", color: "#b97878", description: "Você tende a agir com objetividade, iniciativa e foco em resultados. Costuma sentir-se à vontade diante de desafios e decisões.", tags: ["Determinação", "Iniciativa", "Objetividade"] },
  { name: "Sanguíneo", color: "#c8a17f", description: "Você tende a se expressar com entusiasmo, valorizar relacionamentos e mobilizar pessoas por meio da comunicação.", tags: ["Sociabilidade", "Entusiasmo", "Comunicação"] },
  { name: "Fleumático", color: "#668d88", description: "Você tende a valorizar estabilidade, cooperação e harmonia. Sua serenidade pode ajudar os grupos a manterem equilíbrio.", tags: ["Paciência", "Cooperação", "Serenidade"] },
  { name: "Melancólico", color: "#7c9498", description: "Você tende a observar detalhes, planejar com cuidado e buscar qualidade. Costuma refletir antes de agir.", tags: ["Organização", "Análise", "Qualidade"] }
];

const screens = { intro: document.querySelector("#intro"), quiz: document.querySelector("#quiz"), result: document.querySelector("#result") };
const answers = new Array(questions.length).fill(null);
let currentQuestion = 0;

function showScreen(name) {
  Object.entries(screens).forEach(([key, element]) => { element.hidden = key !== name; });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuestion() {
  const [prompt, ...options] = questions[currentQuestion];
  document.querySelector("#question-count").textContent = `Questão ${currentQuestion + 1} de ${questions.length}`;
  document.querySelector("#progress-bar").style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  document.querySelector("#question-text").textContent = prompt;
  document.querySelector("#back-button").style.visibility = currentQuestion === 0 ? "hidden" : "visible";

  const list = document.querySelector("#answer-list");
  list.replaceChildren();
  options.forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `answer-option${answers[currentQuestion] === index ? " selected" : ""}`;
    button.setAttribute("role", "radio");
    button.setAttribute("aria-checked", answers[currentQuestion] === index ? "true" : "false");
    button.innerHTML = `<span class="option-dot" aria-hidden="true"></span><span>${option}</span>`;
    button.addEventListener("click", () => selectAnswer(index));
    list.append(button);
  });

  const hasSelection = answers[currentQuestion] !== null;
  document.querySelector("#next-button").disabled = !hasSelection;
  document.querySelector("#next-button").innerHTML = currentQuestion === questions.length - 1 ? "Ver meu resultado" : "Continuar <span aria-hidden=\"true\">→</span>";
  document.querySelector("#selection-hint").textContent = hasSelection ? "Alternativa selecionada." : "Selecione uma alternativa para continuar.";
}

function selectAnswer(index) {
  answers[currentQuestion] = index;
  renderQuestion();
}

function advance() {
  if (answers[currentQuestion] === null) return;
  if (currentQuestion < questions.length - 1) {
    currentQuestion += 1;
    renderQuestion();
  } else {
    renderResult();
  }
}

function renderResult() {
  const scores = [0, 0, 0, 0];
  answers.forEach(answer => { scores[answer] += 1; });
  const topScore = Math.max(...scores);
  const winners = scores.map((score, index) => score === topScore ? index : -1).filter(index => index >= 0);
  const primary = profiles[winners[0]];
  const isTie = winners.length > 1;

  document.querySelector("#result-title").textContent = isTie
    ? `Seu resultado mostra um equilíbrio entre ${winners.map(index => profiles[index].name).join(" e ")}`
    : `Seu temperamento predominante é ${primary.name}`;
  document.querySelector("#result-summary").textContent = isTie
    ? "Duas ou mais preferências alcançaram a mesma pontuação. Isso sugere que você combina características desses temperamentos conforme o contexto."
    : "Este perfil recebeu o maior número de escolhas no seu questionário.";

  const featuredName = isTie ? winners.map(index => profiles[index].name).join(" + ") : primary.name;
  const featuredDescription = isTie
    ? winners.map(index => profiles[index].description).join(" ")
    : primary.description;
  const featuredTags = [...new Set(winners.flatMap(index => profiles[index].tags))];
  document.querySelector("#profile-name").textContent = featuredName;
  document.querySelector("#profile-description").textContent = featuredDescription;
  document.querySelector("#result-icon").style.setProperty("--profile-color", primary.color);
  document.querySelector("#profile-tags").innerHTML = featuredTags.map(tag => `<span>${tag}</span>`).join("");

  document.querySelector("#score-chart").innerHTML = profiles.map((profile, index) => {
    const percentage = Math.round((scores[index] / questions.length) * 100);
    return `<div class="score-row"><div class="score-row-head"><strong>${profile.name}</strong><span>${scores[index]} respostas · ${percentage}%</span></div><div class="score-track"><div class="score-fill" style="--bar-color:${profile.color};width:${percentage}%"></div></div></div>`;
  }).join("");
  showScreen("result");
}

document.querySelector("#start-button").addEventListener("click", () => { showScreen("quiz"); renderQuestion(); });
document.querySelector("#next-button").addEventListener("click", advance);
document.querySelector("#back-button").addEventListener("click", () => { if (currentQuestion > 0) { currentQuestion -= 1; renderQuestion(); } });
document.querySelector("#restart-button").addEventListener("click", () => { answers.fill(null); currentQuestion = 0; showScreen("intro"); });
document.querySelector("#print-button").addEventListener("click", () => window.print());
