const backUrl = "http://localhost:3000";
const postsContainer = document.querySelector(".profile-posts-container");
window.onload = () => {
  axios.get(`${backUrl}/post/all`).then(posts => {
    let { data } = posts;
    postsContainer.innerHTML = "";
    data.forEach(post => {
      postsContainer.innerHTML += `
 
      <li>
        <img src="${post.picPath}" alt="recipe photo">
        ${post.postName}
        <button class="post-edit" id="${post._id}">Edit post</button>
        <button class="post-delete" id="${post._id}">Delete post</button>
        <input type="hidden" id="post-id" value="">
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
 
      <li class="edit-post-container">
        <form class="edit-post-inline"id=${data.data._id}>
        <input type="text" name="postName" class="postName" value="${data.data.postName}">
        <input type="text" name="content" class="content" value="${data.data.content}">
        <input type="hidden" class="edit-id-link" value="${data.data._id}">
        <input type="submit" class="btn-send-post-edit" value="SAVE">
      </form>
      <form action="/post/post-edit/update/${data.data._id}" method="post" enctype="multipart/form-data">
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
                <img src="${post.picPath}" alt="recipe photo">
                ${post.postName}
                <button class="post-edit" id="${post._id}">Edit post</button>
                <div class="post-delete id="${post._id}">Delete post</div>
                <input type="hidden" id="post-id" value="${post._id}">
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
                <img src="${post.picPath}" alt="recipe photo">
                ${post.postName}
                <button class="post-edit" id="${post._id}">Edit post</button>
                <button class="post-delete" id="${post._id}">Delete post</button>
                <input type="hidden" id="post-id" value="">
              </li>
              `;
              });
            });
        })
    );
  });
};