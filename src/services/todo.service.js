class TodoService {
  constructor(request, baseURL) {
    this.request = request
    this.baseURL = baseURL
  }

  async get(token) {
    const response = await this.request.get(`${this.baseURL}todo`, {
      headers: { 'x-challenger': token }
    })
    return response
  }
}

module.exports = { TodoService }
