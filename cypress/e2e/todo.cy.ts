import { faker } from "@faker-js/faker";


describe('todos CRUD', () => {
  const testTodo = {
    title: faker.lorem.words(1),
    completed: false
  }

  before(() => {
    cy.visit('http://localhost:3000/todos')
  })

  after(() => {
    cy.task('resetdb')
  })

  it('should allow you to add and remove todo', () => {
    cy.findByPlaceholderText('What needs to be done?',).type(testTodo.title)
    cy.findByRole('form',).submit()
    cy.findByText(testTodo.title)
    cy.findByTestId(`delete-${testTodo.title}`).click()
  });

  it('should allow you to toggle todo', () => {
    cy.findAllByTestId(`checkbox-false`).first().click()
    cy.findAllByTestId("todo-true").should('exist')
  });

  it('should show correct left items count', () => {
    // get left todos count span element
    cy.get('#leftTodosCount').then(element => {
      const count = Number(element[0].innerText)
      if (count != 0) {
        cy.findAllByTestId("todo-false").its("length").should('eq', count)
      } else {
        cy.findAllByTestId("todo-false").should('not.exist')
      }
    })
  });

  it('clicking active only shows active todos', () => {
    // click on active button
    cy.findByText('Active').click()
    cy.findAllByTestId("todo-true").should('not.exist')
    cy.findByText('All').click()
  })

  it('clicking clear completed clears all completed todos ', () => {
    // click on active button
    cy.findByText('Clear Completed').click()
    // TODO: this needs improvment
    // we need to wait to make parallel requests to delete
    // completed todos,
    cy.wait(3000)
    cy.findAllByTestId("todo-true").should('not.exist')
  })
})

export { }