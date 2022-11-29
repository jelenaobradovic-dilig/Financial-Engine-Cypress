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

        cy.fixture('randomData').then(function (info) {
            randomData = info
        })

        cy.fixture('fixData').then(function (info) {
            fixData = info
        })

    })



    //     it('xxx', () => {



    //         LogInPage.visitLogInPage()
    //         LogInPage.findDiligentSplashScreen().should('not.exist')
    //         LogInPage.logInUserWithAdminRole(fixData.emailExistingAdminAndUserRole, fixData.passwordExistingAdminAndUserRole )

    //         MainMenuPage.getAccountTypesLink().should('be.visible').click()


    //         AccountTypes.clickOnEditAccountTypeButtonByCaption('Tax1111')

    //        AccountTypes.findModalBody().should('be.visible')

    //         AccountTypes.typeAccountTypeDescription('axxx')
    //        AccountTypes.findSaveButton().should('be.visible').click()

    //     cy.contains('Account Type updated successfully')
    //    ******POPUP MESSAGE*****

    //     AccountTypes.findSpinnerModal().should('not.be.visible')


    //        AccountTypes.writeDataIfAccountTypeExistsInTable('blabla1')  








    //        // AccountsPage.getAddNewAccountButton().click({ force: true })

    //         //AccountsPage.getAccountTypeSelectFromAddNewAccount().select('caption 1')
    //         //AccountsPage.getPropertyKeySelectFromAddNewAccount().select('test Submit Event')
    //        // AccountsPage.getPropertyValueInput().type('123')
    //        // AccountsPage.getTargetAccountFieldsFromAddNewAccount().should('not.exist')



    //         // cy.wait(5000)
    //         // MainMenuPage.getUserManagementlink().click()
    //         // UserManagementPage.getAddButton().click()
    //         // UserManagementPage.typeNewUserRegistrationData(newData.randomEmail, newData.randomPassword)
    //         // UserManagementPage.getSubmitButton().click()
    //         // UserManagementPage.getPopUpMessage().should('have.text', ' User created successfully ')
    //         // cy.wait(5000)


    //         // UserManagementPage.getListOfUsersEmails().each(($e, index, $list)=>

    //         // {var email = $e.text()

    //         // if(email==newData.randomEmail)

    //         // {UserManagementPage.getEditButton().eq(index).click()
    //         // }

    //         // })

    //        // UserManagementPage.getEmailConfirmationCheckbox().should('be.visible').and('not.be.checked').check()
    //         //UserManagementPage.getRoleButton().click()
    //         //UserManagementPage.getAdminRoleCheckbox().should('not.be.checked')
    //        // UserManagementPage.getSystemRoleCheckbox().should('not.be.checked')
    //        // UserManagementPage.getUserRoleCheckbox().should('be.checked')
    //        // UserManagementPage.getSubmitButton().click()
    //       //  UserManagementPage.getPopUpMessage().should('have.text', ' User updated successfully ')
    //       //  MainMenuPage.getUserIconButton().click({force: true})
    //        // MainMenuPage.getLogoutButton().click()
    //        // cy.url().should('eq', 'http://192.168.88.105:55755/#/sign-in')
    //        // LogInPage.logInUserWithUserRole(randomData.randomEmail,randomData.randomPassword)
    //        // LogInPage.getAfterLogInUrl().should('eq', 'http://192.168.88.105:55755/#/dashboard')

    //     })

    // it('Sign up from User Management Page', () => {
    //     LogInPage.visitLogInPage()

    //     LogInPage.logInUserWithAdminRole(fixData.emailExistingAdminRoleUser, fixData.passwordExistingAdminRoleUser )

    //     MainMenuPage.getUserManagementlink().should('be.visible').click()

    //     UserManagementPage.getUserDialogSpinner().should('not.exist')


    //     UserManagementPage.getEmailInputFromSearch().type('117896861-a@yopmail.com')

    //     UserManagementPage.getSearchButtonFromSearch().click()

    //     UserManagementPage.getUserDialogSpinner().should('not.exist')
    //     cy.wait(1000)
    //     UserManagementPage.getEditButton().should('have.length',1).and('be.visible').and('be.enabled').click()
    //     UserManagementPage.getEmailConfirmationCheckbox().should('be.checked').uncheck()

    //     UserManagementPage.getSubmitButton().click()
    //    // UserManagementPage.getUserDialogSpinner().should('not.exist')

    //     //UserManagementPage.getPopUpMessage().should('have.text', ' User updated successfully ')
    //     //cy.frameLoaded()
    //    //cy.iframe('.aut-iframe').xpath("//div[@role='alert']").should('contains', 'User updated successfully')
    //     //const iframe= cy.get('.aut-iframe').its('.0.contentDocument.body').should('be.visible').then(cy.wrap)
    //    // iframe.should('have.text',' User updated successfully ')
    //    UserManagementPage.getPopUpMessage().should('be.visible').and('have.text',' User updated successfully ')
    // })

    it('Submit New Event with valid data and NewAccountMethod', () => {

        LogInPage.visitLogInPage()
        LogInPage.findDiligentSplashScreen().should('not.exist')

        
        LogInPage.logInUserWithAdminRole(fixData.emailExistingAdminRoleUser, fixData.passwordExistingAdminRoleUser)



        //  // cy.wait(1000)
        LogInPage.getAfterLogInSpinner().should('not.be.visible')

        //EventsPage.getEventsSubmenu().click()
        // cy.wait(1000)
        // EventsPage.writeIntoTableDataNumberOfEvents()

        // MainMenuPage.getSubmitEventLink().should('be.visible').click()
        // SubmitEvent.selectRandomDomain()
        // //SubmitEvent.selectRandomEventType()
        // SubmitEvent.getSelectEventType().select('BankingActivitySubmitted')
        // SubmitEvent.getSelectAccountType().should('be.disabled')
        // SubmitEvent.typeEventNote(randomData.randomEventNote)
        // SubmitEvent.selectAccountMethodByOption('New Account')
        // SubmitEvent.getNewAccountSection().should('be.visible')
        // SubmitEvent.typeInvalidAmountAtNewAccount()
        // //SubmitEvent.getInvalidAmountFormatErrorMessage().should('have.text', 'Invalid number format.')
        // SubmitEvent.getAmountAtNewAccount().clear()

        // SubmitEvent.typeAmountAtNewAccount(randomData.randomAmount).invoke('val',)
        // SubmitEvent.getAmountAtNewAccount().type(randomData.randomAmount).then(($input)=>{

        //   const amount =$input.text()
        //   expect(amount.includes(randomData.randomAmount).to.be.true)
        // })
        // SubmitEvent.getAmountAtNewAccount().then(($el)=>
        // {
        //   let amount=$el.text()
        //   cy.log(amount)
        // }
        // )

        // SubmitEvent.typeAmountAtNewAccount(randomData.randomAmount)
        // SubmitEvent.typeAccountNote(randomData.randomAccountNote)
        // SubmitEvent.typeTargetAccount(fixData.accountCost1, 0)
        // SubmitEvent.clickAddButtonAtAccountTargets(0)
        //SubmitEvent.getAmountAtAccountTargets().should('have.value',randomData.randomAmount)


        //  SubmitEvent.getSubmitEventButton().click()
        //  MainMenuPage.getSpinner().should('not.be.visible')
        //  EventsPage.getEventsSubmenu().click()
        //  cy.wait(15000)
        //  EventsPage.compareNumberOfEvents(tableData.numberOfEvents)
//////////////////////////////////////////////////////////////////////////////////////
        // MainMenuPage.getSubAccountsLink().click()
        // AccountsPage.getAcountTypesSelectAtSearch().select('Descriptione1fd23')
        // AccountsPage.getAcountTypesSelectAtSearch().find('option:selected').invoke('text')
        // .then((text) => text.trim()).should("equal", 'Descriptione1fd23')
        // AccountsPage.getAddNewAccountButton().click({ force: true })
        // AccountsPage.getAccountTypesSelectAtAddNewAccount().select('Descriptione1fd23')
        // AccountsPage.getPropertyKeySelectFromAddNewAccount().select(randomData.randomAccountTypeProperty)
        // AccountsPage.getPropertyKeySelectFromAddNewAccount().find('option:selected').invoke('text')
        // .then((text) => text.trim()).should("equal", randomData.randomAccountTypeProperty)
        // AccountsPage.getPropertyValueInput().type('123')
        // AccountsPage.getTargetAccountFieldsFromAddNewAccount().should('be.visible')

// //////////////////////////////////////////////////////////////////////////
// MainMenuPage.getSubEventsLink().click()
// EventsPage.getAccountAtSearch().type('COS10__2022_38')
// EventsPage.getSearchButton().click()
// cy.wait(2000)
// EventsPage.getCancelEventButton().click({force:true})
// cy.wait(1000)

// EventsPage.getConfirmButtonAtCancelDialog().click()
// EventsPage.getAccountAtSearch().type('222')

//     })



    ///////////////////////////////
MainMenuPage.getAccountTypesLink().click()
MainMenuPage.getSpinner().should('not.be.visible')
AccountTypes.clickOnEditAccountTypeButtonByCaption('Tax1')

})
})