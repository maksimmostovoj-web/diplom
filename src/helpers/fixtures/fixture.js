import { test as base, expect } from '@playwright/test'
import { App } from '../../pages/app.page.js'
import { UserBuilder } from '../builders/index.js'

export const test = base.extend({
  // Базовая фикстура приложения
  app: async ({ page }, use) => {
    const app = new App(page)
    await use(app)
  },

  // Фикстура авторизованного пользователя
  registredUser: async ({ app }, use) => {
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
  },

  // Фикстура страницы профиля пользователя
  userProfilePage: async ({ app }, use) => {
    const user = new UserBuilder().withEmail().withName().withPassword().build()
    const { email, name, password } = user

    await app.mainPage.open('/')
    await app.mainPage.gotoRegister()
    await app.registerPage.register(name, email, password)
    await app.mainPage.open(`/#/profile/${name}`)
    await use({ app, user, page: app.page })
  },

  // Фикстура для создания пользователя с ролью
  createWithRole: async ({}, use) => {
    const user = (role = 'user') => ({
      name: 'Test User',
      role: role
    })
    await use(user)
  }
})
