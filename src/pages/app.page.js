import { faker } from '@faker-js/faker'
import {
  HomePage,
  MainPage,
  RegisterPage,
  SettingsPage,
  ArticlePage,
  ArticleEditPage
} from './index.js'

export class App {
  constructor(page) {
    this.page = page

    // Инициализация всех страниц
    this.mainPage = new MainPage(page)
    this.registerPage = new RegisterPage(page)
    this.homePage = new HomePage(page)
    this.settingsPage = new SettingsPage(page)
    this.articlePage = new ArticlePage(page)
    this.articleEditPage = new ArticleEditPage(page)
  }

  // Генерация тестовых данных для статьи
  createArticle() {
    return {
      title: faker.lorem.words(3),      // Заголовок статьи
      about: faker.lorem.sentence(),     // Описание статьи
      content: faker.lorem.paragraph(),  // Содержимое статьи
      tags: faker.lorem.word(),          // Теги статьи
      updatedTitle: faker.lorem.words(4),     // Обновленный заголовок
      updatedAbout: faker.lorem.sentence()    // Обновленное описание
    }
  }
}