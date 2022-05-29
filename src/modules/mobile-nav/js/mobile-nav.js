{
    class Mobile_Nav {
        constructor(options) {
            this.mobile_nav_burger = document.querySelector(options.mobile_nav_burger_selector);
            this.mobile_nav_content = document.querySelector(options.mobile_nav_content_selector);
            this.mobile_nav_panel = document.querySelector(options.mobile_nav_panel_selector);

            this.burger_opened_class = options.burger_opened_class;
            this.mobile_nav_content_visible_class = options.mobile_nav_content_visible_class;

            this.contentOverflow = false;

            this.mobile_nav_burger.addEventListener("click", this.onClickToggle.bind(this), { passive: true });

            window.addEventListener("orientationchange", this.orientationChange.bind(this), { passive: true });
        }

        get isOpen() {
            return this.mobile_nav_burger.classList.contains(this.burger_opened_class);
        }

        checkContentOverflow() {
            let clientHeight = document.documentElement.clientHeight;
            let mobile_nav_content_height = (getComputedStyle(this.mobile_nav_content).height).match(/\d+/g)[0];

            mobile_nav_content_height > clientHeight ? this.contentOverflow = true : this.contentOverflow = false;

            return clientHeight;
        }

        onClickToggle() {
            this.isOpen ? this.close() : this.open();
        }

        open() {
            this.mobile_nav_burger.classList.add(this.burger_opened_class);
            this.mobile_nav_content.classList.add(this.mobile_nav_content_visible_class);

            let clientHeight = this.checkContentOverflow()

            if (this.contentOverflow) {
                document.body.style.overflow = "hidden";

                let mobile_nav_panel_height = (getComputedStyle(this.mobile_nav_panel).height).match(/\d+/g)[0]

                this.mobile_nav_content.style.height = (clientHeight - mobile_nav_panel_height) + "px";
                this.mobile_nav_content.style.overflow = "scroll";
            }
        }

        close() {
            this.mobile_nav_burger.classList.remove(this.burger_opened_class);
            this.mobile_nav_content.classList.remove(this.mobile_nav_content_visible_class)

            if (this.contentOverflow) {
                document.body.style.overflow = "";

                this.mobile_nav_content.style.height = "";
                this.mobile_nav_content.style.overflow = "";

                this.contentOverflow = false;
            }
        }

        orientationChange() {
            if (this.isOpen) {
                this.close();
            }
        }

    }

    new Mobile_Nav({
        mobile_nav_burger_selector: ".mobile-nav__burger",
        mobile_nav_content_selector: ".mobile-nav__content",
        mobile_nav_panel_selector: ".mobile-nav__panel",
        burger_opened_class: "burger_opened",
        mobile_nav_content_visible_class: "mobile-nav__content_visible",
    });
}