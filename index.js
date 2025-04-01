// index.html
import model from './model/model.js'
import Post from './model/post.js'
import charley from './charley/charley.js'

const welcomeTitle = 'Welcome, Please follow these rules'

const welcomeImage = 'https://placehold.co/600x400/2e3a2e/7aa85f?text=WELCOME&font=oswald'

const welcomePost = `This is the day you gain the power to write posts at your own will, but power comes with rules:

Rule 1 — Do not post after midnight; something else might answer.
Rule 2 — If you see a post you don't remember writing, do not click on it. Rule 3 — If a post writes itself, do not finish it. Walk away.
Rule 4 — If you delete a post and keep dreaming of it, you must rewrite and publish it. 
Rule 5 — If you create a post and the cover image isn't yours, do not stare at it for more than three seconds. 
Rule 6 — If the blog site turns red, close it immediately. 
Rule 7 — Do not read any post out loud. 
Rule 8 — If you start seeing a man’s face with no features in your dreams or daily life, stop using this site for 24 hours. 
Rule 9 — If you post your first post, DO NOT STOP for more than 33 hours. You must continue posting.`

class View {
  constructor() {
    this.contentLength = 150
  }
  displayPosts(posts) {
    const postsDiv = document.querySelector('#posts')
    posts.forEach(post => {
      const postAnchor = document.createElement('a')
      const titleDiv = document.createElement('div')
      const content = document.createElement('p')
      const imageDiv = document.createElement('div')
      const image = document.createElement('img')

      // limite content display
      if (post.content.length > this.contentLength) {
        post.content = post.content.slice(0, this.contentLength)
        post.content += '...'
      }

      // display post data 
      titleDiv.textContent = post.title
      content.textContent = post.content
      image.src = post.cover

      // appendchild
      postAnchor.appendChild(imageDiv)
      postAnchor.appendChild(titleDiv)
      postAnchor.appendChild(content)
      imageDiv.appendChild(image)
      postsDiv.appendChild(postAnchor)

      // add post link
      postAnchor.href = `post.html?postId=${post.id}`

      // add class
      imageDiv.classList.add('image-div')
      titleDiv.classList.add('title')
      content.classList.add('content')
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
      const post = new Post(welcomeTitle, welcomePost, welcomeImage)
      model.createPost(post)
      posts = model.getPosts()
    }
    this.view.displayPosts(posts)

    // forgive button
    const forgive = document.querySelector('#forgive')
    forgive.addEventListener('click', () => {
      localStorage.clear();
      window.location.reload()
    })
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


// Charley
charley.play()