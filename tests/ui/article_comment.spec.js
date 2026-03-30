import { test } from '../../src/helpers/fixtures/fixture.js'
import { expect } from '@playwright/test'
import { ArticleBuilder } from '../../src/helpers/builders/article.builder.js'

test('Пользователь оставляет комментарий к статье', async ({
  registredUser
}) => {
  const { app } = registredUser
  // Генерация тестовых данных для статьи
  const article = new ArticleBuilder()
    .withTitle()
    .withAbout()
    .withContent()
    .withTags()
    .build()
  const { title, about, content, tags } = article
  // Генерация текста комментария
  const commentText = new ArticleBuilder().withComment().build().comment

  // Создание статьи
  await app.articlePage.createArticle(title, about, content, tags)
  await expect(app.articlePage.getArticleHeading(title)).toBeVisible()

  // Добавление комментария к созданной статье
  await app.articlePage.addComment(commentText)

  // Проверка, что комментарий отображается
  await expect(app.articlePage.getCommentText(commentText)).toBeVisible()
})
