# extens-o-chrome
Estudo para criação de extensões.

## GPT WhatsApp Assistant

Esta pasta `chrome-extension` contém uma extensão para o Google Chrome que integra o WhatsApp Web ao ChatGPT. Ela permite gerar sugestões de respostas de forma automática ou manual.

### Instalação de desenvolvimento
1. Abra o Chrome e acesse `chrome://extensions`.
2. Ative o modo de desenvolvedor.
3. Clique em "Carregar sem compactação" e selecione a pasta `chrome-extension` deste repositório.
4. Defina sua chave da API da OpenAI no `localStorage` executando no console do DevTools do WhatsApp Web:
   ```js
   localStorage.setItem('openai_api_key', 'SUA_CHAVE');
   ```

### Uso
- Abra o WhatsApp Web e navegue até a conversa desejada.
- Clique no ícone da extensão para escolher o modo Automático ou Manual.
- No modo Manual é possível digitar instruções ou utilizar o botão de voz para falar o que o modelo deve considerar.
- Pressione "Sugerir resposta" para que a extensão leia as últimas mensagens e insira uma sugestão na caixa de texto do WhatsApp.
- O botão "Desativar" liga ou desliga rapidamente a extensão.
