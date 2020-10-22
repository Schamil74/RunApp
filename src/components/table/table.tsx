import Icon from '@/components/icon/icon'
import { TItems } from '@/store/types/runAppTypes'
import withModificator from '@/withClass'
import React, { FC, useEffect, useState } from 'react'
import Pagination from 'react-js-pagination'
import { useSortableData } from './sortData'
const blockClassName = 'table'

interface ITable {
    items: TItems
    className: string
}

export const tableHead = [
    {
        title: 'День рождения',
        sort: true,
        param: 'date',
    },
    {
        title: 'ФИО',
    },
    {
        title: 'Email',
    },
    {
        title: 'Телефон',
    },
    {
        title: 'Дистанция забега',
        sort: true,
        param: 'distance',
    },
    {
        title: 'Сумма взноса, руб',
        sort: true,
        param: 'payment',
    },
    {
        title: 'Дата регистрации',
        sort: true,
        param: 'dateRegister',
    },
]

const Table: FC<ITable> = props => {
    const { items, className } = props
    const [activePage, setCurrentPage] = useState<number>(1)
    const todosPerPage = 3
    const indexOfLastTodo = activePage * todosPerPage
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage
    const currentSortedItems = items.slice(indexOfFirstTodo, indexOfLastTodo)

    const { sortedItems, requestSort, sortConfig } = useSortableData(
        currentSortedItems
    )

    useEffect(() => {
        requestSort('dateRegister')
    }, [])

    const handlePageClick = (pageNumber: number) => {
        setCurrentPage(pageNumber)
    }

    return (
        <div className={className}>
            <table className={blockClassName + '__self'}>
                <caption className={blockClassName + '__caption'}>
                    Список участников
                </caption>

                <thead>
                    <tr>
                        {tableHead.map((item, ndx) => {
                            const isActive: boolean =
                                item.param === sortConfig.key

                            return (
                                <th key={ndx}>
                                    <div className={blockClassName + '__cell'}>
                                        {item.sort ? (
                                            <button
                                                onClick={() =>
                                                    requestSort(item.param)
                                                }
                                                className={
                                                    isActive
                                                        ? 'table__sort-btn is-active'
                                                        : 'table__sort-btn'
                                                }
                                            >
                                                {item.title}
                                                <Icon
                                                    modificator={
                                                        sortConfig.direction ===
                                                            'ascending' &&
                                                        isActive
                                                            ? 'sort-sm-lg'
                                                            : 'sort-lg-sm'
                                                    }
                                                />
                                            </button>
                                        ) : (
                                            item.title
                                        )}
                                    </div>
                                </th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {sortedItems.length > 0 &&
                        sortedItems.map(item => {
                            const {
                                id,
                                date,
                                name,
                                email,
                                phone,
                                distance,
                                payment,
                                dateRegister,
                            } = item
                            return (
                                <tr key={id}>
                                    <td>
                                        <div
                                            className={
                                                blockClassName + '__cell'
                                            }
                                        >
                                            {date?.getDate() +
                                                '/' +
                                                date?.getMonth() +
                                                '/' +
                                                date?.getFullYear()}
                                        </div>
                                    </td>
                                    <td>
                                        <div
                                            className={
                                                blockClassName + '__cell'
                                            }
                                        >
                                            {name}
                                        </div>
                                    </td>
                                    <td>
                                        <div
                                            className={
                                                blockClassName + '__cell'
                                            }
                                        >
                                            {email}
                                        </div>
                                    </td>
                                    <td>
                                        <div
                                            className={
                                                blockClassName + '__cell'
                                            }
                                        >
                                            {phone}
                                        </div>
                                    </td>
                                    <td>
                                        <div
                                            className={
                                                blockClassName + '__cell'
                                            }
                                        >
                                            {distance}
                                        </div>
                                    </td>
                                    <td>
                                        <div
                                            className={
                                                blockClassName + '__cell'
                                            }
                                        >
                                            {payment}
                                        </div>
                                    </td>
                                    <td>
                                        <div
                                            className={
                                                blockClassName + '__cell'
                                            }
                                        >
                                            {dateRegister?.getDate() +
                                                '/' +
                                                dateRegister?.getMonth() +
                                                '/' +
                                                dateRegister?.getFullYear()}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            {todosPerPage < items.length && (
                <div className={blockClassName + '__pagination'}>
                    <Pagination
                        activePage={activePage}
                        itemsCountPerPage={3}
                        totalItemsCount={items.length}
                        onChange={handlePageClick}
                        pageRangeDisplayed={3}
                    />
                </div>
            )}
        </div>
    )
}

export default withModificator(Table, 'table')
