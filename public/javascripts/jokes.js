const apiHandler = new APIHandler();

window.addEventListener("load", function(e) {
  e.preventDefault();
  apiHandler
  .getRandomJoke()
  .then((res=>{
    const { data } = res
    document.querySelector("#randomjoke").innerHTML = '';
    document.querySelector("#randomjoke").innerHTML = `
    <q>${data.text}</q>
    `
  }));
});