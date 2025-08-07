import { Page, Locator } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly menMenuDropdown: Locator;
  readonly topsSubmenu: Locator;
  readonly jacketsSubmenu: Locator;
  readonly productItems: Locator;
  readonly addToCartButtons: Locator;
  readonly sizeOptions: Locator;
  readonly colorOptions: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly cartIcon: Locator;
  readonly cartCounter: Locator;
  readonly successMessage: Locator;
  readonly consent: Locator;

  constructor(page: Page) {
    this.page = page;

    // Navigation elements
    this.menMenuDropdown = page.locator("#ui-id-5");
    this.topsSubmenu = page.locator("#ui-id-17");
    this.jacketsSubmenu = page.locator("#ui-id-19");

    // Product listing elements
    this.productItems = page.locator(".item.product.product-item");
    this.addToCartButtons = page.locator(".action.tocart.primary");

    // Product detail elements
    this.sizeOptions = page.locator(".swatch-option.text");
    this.colorOptions = page.locator(".swatch-option.color");
    this.quantityInput = page.locator("#qty");
    this.addToCartButton = page.locator("#product-addtocart-button");

    // Cart elements
    this.cartIcon = page.locator(".action.showcart");
    this.cartCounter = page.locator(".counter-number");
    this.successMessage = page.locator('[data-ui-id="message-success"]');

    // Consent
    this.consent = page.locator('[class="fc-button-label"]');
  }

  /**
   * Navigate to Men > Tops > Jackets category
   */
  async navigateToMenJackets() {
    await this.menMenuDropdown.hover();
    await this.topsSubmenu.hover();
    await this.jacketsSubmenu.click();
  }

  /**
   * Get all product items on the page
   */
  async getProductItems() {
    await this.productItems.first().waitFor();
    return await this.productItems.all();
  }

  /**
   * Click on a specific product by index
   * @param index - Product index (0-based)
   */
  async clickProduct(index: number = 0) {
    const products = await this.getProductItems();
    if (products[index]) {
      await products[index].click();
    }
  }

  /**
   * Select product size
   * @param size - Size text (e.g., "M", "L", "XL")
   */
  async selectSize(size: string) {
    await this.sizeOptions.filter({ hasText: size }).first().click();
  }

  /**
   * Select product color by index
   * @param index - Color option index (0-based)
   */
  async selectColor(index: number = 0) {
    const colors = await this.colorOptions.all();
    if (colors[index]) {
      await colors[index].click();
    }
  }

  /**
   * Set product quantity
   * @param quantity - Quantity number
   */
  async setQuantity(quantity: number) {
    await this.quantityInput.fill(quantity.toString());
  }

  /**
   * Add product to cart (from product detail page)
   */
  async addToCart() {
    await this.addToCartButton.click();
  }

  /**
   * Complete product selection and add to cart
   * @param size - Product size
   * @param colorIndex - Color option index
   * @param quantity - Quantity
   */
  async addProductToCart(
    size: string = "M",
    colorIndex: number = 0,
    quantity: number = 1
  ) {
    await this.selectSize(size);
    await this.selectColor(colorIndex);
    await this.setQuantity(quantity);
    await this.addToCart();
  }

  /**
   * Check if product was successfully added to cart
   */
  async isProductAddedToCart(): Promise<boolean> {
    try {
      await this.successMessage.waitFor({ timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get cart counter value
   */
  async getCartCount(): Promise<number> {
    try {
      const cartText = await this.cartCounter.textContent();
      return parseInt(cartText || "0");
    } catch {
      return 0;
    }
  }

  /**
   * Get success message text
   */
  async getSuccessMessage(): Promise<string> {
    if (await this.successMessage.isVisible()) {
      return (await this.successMessage.textContent()) || "";
    }
    return "";
  }
}
