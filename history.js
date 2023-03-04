const searchHistory = JSON.parse(localStorage.getItem("bookSearches"));

let searchHistoryList = document.getElementById("History");

let count = 0;
if (searchHistory) {
  searchHistory.forEach((search) => {
    count++;
    const li = document.createElement("div");

    let searchTerm = search[0].searchTerm;
    let timestamp = new Date(search[0].timestamp);
    let date = timestamp.toLocaleDateString();
    let time = timestamp.toLocaleTimeString();
    li.innerHTML = `<div style="border:1px solid black; margin:10px">${count}.${searchTerm}    Searched On:${date} at ${time}</div>`;
    li.addEventListener("click", () => {
      displayBookData(li, search);
    });
    searchHistoryList.appendChild(li);
  });
} else {
  searchHistoryList.innerHTML = "No Search Results";
}
const clearSearchButton = document.getElementById("Search");
clearSearchButton.addEventListener("click", () => {
  localStorage.removeItem("bookSearches");
  searchHistoryList.innerHTML = "No Search Result Found";
});

function displayBookData(li, search) {
  const searchResult = search[0].data.items;
  searchResult.forEach((book) => {

    const title = book.volumeInfo.title;
    const authors = book.volumeInfo.authors
      ? book.volumeInfo.authors.join(", ")
      : "Unknown";
    const publisher = book.volumeInfo.publisher
      ? book.volumeInfo.publisher
      : "Unknown";
    const pageCount = book.volumeInfo.pageCount
      ? book.volumeInfo.pageCount
      : "Unknown";
    const imageLink = book.volumeInfo.imageLinks
      ? book.volumeInfo.imageLinks.thumbnail
      : "https://via.placeholder.com/128x196.png?text=No+Cover";
    const buyLink = book.saleInfo.buyLink ? book.saleInfo.buyLink : "#";

    const bookDiv = document.createElement("div");
    bookDiv.style.display = "flex";
    bookDiv.style.flexWrap = "wrap";
    bookDiv.classList.add("bookDiv");
    bookDiv.innerHTML = `
        <div class="book">
          <img src="${imageLink}" alt="${title}">
          <h2>${title}</h2>
          <p>Author(s): ${authors}</p>
          <p>Publisher: ${publisher}</p>
          <p>Page Count: ${pageCount}</p>
          <a href="${buyLink}" target="_blank" rel="noopener noreferrer" class="buy-button">Buy Now</a>
        </div>
      `;

    
    li.appendChild(bookDiv);
  });
}