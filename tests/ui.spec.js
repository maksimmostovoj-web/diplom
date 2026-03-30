import { test } from '../src/helpers/fixtures/fixture.js'
import * as allure from 'allure-js-commons'
import { expect } from '@playwright/test'
import { ArticleBuilder } from '../src/helpers/builders/article.builder.js'

test('Пользователь может изменить свое имя в профиле', async ({
  registredUser
}) => {
  await allure.tms('TMS-456', 'Related TMS issue')

  const { app } = registredUser
  const newVersionName = new ArticleBuilder().withName().build().name

  await app.homePage.goToSettings()
  await app.settingsPage.updateName(newVersionName)

  await expect(app.homePage.getUserName()).toContainText(newVersionName)

  await app.homePage.goToProfile()
  await expect(app.homePage.getProfileHeading(newVersionName)).toBeVisible()
})

test('Пользователь создает новую статью', async ({ registredUser }) => {
  const { app } = registredUser
  const article = new ArticleBuilder()
    .withTitle()
    .withAbout()
    .withContent()
    .withTags()
    .build()
  const { title, about, content, tags } = article

  await app.articlePage.createArticle(title, about, content, tags)

  await expect(app.articlePage.getArticleHeading(title)).toBeVisible()

  await app.homePage.goToProfile()
  await expect(app.homePage.getArticleLink(title, about)).toBeVisible()
})

test('Пользователь оставляет комментарий к статье', async ({
  registredUser
}) => {
  const { app } = registredUser
  const article = new ArticleBuilder()
    .withTitle()
    .withAbout()
    .withContent()
    .withTags()
    .build()
  const { title, about, content, tags } = article
  const commentText = new ArticleBuilder().withComment().build().comment

  await app.articlePage.createArticle(title, about, content, tags)
  await expect(app.articlePage.getArticleHeading(title)).toBeVisible()

  await app.articlePage.addComment(commentText)

  await expect(app.articlePage.getCommentText(commentText)).toBeVisible()
})

test('Пользователь редактирует статью', async ({ registredUser }) => {
  const { app } = registredUser
  const article = new ArticleBuilder()
    .withTitle()
    .withAbout()
    .withContent()
    .withTags()
    .withUpdatedTitle()
    .withUpdatedAbout()
    .build()
  const { title, about, content, tags, updatedTitle, updatedAbout } = article

  await app.articlePage.createArticle(title, about, content, tags)
  await expect(app.articlePage.getArticleHeading(title)).toBeVisible()

  await app.homePage.goToProfile()
  await app.homePage.clickOnArticle(title, about)

  await app.articleEditPage.editArticle(updatedTitle, updatedAbout, 0)

  await expect(app.articlePage.getArticleHeading(updatedTitle)).toBeVisible()

  await app.homePage.goToProfile()
  await expect(
    app.homePage.getArticleLink(updatedTitle, updatedAbout)
  ).toBeVisible()
})

test('Пользователь удаляет статью', async ({ registredUser }) => {
  const { app } = registredUser
  const article = new ArticleBuilder()
    .withTitle()
    .withAbout()
    .withContent()
    .withTags()
    .build()
  const { title, about, content, tags } = article

  await app.articlePage.createArticle(title, about, content, tags)
  await expect(app.articlePage.getArticleHeading(title)).toBeVisible()

  await app.articleEditPage.deleteArticle(0)

  await app.homePage.goToProfile()
  await expect(app.homePage.getArticleLink(title, about)).not.toBeVisible()
})
