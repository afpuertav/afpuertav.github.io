document.addEventListener("DOMContentLoaded", function () {
    const postsContainer = document.getElementById("posts-container");
    const searchInput = document.getElementById("search-input");
    const sortSelect = document.getElementById("sort-select");

    // Datos de ejemplo de las publicaciones (puedes cargarlos dinámicamente desde un archivo JSON o API)
    const posts = [
        {
            title: "Quantifying Complexity and Quality in History-Based Parametric CAD Models through Information Theory and Machine Learning.",
            date: "working",
            link: "publications.html",
            excerpt: "History-based parametric computer-aided design (CAD) models encode not only geometry but also the sequence and logic of operations that define a product’s structure. Understanding and quantifying the complexity of these models remains a fundamental challenge for design robustness, reuse, and automation. This study proposes a reproducible pipeline that integrates geometric, structural, and information-theoretic metrics to objectively evaluate the complexity and quality of CAD models. Shannon’s Information Theory provides the conceptual backbone of the framework, allowing structural disorder to be quantified through entropy-based measures. A dataset of 381 SolidWorks models was analyzed using a combination of descriptive statistics, dimensionality reduction, and unsupervised clustering to derive latent complexity labels, which were subsequently used to train supervised classification and regression models. Results show that entropy-based descriptors, particularly Wang entropy, outperform geometric metrics in predicting model complexity. Moreover, a negative relationship between entropy and model quality (measured through regeneration success ratio) was consistently observed, confirming that structural disorder reduces robustness and reusability. The findings validate entropy as a universal indicator of complexity in parametric CAD models and provide a generalizable framework for their assessment. This approach opens the path toward intelligent CAD environments capable of detecting excessive complexity and guiding designers toward more stable, standardized, and reusable modeling practices."
        },
        // más publicaciones aquí
    ];

    // Add CSS to justify excerpt text
    const style = document.createElement("style");
    style.textContent = ".post-excerpt { text-align: justify; }";
    document.head.appendChild(style);

    // Función para cargar y mostrar las publicaciones
    function loadPosts(posts) {
        postsContainer.innerHTML = ""; // Limpiar el contenedor

        posts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.className = "post";
            postElement.innerHTML = `
                <h2><a href="${post.link}">${post.title}</a></h2>
                <p class="post-date">Published on: ${post.date}</p>
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

    // Function to sort posts
    function sortPosts(posts, sortBy) {
        switch (sortBy) {
            case "date-desc":
                return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            case "date-asc":
                return posts.sort((a, b) => new Date(a.date) - new Date(b.date));
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