"use strict";

// ----- Mobile card slider init script -----

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

// ===========================

class EducationTabs {
    constructor(options) {
        this.educationBlock = document.querySelector(options.education_block_selector);
        this.mainButtons = this.educationBlock.querySelectorAll("[data-ed-main-button]");
        this.allMainCards = this.educationBlock.querySelectorAll("[data-ed-card]");

        this.animationHide = options.animation_hide_class;
        this.animationShow = options.animation_show_class;

        this.buttonActiveClass = options.button_active_class;
        this.cardHideClass = options.card_hide_class;

        this.selectedMainId = options.selected_main_id ?? 0;
        this.selectedAdditionalId = options.selected_additional_id ?? 0;

        this.additionalTabs = options.additional_tabs ?? false;

        this.setupMain();
    }

    setupMain() {
        this.mainButtons[this.selectedMainId].classList.add(this.buttonActiveClass);

        for (let i = 0; i < this.allMainCards.length; i++) {
            if (this.allMainCards[i].dataset.edCardMain != this.selectedMainId) {
                this.allMainCards[i].classList.add(this.cardHideClass);
            }
        }

        for (let i = 0; i < this.mainButtons.length; i++) {
            this.mainButtons[i].addEventListener("click", this.mainCardsHandler.bind(this));
        }

        if (this.additionalTabs) {
            this.setupAdditional();
        }
    }

    setupAdditional() {
        this.additionalButtons = this.educationBlock.querySelectorAll("[data-ed-additional-button]");

        this.additionalButtons[this.selectedAdditionalId].classList.add(this.buttonActiveClass);

        this.allAdditionalCards = this.educationBlock.querySelectorAll("[data-ed-card-additional]");

        for (let i = 0; i < this.allAdditionalCards.length; i++) {
            if (this.allAdditionalCards[i].dataset.edCardAdditional != this.selectedAdditionalId) {
                this.allAdditionalCards[i].classList.add(this.cardHideClass);
            }
        }

        for (let i = 0; i < this.additionalButtons.length; i++) {
            this.additionalButtons[i].addEventListener("click", this.additionalCardsHandler.bind(this));
        }
    }

    hideAdditionalButtons() {
        for (let i = 0; i < this.additionalButtons.length; i++) {
            this.additionalButtons[i].style.opacity = "0";
            this.additionalButtons[i].style.pointerEvents = "none";
        }
    }

    showAdditionalButtons() {
        for (let i = 0; i < this.additionalButtons.length; i++) {
            this.additionalButtons[i].style.opacity = "";
            this.additionalButtons[i].style.pointerEvents = "";
        }
    }

    hideCard(card) {
        card.classList.add(this.animationHide);

        function hide() {
            card.classList.add(this.cardHideClass);
            card.classList.remove(this.animationHide);

            card.removeEventListener("animationend", hide.bind(this), { once: true });
        }

        card.addEventListener("animationend", hide.bind(this), { once: true });
    }

    showCard(card) {
        card.classList.remove(this.cardHideClass);
        card.classList.add(this.animationShow);

        function show() {
            card.classList.remove(this.animationShow);

            this.educationBlock.style.pointerEvents = "";

            card.removeEventListener("animationend", show.bind(this), { once: true });
        }

        card.addEventListener("animationend", show.bind(this), { once: true });
    }

    mainCardsHandler(e) {
        e.preventDefault();

        let currentButton = e.target;

        if (currentButton.dataset.edMainButton != this.selectedMainId) {
            this.educationBlock.style.pointerEvents = "none";

            this.mainButtons[this.selectedMainId].classList.remove(this.buttonActiveClass);

            let displayedCards = this.educationBlock.querySelectorAll(`[data-ed-card-main="${this.selectedMainId}"]`);

            this.selectedMainId = currentButton.dataset.edMainButton;

            this.mainButtons[this.selectedMainId].classList.add(this.buttonActiveClass);

            let currentCards = this.educationBlock.querySelectorAll(`[data-ed-card-main="${this.selectedMainId}"]`);

            if (this.additionalTabs && !currentButton.hasAttribute("data-ed-has-additional")) {
                this.hideAdditionalButtons();

            } else if (this.additionalTabs && currentButton.hasAttribute("data-ed-has-additional")) {
                this.showAdditionalButtons();
            }

            for (let i = 0; i < displayedCards.length; i++) {

                if (displayedCards[i].hasAttribute("data-ed-card-additional") && displayedCards[i].dataset.edCardAdditional == this.selectedAdditionalId) {
                    this.hideCard(displayedCards[i]);

                } else if (!displayedCards[i].hasAttribute("data-ed-card-additional")) {
                    this.hideCard(displayedCards[i]);
                }
            }

            this.educationBlock.addEventListener("animationend", () => {
                for (let i = 0; i < currentCards.length; i++) {

                    if (this.additionalTabs && currentButton.hasAttribute("data-ed-has-additional")) {

                        if (currentCards[i].dataset.edCardAdditional == this.selectedAdditionalId) {
                            this.showCard(currentCards[i]);
                        }

                    } else {
                        this.showCard(currentCards[i]);
                    }
                }
            }, { once: true });
        }
    }

    additionalCardsHandler(e) {
        e.preventDefault();

        let currentAdditionalButton = e.target;

        if (currentAdditionalButton.dataset.edAdditionalButton != this.selectedAdditionalId) {
            this.educationBlock.style.pointerEvents = "none";

            this.additionalButtons[this.selectedAdditionalId].classList.remove(this.buttonActiveClass);

            let displayedAdditionalCards = this.educationBlock.querySelectorAll(`[data-ed-card-additional="${this.selectedAdditionalId}"]`);

            this.selectedAdditionalId = currentAdditionalButton.dataset.edAdditionalButton;

            this.additionalButtons[this.selectedAdditionalId].classList.add(this.buttonActiveClass);

            let currentAdditionalCards = this.educationBlock.querySelectorAll(`[data-ed-card-additional="${this.selectedAdditionalId}"]`);

            for (let i = 0; i < displayedAdditionalCards.length; i++) {
                this.hideCard(displayedAdditionalCards[i]);
            }

            this.educationBlock.addEventListener("animationend", () => {
                for (let i = 0; i < currentAdditionalCards.length; i++) {
                    this.showCard(currentAdditionalCards[i]);
                }
            }, { once: true });
        }
    }

}

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
