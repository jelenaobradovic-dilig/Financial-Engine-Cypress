const { v4: uuidv4 } = require('uuid');
class LogIn {

    static visitLogInPage(){

        cy.visit("https://financials-test.dilig.net/#/sign-in")
        

    }
    static findDiligentSplashScreen()
    {
        return cy.xpath("//body/app-root/cmp-splash-screen")
    }

    static getEmailInput()
    {
        return cy.xpath("//*[@class='ui-inputgroup'][1]/input")

    }

    static typeEmail(email){

        cy.xpath("//*[@class='ui-inputgroup'][1]/input").type(email)

    }

    static getPasswordInput()
    {
        cy.xpath("//*[@class='ui-inputgroup'][2]/input")
    }

    static typePassword(password){

        cy.xpath("//*[@class='ui-inputgroup'][2]/input").type(password)
    }

    static getAfterLogInUrl(){

       return cy.url()
    }


    static getLoginButton(){

      return  cy.xpath("//button[contains(text(),'Login')]")
    }

    static generateRandomEmail ()
    {
       let randomString=uuidv4().slice(0,10)
       let randomEmail=randomString.concat("@yopmail.com")
       return randomEmail
    }
    
    static generateRandomPassword()
    {
       let randomPassword=uuidv4().slice(0,10)
       return randomPassword
    }

    static logInUserWithAdminRole(adminMail, adminPassword){
        this.typeEmail(adminMail)
       this.typePassword(adminPassword)
        this.getLoginButton().click()
    }

    static logInUserWithUserRole(userMail, userPassword)
    {
        this.typeEmail(userMail)
        this.typePassword(userPassword)
        this.getLoginButton().click()
    }

    static getErrorMessages()
    {
        return cy.xpath("//*[@class='error-message ng-star-inserted']")
    }

    static getAfterLogInSpinner()
    {
        return cy.get('#spinnerModal')
    }
    
}



module.exports=LogIn