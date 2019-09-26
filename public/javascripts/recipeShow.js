const backUrl = "http://localhost:3000";
const bookmarksContainer= document.querySelector(".bookmark-container");
window.onload = () => {
//   let id= document.querySelector("#post-id").value;
//   axios.get(`${backUrl}/post/add-bookmark/${id}`).then(data => {
//     let bookmarks = data.data.bookmarks;
//     bookmarksContainer.innerHTML=
//     `<p id="show-post-bookmarks">${bookmarks} Bookmarks</p>`
//  });

  document.querySelector(".bookmarks-container").onclick = function(e) {
    axios.get(`${backUrl}/post/add-bookmark/${id}`)
    .then(data => {
      let newBookmarks= data.data.bookmark;
      bookmarksContainer.innerHTML=
    `<p id="show-post-bookmarks">${newBookmarks} Bookmarked</p>`
  });
};
}



