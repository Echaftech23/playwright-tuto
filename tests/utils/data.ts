
// Registration test credentials
export const registerCredentials = {
  valid: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe." + Date.now() + "@example.com",
    password: "Password123!",
    confirmPassword: "Password123!",
  },
  invalidEmail: {
    firstName: "Jane",
    lastName: "Smith",
    email: "invalid-email-format",
    password: "Password123!",
    confirmPassword: "Password123!",
  },
  passwordMismatch: {
    firstName: "Bob",
    lastName: "Johnson",
    email: "bob.johnson." + Date.now() + "@example.com",
    password: "Password123!",
    confirmPassword: "DifferentPassword123!",
  },
  weakPassword: {
    firstName: "Alice",
    lastName: "Brown",
    email: "alice.brown." + Date.now() + "@example.com",
    password: "123",
    confirmPassword: "123",
  },
  empty: {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  },
  existingEmail: {
    firstName: "Test",
    lastName: "User",
    email: "zurid@mailinator.com", // Using existing email from login fixtures
    password: "Password123!",
    confirmPassword: "Password123!",
  },
};


// Login test credentials 
export const loginCredentials = {
  valid: {
    email: 'zurid@mailinator.com',
    password: 'zurid@mailinator.com123!'
  },
  invalid: {
    email: 'invalid@example.com',
    password: 'wrongpassword'
  },
  invalidEmail: {
    email: 'invalid-email-format',
    password: 'password123'
  },
  empty: {
    email: '',
    password: ''
  }
};

// Product test data
export const productTestData = {
  jackets: {
    category: "Men > Tops > Jackets",
    expectedUrl: "https://magento.softwaretestingboard.com/men/tops-men/jackets-men.html",
    sizes: ["XS", "S", "M", "L", "XL"],
    defaultSize: "M",
    defaultQuantity: 1,
  },
  cartValidation: {
    successMessage: "You added",
    cartItemAdded: "added to your shopping cart",
  },
};