// async function searchBooks() {
//     const query = document.getElementById("searchInput").value;
//     try {
//         const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
//         const data = await response.json();
//         console.log(data); // Log the response data to inspect its structure
//         displayResults(data.docs);
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// }

// function displayResults(books) {
//     const resultsDiv = document.getElementById("results");
//     resultsDiv.innerHTML = ""; // Clear previous results
//     books.forEach(book => {
//         const bookDiv = document.createElement("div");
//         bookDiv.classList.add("book");
//         bookDiv.innerHTML = `
//             <div>${book.title} by ${book.author_name ? book.author_name.join(", ") : "Unknown Author"}</div>
//             <img src="https://covers.openlibrary.org/a/olid/${book.cover_edition_key}-M.jpg" alt="Cover Image">
//         `;
//         resultsDiv.appendChild(bookDiv);
//     });
// }


function searchBooks() {
    const query = document.getElementById("searchInput").value;
    const apiUrl = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayBooks(data.docs);
            console.log(data); 
        })
        
        .catch(error => {
            console.error('Error searching for books:', error);
        });
}

function displayBooks(books) {
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "";

    books.forEach(book => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        bookDiv.innerHTML = `
            <h2>${book.title}</h2>
            <p>Author(s): ${book.author_name ? book.author_name.join(", ") : "Unknown"}</p>
            <p>First Published: ${book.first_publish_year || "Unknown"}</p>
            <button onclick="fetchEditions('${book.key}')">View Editions</button>
            <button onclick="fetchBookshelves('${book.key}')">View Bookshelves</button>
            <button onclick="fetchRatings('${book.key}')">View Ratings</button>
        `;
        resultsDiv.appendChild(bookDiv);
    });
}

function fetchEditions(workKey) {
    const apiUrl = `https://openlibrary.org/works/${workKey}/editions.json`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Editions:', data);
            // Handle fetched editions as needed
        })
        .catch(error => {
            console.error('Error fetching editions:', error);
        });
}

function fetchBookshelves(workKey) {
    const apiUrl = `https://openlibrary.org/works/${workKey}/bookshelves.json`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Bookshelves:', data);
            // Handle fetched bookshelves as needed
        })
        .catch(error => {
            console.error('Error fetching bookshelves:', error);
        });
}

function fetchRatings(workKey) {
    const apiUrl = `https://openlibrary.org/works/${workKey}/ratings.json`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log('Ratings:', data);
            // Handle fetched ratings as needed
        })
        .catch(error => {
            console.error('Error fetching ratings:', error);
        });
}

  function searchAuthors() {
            const authorName = document.getElementById("authorInput").value;
            const apiUrl = `https://openlibrary.org/search/authors.json?q=${encodeURIComponent(authorName)}`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    displayAuthors(data);
                })
                .catch(error => {
                    console.error('Error searching for authors:', error);
                });
        }

        function displayAuthors(data) {
            const resultsDiv = document.getElementById("results");
            resultsDiv.innerHTML = "";

            if (data.numFound > 0) {
                data.docs.forEach(author => {
                    const authorDiv = document.createElement("div");
                    authorDiv.classList.add("author");
                    authorDiv.innerHTML = `
                        <h2>${author.name}</h2>
                        <p>Birth Date: ${author.birth_date}</p>
                        <p>Work Count: ${author.work_count}</p>
                        <button onclick="fetchAuthorWorks('${author.key}')">View Works</button>
                    `;
                    resultsDiv.appendChild(authorDiv);
                });
            } else {
                resultsDiv.textContent = "No authors found.";
            }
        }

        function fetchAuthorWorks(authorKey) {
            const apiUrl = `https://openlibrary.org/authors/${authorKey}/works.json?limit=50`;

            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    console.log('Works by Author:', data);
                    alert('Fetched works by author! Check console for details.');
                })
                .catch(error => {
                    console.error('Error fetching author works:', error);
                });
        }