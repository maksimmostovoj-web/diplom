import { test } from '../../src/helpers/fixtures/fixture.js'
import { expect } from '@playwright/test'
import { ArticleBuilder } from '../../src/helpers/builders/article.builder.js'

test('Пользователь создает новую статью', async ({ registredUser }) => {
  const { app } = registredUser
  // Генерация тестовых данных для статьи
  const article = new ArticleBuilder()
    .withTitle()
    .withAbout()
    .withContent()
    .withTags()
    .build()
  const { title, about, content, tags } = article

  // Создание статьи через форму
  await app.articlePage.createArticle(title, about, content, tags)

  // Проверка, что статья успешно создана
  await expect(app.articlePage.getArticleHeading(title)).toBeVisible()

  // Переход в профиль и проверка отображения статьи
  await app.homePage.goToProfile()
  await expect(app.homePage.getArticleLink(title, about)).toBeVisible()
})
