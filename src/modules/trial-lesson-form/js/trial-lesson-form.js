class Select {
    constructor(options) {
        this.select = document.querySelector(options.select_selector);
        this.showChosenBlock = this.select.querySelector("[data-show-chosen-block]");
        this.chosenValue = this.select.querySelector("[data-chosen-value]");
        this.arrowIcon = this.select.querySelector("[data-arrow-icon]");
        this.selectOptions = this.select.querySelector("[data-options]");
        this.selectOption = this.select.querySelectorAll("[data-option]");

        this.selectedId = options.selectedId ?? 0;
        this.arrow_transform_class = options.arrow_transform_class;
        this.selected_option_class = options.selected_option_class;

        this.selectOptionsVisible = false;

        this.setup();
    }

    setup() {
        for (let i = 0; i < this.selectOption.length; i++) {
            this.selectOption[i].setAttribute("data-option", i);
        }

        this.chosenValue.textContent = this.selectOption[this.selectedId].textContent;
        this.selectOption[this.selectedId].classList.add(this.selected_option_class);

        this.select.setAttribute("data-chosen-lang-id", this.selectedId);

        this.select.addEventListener("click", this.clickHandler.bind(this));
    }

    clickHandler(e) {
        e.preventDefault();

        let target = e.target;

        if (target.closest("[data-show-chosen-block]")) {
            this.toggle();
        } else if (target.hasAttribute("data-option")) {
            this.chooseOption(e);
        }
    }

    get optionsHeight() {
        return +getComputedStyle(this.selectOptions).height.match(/\d+/g)[0];
    }

    get selectHeight() {
        return +getComputedStyle(this.select).height.match(/\d+/g)[0];
    }

    toggle() {
        this.selectOptionsVisible ? this.close() : this.open();
    }

    open() {
        this.select.style.height = this.selectHeight + this.optionsHeight + "px";

        this.arrowIcon.classList.add(this.arrow_transform_class);

        this.selectOptionsVisible = true;
    }

    close() {
        this.select.style.height = this.selectHeight - this.optionsHeight + "px";

        this.arrowIcon.classList.remove(this.arrow_transform_class);

        this.selectOptionsVisible = false;
    }

    chooseOption(e) {
        this.chosenValue.textContent = e.target.textContent;

        this.selectOption[this.selectedId].classList.remove(this.selected_option_class);
        e.target.classList.add(this.selected_option_class);

        this.selectedId = e.target.dataset.option;
        this.select.setAttribute("data-chosen-lang-id", this.selectedId);

        this.close();
    }
}

new Select({
    select_selector: ".trial-lesson-form-wrapper__select",
    arrow_transform_class: "trial-lesson-form-wrapper__select-icon_transformed",
    selected_option_class: "trial-lesson-form-wrapper__select-option_selected",
    selectedId: 0,
});

// ===============================================

class Checkbox {
    constructor(options) {
        this.checkboxBlock = document.querySelector(options.checkbox_block_selector);
        this.checkboxOption = this.checkboxBlock.querySelectorAll("[data-checkbox-option");

        this.selected_class = options.selected_class;
        this.selectedId = options.selectedId ?? 0;

        this.setup();
    }

    setup() {
        for (let i = 0; i < this.checkboxOption.length; i++) {
            this.checkboxOption[i].setAttribute("data-checkbox-option", i);
        }

        this.checkboxBlock.setAttribute("data-selected-checkbox-id", this.selectedId);

        this.checkboxOption[this.selectedId].classList.add(this.selected_class);

        this.checkboxBlock.addEventListener("click", this.selectCheckbox.bind(this));
    }

    selectCheckbox(e) {
        e.preventDefault();

        let checkbox = e.target.closest("[data-checkbox-option]");

        if (!checkbox) return;

        this.checkboxOption[this.selectedId].classList.remove(this.selected_class);
        checkbox.classList.add(this.selected_class);

        this.selectedId = checkbox.dataset.checkboxOption;

        this.checkboxBlock.setAttribute("data-selected-checkbox-id", this.selectedId);
    }
}

new Checkbox({
    checkbox_block_selector: ".trial-lesson-form-wrapper__checkbox-block",
    selected_class: "trial-lesson-form-wrapper__checkbox-button_selected",
    selectedId: 0,
});

// ===============================================

class Tabs {
    constructor(options) {
        this.tabButtonBlock = document.querySelector(options.tab_buttons_block_selector);
        this.tabContentBlock = document.querySelector(options.tab_contents_block_selector);

        this.tabButton = this.tabButtonBlock.querySelectorAll("[data-tab-button]");
        this.tabContent = this.tabContentsBlock = document.querySelectorAll("[data-tab-content]");

        this.tab_button_active_class = options.tab_button_active_class;
        this.tab_content_active_class = options.tab_content_active_class;

        this.selectedId = options.selectedId ?? 0;

        this.setup();
    }

    returnHeight(el) {
        return getComputedStyle(el).height.match(/\d+/g)[0];
    }

    clearInputs() {
        let inputs = this.tabContentBlock.querySelectorAll("input");

        for (let input of inputs) {
            input.value = "";
        }
    }

    setup() {
        for (let i = 0; i < this.tabButton.length; i++) {
            this.tabButton[i].setAttribute("data-tab-button", i);
        }

        for (let i = 0; i < this.tabContent.length; i++) {
            this.tabContent[i].setAttribute("data-tab-content", i);
        }

        let tabContentHeight = this.returnHeight(this.tabContent[this.selectedId]);

        this.tabContentBlock.style.height = tabContentHeight + "px";

        this.tabButton[this.selectedId].classList.add(this.tab_button_active_class);
        this.tabContent[this.selectedId].classList.add(this.tab_content_active_class);

        this.tabButtonBlock.addEventListener("click", this.showContent.bind(this));
    }

    showContent(e) {
        e.preventDefault();

        if (e.target.dataset.tabButton !== this.selectedId) {
            let oldTabButton = this.tabButton[this.selectedId];
            let oldTabContent = this.tabContent[this.selectedId]

            oldTabButton.classList.remove(this.tab_button_active_class);
            oldTabContent.classList.remove(this.tab_content_active_class);

            this.selectedId = e.target.dataset.tabButton;

            let addClasses = () => {
                this.tabButton[this.selectedId].classList.add(this.tab_button_active_class);
                this.tabContent[this.selectedId].classList.add(this.tab_content_active_class);

                oldTabContent.removeEventListener("transitionend", addClasses);
            }

            oldTabContent.addEventListener("transitionend", addClasses);

            let tabContentHeight = this.returnHeight(this.tabContent[this.selectedId]);
            this.tabContentBlock.style.height = tabContentHeight + "px";

            this.clearInputs();
        }
    }
}

new Tabs({
    tab_buttons_block_selector: ".trial-lesson-form-wrapper__tab-buttons-block",
    tab_contents_block_selector: ".trial-lesson-form-wrapper__tab-contents",
    tab_button_active_class: "trial-lesson-form-wrapper__tab-button_selected",
    tab_content_active_class: "trial-lesson-form-wrapper__tab-content_active",
    selectedId: 0,
}) 