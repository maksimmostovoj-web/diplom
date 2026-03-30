import { faker } from '@faker-js/faker'

export class ArticleBuilder {
  // Установка имени пользователя (для проверки имени в профиле)
  withName(name) {
    this.name = name ?? faker.person.fullName()
    return this
  }

  // Установка заголовка статьи
  withTitle(title) {
    this.title = title ?? faker.lorem.words(3)
    return this
  }

  // Установка описания статьи
  withAbout(about) {
    this.about = about ?? faker.lorem.sentence()
    return this
  }

  // Установка контента статьи
  withContent(content) {
    this.content = content ?? faker.lorem.paragraph()
    return this
  }

  // Установка тегов статьи
  withTags(tags) {
    this.tags = tags ?? faker.lorem.word()
    return this
  }

  // Установка обновленного заголовка
  withUpdatedTitle(title) {
    this.updatedTitle = title ?? faker.lorem.words(4)
    return this
  }

  // Установка обновленного описания
  withUpdatedAbout(about) {
    this.updatedAbout = about ?? faker.lorem.sentence()
    return this
  }

  // Установка текста комментария
  withComment(comment) {
    this.comment = comment ?? faker.lorem.sentence()
    return this
  }

  // Сборка объекта статьи
  build() {
    return { ...this }
  }
}
