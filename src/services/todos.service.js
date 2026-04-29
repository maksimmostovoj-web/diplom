class TodosService {
  constructor(request, baseURL) {
    this.request = request
    this.baseURL = baseURL
  }

  async get(token) {
    const response = await this.request.get(`${this.baseURL}todos`, {
      headers: { 'x-challenger': token }
    })
    return response
  }

  async getById(token, id) {
    const response = await this.request.get(`${this.baseURL}todos/${id}`, {
      headers: { 'x-challenger': token }
    })
    return response
  }

  async getByFilter(token, filter) {
    const response = await this.request.get(`${this.baseURL}todos?${filter}`, {
      headers: { 'x-challenger': token }
    })
    return response
  }

  async head(token) {
    const response = await this.request.head(`${this.baseURL}todos`, {
      headers: { 'x-challenger': token }
    })
    return response
  }

  async post(token, payload) {
    const response = await this.request.post(`${this.baseURL}todos`, {
      headers: {
        'x-challenger': token,
        'content-type': 'application/json'
      },
      data: payload
    })
    return response
  }

  async update(token, id, payload) {
    const response = await this.request.post(`${this.baseURL}todos/${id}`, {
      headers: { 'x-challenger': token },
      data: payload
    })
    return response
  }

  async put(token, id, payload) {
    const response = await this.request.put(`${this.baseURL}todos/${id}`, {
      headers: {
        'x-challenger': token,
        'content-type': 'application/json'
      },
      data: payload
    })
    return response
  }

  async delete(token, id) {
    const response = await this.request.delete(`${this.baseURL}todos/${id}`, {
      headers: { 'x-challenger': token }
    })
    return response
  }
}

module.exports = { TodosService }
