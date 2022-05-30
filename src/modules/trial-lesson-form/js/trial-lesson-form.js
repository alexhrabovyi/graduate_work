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

class Checkbox {
    constructor(options) {
        this.checkBoxBlock = document.querySelectorAll(options.checkbox_block_selector);

        this.selected_class = options.selected_class;
        this.selectedId = options.selectedId ?? 0;

        this.setup();
    }

    setup() {
        for (let i = 0; i < this.checkBoxBlock.length; i++) {
            let checkBoxOption = this.checkBoxBlock[i].querySelectorAll("[data-checkbox-option]")

            for (let k = 0; k < checkBoxOption.length; k++) {
                checkBoxOption[k].setAttribute("data-checkbox-option", k);
            }

            checkBoxOption[this.selectedId].classList.add(this.selected_class);

            this.checkBoxBlock[i].addEventListener("click", this.selectCheckBox.bind(this));
        }
    }

    selectCheckBox(e) {
        e.preventDefault();

        let checkbox = e.target.closest("[data-checkbox-option]");

        if (!checkbox) return;

        let selectedCheckBox = document.querySelectorAll(`[data-checkbox-option = "${this.selectedId}"]`);

        for (let i = 0; i < selectedCheckBox.length; i++) {
            selectedCheckBox[i].classList.remove(this.selected_class);
        }

        this.selectedId = checkbox.dataset.checkboxOption;

        selectedCheckBox = document.querySelectorAll(`[data-checkbox-option = "${this.selectedId}"]`);

        for (let i = 0; i < selectedCheckBox.length; i++) {
            selectedCheckBox[i].classList.add(this.selected_class);
        }
    }
}

new Checkbox({
    checkbox_block_selector: ".trial-lesson-form-wrapper__checkbox-block",
    selected_class: "trial-lesson-form-wrapper__checkbox-button_selected",
    selectedId: 0,
});

// ===============================================

class FormTabs {
    constructor(options) {
        this.tabButtonBlock = document.querySelectorAll(options.tab_buttons_block_selector);
        this.tabContentBlock = document.querySelectorAll(options.tab_contents_block_selector);

        this.tab_button_active_class = options.tab_button_active_class;
        this.tab_content_active_class = options.tab_content_active_class;

        this.selectedId = options.selectedId ?? 0;

        this.setup();
    }

    returnHeight(el) {
        return getComputedStyle(el).height.match(/\d+/g)[0];
    }

    setup() {
        for (let i = 0; i < this.tabButtonBlock.length; i++) {
            this.tabButtonBlock[i].setAttribute("data-tab-button-block-id", i);
            this.tabContentBlock[i].setAttribute("data-tab-content-block-id", i);

            let tabButton = this.tabButtonBlock[i].querySelectorAll("[data-tab-button]");
            let tabContent = this.tabContentBlock[i].querySelectorAll("[data-tab-content]");

            for (let k = 0; k < tabButton.length; k++) {
                tabButton[k].setAttribute("data-tab-button", k);
                tabContent[k].setAttribute("data-tab-content", k);
            }

            let tabContentHeight = this.returnHeight(tabContent[this.selectedId]);
            this.tabContentBlock[i].style.height = tabContentHeight + "px";

            tabButton[this.selectedId].classList.add(this.tab_button_active_class);
            tabContent[this.selectedId].classList.add(this.tab_content_active_class);

            this.tabButtonBlock[i].addEventListener("click", this.showContent.bind(this));
        }
    }

    showContent(e) {
        e.preventDefault();

        if (!e.target.classList.contains(this.tab_button_active_class)) {
            let currentButtonId = e.target.dataset.tabButton;
            let currentBlocksId = e.target.closest("[data-tab-button-block-id]").dataset.tabButtonBlockId;

            let currentButtonBlock = this.tabButtonBlock[currentBlocksId];
            let currentContentBlock = this.tabContentBlock[currentBlocksId];

            let currentBlockButtons = currentButtonBlock.querySelectorAll("[data-tab-button]");
            let currentBlockContents = currentContentBlock.querySelectorAll("[data-tab-content]");

            for (let i = 0; i < currentBlockButtons.length; i++) {
                currentBlockButtons[i].classList.remove(this.tab_button_active_class);
                currentBlockContents[i].classList.remove(this.tab_content_active_class);
            }

            let addClasses = () => {
                currentBlockButtons[currentButtonId].classList.add(this.tab_button_active_class);
                currentBlockContents[currentButtonId].classList.add(this.tab_content_active_class);

                currentContentBlock.removeEventListener("transitionend", addClasses);
            }

            currentContentBlock.addEventListener("transitionend", addClasses);

            let tabContentHeight = this.returnHeight(currentBlockContents[currentButtonId]);

            currentContentBlock.style.height = tabContentHeight + "px";
        }
    }
}

new FormTabs({
    tab_buttons_block_selector: ".trial-lesson-form-wrapper__tab-buttons-block",
    tab_contents_block_selector: ".trial-lesson-form-wrapper__tab-contents",
    tab_button_active_class: "trial-lesson-form-wrapper__tab-button_selected",
    tab_content_active_class: "trial-lesson-form-wrapper__tab-content_active",
    selectedId: 0,
})

// ===============================================

class CheckTel {
    constructor(selector) {
        this.inputs = document.querySelectorAll(selector);

        this.addCheck();
    }

    addCheck() {
        for (let i = 0; i < this.inputs.length; i++) {
            this.inputs[i].addEventListener("focus", (e) => e.target.value = "+380", { once: true });

            this.inputs[i].addEventListener("input", (e) => {

                if (e.target.value.length < 4) {
                    e.target.value = "+380"
                }

                e.target.value = e.target.value.replace(/(?<=\+380)\D*/g, "");

                let nums = e.target.value.match(/(?<=\+380)\d*/)[0].slice(0, 9);

                e.target.value = "+380" + nums;
            })
        }
    }
}

new CheckTel('[name = "user-tel"]');

// ===============================================

class CheckName {
    constructor(selector) {
        this.inputs = document.querySelectorAll(selector);

        this.addCheck()
    }

    addCheck() {
        for (let i = 0; i < this.inputs.length; i++) {
            this.inputs[i].addEventListener("input", (e) => {
                e.target.value = e.target.value.replace(/[^a-zа-яёіїє'\s]/gi, "");
            })
        }
    }
}

new CheckName('[name = "user-name"]');

// ===============================================

class CheckAge {
    constructor(selector) {
        this.inputs = document.querySelectorAll(selector);

        this.addCheck();
    }

    addCheck() {
        for (let i = 0; i < this.inputs.length; i++) {
            this.inputs[i].addEventListener("input", (e) => {
                e.target.value = e.target.value.replace(/\D/g, "");

                let regExp = /^([1-9]|1[0-9])$/;

                if (!regExp.test(e.target.value)) {
                    console.log(true);
                    e.target.value = e.target.value.replace(/([1-9]|1[0-9])(\d)/g, (match, p1, p2) => p1);
                }
            })
        }
    }
}

new CheckAge('[name = "user-age"]')

// ===============================================
















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
