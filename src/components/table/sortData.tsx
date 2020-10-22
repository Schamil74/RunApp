import { TItems } from '@/store/types/runAppTypes'
import React from 'react'

type Config = {
    key: string
    direction: string
}

export const useSortableData = (
    items: TItems,
    config: Config = { key: '', direction: '' }
) => {
    const [sortConfig, setSortConfig] = React.useState(config)

    const requestSort = (key: string, direction = 'ascending') => {
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending'
        }
        setSortConfig({ key, direction })
    }

    const sort = (itemA: Date | number, itemB: Date | number) => {
        if (itemA < itemB) {
            return sortConfig.direction === 'ascending' ? -1 : 1
        }
        if (itemA > itemB) {
            return sortConfig.direction === 'ascending' ? 1 : -1
        }
        return 0
    }

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items]

        sortableItems.sort((a: any, b: any) => {
            let itemA = null
            let itemB = null

            if (
                a[sortConfig.key] instanceof Date &&
                b[sortConfig.key] instanceof Date
            ) {
                itemA = a[sortConfig.key].getTime()
                itemB = b[sortConfig.key].getTime()
                return sort(itemA, itemB)
            } else if (
                typeof a[sortConfig.key] === 'number' &&
                typeof b[sortConfig.key] === 'number'
            ) {
                itemA = a[sortConfig.key]
                itemB = b[sortConfig.key]
                return sort(itemA, itemB)
            } else {
                throw new Error('this type is not a date or a number')
            }
        })
        return sortableItems
    }, [items, sortConfig])

    return { sortedItems, requestSort, sortConfig }
}
