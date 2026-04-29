const { faker } = require('@faker-js/faker')

class TodoBuilder {
  addTitle(title) {
    this.title = title ?? faker.lorem.words(3)
    return this
  }

  addDescription(description) {
    this.description = description ?? faker.lorem.sentence()
    return this
  }

  addStatus(status) {
    this.doneStatus = status ?? false
    return this
  }

  addInvalidDoneStatus() {
    this.doneStatus = 'not-a-boolean'
    return this
  }

  generate() {
    return { ...this }
  }
}

module.exports = { TodoBuilder }
