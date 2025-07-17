document.addEventListener("DOMContentLoaded", function () {
    const postsContainer = document.getElementById("posts-container");
    const searchInput = document.getElementById("search-input");
    const sortSelect = document.getElementById("sort-select");

    // Datos de ejemplo de las publicaciones (puedes cargarlos dinámicamente desde un archivo JSON o API)
    const posts = [
        {
            title: "Tetris",
            link: "games/tetris.html",
        },
        // más publicaciones aquí
    ];

    // Función para cargar y mostrar las publicaciones
    function loadPosts(posts) {
        postsContainer.innerHTML = ""; // Limpiar el contenedor

        posts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.className = "post";
            postElement.innerHTML = `
                <h2><a href="${post.link}">${post.title}</a></h2>
            `;
            postsContainer.appendChild(postElement);
        });
    }

    // Función para filtrar las publicaciones según el texto de búsqueda
    function filterPosts(searchText) {
        const filteredPosts = posts.filter(post =>
            post.title.toLowerCase().includes(searchText.toLowerCase())
        );
        return filteredPosts;
    }

    // Function to sort posts alphabetically
    function sortPosts(posts, sortBy) {
        switch (sortBy) {
            case "title-asc":
                return posts.sort((a, b) => a.title.localeCompare(b.title));
            case "title-desc":
                return posts.sort((a, b) => b.title.localeCompare(a.title));
            default:
                return posts;
        }
    }

    // Searcher
    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value;
        const filteredPosts = filterPosts(searchText);
        const sortedPosts = sortPosts(filteredPosts, sortSelect.value);
        loadPosts(sortedPosts);
    });

    // Sorter
    sortSelect.addEventListener("change", () => {
        const searchText = searchInput.value;
        const filteredPosts = filterPosts(searchText);
        const sortedPosts = sortPosts(filteredPosts, sortSelect.value);
        loadPosts(sortedPosts);
    });

    // Load all posts
    loadPosts(sortPosts(posts, sortSelect.value));
});
