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

        MainMenuPage.getMainMenuList().should('have.length', 7).and('have.text',
        ' Dashboard  Accounts  Account Types  Events  Event Types  Domains  Domains  Settings  Tags  Application settings  User Management  Role Management ')
       
        
        MainMenuPage.getMainMenuAllMembers().should('have.length', 5).and('have.text',
        ' Account Types  Event Types  Domains  Tags  Application settings ')

    })

    it('Log In with existing user with User role', () => {

        LogInPage.findDiligentSplashScreen().should('not.exist')

        LogInPage.logInUserWithUserRole(fixData.emailExistingUserRole, fixData.passwordExistingUserRole)

        LogInPage.getLoginButton().should("not.exist")

        cy.url().should('eq', fixData.afterLogInUrlForUser)

        MainMenuPage.getMainMenuList().should('be.visible').and('have.length', 5)  .and ('have.text',
        ' Dashboard  Accounts  Account Types  Accounts  Account Balances  Target Account  Events  Event Types  Events  Transactions  Submit Event  Revert Event  Domains  Domains  Domain Balances  Settings  Tags ')
        

        MainMenuPage.getMainMenuAllMembers().should('have.length', 12).and ('have.text',
        ' Account Types  Accounts  Account Balances  Target Account  Event Types  Events  Transactions  Submit Event  Revert Event  Domains  Domain Balances  Tags ')
      


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