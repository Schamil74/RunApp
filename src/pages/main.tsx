import Form from '@/components/form/form'
import Loader from '@/components/loader/loader'
import Table from '@/components/table/table'
import { thunkGetData } from '@/store/actions/runAppActions'
import { AppThunkDispatch, RootState } from '@/store/types'
import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const Main: FC = () => {
    const runAppState = (state: RootState) => state.runApp
    const thunkDispatch: AppThunkDispatch = useDispatch()
    const { isFetching, items } = useSelector(runAppState)

    useEffect(() => {
        thunkDispatch(thunkGetData())
    }, [])
    return (
        <>
            {isFetching ? (
                <Loader />
            ) : (
                <div className="intro">
                    <Form modificator="intro" />
                    <Table modificator="intro" items={items} />
                </div>
            )}
        </>
    )
}

export default Main
