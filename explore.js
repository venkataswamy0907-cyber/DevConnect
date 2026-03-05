const userContainer = document.getElementById("user-container");
const footer = document.getElementById("footer");

// hide footer while loading
footer.style.display = "none";

// redirect to profile page
function viewProfile(id) {
  window.location.href = `profile.html?id=${id}`;
}

async function loadUsers() {
  try {

    // fetch users
    const usersRes = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await usersRes.json();

    for (let i = 0; i < users.length; i++) {

      const user = users[i];

      // fetch posts for post count
      const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user.id}`);
      const posts = await postsRes.json();

      // generate avatar using user id
      const avatar = `https://i.pravatar.cc/150?img=${user.id}`;

      const userCard = document.createElement("div");
      userCard.classList.add("user-details");

      userCard.innerHTML = `
        <div class="user-top-color"></div>

        <div class="users-photo">
            <img class="user-photo" src="${avatar}" alt="User Image">
        </div>

        <div class="user-information">
            <h3>${user.name}</h3>
            <p>@${user.username.toLowerCase()}</p>
            <p>${user.company.name}</p>

            <div class="user-data">
                <span class="user-posts">
                    <strong>${posts.length}</strong> Posts
                </span>

                <span class="user-posts">
                    <strong>${Math.floor(Math.random() * 5000)}</strong> Followers
                </span>
            </div>
        </div>

        <div class="view-profile-btn">
            <button class="view-profile" onclick="viewProfile(${user.id})">
                View Profile
            </button>
        </div>
      `;

      userContainer.appendChild(userCard);
    }

    // show footer after loading
    footer.style.display = "block";

  } catch (error) {
    console.error("Error loading users:", error);
  }
}

loadUsers();