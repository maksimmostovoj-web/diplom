export class ArticleEditPage {
  constructor(page) {
    this.page = page

    // Локаторы для формы редактирования
    this.articleTitleInput = page
      .getByRole('textbox', { name: 'Article Title' })
      .describe('Поле ввода заголовка статьи (редактирование)')
    this.articleAboutInput = page
      .getByRole('textbox', { name: "What's this article about?" })
      .describe('Поле ввода описания статьи (редактирование)')
    this.updateButton = page
      .getByRole('button', { name: 'Update Article' })
      .describe('Кнопка обновления статьи')
  }

  // Редактирование статьи
  async editArticle(title, about, articleIndex = 0) {
    if (title) {
      await this.articleTitleInput.fill(title)
    }

    if (about) {
      await this.articleAboutInput.fill(about)
    }

    await this.updateButton.click()
  }
}
