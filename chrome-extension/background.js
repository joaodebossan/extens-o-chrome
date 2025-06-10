let enabled = true;

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'toggle') {
    enabled = message.enabled;
    sendResponse({status: 'ok'});
  } else if (message.type === 'getEnabled') {
    sendResponse({enabled});
  }
});
