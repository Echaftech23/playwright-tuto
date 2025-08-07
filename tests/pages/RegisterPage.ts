import { Page, Locator } from "@playwright/test";

export class RegisterPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly firstNameError: Locator;
  readonly lastNameError: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly confirmPasswordError: Locator;
  readonly generalError: Locator;
  readonly contactInfo: Locator;
  readonly consent: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator("#firstname");
    this.lastNameInput = page.locator("#lastname");
    this.emailInput = page.locator("#email_address");
    this.passwordInput = page.locator("#password");
    this.confirmPasswordInput = page.locator("#password-confirmation");
    this.registerButton = page.getByRole("button", {
      name: /^Create an Account$/,
    });

    // Error locators
    this.firstNameError = page.locator("#firstname-error");
    this.lastNameError = page.locator("#lastname-error");
    this.emailError = page.locator("#email_address-error");
    this.passwordError = page.locator("#password-error");
    this.confirmPasswordError = page.locator("#password-confirmation-error");
    this.generalError = page.locator(
      'div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]'
    );
    this.contactInfo = page.locator(".box.box-information .box-content p");
    this.consent = page.locator('[class="fc-button-label"]');
  }

  /**
   * Perform registration with all required fields
   * @param firstName - User first name
   * @param lastName - User last name
   * @param email - User email address
   * @param password - User password
   * @param confirmPassword - Password confirmation
   */
  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmPassword);
    await this.clickCreateAccount();
  }

  /**
   * Fill first name field only
   * @param firstName - User first name
   */
  async fillFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

  /**
   * Fill last name field only
   * @param lastName - User last name
   */
  async fillLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  /**
   * Fill email field only
   * @param email - User email address
   */
  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  /**
   * Fill password field only
   * @param password - User password
   */
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  /**
   * Fill confirm password field only
   * @param confirmPassword - Password confirmation
   */
  async fillConfirmPassword(confirmPassword: string) {
    await this.confirmPasswordInput.fill(confirmPassword);
  }

  /**
   * Click the Create an Account button
   */
  async clickCreateAccount() {
    await this.registerButton.click();
  }

  /**
   * Get first name field error message
   */
  async getFirstNameError(): Promise<string> {
    if (await this.firstNameError.isVisible()) {
      return (await this.firstNameError.textContent()) || "";
    }
    return "";
  }

  /**
   * Get last name field error message
   */
  async getLastNameError(): Promise<string> {
    if (await this.lastNameError.isVisible()) {
      return (await this.lastNameError.textContent()) || "";
    }
    return "";
  }

  /**
   * Get email field error message
   */
  async getEmailError(): Promise<string> {
    if (await this.emailError.isVisible()) {
      return (await this.emailError.textContent()) || "";
    }
    return "";
  }

  /**
   * Get password field error message
   */
  async getPasswordError(): Promise<string> {
    if (await this.passwordError.isVisible()) {
      return (await this.passwordError.textContent()) || "";
    }
    return "";
  }

  /**
   * Get confirm password field error message
   */
  async getConfirmPasswordError(): Promise<string> {
    if (await this.confirmPasswordError.isVisible()) {
      return (await this.confirmPasswordError.textContent()) || "";
    }
    return "";
  }

  /**
   * Get general error message
   */
  async getGeneralError(): Promise<string> {
    if (await this.generalError.isVisible()) {
      return (await this.generalError.textContent()) || "";
    }
    return "";
  }

  /**
   * Get contact information displayed after registration
   */
  async getContactInfo(): Promise<string> {
    await this.contactInfo.waitFor();
    if (await this.contactInfo.isVisible()) {
      return (await this.contactInfo.textContent()) || "";
    }
    return "";
  }

  /**
   * Wait for error messages to appear
   */
  async waitForErrors() {
    await this.page.waitForTimeout(1000);
  }
}
