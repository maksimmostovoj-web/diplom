const { test } = require('../../src/helpers/fixtures/fixture.js')
const allure = require('allure-js-commons')
const { expect } = require('@playwright/test')
const { UserBuilder } = require('../../src/helpers/builders/index.js')

test('@ui @regression Пользователь может изменить свое имя в профиле', async ({
  registeredUser
}) => {
  await allure.tms('TMS-456', 'Related TMS issue')

  const { app } = registeredUser
  const newVersionName = new UserBuilder().withName().build().name

  await app.homePage.goToSettings()
  await app.settingsPage.updateName(newVersionName)
  await expect(app.homePage.getUserName()).toContainText(newVersionName)
  await app.homePage.goToProfile()
  await expect(app.homePage.getProfileHeading(newVersionName)).toBeVisible()
})
