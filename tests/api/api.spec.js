const { expect } = require('@playwright/test')
const { apiTest } = require('../../src/helpers/fixtures/index.js')
const { TodoBuilder } = require('../../src/helpers/builders/index.js')

apiTest(
  '@api @smoke GET /challenges - получить список челленджей',
  async ({ api, challengerToken }) => {
    const response = await api.challengesService.get(challengerToken)
    const body = await response.json()

    expect(response.status()).toBe(200)
    expect(response.headers()).toEqual(
      expect.objectContaining({ 'x-challenger': challengerToken })
    )
    expect(Array.isArray(body.challenges)).toBe(true)
    expect(body.challenges.length).toBeGreaterThan(0)
  }
)

apiTest(
  '@api @regression GET /todos - получить все задачи',
  async ({ api, challengerToken }) => {
    const response = await api.todosService.get(challengerToken)
    const body = await response.json()

    expect(response.status()).toBe(200)
    expect(Array.isArray(body.todos)).toBe(true)
  }
)

apiTest(
  '@api @regression GET /todo - 404 Not Found',
  async ({ api, challengerToken }) => {
    const response = await api.todoService.get(challengerToken)
    expect(response.status()).toBe(404)
  }
)

apiTest(
  '@api @regression GET /todos/{id} - получить задачу по ID',
  async ({ api, challengerToken }) => {
    const todoBuilder = new TodoBuilder()
      .addTitle()
      .addStatus(false)
      .addDescription()
      .generate()

    const createResponse = await api.todosService.post(
      challengerToken,
      todoBuilder
    )
    const createdTodo = await createResponse.json()

    const response = await api.todosService.getById(
      challengerToken,
      createdTodo.id
    )
    const body = await response.json()

    expect(response.status()).toBe(200)
    expect(body.todos[0]).toMatchObject({
      id: createdTodo.id,
      title: todoBuilder.title,
      description: todoBuilder.description,
      doneStatus: false
    })
  }
)

apiTest(
  '@api @regression GET /todos/{id} - 404 Not Found',
  async ({ api, challengerToken }) => {
    const response = await api.todosService.getById(challengerToken, 999999)
    const body = await response.json()

    expect(response.status()).toBe(404)
    expect(body.errorMessages).toBeTruthy()
  }
)

apiTest(
  '@api @smoke POST /todos - создать новую задачу',
  async ({ api, challengerToken }) => {
    const todoBuilder = new TodoBuilder()
      .addTitle()
      .addStatus(false)
      .addDescription()
      .generate()

    const response = await api.todosService.post(challengerToken, todoBuilder)
    const body = await response.json()

    expect(response.status()).toBe(201)
    expect(body).toMatchObject({
      title: todoBuilder.title,
      description: todoBuilder.description,
      doneStatus: false
    })
    expect(body.id).toBeDefined()
  }
)

apiTest(
  '@api @regression POST /todos - 400 Bad Request (неверный doneStatus)',
  async ({ api, challengerToken }) => {
    const invalidTodo = new TodoBuilder()
      .addTitle()
      .addDescription()
      .addInvalidDoneStatus()
      .generate()

    const response = await api.todosService.post(challengerToken, invalidTodo)
    const body = await response.json()

    expect(response.status()).toBe(400)
    expect(body.errorMessages).toBeTruthy()
  }
)

apiTest(
  '@api @regression PUT /todos/{id} - полное обновление задачи',
  async ({ api, challengerToken }) => {
    const originalTodo = new TodoBuilder()
      .addTitle()
      .addStatus(false)
      .addDescription()
      .generate()

    const createResponse = await api.todosService.post(
      challengerToken,
      originalTodo
    )
    const createdTodo = await createResponse.json()

    const updatedTodoData = new TodoBuilder()
      .addTitle()
      .addStatus(true)
      .addDescription()
      .generate()

    const fullUpdate = {
      title: updatedTodoData.title,
      description: updatedTodoData.description,
      doneStatus: true
    }

    const response = await api.todosService.put(
      challengerToken,
      createdTodo.id,
      fullUpdate
    )
    const updatedTodo = await response.json()

    expect(response.status()).toBe(200)
    expect(updatedTodo).toMatchObject(fullUpdate)
  }
)

apiTest(
  '@api @regression DELETE /todos/{id} - удалить задачу',
  async ({ api, challengerToken }) => {
    const todoToDelete = new TodoBuilder()
      .addTitle()
      .addStatus(false)
      .addDescription()
      .generate()

    const createResponse = await api.todosService.post(
      challengerToken,
      todoToDelete
    )
    const createdTodo = await createResponse.json()

    const deleteResponse = await api.todosService.delete(
      challengerToken,
      createdTodo.id
    )
    expect(deleteResponse.status()).toBe(200)

    const getResponse = await api.todosService.getById(
      challengerToken,
      createdTodo.id
    )
    expect(getResponse.status()).toBe(404)
  }
)

apiTest(
  '@api @regression HEAD /todos - получить только заголовки',
  async ({ api, challengerToken }) => {
    const response = await api.todosService.head(challengerToken)

    expect(response.status()).toBe(200)
    expect(response.headers()).toEqual(
      expect.objectContaining({
        'x-challenger': challengerToken,
        'content-type': expect.stringContaining('application/json')
      })
    )
  }
)
