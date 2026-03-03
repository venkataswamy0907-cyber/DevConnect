const params = new URLSearchParams(window.location.search);
const postId = params.get("postId");

if (!postId) {
  console.error("No postId found in URL");
}

async function loadPost() {
  try {

    if (!postId) return;

    // 1️⃣ Fetch Post
    const postRes = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}`
    );
    const post = await postRes.json();

    if (!post.userId) {
      console.error("Post not found");
      return;
    }

    // 2️⃣ Fetch Author
    const userRes = await fetch(
      `https://jsonplaceholder.typicode.com/users/${post.userId}`
    );
    const user = await userRes.json();

    // 3️⃣ Fetch Comments
    const commentsRes = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
    );
    const comments = await commentsRes.json();

    // 4️⃣ Fetch More Posts From Same Author
    const morePostsRes = await fetch(
      `https://jsonplaceholder.typicode.com/users/${post.userId}/posts`
    );
    const morePosts = await morePostsRes.json();

    

    document.getElementById("post-avatar").src =
      `https://i.pravatar.cc/150?img=${post.userId}`;

    document.getElementById("post-title").textContent = post.title;
    document.getElementById("post-body").textContent = post.body;
    document.getElementById("post-author").textContent = user.name;
    document.getElementById("post-username").textContent =
      "@" + user.username.toLowerCase();

   
    const commentsContainer = document.getElementById("comments-container");
    const commentsCount = document.getElementById("comments-count");

    commentsCount.textContent = `(${comments.length})`;
    commentsContainer.innerHTML = "";

    comments.forEach(comment => {
      const div = document.createElement("div");
      div.classList.add("individual-comments");

      div.innerHTML = `
        <div class="comment-card-image">
          <p>${comment.email.charAt(0).toUpperCase()}</p>
        </div>

        <div class="name-and-body">
          <div class="name-and-email-id">
            <h4>${comment.name}</h4>
            <p>${comment.email}</p>
          </div>
          <div>
            <p>${comment.body.replace(/\n/g, "<br>")}</p>
          </div>
        </div>
      `;

      commentsContainer.appendChild(div);
    });

    

    const moreContainer = document.getElementById("more-posts-container");
    moreContainer.innerHTML = "";


    const filteredPosts = morePosts.filter(p => p.id != postId);


    filteredPosts.slice(0, 3).forEach(p => {

      const div = document.createElement("div");
      div.classList.add("one-post1");

      div.innerHTML = `
        <div class="dp-and-name">
          <img class="dp" src="https://i.pravatar.cc/150?img=${post.userId}">
          <div>
            <h4>${user.name}</h4>
            <p>@${user.username.toLowerCase()}</p>
          </div>
        </div>

        <div class="post-title">
          <a href="back-to-feed.html?postId=${p.id}">
            ${p.title}
          </a>
        </div>

        <div class="post-body">
          <p>
            ${p.body.substring(0, 120)}...
          </p>
        </div>

        <div class="post-card-actions">
          <button class="action-btn">❤️</button>
          <button class="action-btn">💬</button>
          <button class="action-btn">🔖</button>
        </div>
      `;

      moreContainer.appendChild(div);
    });

  } catch (error) {
    console.error("Error loading post:", error);
  }
}

loadPost();