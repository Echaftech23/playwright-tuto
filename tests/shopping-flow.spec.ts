import { test, expect } from "@playwright/test";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { ProductPage } from "./pages/ProductPage";

import {
  registerCredentials,
  loginCredentials,
  productTestData,
} from "./utils/data";

test.describe("End-to-End User Journey", () => {
  test("Complete E2E Journey: Register → Login → Browse → Add to Cart", async ({
    page,
  }) => {
    const registerPage = new RegisterPage(page);
    const loginPage = new LoginPage(page);
    const productPage = new ProductPage(page);

    // Navigate to registration page
    await page.goto("/customer/account/create/");

    // Fill registration form and submit
    await registerPage.register(
      registerCredentials.valid.firstName,
      registerCredentials.valid.lastName,
      registerCredentials.valid.email,
      registerCredentials.valid.password,
      registerCredentials.valid.confirmPassword
    );

    await expect(page).toHaveURL(/\/customer\/account\//);

    // Verify contact information is displayed
    const contactInfo = await registerPage.getContactInfo();
    expect(contactInfo).toContain(
      `${registerCredentials.valid.firstName} ${registerCredentials.valid.lastName}`
    );
    expect(contactInfo).toContain(registerCredentials.valid.email);

    // Log out before testing login functionality
    await page
      .locator(
        '.header.links button.action.switch[data-action="customer-menu-toggle"]'
      )
      .first()
      .click();

    await page.locator('a[href*="/customer/account/logout/"]').first().click();

    // Navigate to login page
    await page.goto("/customer/account/login/");

    await loginPage.login(
      loginCredentials.valid.email,
      loginCredentials.valid.password
    );

    await expect(page).toHaveURL(/\/customer\/account\//);

    // navigate to Men > Tops > Jackets category
    await productPage.navigateToMenJackets();

    // Verify we're on the jackets page
    await expect(productPage.page).toHaveURL(
      productTestData.jackets.expectedUrl
    );

    // Verify products are loaded
    const products = await productPage.getProductItems();
    expect(products.length).toBeGreaterThan(0);

    await expect(productPage.productItems.first()).toBeVisible();

    // open product detail page when clicking on a product
    await productPage.clickProduct(0);

    await expect(productPage.addToCartButton).toBeVisible();
    await expect(productPage.sizeOptions.first()).toBeVisible();
    await expect(productPage.colorOptions.first()).toBeVisible();

    // require size and color selection before adding to cart
    await productPage.addToCart();

    const isAdded = await productPage.isProductAddedToCart();
    expect(isAdded).toBe(false);

    // add product to cart with valid selections
    const initialCartCount = await productPage.getCartCount();

    // Select size, color and add to cart
    await productPage.addProductToCart(
      productTestData.jackets.defaultSize,
      0,
      productTestData.jackets.defaultQuantity
    );

    const isProductAdded = await productPage.isProductAddedToCart();
    expect(isProductAdded).toBe(true);

    const successMessage = await productPage.getSuccessMessage();
    expect(successMessage).toContain(
      productTestData.cartValidation.successMessage
    );

    // Verify cart count increased
    const newCartCount = await productPage.getCartCount();
    expect(newCartCount).toBe(
      initialCartCount + productTestData.jackets.defaultQuantity
    );
  });
});
