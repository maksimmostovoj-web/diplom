class ArticlePage {
  constructor(page) {
    this.page = page

    // Локаторы для создания статьи
    this.newArticleLink = page
      .getByRole('link', { name: ' New Article' })
      .describe('Ссылка на создание новой статьи')
    this.articleTitleInput = page
      .getByRole('textbox', { name: 'Article Title' })
      .describe('Поле ввода заголовка статьи')
    this.articleAboutInput = page
      .getByRole('textbox', { name: "What's this article about?" })
      .describe('Поле ввода описания статьи')
    this.articleContentInput = page
      .getByRole('textbox', { name: 'Write your article (in' })
      .describe('Поле ввода контента статьи')
    this.tagsInput = page
      .getByRole('textbox', { name: 'Enter tags' })
      .describe('Поле ввода тегов')
    this.publishButton = page
      .getByRole('button', { name: 'Publish Article' })
      .describe('Кнопка публикации статьи')

    // Локаторы для комментариев
    this.commentInput = page
      .getByRole('textbox', { name: 'Write a comment...' })
      .describe('Поле ввода комментария')
    this.postCommentButton = page
      .getByRole('button', { name: 'Post Comment' })
      .describe('Кнопка отправки комментария')

    // Локаторы для редактирования/удаления со страницы статьи
    this.editArticleLinks = page
      .getByRole('link', { name: ' Edit Article' })
      .describe('Ссылки на редактирование статьи')
    this.deleteArticleButtons = page
      .getByRole('button', { name: ' Delete Article' })
      .describe('Кнопки удаления статьи')
  }

  // Создание новой статьи
  async createArticle(title, about, content, tags) {
    await this.newArticleLink.click()
    await this.articleTitleInput.fill(title)
    await this.articleAboutInput.fill(about)
    await this.articleContentInput.fill(content)
    await this.tagsInput.fill(tags)
    await this.publishButton.click()
  }

  // Добавление комментария к статье
  async addComment(commentText) {
    await this.commentInput.fill(commentText)
    await this.postCommentButton.click()
  }

  // Получение заголовка статьи как элемент
  getArticleHeading(title) {
    return this.page
      .getByRole('heading', { name: title })
      .describe(`Заголовок статьи "${title}"`)
  }

  // Получение текста комментария как элемент
  getCommentText(text) {
    return this.page.getByText(text).describe(`Текст комментария: "${text}"`)
  }

  // Получение тега как элемент
  getTagElement(tag) {
    return this.page
      .getByRole('listitem')
      .filter({ hasText: tag })
      .describe(`Тег статьи: "${tag}"`)
  }
}

module.exports = { ArticlePage }
