const $ = (selector) => document.querySelector(selector);
const messages = $("#chat-messages");
const form = $("#chat-form");
const input = $("#chat-input");
const voiceStatus = $("#voice-status");
let lastAnswer = "Acessibilidade digital significa criar sites e aplicativos que possam ser percebidos, compreendidos e utilizados pelo maior número possível de pessoas.";

$("#year").textContent = new Date().getFullYear();

function addMessage(text, type) {
  const article = document.createElement("article");
  article.className = "message " + (type === "user" ? "user-message" : "assistant-message");
  const label = document.createElement("span");
  label.className = "message-label";
  label.textContent = type === "user" ? "VOCÊ" : "SYNEX";
  const paragraph = document.createElement("p");
  paragraph.textContent = text;
  article.append(label, paragraph);
  messages.append(article);
  messages.scrollTop = messages.scrollHeight;
}

function getGuideAnswer(question) {
  const q = question.toLocaleLowerCase("pt-BR");
  if (/(leitor de tela|nvda|voiceover|talkback)/.test(q)) {
    return "Leitores de tela são programas que transformam o conteúdo da tela em fala ou braille. Para ajudar: use títulos em ordem lógica, textos alternativos em imagens informativas, rótulos nos campos e nomes claros nos botões. Teste a página com teclado e com um leitor de tela, como NVDA, VoiceOver ou TalkBack.";
  }
  if (/(contraste|cor|cores|enxergar|visibilidade)/.test(q)) {
    return "Garanta contraste suficiente entre texto e fundo. Como referência, a WCAG recomenda pelo menos 4,5:1 para texto comum e 3:1 para texto grande. Não use apenas a cor para transmitir informação: combine cor com texto, ícones ou padrões.";
  }
  if (/(teclado|tab|atalho|navegar)/.test(q)) {
    return "Uma pessoa deve conseguir usar todas as funções sem mouse. Mantenha a ordem de foco lógica, mostre um contorno visível no elemento focado, permita ativar controles com Enter ou Espaço e inclua um link para pular direto ao conteúdo principal.";
  }
  if (/(imagem|foto|texto alternativo|alt)/.test(q)) {
    return "Imagens que transmitem informação precisam de texto alternativo que comunique seu propósito. Seja breve e específico. Imagens decorativas devem ter alt vazio (alt=\"\") para não criar ruído no leitor de tela. Evite começar todo texto alternativo com 'imagem de'.";
  }
  if (/(surdo|libras|legenda|áudio|video|vídeo)/.test(q)) {
    return "Para conteúdos em vídeo, ofereça legendas sincronizadas e, quando necessário, transcrição. Para conteúdos importantes em áudio, disponibilize uma alternativa em texto. Libras é uma língua completa; um recurso de tradução precisa considerar gramática, expressões faciais e movimentos corporais.";
  }
  if (/(wcag|padrão|norma|diretriz)/.test(q)) {
    return "As WCAG (Diretrizes de Acessibilidade para Conteúdo Web) organizam recomendações em quatro princípios: perceptível, operável, compreensível e robusto. Comece pela versão WCAG 2.2, nível AA, e valide com testes automáticos e com pessoas que usam tecnologias assistivas.";
  }
  if (/(começar|começo|iniciar|primeiro passo|site acessível)/.test(q)) {
    return "Comece com uma estrutura semântica: um H1 principal, títulos em sequência, regiões de navegação e conteúdo, links descritivos e botões para ações. Depois verifique contraste, foco do teclado, textos alternativos, formulários com rótulos e mensagens de erro claras.";
  }
  if (/(obrigad|valeu)/.test(q)) {
    return "Por nada! A acessibilidade melhora quando é considerada desde o planejamento e testada com pessoas reais. Se quiser, pode mandar outra pergunta.";
  }
  if (/(synex|projeto|plataforma)/.test(q)) {
    return "A SYNEX ACCESS é um projeto em desenvolvimento que busca unir tecnologia e inclusão. A primeira etapa explora recursos digitais para ampliar o acesso à informação por pessoas com deficiência visual. Esta página é uma demonstração inicial.";
  }
  return "Posso ajudar com leitores de tela, contraste, navegação por teclado, textos alternativos, legendas, WCAG e inclusão digital. Tente perguntar sobre um desses assuntos para receber uma orientação mais específica.";
}

function ask(question) {
  const clean = question.trim();
  if (!clean) return;
  addMessage(clean, "user");
  input.value = "";
  const answer = getGuideAnswer(clean);
  lastAnswer = answer;
  window.setTimeout(() => addMessage(answer, "assistant"), 180);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  ask(input.value);
});

document.querySelectorAll(".suggestion").forEach((button) => {
  button.addEventListener("click", () => ask(button.textContent));
});

$("#clear-chat").addEventListener("click", () => {
  messages.replaceChildren();
  addMessage("Conversa reiniciada. Qual dúvida sobre acessibilidade você gostaria de explorar?", "assistant");
  lastAnswer = "Conversa reiniciada. Qual dúvida sobre acessibilidade você gostaria de explorar?";
  input.focus();
});

function speak(text) {
  if (!("speechSynthesis" in window)) {
    voiceStatus.textContent = "Leitura em voz alta não é compatível com este navegador.";
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-BR";
  window.speechSynthesis.speak(utterance);
  voiceStatus.textContent = "Lendo em voz alta.";
  utterance.onend = () => { voiceStatus.textContent = "Leitura concluída."; };
}

$("#read-last").addEventListener("click", () => speak(lastAnswer));
$("#read-page").addEventListener("click", () => speak("SYNEX ACCESS. Seu acesso ao futuro. Mais autonomia, informação e possibilidades. Estamos construindo uma experiência digital pensada para tornar o mundo mais acessível."));

$("#font-larger").addEventListener("click", () => {
  const current = Number(getComputedStyle(document.documentElement).getPropertyValue("--font-scale").trim()) || 1;
  document.documentElement.style.setProperty("--font-scale", Math.min(1.3, current + 0.1).toFixed(2));
});
$("#font-smaller").addEventListener("click", () => {
  const current = Number(getComputedStyle(document.documentElement).getPropertyValue("--font-scale").trim()) || 1;
  document.documentElement.style.setProperty("--font-scale", Math.max(0.85, current - 0.1).toFixed(2));
});
$("#contrast-toggle").addEventListener("click", (event) => {
  document.body.classList.toggle("high-contrast");
  event.currentTarget.setAttribute("aria-pressed", String(document.body.classList.contains("high-contrast")));
});

$("#voice-input").addEventListener("click", () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    voiceStatus.textContent = "Ditado por voz não é compatível com este navegador. Você pode digitar sua pergunta.";
    return;
  }
  const recognition = new SpeechRecognition();
  recognition.lang = "pt-BR";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;
  voiceStatus.textContent = "Pode falar. Estou ouvindo...";
  recognition.onresult = (event) => {
    const spoken = event.results[0][0].transcript;
    input.value = spoken;
    voiceStatus.textContent = "Pergunta reconhecida.";
    ask(spoken);
  };
  recognition.onerror = () => { voiceStatus.textContent = "Não consegui reconhecer a fala. Tente novamente ou digite."; };
  recognition.onend = () => {
    if (voiceStatus.textContent === "Pode falar. Estou ouvindo...") voiceStatus.textContent = "Nenhuma fala detectada.";
  };
  recognition.start();
});
