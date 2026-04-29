class RegisterPage {
  constructor(page) {
    this.page = page

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

  async register(name, email, password) {
    await this.nameInput.fill(name)
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.signupButton.click()
  }
}

module.exports = { RegisterPage }
