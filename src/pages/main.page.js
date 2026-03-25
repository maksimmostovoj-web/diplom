import { test } from '@playwright/test'

export class MainPage {
  constructor(page) {
    this.page = page
    // Локаторы главной страницы
    this.signupLink = page
      .getByRole('link', { name: 'Sign up' })
      .describe('Кнопка/ссылка зарегистрироваться')
  }

  // Переход на страницу регистрации
  async gotoRegister() {
    return test.step('Перейти на страницу Регистрации', async () => {
      await this.signupLink.click()
    })
  }

  // Открытие главной страницы
  async open(url) {
    return test.step(`Перейти на страницу ${url}`, async () => {
      await this.page.goto(url)
    })
  }
}
