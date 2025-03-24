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
    this.post = null
    this.isEditable = false
  }
  init() {
    this.getPostAndRender()

    // event
    // edit btn
    document.querySelector('#edit-btn').addEventListener('click', () => this.toggleEditable())

    // cancel button
    document.querySelector('#cancel-btn').addEventListener('click', () => {
      // reset everything back
      this.toggleEditable()
      this.view.displayPost(this.post)
    })

    // save button
    document.querySelector('#save-btn').addEventListener('click', () => this.onSave())

    // delete button (show conform div)
    document.querySelector('#delete-btn').addEventListener('click', () => this.onDeleteBtn())

    // delete conform NO
    document.querySelector('#conform-no').addEventListener('click', () => this.onConformNo())

    // delete conform YES
    document.querySelector('#conform-yes').addEventListener('click', () => this.onConformYes())
  }
  getPostAndRender() {
    // get postId
    const urlParams = new URLSearchParams(window.location.search)
    const postId = urlParams.get('postId')

    // disply post
    this.post = this.model.getPost(postId)
    this.view.displayPost(this.post)
  }
  toggleEditable() {
    const editButton = document.querySelector('#edit-btn')
    const postTitle = document.querySelector('#post-title')
    const postContent = document.querySelector('#post-content')
    const postImageUrl = document.querySelector('#post-image-url')
    const editButtons = document.querySelector('.edit-buttons')
    const editModeTitle = document.querySelector('#edit-mode-notice')
    const postTextContent = document.querySelector('.post-text-content')


    if (!this.isEditable) {
      // turn on edit mode
      this.isEditable = true
      postTitle.contentEditable = "true";
      postContent.contentEditable = 'true'
      postImageUrl.contentEditable = 'true'

      postTextContent.classList.add('editing')
      postTitle.classList.add('editable')
      postContent.classList.add('editable')
      postImageUrl.classList.add('editable')
      postImageUrl.style.display = 'block'

      // edit-mode-title
      editModeTitle.style.display = 'block'

      // edit buttons
      editButtons.style.display = 'block'
      editButton.textContent = 'View'

    } else {
      // turn off edit mode
      this.isEditable = false
      postTitle.contentEditable = "false";
      postContent.contentEditable = 'false'
      postImageUrl.contentEditable = 'false'

      postTextContent.classList.remove('editing')
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
  onSave() {
    try {
      // validate and save the post
      const postTitle = document.querySelector('#post-title').textContent.trim()
      const postContent = document.querySelector('#post-content').innerText.trim()
      const postImageUrl = document.querySelector('#post-image-url').textContent.trim()

      // check image url
      if (postImageUrl) {
        const myURL = new URL(postImageUrl)
        if (myURL.protocol !== 'http:' && myURL.protocol !== 'https:') {
          throw new Error('Cover image url is not valid')
        }
      }

      // update post
      this.model.editPost(
        this.post.id,
        postTitle || this.post.title,
        postContent || this.post.content,
        postImageUrl || this.post.cover
      )

      // toggle edit mode, and update with new post
      window.location.reload()
    } catch (err) {
      // err
      alert(err.message)
    }
  }
  onDeleteBtn() {
    document.querySelector('#conform-outter').style.display = 'block'
  }
  onConformNo() {
    document.querySelector('#conform-outter').style.display = 'none'
  }
  onConformYes() {
    // delete post
    this.model.deletePost(this.post.id)
    // return home
    window.location.href = 'index.html'
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const view = new View()
  const controller = new Controller(model, view)
  controller.init()

})