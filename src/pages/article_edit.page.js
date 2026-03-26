import { expect } from '@playwright/test'

export class ArticleEditPage {
  constructor(page) {
    this.page = page

    // Локаторы для редактирования статьи
    this.editArticleLinks = page
      .getByRole('link', { name: ' Edit Article' })
      .describe('Ссылки на редактирование статьи')
    this.deleteArticleButtons = page
      .getByRole('button', { name: ' Delete Article' })
      .describe('Кнопки удаления статьи')

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

    // Локаторы для проверок
    this.editButton = page
      .locator('a')
      .filter({ hasText: 'Edit Article' })
      .describe('Кнопка редактирования статьи')
  }

  // Редактирование статьи
  async editArticle(title, about, articleIndex = 0) {
    await this.editArticleLinks.nth(articleIndex).click()

    if (title) {
      await this.articleTitleInput.fill(title)
    }

    if (about) {
      await this.articleAboutInput.fill(about)
    }

    await this.updateButton.click()
  }

  // Удаление статьи
  async deleteArticle(articleIndex = 0) {
    return new Promise((resolve) => {
      this.page.once('dialog', async (dialog) => {
        await dialog.accept()
        resolve(dialog.message())
      })

      this.deleteArticleButtons.nth(articleIndex).click()
    })
  }

  // Проверка, что кнопка редактирования не отображается (статья удалена)
  async expectEditButtonNotVisible() {
    await expect(this.editButton).not.toBeVisible()
    return this
  }
}
