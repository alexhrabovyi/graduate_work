{
    const link = document.querySelector("#main-nav__dropdown-link");
    const content = document.querySelector("#main-nav__dropdown-content");

    function add_hover_color(link, content) {
        content.addEventListener("mouseover", () => {
            link.classList.add("link-hover");
        });

        content.addEventListener("mouseout", () => {
            link.classList.remove("link-hover");
        })
    }

    add_hover_color(link, content);
}