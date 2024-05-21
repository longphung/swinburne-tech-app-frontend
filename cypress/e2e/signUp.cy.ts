describe('Sign Up Test', () => {
    beforeEach(() => {
      cy.clearCookies();
      cy.clearLocalStorage();
      cy.visit('https://techaway.phungnnl.dev/login'); 
      cy.contains('a', 'Sign up').click();
    });
  
    it('should show errors for different password validation scenarios-8 characters, 1 uppercase letter, 1 lowercase letter, and 1 number', () => {
      // Function to fill out the common form fields
      const fillCommonFields = () => {
        cy.get('#username').type('Bashi');
        cy.get('#email').type('bashidewagee@gmail.com');
        cy.get('#address').type('23 Vic Road');
        cy.get('#phone').type('0456765656');
        cy.get('#name').type('BashiD');
      };
  
      // Scenario 1: Passwords do not match
      fillCommonFields();
      cy.get('#password').type('Hello@123');
      cy.get('#confirmPassword').type('Hello@456');
      cy.contains('button', 'Sign up').click();
  
      // Assert that the password mismatch validation error is displayed
      cy.get('#confirmPassword-helper-text')
        .should('be.visible')
        .and('contain', 'Passwords do not match');
  
      // Reset the password fields
      cy.get('#password').clear();
      cy.get('#confirmPassword').clear();
  
      // Scenario 2: Password is less than 8 characters
      cy.get('#password').type('Hello1');
      cy.get('#confirmPassword').type('Hello1');
      cy.contains('button', 'Sign up').click();
  
      // Assert that the password length validation error is displayed
      cy.get('#password-helper-text')
        .should('be.visible')
        .and('contain', 'Password must be at least 8 characters');

        // Reset the password fields
      cy.get('#password').clear();
      cy.get('#confirmPassword').clear();
  
      // Scenario 3: Password Uppercase letter validations
      cy.get('#password').type('hellohello');
      cy.get('#confirmPassword').type('hellohello');
      cy.contains('button', 'Sign up').click();
  
      // Assert that the password length validation error is displayed
      cy.get('#password-helper-text')
        .should('be.visible')
        .and('contain', 'Password must contain at least 1 uppercase letter');
      // Reset the password fields
      cy.get('#password').clear();
      cy.get('#confirmPassword').clear();
  
      // Scenario 4: Password number validations
      cy.get('#password').type('Hellohello');
      cy.get('#confirmPassword').type('Hellohello');
      cy.contains('button', 'Sign up').click();
  
      // Assert that the password length validation error is displayed
      cy.get('#password-helper-text')
        .should('be.visible')
        .and('contain', 'Password must contain at least 1 number');
           // Reset the password fields
      cy.get('#password').clear();
      cy.get('#confirmPassword').clear();
  
      // Scenario 5: Password lower case letters validations
      cy.get('#password').type('HELLOHELLO');
      cy.get('#confirmPassword').type('HELLOHELLO');
      cy.contains('button', 'Sign up').click();
  
      // Assert that the password length validation error is displayed
      cy.get('#password-helper-text')
        .should('be.visible')
        .and('contain', 'Password must contain at least 1 lowercase letter');
    });
    it('should successfully sign up with a valid password', () => {
            // Function to fill out the common form fields
            const fillCommonFields = () => {
              cy.get('#username').type('Bashi');
              cy.get('#email').type('bashidewagee+a@gmail.com');
              cy.get('#address').type('23 Vic Road');
              cy.get('#phone').type('0456765656');
              cy.get('#name').type('BashiD');
            };
        
            // Fill out the common fields
            fillCommonFields();
        
            // Scenario: Successful sign-up
            cy.get('#password').type('Hello@123');
            cy.get('#confirmPassword').type('Hello@123');
            cy.contains('button', 'Sign up').click();
            // Verify sign up success message
            cy.contains('h2', 'Thank you!');
            cy.contains('p', "We've sent an email to your address. Please check your inbox and click the link to confirm your email.");
            cy.contains('button', 'Ok').click();
    });
  });
  