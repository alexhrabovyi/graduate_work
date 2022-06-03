"use strict";
{
    const education_mobile_slider = new Swiper(".education-packs-wrapper__mobile-content", {
        slidesPerView: "auto",
        centeredSlides: true,
        spaceBetween: 30,
        initialSlide: 1,

        breakpoints: {

            577: {
                spaceBetween: 80,
            }
        }
    })

    new EducationTabs({
        education_block_selector: ".education-packs-wrapper__desktop-block",

        button_active_class: "education-packs-wrapper__button_active",
        card_hide_class: "element-none",

        animation_hide_class: "animation-fading-down",
        animation_show_class: "animation-fading-up",

        selected_main_id: 0,
        selected_additional_id: 0,

        additional_tabs: true,
    });

    new EducationTabs({
        education_block_selector: ".education-packs-wrapper__mobile-block",

        button_active_class: "education-packs-wrapper__button_active",
        card_hide_class: "element-none",

        animation_hide_class: "animation-fading-down",
        animation_show_class: "animation-fading-up",

        selected_main_id: 0,

        additional_tabs: true,
    });

}

