class Select {
    constructor(options) {
        this.selects = document.querySelectorAll(options.selects_selector);

        this.selectedId = options.selectedId ?? 0;
        this.arrow_transform_class = options.arrow_transform_class;
        this.selected_option_class = options.selected_option_class;

        this.setup();
    }

    setup() {

        for (let i = 0; i < this.selects.length; i++) {
            let selectOption = this.selects[i].querySelectorAll("[data-option]")

            for (let k = 0; k < selectOption.length; k++) {
                selectOption[k].setAttribute("data-option", k);
            }

            selectOption[this.selectedId].classList.add(this.selected_option_class);

            this.selects[i].setAttribute("data-select-open", false);
            this.selects[i].querySelector("[data-chosen-value]").textContent = selectOption[this.selectedId].textContent;
            this.selects[i].addEventListener("click", this.clickHandler.bind(this));
        }
    }

    selectOpen(select) {
        return select.dataset.selectOpen === "true" ? true : false;
    }

    optionsHeight(selectOptions) {
        return +getComputedStyle(selectOptions).height.match(/\d+/g)[0];
    }

    selectHeight(select) {
        return +getComputedStyle(select).height.match(/\d+/g)[0];
    }

    returnSelectOptions(select) {
        return select.querySelector("[data-options]");
    }

    returnArrowIcon(select) {
        return select.querySelector("[data-arrow-icon]");
    }

    blockClicks(select) {
        select.style.pointerEvents = "none";

        function unBlock() {
            select.style.pointerEvents = "";

            select.removeEventListener("transitionend", unBlock, { passive: true });
        }

        select.addEventListener("transitionend", unBlock, { passive: true });
    }

    clickHandler(e) {
        e.preventDefault();

        let target = e.target;
        let select = e.target.closest(".trial-lesson-form-wrapper__select");

        if (target.closest("[data-show-chosen-block]")) {
            this.toggle(select);
        } else if (target.hasAttribute("data-option")) {
            this.chooseOption(target, select);
        }
    }

    toggle(select) {
        this.selectOpen(select) ? this.close(select) : this.open(select);
    }

    open(select) {
        let selectOptions = this.returnSelectOptions(select);
        let arrowIcon = this.returnArrowIcon(select);

        select.style.height = this.selectHeight(select) + this.optionsHeight(selectOptions) + "px";
        this.blockClicks(select);

        arrowIcon.classList.add(this.arrow_transform_class);

        select.setAttribute("data-select-open", true);
    }

    close(select) {
        let selectOptions = this.returnSelectOptions(select);
        let arrowIcon = this.returnArrowIcon(select);

        select.style.height = this.selectHeight(select) - this.optionsHeight(selectOptions) + "px";
        this.blockClicks(select);

        arrowIcon.classList.remove(this.arrow_transform_class);

        select.setAttribute("data-select-open", false);
    }

    chooseOption(target, select) {
        let chosenValue = document.querySelectorAll("[data-chosen-value]");

        for (let i = 0; i < chosenValue.length; i++) {
            chosenValue[i].textContent = target.textContent;
        }

        let selectedOptions = document.querySelectorAll(`[data-option = "${this.selectedId}"]`);

        for (let i = 0; i < selectedOptions.length; i++) {
            selectedOptions[i].classList.remove(this.selected_option_class);
        }

        this.selectedId = target.dataset.option;

        selectedOptions = document.querySelectorAll(`[data-option = "${this.selectedId}"]`);

        for (let i = 0; i < selectedOptions.length; i++) {
            selectedOptions[i].classList.add(this.selected_option_class);
        }

        this.close(select);
    }
}

new Select({
    selects_selector: ".trial-lesson-form-wrapper__select",
    arrow_transform_class: "trial-lesson-form-wrapper__select-icon_transformed",
    selected_option_class: "trial-lesson-form-wrapper__select-option_selected",
    selectedId: 0,
});

// ===============================================

// class Checkbox {
//     constructor(options) {
//         this.checkboxBlock = document.querySelector(options.checkbox_block_selector);
//         this.checkboxOption = this.checkboxBlock.querySelectorAll("[data-checkbox-option");

//         this.selected_class = options.selected_class;
//         this.selectedId = options.selectedId ?? 0;

//         this.setup();
//     }

//     setup() {
//         for (let i = 0; i < this.checkboxOption.length; i++) {
//             this.checkboxOption[i].setAttribute("data-checkbox-option", i);
//         }

//         this.checkboxBlock.setAttribute("data-selected-checkbox-id", this.selectedId);

//         this.checkboxOption[this.selectedId].classList.add(this.selected_class);

//         this.checkboxBlock.addEventListener("click", this.selectCheckbox.bind(this));
//     }

//     selectCheckbox(e) {
//         e.preventDefault();

//         let checkbox = e.target.closest("[data-checkbox-option]");

//         if (!checkbox) return;

//         this.checkboxOption[this.selectedId].classList.remove(this.selected_class);
//         checkbox.classList.add(this.selected_class);

