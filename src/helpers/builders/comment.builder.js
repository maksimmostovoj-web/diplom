const { faker } = require('@faker-js/faker')

class CommentBuilder {
  withComment(comment) {
    this.comment = comment ?? faker.lorem.sentence()
    return this
  }

  build() {
    return { ...this }
  }
}

module.exports = { CommentBuilder }
