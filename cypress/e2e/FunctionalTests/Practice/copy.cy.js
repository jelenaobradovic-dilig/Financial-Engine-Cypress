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
const TargetAccount = require('../../../fixtures/PageObject/TargetAccountPage.js');
const csv = require('@fast-csv/parse')

//const { invoke } = require('cypress/types/lodash/index.js');

let randomData;
let fixData;
let import1;
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

    cy.fixture('import1.csv').then(function (info) {
      import1 = info
    })


  })





  it('practice', () => {

    //**************************************************************************************************** */


    //  cy.xpath("//input[@id='file_upload']")
    //   .invoke('show').selectFile()
    LogInPage.visitLogInPage()
    LogInPage.findDiligentSplashScreen().should('not.exist')
    LogInPage.logInUserWithUserRole(fixData.emailExistingUserRole, fixData.passwordExistingUserRole)
    cy.wait(3000)
    MainMenuPage.getSpinner().should('not.be.visible')
    MainMenuPage.getSubmitEventLink().click()
    MainMenuPage.getSpinner().should('not.be.visible')

    cy.task('readFromCsvFile')

  //   cy
  //   .readFile('cypress/fixtures/import1.csv')
  //  .should('eq', '123')

    //   // cy.get('input[type=file]')
    //   //   .invoke('show').selectFile('C:/Users/jelena.obradovic/Desktop/FINANCIAL ENGINE/izvodi')
    //   cy.get('[data-cy=upload-image]')
    // .selectFile('C:/Users/jelena.obradovic/Desktop/FINANCIAL ENGINE/izvodi')





  
})




















