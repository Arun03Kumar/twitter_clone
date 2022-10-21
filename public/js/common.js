const btn = document.getElementById("submitPostButton");
const textArea = document.getElementById("postTextarea");
textArea.addEventListener("keyup", (e) => {
  // console.log("event triggered")
  const text = e.currentTarget.value.trim();

  btn.disabled = false;
  if (text === "") {
    btn.disabled = true;
  }
  else{
    btn.disabled = false
  }
});

btn.addEventListener("click", () => {
  const data = {
    postarea: textArea.value,
  };
  const xhr = new XMLHttpRequest()
  xhr.open("POST", "/api/posts")
  xhr.setRequestHeader("Content-type", "application/json")
  xhr.onload = () => {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 201) {
        //now with the return data we can create an html element and append it to body
        // console.log(typeof(xhr.response));
        // console.log(typeof [JSON.parse(xhr.response)]);
        const container = document.querySelector(".postsContainer");
        html = createPostHtml(JSON.parse(xhr.response))
        container.insertAdjacentHTML("beforeend", html);
        location.reload()
      }
    }
  };
  // xhr.onreadystatechange = function () {
  //   if (this.status == 201) {
  //     console.log(this.xhr.response)
  //   }
  // };
  xhr.send(JSON.stringify(data))
});

function createPostHtml(postData) {
  var postedBy = postData.postedBy;

  if (postedBy._id === undefined) {
    return console.log("User object not populated");
  }

  var displayName = postedBy.firstname + " " + postedBy.lastname;
  var timestamp = timeDifference(new Date(), new Date(postData.createdAt));

  return `<div class='post' data-id=${postData._id}>

                <div class='mainContentContainer'>
                    <div class='userImageContainer'>
                        <img src='${postedBy.profilePic}'>
                    </div>
                    <div class='postContentContainer'>
                        <div class='header'>
                            <a href='/profile/${postedBy.username}' class='displayName'>${displayName}</a>
                            <span class='username'>@${postedBy.username}</span>
                            <span class='date'>${timestamp}</span>
                        </div>
                        <div class='postBody'>
                            <span>${postData.content}</span>
                        </div>
                        <div class='postFooter'>
                            <div class='postButtonContainer'>
                                <button>
                                    <i class='far fa-comment'></i>
                                </button>
                            </div>
                            <div class='postButtonContainer'>
                                <button>
                                    <i class='fas fa-retweet'></i>
                                </button>
                            </div>
                            <div class='postButtonContainer'>
                                <button class="likeButton">
                                    <i class='far fa-heart'></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
}

function timeDifference(current, previous) {
  var msPerMinute = 60 * 1000;
  var msPerHour = msPerMinute * 60;
  var msPerDay = msPerHour * 24;
  var msPerMonth = msPerDay * 30;
  var msPerYear = msPerDay * 365;

  var elapsed = current - previous;

  if (elapsed < msPerMinute) {
    if (elapsed / 1000 < 30) return "Just now";

    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return Math.round(elapsed / msPerYear) + " years ago";
  }
}


