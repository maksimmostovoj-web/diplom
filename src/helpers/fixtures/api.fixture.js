const { test: base } = require('@playwright/test')
const { Api } = require('../../services/api.facade')

const test = base.extend({
  // Фикстура API с базовым URL из конфигурации
  api: async ({ request }, use) => {
    // Получаем baseURL из переменной окружения или используем значение по умолчанию
    const baseURL =
      process.env.API_URL || 'https://apichallenges.eviltester.com/'
    const api = new Api(request, baseURL)
    await use(api)
  },

  // Фикстура для получения токена challenger
  challengerToken: async ({ request }, use) => {
    const baseURL =
      process.env.API_URL || 'https://apichallenges.eviltester.com/'
    const api = new Api(request, baseURL)
    const response = await api.challengerService.post()
    const token = response.headers()['x-challenger']
    await use(token)
  }
})

module.exports = { test }

// Для вывода токена и ссылки в ui
/*
const { test: base } = require('@playwright/test');
const { Api } = require('../../services/api.facade');

const test = base.extend({
  api: async ({ request }, use) => {
    const baseURL = process.env.API_URL || 'https://apichallenges.eviltester.com/';
    const api = new Api(request, baseURL);
    await use(api);
  },

  challengerToken: async ({ request }, use) => {
    const baseURL = process.env.API_URL || 'https://apichallenges.eviltester.com/';
    const api = new Api(request, baseURL);
    const response = await api.challengerService.post();
    const token = response.headers()['x-challenger'];
    
    // Выводим токен и ссылку в консоль
    console.log('\n========================================');
    console.log('Challenger Token:', token);
    console.log('GUI ссылка для просмотра прогресса:');
    console.log(`   https://apichallenges.eviltester.com/gui/challenges/${token}`);
    console.log('========================================\n');
    
    await use(token);
  }
});

module.exports = { test };
*/
