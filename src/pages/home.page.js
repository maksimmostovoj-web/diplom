class HomePage {
  constructor(page) {
    this.page = page

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

  async goToSettings() {
    await this.userDropdown.click()
    await this.settingsLink.click()
  }

  async goToProfile() {
    await this.userDropdown.click()
    await this.profileLink.click()
  }

  articleLink(title, about) {
    return this.page
      .locator('a.preview-link')
      .filter({ hasText: title })
      .filter({ hasText: about })
      .describe(`Ссылка на статью "${title}"`)
  }

  profileHeading(name) {
    return this.page
      .getByRole('heading', { name })
      .describe(`Заголовок профиля "${name}"`)
  }

  async clickOnArticle(title, about) {
    await this.articleLink(title, about).first().click()
  }

  getUserName() {
    return this.userName
  }

  getProfileHeading(name) {
    return this.profileHeading(name)
  }

  getArticleLink(title, about) {
    return this.articleLink(title, about)
  }
}

module.exports = { HomePage }
