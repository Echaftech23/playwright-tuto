import { Page, Locator } from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;
  readonly generalError: Locator;
  readonly contactInfo: Locator;
  readonly consent: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator("#email");
    this.passwordInput = page.locator('#pass[name="login[password]"]');
    this.signInButton = page.getByRole("button", { name: /^Sign In$/ });
    this.emailError = page.locator("#email-error");
    this.passwordError = page.locator("#pass-error");
    this.generalError = page.locator(
      '.message-error div[data-bind="html: $parent.prepareMessageForHtml(message.text)"]'
    );
    this.contactInfo = page.locator(".box.box-information .box-content p");
    this.consent = page.locator('[class="fc-button-label"]');
  }

  /**
   * Perform login with email and password
   * @param email - User email address
   * @param password - User password
   */
  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.clickSignIn();
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
   * Click the Sign In button
   */
  async clickSignIn() {
    await this.signInButton.click();
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
   * Get general error message
   */
  async getGeneralError(): Promise<string> {
    if (await this.generalError.isVisible()) {
      return (await this.generalError.textContent()) || "";
    }
    return "";
  }

  /**
   * Get contact information displayed after login
   */
  async getContactInfo(): Promise<string> {
    if (await this.contactInfo.isVisible()) {
      return (await this.contactInfo.textContent()) || "";
    }
    return "";
  }

  /**
   * Wait for error messages to appear
   */
  async waitForErrors() {
    await this.page.waitForTimeout(2000);
  }
}
