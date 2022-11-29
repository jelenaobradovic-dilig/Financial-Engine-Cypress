/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require('chai');

const { v4: uuidv4 } = require('uuid');
const LogInPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/LogInPage.js")
const MainMenuPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/MainMenuPage.js")
const UserManagementPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/UserManagementPage.js")
const AccountTypesPage = require("../../../fixtures/PageObject/AccountTypesPage.js")
const AccountsPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/AccountsPage.js")

let fixData;
let randomData;
let tableData;


describe('Create New Account Type ', () => {

    before(() => {


    })

    beforeEach(() => {

        cy.clearCookies()

        cy.writeFile('cypress/fixtures/randomData.json', {
            randomAccountTypeCaption: AccountTypesPage.generateRandomAccountTypeCaption(),
            randomAccountTypeDescription: AccountTypesPage.generateRandomAccountTypeDescription(),
            randomAccountTypeProperty: AccountTypesPage.generateRandomAccountTypeProperty()
        })

        cy.fixture('fixData').then(function (info) {
            fixData = info

        })

        cy.fixture('randomData').then(function (info) {
            randomData = info

        })

        cy.fixture('tableData').then(function (info) {
            tableData = info

        })


    })


    it('Create Account type with data at all fields and Target required', () => {

        LogInPage.visitLogInPage()
        LogInPage.logInUserWithAdminRole(fixData.emailExistingAdminRoleUser, fixData.passwordExistingAdminRoleUser)

        MainMenuPage.getAccountTypesLink().click()

        AccountTypesPage.findAddAccountTypeButton().click()
        MainMenuPage.getSpinner().should('not.be.visible')
        AccountTypesPage.findSaveButton().should('be.visible')
        AccountTypesPage.getAccountTypeCaptionAtAddNewAccount().clear()
        AccountTypesPage.typeAccountTypeCaption(randomData.randomAccountTypeCaption)
        AccountTypesPage.typeAccountTypeDescription(randomData.randomAccountTypeDescription)
        AccountTypesPage.findTargetCheckbox().should('not.be.checked').check()
        AccountTypesPage.findTargetCheckbox().should('be.checked')
        AccountTypesPage.typeProperty(randomData.randomAccountTypeProperty)
        AccountTypesPage.findAddPropertyButton().click()
        AccountTypesPage.findSaveButton().click()

        AccountTypesPage.getPopUpMessage() //radi 
        //AccountTypesPage.getPopUpMessage().should('have.text', 'Account Type created successfully') ne radi
        cy.contains('Account Type created successfully')

        //pa da onda nastavi?


        AccountTypesPage.findSpinnerModal().should('not.be.visible')

        MainMenuPage.getUserIconButton().click()

        MainMenuPage.getLogoutButton().click()

        LogInPage.logInUserWithUserRole(fixData.emailExistingUserRole, fixData.passwordExistingUserRole)

        MainMenuPage.getAccountTypesLink().click()

        AccountTypesPage.writeDataIfAccountTypeExistsInTable(randomData.randomAccountTypeCaption)

        cy
            .fixture('tableData')
            .then(td => {
                expect(td.accountTypeCaption).to.eq(randomData.randomAccountTypeCaption)

            })

        MainMenuPage.getSubAccountsLink().click()

        AccountsPage.getAcountTypesSelectAtSearch().select(randomData.randomAccountTypeCaption)

        AccountsPage.getAcountTypesSelectAtSearch().find('option:selected').invoke('text')
            .then((text) => text.trim()).should("equal", randomData.randomAccountTypeCaption)

        AccountsPage.getAddNewAccountButton().click({ force: true })

        AccountsPage.getAccountTypesSelectAtAddNewAccount().select(randomData.randomAccountTypeCaption)

        AccountsPage.getAccountTypesSelectAtAddNewAccount().find('option:selected').invoke('text')
            .then((text) => text.trim()).should("equal", randomData.randomAccountTypeCaption)

        AccountsPage.getPropertyKeySelectFromAddNewAccount().select(randomData.randomAccountTypeProperty)

        AccountsPage.getPropertyKeySelectFromAddNewAccount().find('option:selected').invoke('text')
            .then((text) => text.trim()).should("equal", randomData.randomAccountTypeProperty)

        AccountsPage.getPropertyValueInput().type('123')
        AccountsPage.getTargetAccountFieldsFromAddNewAccount().should('be.visible')




    })

    it('Create Account type with data at all fields and without Target required', () => {

        LogInPage.visitLogInPage()
        LogInPage.logInUserWithAdminRole(fixData.emailExistingAdminRoleUser, fixData.passwordExistingAdminRoleUser)

        MainMenuPage.getAccountTypesLink().click()
        AccountTypesPage.findAddAccountTypeButton().click()
        MainMenuPage.getSpinner().should('not.be.visible')

        AccountTypesPage.findSaveButton().should('be.visible')

        AccountTypesPage.getAccountTypeCaptionAtAddNewAccount().clear()
        AccountTypesPage.typeAccountTypeCaption(randomData.randomAccountTypeCaption)
        AccountTypesPage.typeAccountTypeDescription(randomData.randomAccountTypeDescription)
        AccountTypesPage.findTargetCheckbox().should('not.be.checked')
        AccountTypesPage.typeProperty(randomData.randomAccountTypeProperty)
        AccountTypesPage.findAddPropertyButton().click()
        AccountTypesPage.findSaveButton().click()

        cy.contains('Account Type created successfully')
        //pa da onda nastavi?

        //AccountTypesPage.getPopUpMessage().should('have.text', 'Account Type created successfully') ne radi

        AccountTypesPage.findSpinnerModal().should('not.be.visible')

        MainMenuPage.getUserIconButton().click()

        MainMenuPage.getLogoutButton().click()


        LogInPage.logInUserWithUserRole(fixData.emailExistingUserRole, fixData.passwordExistingUserRole)

        MainMenuPage.getAccountTypesLink().click()

        AccountTypesPage.writeDataIfAccountTypeExistsInTable(randomData.randomAccountTypeCaption)

        cy
            .fixture('tableData')
            .then(td => {
                expect(td.accountTypeCaption).to.eq(randomData.randomAccountTypeCaption)

            })

        MainMenuPage.getSubAccountsLink().click()
        AccountsPage.getAcountTypesSelectAtSearch().select(randomData.randomAccountTypeCaption)
        AccountsPage.getAcountTypesSelectAtSearch().find('option:selected').invoke('text')
            .then((text) => text.trim()).should("equal", randomData.randomAccountTypeCaption)
        AccountsPage.getAddNewAccountButton().click({ force: true })
        AccountsPage.getAccountTypesSelectAtAddNewAccount().select(randomData.randomAccountTypeCaption)
        AccountsPage.getAccountTypesSelectAtAddNewAccount().find('option:selected').invoke('text')
            .then((text) => text.trim()).should("equal", randomData.randomAccountTypeCaption)
        AccountsPage.getPropertyKeySelectFromAddNewAccount().select(randomData.randomAccountTypeProperty)
        AccountsPage.getPropertyKeySelectFromAddNewAccount().find('option:selected').invoke('text')
            .then((text) => text.trim()).should("equal", randomData.randomAccountTypeProperty)
        AccountsPage.getPropertyValueInput().type('123')
        AccountsPage.getTargetAccountFieldsFromAddNewAccount().should('not.be.visible')




    })


    it('Create Account type with invalid data at Caption filed which is requried', () => {


        // LogInPage.visitLogInPage()
        // LogInPage.logInUserWithAdminRole(fixData.emailExistingAdminRoleUser, fixData.passwordExistingAdminRoleUser)

        // MainMenuPage.getAccountTypesLink().click()

        // AccountTypesPage.findAddAccountTypeButton().click()
        // MainMenuPage.getSpinner().should('not.be.visible')
        // AccountTypesPage.findSaveButton().should('be.visible')

        // AccountTypesPage.getAccountTypeCaptionAtAddNewAccount().clear()
        //AccountTypesPage.getAccountTypeCaptionAtAddNewAccount().type(" ")
        // AccountTypesPage.typeAccountTypeDescription(randomData.randomAccountTypeDescription)
        // AccountTypesPage.findTargetCheckbox().should('not.be.checked')
        // AccountTypesPage.typeProperty(randomData.randomAccountTypeProperty)
        // AccountTypesPage.findAddPropertyButton().click()
        // AccountTypesPage.findSaveButton().click()

        //CEKA SE DISABLe SAVE DUGMETA I DA SE DODA ASSERT ZA TO i assert poruke ispod Caption polja



    })

    it('Create Account type without any data at Caption filed which is requried', () => {


        // LogInPage.visitLogInPage()
        // LogInPage.logInUserWithAdminRole(fixData.emailExistingAdminRoleUser, fixData.passwordExistingAdminRoleUser)

        // MainMenuPage.getAccountTypesLink().click()

        // AccountTypesPage.findAddAccountTypeButton().click()
        // MainMenuPage.getSpinner().should('not.be.visible')
        // AccountTypesPage.findSaveButton().should('be.visible')

        // AccountTypesPage.getAccountTypeCaptionAtAddNewAccount().clear()

        // AccountTypesPage.typeAccountTypeDescription(randomData.randomAccountTypeDescription)
        // AccountTypesPage.findTargetCheckbox().should('not.be.checked')
        // AccountTypesPage.typeProperty(randomData.randomAccountTypeProperty)
        // AccountTypesPage.findAddPropertyButton().click()
        // AccountTypesPage.findSaveButton().click()

        //CEKA SE DISABLe SAVE DUGMEta I DA SE DODA ASSERT ZA TO  assert poruke ispod Caption polja



    })

    it('Create Account type without any data at all fields', () => {


        // LogInPage.visitLogInPage()
        // LogInPage.logInUserWithAdminRole(fixData.emailExistingAdminRoleUser, fixData.passwordExistingAdminRoleUser)

        // MainMenuPage.getAccountTypesLink().click()

        // AccountTypesPage.findAddAccountTypeButton().click()
        // MainMenuPage.getSpinner().should('not.be.visible')
        // AccountTypesPage.findSaveButton().should('be.visible')

        // AccountTypesPage.getAccountTypeCaptionAtAddNewAccount().clear()


        // AccountTypesPage.findTargetCheckbox().should('not.be.checked')


        // AccountTypesPage.findSaveButton().click()

        //CEKA SE DISABLe SAVE DUGMEta I DA SE DODA ASSERT ZA TO  assert poruke ispod Caption polja



    })

    it('Create Account type with invalid data at property input', () => {


        // LogInPage.visitLogInPage()
        // LogInPage.logInUserWithAdminRole(fixData.emailExistingAdminRoleUser, fixData.passwordExistingAdminRoleUser)

        // MainMenuPage.getAccountTypesLink().click()

        // AccountTypesPage.findAddAccountTypeButton().click()
        // MainMenuPage.getSpinner().should('not.be.visible')
        // AccountTypesPage.findSaveButton().should('be.visible')

        // AccountTypesPage.getAccountTypeCaptionAtAddNewAccount().clear()
        //AccountTypesPage.typeAccountTypeCaption(randomData.randomAccountTypeCaption)

        // AccountTypesPage.typeAccountTypeDescription(randomData.randomAccountTypeDescription)
        // AccountTypesPage.findTargetCheckbox().should('not.be.checked')
        // AccountTypesPage.typeProperty(" ")
        // AccountTypesPage.findAddPropertyButton().click()
        // AccountTypesPage.findSaveButton().click()

        //CEKA SE DISABLe SAVE DUGMEta I DA SE DODA ASSERT ZA TO  assert poruke ispod Caption polja



    })

})