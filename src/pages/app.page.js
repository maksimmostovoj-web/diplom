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
}
