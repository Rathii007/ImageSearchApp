const accessKey = "agzF12egRDRc1PbHDuiFKGr8xsKa3sTl0gG29sKvjqI";
const formElement = document.querySelector("form");
const inputElement = document.getElementById("search-input");
const searchResults = document.querySelector(".search-results");
const showMoreButton = document.getElementById("show-more-button");

const options = {
  bottom: "unset",
  right: "32px",
  left: "unset",
  top: "32px",
  time: "0.5s",
  mixColor: "#fff",
  backgroundColor: "#fff",
  buttonColorDark: "#100f2c",
  buttonColorLight: "#fff",
  saveInCookies: false,
  label: "🌓",
  autoMatchOsTheme: true,
};

const darkmode = new Darkmode(options);
darkmode.showWidget();

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputElement.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();

  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    imageLink.appendChild(image);
    imageWrapper.appendChild(imageLink);

    const imageDescription = document.createElement("a");
    imageDescription.href = result.links.html;
    imageDescription.target = "_blank";
    imageDescription.textContent = result.alt_description;

    imageWrapper.appendChild(imageDescription);
    searchResults.appendChild(imageWrapper);
  });

  if (page < data.total_pages) {
    showMoreButton.style.display = "block";
  } else {
    showMoreButton.style.display = "none";
  }

  page++;
}

formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreButton.addEventListener("click", () => {
  searchImages();
});
