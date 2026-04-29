const { test } = require('../../src/helpers/fixtures/fixture.js')
const { expect } = require('@playwright/test')
const {
  ArticleBuilder
} = require('../../src/helpers/builders/article.builder.js')

test('@ui @regression Пользователь удаляет статью', async ({
  registeredUser
}) => {
  const { app } = registeredUser
  const article = new ArticleBuilder()
    .withTitle()
    .withAbout()
    .withContent()
    .withTags()
    .build()
  const { title, about, content, tags } = article

  await app.articlePage.createArticle(title, about, content, tags)
  await expect(app.articlePage.getArticleHeading(title)).toBeVisible()
  await app.articlePage.deleteArticleButtons.first().click()
  await app.page.once('dialog', async (dialog) => {
    await dialog.accept()
  })
  await app.homePage.goToProfile()
  await expect(app.homePage.getArticleLink(title, about)).not.toBeVisible()
})
