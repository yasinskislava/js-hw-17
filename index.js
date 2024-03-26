const imagesList = document.querySelector(".imagesList");
const downloadMoreButton = document.querySelector(".downloadMore");
const api = "43085062-83502d00c5fb8aeb01fe37f91";
let currentPage = 1;
function createImages(api) {
  fetch(
    `https://pixabay.com/api/?key=${api}&editors_choice=true&page=${currentPage}&per_page=6`
  )
    .then((val) => val.json())
    .then((value) => {
      console.log(value);
      console.log(currentPage);
      value.hits.map((img) => {
        imagesList.insertAdjacentHTML(
          "beforeend",
          `<li class="item">
        <div class="imageBox">
          <img src="${img.previewURL}" alt="" />
        </div>
        <ul class="iconsList">
          <li>
            Likes: ${img.likes} <svg><use href="./symbol-defs.svg#like"></use></svg>
          </li>
          <li>
            Comments: ${img.comments} <svg><use href="./symbol-defs.svg#comment"></use></svg>
          </li>
          <li>
            Downloads: ${img.downloads} <svg><use href="./symbol-defs.svg#download"></use></svg>
          </li>
        </ul>
      </li>`
        );
      });
        currentPage += 1;
        if (currentPage === 16) {
            downloadMoreButton.style.display = "none";
        }
    });
}

createImages(api);

downloadMoreButton.addEventListener("click", () => {
  createImages(api);
});
