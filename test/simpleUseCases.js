const assert = require("assert");
const test = require("selenium-webdriver/testing");
const webdriver = require("selenium-webdriver");

const By = webdriver.By;
let browser;

test.describe("Simple use-cases", function () {
    test.beforeEach(function (done) {
        this.timeout(20000);
        browser = new webdriver.Builder()
            .usingServer()
            .withCapabilities(webdriver.Capabilities.firefox())
            .build();

        browser.get("http://localhost:3000/");
        done();
    });
    test.afterEach(function (done) {
        browser.quit();
        done();
    });

    function navigateToByLink(target) {
        browser.findElement(By.linkText(target))
            .then(function (element) {
                element.click();
            });
    }

    test.it("Index > [Rapporter] > Should show list of reports (weeks).", function (done) {
        navigateToByLink("Rapporter");
        browser.findElement(By.css("h1 + ul"))
            .then(function (element) {
                assert.notEqual(element, undefined);
                done();
            });
    });

    test.it("Index > [Logga in] > Should show form with fields for name/email and password.", function (done) {
        browser.findElement(By.css(".login"))
            .then(function (loginButton) {
                loginButton.click();
                browser.findElement(By.css(".login-expanded > form input[type=text]"))
                    .then(function (nameInput) {
                        assert.notEqual(nameInput, undefined);
                        browser.findElement(By.css(".login-expanded > form input[type=password]"))
                            .then(function (passwordInput) {
                                assert.notEqual(passwordInput, undefined);
                                done();
                            });
                    });
            });
    });

    test.it("Index (Not logged in) > [Administrera] > Should show error message about not being logged in", function (done) {
        navigateToByLink("Administrera");
        browser.findElement(By.css("h1 + p"))
            .then(function (errorMessage) {
                errorMessage.getText()
                    .then(function (text) {
                        assert.equal(text, "Du måste vara inloggad för att komma åt denna sidan!");
                        done();
                    });
            });
    });
});
