const MainMenuPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/MainMenuPage.js")
const LogInPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/LogInPage.js")
const { v4: uuidv4 } = require('uuid');

class AccountsPage {


    static generateRandomAccountNote() {
        let randomAccountNote = uuidv4().slice(0, 8).concat('A_Test')

        cy.log(randomAccountNote)
        return randomAccountNote
    }

    static generateRandomreferenceCode() {
        let randomReferenceCode = uuidv4().slice(0, 8).concat('A_Test')
        cy.log(randomReferenceCode)
        return randomReferenceCode
    }


    static generateRandomEventNote() {
        let randomEventNote = uuidv4().slice(0, 8).concat('A_Test')
        cy.log(randomEventNote)
        return randomEventNote
    }


    static getAccountInputAtSearch() {
        return cy.xpath("//div[@class='card-body']/div[1]/div[1]/div[2]/div[2]/input[1]")

    }

    static getAcountTypesSelectAtSearch() {
        return cy.xpath("//div[@class='card-body']/div[1]/div[1]/div[1]//select")
    }

    static getAccountTypesSelectAtAddNewAccount() {
        return cy.xpath("//div[@class='container']//select[@name='accountTypeId']")
    }

    static getSearchButton() {
        return cy.xpath("//div[@class='mt-3']//button[contains(text(),'Search')]")
    }

    static getAccountsTdFromTable() {
        return cy.xpath("//accounts[1]/div[2]/table[1]/tbody[1]/tr/td[4]")
    }

    static selectRandomAccountTypeAtAddNewAccount() {

        cy.xpath("//div[@class='container']//select[@name='accountTypeId']/option").then(($el) => {

            cy.wait(2000)

            let lenghtOptions = $el.length - 1;

            cy.log(lenghtOptions)

            //Math.floor(Math.random() * (max - min + 1) ) + min
            //min je 1 jer je nulti u nizu --Select-- pa onda krece niz koji nama treba

            AccountsPage.getAccountTypesSelectAtAddNewAccount({ timeout: 2000 }).select(Math.floor(Math.random() * (lenghtOptions - 1 + 1)) + 1)

        })
    }

    static selectAccountTypeByNameAtAddNewAccount(accountType) {
        AccountsPage.getAccountTypesSelectAtAddNewAccount().select(accountType)
    }


    static getAddNewAccountButton() {
        return cy.xpath("//button[@title='Add']")
    }
    //******************************************************************
    static getRemoveButtonForOneAccountAfterSEarch() {
        return cy.xpath("//button[@title='This Account cannot be removed.']")
    }

    static getRemoveButtons() {
        return cy.xpath("//tbody//td/div[@class='text-center']/button[3]")
    }

    static getDeleteButtonAtConfirmDialog() {
        return cy.xpath("//cmp-confirm-dialog//button[contains(text(),'Delete')]")
    }

    static getReferenceCodeAtAddNewAccount() {
        return cy.xpath("//input[@formcontrolname='ReferenceCode']")

    }
    static getAccountNoteAtAddNewAccount() {
        return cy.xpath("//cmp-account-dialog[1]//textarea[1][@formcontrolname='Note']")
    }
    static getPropertyKeySelectFromAddNewAccount() {

        return cy.xpath("//div[@class='container']/div[1]/div[2]//select")
    }

    static getPropertyValueInput() {
        return cy.xpath("//accounts[1]/cmp-account-dialog[1]/div[1]/div[1]/div[2]/form[1]/div[1]/div[1]/div[2]/div[1]//input[1]")
    }

    static getTargetAccountFieldsFromAddNewAccount() {
        return cy.xpath("//div[@class='row mt-2 ng-star-inserted']")
    }

    static writeNumberOfAccountsIntoTableDataJson() {

        cy.xpath("/html[1]/body[1]/app-root[1]/div[1]/div[1]/div[1]/div[1]/accounts[1]/div[2]/div[2]").then(($el) => {
            let text = $el.text().slice(19, -8)
            cy.log(text)
            cy.writeFile('cypress/fixtures/tableData.json', { numberOfAccounts: text })

        })

    }

    static getTableInfoTextWithNumberOfAccounts() {

        return cy.xpath("/html[1]/body[1]/app-root[1]/div[1]/div[1]/div[1]/div[1]/accounts[1]/div[2]/div[2]")

    }

    static compareNumberOfAccountsBeforeAndAfterCreateAcount(numberBefore) {

        cy.xpath("/html[1]/body[1]/app-root[1]/div[1]/div[1]/div[1]/div[1]/accounts[1]/div[2]/div[2]").should($newNumber => {
            expect(Number($newNumber.text().slice(19, -8))).to.eq(Number(numberBefore) + 1)
        })

    }

    static getPopUpMessage() { return cy.get('.ng-trigger > .ng-tns-c31-3') }
    //cy.xpath("//div[@role='alert']")}

    static getSubmitButtonAtCReateNewAccount() {
        return cy.xpath("//div[@class='container']//button[@type='submit']")

    }

    static scrollToBottom() {
        cy.xpath("//accounts[@class='ng-star-inserted']").scrollTo('bottom', { ensureScrollable: false })
    }


    static createNewAccount(accountType, randomReferenceCode) {
        MainMenuPage.getSubAccountsLink().click()
        MainMenuPage.getSpinner().should('not.be.visible')
        AccountsPage.getAddNewAccountButton().click({ force: true })
        MainMenuPage.getSpinner().should('not.be.visible')
        AccountsPage.selectAccountTypeByNameAtAddNewAccount(accountType)
        AccountsPage.getReferenceCodeAtAddNewAccount().type(randomReferenceCode)// da bi mogli preko refernce koda da nadjemo Account
        AccountsPage.getSubmitButtonAtCReateNewAccount().click()
        MainMenuPage.getSpinner().should('not.be.visible')
    }

    static getAccountCaptionTd() { return cy.xpath("//accounts[1]/div[2]/table[1]/tbody[1]/tr/td[4]") }

}

module.exports = AccountsPage