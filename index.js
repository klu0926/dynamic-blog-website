// index.html
import model from './model/model.js'
import Post from './model/post.js'

class View {
  constructor() {
  }
  displayPosts(posts) {
    const postsDiv = document.querySelector('#posts')
    posts.forEach(post => {
      const postDiv = document.createElement('div')
      const titleDiv = document.createElement('div')
      const contentPre = document.createElement('pre')
      const imageDiv = document.createElement('div')
      const image = document.createElement('img')

      titleDiv.textContent = post.title
      contentPre.textContent = post.content
      image.src = post.cover

      postDiv.appendChild(imageDiv)
      postDiv.appendChild(titleDiv)
      postDiv.appendChild(contentPre)
      imageDiv.appendChild(image)
      postsDiv.appendChild(postDiv)

      // add class
      postDiv.classList.add('post')
    })

  }
}

class Controller {
  constructor(model, view) {
    this.model = model,
      this.view = view
  }
  init() {
    let posts = model.getPosts()
    if (!posts || posts.length === 0) {
      // generate template post if no posts
      const post = new Post('Welcome', 'This is the day you get the power write post at your own well, but there are few rules you need to follow.')
      model.createPost(post)
      posts = model.getPosts()
    }
    this.view.displayPosts(posts)
  }
}



document.addEventListener('DOMContentLoaded', () => {

  const view = new View()
  const controller = new Controller(model, view)
  controller.init()


  document.querySelector('#create').addEventListener('click', () => {
    model.createPost(new Post('New Post', 'This is a example post'))
    window.location.reload()
  })

})

