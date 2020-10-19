import { rootReducer } from '@/store/reducers'
import { Action } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { RunAppActionTypes, RunAppConstTypes } from './runAppTypes'

export type RootState = ReturnType<typeof rootReducer>

export type AppThunkDispatch = ThunkDispatch<
    RootState,
    any,
    Action<RunAppActionTypes>
>

export type AppThunkAction<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<RunAppConstTypes>
>
