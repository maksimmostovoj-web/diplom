const { ChallengerService } = require('./challenger.service')
const { ChallengesService } = require('./challenges.service')
const { TodoService } = require('./todo.service')
const { TodosService } = require('./todos.service')
const { HeartbeatService } = require('./heartbeat.service')

class Api {
  constructor(request) {
    this.request = request
    this.challengerService = new ChallengerService(request)
    this.challengesService = new ChallengesService(request)
    this.todoService = new TodoService(request)
    this.todosService = new TodosService(request)
    this.heartbeatService = new HeartbeatService(request)
  }
}

module.exports = { Api }
