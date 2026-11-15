const textArea = document.getElementById("reader-text");
const status = document.getElementById("tool-status");
document.getElementById("speak-text").addEventListener("click", () => {
  const text = textArea.value.trim();
  if (!text) { status.textContent = "Digite ou cole um texto antes de iniciar a leitura."; textArea.focus(); return; }
  if (!("speechSynthesis" in window)) { status.textContent = "Este navegador não oferece leitura em voz alta."; return; }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "pt-BR";
  utterance.onstart = () => { status.textContent = "Leitura em andamento."; };
  utterance.onend = () => { status.textContent = "Leitura concluída."; };
  utterance.onerror = () => { status.textContent = "Não foi possível concluir a leitura."; };
  window.speechSynthesis.speak(utterance);
});
document.getElementById("stop-speech").addEventListener("click", () => {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  status.textContent = "Leitura interrompida.";
});
document.getElementById("dictate-text").addEventListener("click", () => {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) { status.textContent = "Ditado por voz não é compatível com este navegador. Você pode digitar o texto."; return; }
  const recognition = new Recognition();
  recognition.lang = "pt-BR"; recognition.interimResults = false; recognition.maxAlternatives = 1;
  status.textContent = "Pode falar. O navegador está ouvindo.";
  recognition.onresult = (event) => { const spoken = event.results[0][0].transcript; textArea.value = [textArea.value.trim(), spoken].filter(Boolean).join(" "); status.textContent = "Texto reconhecido e adicionado."; };
  recognition.onerror = () => { status.textContent = "Não foi possível reconhecer a fala. Tente novamente ou digite."; };
  recognition.onend = () => { if (status.textContent === "Pode falar. O navegador está ouvindo.") status.textContent = "Nenhuma fala detectada."; };
  recognition.start();
});