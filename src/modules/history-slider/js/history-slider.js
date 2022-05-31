const history_slider = new Swiper(".history-slider-wrapper__slider-container", {
    direction: "horizontal",
    slidesPerView: 1,
    grabCursor: true,
    resistance: false,
    speed: 1200,

    autoplay: {
        delay: 7000,
        disableOnInteraction: false,
    },

    pagination: {
        el: ".history-slider-wrapper__pagination-bullets-block",
        clickable: true,
        bulletClass: "history-slider-wrapper__pagination-bullet",
        bulletActiveClass: "history-slider-wrapper__pagination-bullet_active",
    },
})