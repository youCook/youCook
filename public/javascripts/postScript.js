const backUrl = "http://localhost:3000";
const postsContainer = document.querySelector(".profile-posts-container");
window.onload = () => {
  axios.get(`${backUrl}/post/all`).then(posts => {
    let { data } = posts;
    postsContainer.innerHTML = "";
    data.forEach(post => {
      postsContainer.innerHTML += `
 
      <li>
        <div class="border-line">
          <h2>Recipe Name: ${post.postName}</h2>
          <img src="${post.picPath}" alt="recipe photo">
          <button class="post-edit" id="${post._id}">Edit post</button>
          <button class="post-delete" id="${post._id}">Delete post</button>
          <input type="hidden" id="post-id" value="">
        </div>
      </li>
      `;
    });
    const postsBtn = document.querySelectorAll(".post-edit");
    postsBtn.forEach(
      post =>
        (post.onclick = e => {
          axios
            .get(`${backUrl}/post/post-edit/${e.target.id}`)
            .then(data => {
              postsContainer.innerHTML = "";
              postsContainer.innerHTML += `
 
      <li class="edit-post-container border-line">
        <form class="edit-post-inline input-form"id=${data.data._id}>
        <input type="text" name="postName" class="postName" value="${data.data.postName}">
        <textarea  name="content" class="content" placeholder="${data.data.content}"></textarea>
        <input type="hidden" class="edit-id-link" value="${data.data._id}">
        <input type="submit" class="btn-send-post-edit" value="SAVE">
        </form>
        <form action="/post/post-edit/update/${data.data._id}" method="post" enctype="multipart/form-data" class="input-form">
          <label>Post photo</label>
          <input type="file" name="picPath">
          <input type="submit" value="SAVE">
        </form>
      </li>
      `;
              document.querySelector(".btn-send-post-edit").onclick = function(
                e
              ) {
                // e.preventDefault();
                const id = document.querySelector(".edit-id-link").value;
                const postName = document.querySelector(".postName").value;
                const content = document.querySelector(".content").value;
                if (!postName) {
                  postName = "none";
                }
                if (!content) {
                  content = "none";
                }
                axios
                  .post(
                    `${backUrl}/post/post-edit/update/${id}/${postName}/${content}`
                  )
                  .then(res => {
                    let { data } = res;
                    postsContainer.innerHTML = "";

                    data.forEach(post => {
                      postsContainer.innerHTML += `
         
              <li>
                <div class="border-line">
                  <h2>${post.postName}</h2>
                  <img src="${post.picPath}" alt="recipe photo">
                  <button class="post-edit" id="${post._id}">Edit post</button>
                  <div class="post-delete id="${post._id}">Delete post</div>
                  <input type="hidden" id="post-id" value="${post._id}">
                </div>
              </li>
              `;
                    });
                  });
              };
            })
            .catch(err => {
              throw err;
            });
        })
    );
    const postsBtnDel = document.querySelectorAll(".post-delete");
    postsBtnDel.forEach(
      post =>
        (post.onclick = e => {
          axios
            .get(`${backUrl}/post/post-delete/${e.target.id}`)
            .then(posts => {
              let { data } = posts;
              postsContainer.innerHTML = "";
              data.forEach(post => {
                postsContainer.innerHTML += `

              <li>
                <div class="border-line">
                  <h2>${post.postName}</h2>
                  <img src="${post.picPath}" alt="recipe photo">
                  <button class="post-edit" id="${post._id}">Edit post</button>
                  <button class="post-delete" id="${post._id}">Delete post</button>
                  <input type="hidden" id="post-id" value="">
                </div>
              </li>
              `;
              });
            });
        })
    );
  });
};
