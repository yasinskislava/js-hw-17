const imagesList = document.querySelector(".imagesList");
const downloadMoreButton = document.querySelector(".downloadMore");
const searchbar = document.querySelector(".searchbar");
let tempArr = [];
const mainArr = [];
searchbar.addEventListener("input", () => {
  const filter = searchbar.value.trim();
  console.log(filter);
  if (filter !== "") {
    tempArr = [];
    const images = document.querySelectorAll(".item");
    images.forEach((item) => {
      const img = item.firstElementChild.firstElementChild;
      if (img.getAttribute("alt").includes(filter.toLocaleLowerCase())) {
        tempArr.push(item);
      }
    });
    imagesList.innerHTML = "";
    tempArr.map((item) => {
      imagesList.insertAdjacentHTML("beforeend", item.outerHTML);
    });
  } else {
    basicList();
  }
});
function basicList() {
  imagesList.innerHTML = "";
  mainArr.map((item) => {
    imagesList.insertAdjacentHTML("beforeend", item);
  });
}
const api = "43085062-83502d00c5fb8aeb01fe37f91";
let currentPage = 1;
function checkLength(width, height) {
  if (width > height) return "width";
  else return "height";
}
function createImages(api) {
  fetch(
    `https://pixabay.com/api/?key=${api}&editors_choice=true&page=${currentPage}&per_page=6`
  )
    .then((val) => val.json())
    .then((value) => {
      value.hits.map((img) => {
        imagesList.insertAdjacentHTML(
          "beforeend",
          `<li class="item">
        <div class="imageBox">
          <img style="${checkLength(
            img.previewWidth,
            img.previewHeight
          )}: 100%" src="${img.previewURL}" alt="${img.tags}" />
        </div>
        <ul class="iconsList">
          <li>
            Likes: ${
              img.likes
            } <svg><use href="./symbol-defs.svg#like"></use></svg>
          </li>
          <li>
            Comments: ${
              img.comments
            } <svg><use href="./symbol-defs.svg#comment"></use></svg>
          </li>
          <li>
            Downloads: ${
              img.downloads
            } <svg><use href="./symbol-defs.svg#download"></use></svg>
          </li>
        </ul>
      </li>`
        );
        mainArr.push(`<li class="item">
        <div class="imageBox">
          <img style="${checkLength(
            img.previewWidth,
            img.previewHeight
          )}: 100%" src="${img.previewURL}" alt="${img.tags}" />
        </div>
        <ul class="iconsList">
          <li>
            Likes: ${
              img.likes
            } <svg><use href="./symbol-defs.svg#like"></use></svg>
          </li>
          <li>
            Comments: ${
              img.comments
            } <svg><use href="./symbol-defs.svg#comment"></use></svg>
          </li>
          <li>
            Downloads: ${
              img.downloads
            } <svg><use href="./symbol-defs.svg#download"></use></svg>
          </li>
        </ul>
      </li>`);
      });
      currentPage += 1;
      if (currentPage === 16) {
        downloadMoreButton.style.display = "none";
        alert("Limit reached");
      }
    });
}

createImages(api);

downloadMoreButton.addEventListener("click", () => {
  searchbar.value = "";
  basicList();
  createImages(api);
});
