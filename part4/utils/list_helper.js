const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
    const reducer = (sum, current) => {
        return sum + current.likes
    }
    return blogs.reduce(reducer, 0)
}

const favouritBlog = (blogs) => {
    const reducer = (max, current) => {
        if (max < current.likes){
            max = current.likes
        }
        return max
    }
    return blogs.reduce(reducer, 0)
}
module.exports = {
  dummy,
  totalLikes,
  favouritBlog
}
