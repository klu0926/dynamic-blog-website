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

    postTitle.textContent = post.title
    postContent.textContent = post.content
    postImage.src = post.cover
  }
}

class Controller {
  constructor(model, view) {
    this.model = model
    this.view = view
  }
  init() {
    // get postId
    const urlParams = new URLSearchParams(window.location.search)
    const postId = urlParams.get('postId')

    // disply post
    const post = this.model.getPost(postId)
    this.view.displayPost(post)
  }
}


document.addEventListener('DOMContentLoaded', () => {
  const view = new View()
  const controller = new Controller(model, view)
  controller.init()

})