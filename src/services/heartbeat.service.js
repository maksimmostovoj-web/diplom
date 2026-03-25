class HeartbeatService {
  constructor(request) {
    this.request = request
    this.apiURL = 'https://apichallenges.eviltester.com/'
  }

  async get(token) {
    const response = await this.request.get(`${this.apiURL}heartbeat`, {
      headers: { 'x-challenger': token }
    })
    return response
  }

  async delete(token) {
    const response = await this.request.delete(`${this.apiURL}heartbeat`, {
      headers: { 'x-challenger': token }
    })
    return response
  }

  async postWithOverride(token, methodOverride) {
    const response = await this.request.post(`${this.apiURL}heartbeat`, {
      headers: {
        'x-challenger': token,
        'X-HTTP-Method-Override': methodOverride
      }
    })
    return response
  }
}

module.exports = { HeartbeatService }
