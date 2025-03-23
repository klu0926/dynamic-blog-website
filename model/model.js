class Model {
  constructor() {
    this.key = 'posts'
  }
  getPosts() {
    // get all posts from localStorage
    const posts = JSON.parse(localStorage.getItem(this.key))
    if (posts) {
      console.log('Posts.length:', posts.length)
      console.log('Posts:', posts)
    }
    // return
    return Array.isArray(posts) ? posts : []
  }
  getPost(postId) {
    const posts = this.getPosts()
    const post = posts.find(post => post.id === postId)

    if (post) {
      console.log('Post:', post)
      return post
    }
    console.log(`Cannot find post with ID: ${postId}`)
    return null
  }
  setPosts(posts) {
    localStorage.setItem(this.key, JSON.stringify(posts))
  }
  createPost(post) {
    const posts = this.getPosts()
    this.setPosts([...posts, post])
    console.log('Post saved!')
  }
  editPost(postId, title, content, cover) {
    const posts = this.getPosts()
    const post = posts.find(post => post.id === postId)
    if (post) {
      if (title !== undefined) post.title = title
      if (content !== undefined) post.content = content
      if (cover !== undefined) post.cover = cover
      this.setPosts(posts)
      return
    }
    console.log(`Cannot find post with ID: ${postId}`)
  }
  deletePost(postId) {
    const posts = this.getPosts()

    // find the post to delete
    let isDeleted = false
    for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === postId) {
        posts.splice(i, 1)
        isDeleted = true
        break
      }
    }
    // save posts
    if (isDeleted) {
      this.setPosts(posts)
      console.log('post deleted')
      return
    }
    console.log(`Cannot find post id ${postId}`)
  }
}
const model = new Model()
export default model