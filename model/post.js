// Default image
const defaultImage = "https://placehold.co/600x400/2e3a2e/7aa85f?text=UNDEFINED&font=oswald"

// create a new post
class Post {
  constructor(title = 'New Post', content, cover) {
    this.id = this.generateId();
    this.title = title;
    this.content = content || ""
    this.cover = cover || defaultImage;
    this.created = new Date()
  }
  generateId() {
    const length = 9;
    return Math.random().toString(36).slice(2, 2 + length); // cleaner and skips split
  }
}
export default Post;
