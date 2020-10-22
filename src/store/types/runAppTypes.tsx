export const SET_IS_FETCHING = 'SET_IS_FETCHING'
export const SET_DATA = 'SET_DATA'
export const SET_ITEM_DATA = 'SET_ITEM_DATA'
export const SET_CLEAR = 'SET_CLEAR'
export const SET_IS_ERROR = 'SET_IS_ERROR'

export type TItem = {
    id: number
    date: Date | null
    name: string
    email: string
    phone: string
    distance: number
    payment: number
    dateRegister: Date | null
}

export type TItems = Array<TItem>

export interface IIsErrorType {
    error: boolean
    msg: string
}

export interface IUsers {
    items: TItems
}

export interface IRunApp extends IUsers {
    isFetching: boolean
    isError: IIsErrorType
}

export interface SetDataActionType extends IUsers {
    type: typeof SET_DATA
}

export interface SetItemDataActionType {
    type: typeof SET_ITEM_DATA
    item: TItem
}

export interface SetIsFetcingActionType {
    type: typeof SET_IS_FETCHING
    isFetching: boolean
}

export interface SetIsErrorActionType {
    type: typeof SET_IS_ERROR
    isError: IIsErrorType
}

export interface SetClearActionType {
    type: typeof SET_CLEAR
}

export type RunAppActionTypes =
    | SetDataActionType
    | SetIsFetcingActionType
    | SetClearActionType
    | SetIsErrorActionType
    | SetItemDataActionType

export type RunAppConstTypes =
    | typeof SET_IS_FETCHING
    | typeof SET_DATA
    | typeof SET_CLEAR
    | typeof SET_IS_ERROR
    | typeof SET_ITEM_DATA
