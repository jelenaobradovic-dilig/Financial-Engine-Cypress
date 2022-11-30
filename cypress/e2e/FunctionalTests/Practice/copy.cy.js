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

        cy.writeFile('randomData.json', { randomEmail: SignUpPage.generateRandomEmail(), randomPassword: SignUpPage.generateRandomPassword() })


        cy.fixture('randomData.json').then(function (info) {
            randomData = info
        })


        cy.fixture('fixData.json').then(function (info) {
            fixData = info
        })

    })



    it('practice', () => {


        SignUpPage.visitSignUpPage()
        SignUpPage.typeNewUserRegistrationData(randomData.randomEmail, randomData.randomPassword)
        //SignUpPage.getRegisterButton().click()
       // SignUpPage.getSucessfullRegistrationMessage().should('have.text', 'You succesfully created an account. ')
      //  SignUpPage.getValidationPageUrl().should('eq', fixData.validationPageUrl)
     //   SignUpPage.getLoginButtonFromValidationPage().click()
      //  cy.url().should('eq', fixData.logInUrl)




    })

    it('practice', () => {


        SignUpPage.visitSignUpPage()


            //cy.writeFile('randomData', { randomEmail: SignUpPage.generateRandomEmail(), randomPassword: SignUpPage.generateRandomPassword() }).then(function (yyy) {
                
            cy.readFile('cypress/fixtures/randomData.json').then(function(x){
            cy.log(x)
            let yyy = x
            SignUpPage.typeNewUserRegistrationData(yyy.randomEmail)
            //SignUpPage.getRegisterButton().click()
            SignUpPage.getSucessfullRegistrationMessage().should('have.text', 'You succesfully created an account. ')
            SignUpPage.getValidationPageUrl().should('eq', fixData.validationPageUrl)
            SignUpPage.getLoginButtonFromValidationPage().click()
            cy.url().should('eq', fixData.logInUrl)

            })
       

        







    })



})