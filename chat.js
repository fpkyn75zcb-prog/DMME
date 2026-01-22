// WebSocket chat client for DM Me
// This script connects to a WebSocket server to send and receive chat
// messages in real time. It assigns a simple numeric ID to each visitor
// (persisted in localStorage) and renders messages in the UI.

(function () {
  // Assign a persistent user ID
  const userIdKey = 'dm-me-user-id';
  let userId = localStorage.getItem(userIdKey);
  if (!userId) {
    userId = Math.floor(1000 + Math.random() * 9000).toString();
    localStorage.setItem(userIdKey, userId);
  }

  // DOM references
  const messageArea = document.getElementById('messageArea');
  const chatForm = document.getElementById('chatForm');
  const messageInput = document.getElementById('messageInput');

  // Keep track of message IDs we have rendered to avoid duplicates
  const renderedIds = new Set();

  /**
   * Render a chat message to the UI. Plays a notification sound
   * for messages not authored by the current user.
   * @param {object} msg
   */
  function renderMessage(msg) {
    if (renderedIds.has(msg.id)) {
      return;
    }
    renderedIds.add(msg.id);
    const div = document.createElement('div');
    div.classList.add('message');
    if (msg.user && msg.user === userId) {
      div.classList.add('my-message');
    } else {
      div.classList.add('their-message');
    }
    const userSpan = document.createElement('span');
    userSpan.classList.add('user-id');
    userSpan.textContent = 'User ' + (msg.user || '');
    const textSpan = document.createElement('span');
    textSpan.classList.add('message-text');
    textSpan.textContent = msg.text;
    div.appendChild(userSpan);
    div.appendChild(textSpan);
    messageArea.appendChild(div);
    // Play a beep for messages not authored by this user
    if (msg.user !== userId) {
      beep();
    }
    scrollToBottom();
  }

  /**
   * Scroll the message area to the bottom.
   */
  function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight;
  }

  /**
   * Emit a simple beep tone for notifications.
   */
  function beep() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      gainNode.gain.setValueAtTime(0.2, audioCtx.currentTime);
      oscillator.stop(audioCtx.currentTime + 0.15);
    } catch (err) {
      // ignore audio errors
    }
  }

  /**
   * Send a chat message to the server via HTTP POST.
   * @param {string} text
   */
  async function sendChat(text) {
    const payload = { text: text, user: userId };
    try {
      await fetch(SEND_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
    } catch (err) {
      // network error
    }
  }

  // Determine SSE and POST endpoints. For local development, the server runs
  // on port 8080 on the same hostname. To override the port, set
  // `window.SSE_PORT` before this script loads. For deployment on another
  // domain or port, you may set `window.SSE_URL` and `window.SEND_URL`.
  const SSE_URL = (function () {
    if (window.SSE_URL) return window.SSE_URL;
    const proto = location.protocol === 'https:' ? 'https://' : 'http://';
    const host = location.hostname;
    const port = window.SSE_PORT || '8080';
    return `${proto}${host}:${port}/stream`;
  })();
  const SEND_URL = (function () {
    if (window.SEND_URL) return window.SEND_URL;
    const proto = location.protocol === 'https:' ? 'https://' : 'http://';
    const host = location.hostname;
    const port = window.SSE_PORT || '8080';
    return `${proto}${host}:${port}/send`;
  })();

  // Connect to the SSE stream
  const evtSource = new EventSource(SSE_URL);
  evtSource.onmessage = function (event) {
    const data = safeJsonParse(event.data);
    if (!data) return;
    renderMessage(data);
  };
  evtSource.onerror = function () {
    // SSE will retry automatically; nothing to do
  };

  /**
   * Safely parse JSON. Returns null on error.
   * @param {string} str
   * @returns {any|null}
   */
  function safeJsonParse(str) {
    try {
      return JSON.parse(str);
    } catch (err) {
      return null;
    }
  }

  // Wire up the chat form
  if (chatForm && messageInput) {
    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const text = messageInput.value.trim();
      if (!text) return;
      sendChat(text);
      messageInput.value = '';
    });
  }
})();