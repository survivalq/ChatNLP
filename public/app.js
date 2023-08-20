const chatContainer = document.getElementById('chat-container');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Empty response will be replaced with one of these random responses
const randomBotResponses = [
  "I'm still being trained and don't have an answer for that prompt.",
  "Hmm, I'm not sure about that. How about another question?",
  "I'm not sure I understand. Can you rephrase that?",
  "I'm not sure I understand. Can you ask another question?",
  "I'm not sure I understand. Can you ask something else?",
  "I'm not sure I understand. Can you ask something different?",
];

sendButton.addEventListener('click', async () => {
  const userInput = messageInput.value;
  if (userInput.trim() !== '') {
    sendButton.disabled = true;

    addMessage(userInput, 'user');
    messageInput.value = '';
    const response = await askNLP(userInput);
    const botResponse = response.answer || getRandomBotResponse();

    await simulateTyping(botResponse, 'bot');

    sendButton.disabled = false;
  }
});

async function askNLP(message) {
  const response = await fetch('/ask', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: message }),
  });
  const data = await response.json();
  return data;
};

function getRandomBotResponse() {
  const randomIndex = Math.floor(Math.random() * randomBotResponses.length);
  return randomBotResponses[randomIndex];
};

function addMessage(content, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(
    sender === 'user' ? 'chat-message' : 'chat-message-nlp',
    'rounded-lg',
    'p-2',
    'mb-2',
    'flex',
    'gap-1.5'
  );

  const senderImage = document.createElement('img');
  senderImage.classList.add('avatar', 'rounded', 'flex', 'items-start');
  senderImage.src = sender === 'user' ? 'assets/user.png' : 'assets/chatnlp.png';
  senderImage.alt = sender === 'user' ? 'User Avatar' : 'Bot Avatar';

  messageDiv.appendChild(senderImage);

  const messageContent = document.createElement('span');
  messageContent.classList.add('text-white', 'mr-2', 'flex', 'items-center');
  messageContent.textContent = content;

  messageDiv.appendChild(messageContent);
  chatContainer.appendChild(messageDiv);
  chatContainer.scrollTop = chatContainer.scrollHeight;
};

async function simulateTyping(text, sender) {
  const typingDelay = 6;
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(sender === 'user' ? 'chat-message' : 'chat-message-nlp', 
    'rounded-lg', 
    'p-2', 
    'mb-2', 
    'flex',
    'gap-1.5'
  );

  const senderImage = document.createElement('img');
  senderImage.classList.add('avatar', 'rounded', 'flex', 'items-start');
  senderImage.src = sender === 'user' ? 'user.png' : 'assets/chatnlp.png';
  senderImage.alt = sender === 'user' ? 'User Avatar' : 'Bot Avatar';

  messageDiv.appendChild(senderImage);

  const messageContent = document.createElement('span');
  messageContent.classList.add('text-white', 'mr-2', 'flex', 'items-center');
  messageDiv.appendChild(messageContent);
  chatContainer.appendChild(messageDiv);

  for (let i = 0; i < text.length; i++) {
    await new Promise(resolve => setTimeout(resolve, typingDelay));
    messageContent.textContent = messageContent.textContent + text[i];
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
};