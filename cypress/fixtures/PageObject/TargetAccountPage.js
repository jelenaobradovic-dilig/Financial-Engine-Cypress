class TargetAccount {


    static getAccountInputAtSearch() {
        return cy.xpath("//input[@id='float-input']")
    }

    static getSearchButton() {
        return cy.xpath("//button[contains(text(),'Search')]")
    }

    static getAccountTdsFromTable() {
        return cy.xpath("//tbody[@class='ng-star-inserted']/tr/td[1]")
    }

    static getTargetButtons() {
        return cy.xpath("//tbody[@class='ng-star-inserted']/tr/td[8]")
    }

    static getTargetAccountInput() {
        return cy.xpath('//tfoot//td[2]/input')
    }

    static getAddTargetAccountButton() {
        return cy.xpath("//tfoot//td[5]//button")
    }

}

module.exports = TargetAccount




