/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { v4: uuidv4 } = require('uuid');

const SignUpPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/SignUpPage")
const LogInPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/LogInPage.js")
const MainMenuPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/MainMenuPage.js");
const UserManagementPage = require('../../../fixtures/PageObject/UserManagementPage.js');

let randomData;

let fixData;

describe('Register new user', () => {



    beforeEach(() => {

        cy.clearCookies()

        cy.writeFile('cypress/fixtures/randomData.json', { randomEmail: SignUpPage.generateRandomEmail(), randomPassword: SignUpPage.generateRandomPassword() })


        cy.fixture('fixData').then(function (info) {
            fixData = info
        })


        cy.fixture('randomData').then(function (info) {
            randomData = info

        })

    })



it('Register new User from User Management Page', () => {


    LogInPage.visitLogInPage()

    LogInPage.logInUserWithAdminRole(fixData.emailExistingAdminRoleUser, fixData.passwordExistingAdminRoleUser)

    MainMenuPage.getUserManagementlink().should('be.visible').click()

    MainMenuPage.getSpinner().should('not.be.visible')

    UserManagementPage.getAddButton().click()

    UserManagementPage.getSubmitButtonFromCreateUser().should('be.visible')


    cy.writeFile('cypress/randomData/randomData.json', { randomEmail: SignUpPage.generateRandomEmail(), randomPassword: SignUpPage.generateRandomPassword() }).then(function (rd) {

        cy.readFile('cypress/randomData/randomData.json').then(function (x) {

            cy.log(x)

            UserManagementPage.typeNewUserRegistrationData(randomData.randomEmail, randomData.randomPassword)

            UserManagementPage.getSubmitButtonFromCreateUser().click()
            MainMenuPage.getSpinner().should('not.be.visible')

            UserManagementPage.getPopUpMessage()
            //.should('have.text', ' User created successfully ')

            UserManagementPage.getEmailInputFromSearch().type(randomData.randomEmail)

            UserManagementPage.getSearchButtonFromSearch().click()

            MainMenuPage.getSpinner().should('not.be.visible')
            cy.wait(1000)
        })



        UserManagementPage.getEditButton().should('have.length', 1).and('be.visible').and('be.enabled').click()
        UserManagementPage.getEmailConfirmationCheckbox().should('not.be.checked').check()
        UserManagementPage.getRoleButton().click()
        UserManagementPage.getAdminRoleCheckbox().should('not.be.checked')
        UserManagementPage.getUserRoleCheckbox().should('be.checked')
        UserManagementPage.getSubmitButtonFromEditUser().click()
        MainMenuPage.getSpinner().should('not.be.visible')

        //UserManagementPage.getPopUpMessage().should('be.visible').and('have.text',' User updated successfully ')

        MainMenuPage.getUserIconButton().click({ force: true })
        MainMenuPage.getLogoutButton().click()
        cy.url().should('eq', fixData.logInUrl)
        MainMenuPage.getSpinner().should('not.be.visible')
        LogInPage.logInUserWithUserRole(randomData.randomEmail, randomData.randomPassword)
        LogInPage.getAfterLogInUrl().should('eq', fixData.afterLogInUrlForUser)


    })

})

})