class TodosService {
  constructor(request, baseURL) {
    this.request = request
    this.baseURL = baseURL
  }

  // Получение всех задач
  async get(token) {
    const response = await this.request.get(`${this.baseURL}todos`, {
      headers: { 'x-challenger': token }
    })
    return response
  }

  // Получение задачи по ID
  async getById(token, id) {
    const response = await this.request.get(`${this.baseURL}todos/${id}`, {
      headers: { 'x-challenger': token }
    })
    return response
  }

  // Получение задач с фильтром
  async getByFilter(token, filter) {
    const response = await this.request.get(`${this.baseURL}todos?${filter}`, {
      headers: { 'x-challenger': token }
    })
    return response
  }

  // Получение только заголовков для todos
  async head(token) {
    const response = await this.request.head(`${this.baseURL}todos`, {
      headers: { 'x-challenger': token }
    })
    return response
  }

  // Создание новой задачи
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

  // Обновление задачи (POST /todos/{id})
  async update(token, id, payload) {
    const response = await this.request.post(`${this.baseURL}todos/${id}`, {
      headers: { 'x-challenger': token },
      data: payload
    })
    return response
  }

  // Полное обновление задачи (PUT)
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

  // Удаление задачи
  async delete(token, id) {
    const response = await this.request.delete(`${this.baseURL}todos/${id}`, {
      headers: { 'x-challenger': token }
    })
    return response
  }
}

module.exports = { TodosService }
