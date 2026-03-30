import { test } from '../../src/helpers/fixtures/fixture.js'
import { expect } from '@playwright/test'
import { ArticleBuilder } from '../../src/helpers/builders/article.builder.js'

test('Пользователь удаляет статью', async ({ registredUser }) => {
  const { app } = registredUser
  // Генерация тестовых данных для статьи
  const article = new ArticleBuilder()
    .withTitle()
    .withAbout()
    .withContent()
    .withTags()
    .build()
  const { title, about, content, tags } = article

  // Создание статьи
  await app.articlePage.createArticle(title, about, content, tags)
  await expect(app.articlePage.getArticleHeading(title)).toBeVisible()

  // Удаление созданной статьи
  await app.articleEditPage.deleteArticle(0)

  // Проверка, что статья исчезла из профиля
  await app.homePage.goToProfile()
  await expect(app.homePage.getArticleLink(title, about)).not.toBeVisible()
})
