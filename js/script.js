const url =
  "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=20&format=json&origin=*&srsearch=";

const form = document.querySelector(".form-control");
const searchInput = document.querySelector(".search-input");
const grid = document.querySelector(".grid-contents");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const search = searchInput.value;
  if (!search) {
    grid.innerHTML = `<div class="error">please enter valid search term</div>`;
    return;
  }
  fetchPages(search);
});

const fetchPages = async (search) => {
  grid.innerHTML = `<div class="loading-state"></div>`;
  try {
    const resp = await fetch(`${url}${search}`);
    const data = await resp.json();
    const searchResults = data.query.search;
    if (searchResults.length < 1) {
      grid.innerHTML = `<div class="error">no matching results. Please try again</div>`;
      return;
    }
    displayResults(searchResults);
  } catch (error) {
    grid.innerHTML = `<div class="error">There was an error...</div>`;
  }
};

const displayResults = (searchResults) => {
  const results = searchResults
    .map((resultLists) => {
      const { title, snippet, pageid } = resultLists;
      return ` <article class="cards">
            <a href="http://en.wikipedia.org/?curid=${pageid}">
              <h2 class="title">${title}</h2>
              <p class="text">${snippet}</p>
            </a>
          </article>`;
    })
    .join(" ");
  grid.innerHTML = results;
};
