/// <reference types="cypress" />
/// <reference types="cypress-xpath" />

const { v4: uuidv4 } = require('uuid');

const SignUpPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/SignUpPage")
const LogInPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/LogInPage.js")
const MainMenuPage = require("C:/Users/jelena.obradovic/Desktop/Financial Engine Cypress/cypress/fixtures/PageObject/MainMenuPage.js");
const UserManagementPage = require('../../../fixtures/PageObject/UserManagementPage.js');

let randomData;

let fixData;

describe('example to-do app', () => {

    before(() => {

        cy.writeFile('cypress/fixtures/randomEmailAndPas.json', {randomEmail: SignUpPage.generateRandomEmail(), randomPassword: SignUpPage.generateRandomPassword(),
        firstName : "TestName", lastName : "TestLastName", phone :"+123456789", username : "TestUserName"})
    })
    
    beforeEach(() => {

    

       cy.fixture('randomEmailAndPas').then(function(info){
            randomData=info
        })

        
     cy.fixture('fixData').then(function(info2){
           fixData=info2
       })
        
    })




    it('Edit User data as Admin', () => {



        LogInPage.logInUserWithAdminRole(fixData.emailExistingAdminRoleUser, fixData.passwordExistingAdminRoleUser  )
        MainMenuPage.getUserManagementlink().click()
        UserManagementPage.getAddButton().click()
        UserManagementPage.typeNewUserRegistrationData(randomData.randomEmail,randomData.randomPassword)
        UserManagementPage.getSubmitButton().click()
        UserManagementPage.getPopUpMessage().should('have.text', ' User created successfully ')
        
        
        UserManagementPage.getListOfUsersEmails().each(($e, index, $list)=>
        
        {var email = $e.text()

        if(email==randomData.randomEmail)

        {UserManagementPage.getEditButton().eq(index).click()}

        



        })

     
                
        })

    it('Sign Up from Register page', () => {


    })

    it('Sign Up from Register page', () => {


    })


})
