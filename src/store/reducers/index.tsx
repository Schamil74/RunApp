import { runAppReducer } from '@/store/reducers/runAppReducer'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

export const rootReducer = combineReducers({
    runApp: runAppReducer,
})

let store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

export { store }
