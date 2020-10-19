import {
    IRunApp,
    RunAppActionTypes,
    SET_CLEAR,
    SET_DATA,
    SET_IS_ERROR,
    SET_IS_FETCHING,
    SET_ITEM_DATA,
} from '@/store/types/runAppTypes'

const initialState: IRunApp = {
    isFetching: false,
    isError: {
        error: false,
        msg: '',
    },
    items: [],
}

export function runAppReducer(
    state = initialState,
    action: RunAppActionTypes
): IRunApp {
    switch (action.type) {
        case SET_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching,
            }
        case SET_IS_ERROR:
            return {
                ...state,
                isError: {
                    error: action.isError.error,
                    msg: action.isError.msg,
                },
            }
        case SET_DATA:
            return {
                ...state,
                items: [...state.items, ...action.items],
            }
        case SET_ITEM_DATA:
            return {
                ...state,
                items: [...state.items, action.item],
            }
        case SET_CLEAR:
            return {
                ...state,
                items: [],
            }

        default:
            return state
    }
}
