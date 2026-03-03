document.addEventListener("DOMContentLoaded", () => {
  const FEED = document.getElementById("feed");

  const heartSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#878282" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round">
    <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>
  </svg>`;

  const messageSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#878282" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round">
    <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/>
  </svg>`;

  const saveSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#878282" stroke-width="0.75" stroke-linecap="round" stroke-linejoin="round">
    <path d="M17 3a2 2 0 0 1 2 2v15a1 1 0 0 1-1.496.868l-4.512-2.578a2 2 0 0 0-1.984 0l-4.512 2.578A1 1 0 0 1 5 20V5a2 2 0 0 1 2-2z"/>
  </svg>`;

  Promise.all([
    fetch("https://jsonplaceholder.typicode.com/posts").then(r => r.json()),
    fetch("https://jsonplaceholder.typicode.com/users").then(r => r.json())
  ])
  .then(([posts, users]) => {
    FEED.innerHTML = "";

    posts.forEach(post => {
      const user = users.find(u => u.id === post.userId);

      const card = document.createElement("div");
      card.className = "post";

      card.innerHTML = `
        <div class="post_header">
          <img src="https://i.pravatar.cc/60?u=${user.id}" alt="${user.name}">
          <div class="user_details">
            <h6>${user.name}</h6>
            <p>${Math.floor(Math.random() * 59) + 1}m ago</p>
          </div>
        </div>

        <div class="post_body">
          <h4 class="post_title">${post.title}</h4>
          <p class="post_body">${post.body}</p>
        </div>

        <div class="post_footer">
          <span class="like">${heartSVG}</span>
          <span class="message">${messageSVG}</span>
          <span class="save">${saveSVG}</span>
        </div>

        <span class="read_more">Read more</span>
      `;

      FEED.appendChild(card);
    });
  });



  

  // chaning color of like and save icons on click
  FEED.addEventListener("click", (e) => {
    const heartSvg = e.target.closest(".like svg");
    const saveSvg = e.target.closest(".save svg");

    if (heartSvg) {
      const liked = heartSvg.dataset.liked === "true";
      heartSvg.dataset.liked = (!liked).toString();
      heartSvg.style.stroke = liked ? "#878282" : "red";
      heartSvg.style.fill = liked ? "none" : "red";
    }

    if (saveSvg) {
      const saved = saveSvg.dataset.saved === "true";
      saveSvg.dataset.saved = (!saved).toString();
      saveSvg.style.stroke = saved ? "#878282" : "blue";
      saveSvg.style.fill = saved ? "none" : "blue";
    }
  });
});


// changing the color of follow button on click to red
document.addEventListener("DOMContentLoaded", () => {
  const btns = document.getElementsByClassName("follow_button");

  for (let btn of btns) {
    btn.addEventListener("click", () => {
      if (btn.textContent.trim() === "Follow") {
        btn.textContent = "Following";
        btn.style.color = "red";
        btn.style.backgroundColor = "white";
      } else {
        btn.textContent = "Follow";
        btn.style.color = "white";
        btn.style.backgroundColor="blue";

      }
    });
  }
});


// attaching search bar for searching by post tile or content..
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("search_input");
  const feed = document.getElementById("feed");

  if (!searchInput || !feed) {
    console.error("Search input or feed not found");
    return;
  }

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const posts = feed.getElementsByClassName("post");

    for (let post of posts) {
      const text = post.textContent.toLowerCase();
      post.style.display = text.includes(query) ? "block" : "none";
    }
  });
});