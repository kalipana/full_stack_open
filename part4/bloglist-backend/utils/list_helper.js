const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  s = 0
  for (let i = 0; i < blogs.length; i++) {
    s += blogs[i].likes
  }
  return s
}

const favoriteBlog = (blogs) => {
  max_likes = blogs[0].likes
  max_likes_blog = blogs[0]
  for (let i = 1; i < blogs.length; i++) {
    if (blogs[i].likes > max_likes) {
      max_likes = blogs[i].likes
      max_likes_blog = blogs[i]
    }
  }
  return {
    title: max_likes_blog.title,
    author: max_likes_blog.author,
    likes: max_likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}