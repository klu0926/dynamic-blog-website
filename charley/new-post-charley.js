import charley from "./charley.js";
// selector, messageArray, top = '0%', left = '0%', dieTime = 3000, canMove = true, moveTimer = 1000

document.addEventListener('DOMContentLoaded', () => {
  charley.forget()
  const chance = Math.random()
  console.log('chance:', chance)


  if (chance > 0.5) {
    if (chance > 0.95) {
      charley.speakDelay(0, [`ALL WORK AND NO PLAY MAKES CHARLEY A DULL BOY.
`], '60%', '20%', 1, true, 100000, false)
    } else if (chance > 0.8) {
      charley.speakDelay(2000, ['what are you writing?'], '50%', '40%', 1000, true, 10000)
    } else if (chance > 0.7) {
      charley.speakDelay(2000, ['do you want help?'], '50%', '40%', 1000, true, 10000)
    } else if (chance > 0.6) {
      charley.speakDelay(2000, ['ha ha ha ha'], '50%', '40%', 1000, true, 10000)
    } else if (chance > 0.5) {
      charley.speakDelay(2000, ['do you see me?'], '50%', '40%', 1000, true, 10000)
    }
  }
})