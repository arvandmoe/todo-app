import { faker } from "@faker-js/faker";

describe('todos CRUD', () => {
  const testTodo = {
    title: faker.lorem.words(1),
    completed: false
  }
  before(() => {
    cy.visit('http://localhost:3000/todos')
  })
  it('should allow you to add a new todo', () => {
    cy.findByPlaceholderText('What needs to be done?',).type(testTodo.title)
    cy.findByRole('form',).submit()

    cy.findByText(testTodo.title)
  });

  it('should allow you to remove todo', () => {
    cy.findByTestId(`delete-${testTodo.title}`).click()
  });
})

export { }