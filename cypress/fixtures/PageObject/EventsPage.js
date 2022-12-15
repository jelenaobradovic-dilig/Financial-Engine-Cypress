class EventsPage {



    static getConfirmButtonAtCancelDialog() {
        return cy.xpath('//body[1]/app-root[1]/div[1]/div[1]/div[1]/div[1]/events[1]/cmp-confirm-dialog[1]/div[1]/div[1]/div[3]/button[2]')
    }

    static getTableInfoTextWithNumberOfEvents() {
        return cy.xpath("//body[1]/app-root[1]/div[1]/div[1]/div[1]/div[1]/events[1]/div[2]/div[2]")
    }


    static writeIntoTableDataNumberOfEvents() {
        cy.xpath("//*[@class='dataTables_info']").then(($el) => {
            let text = $el.text().slice(19, -8)
            cy.log(text)
            cy.writeFile('cypress/fixtures/tableData.json', { numberOfEvents: text })

        })
    }


    static compareNumberOfEvents(numberBeforeSubmit, expectedNumberOfCreatedEvents) {

        cy.xpath("//body[1]/app-root[1]/div[1]/div[1]/div[1]/div[1]/events[1]/div[2]/div[2]").should($newNumber => {

            expect(Number($newNumber.text().slice(19, -8))).to.eq(Number(numberBeforeSubmit) + Number(expectedNumberOfCreatedEvents))
        })

    }


    static compareNumberOfEventsForRandomEventType(numberBeforeSubmit) {

        cy.xpath("//body[1]/app-root[1]/div[1]/div[1]/div[1]/div[1]/events[1]/div[2]/div[2]").should($newNumber => {

            expect(Number($newNumber.text().slice(19, -8))).to.be.greaterThan(Number(numberBeforeSubmit))

            //*******Za random event type ne znamo ocekivani broj kreiranim evenata, zato je greater than, 
            //*******a ne sabiramo sa odredjenim brojem kao u prethodnoj metodi */

        })

    }


    static getAccountInputAtSearch() {
        return cy.xpath('//events[1]/div[1]/div[2]/div[1]/div[1]/div[3]//input[1]')
    }


    static getSearchButton() {
        return cy.xpath("//div[@class='mt-3']//button[2]")
    }

    static getEventStateSelectFromSearch() {
        return cy.xpath("//select[@name='eventStateTypeId']")
    }


    static getEventTypeTdsFromTable() {

        return cy.xpath('//tbody/tr/td[3]')
    }

    static getEventStateTypeTdsFromTable() {
        return cy.xpath('//tbody/tr/td[4]')
    }

    static getAccountTdsFromTable() {
        return cy.xpath('//tbody/tr/td[5]')

    }
    static getNoteTdsFromTable() {
        return cy.xpath('//tbody/tr/td[6]')
    }


}
module.exports = EventsPage