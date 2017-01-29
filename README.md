# redux-reducer
Even simpler reducers with 0 boilerplate

## Installation

One of the following:
- `npm i -S @commander-lol/redux-reducer`
- `yarn add @commander-lol/redux-reducer`
- `ied i -S @commander-lol/redux-reducer`

## Why?

redux-reducer strips out the common boilerplate used to determine what actions to take when a reducer is run, as well as allowing
you to programmatically compose a reducer at runtime. It also handles the default case for you, saving potentially hours
of bug hunting when you overlook it.

## Usage

When you're writing reducers for Redux, you probably have something similar to the following:

```js
const initialState = {
  dongles: {},
}

export default function myReducer(state = initialState, {type, ...action}) {
  switch(type) {
    case "ADD_DONGLE": {
      let { dongles } = state
      let { dongle } = action
      dongles = {
        ...dongles,
        [dongle.id]: dongle,
      }
      
      return {
        ...state,
        dongles,
      }
    }
    default: 
      return state
  }
}
```

And that's a pattern that will appear in pretty much every one of your reducers. Instead, using the `redux-reducer` library
turns that into the following: 

```js
const reducer = require('@commander-lol/redux-reducer')

const initialState = {
  dongles: {},
}

export default reducer(initialState, {
  ADD_DONGLE: ({ dongles, ...state }, { dongle }) => {
    return {
      ...state,
      dongles: {
        ...dongles,
        [dongle.id] = dongle,
      },
    }
  }
})
```

## API

The library exports a single function that returns a redux-compatible reducer function;

``` reducer(initial: Object, handlers: Map<string, Handler>) ```

Where initial is the `initial` router state and `handlers` is a string -> function map of action types to action reducers. Each handler is passed `state` and `action` as parameters, which correspond to the assigned reducer state and the current action (without the `type` property) and should return the new version of state after resolving the action. Simple as that. 
