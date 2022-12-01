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


        cy.writeFile('cypress/fixtures/randomData.json', {
            randomAccountNote: uuidv4().slice(0, 8).concat('A_Test'),
            randomReferenceCode: uuidv4().slice(0, 8).concat("A_Test"),
            randomEventNote: uuidv4().slice(0, 8).concat("A_Test"),
            randomAmount: (Math.floor(Math.random() * (10000 - 1 + 1)) + 1)
        })


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

        AccountsPage.getTableInfoTextWithNumberOfAccounts().then(($el) => {

            let numberOfAccountsBeforeCreateAction = $el.text().slice(19, -8)
            cy.log(numberOfAccountsBeforeCreateAction)

            AccountsPage.getAddNewAccountButton().click({ force: true })
            MainMenuPage.getSpinner().should('not.be.visible')
            AccountsPage.selectRandomAccountTypeAtAddNewAccount()
            AccountsPage.getReferenceCodeAtAddNewAccount().type(randomData.randomReferenceCode)
            AccountsPage.getSubmitButtonAtCReateNewAccount().click()
            MainMenuPage.getSpinner().should('not.be.visible')
            AccountsPage.getPopUpMessage()

            //******************Kada se prati test kroz konzolu u startu izvuce text za uporedjivanje i onda se naknadno izgubi i ostane " "
            //AccountsPage.getPopUpMessage().should(($popUp) => {
            // expect($popUp.text()).to.contain.text('Account created succesfully')

            //})
            //******************

            MainMenuPage.getSpinner().should('not.be.visible')
            AccountsPage.compareNumberOfAccountsBeforeAndAfterCreateAcount(numberOfAccountsBeforeCreateAction)
            AccountsPage.getAccountInputAtSearch().type(randomData.randomReferenceCode)
            AccountsPage.getSearchButton().click()
            MainMenuPage.getSpinner().should('not.be.visible')
            AccountsPage.getAccountsTdFromTable().should('have.length', 1)
            AccountsPage.getRemoveButtonForOneAccountAfterSEarch().click({ force: true })
            AccountsPage.getDeleteButtonAtConfirmDialog().should('be.visible').click()
            cy.wait(1000)

            MainMenuPage.getSpinner().should('not.be.visible')
            cy.wait(1000)

            MainMenuPage.getSpinner().should('not.be.visible')
            cy.wait(1000)

            //BUG GDE SE BLOKIRA DIALOG zato je force type za polja ispod dijaloga u sledecem koraku

            MainMenuPage.getSpinner().should('not.be.visible')
            cy.wait(1000)

            AccountsPage.getAccountInputAtSearch().type(randomData.randomReferenceCode, { force: true }) //BUG GDE SE BLOKIRA DIALOG
            AccountsPage.getSearchButton().click({ force: true })// BUG GDE SE BLOKIRA DIJALOG
            MainMenuPage.getSpinner().should('not.be.visible')
            AccountsPage.getAccountsTdFromTable().should('not.exist')

        })

    })

    it('Create Account trough Account page, Create new Account  with valid data and specific Account type which require targeting', () => {

    })

    it('Create Account trough Submit Event page', () => {


        LogInPage.visitLogInPage()
        LogInPage.findDiligentSplashScreen().should('not.exist')
        LogInPage.logInUserWithUserRole(fixData.emailExistingUserRole, fixData.passwordExistingUserRole)
        MainMenuPage.getSpinner().should('not.be.visible')

        MainMenuPage.getSubAccountsLink().click()

        MainMenuPage.getSpinner().should("not.be.visible")

        AccountsPage.getTableInfoTextWithNumberOfAccounts().then(($el) => {

            let numberOfAccountsBeforeSubmitAction = $el.text().slice(19, -8)
            cy.log(numberOfAccountsBeforeSubmitAction)

            MainMenuPage.getSubmitEventLink().should('be.visible').click()
            cy.wait(1000)
            SubmitEvent.selectRandomDomain()
            SubmitEvent.selectRandomEventType()
            SubmitEvent.getSelectAccountType().should('be.disabled')
            SubmitEvent.typeEventNote(randomData.randomEventNote)
            SubmitEvent.selectAccountMethodByOption('New Account')
            SubmitEvent.getNewAccountSection().should('be.visible')
            SubmitEvent.typeAmountAtNewAccount(randomData.randomAmount)
            SubmitEvent.typeAccountNote(randomData.randomAccountNote)
            SubmitEvent.getReferenceCodeInput().type(randomData.randomReferenceCode)
            SubmitEvent.getSubmitEventButton().click()
            cy.wait(20000) // time to create event and related events

            MainMenuPage.getSubAccountsLink().click()
            MainMenuPage.getSpinner().should('not.be.visible')
            AccountsPage.compareNumberOfAccountsBeforeAndAfterCreateAcount(numberOfAccountsBeforeSubmitAction)

            AccountsPage.getAccountInputAtSearch().type(randomData.randomReferenceCode)
            AccountsPage.getSearchButton().click()
            MainMenuPage.getSpinner().should('not.be.visible')
            AccountsPage.getAccountsTdFromTable().should('have.length', 1)

            //AccountsPage.getRemoveButtonForOneAccountAfterSEarch().should('be.disabled') //BUG GDE NE POSTOJE TRENUTNO DUGMAD NA TOJ STRANICI

        })

    })

})