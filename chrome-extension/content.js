async function getLastMessages(count = 10) {
  const messageNodes = Array.from(document.querySelectorAll('div.copyable-text span.selectable-text'));
  const texts = messageNodes.slice(-count).map(node => node.innerText);
  return texts.join('\n');
}

async function fetchCompletion(prompt) {
  const apiKey = localStorage.getItem('openai_api_key');
  if (!apiKey) {
    console.warn('No OpenAI API key set');
    return '';
  }
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{role: 'user', content: prompt}]
    })
  });
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

async function suggestReply(auto, instruction) {
  const history = await getLastMessages();
  let prompt = `Conversation history:\n${history}\n`;
  if (instruction) {
    prompt += `Instruction: ${instruction}\n`;
  }
  prompt += 'Suggest a response:';
  const reply = await fetchCompletion(prompt);
  const box = document.querySelector('div[contenteditable="true"]');
  if (box) {
    box.focus();
    document.execCommand('insertText', false, reply);
  }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'suggest') {
    suggestReply(message.auto, message.instruction).then(() => sendResponse({status: 'ok'}));
    return true;
  }
});
