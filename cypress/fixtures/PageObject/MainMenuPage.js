class MainMenu {


    static getMainMenuList() {
        return cy.xpath("//ul[@role='menu']")


    }

    static getMainMenuAllMembers() {
        return cy.xpath("//ul[@role='menu']//li")
    }


    static getSpinner() {
        return cy.get('#spinnerModal')
    }

    static getDashboardlink() {

        return MainMenu.getMainMenuList().contains('Dashboard')

    }

    static getAccountsMainlink() {

        return MainMenu.getMainMenuList().contains('Accounts')

    }

    static getEventsMainlink() {

        return MainMenu.getMainMenuList().contains('Events')

    }



    static getDomainsMainlink() {

        return MainMenu.getMainMenuList().contains('Domains')

    }

    static getSettingsMainlink() {

        return MainMenu.getMainMenuList().contains('Settings')

    }

    static getUserManagementlink() {

        return MainMenu.getMainMenuList().contains('User Management')

    }

    static getUserIconButton() {
        return cy.xpath("//img[@class='rounded-circle change-pointer']")
    }

    static getLogoutButton() { return cy.contains('Log Out') }



    static getAccountTypesLink() {
        return MainMenu.getMainMenuAllMembers().contains(' Account Types ')

    }
    static getSubAccountsLink() {
        return cy.get(':nth-child(2) > .has-treeview > :nth-child(3) > .nav-item > .nav-link > p')
    }

    static getSubmitEventLink() {
        return MainMenu.getMainMenuAllMembers().contains('Submit Event')
    }

static getSubEventsLink()
{return cy.get(':nth-child(3) > .has-treeview > :nth-child(3) > .nav-item > .nav-link')}


}
module.exports = MainMenu