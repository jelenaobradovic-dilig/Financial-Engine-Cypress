/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { should } = require('chai');

const { v4: uuidv4 } = require('uuid');
const LogInPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/LogInPage.js")
const MainMenuPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/MainMenuPage.js")
const UserManagementPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/UserManagementPage.js")
const AccountTypesPage = require("../../../fixtures/PageObject/AccountTypesPage.js")
const AccountsPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/AccountsPage.js")
const AccountTypes = require('../../../fixtures/PageObject/AccountTypesPage.js')

let fixData;
let randomData;


describe('Edit Account Type ', () => {
    
    before(()=>{

        cy.writeFile('cypress/fixtures/randomData.json', { randomAccountTypeCaption: AccountTypesPage.generateRandomAccountTypeCaption() ,
            randomAccountTypeDescription: AccountTypesPage.generateRandomAccountTypeDescription(), 
            randomAccountTypeProperty: AccountTypesPage.generateRandomAccountTypeProperty()})
    })
    
    beforeEach(() => {
        
        cy.clearCookies()

        cy.fixture('fixData').then(function(info){
            fixData=info

        })
            cy.fixture('randomEmailAndPas').then(function(info){
                randomData=info

        })
    })



    it('Edit Target requred checkbox', () => {


        //     LogInPage.visitLogInPage()
        //     LogInPage.findDiligentSplashScreen().should('not.exist')
        //     LogInPage.logInUserWithAdminRole(fixData.emailExistingAdminAndUserRole, fixData.passwordExistingAdminAndUserRole )
        //     MainMenuPage.getAccountTypesLink().click()
        //     cy.wait(2000)
        //     AccountTypes.clickOnEditAccountTypeButtonByCaption('Invoice')
        //    // AccountTypes.findTargetCheckbox().check()
        //     AccountTypes.findSaveButton().click()
        //     MainMenuPage.findAccountsLink().click()
        //     AccountsPage.getAddNewAccountButton().click({ force: true })
        //     AccountsPage.getAccountTypeSelectFromAddNewAccount().select("Invoice")
        //     AccountsPage.getPropertyKeySelectFromAddNewAccount().select('New property')
        //     AccountsPage.getPropertyValueInput().type('123')
        //     AccountsPage.getTargetAccountFieldsFromAddNewAccount().should('be.visible')
    
        //     AccountsPage.getAccountTypesSelect().select("Invoice")
    
    
    
    
    
        })



        it('Edit Caption field', () => {


        })


    it('Edit Description and Property of Account Type', () => {


        // LogInPage.visitLogInPage()
        // LogInPage.findDiligentSplashScreen().should('not.exist')
        // LogInPage.logInUserWithAdminRole(fixData.emailExistingAdminAndUserRole, fixData.passwordExistingAdminAndUserRole )
        // MainMenuPage.getAccountTypesLink().click()
        // cy.wait(2000)

        // AccountTypes.clickOnEditAccountTypeButtonByCaption('Invoice')
    
        // AccountTypes.getDescriptionInput().clear()
        // AccountTypes.typeAccountTypeDescription('Test Changed Description')
        // AccountTypes.findPropertyInput().type('New Property')
        // AccountTypes.findAddPropertyButton().click()
        // AccountTypes.findSaveButton().click()
        // cy.contains('Account Type updated successfully')
        // AccountTypes.verifyTextAtDescriptionCellByCaptionCellText('Invoice')
    
       

    })

    it('Delete Description and Property of Account Type', () => {

    })

    it('Edit Caption field to be same as Caption of some Existing Account type', () => {

    })


})
