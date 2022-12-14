const { v4: uuidv4 } = require('uuid');

class SubmitEvent {


    static getSelectDomain() {
        return cy.xpath("//select[@name='domainId']")
    }

    static selectDomainByDomainCaption(domainCaption) {
        SubmitEvent.getSelectDomain().select(domainCaption)
    }

    static selectRandomDomain() {

        cy.xpath("//select[@name='domainId']/option").then(($el) => {

            let lenghtOptions = $el.length - 1;

            cy.log(lenghtOptions)

            //Math.floor(Math.random() * (max - min + 1) ) + min
            //min je 1 jer je nulti u nizu --Select-- pa onda krece niz

            SubmitEvent.getSelectDomain().select(Math.floor(Math.random() * (lenghtOptions - 1 + 1)) + 1)

        })
    }


    static getSelectEventType() {
        return cy.xpath("//select[@name='eventTypeId']")
    }

    static selectRandomEventType() {

        cy.xpath("//select[@name='eventTypeId']/option").then(($el) => {

            let lenghtOptions = $el.length - 1;

            cy.log(lenghtOptions)

            //Math.floor(Math.random() * (max - min + 1) ) + min
            //min je 1 jer je nulti u nizu --Select-- pa onda krece niz

            SubmitEvent.getSelectEventType().select(Math.floor(Math.random() * (lenghtOptions - 1 + 1)) + 1)

        })
    }


    static getSelectAccountType() {
        return cy.xpath("//cmp-create-account[1]/div[1]//select[@formcontrolname='AccountTypeId']")
    }

    static getSelectTargetAccountTYpe() {
        return cy.xpath("//cmp-target-account[1]/table[1]/tfoot[1]/tr[1]/td[1]/select[1]")
    }

    static getEventNote() {
        return cy.xpath("//*[@class='col-12 col-md-4']/div/textarea")
    }

    static typeEventNote(eventNote) {
        SubmitEvent.getEventNote().type(eventNote)
    }

    static getAccountMethodSelect() {
        return cy.xpath("//select[@name='AccountMethod']")
    }

    static selectAccountMethodByOption(option) {
        SubmitEvent.getAccountMethodSelect().select(option)

    }

    static getReferenceCodeInput() { return cy.xpath("//input[@formcontrolname='ReferenceCode']") }

    static getNewAccountSection() {
        return cy.xpath("//form[@class='ng-untouched ng-pristine ng-invalid']/div/div/h3").contains('New Account')
    }

    static typeInvalidAmountAtNewAccount() {
        //Math.floor(Math.random() * (max - min + 1) ) + min
        SubmitEvent.getAmountAtNewAccount().type((Math.floor(Math.random() * (1000000 - 1 + 1)) + 1) + Math.random())

    }

    static getInvalidAmountFormatErrorMessage() {
        return cy.xpath("//div[@class='col-12']/div/div")

    }

    static typeAmountAtNewAccount(amount) {
        SubmitEvent.getAmountAtNewAccount().type(amount)
    }

    static getAmountAtNewAccount() {
        return cy.xpath("//div[@class='col-12']/div/input[@formcontrolname='Amount']")
    }

    static getAmountAtAccountTargetsByRow(row) {
        cy.xpath("//cmp-target-account[@class='col-12']/table//td[3]").eq(row)
    }

    static TypeAmountAtAccountTargets(amount) {
        SubmitEvent.getAmountAtAccountTargets().type(amount)
    }

    static getAccountNote() {
        return cy.xpath("//div[@class='col-12']/div/textarea[@formcontrolname='Note']")
    }

    static typeAccountNote(accountNote) {
        SubmitEvent.getAccountNote().type(accountNote)
    }

    static getSubmitEventButton() {
        return cy.xpath("//*[@class='col-12 text-right']/button[2]").contains('Submit')
    }

    static getTargetAccountInput(row) {
        return cy.xpath("//cmp-target-account[@class='col-12']/table//td[2]").eq(row)
    }

    static typeTargetAccount(account, row) {
        cy.xpath("//cmp-target-account[@class='col-12']/table//td[2]").eq(row).type(account)
    }

    static clickAddButtonAtAccountTargets(row) {
        cy.xpath("//cmp-target-account[@class='col-12']/table//td[5]/div/button").click()
    }

    static getExistingAccountInput() {
        return cy.xpath("//input[@formcontrolname='Caption']")
    }

    static getPopUpMessage() {
        return cy.xpath("//*[@class='overlay-container']/div/div/div")
    }

    static getErrorMessageForEventType() {
        return cy.xpath("//div[@class='col-12 col-md-2 ng-star-inserted'][1]/div/div")
    }

    static getErrorMessageForDomain() {
        return cy.xpath("//div[@class='col-12 col-md-2']/div/div[@class='error-message ng-star-inserted']")

    }

    static getErrorMessageForEventNote() {
        return cy.xpath("//div[@class='col-12 col-md-4']/div/div")
    }

    static getErrorMessageForAmount() {
        return cy.xpath("//*[@class='display-block ng-star-inserted']/div[1]/div[1]/form//div[@class='error-message ng-star-inserted']")
    }

    static getTargetAccountInput() {
        return cy.xpath("//cmp-target-account//tfoot//td[2]/input")
    }

    static getAmountAtTargetSection()
    {
      return cy.xpath("//cmp-target-account//tfoot//td[3]/input")
    }

    static getAddTargetAccountButton()
    {
        return cy.xpath("//cmp-target-account//tfoot//td//button")
    }

    static getImportFromCsvButton()
    {
        //return cy.contains(' Import from CSV ')
    return cy.xpath("//input[@type='file']")
    }

}

module.exports = SubmitEvent
