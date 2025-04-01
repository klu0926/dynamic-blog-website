import Post from "../model/post.js";
import model from "../model/model.js";

export class Charley {
  constructor() {
    this.key = 'memory'
    this.memory = {
      chapter: '1'
    }
    // Bind all methods to use in callback
    this.getMemory = this.getMemory.bind(this)
    this.setMemory = this.setMemory.bind(this)
    this.setChapter = this.setChapter.bind(this)
  }
  getMemory() {
    // get local storage data
    const json = localStorage.getItem(this.key)
    if (json) {
      this.memory = JSON.parse(json)
    } else {
      this.setMemory(this.memory)
    }
    console.log('memory:', this.memory)
  }
  setMemory(memoryObject) {
    localStorage.setItem(this.key, JSON.stringify(memoryObject))
    this.memory = memoryObject
    console.log('Remembered')
  }
  setChapter(chapter = '1') {
    this.memory.chapter = String(chapter)
    this.setMemory(this.memory)
    console.log('set chapter, memory : ', this.memory)
  }
  getCurrentPage() {
    const page = document.body.getAttribute('data-page');
    return page
  }
  roll(percentage = 50, callback) {
    if (percentage > 100) percentage = 100
    const result = Math.random() * 100 < percentage;
    if (!result) return false
    if (typeof callback === 'function') {
      callback()
    }
    return true
  }
  createPost(title, content, image) {
    if (!image) {
      image = "https://motionarray.imgix.net/drive-through-forest-vhs-glitch-2537796-high_0000.jpg?w=660&q=60&fit=max&auto=format"
    }
    const post = new Post(title, content, image)
    model.createPost(post)
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
  play() {
    const page = this.getCurrentPage()
    console.log('current page:', page)
    console.log('this.memory.chapter:', this.memory.chapter)

    // chapter 3
    if (this.memory.chapter === '3') {
      // Index Page
      if (page === 'index') {
        const blogTitle = document.querySelector('#blog-title')
        blogTitle.innerText = "Charley's Blog"
        const footerText = document.querySelector('#footer-blog-text')
        footerText.innerText = "1988 Charley's Blog"

        // body theme color
        document.body.setAttribute('data-theme', 'red')

        // edit a post
        const welcomePost = model.getPosts()[0]
        console.log('welcomePost', welcomePost)
        model.editPost(welcomePost.id, 'Get out of my blog!', "Get out of my blog! ".repeat(100), 'https://placehold.co/600x400/4b0000/ff0000?text=GET%20OUT%20OF%20MY%20BLOG!&font=oswald')
      } else {
        // body theme color
        document.body.setAttribute('data-theme', 'red')
      }
    }

    // chapter 2
    if (this.memory.chapter === '2') {
      // Index Page
      if (page === 'index') {
        // create post
        const posts = model.getPosts()
        const filteredPosts = posts.filter(post => post.title = 'Do you see me?')
        if (filteredPosts.length < 10) {
          this.createPost('Do you see me?', "Do you see me? ".repeat(100))

        }
        // speak
        this.speakDelay(2000, ['Do you see me?'], '4%', '40%', 1500, true, 10000)
        this.speakDelay(3000, ['Do you see me?'], '4%', '40%', 1500, true, 10000)
        this.speakDelay(4000, ['Do you see me?'], '4%', '40%', 1500, true, 10000)
        this.speakDelay(6000, ['Do not delete'], '4%', '40%', 1500, true, 10000)
      }

      // Post Page
      if (page === 'post') {
        const title = document.querySelector('#post-title')
        if (title.innerText = 'Do you see me?') {

          let mousePosition = 150
          let turn = true
          const deleteBtn = document.querySelector('#delete-btn')
          deleteBtn.addEventListener('mouseover', () => {
            deleteBtn.style.position = 'relative'
            deleteBtn.style.color = '#ff4d4d'
            deleteBtn.classList.add('shake')
            if (turn) {
              deleteBtn.style.right = mousePosition + 'px';
              this.speakDelay(0, ['Do not delete me'], '4%', '40%', 1500, true, 10000)
            } else {
              deleteBtn.style.right = -mousePosition + 'px';
              this.speakDelay(0, ['hahahahaha'], '4%', '40%', 1500, true, 10000)
            }
            turn = !turn
          })
        }
      }


    }

    // chapter 1
    if (this.memory.chapter === '1') {
      // Index Page
      if (page === 'index') {
        this.speakDelay(2000, ['create a post'], '4%', '40%', 1500, true, 10000)

        this.speakDelay(6000, ['create a post now'], '14%', '20%', 1500, true, 10000)

        this.speakDelay(10000, ['create a post now', 'click on the button', 'click on create', 'CREATE', 'CREATE', 'CREATE'], '14%', '20%', 5000, true)
      }

      // new-post
      if (page === 'new-post') {
        const chance = Math.random()
        charley.speakDelay(0, [`ALL WORK AND NO PLAY MAKES CHARLEY A DULL BOY.
`], '60%', '20%', 1, true, 100000, false)

        charley.speakDelay(2000, ['what are you writing?'], '50%', '40%', 1000, true, 10000)

        charley.speakDelay(2000, ['do you want help?'], '50%', '40%', 1000, true, 10000)

        charley.speakDelay(4000, ['ha ha ha ha'], '50%', '40%', 1000, true, 10000)

        setInterval(() => {
          charley.speakDelay(6000, ['Create a post!'], '50%', '40%', 1000, true, 10000)
        }, 3000)

        document.querySelector('#post-title').addEventListener('focus', () => {
          this.speakDelay(0, ['DO IT!!!!!!!!'], '4%', '40%', 1500, true, 10000)
        })

        let hasContent = false
        const content = document.querySelector('#post-content')
        content.addEventListener('focus', () => {
          if (hasContent) return
          content.value = 'Do you see me! '.repeat(100)
          hasContent = true
        })
      }
    }

  }
}
const charley = new Charley();
charley.getMemory()
export default charley
