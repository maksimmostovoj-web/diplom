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
    await this.userDropdown.click()
    await this.settingsLink.click()
  }

  // Переход на страницу профиля
  async goToProfile() {
    await this.userDropdown.click()
    await this.profileLink.click()
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

  // Клик по статье по заголовку и описанию
  async clickOnArticle(title, about) {
    await this.articleLink(title, about).first().click()
  }

  // Получение имени пользователя
  getUserName() {
    return this.userName
  }

  // Получение заголовка профиля как элемент
  getProfileHeading(name) {
    return this.profileHeading(name)
  }

  // Получение ссылки на статью как элемент
  getArticleLink(title, about) {
    return this.articleLink(title, about)
  }
}
