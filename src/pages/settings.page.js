export class SettingsPage {
  constructor(page) {
    this.page = page

    // Локаторы страницы настроек
    this.nameField = page
      .getByRole('textbox', { name: 'Your Name' })
      .describe('Поле ввода имени в настройках')
    this.updateSettingsButton = page
      .getByRole('button', { name: 'Update Settings' })
      .describe('Кнопка обновления настроек')
  }

  // Обновление имени пользователя
  async updateName(newName) {
    await this.nameField.clear() // Очистка поля
    await this.nameField.fill(newName) // Ввод нового имени
    await this.updateSettingsButton.click() // Сохранение изменений
  }
}
