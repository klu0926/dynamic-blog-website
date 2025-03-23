// index.html
import model from './model/model.js'
import Post from './model/post.js'

class View {
  constructor() {
  }
  displayPosts(posts) {
    const postsDiv = document.querySelector('#posts')
    posts.forEach(post => {
      const postAnchor = document.createElement('a')
      const titleDiv = document.createElement('div')
      const contentP = document.createElement('p')
      const imageDiv = document.createElement('div')
      const image = document.createElement('img')

      titleDiv.textContent = post.title
      contentP.textContent = post.content
      image.src = post.cover

      postAnchor.appendChild(imageDiv)
      postAnchor.appendChild(titleDiv)
      postAnchor.appendChild(contentP)
      imageDiv.appendChild(image)
      postsDiv.appendChild(postAnchor)

      // add link
      postAnchor.href = `post.html/?postId=${post.id}`

      // add class
      imageDiv.classList.add('image-div')
      titleDiv.classList.add('title')
      postAnchor.classList.add('post')
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

  // Generate a post
  document.querySelector('#generate').addEventListener('click', () => {
    model.createPost(new Post('New Post', 'This is a randomly generated post'))
    window.location.reload()
  })


  // Create a New Post
  document.querySelector('#create').addEventListener('click', () => {
    window.location.href = 'new-post.html'
  })

})

