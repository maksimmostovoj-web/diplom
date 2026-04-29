const {
  HomePage,
  MainPage,
  RegisterPage,
  SettingsPage,
  ArticlePage,
  ArticleEditPage
} = require('./index.js')

class App {
  constructor(page) {
    this.page = page

    this.mainPage = new MainPage(page)
    this.registerPage = new RegisterPage(page)
    this.homePage = new HomePage(page)
    this.settingsPage = new SettingsPage(page)
    this.articlePage = new ArticlePage(page)
    this.articleEditPage = new ArticleEditPage(page)
  }
}

module.exports = { App }
