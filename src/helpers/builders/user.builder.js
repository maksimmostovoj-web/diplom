const { faker } = require('@faker-js/faker')

class UserBuilder {
  withEmail(email) {
    this.email = email ?? faker.internet.email({ provider: 'qa.guru' })
    return this
  }

  withName(name) {
    this.name = name ?? faker.person.fullName()
    return this
  }

  withPassword(length = 10) {
    this.password = faker.internet.password({ length: length })
    return this
  }

  build() {
    return { ...this }
  }
}

module.exports = { UserBuilder }
