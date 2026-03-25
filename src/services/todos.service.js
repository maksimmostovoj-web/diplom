class TodosService {
  constructor(request) {
    this.request = request
    this.apiURL = 'https://apichallenges.eviltester.com/'
  }

  async get(token) {
    const response = await this.request.get(`${this.apiURL}todos`, {
      headers: { 'x-challenger': token }
    })
    return response
  }

  async getById(token, id) {
    const response = await this.request.get(`${this.apiURL}todos/${id}`, {
      headers: { 'x-challenger': token }
    })
    return response
  }

  async getByFilter(token, filter) {
    const response = await this.request.get(`${this.apiURL}todos?${filter}`, {
      headers: { 'x-challenger': token }
    })
    return response
  }

  async head(token) {
    const response = await this.request.head(`${this.apiURL}todos`, {
      headers: { 'x-challenger': token }
    })
    return response
  }

  async post(token, payload) {
    const response = await this.request.post(`${this.apiURL}todos`, {
      headers: {
        'x-challenger': token,
        'content-type': 'application/json'
      },
      data: payload
    })
    return response
  }

  async update(token, id, payload) {
    const response = await this.request.post(`${this.apiURL}todos/${id}`, {
      headers: { 'x-challenger': token },
      data: payload
    })
    return response
  }

  async put(token, id, payload) {
    const response = await this.request.put(`${this.apiURL}todos/${id}`, {
      headers: {
        'x-challenger': token,
        'content-type': 'application/json'
      },
      data: payload
    })
    return response
  }

  async delete(token, id) {
    const response = await this.request.delete(`${this.apiURL}todos/${id}`, {
      headers: { 'x-challenger': token }
    })
    return response
  }
}

module.exports = { TodosService }
