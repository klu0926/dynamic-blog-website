import charley from "./charley.js";
// selector, messageArray, top = '0%', left = '0%', dieTime = 3000, canMove = true, moveTimer = 1000


document.addEventListener('DOMContentLoaded', () => {
  const chance = Math.random()
  if (chance > 0.5) {
    charley.forget()
  }
})