const apiHandler = new APIHandler();
const topTenContainer = document.querySelector(".top-container");

window.addEventListener("load", function(e) {
  e.preventDefault();
  apiHandler
  .getRandomJoke()
  .then((res=>{
    const { data } = res
    document.querySelector("#randomjoke").innerHTML = '';
    document.querySelector("#randomjoke").innerHTML = `
    <q>${data.text}</q>
    `;
    axios.get("/post/index-top-ten")
    .then(top => {
      top.data.forEach(element => {
      topTenContainer.innerHTML+=`
        <li class="top-line">
        ${element.likes} likes - <a href="/post/post-info/${element._id}">${element.postName}</a>
        </li>
      `;
      })
    })
  }));













});