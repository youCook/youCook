// const backUrl = "http://localhost:3000";
const backUrl = "https://youcookapp.herokuapp.com/post";
const bookmarksContainer = document.querySelector(".bookmarks-container");
window.onload = () => {
  let id = document.querySelector(".post-id").value;
  axios.get(`${backUrl}/post/get-bookmark/${id}`).then(data => {
    if (data.data) {
      bookmarksContainer.innerHTML = `<p class="show-post-bookmarks">Unbookmark</p>`;

    } else {
      bookmarksContainer.innerHTML = `<p class="show-post-bookmarks">Bookmark</p>`;
    }
  });

  bookmarksContainer.onclick = function(e) {
    if (document.querySelector(".show-post-bookmarks").innerHTML == "Unbookmark") {
      axios.get(`${backUrl}/post/rem-bookmark/${id}`).then(() => {
        bookmarksContainer.innerHTML = `<p class="show-post-bookmarks">Bookmark</p>`;
      });
    } else {
      axios.get(`${backUrl}/post/add-bookmark/${id}`).then(() => {
        bookmarksContainer.innerHTML = `<p class="show-post-bookmarks">Unbookmark</p>`;
      });
    }
  };
};
