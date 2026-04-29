const { test } = require('../../src/helpers/fixtures/fixture.js')
const { expect } = require('@playwright/test')
const {
  ArticleBuilder
} = require('../../src/helpers/builders/article.builder.js')

test('@ui @smoke Пользователь создает новую статью', async ({
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
  await expect(app.page.getByText(content)).toBeVisible()
  await expect(app.articlePage.getTagElement(tags)).toBeVisible()

  await app.homePage.goToProfile()
  await expect(app.homePage.getArticleLink(title, about)).toBeVisible()
})
