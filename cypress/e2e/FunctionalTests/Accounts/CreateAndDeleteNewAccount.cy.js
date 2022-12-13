/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require('chai');

const { v4: uuidv4 } = require('uuid');
const LogInPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/LogInPage.js")
const MainMenuPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/MainMenuPage.js")
const UserManagementPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/UserManagementPage.js")
const AccountTypesPage = require("../../../fixtures/PageObject/AccountTypesPage.js")
const AccountsPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/AccountsPage.js")
const SubmitEvent = require('../../../fixtures/PageObject/SubmitEventPage.js');

const EventsPage = require('../../../fixtures/PageObject/EventsPage.js');

let fixData;
let randomData;
let tableData;


describe('Create New Account', () => {



    before(() => {

        cy.clearCookies()


        cy.fixture('fixData').then(function (info) {
            fixData = info

        })

        cy.fixture('tableData').then(function (info) {
            tableData = info

        })
        cy.fixture('randomData').then(function (info) {
            randomData = info

        })
    })


    it('Create Account trough Account page, Create new Account  with valid data and random Account type', () => {

        LogInPage.visitLogInPage()
        LogInPage.logInUserWithUserRole(fixData.emailExistingUserRole, fixData.passwordExistingUserRole)

        MainMenuPage.getSubAccountsLink().click()
        MainMenuPage.getSpinner().should('not.be.visible')

        let randomAccountNote = AccountsPage.generateRandomAccountNote()
        let randomReferenceCode = AccountsPage.generateRandomreferenceCode()
        let randomAmount = (Math.floor(Math.random() * (10000 - 1 + 1)) + 1)

        AccountsPage.getTableInfoTextWithNumberOfAccounts().then(($el) => {

            let numberOfAccountsBeforeCreateAction = $el.text().slice(19, -8)
            cy.log(numberOfAccountsBeforeCreateAction)

            AccountsPage.getAddNewAccountButton().click()
            MainMenuPage.getSpinner().should('not.be.visible')


            AccountsPage.getOptionListAtAccountTypesSelectAtAddNewAccount().then(function ($el) {
                let lenghtOptions = $el.length - 1;

                cy.log("Length is " + lenghtOptions)

                let randomOption = Math.floor(Math.random() * (lenghtOptions - 1 + 1)) + 1

                cy.log('Random option is ' + randomOption)

                AccountsPage.getAccountTypesSelectAtAddNewAccount()
                    .select(randomOption)
                    .then(function () {
                        AccountsPage.getAccountTypesSelectAtAddNewAccount()
                            .find('option:selected')
                            .invoke('text')
                            .then((text) => text.trim()).should('not.equal', 'BankAccount').and('not.equal', 'Operational')
                    })

            })



            AccountsPage.getReferenceCodeAtAddNewAccount().type(randomReferenceCode)
            AccountsPage.getAccountNoteAtAddNewAccount().type(randomAccountNote)
            AccountsPage.getSubmitButtonAtCReateNewAccount().click()

            //MainMenuPage.getSpinner().should('not.be.visible') //ako cekamo da spinner ne bude vidljiv u medjuvremenu i pop up nestane
            AccountsPage.getPopUpMessage().should('be.visible').and('have.text', ' Account created successfully ').click()

            AccountsPage.compareNumberOfAccountsBeforeAndAfterCreateAcount(numberOfAccountsBeforeCreateAction)
            AccountsPage.getAccountInputAtSearch().type(randomReferenceCode)
            AccountsPage.getSearchButton().click()
            MainMenuPage.getSpinner().should('not.be.visible')
            AccountsPage.getAccountsTdFromTable().should('have.length', 1)
            AccountsPage.getRemoveButtons().should('have.length', 1).and('be.enabled').click()
            AccountsPage.getDeleteButtonAtConfirmDialog().should('be.visible').click()
            AccountsPage.getPopUpMessage().should('be.visible').and('have.text', ' Account removed successfully ').click()
            AccountsPage.getPopUpMessage().should('not.exist')
            cy.wait(1000)

            MainMenuPage.getSpinner().should('not.be.visible')
            cy.wait(1000)
            //BUG GDE SE BLOKIRA DIALOG zato je force type za polja ispod dijaloga u sledecem koraku
            MainMenuPage.getSpinner().should('not.be.visible')
            cy.wait(1000)

            AccountsPage.getAccountInputAtSearch().type(randomReferenceCode, { force: true }) //BUG GDE SE BLOKIRA DIALOG
            AccountsPage.getSearchButton().click({ force: true })// BUG GDE SE BLOKIRA DIJALOG
            MainMenuPage.getSpinner().should('not.be.visible')
            AccountsPage.getAccountsTdFromTable().should('not.exist')

        })

    })

    it('Create Account trough Account page, Create new Account  with valid data and specific Account type which require targeting', () => {

    })

    it('Create Account trough Submit Event page', () => {


        // LogInPage.visitLogInPage()
        // LogInPage.findDiligentSplashScreen().should('not.exist')
        // LogInPage.logInUserWithUserRole(fixData.emailExistingUserRole, fixData.passwordExistingUserRole)
        // MainMenuPage.getSpinner().should('not.be.visible')

        // MainMenuPage.getSubAccountsLink().click()

        // MainMenuPage.getSpinner().should("not.be.visible")

        // let randomAccountNote = AccountsPage.generateRandomAccountNote()
        // let randomReferenceCode = AccountsPage.generateRandomreferenceCode()
        // let randomEventNote = AccountsPage.generateRandomEventNote()
        // let randomAmount = (Math.floor(Math.random() * (10000 - 1 + 1)) + 1)

        // AccountsPage.getTableInfoTextWithNumberOfAccounts().then(($el) => {

        //     let numberOfAccountsBeforeSubmitAction = $el.text().slice(19, -8)
        //     cy.log(numberOfAccountsBeforeSubmitAction)

        //     MainMenuPage.getSubmitEventLink().should('be.visible').click()
        //     cy.wait(1000)
        //     SubmitEvent.selectRandomDomain()
        //     SubmitEvent.selectRandomEventType()
        //     SubmitEvent.getSelectAccountType().should('be.disabled')
        //     SubmitEvent.typeEventNote(randomEventNote)
        //     SubmitEvent.selectAccountMethodByOption('New Account')
        //     SubmitEvent.getNewAccountSection().should('be.visible')
        //     SubmitEvent.typeAmountAtNewAccount(randomAmount)
        //     SubmitEvent.typeAccountNote(randomAccountNote)
        //     SubmitEvent.getReferenceCodeInput().type(randomReferenceCode)
        //     SubmitEvent.getSubmitEventButton().click()
        //     MainMenuPage.getSpinner().should('not.be.visible')
        //     SubmitEvent.getPopUpMessage().should('be.visible').and('have.text', ' Event created sucessfully ').click()

        //     cy.wait(20000) // time to create event and related events

        //     MainMenuPage.getSubAccountsLink().click()
        //     MainMenuPage.getSpinner().should('not.be.visible')
        //     AccountsPage.compareNumberOfAccountsBeforeAndAfterCreateAcount(numberOfAccountsBeforeSubmitAction)

        //     AccountsPage.getAccountInputAtSearch().type(randomReferenceCode)
        //     AccountsPage.getSearchButton().click()
        //     MainMenuPage.getSpinner().should('not.be.visible')
        //     AccountsPage.getAccountsTdFromTable().should('have.length', 1)

        //     AccountsPage.getRemoveButtons().should('have.length', 1).and('be.disabled')

        // })

    })

})