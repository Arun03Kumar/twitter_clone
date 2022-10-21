const { Collection } = require("mongoose");

window.addEventListener("load", function () {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", "/api/posts");
  xhr.onload = () => {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        const container = document.querySelector(".postsContainer");
        // console.log(JSON.parse(xhr.response))
        outputPosts(xhr.response, container);
      }
    }
  };
  xhr.send();
});

function outputPosts(results, container) {
  container.innerHTML = "";
  JSON.parse(results).forEach((element) => {
    const html = createPostHtml(element);
    // const ele = new DOMParser().parseFromString(html, "text/html");
    container.insertAdjacentHTML("beforeend", html);
  });
}

setTimeout(() => {
  const likeBtn = document.querySelectorAll(".likeButton");
  likeBtn.forEach(btn => {
    btn.addEventListener('click', () => {
      alert("gheel")
    })
  })
}, 2000)




