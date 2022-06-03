class InputSynch {
    constructor(selector) {
        this.inputs = document.querySelectorAll(selector);

        this.setup();
    }

    setup() {
        for (let i = 0; i < this.inputs.length; i++) {
            this.inputs[i].addEventListener("input", (e) => {
                let value = e.target.value;

                for (let k = 0; k < this.inputs.length; k++) {
                    this.inputs[k].value = value;
                }
            })
        }

    }
}

new InputSynch("[data-trial-form-name-adult]");
new InputSynch("[data-trial-from-tel-adult]");
new InputSynch("[data-trial-form-parent-name]");
new InputSynch("[data-trial-form-parent-tel]");
new InputSynch("[data-trial-form-child-name]");
new InputSynch("[data-trial-form-child-age]");
new InputSynch("[data-trial-form-email]");