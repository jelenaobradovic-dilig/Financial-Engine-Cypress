/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { v4: uuidv4 } = require('uuid');

const SignUpPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/SignUpPage")
const LogInPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/LogInPage.js")
const MainMenuPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/MainMenuPage.js");
const UserManagementPage = require('../../../fixtures/PageObject/UserManagementPage.js');
const SubmitEvent = require('../../../fixtures/PageObject/SubmitEventPage.js');
const EventsPage = require('../../../fixtures/PageObject/EventsPage.js');
const AccountsPage = require('../../../fixtures/PageObject/AccountsPage.js');
//const { random } = require('cypress/types/lodash/index.js');

let randomData;

let fixData;

let tableData;

let tableData2;

describe('Submit Event', () => {



  beforeEach(() => {

    cy.clearCookies()

    cy.writeFile('cypress/fixtures/randomData.json', {
      randomAccountNote: uuidv4().slice(0, 6).concat('A_Test'),
      randomEventNote: uuidv4().slice(0, 6).concat("A_Test"),
      randomAmount: (Math.floor(Math.random() * (10000 - 1 + 1)) + 1),
      randomReferenceCode: uuidv4().slice(0, 6).concat("A_Test")
    })


    cy.fixture('randomData').then(function (info) {
      randomData = info
    })

    cy.fixture('tableData2').then(function (info) {
      tableData2 = info
    })
    cy.fixture('fixData').then(function (info) {
      fixData = info
    })

    cy.fixture('tableData').then(function (info) {
      tableData = info
    })

  })

  it('Submit New Event with valid data, Banking Activity Submitted for Event type(without targeting) and NewAccountMethod', () => {

    LogInPage.visitLogInPage()
    LogInPage.findDiligentSplashScreen().should('not.exist')
    LogInPage.logInUserWithUserRole(fixData.emailExistingUserRole, fixData.passwordExistingUserRole)
    LogInPage.getAfterLogInSpinner().should('not.be.visible')

    MainMenuPage.getSubEventsLink().click()
    MainMenuPage.getSpinner().should('not.be.visible')

    EventsPage.writeIntoTableDataNumberOfEvents()

    MainMenuPage.getSubmitEventLink().should('be.visible').click()
    SubmitEvent.selectRandomDomain()
    SubmitEvent.getSelectEventType().select('BankingActivitySubmitted')
    SubmitEvent.getSelectAccountType().should('be.disabled')
    SubmitEvent.typeEventNote(randomData.randomEventNote)
    SubmitEvent.selectAccountMethodByOption('New Account')
    SubmitEvent.getNewAccountSection().should('be.visible')

    SubmitEvent.typeInvalidAmountAtNewAccount()
    SubmitEvent.getInvalidAmountFormatErrorMessage().should('have.text', 'Invalid number format.')
    SubmitEvent.getAmountAtNewAccount().clear()
    SubmitEvent.typeAmountAtNewAccount(randomData.randomAmount)
    SubmitEvent.typeAccountNote(randomData.randomAccountNote)

    SubmitEvent.getSubmitEventButton().click()
    
    MainMenuPage.getSpinner().should('not.be.visible')
    cy.wait(20000)  //Time to create event and related events.

    MainMenuPage.getSubEventsLink().click()
    MainMenuPage.getSpinner().should('not.be.visible')
    EventsPage.compareNumberOfEvents(tableData.numberOfEvents, '2')

  })


  it('Submit New Event with valid data, random Event type(without targeting) and NewAccountMethod', () => {

    LogInPage.visitLogInPage()
    LogInPage.findDiligentSplashScreen().should('not.exist')
    LogInPage.logInUserWithUserRole(fixData.emailExistingUserRole, fixData.passwordExistingUserRole)
    LogInPage.getAfterLogInSpinner().should('not.be.visible')

    MainMenuPage.getSubEventsLink().click()
    cy.wait(1000)

    EventsPage.writeIntoTableDataNumberOfEvents()

    MainMenuPage.getSubmitEventLink().should('be.visible').click()
    SubmitEvent.selectRandomDomain()
    SubmitEvent.selectRandomEventType()
    SubmitEvent.getSelectAccountType().should('be.disabled')
    SubmitEvent.typeEventNote(randomData.randomEventNote)
    SubmitEvent.selectAccountMethodByOption('New Account')
    SubmitEvent.getNewAccountSection().should('be.visible')

    SubmitEvent.typeInvalidAmountAtNewAccount()
    SubmitEvent.getInvalidAmountFormatErrorMessage().should('have.text', 'Invalid number format.')
    SubmitEvent.getAmountAtNewAccount().clear()
    SubmitEvent.typeAmountAtNewAccount(randomData.randomAmount)
    SubmitEvent.typeAccountNote(randomData.randomAccountNote)

    SubmitEvent.getSubmitEventButton().click()
    
    MainMenuPage.getSpinner().should('not.be.visible')
    cy.wait(20000)  //Time to create event and related events.

    MainMenuPage.getSubEventsLink().click()
    MainMenuPage.getSpinner().should('not.be.visible')

    EventsPage.compareNumberOfEventsForRandomEventType(tableData.numberOfEvents)

  })

   it('Submit New Event with valid data, random Event type and ExistingAccountMethod', () => {

    LogInPage.visitLogInPage()
    LogInPage.findDiligentSplashScreen().should('not.exist')
    LogInPage.logInUserWithUserRole(fixData.emailExistingUserRole, fixData.passwordExistingUserRole)
    MainMenuPage.getSpinner().should('not.be.visible')


    MainMenuPage.getSubEventsLink().click()
    MainMenuPage.getSpinner().should('not.be.visible')

    EventsPage.writeIntoTableDataNumberOfEvents()

    AccountsPage.createNewAccount(fixData.accountType1, randomData.randomReferenceCode)

    AccountsPage.getAccountInputAtSearch().type(randomData.randomReferenceCode)
    AccountsPage.getSearchButton().click()
    MainMenuPage.getSpinner().should('not.be.visible')
    AccountsPage.getAccountsTdFromTable().should('length', 1)

    AccountsPage.getAccountsTdFromTable(($el)=>{

        let caption = $el.text()
        cy.log(caption)
        cy.writeFile('cypress/fixtures/tableData2.json', { accountCaption: caption })

    })
    
    MainMenuPage.getSubmitEventLink().should('be.visible').click()
    SubmitEvent.selectRandomDomain()
    SubmitEvent.selectRandomEventType()
    SubmitEvent.getSelectAccountType().should('be.disabled')
    SubmitEvent.typeEventNote(randomData.randomEventNote)
    SubmitEvent.selectAccountMethodByOption('Existing Account')
    SubmitEvent.getNewAccountSection().should('not.exist')
    SubmitEvent.getExistingAccountInput().type(tableData2.accountCaption)
    SubmitEvent.getSubmitEventButton().click()
    cy.wait(20000)

    MainMenuPage.getSubEventsLink().click()
    MainMenuPage.getSpinner().should('not.be.visible')
    
    EventsPage.compareNumberOfEventsForRandomEventType(tableData.numberOfEvents)

  })


})