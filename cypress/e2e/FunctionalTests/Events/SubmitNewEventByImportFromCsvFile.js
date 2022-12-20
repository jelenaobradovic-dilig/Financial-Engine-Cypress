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



  it('Submit Event trough import from csv file', () => {



  })


  it('Submit Event trough import from invalid csv file', () => {



})

it('Submit Event trough import from csv file, no Domain with specified bank account number', () => {



})

it('Submit Event trough import from csv file', () => {



})



})