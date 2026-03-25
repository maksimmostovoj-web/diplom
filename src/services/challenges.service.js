class ChallengesService {
  constructor(request) {
    this.request = request
    this.apiURL = 'https://apichallenges.eviltester.com/'
  }

  async get(token) {
    const response = await this.request.get(`${this.apiURL}challenges`, {
      headers: { 'x-challenger': token }
    })
    return response
  }
}

module.exports = { ChallengesService }
