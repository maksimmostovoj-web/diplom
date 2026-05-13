const { test: base } = require('@playwright/test')
const { Api } = require('../../services/api.facade.js')

// URL API берется только из переменной окружения
const API_URL = process.env.API_URL || 'https://apichallenges.eviltester.com/'

const test = base.extend({
  api: async ({ request }, use) => {
    const api = new Api(request, API_URL)
    await use(api)
  },

  challengerToken: async ({ request }, use) => {
    const api = new Api(request, API_URL)
    const response = await api.challengerService.post()
    const token = response.headers()['x-challenger']
    await use(token)
  }
})

module.exports = { test }
