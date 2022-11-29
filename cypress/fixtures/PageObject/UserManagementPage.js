const AccountTypes = require("./AccountTypesPage")

class UserManagement {

    static getListOfUsers() {
        "//tr[@class='ng-star-inserted']"
    }

    static getListOfUsersEmails() {

        return cy.xpath("//tr[@class='ng-star-inserted']/td[4]")
    }



    static getNumberOfPagesAtTable() {
        cy.xpath("//div[@class='dataTables_paginate paging_full_numbers']/span/a").then(($el) => {
            let numberOfPages = $el.length

            return numberOfPages
        }
        )
    }

    static getCurrentPageButtonNumber() {
        cy.get('.current').then(($el) => {
            let currentPageNumber = $el.text()
            return currentPageNumber
        })
    }

    static getLastButtonForPaginating() {
        return cy.get('#DataTables_Table_0_last')
    }

    static getFirstButtonForPaginating() {
        return cy.get('#DataTables_Table_0_first')
    }

    static getEditButton() {
        return cy.xpath("//tbody/tr/td[7]//button[1]")
    }


    static clickOnEditButtonForSearchedUser(email) {
        UserManagement.getListOfUsersEmails().each(($el, index, $list) => {

            let userEmail = $el.text()

            if (userEmail === email) {
                cy.xpath("//tbody/tr/td[7]//button[1]").eq(index).click()

            }
        })
    }


    static getEmailConfirmationCheckbox() {
        return cy.xpath("//input[@id='emailConfirmed']")

    }

    static getRoleButton() {

        return cy.xpath("//h5[contains(text(),'Role')]")
    }

    static getAdminRoleCheckbox() {
        return cy.xpath("//input[@value='Administrator']")

    }
    static getUserRoleCheckbox() {
        return cy.xpath("//input[@value='User']")
    }


    static getSubmitButtonFromEditUser() {
        return cy.xpath("//app-user[1]/form[1]/div[5]/div[1]//button[contains(text(), 'Submit')]")
    }


    static getPopUpMessage() {
        return cy.get('#toast-container > .ng-trigger')
    }

    static getAddButton() {
        return cy.xpath("//button[@title='Add']")
    }


    static getEmailInputFromSearch() {
        return cy.xpath("//div[@class='col-12 col-md-3'][4]/div/input")
    }

    static getSearchButtonFromSearch() {
        return cy.xpath("//button[contains(text(), 'Search')]")
    }


    //koriscen relative xpath jer ima 2 modala sa istom klasom itd i uvek izbacuje po 2 rezultata, 1 modal trenutno nije u upotrebi, mozda ce biti izbrisan iz koda

    static typeFirstName(firstName) {
        cy.xpath("//app-users[1]/cmp-user-dialog[1]/div[1]/div[1]/div[2]/form[1]/div[1]/div[1]/div[1]/div[1]/input[1]").type(firstName)

    }


    static typeLastName(lastName) {
        cy.xpath("//app-users[1]/cmp-user-dialog[1]/div[1]/div[1]/div[2]/form[1]/div[1]/div[1]/div[2]/div[1]/input[1]").type(lastName)

    }



    static typeEmail(email) {
        cy.xpath("//app-users[1]/cmp-user-dialog[1]/div[1]/div[1]/div[2]/form[1]/div[1]/div[1]/div[3]/div[1]/input[1]").type(email)

    }


    static typePassword(password) {
        cy.xpath("//app-users[1]/cmp-user-dialog[1]/div[1]/div[1]/div[2]/form[1]/div[1]/div[1]/div[4]/div[1]/input[1]").type(password)
    }


    static typeRePassword(rePassword) {
        cy.xpath("//app-users[1]/cmp-user-dialog[1]/div[1]/div[1]/div[2]/form[1]/div[1]/div[1]/div[5]/div[1]/input[1]").type(rePassword)
    }

    static typeNewUserRegistrationData(email, password) {
        cy.wait(300)
        this.typeFirstName("TestName")
        cy.wait(300)
        this.typeLastName('TestLastName')
        this.typeEmail(email)
        this.typePassword(password)
        this.typeRePassword(password)

    }



    static getSubmitButtonFromCreateUser() {

        return cy.xpath("//app-users[1]/cmp-user-dialog[1]//button[contains(text(), 'Submit')]")
    }


    static getHeaderFormCreateUserModal() {
        return cy.xpath("//div[@class='modal-header d-flex align-items-center text-white']")
    }


}


module.exports = UserManagement