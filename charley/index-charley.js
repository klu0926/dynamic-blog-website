import charley from "./charley.js";
import Post from "../model/post.js"
import model from '../model/model.js'

// selector, messageArray, top = '0%', left = '0%', dieTime = 3000, canMove = true, moveTimer = 1000

document.addEventListener('DOMContentLoaded', () => {
  // has memory?
  if (charley.hasMemory()) return

  // 1
  charley.speakDelay(2000, ['create a post'], '4%', '40%', 1500, true, 10000)

  // remember
  charley.remember()

  // 2
  charley.speakDelay(6000, ['create a post now'], '14%', '20%', 1500, true, 10000)

  // 3
  charley.speakDelay(10000, ['create a post now', 'click on the button', 'click on create', 'CREATE', 'CREATE', 'CREATE'], '14%', '20%', 5000, true)

  // random posting
  const chance = Math.random()
  if (chance > 0.6) {
    const post = new Post('DID YOU SEE ME?', 'Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me?Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me? Did you see me?', 'https://motionarray.imgix.net/drive-through-forest-vhs-glitch-2537796-high_0000.jpg?w=660&q=60&fit=max&auto=format')
    model.createPost(post)
  }
})