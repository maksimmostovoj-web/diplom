class ChallengesService {
  constructor(request, baseURL) {
    this.request = request
    this.baseURL = baseURL
  }

  // Получение списка всех челленджей
  async get(token) {
    const response = await this.request.get(`${this.baseURL}challenges`, {
      headers: { 'x-challenger': token }
    })
    return response
  }
}

module.exports = { ChallengesService }
