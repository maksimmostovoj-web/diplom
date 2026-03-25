import { expect } from '@playwright/test'

export class HomePage {
  constructor(page) {
    this.page = page

    // Локаторы навигации
    this.userDropdown = page
      .locator('.dropdown-toggle')
      .describe('Выпадающее меню пользователя')
    this.userName = page
      .locator('.dropdown-toggle')
      .describe('Имя пользователя')
    this.settingsLink = page
      .getByRole('link', { name: ' Settings' })
      .describe('Ссылка на настройки')
    this.profileLink = page
      .getByRole('link', { name: ' Profile' })
      .describe('Ссылка на профиль')
    this.yourFeedTab = page
      .getByRole('link', { name: 'Your Feed' })
      .describe('Вкладка Your Feed')
    this.globalFeedTab = page
      .getByRole('link', { name: 'Global Feed' })
      .describe('Вкладка Global Feed')
  }

  // Переход в настройки профиля
  async goToSettings() {
    await this.userDropdown.click() // Открываем меню пользователя
    await this.settingsLink.click() // Кликаем на настройки
  }

  // Переход на страницу профиля
  async goToProfile() {
    await this.userDropdown.click() // Открываем меню пользователя
    await this.profileLink.click() // Кликаем на профиль
  }

  // Получение ссылки на статью по заголовку и описанию
  articleLink(title, about) {
    return this.page
      .locator('a.preview-link')
      .filter({ hasText: title })
      .filter({ hasText: about })
      .describe(`Ссылка на статью "${title}"`)
  }

  // Получение заголовка профиля
  profileHeading(name) {
    return this.page
      .getByRole('heading', { name })
      .describe(`Заголовок профиля "${name}"`)
  }

  // Проверка, что имя пользователя соответствует ожидаемому
  async expectProfileNameToBe(expectedName) {
    await expect(this.userName).toContainText(expectedName)
    return this
  }

  // Проверка, что имя пользователя отображается
  async expectProfileNameToBeVisible() {
    await expect(this.userName).toBeVisible()
    return this
  }

  // Проверка, что статья отображается
  async expectArticleToBeVisible(title, about) {
    await expect(this.articleLink(title, about)).toBeVisible()
    return this
  }

  // Проверка, что статья не отображается (удалена)
  async expectArticleNotToBeVisible(title, about) {
    await expect(this.articleLink(title, about)).not.toBeVisible()
    return this
  }
}
