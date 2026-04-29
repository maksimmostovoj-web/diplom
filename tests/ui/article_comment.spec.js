const { test } = require('../../src/helpers/fixtures/fixture.js')
const { expect } = require('@playwright/test')
const {
  ArticleBuilder,
  CommentBuilder
} = require('../../src/helpers/builders/index.js')

test('@ui @smoke Пользователь оставляет комментарий к статье', async ({
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
  const commentText = new CommentBuilder().withComment().build().comment

  await app.articlePage.createArticle(title, about, content, tags)
  await expect(app.articlePage.getArticleHeading(title)).toBeVisible()
  await app.articlePage.addComment(commentText)
  await expect(app.articlePage.getCommentText(commentText)).toBeVisible()
})
