import { TItems } from '@/store/types/runAppTypes'
import withModificator from '@/withClass'
import React, { FC } from 'react'
const blockClassName = 'table'
interface ITable {
    items: TItems
    className: string
}

const tableHead = [
    {
        title: 'Дата регистрации',
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
    },
    {
        title: 'Сумма взноса, руб',
        sort: true,
    },
    {
        title: 'Дата регистрации',
        sort: true,
    },
]

const Table: FC<ITable> = props => {
    const { items, className } = props
    console.log(props)

    return (
        <div className={className}>
            <table className={blockClassName + '__self'}>
                <thead>
                    <tr>
                        {tableHead.map((item, ndx) => (
                            <th key={ndx}>{item.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => {
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
                                <td>{date}</td>
                                <td>{name}</td>
                                <td>{email}</td>
                                <td>{phone}</td>
                                <td>{distance}</td>
                                <td>{payment}</td>
                                <td>{dateRegister}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default withModificator(Table, 'table')
