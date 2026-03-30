import { test } from '../../src/helpers/fixtures/fixture.js'
import * as allure from 'allure-js-commons'
import { expect } from '@playwright/test'
import { ArticleBuilder } from '../../src/helpers/builders/article.builder.js'

test('Пользователь может изменить свое имя в профиле', async ({
  registredUser
}) => {
  // Привязка к тест-кейсу в TMS
  await allure.tms('TMS-456', 'Related TMS issue')

  const { app } = registredUser
  // Генерация нового имени
  const newVersionName = new ArticleBuilder().withName().build().name

  // Переход в настройки и обновление имени
  await app.homePage.goToSettings()
  await app.settingsPage.updateName(newVersionName)

  // Проверка, что имя изменилось в навигации
  await expect(app.homePage.getUserName()).toContainText(newVersionName)

  // Переход в профиль и проверка отображения нового имени
  await app.homePage.goToProfile()
  await expect(app.homePage.getProfileHeading(newVersionName)).toBeVisible()
})
