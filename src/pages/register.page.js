export class RegisterPage {
  constructor(page) {
    this.page = page
    
    // Локаторы формы регистрации
    this.nameInput = page
      .getByRole('textbox', { name: 'Your Name' })
      .describe('Поле ввода имени')
    this.emailInput = page
      .getByRole('textbox', { name: 'Email' })
      .describe('Поле ввода email')
    this.passwordInput = page
      .getByRole('textbox', { name: 'Password' })
      .describe('Поле ввода пароля')
    this.signupButton = page
      .getByRole('button', { name: 'Sign up' })
      .describe('Кнопка регистрации')
  }

  // Регистрация нового пользователя
  async register(name, email, password) {
    await this.nameInput.fill(name)      // Ввод имени
    await this.emailInput.fill(email)    // Ввод email
    await this.passwordInput.fill(password) // Ввод пароля
    await this.signupButton.click()      // Нажатие кнопки регистрации
  }
}