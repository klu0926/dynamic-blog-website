// new-post.html
import model from './model/model.js'
import Post from './model/post.js'
import charley from './charley/charley.js'

// If error mean this url is not valid
function isUrlValidate(url) {
  try {
    const myURL = new URL(url)
    // check for portocol
    if (myURL.protocol === 'http:' || myURL.protocol === 'https:') {
      console.log(myURL)
      return true
    }
    return false
  } catch (err) {
    return false
  }
}

class View {
  constructor() {
  }
  updateValidation(isValid, id, message = 'Invalid input') {
    const validateSpam = document.querySelector(`#${id}-validate`)
    validateSpam.style.visibility = 'visible'
    validateSpam.textContent = message
    if (isValid) {
      validateSpam.classList.remove('invalid')
      validateSpam.classList.add('valid')
    } else {
      validateSpam.classList.remove('valid')
      validateSpam.classList.add('invalid')
    }
  }
  clearValidation() {
    const validateSpams = document.querySelectorAll(`.validate`)
    validateSpams.forEach(spam => {
      spam.style.visibility = 'hidden'
      spam.textContent = ''
      spam.classList.remove('invalid')
      spam.classList.remove('valid')
    })

  }
}

class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view
  }
  init() {
    document.querySelector('#post-form').addEventListener('submit', (e) => this.onFormSubmit(e))
    document.querySelector('#reset-btn').addEventListener('click', () => this.formReset())
  }
  formReset() {
    this.view.clearValidation()
    const form = document.querySelector('#post-form')
    form.reset()
  }
  onFormSubmit(e) {
    e.preventDefault()
    // data
    const titleInput = document.querySelector('#post-title')
    const coverInput = document.querySelector('#post-cover')
    const contentArea = document.querySelector('#post-content')
    const title = titleInput.value.trim()
    const content = contentArea.value.trim()
    const cover = coverInput.value.trim()

    // validate
    let isValidated = true
    if (title.length === 0) {
      isValidated = false
      this.view.updateValidation(false, 'title', 'Title cannot be empty')
    } else {
      this.view.updateValidation(true, 'title', 'Good')
    }

    if (content.length === 0) {
      isValidated = false
      this.view.updateValidation(false, 'content', 'Content cannot be empty')
    } else {
      this.view.updateValidation(true, 'content', 'Good')
    }

    if (cover.length !== 0 && !isUrlValidate(cover)) {
      isValidated = false
      this.view.updateValidation(false, 'cover', 'Cover url is invalid')
    } else if (cover.length !== 0) {
      this.view.updateValidation(true, 'cover', 'Good')
    }

    if (isValidated) {
      // create post
      const post = new Post(title, content, cover ? cover : null)
      model.createPost(post)

      // charley to chapter(2)
      if (charley.memory.chapter === '1') {
        charley.setChapter(2)
      }
      setTimeout(() => {
        // return home page (later change to post.html with postId)
        window.location.href = 'index.html'
      }, 500)

    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const view = new View()
  const controller = new Controller(model, view)
  controller.init()
})


// Charley
charley.play()