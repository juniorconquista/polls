export class RequiredFieldError extends Error {
  constructor () {
    super('Campo Obrigatótio')
    this.name = 'RequiredFieldError'
  }
}
