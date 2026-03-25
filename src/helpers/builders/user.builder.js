import { faker } from '@faker-js/faker'

export class UserBuilder {
  // Установка email пользователя
  withEmail(email) {
    this.email = email ?? faker.internet.email({ provider: 'qa.guru' })
    return this
  }

  // Установка имени пользователя
  withName(name) {
    this.name = name ?? faker.person.fullName()
    return this
  }

  // Установка пароля пользователя
  withPassword(length = 10) {
    this.password = faker.internet.password({ length: length })
    return this
  }

  // Сборка объекта пользователя
  build() {
    return { ...this }
  }
}
