const { faker } = require('@faker-js/faker')

class ArticleBuilder {
  withTitle(title) {
    this.title = title ?? faker.lorem.words(3)
    return this
  }

  withAbout(about) {
    this.about = about ?? faker.lorem.sentence()
    return this
  }

  withContent(content) {
    this.content = content ?? faker.lorem.paragraph()
    return this
  }

  withTags(tags) {
    this.tags = tags ?? faker.lorem.word()
    return this
  }

  withUpdatedTitle(title) {
    this.updatedTitle = title ?? faker.lorem.words(4)
    return this
  }

  withUpdatedAbout(about) {
    this.updatedAbout = about ?? faker.lorem.sentence()
    return this
  }

  build() {
    return { ...this }
  }
}

module.exports = { ArticleBuilder }
