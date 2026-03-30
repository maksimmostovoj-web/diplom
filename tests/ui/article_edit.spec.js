import { test } from '../../src/helpers/fixtures/fixture.js'
import { expect } from '@playwright/test'
import { ArticleBuilder } from '../../src/helpers/builders/article.builder.js'

test('Пользователь редактирует статью', async ({ registredUser }) => {
  const { app } = registredUser
  // Генерация тестовых данных для статьи
  const article = new ArticleBuilder()
    .withTitle()
    .withAbout()
    .withContent()
    .withTags()
    .withUpdatedTitle()
    .withUpdatedAbout()
    .build()
  const { title, about, content, tags, updatedTitle, updatedAbout } = article

  // Создание исходной статьи
  await app.articlePage.createArticle(title, about, content, tags)
  await expect(app.articlePage.getArticleHeading(title)).toBeVisible()

  // Переход в профиль и открытие созданной статьи
  await app.homePage.goToProfile()
  await app.homePage.clickOnArticle(title, about)

  // Редактирование статьи (обновление заголовка и описания)
  await app.articleEditPage.editArticle(updatedTitle, updatedAbout, 0)

  // Проверка, что статья обновлена
  await expect(app.articlePage.getArticleHeading(updatedTitle)).toBeVisible()

  // Проверка, что обновленная статья отображается в профиле
  await app.homePage.goToProfile()
  await expect(
    app.homePage.getArticleLink(updatedTitle, updatedAbout)
  ).toBeVisible()
})
