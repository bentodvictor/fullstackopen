# 6.1: Unicafe Revisited, step 1
Before implementing the functionality of the UI, let's implement the functionality required by the store.

We have to save the number of each kind of feedback to the store, so the form of the state in the store is:

```json
{
  good: 5,
  ok: 4,
  bad: 2
}
```

The project has the following base for a reducer:

```javascript
const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      return state
    case 'OK':
      return state
    case 'BAD':
      return state
    case 'ZERO':
      return state
    default: return state
  }

}

export default counterReducer
```

and a base for its tests

```javascript
import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })
})
```

Implement the reducer and its tests.

In the tests, make sure that the reducer is an immutable function with the deep-freeze library. Ensure that the provided first test passes, because Redux expects that the reducer returns the original state when it is called with a first parameter - which represents the previous state - with the value undefined.

Start by expanding the reducer so that both tests pass. Then add the rest of the tests, and finally the functionality that they are testing.

A good model for the reducer is the redux-notes example above.

# 6.2: Unicafe Revisited, step2
Now implement the actual functionality of the application.

Your application can have a modest appearance, nothing else is needed but buttons and the number of reviews for each type.