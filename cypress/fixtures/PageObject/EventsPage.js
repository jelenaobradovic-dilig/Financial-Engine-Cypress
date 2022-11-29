class EventsPage {

   

    static getConfirmButtonAtCancelDialog() {
        return cy.xpath('//body[1]/app-root[1]/div[1]/div[1]/div[1]/div[1]/events[1]/cmp-confirm-dialog[1]/div[1]/div[1]/div[3]/button[2]')
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
            // let newNumber = $newNumber.text().slice(19, -8)
            // cy.log(newNumber)
            // let expectedNumber = (Number(numberBeforeSubmit) + Number(expectedNumberOfCreatedEvents))
            // cy.log(expectedNumber)
            // expect(newNumber).to.eq(expectedNumber)
            expect(Number($newNumber.text().slice(19, -8))).to.eq(Number(numberBeforeSubmit) + Number(expectedNumberOfCreatedEvents))
        })

    }


    static compareNumberOfEventsForRandomEventType(numberBeforeSubmit) {

        cy.xpath("//body[1]/app-root[1]/div[1]/div[1]/div[1]/div[1]/events[1]/div[2]/div[2]").should($newNumber => {
            // let newNumber = $newNumber.text().slice(19, -8)
            // cy.log(newNumber)
            // let expectedNumber = (Number(numberBeforeSubmit) + Number(expectedNumberOfCreatedEvents))
            // cy.log(expectedNumber)
            // expect(newNumber).to.eq(expectedNumber)
            expect(Number($newNumber.text().slice(19, -8))).to.be.greaterThan(Number(numberBeforeSubmit))

            //*******Za random event type ne znamo ocekivani broj kreiranim evenata, zato je greater than, 
            //*******a ne sabiramo sa odredjenim brojem kao u prethodnoj metodi */

        })

    }

}
module.exports = EventsPage