const { test: base } = require('@playwright/test')
const { Api } = require('../../services/api.facade')

const test = base.extend({
  api: async ({ request }, use) => {
    const api = new Api(request)
    await use(api)
  },

  challengerToken: async ({ request }, use) => {
    const api = new Api(request)
    const response = await api.challengerService.post()
    const token = response.headers()['x-challenger']
    await use(token)
  }
})

module.exports = { test }

//Для вывода токена и ссылки в ui
/*
const { test: base } = require('@playwright/test');
const { Api } = require('../../services/api.facade');

const test = base.extend({
  api: async ({ request }, use) => {
    const api = new Api(request);
    await use(api);
  },

  challengerToken: async ({ request }, use) => {
    const api = new Api(request);
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
