/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { v4: uuidv4 } = require('uuid');

const SignUpPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/SignUpPage")
const LogInPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/LogInPage.js")
const MainMenuPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/MainMenuPage.js");
const UserManagementPage = require('../../../fixtures/PageObject/UserManagementPage.js');
const { typeNewUserRegistrationData } = require('../../../fixtures/PageObject/UserManagementPage.js');
const AccountsPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/AccountsPage.js");
const AccountTypes = require('../../../fixtures/PageObject/AccountTypesPage.js');
const SubmitEvent = require('../../../fixtures/PageObject/SubmitEventPage.js');
const EventsPage = require('../../../fixtures/PageObject/EventsPage.js');
const recurse = require('recurse');
//const { invoke } = require('cypress/types/lodash/index.js');

let randomData;
let fixData;
let currentPage;
let tableData;

describe('example to-do app', () => {



    beforeEach(() => {

        cy.clearCookies()


        cy.fixture('randomData.json').then(function (info) {
            randomData = info
        })


        cy.fixture('fixData.json').then(function (info) {
            fixData = info
        })

    })



    it('practice', () => {


        LogInPage.visitLogInPage()
        LogInPage.findDiligentSplashScreen().should('not.exist')
        LogInPage.logInUserWithUserRole(fixData.emailExistingUserRole, fixData.passwordExistingUserRole)
        LogInPage.getAfterLogInSpinner().should('not.be.visible')
    
        MainMenuPage.getSubEventsLink().click()
        MainMenuPage.getSpinner().should('not.be.visible')
    
        cy.xpath("//*[@class='dataTables_info']").then(($el) => {
            let text = $el.text().slice(19, -8)
            cy.log(text)
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
            EventsPage.compareNumberOfEvents(text, '2')

        })
    


    })

    it('practice', () => {


            })
       

        







    })



