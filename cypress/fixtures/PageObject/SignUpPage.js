const { v4: uuidv4 } = require('uuid');
const LogIn = require('./LogInPage');


class SignUp {


   static visitSignUpPage() {
      cy.visit('https://financials-test.dilig.net/#/sign-up')
   }

   static typeFirstName(firstName) {
      cy.xpath("//input[@formcontrolname='Firstname']").type(firstName)

   }


   static typeLastName(lastName) {
      cy.get(':nth-child(2) > .form-control').type(lastName)

   }



   static typeEmail(email) {
      cy.xpath("//input[@formcontrolname='Email']").type(email)

   }


   static typePassword(password) {
      cy.xpath("//input[@formcontrolname='Password']").type(password)
   }


   static typeRePassword(rePassword) {
      cy.xpath("//input[@formcontrolname='RePassword']").type(rePassword)
   }



   static getEmailInput() {
      return cy.xpath("//input[@formcontrolname='Email']")

   }

   static getPasswordInput() {

      return cy.xpath("//input[@formcontrolname='Password']")

   }

   static getRegisterButton() {

      return cy.xpath("//button[contains(text(),'Register')]")
   }

   static getSucessfullRegistrationMessage() {
      return cy.xpath("//h5")
   }


   static getValidationPageUrl() {
      return cy.url()
   }


   static getLoginButtonFromValidationPage() {
      return cy.get('.text-right')
   }



   static generateRandomEmail() {
      let randomString = uuidv4()
      let shortenString = randomString.slice(0, 10)
      let number = "1"
      let randomEmail = number.concat(shortenString).concat("@yopmail.com")
      return randomEmail
   }

   static generateRandomPassword() {
      let randomString = uuidv4()
      let randomPassword = randomString.slice(0, 10)
      return randomPassword
   }


   static typeNewUserRegistrationData(email, password) {

      this.typeFirstName("TestName")
      this.typeLastName("TestLastName")
      this.typeEmail(email)
      this.typePassword(password)
      this.typeRePassword(password)


   }


}

module.exports = SignUp