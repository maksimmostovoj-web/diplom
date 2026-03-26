import { test } from '../src/helpers/fixtures/fixture.js'

import * as allure from 'allure-js-commons'
import { faker } from '@faker-js/faker'

test('Пользователь может изменить свое имя в профиле', async ({
  registredUser
}) => {
  // Привязка к тест-кейсу в TMS
  await allure.tms('TMS-456', 'Related TMS issue')

  const { app } = registredUser
  // Генерация нового имени
  const newVersionName = faker.person.fullName()

  // Переход в настройки и обновление имени
  await app.homePage.goToSettings()
  await app.settingsPage.updateName(newVersionName)

  // Проверка, что имя изменилось в навигации
  await app.homePage.expectProfileNameToBe(newVersionName)

  // Переход в профиль и проверка отображения нового имени
  await app.homePage.goToProfile()
  await app.homePage.expectProfileHeadingToBeVisible(newVersionName)
})

test('Пользователь создает новую статью', async ({ registredUser }) => {
  const { app } = registredUser
  // Генерация тестовых данных для статьи
  const article = app.createArticle()
  const { title, about, content, tags } = article

  // Создание статьи через форму
  await app.articlePage.createArticle(title, about, content, tags)

  // Проверка, что статья успешно создана
  await app.articlePage.expectArticleCreated(title)

  // Переход в профиль и проверка отображения статьи
  await app.homePage.goToProfile()
  await app.homePage.expectArticleToBeVisible(title, about)
})

test('Пользователь оставляет комментарий к статье', async ({
  registredUser
}) => {
  const { app } = registredUser
  // Генерация тестовых данных для статьи
  const article = app.createArticle()
  const { title, about, content, tags } = article
  // Генерация текста комментария
  const commentText = faker.lorem.sentence()

  // Создание статьи
  await app.articlePage.createArticle(title, about, content, tags)
  await app.articlePage.expectArticleCreated(title)

  // Добавление комментария к созданной статье
  await app.articlePage.addComment(commentText)

  // Проверка, что комментарий отображается
  await app.articlePage.expectCommentAdded(commentText)
})

test('Пользователь редактирует статью', async ({ registredUser }) => {
  const { app } = registredUser
  // Генерация тестовых данных для статьи
  const article = app.createArticle()
  const { title, about, content, tags, updatedTitle, updatedAbout } = article

  // Создание исходной статьи
  await app.articlePage.createArticle(title, about, content, tags)
  await app.articlePage.expectArticleCreated(title)

  // Переход в профиль и открытие созданной статьи
  await app.homePage.goToProfile()
  await app.homePage.clickOnArticle(title, about)

  // Редактирование статьи (обновление заголовка и описания)
  await app.articleEditPage.editArticle(updatedTitle, updatedAbout, 0)

  // Проверка, что статья обновлена
  await app.articlePage.expectArticleCreated(updatedTitle)

  // Проверка, что обновленная статья отображается в профиле
  await app.homePage.goToProfile()
  await app.homePage.expectArticleToBeVisible(updatedTitle, updatedAbout)
})

test('Пользователь удаляет статью', async ({ registredUser }) => {
  const { app } = registredUser
  // Генерация тестовых данных для статьи
  const article = app.createArticle()
  const { title, about, content, tags } = article

  // Создание статьи
  await app.articlePage.createArticle(title, about, content, tags)
  await app.articlePage.expectArticleCreated(title)

  // Удаление созданной статьи
  await app.articleEditPage.deleteArticle(0)

  // Проверка, что статья исчезла из профиля
  await app.homePage.goToProfile()
  await app.homePage.expectArticleNotToBeVisible(title, about)
})
