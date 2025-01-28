// blog.js
document.addEventListener("DOMContentLoaded", function () {
    const postsContainer = document.getElementById("posts-container");
    const searchInput = document.getElementById("search-input");
    const sortSelect = document.getElementById("sort-select");

    // Datos de ejemplo de las publicaciones (puedes cargarlos dinámicamente desde un archivo JSON o API)
    const posts = [
        {
            title: "Mi primera publicación",
            date: "2024-01-15",
            link: "blog/post1.html",
            excerpt: "Esta es mi primera publicación en el blog. Hablo sobre mi experiencia en robótica."
        },
        {
            title: "Mi segunda publicación",
            date: "2024-01-16",
            link: "blog/post2.html",
            excerpt: "Esta es mi segunda publicación en el blog. Hablo sobre mi experiencia en robótica."
        }
        // Puedes agregar más publicaciones aquí
    ];

    // Función para cargar y mostrar las publicaciones
    function loadPosts(posts) {
        postsContainer.innerHTML = ""; // Limpiar el contenedor

        posts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.className = "post";
            postElement.innerHTML = `
                <h2><a href="${post.link}">${post.title}</a></h2>
                <p class="post-date">Publicado el: ${post.date}</p>
                <p class="post-excerpt">${post.excerpt}</p>
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

    // Función para ordenar las publicaciones
    function sortPosts(posts, sortBy) {
        switch (sortBy) {
            case "date-asc":
                return posts.sort((a, b) => new Date(a.date) - new Date(b.date));
            case "date-desc":
                return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            case "title-asc":
                return posts.sort((a, b) => a.title.localeCompare(b.title));
            case "title-desc":
                return posts.sort((a, b) => b.title.localeCompare(a.title));
            default:
                return posts;
        }
    }

    // Evento para buscar publicaciones
    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value;
        const filteredPosts = filterPosts(searchText);
        const sortedPosts = sortPosts(filteredPosts, sortSelect.value);
        loadPosts(sortedPosts);
    });

    // Evento para ordenar publicaciones
    sortSelect.addEventListener("change", () => {
        const searchText = searchInput.value;
        const filteredPosts = filterPosts(searchText);
        const sortedPosts = sortPosts(filteredPosts, sortSelect.value);
        loadPosts(sortedPosts);
    });

    // Cargar todas las publicaciones al inicio
    loadPosts(sortPosts(posts, sortSelect.value));
});