describe('Login and Perform Additional Steps', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        cy.visit('https://techaway.phungnnl.dev/login');
    });

    it('Customer should be able to log in and order a service', () => {
        // Login steps
        cy.get('#username').type('Bashi');
        cy.get('#password').type('Hello@123');
        cy.contains('button', 'Sign in').click();

        cy.url().should('include', '/dashboard');

        //Visit services menu
        cy.visit('https://techaway.phungnnl.dev/services');

        //Order a service
        cy.contains('div', 'IT Security').click();
        cy.contains('button', 'Add to Cart').click();
        cy.contains('button', 'Cart').click();
        cy.get('#shopping-cart-popper')
            .should('be.visible')
            .and('contain', 'IT Security');
        // Proceed to checkout
        cy.contains('a', 'Go to Checkout').click();

        //Navigate to dashbaord
        cy.contains('a', 'Dashboard').click();
        cy.url().should('include', '/dashboard');

        //Navigate to Mange tickets and check the created ticket
        cy.contains('span', 'Manage Tickets').click();
        cy.contains('div', 'low').click();

        //Check ticket details
        cy.contains('h5', 'Ticket Details');

        //Log out
        cy.contains('div', 'Logout').click();


    });
});