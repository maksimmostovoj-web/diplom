class HeartbeatService {
  constructor(request, baseURL) {
    this.request = request
    this.baseURL = baseURL
  }

  // Проверка доступности сервиса (GET)
  async get(token) {
    const response = await this.request.get(`${this.baseURL}heartbeat`, {
      headers: { 'x-challenger': token }
    })
    return response
  }

  // Удаление heartbeat (DELETE)
  async delete(token) {
    const response = await this.request.delete(`${this.baseURL}heartbeat`, {
      headers: { 'x-challenger': token }
    })
    return response
  }

  // POST с переопределением метода через X-HTTP-Method-Override
  async postWithOverride(token, methodOverride) {
    const response = await this.request.post(`${this.baseURL}heartbeat`, {
      headers: {
        'x-challenger': token,
        'X-HTTP-Method-Override': methodOverride
      }
    })
    return response
  }
}

module.exports = { HeartbeatService }
