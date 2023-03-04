const ViewSearchHistory = document.querySelector("#history");

ViewSearchHistory.addEventListener("click", () => {
  window.location.href = "history.html";
});

let form = document.querySelector("form");
let input = document.querySelector("input");
let resultsDiv = document.querySelector("#results");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let searchTerm = input.value;
  let encodedSearchTerm = encodeURIComponent(searchTerm);
  let url = `https://www.googleapis.com/books/v1/volumes?q=${encodedSearchTerm}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // display book results
      resultsDiv.innerHTML = `<h2>Book Results For '${searchTerm}'</h2>`;
      console.log("data", data);

      data.items.forEach((book) => {
        let title = book.volumeInfo.title;
        let authors = book.volumeInfo.authors
          ? book.volumeInfo.authors.join(", ")
          : "Unknown";
        let pageCount = book.volumeInfo.pageCount
          ? book.volumeInfo.pageCount
          : "Unknown";
        let publisher = book.volumeInfo.publisher
          ? book.volumeInfo.publisher
          : "Unknown";
        let image = book.volumeInfo.imageLinks
          ? book.volumeInfo.imageLinks.thumbnail
          : "https://via.placeholder.com/150x200";
        let buyLink = book.saleInfo.buyLink ? book.saleInfo.buyLink : "#";

        let bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
                    <h3>${title}</h3>
                    <img src="${image}" alt="${title} book cover">
                    <p>Author(s): ${authors}</p>
                    <p>Page count: ${pageCount}</p>
                    <p>Publisher: ${publisher}</p>
                    <a href="${buyLink}" target="_blank"><button>Buy Now</button></a>
                `;

        resultsDiv.appendChild(bookDiv);
      });

      //  localStorage
      saveSearch(searchTerm, data);

    })
    .catch((error) => {
      console.error(error);
    });
});

function saveSearch(searchTerm, data) {
  const timestamp = new Date();
  console.log(searchTerm, timestamp, data);
  let searches = localStorage.getItem("bookSearches");
  searches = searches ? JSON.parse(searches) : [];

  searches.unshift([
    { searchTerm: searchTerm, timestamp: timestamp, data: data },
  ]);
  localStorage.setItem("bookSearches", JSON.stringify(searches));
}
