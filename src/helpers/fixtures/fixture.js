const { test: base, expect } = require('@playwright/test')
const { App } = require('../../pages/app.page.js')
const { UserBuilder } = require('../builders/index.js')

const test = base.extend({
  // Базовая фикстура приложения
  app: async ({ page }, use) => {
    const app = new App(page)
    await use(app)
  },

  // Фикстура авторизованного пользователя
  registeredUser: async ({ app }, use) => {
    // Генерация тестовых данных пользователя
    const user = new UserBuilder().withEmail().withName().withPassword().build()

    const { email, name, password } = user

    // Регистрация нового пользователя
    await app.mainPage.open('/')
    await app.mainPage.gotoRegister()
    await app.registerPage.register(name, email, password)

    // Ожидание успешной авторизации
    await expect(app.homePage.userName).toBeVisible()

    await use({ app, user, page: app.page })
  }
})

module.exports = { test }
