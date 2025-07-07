describe('Create Event Page Novo.Fractal', () => {
    const baseUrl = 'https://admin-novo.fractal.vn/dashboard';

    beforeEach(() => {
        cy.visit(baseUrl);
        cy.get('input[placeholder="Username"]').type('admin');
        cy.get('input[name="password"]').type('123456');
        cy.contains('button','Login').click();
        cy.url().should('include', '/dashboard'); //include dashboard in URL and not.include assert it not on URL we need
    });

    it('Create Event successfully with valid data', () => {
        cy.contains('Event Management').click();
        cy.contains('button', 'Create').click();

        //Event Type
        cy.get('nz-select[formcontrolname="type"]').click();
        cy.get('nz-option-item').contains('Internal').click();
        
        //Register Form
        cy.get('lazy-select[formcontrolname="form_id"]').click();
        cy.get('nz-option-item').contains('FM_2025_03_012 - test auto cmp').click();
        
        //Event Name
        cy.get('input[placeholder="Name"]').type('Event Test Automation');
        
        //Short Name
        cy.get('input[placeholder="Short Name"]').type('ETA');

        //Event Location
        cy.get('input[nz-input][formcontrolname="location"]').type('HoChiMinh, Vietnam');

        //Image
        cy.get('input[type="file"]').selectFile('cypress/fixtures/Frieren.jpg', { force: true });

        //Start Time
        cy.get('nz-date-picker[formcontrolname="started_at"]').type('2025-07-09 17:03:53');
        cy.contains('button', 'Ok').click();

        //End Time
        cy.get('nz-date-picker[formcontrolname="ended_at"]').type('2025-07-10 19:20:21');
        cy.contains('button', 'Ok').click();

        //Description
        cy.get('iframe[title="Editable area. Press F10 for toolbar."]').then($iframe => {
            const body = $iframe.contents().find('body');
            cy.wrap(body).clear().type(
                'Chào mừng đến với [Tên Sự Kiện]!\n\n' +
                'Chúng tôi rất vui mừng được chào đón bạn đến với sự kiện [Tên sự kiện], nơi hội tụ của những con người đầy đam mê, sáng tạo và đổi mới. Đây là dịp để chúng ta cùng nhau khám phá những ý tưởng mới, kết nối những cộng đồng năng động, và tạo ra những giá trị tích cực cho tương lai.\n\n' +
                '📅 Thời gian và địa điểm\n'
            );
        });

        //public Event
        cy.get('nz-switch[formcontrolname="is_public"]').click();

        //Publish At
        cy.get('nz-date-picker[formcontrolname="publish_at"]').type('2025-07-09 17:03:53');
        cy.contains('button', 'Ok').click();
        cy.get('nz-input-number[formcontrolname="registration_expire_days"]').type('20:00:00');
        cy.get('nz-date-picker[formcontrolname="registration_expire_at"]').type('00:00:00');
        //required check-in distance
        cy.get('nz-switch[formcontrolname="require_location"]').click();
        
        //Latitude and Longitude
        cy.get('nz-input-number[formcontrolname="latitude"]').type('10.7761');
        cy.get('nz-input-number[formcontrolname="longitude"]').type('106.695');
        //Check-in distance
        cy.get('nz-switch[formcontrolname="is_check_in"]').click();

        cy.get('lazy-select[formcontrolname="organizer_ids"]').click();
        cy.get('nz-option-item').contains('123456789 - lecheckin').click();
        cy.get('nz-option-item').contains('00009 - owakamo').click();
        cy.get('nz-option-item').contains('O002 - otest').click();

        //send before the day "x"
        cy.get('nz-input-number[formcontrolname="invite_days_before"]').type('10');

        //reminder
        cy.get('button[nz-button][nztype="primary"]').contains('Add Reminder').click();
        cy.get('nz-input-number[formcontrolname="reminder_days_before"]').type('2');
        cy.get('button.ant-btn.ant-btn-p(rimary').contains('Save').click;

        //Save Event
        cy.contains('button', 'Save').click();
        //Verify Event Created
        cy.contains('td.ant-table-cell', 'EV_2025_07_162').should('exist');
    });
})