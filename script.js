const apikey = "ec577cc0b06e4643b35034e8117c7511";

const blogContainer = document.getElementById("blog-container");
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// Function to fetch random news
async function fetchRandomNews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error Fetching random news", error);
        return [];
    }
}

// Function to fetch news based on search query
async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error Fetching news by query", error);
        return [];
    }
}

// Display blogs on the page
function displayBlogs(articles) {
    blogContainer.innerHTML = "";

    articles.forEach((article) => {
        // Only display articles with valid title, description, and image
        if (article.title && article.description && article.urlToImage) {
            const blogCard = document.createElement("div");
            blogCard.classList.add("block-card");

            // Image
            const image = document.createElement("img");
            image.src = article.urlToImage;
            image.alt = article.title;

            // Title
            const title = document.createElement("h2");
            const truncatedTitle = article.title.length > 30 
                ? article.title.slice(0, 30) + "..." 
                : article.title;
            title.textContent = truncatedTitle;

            // Description
            const description = document.createElement("p");
            const truncatedDescription = article.description.length > 120 
                ? article.description.slice(0, 120) + "..." 
                : article.description;
            description.textContent = truncatedDescription;

            // Append elements
            blogCard.appendChild(image);
            blogCard.appendChild(title);
            blogCard.appendChild(description);

            // Click Event to open full article
            blogCard.addEventListener("click", () => {
                window.open(article.url, "_blank");
            });

            blogContainer.appendChild(blogCard);
        }
    });
}

// Search button click event
searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim();
    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch (error) {
            console.error("Error Fetching news by query", error);
        }
    }
});

// Load random news on page load
(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error Fetching random news", error);
    }
})();
