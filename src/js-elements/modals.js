class Modal {
    constructor(options) {
        this.modal = document.querySelector(options.modal_selector);
        this.buttons = document.querySelectorAll(options.toggle_button_selector);
        this.child = this.modal.firstElementChild;

        this.hide_class = options.hide_class;
        this.modal_class = options.modal_class;
        this.animation_class = options.animation_class;

        this.contentOverflow = false;

        this.setup();
    }

    setup() {
        this.modal.classList.add(this.modal_class, this.hide_class);
        this.child.classList.add(this.animation_class);

        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].addEventListener("click", this.toggle.bind(this));
        }

        this.modal.addEventListener("click", this.backdropClose.bind(this));

        window.addEventListener("orientationchange", this.orientationChange.bind(this));
    }

    get isClose() {
        return this.modal.classList.contains(this.hide_class);
    }

    get scrollWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }

    checkContentOverflow() {
        let clientHeight = document.documentElement.clientHeight;
        let childHeight = (getComputedStyle(this.child).height).match(/\d+/g)[0];

        childHeight > clientHeight ? this.contentOverflow = true : this.contentOverflow = false;
    }

    backdropClose(e) {
        e.preventDefault();

        if (e.target === this.modal) {
            this.hide();
        }
    }

    orientationChange() {
        if (!this.isClose) {
            this.hide();
        }
    }

    toggle(e) {
        e.preventDefault();
        this.isClose ? this.show() : this.hide();
    }

    show() {
        this.modal.classList.remove(this.hide_class);
        this.child.classList.remove(this.animation_class);

        this.checkContentOverflow();

        if (this.contentOverflow) {
            this.modal.style.overflow = "scroll";
            this.modal.style.alignItems = "start";
            this.modal.style.paddingTop = "5%";
            this.modal.style.paddingBottom = "5%";
        }

        let scrollWidth = this.scrollWidth;

        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = scrollWidth + "px";
    }

    hide() {
        this.modal.classList.add(this.hide_class);
        this.child.classList.add(this.animation_class);

        if (this.contentOverflow) {
            this.modal.style.overflow = "";
            this.modal.style.alignItems = "";
            this.modal.style.paddingTop = "";
            this.modal.style.paddingBottom = "";

            this.contentOverflow = false
        }

        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
    }
}

new Modal({
    modal_selector: ".trial-lesson-form-modal-window",
    toggle_button_selector: '[data-toggle-modal="trial-form"]',
    hide_class: "hidden",
    modal_class: "modal-window",
    animation_class: "animation-translateY",
});

new Modal({
    modal_selector: ".payment-form-modal-window",
    toggle_button_selector: '[data-toggle-modal="payment-form"]',
    hide_class: "hidden",
    modal_class: "modal-window",
    animation_class: "animation-translateY",
});

new Modal({
    modal_selector: ".request-call-form-modal-window",
    toggle_button_selector: '[data-toggle-modal="request-call-form"]',
    hide_class: "hidden",
    modal_class: "modal-window",
    animation_class: "animation-translateY",
});