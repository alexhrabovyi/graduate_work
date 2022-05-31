class CheckTel {
    constructor(selector) {
        this.inputs = document.querySelectorAll(selector);

        this.addCheck();
    }

    addCheck() {
        for (let i = 0; i < this.inputs.length; i++) {
            this.inputs[i].addEventListener("focus", (e) => {
                if (e.target.value.length < 4) {
                    e.target.value = "+380"
                }
            }, { once: true });

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
                    e.target.value = e.target.value.replace(/([1-9]|1[0-9])(\d)/g, (match, p1, p2) => p1);
                }
            })
        }
    }
}

class CheckEmail {
    constructor(selector, errorClass) {
        this.inputs = document.querySelectorAll(selector);
        this.errorClass = errorClass;

        this.addCheck();
    }

    addCheck() {
        for (let i = 0; i < this.inputs.length; i++) {
            this.inputs[i].addEventListener("focusout", (e) => {
                let regExp = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;

                if (!regExp.test(e.target.value) && e.target.value.length != 0) {
                    for (let k = 0; k < this.inputs.length; k++) {
                        this.inputs[k].classList.add(this.errorClass);
                    }
                } else {
                    for (let k = 0; k < this.inputs.length; k++) {
                        this.inputs[k].classList.remove(this.errorClass);
                    }
                }
            })
        }
    }
}

class checkPaymentAmount {
    constructor(selector) {
        this.inputs = document.querySelectorAll(selector);

        this.addCheck();
    }

    addCheck() {
        for (let i = 0; i < this.inputs.length; i++) {
            this.inputs[i].addEventListener("input", (e) => {
                e.target.value = e.target.value.replace(/\D/g, "");

                e.target.value = e.target.value.replace(/(?<=\d{4})(\d)/g, (match, p) => p = "")
            })
        }
    }
}

new CheckTel('[name = "user-tel"]');
new CheckName('[name = "user-name"]');
new CheckAge('[name = "user-age"]');
new CheckEmail('[name = "user-email"]', "input_incorrect");
new checkPaymentAmount('[name = "user-payment-amount"]');