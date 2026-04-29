class SettingsPage {
  constructor(page) {
    this.page = page

    this.nameField = page
      .getByRole('textbox', { name: 'Your Name' })
      .describe('Поле ввода имени в настройках')
    this.updateSettingsButton = page
      .getByRole('button', { name: 'Update Settings' })
      .describe('Кнопка обновления настроек')
  }

  async updateName(newName) {
    await this.nameField.clear()
    await this.nameField.fill(newName)
    await this.updateSettingsButton.click()
  }
}

module.exports = { SettingsPage }
