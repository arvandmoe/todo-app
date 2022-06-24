import { faker } from "@faker-js/faker";

describe('todos CRUD', () => {
  it('should allow you to add a new todo', () => {
    const testTodo = {
      title: faker.lorem.words(1),
      completed: false
    }

    cy.visit('http://localhost:3000/todos')
    cy.findByPlaceholderText('What needs to be done?',).type(testTodo.title)
    cy.findByRole('form',).submit()

    // cy.findByText(testTodo.title)

    cy.findByTestId(`delete-${testTodo.title}`).click()
  }
  )
})

export { }