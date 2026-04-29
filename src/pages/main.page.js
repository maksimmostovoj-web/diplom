const { test } = require('@playwright/test')

class MainPage {
  constructor(page) {
    this.page = page
    this.signupLink = page
      .getByRole('link', { name: 'Sign up' })
      .describe('Кнопка/ссылка зарегистрироваться')
  }

  async gotoRegister() {
    return test.step('Перейти на страницу Регистрации', async () => {
      await this.signupLink.click()
    })
  }

  async open(url) {
    return test.step(`Перейти на страницу ${url}`, async () => {
      await this.page.goto(url)
    })
  }
}

module.exports = { MainPage }
