describe('Create Event Page Novo.Fractal', () => {
    const baseUrl = 'https://admin-novo.fractal.vn/dashboard';

    beforeEach(() => {
        cy.visit(baseUrl);
        cy.get('input[placeholder="Username"]').type('admin');
        cy.get('input[name="password"]').type('123456');
        cy.contains('button','Login').click();
        cy.url().should('include', '/dashboard'); //include dashboard in URL and not.include assert it not on URL we need
    });
    it('Check Edit and Event Link and Search', () => {
        cy.contains('Event Management').click();
       //Check if event is created successfully
    cy.contains('th.ant-table-cell', 'Event Code')
      .parents('table')
      .find('td.ant-table-cell')
      .contains('EV_2025_07_162')
      .parent()
      .find('button:has(i.anticon-edit)')
      .click();

    //change description
    cy.get('iframe[title="Editable area. Press F10 for toolbar."]').then($iframe => {
            const body = $iframe.contents().find('body');
            cy.wrap(body).clear().type(
                'Chào mừng đến với [Tên Sự Kiện]!\n\n'
            );
        });
    cy.contains('button', 'Save').click();
    //Event Link
    cy.contains('th.ant-table-cell', 'Event Code')
      .parents('table')
      .find('td.ant-table-cell')
      .contains('EV_2025_07_162') // chọn hàng cụ thể theo Event Code
      .parent()
      .find('button:has(i.anticon-link)') // chọn button link ở bên phải
      .click();

    // Đóng modal sau khi mở
    cy.get('button.ant-modal-close').click();

    // Kiểm tra modal đã đóng
    cy.get('div.ant-modal-content').should('not.exist');
    //Check Search
    cy.get('input[placeholder="Search (code, name)"]').type('EV_2025_07_162');
    //Event Type
    cy.get('.ant-select-selector')
    .eq(0)
    .click({ force: true });
    cy.get('nz-option-item').contains('Internal').click();
    //Public Event
    cy.get('.ant-select-selector')
    .eq(1)
    .click({ force: true });
    cy.get('nz-option-item').contains('Yes').click();
    //Apply
    cy.contains('button', 'Apply').click();
    //verify 
    cy.get('table tbody tr').first()
    .find('td.ant-table-cell')
    .should('contain.text', 'EV_2025_07_162');
    });
})