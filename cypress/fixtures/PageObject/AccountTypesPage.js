const { v4: uuidv4 } = require('uuid');

class AccountTypes {


    static findAddAccountTypeButton() {
        return cy.xpath("//button[@title='Add']")

    }



    static generateRandomAccountTypeCaption() {
        let randomString = uuidv4().slice(0, 10)
        let randomAccountTypeCaption = ("Test").concat(randomString)
        return randomAccountTypeCaption
    }

    static generateRandomAccountTypeDescription() {
        let randomString = uuidv4().slice(0, 5)
        let randomAccountTypeDescription = ("Description").concat(randomString)
        return randomAccountTypeDescription
    }

    static generateRandomAccountTypeProperty() {
        let randomString = uuidv4().slice(0, 5)
        let randomAccountTypeProperty = ("Property").concat(randomString)
        return randomAccountTypeProperty
    }

    static getDescriptionInput() {
        return cy.xpath("//*[@formcontrolname='Description']")
    }

    static typeAccountTypeDescription(description) {
        cy.wait(500)
        cy.xpath("//*[@formcontrolname='Description']").type(description)

        cy.wait(500)
        //cy.xpath("//div[@class='modal-content']/div[2]/form/div/div[2]/div").type(description)
    }


    static findModalBody() {
        return cy.xpath("//div[@class='modal-content']")
    }

    static typeAccountTypeCaption(caption) {
        //cy.xpath("//cmp-account-type-dialog[@id='accountTypeDialog']/div//div/input[@type='text']").type(caption)

        cy.get('form.ng-pristine > .row > :nth-child(1) > :nth-child(2) > .form-control').type(caption)
    }

    static getAccountTypeCaptionAtAddNewAccount() {
        return cy.get('form.ng-pristine > .row > :nth-child(1) > :nth-child(2) > .form-control')
    }

    static findTargetCheckbox() {
        //return cy.get('[type="checkbox"]:visible')
        //return cy.xpath("//*[@type='checkbox']")
        return cy.xpath("//*[@class='modal-body']/form/div/div[3]/div/input")
    }


    static findPropertyInput() {
        return cy.xpath("//table[@class='table dataTable table-bordered table-hover']/tfoot/tr/td/input")
    }

    static typeProperty(property) {
        this.findPropertyInput().type(property)
    }

    static findAddPropertyButton() {
        return cy.xpath("//table[@class='table dataTable table-bordered table-hover']/tfoot/tr/td[2]/div/button")

    }

    static findSaveButton() {
        return cy.contains('Save')
    }

    static findSpinnerModal() {
        return cy.get('#spinnerModal > .modal-dialog > .modal-content > .modal-body')
    }

    static getCaptionCellsAtAccountTypesTable() {
        return cy.xpath("//table[@class='table table-bordered table-hover table-striped dataTable no-footer dtr-inline collapsed']/tbody/tr/td[2]")
        // return cy.xpath("//td[@class='sorting_1']")
    }

    static getNextButtonForPaginating() {
        return cy.xpath("//li[contains(@class, 'paginate_button page-item next')]")
    }

    static getCurrentPageButtonNumber() {
        return cy.get('.current')
    }

    static getLastButtonForPaginating() {
        return cy.contains('Last')
    }

    static getFirstButtonForPaginating() {
        return cy.contains('First')
    }

    static getPopUpMessage() {
        return cy.xpath("//*[@class='overlay-container']/div/div/div")
    }



    static clickOnEditAccountTypeButtonByCaption(accountTypeCaption) {


        function goToNextPage() {

            AccountTypes.getNextButtonForPaginating()
                .invoke('attr', 'class')
                .then((klasa) => {
                    if (klasa === 'paginate_button page-item next disabled') {

                        AccountTypes.getCaptionCellsAtAccountTypesTable().each(($el, index, $list) => {

                            let caption = $el.text()

                            if (caption === accountTypeCaption) {

                                cy.log(caption.concat(' exist in table*****')).then(function () {
                                    cy.xpath("//tbody/tr/td[7]/div[1]/button[1]").eq(index).click({ force: true })
                                    //bug ne vidi se edit, zato force

                                    return false

                                }
                                )

                                return false;

                            }
                            else { cy.log(caption) }

                        })

                        cy.log('DONE')

                        //ne ulazim vise u rekurziju, proverila sam tu poslednju stranu, gde jeste disabled klasa  i ne idem dalje
                    }

                    else {
                        AccountTypes.getCaptionCellsAtAccountTypesTable().debug().each(($el, index, $list) => {

                            let caption = $el.text()

                            if (caption === accountTypeCaption) {

                                cy.log(caption.concat(' exist in table*****')).then(function () {

                                    cy.xpath("//tbody/tr/td[7]/div[1]/button[1]").eq(index).click({ force: true })
                                    //bug ne vidi se edit, zato force
                                    return false
                                }
                                )

                                return false;

                            }

                            else { cy.log(caption) }

                        })

                        cy.wait(1000)
                        //**************ulazim u rekurziju jer klasa nije disabled

                        AccountTypes.getNextButtonForPaginating().click({ force: true }).then(goToNextPage) 
                        //force true jer se ne vidi od otvorenog dijaloga, 
                        //ali to znaci da nisam prekinula each, on nastavi kroz tabelu, ali ipak je izvrsio klik na edit trazenog Captiona???
                    }
                })
        }
        goToNextPage()




    }


    static goToNextPageUntillNextButtonIsDisabled() {
        function goToNextPage() {
            AccountTypes.getNextButtonForPaginating()
                .invoke('attr', 'class')
                .then((klasa) => {
                    if (klasa === 'paginate_button page-item next disabled') {
                        cy.log('DONE')
                    }
                    else {
                        cy.wait(1000)


                        AccountTypes.getNextButtonForPaginating().click().then(goToNextPage)
                    }
                })
        }
        goToNextPage()

    }


    static writeDataIfAccountTypeExistsInTable(accountTypeCaption) {
        function goToNextPage() {

            AccountTypes.getNextButtonForPaginating()
                .invoke('attr', 'class')
                .then((klasa) => {
                    if (klasa === 'paginate_button page-item next disabled') {

                        AccountTypes.getCaptionCellsAtAccountTypesTable().each(($el, index, $list) => {

                            let caption = $el.text()

                            if (caption === accountTypeCaption) {
                                cy.writeFile('cypress/fixtures/tableData.json', { accountTypeCaption: caption })

                                cy.log(caption.concat(' exist in table*****')).then(function () {
                                    cy.xpath("//tbody/tr/td[7]/div[1]/button[1]").eq(index).click({ force: true }) //bug ne vidi se edit, zato force
                                }
                                )


                            }
                            else { cy.log(caption) }

                        })

                        cy.log('DONE')
                    }
                    else {
                        AccountTypes.getCaptionCellsAtAccountTypesTable().debug().each(($el, index, $list) => {

                            let caption = $el.text()

                            if (caption === accountTypeCaption) {
                                cy.writeFile('cypress/fixtures/tableData.json', { accountTypeCaption: caption })
                                cy.log(caption.concat(' exist in table*****'))
                            }

                            else { cy.log(caption) }

                        })

                        cy.wait(1000)
                        AccountTypes.getNextButtonForPaginating().click().then(goToNextPage)
                    }
                })
        }
        goToNextPage()

    }


}
module.exports = AccountTypes