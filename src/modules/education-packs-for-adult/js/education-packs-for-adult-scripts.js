"use strict";

class EducationPacks {
    constructor(options) {
        this.educationSection = document.querySelector(options.education_section_selector);
        this.allRoundButtons = this.educationSection.querySelectorAll("[data-ed-round-button]");
        this.allCheckBoxButtons = this.educationSection.querySelectorAll("[data-ed-button]");
        this.allMessages = this.educationSection.querySelectorAll("[data-ed-message]");

        this.roundButtonChosenClass = options.round_button_chosen_class;
        this.roundButtonActiveClass = options.round_button_active_class;
        this.checkBoxActiveClass = options.checkbox_button_active_class;
        this.messageHideClass = options.message_hide_class;

        this.typeOfCards;

        this.educationSection.addEventListener("click", this.handler.bind(this));
    }

    handler(e) {
        e.preventDefault();

        let currentButton = e.target.closest("[data-ed-button]");

        if (!currentButton) return;

        let id = +currentButton.dataset.edButton;

        if (id === 1 && currentButton.hasAttribute("data-ed-offline-button")) {
            this.typeOfCards = currentButton.dataset.edOfflineButton;
        } else if (id === 2 && currentButton.hasAttribute("data-ed-online-button")) {
            this.typeOfCards = currentButton.dataset.edOnlineButton;
        }

        this.setupRoundButtons(id);
        this.setupCheckBoxButtons(id, currentButton);
        this.setupMessages(id, currentButton);

        console.log(this.typeOfCards);
    }

    setupRoundButtons(id) {
        this.allRoundButtons[id].classList.add(this.roundButtonChosenClass)

        if (id < 2) {
            for (let i = id + 1; i < this.allRoundButtons.length; i++) {
                this.allRoundButtons[i].classList.remove(this.roundButtonChosenClass)
                this.allRoundButtons[i].classList.remove(this.roundButtonActiveClass)
            }

            this.allRoundButtons[id + 1].classList.add(this.roundButtonActiveClass)
        }
    }

    setupCheckBoxButtons(id, button) {
        for (let i = 0; i < this.allCheckBoxButtons.length; i++) {
            if (this.allCheckBoxButtons[i].dataset.edButton >= id) {
                this.allCheckBoxButtons[i].classList.remove(this.checkBoxActiveClass);
            }
        }

        button.classList.add(this.checkBoxActiveClass);
    }

    setupMessages(id, button) {
        for (let i = 0; i < this.allMessages.length; i++) {
            if (this.allMessages[i].dataset.edMessage > id) {
                this.allMessages[i].classList.add(this.messageHideClass);
            }
        }

        let messagesNext = document.querySelectorAll(`[data-ed-message="${id + 1}"]`);

        if (button.hasAttribute("data-ed-offline-button")) {
            for (let i = 0; i < messagesNext.length; i++) {
                if (messagesNext[i].hasAttribute("data-ed-offline-message")) {
                    messagesNext[i].classList.remove(this.messageHideClass);
                }
            }
        } else if (button.hasAttribute("data-ed-ind-button")) {
            for (let i = 0; i < messagesNext.length; i++) {
                if (messagesNext[i].hasAttribute("data-ed-ind-message")) {
                    messagesNext[i].classList.remove(this.messageHideClass);
                }
            }
        } else if (button.hasAttribute("data-ed-group-button")) {
            for (let i = 0; i < messagesNext.length; i++) {
                if (messagesNext[i].hasAttribute("data-ed-group-message")) {
                    messagesNext[i].classList.remove(this.messageHideClass);
                }
            }
        } else {
            for (let i = 0; i < messagesNext.length; i++) {
                if (messagesNext[i].hasAttribute("data-ed-online-message")) {
                    messagesNext[i].classList.remove(this.messageHideClass);
                }
            }
        }
    }
}

new EducationPacks({
    education_section_selector: ".education-packs-for-adult",

    round_button_chosen_class: "education-packs-for-adult__round-button_chosen",
    round_button_active_class: "education-packs-for-adult__round-button_active",
    checkbox_button_active_class: "education-packs-for-adult__checkbox_active",
    message_hide_class: "hidden",
})