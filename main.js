fetch('https://jsonplaceholder.typicode.com/posts')
.then(response => response.json())
.then(posts => {
  const blogList = document.getElementById('blogList');

  // Display each blog post
  posts.forEach(post => {
    const postItem = document.createElement('div');
    postItem.innerHTML = `
      <h3>${post.title}</h3>
      <p>${post.body}</p>
      <button onclick="deleteBlog(${post.id})">Delete</button>
    `;
    blogList.appendChild(postItem);
  });
});

// Add new blog post
document.getElementById('addBlogForm').addEventListener('submit', event => {
event.preventDefault();
const title = document.getElementById('titleInput').value;
const content = document.getElementById('contentInput').value;

fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: title,
    body: content
  })
})
.then(response => response.json())
.then(newPost => {
  const blogList = document.getElementById('blogList');
  const postItem = document.createElement('div');
  postItem.innerHTML = `
    <h3>${newPost.title}</h3>
    <p>${newPost.body}</p>
    <button onclick="deleteBlog(${newPost.id})">Delete</button>
  `;
  blogList.appendChild(postItem);
  document.getElementById('addBlogForm').reset();
});
});

// Delete blog post
function deleteBlog(postId) {
fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
  method: 'DELETE'
})
.then(response => {
  if (response.status === 200) {
    const blogList = document.getElementById('blogList');
    const postItem = document.querySelector(`[data-id="${postId}"]`);
    blogList.removeChild(postItem);
  }
});
}