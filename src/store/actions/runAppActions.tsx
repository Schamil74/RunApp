import { AppThunkAction } from '@/store/types'
import {
    IIsErrorType,
    SetClearActionType,
    SetDataActionType,
    SetIsErrorActionType,
    SetIsFetcingActionType,
    SetItemDataActionType,
    SET_CLEAR,
    SET_DATA,
    SET_IS_ERROR,
    SET_IS_FETCHING,
    SET_ITEM_DATA,
    TItem,
    TItems,
} from '@/store/types/runAppTypes'
import axios from 'axios'

export const thunkGetData = (): AppThunkAction => async dispatch => {
    try {
        dispatch(setIsFetching(true))

        const response = await axios.get(
            'https://gist.githubusercontent.com/Schamil74/ad20e8565d41b8e2e7a5e2866aa70f27/raw/0b4988b902d6be7daa6a135a35afb57080afd6f1/users'
        )
        dispatch(setIsFetching(false))

        response.data.users.forEach((item: any, ndx: number) => {
            item.date = item.date
                .split('.')
                .reverse()
                .join('.')
                .replace(/\./g, '/')
            if (!item.dateRegister) {
                const currentDate = new Date().getDate() + ndx
                item.dateRegister = new Date().setDate(currentDate)
            } else {
                item.dateRegister = item.dateRegister
                    .split('.')
                    .reverse()
                    .join('.')
                    .replace(/\./g, '/')
            }

            if (isNaN(new Date(item.date).getTime())) {
                item.date = new Date(0)
            } else {
                item.date = new Date(item.date)
            }
            if (isNaN(new Date(item.dateRegister).getTime())) {
                item.dateRegister = new Date(0)
            } else {
                item.dateRegister = new Date(item.dateRegister)
            }
        })

        dispatch(setRunAppData(response.data.users))
    } catch (error) {
        dispatch(setIsFetching(false))
        dispatch(setIsError({ error: true, msg: error.message }))
    }
}

export const setItemData = (item: TItem): SetItemDataActionType => {
    return { type: SET_ITEM_DATA, item }
}

export const setIsFetching = (isFetching: boolean): SetIsFetcingActionType => {
    return { type: SET_IS_FETCHING, isFetching }
}

export const setIsError = (isError: IIsErrorType): SetIsErrorActionType => {
    return { type: SET_IS_ERROR, isError }
}

export const setRunAppData = (items: TItems): SetDataActionType => {
    return {
        type: SET_DATA,
        items,
    }
}
export const setClearHubData = (): SetClearActionType => {
    return {
        type: SET_CLEAR,
    }
}
