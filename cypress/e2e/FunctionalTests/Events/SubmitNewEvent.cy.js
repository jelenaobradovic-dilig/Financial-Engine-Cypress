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
const TargetAccount = require('../../../fixtures/PageObject/TargetAccountPage.js');
//const { random } = require('cypress/types/lodash/index.js');

let randomData;

let fixData;

let tableData;

let tableData2;

describe('Submit Event', () => {



  before(() => {

    cy.clearCookies()


    cy.fixture('fixData').then(function (info) {
      fixData = info
    })

    cy.fixture('tableData').then(function (info) {
      tableData = info
    })

  })

  it('Submit Event with Banking Activity Submitted Event type, and NewAccountMethod, finish targeting trough Target Account Page', () => {

    LogInPage.visitLogInPage()
    LogInPage.findDiligentSplashScreen().should('not.exist')
    LogInPage.logInUserWithUserRole(fixData.emailExistingUserRole, fixData.passwordExistingUserRole)
    MainMenuPage.getSpinner().should('not.be.visible')

    let randomAccountNote = AccountsPage.generateRandomAccountNote()
    let randomReferenceCode = AccountsPage.generateRandomreferenceCode()
    let randomAccountNote2 = AccountsPage.generateRandomAccountNote()
    let randomReferenceCode2 = AccountsPage.generateRandomreferenceCode()
    let randomEventNote = AccountsPage.generateRandomEventNote()
    let randomAmount = (Math.floor(Math.random() * (10000 - 1 + 1)) + 1)

    MainMenuPage.getSubEventsLink().click()
    MainMenuPage.getSpinner().should('not.be.visible')

    EventsPage.getTableInfoTextWithNumberOfEvents().then(function ($el) {
      let numberOfEventsBeforeSubmitAction = $el.text().slice(19, -8)
      cy.log(numberOfEventsBeforeSubmitAction)

      MainMenuPage.getSubmitEventLink().should('be.visible').click()
      MainMenuPage.getSpinner().should('not.be.visible')
      SubmitEvent.getSelectDomain().should('be.visible')
      SubmitEvent.selectRandomDomain()

      SubmitEvent.getSelectEventType().select('BankingActivitySubmitted')
        .then(function () {
          SubmitEvent.getSelectEventType().find('option:selected').invoke('text')
            .then((text) => text.trim()).should("equal", 'BankingActivitySubmitted')


          SubmitEvent.getSelectAccountType().should('be.disabled')
          SubmitEvent.typeEventNote(randomEventNote)
          SubmitEvent.selectAccountMethodByOption('New Account')
          SubmitEvent.getNewAccountSection().should('be.visible')
          SubmitEvent.getReferenceCodeInput().type(randomReferenceCode)
          SubmitEvent.typeInvalidAmountAtNewAccount()
          SubmitEvent.getInvalidAmountFormatErrorMessage().should('have.text', 'Please enter valid Amount')

          SubmitEvent.getAmountAtNewAccount().clear()
          SubmitEvent.typeAmountAtNewAccount(randomAmount)
          SubmitEvent.typeAccountNote(randomAccountNote)

          SubmitEvent.getSubmitEventButton().click()
          MainMenuPage.getSpinner().should('not.be.visible')

          SubmitEvent.getPopUpMessage().should('be.visible').and('have.text', ' Event created sucessfully ').click()

          cy.wait(20000)  //Time to create event and related events.

          MainMenuPage.getSubEventsLink().click()
          MainMenuPage.getSpinner().should('not.be.visible')

          EventsPage.compareNumberOfEvents(numberOfEventsBeforeSubmitAction, '2')
          EventsPage.getAccountInputAtSearch().type(randomReferenceCode)
          EventsPage.getSearchButton().click()
          EventsPage.getEventStateTypeTdsFromTable().should('have.length', 2)
          EventsPage.getEventTypeTdsFromTable().each(($el, index, $list) => {
            let eventState = $el.text().trim() 
            cy.log(eventState)
            if (eventState=== 'BankingActivityRealized') {
              cy.wrap($el).next().should('have.text', 'On Hold')
            }
            if (eventState === 'BankingActivitySubmitted') {
               cy.wrap($el).next().should('have.text', 'Processed')}
            
          })

          AccountsPage.createNewAccount('Equipment', randomReferenceCode2)

          MainMenuPage.getTargetAccountLink().should('be.visible').click()
          MainMenuPage.getSpinner().should('not.be.visible')
          TargetAccount.getAccountInputAtSearch().type(randomReferenceCode)
          TargetAccount.getSearchButton().click()
          MainMenuPage.getSpinner().should('not.be.visible')
          TargetAccount.getTargetButtons().should('have.length',1)
          TargetAccount.getTargetButtons().click()
          MainMenuPage.getSpinner().should('not.be.visible')
          TargetAccount.getTargetAccountInput().should(be.visible).click()
          TargetAccount.getTargetAccountInput().type(randomReferenceCode2)




        })

    })

  })


  it('Submit New Event with valid data, random Event type(without targeting) and NewAccountMethod', () => {

    // LogInPage.visitLogInPage()
    // LogInPage.findDiligentSplashScreen().should('not.exist')
    // LogInPage.logInUserWithUserRole(fixData.emailExistingUserRole, fixData.passwordExistingUserRole)
    // MainMenuPage.getSpinner().should('not.be.visible')

    // MainMenuPage.getSubEventsLink().click()
    // MainMenuPage.getSpinner().should('not.be.visible')
    // cy.wait(1000)
    // let randomAccountNote = AccountsPage.generateRandomAccountNote()
    // let randomReferenceCode = AccountsPage.generateRandomreferenceCode()
    // let randomEventNote = AccountsPage.generateRandomEventNote()
    // let randomAmount = (Math.floor(Math.random() * (10000 - 1 + 1)) + 1)

    // EventsPage.getTableInfoTextWithNumberOfEvents().then(function ($el) {
    //   let numberOfEventsBeforeSubmitAction = $el.text().slice(19, -8)
    //   cy.log(numberOfEventsBeforeSubmitAction)

    //   MainMenuPage.getSubmitEventLink().should('be.visible').click()
    //   MainMenuPage.getSpinner().should('not.be.visible')

    //   SubmitEvent.selectRandomDomain()
    //   SubmitEvent.selectRandomEventType()
    //   SubmitEvent.getSelectAccountType().should('be.disabled')
    //   SubmitEvent.typeEventNote(randomEventNote)
    //   SubmitEvent.selectAccountMethodByOption('New Account')
    //   SubmitEvent.getNewAccountSection().should('be.visible')
    //   SubmitEvent.getReferenceCodeInput().type(randomReferenceCode)

    //   SubmitEvent.typeInvalidAmountAtNewAccount()
    //   SubmitEvent.getInvalidAmountFormatErrorMessage().should('have.text', 'Please enter valid Amount')
    //   SubmitEvent.getAmountAtNewAccount().clear()
    //   SubmitEvent.typeAmountAtNewAccount(randomAmount)
    //   SubmitEvent.typeAccountNote(randomAccountNote)

    //   SubmitEvent.getSubmitEventButton().click()
    //   MainMenuPage.getSpinner().should('not.be.visible')

    //   SubmitEvent.getPopUpMessage().should('be.visible').and('have.text', ' Event created sucessfully ').click()
    //   cy.wait(20000)  //Time to create event and related events.

    //   MainMenuPage.getSubEventsLink().click()
    //   MainMenuPage.getSpinner().should('not.be.visible')

    //   EventsPage.compareNumberOfEventsForRandomEventType(numberOfEventsBeforeSubmitAction)


    // })

  })

  it('Submit New Event with valid data, random Event type and ExistingAccountMethod', () => {

    // LogInPage.visitLogInPage()
    // LogInPage.findDiligentSplashScreen().should('not.exist')
    // LogInPage.logInUserWithUserRole(fixData.emailExistingUserRole, fixData.passwordExistingUserRole)
    // MainMenuPage.getSpinner().should('not.be.visible')


    // MainMenuPage.getSubEventsLink().click()
    // MainMenuPage.getSpinner().should('not.be.visible')

    // let randomAccountNote = AccountsPage.generateRandomAccountNote()
    // let randomReferenceCode = AccountsPage.generateRandomreferenceCode()
    // let randomEventNote = AccountsPage.generateRandomEventNote()
    // let randomAmount = (Math.floor(Math.random() * (10000 - 1 + 1)) + 1)

    // EventsPage.getTableInfoTextWithNumberOfEvents().then(function ($el) {

    //   let numberOfEventsBeforeSubmitAction = $el.text().slice(19, -8)
    //   cy.log(numberOfEventsBeforeSubmitAction)

    //   AccountsPage.createNewAccount(fixData.accountType1, randomReferenceCode)

    //   AccountsPage.getAccountInputAtSearch().type(randomReferenceCode)
    //   AccountsPage.getSearchButton().click()
    //   MainMenuPage.getSpinner().should('not.be.visible')

    //   AccountsPage.getAccountsTdFromTable().should('length', 1).and((function ($el) {

    //     let caption = $el.text()
    //     cy.log(caption)

    //     MainMenuPage.getSubmitEventLink().should('be.visible').click()
    //     MainMenuPage.getSpinner().should('not.be.visible')
    //     SubmitEvent.selectRandomDomain()
    //     SubmitEvent.selectRandomEventType()
    //     SubmitEvent.getSelectAccountType().should('be.disabled')
    //     SubmitEvent.typeEventNote(randomEventNote)
    //     SubmitEvent.selectAccountMethodByOption('Existing Account')
    //     SubmitEvent.getNewAccountSection().should('not.exist')
    //     SubmitEvent.getExistingAccountInput().type(caption)
    //     SubmitEvent.getSubmitEventButton().click()
    //     MainMenuPage.getSpinner().should('not.be.visible')
    //     cy.wait(20000)

    //     MainMenuPage.getSubEventsLink().should('be.visible').click()
    //     MainMenuPage.getSpinner().should('not.be.visible')

    //     EventsPage.compareNumberOfEventsForRandomEventType(numberOfEventsBeforeSubmitAction)
    //   })

    //   )
    // })
  })

})