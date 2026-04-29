const { ChallengerService } = require('./challenger.service')
const { ChallengesService } = require('./challenges.service')
const { TodoService } = require('./todo.service')
const { TodosService } = require('./todos.service')

class Api {
  constructor(request, baseURL) {
    this.request = request
    this.baseURL = baseURL
    this.challengerService = new ChallengerService(request, baseURL)
    this.challengesService = new ChallengesService(request, baseURL)
    this.todoService = new TodoService(request, baseURL)
    this.todosService = new TodosService(request, baseURL)
  }
}

module.exports = { Api }