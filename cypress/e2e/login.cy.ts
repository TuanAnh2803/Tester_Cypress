describe('Login Page Novo.Fractal', () => {
    const baseUrl = 'https://admin-novo.fractal.vn/login';

    const login = "admin";
    const password = "123456";
    const invalidPassword = "invalidPass";

    beforeEach(() => {
        cy.visit(baseUrl);
    });

    it('Login successfully with valid credentials', () => {
        cy.get('input[placeholder="Username"]').type(login);
        cy.get('input[name="password"]').type(password);
        cy.contains('button','Login').click();

        cy.url().should('not.include', '/login');
         cy.contains('Admin Master').should('be.visible');
    });

    it ('Login fails with invalid username and password', () => {
        
        cy.get('input[placeholder="Username"]').type('login');
        cy.get('input[name="password"]').type(invalidPassword);
        cy.contains('button','Login').click();

        cy.contains('You are not authorized to perform this action.').should('be.visible');
        cy.url().should('include', '/login');
    });

    it ('Cant login with empty username and password', () => {
        cy.get('input[placeholder="Username"]').should('be.empty');
        cy.get('input[name="password"]').should('be.empty');
        cy.contains('button','Login').click();

        cy.contains('This field is required.').should('be.visible');
        cy.url().should('include', '/login');
    });
})