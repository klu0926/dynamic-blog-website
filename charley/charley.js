class Charley {
  constructor() {
    this.name = 'charley'
    this.speak = this.speak.bind(this);
    this.speakDelay = this.speakDelay.bind(this);
  }
  hasMemory() {
    return localStorage.getItem(this.name)
  }
  remember() {
    localStorage.setItem(this.name, 'memory')
  }
  forget() {
    localStorage.removeItem(this.name)
  }
  speakDelay(delay = 1000, messageArray, top, left, dieTime, canMove, moveTimer, nowrap) {
    setTimeout(() => {
      this.speak(messageArray, top, left, dieTime, canMove, moveTimer, nowrap)
    }, delay)
  }
  speak(messageArray, top = '0%', left = '0%', dieTime = 3000, canMove = true, moveTimer = 500, nowrap = true) {
    // create a chat div with unique id
    const length = 9;
    const chatId = Math.random().toString(36).slice(2, 2 + length);
    const chat = document.createElement('div')
    chat.classList.add('chat')
    chat.id = `chat-${chatId}`

    // chat style
    chat.style.position = 'fixed';
    chat.style.display = 'block';
    chat.style.top = top;
    chat.style.left = left;
    if (nowrap) {
      chat.style.whiteSpace = 'nowrap'
    }

    // append to main
    const main = document.querySelector('#main')
    main.appendChild(chat)

    // Typed.js initialization
    const typed = new Typed(`#${chat.id}`, {
      strings: messageArray,
      typeSpeed: 30,
      showCursor: false,
      onComplete: () => {
        if (dieTime > 0) {
          setTimeout(() => {
            chat.style.display = 'none';
          }, dieTime);
        }
      }
    });

    // Movement function
    const moveRandomly = () => {
      if (!canMove) return;
      chat.style.top = `${Math.random() * 80}%`;
      chat.style.left = `${10 + (Math.random() * 70)}%`;
      setTimeout(moveRandomly, moveTimer);
    };

    if (canMove) {
      moveRandomly();
    }
  }
}

const charley = new Charley();
export default charley;