const instructionBox = document.getElementById('instruction');
const voiceBtn = document.getElementById('voice-btn');
const suggestBtn = document.getElementById('suggest-btn');
const toggleBtn = document.getElementById('toggle-btn');
const modeRadios = document.getElementsByName('mode');

let enabled = true;

function updateUI() {
  const manual = document.querySelector('input[name="mode"]:checked').value === 'manual';
  instructionBox.style.display = manual ? 'block' : 'none';
  voiceBtn.style.display = manual ? 'block' : 'none';
  toggleBtn.textContent = enabled ? 'Desativar' : 'Ativar';
}

function getMode() {
  return document.querySelector('input[name="mode"]:checked').value;
}

modeRadios.forEach(r => r.addEventListener('change', updateUI));

chrome.runtime.sendMessage({type: 'getEnabled'}, res => {
  enabled = res.enabled;
  updateUI();
});

suggestBtn.addEventListener('click', () => {
  if (!enabled) return;
  const mode = getMode();
  const instruction = instructionBox.value;
  chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    chrome.tabs.sendMessage(tabs[0].id, {type: 'suggest', auto: mode === 'auto', instruction});
  });
});

toggleBtn.addEventListener('click', () => {
  enabled = !enabled;
  chrome.runtime.sendMessage({type: 'toggle', enabled}, () => updateUI());
});

voiceBtn.addEventListener('click', () => {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = 'pt-BR';
  recognition.onresult = event => {
    instructionBox.value = event.results[0][0].transcript;
  };
  recognition.start();
});
