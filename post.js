// new-post.html
import model from './model/model.js'
import Post from './model/post.js'


class View {
  constructor() {
  }
  displayPost(post) {
    const postTitle = document.querySelector('#post-title')
    const postContent = document.querySelector('#post-content')
    const postImage = document.querySelector('#post-image')
    const postImageUrl = document.querySelector('#post-image-url')

    postTitle.textContent = post.title
    postContent.textContent = post.content
    postImage.src = post.cover
    postImageUrl.textContent = post.cover
  }
}

class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view
    this.isEditable = false
  }
  init() {
    // get postId
    const urlParams = new URLSearchParams(window.location.search)
    const postId = urlParams.get('postId')

    // disply post
    const post = this.model.getPost(postId)
    this.view.displayPost(post)

    // event
    // edit btn
    document.querySelector('#edit-btn').addEventListener('click', () => this.toggleEditable())

    // cancel button
    document.querySelector('#cancel-btn').addEventListener('click', () => {
      // reset everything back
      this.toggleEditable()
      this.view.displayPost(post)
    })
  }
  toggleEditable() {
    const editButton = document.querySelector('#edit-btn')
    const postTitle = document.querySelector('#post-title')
    const postContent = document.querySelector('#post-content')
    const editButtons = document.querySelector('.edit-buttons')
    const editModeTitle = document.querySelector('#edit-mode-notice')
    const postImageUrl = document.querySelector('#post-image-url')


    if (!this.isEditable) {
      // turn on edit mode
      this.isEditable = true
      postTitle.contentEditable = "true";
      postContent.contentEditable = 'true'
      postImageUrl.contentEditable = 'true'

      postTitle.classList.add('editable')
      postContent.classList.add('editable')
      postImageUrl.classList.add('editable')
      postImageUrl.style.display = 'block'


      // edit-mode-title
      editModeTitle.style.display = 'block'

      // edit buttons
      editButtons.style.display = 'block'
      editButton.textContent = 'View'

      // focus on content
      postContent.focus()
    } else {
      // turn off edit mode
      this.isEditable = false
      postTitle.contentEditable = "false";
      postContent.contentEditable = 'false'
      postImageUrl.contentEditable = 'false'

      postTitle.classList.remove('editable')
      postContent.classList.remove('editable')
      postImageUrl.classList.remove('editable')
      postImageUrl.style.display = 'none'

      // edit-mode-title
      editModeTitle.style.display = 'none'

      // edit buttons
      editButtons.style.display = 'none'
      editButton.textContent = 'Edit'
    }
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const view = new View()
  const controller = new Controller(model, view)
  controller.init()

})