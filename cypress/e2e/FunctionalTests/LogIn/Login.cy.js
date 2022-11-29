/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require('chai');

const { v4: uuidv4 } = require('uuid');
const LogInPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/LogInPage.js")
const MainMenuPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/MainMenuPage")
const UserManagementPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/UserManagementPage")

let fixData;


describe('Log in ', () => {

    beforeEach(() => {

        cy.clearCookies()

        LogInPage.visitLogInPage()

        cy.fixture('fixData').then(function (info) {
            fixData = info
        })

    })

    it('Log In with existing user with Admin role', () => {

        LogInPage.findDiligentSplashScreen().should('not.exist')

        LogInPage.logInUserWithAdminRole(fixData.emailExistingAdminRoleUser, fixData.passwordExistingAdminRoleUser)

        LogInPage.getLoginButton().should("not.exist")

        cy.url().should('eq', fixData.afterLogInUrlForAdmin)

        MainMenuPage.getMainMenuList().should('have.length', 7)
        
        MainMenuPage.getMainMenuAllMembers().should('have.length', 10)

    })

    it('Log In with existing user with User role', () => {

        LogInPage.findDiligentSplashScreen().should('not.exist')

        LogInPage.logInUserWithUserRole(fixData.emailExistingUserRole, fixData.passwordExistingUserRole)

        LogInPage.getLoginButton().should("not.exist")

        cy.url().should('eq', fixData.afterLogInUrlForUser)

        MainMenuPage.getMainMenuList().should('have.length', 4)

        MainMenuPage.getMainMenuAllMembers().should('have.length', 15)


    })


    it('Log In with incorrect password for existing user', () => {

        LogInPage.findDiligentSplashScreen().should('not.exist')

        LogInPage.typeEmail(fixData.emailExistingAdminRoleUser)
        LogInPage.typePassword(LogInPage.generateRandomPassword())
        LogInPage.getLoginButton().click()

        LogInPage.getLoginButton().should("exist")

        cy.url().should('eq', fixData.logInUrl)

        cy.contains('Password is required filed')

    })


    it('Log In with nonexisting user', () => {

        LogInPage.findDiligentSplashScreen().should('not.exist')

        LogInPage.typeEmail(LogInPage.generateRandomEmail())
        LogInPage.typePassword(LogInPage.generateRandomPassword())
        LogInPage.getLoginButton().click()

        LogInPage.getLoginButton().should("exist")

        cy.url().should('eq', fixData.logInUrl)

        cy.contains('Password is required filed')

    })


    it('Log In with invalid email', () => {

        LogInPage.findDiligentSplashScreen().should('not.exist')

        LogInPage.typeEmail(('A'.concat(LogInPage.generateRandomEmail())))
        LogInPage.typePassword(LogInPage.generateRandomPassword())
        LogInPage.getLoginButton().click()

        LogInPage.getLoginButton().should("exist")

        cy.url().should('eq', fixData.logInUrl)

        cy.contains('Email address is not valid')

    })

    it('Log In with invalid pasword', () => {

        LogInPage.findDiligentSplashScreen().should('not.exist')

        LogInPage.typeEmail(fixData.emailExistingAdminRoleUser)
        LogInPage.typePassword(uuidv4().slice(0, 3))
        LogInPage.getLoginButton().click()

        LogInPage.getLoginButton().should("exist")

        cy.contains('Password is required filed')

        cy.url().should('eq', fixData.logInUrl)

    })

    it('Log In with empty fields', () => {

        LogInPage.findDiligentSplashScreen().should('not.exist')

        LogInPage.getLoginButton().click()

        LogInPage.getErrorMessages().eq(0).should('have.text', 'Email is required filed')

        LogInPage.getErrorMessages().eq(1).should('have.text', 'Password is required filed')

        LogInPage.getLoginButton().should("exist")

        cy.url().should('eq', fixData.logInUrl)

    })

})