//         this.selectedId = checkbox.dataset.checkboxOption;

//         this.checkboxBlock.setAttribute("data-selected-checkbox-id", this.selectedId);
//     }
// }

// new Checkbox({
//     checkbox_block_selector: ".trial-lesson-form-wrapper__checkbox-block",
//     selected_class: "trial-lesson-form-wrapper__checkbox-button_selected",
//     selectedId: 0,
// });

// ===============================================

// class Tabs {
//     constructor(options) {
//         this.tabButtonBlock = document.querySelector(options.tab_buttons_block_selector);
//         this.tabContentBlock = document.querySelector(options.tab_contents_block_selector);

//         this.tabButton = this.tabButtonBlock.querySelectorAll("[data-tab-button]");
//         this.tabContent = this.tabContentsBlock = document.querySelectorAll("[data-tab-content]");

//         this.tab_button_active_class = options.tab_button_active_class;
//         this.tab_content_active_class = options.tab_content_active_class;

//         this.selectedId = options.selectedId ?? 0;

//         this.setup();
//     }

//     returnHeight(el) {
//         return getComputedStyle(el).height.match(/\d+/g)[0];
//     }

//     clearInputs() {
//         let inputs = this.tabContentBlock.querySelectorAll("input");

//         for (let input of inputs) {
//             input.value = "";
//         }
//     }

//     setup() {
//         for (let i = 0; i < this.tabButton.length; i++) {
//             this.tabButton[i].setAttribute("data-tab-button", i);
//         }

//         for (let i = 0; i < this.tabContent.length; i++) {
//             this.tabContent[i].setAttribute("data-tab-content", i);
//         }

//         this.tabButtonBlock.setAttribute("data-selected-tab-id", this.selectedId);

//         let tabContentHeight = this.returnHeight(this.tabContent[this.selectedId]);

//         this.tabContentBlock.style.height = tabContentHeight + "px";

//         this.tabButton[this.selectedId].classList.add(this.tab_button_active_class);
//         this.tabContent[this.selectedId].classList.add(this.tab_content_active_class);

//         this.tabButtonBlock.addEventListener("click", this.showContent.bind(this));
//     }

//     showContent(e) {
//         e.preventDefault();

//         if (e.target.dataset.tabButton !== this.selectedId) {
//             let oldTabButton = this.tabButton[this.selectedId];
//             let oldTabContent = this.tabContent[this.selectedId]

//             oldTabButton.classList.remove(this.tab_button_active_class);
//             oldTabContent.classList.remove(this.tab_content_active_class);

//             this.selectedId = e.target.dataset.tabButton;

//             this.tabButtonBlock.setAttribute("data-selected-tab-id", this.selectedId);

//             let addClasses = () => {
//                 this.tabButton[this.selectedId].classList.add(this.tab_button_active_class);
//                 this.tabContent[this.selectedId].classList.add(this.tab_content_active_class);

//                 oldTabContent.removeEventListener("transitionend", addClasses);
//             }

//             oldTabContent.addEventListener("transitionend", addClasses);

//             let tabContentHeight = this.returnHeight(this.tabContent[this.selectedId]);
//             this.tabContentBlock.style.height = tabContentHeight + "px";

//             this.clearInputs();
//         }
//     }
// }

// new Tabs({
//     tab_buttons_block_selector: ".trial-lesson-form-wrapper__tab-buttons-block",
//     tab_contents_block_selector: ".trial-lesson-form-wrapper__tab-contents",
//     tab_button_active_class: "trial-lesson-form-wrapper__tab-button_selected",
//     tab_content_active_class: "trial-lesson-form-wrapper__tab-content_active",
//     selectedId: 0,
// })

// ===============================================

// class FormTrialLessonSetuper {
//     constructor(trialForm_selector) {
//         this.trialForm = document.querySelectorAll(trialForm_selector);

//         this.setup();
//     }

//     setup() {
//         for (let i = 0; i < this.trialForm.length; i++) {
//             this.trialForm[i].setAttribute("data-trial-form-id", i);

//             new Tabs({
//                 tab_buttons_block_selector: `[data-trial-form-id="${i}"] .trial-lesson-form-wrapper__tab-buttons-block`,
//                 tab_contents_block_selector: `[data-trial-form-id="${i}"] .trial-lesson-form-wrapper__tab-contents`,
//                 tab_button_active_class: "trial-lesson-form-wrapper__tab-button_selected",
//                 tab_content_active_class: "trial-lesson-form-wrapper__tab-content_active",
//                 selectedId: 0,
//             })

//             new Select({
//                 select_selector: `[data-trial-form-id="${i}"] .trial-lesson-form-wrapper__select`,
//                 arrow_transform_class: "trial-lesson-form-wrapper__select-icon_transformed",
//                 selected_option_class: "trial-lesson-form-wrapper__select-option_selected",
//                 selectedId: 0,
//             });
//         }
//     }
// }


// new FormTrialLessonSetuper(".trial-lesson-form-wrapper");
