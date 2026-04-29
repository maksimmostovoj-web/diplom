class ChallengerService {
  constructor(request, baseURL) {
    this.request = request
    this.baseURL = baseURL
  }

  async post() {
    const response = await this.request.post(`${this.baseURL}challenger`)
    return response
  }

  async get(guid, token) {
    const response = await this.request.get(
      `${this.baseURL}challenger/${guid}`,
      {
        headers: { 'x-challenger': token }
      }
    )
    return response
  }

  async put(guid, token, payload) {
    const response = await this.request.put(
      `${this.baseURL}challenger/${guid}`,
      {
        headers: { 'x-challenger': token },
        data: payload
      }
    )
    return response
  }
}

module.exports = { ChallengerService }
