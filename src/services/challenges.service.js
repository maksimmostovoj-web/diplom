class ChallengesService {
  constructor(request, baseURL) {
    this.request = request
    this.baseURL = baseURL
  }

  async get(token) {
    const response = await this.request.get(`${this.baseURL}challenges`, {
      headers: { 'x-challenger': token }
    })
    return response
  }
}

module.exports = { ChallengesService }
