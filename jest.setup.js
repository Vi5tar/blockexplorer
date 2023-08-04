import '@testing-library/jest-dom'

const component = (path) => {
    return [
        path,
        () => {
            const mock = jest.fn()
            const testId = `mock-${path.split('/').pop()}`
            const MockComponent = (props) => {
                mock(props)
                return <div data-testid={`${testId}`}></div>
            }
            MockComponent.mock = mock
            MockComponent.testId = testId
            return MockComponent
        }
    ]
}

global.component = component
