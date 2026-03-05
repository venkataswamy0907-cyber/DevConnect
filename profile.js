const footer = document.getElementById("footer");
footer.style.display = "none";




const params = new URLSearchParams(window.location.search);
const userId = params.get("id");

// profile elements
const nameEl = document.getElementById("profile-name");
const usernameEl = document.getElementById("profile-username");
const companyEl = document.getElementById("profile-company");

const companyNameEl = document.getElementById("profile-company-name");
const cityEl = document.getElementById("profile-city");
const websiteEl = document.getElementById("profile-website");

const avatarEl = document.getElementById("profile-avatar");

const postCountEl = document.getElementById("post-count");
const followersEl = document.getElementById("followers-count");
const followingEl = document.getElementById("following-count");

const postsContainer = document.getElementById("posts-container");


async function loadProfile() {

try {

/// GET USER
const userRes = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
const user = await userRes.json();


/// GET POSTS
const postsRes = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
const posts = await postsRes.json();


/// AVATAR (stable avatar generator)
const avatar = `https://i.pravatar.cc/150?img=${userId}`;

avatarEl.src = avatar;


/// PROFILE DETAILS
nameEl.textContent = user.name;
usernameEl.textContent = "@" + user.username.toLowerCase();
companyEl.textContent = user.company.catchPhrase;

companyNameEl.textContent = user.company.name;
cityEl.textContent = user.address.city;
websiteEl.textContent = user.website;


/// PROFILE STATS
postCountEl.textContent = posts.length;

followersEl.textContent = Math.floor(Math.random() * 5000);
followingEl.textContent = Math.floor(Math.random() * 1000);


/// POSTS SECTION
posts.forEach(post => {

const likes = Math.floor(Math.random() * 200);
const comments = Math.floor(Math.random() * 20);
const minutes = Math.floor(Math.random() * 60);

const postCard = document.createElement("div");
postCard.classList.add("one-post");

postCard.innerHTML = `

<div class="dp-and-name">

<img class="dp" src="${avatar}">

<div>
<h4>${user.name}</h4>
<p>${minutes}m ago</p>
</div>

</div>

<div class="post-title">
<a>${post.title}</a>
</div>

<div class="post-body">
<p>${post.body}</p>
</div>

<div class="post-card-actions">

<button class="action-btn">
❤️ ${likes}
</button>

<button class="action-btn">
💬 ${comments}
</button>

<button class="action-btn">
🔖
</button>

</div>

<div class="post-readmore">
<a href="back-to-feed.html?postId=${post.id}">Read More</a>
</div>

`;

postsContainer.appendChild(postCard);

});
 footer.style.display = "block";

} catch (error) {

console.log("Error loading profile:", error);

}

}

loadProfile();



const followBtn = document.getElementById("follow-btn");
const toast = document.getElementById("toast");

let isFollowing = false;

function showToast(message){

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(()=>{
        toast.classList.remove("show");
    },2000);

}

followBtn.addEventListener("click",()=>{

    if(!isFollowing){

        followBtn.textContent = "Following";
        showToast("You are now following this user");

        isFollowing = true;

    } else {

        followBtn.textContent = "Follow";
        showToast("You unfollowed this user");

        isFollowing = false;

    }

});