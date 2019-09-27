// const backUrl = "http://localhost:3000";
const backUrl = "https://youcookapp.herokuapp.com/post";
const likesContainer= document.querySelector(".likes-container");
let canAddLike= true;
window.onload = () => {
  let id= document.querySelector("#post-id").value;
  console.log(id)
  axios.get(`${backUrl}/post/post-like/${id}`).then(data => {
    let likes = data.data.likes;
    likesContainer.innerHTML=
    `<p id="show-post-likes">❤️${likes} Likes</p>`
 });


  document.querySelector(".likes-container").onclick = function(e) {
    // if (canAddLike==false) {
    //   return ;
    // }
    axios.get(`${backUrl}/post/post-like-plus/${id}`)
    .then(data => {
      let newLikes= data.data.likes;
    likesContainer.innerHTML=
    `<p id="show-post-likes">❤️${newLikes} Likes</p>`
    canAddLike= false;
  });
};
}






