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


describe('Edit Account', () => {
    
    before(()=>{

        cy.writeFile('cypress/fixtures/randomEmailAndPas.json', { randomAccountTypeCaption: AccountTypesPage.generateRandomAccountTypeCaption() ,
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


    it('Edit Account', () => {

    })

    it('Edit already used Account', () => {


        

    })

})