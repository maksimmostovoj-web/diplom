const { test } = require('../../src/helpers/fixtures/fixture.js')
const { expect } = require('@playwright/test')
const {
  ArticleBuilder
} = require('../../src/helpers/builders/article.builder.js')

test('@ui @regression Пользователь редактирует статью', async ({
  registeredUser
}) => {
  const { app } = registeredUser
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
  await app.articlePage.editArticleLinks.first().click()

  await app.articleEditPage.editArticle(updatedTitle, updatedAbout, 0)
  await expect(app.articlePage.getArticleHeading(updatedTitle)).toBeVisible()
  await app.homePage.goToProfile()
  await expect(
    app.homePage.getArticleLink(updatedTitle, updatedAbout)
  ).toBeVisible()
})
