import React, { ChangeEvent, FC } from 'react'
const blockClassName = 'form'

type SelectProps = {
    value: number | null
    options: Array<number>
    onChange: (ev: ChangeEvent<HTMLSelectElement>) => void
}

const Select: FC<SelectProps> = props => {
    const { onChange, options, value } = props

    return (
        <div className={blockClassName + '__field'}>
            <select
                name="distance"
                className={'select'}
                onChange={onChange}
                value={value ? value : 'placeholder'}
            >
                {options.map((number, ndx) =>
                    ndx === 0 ? (
                        <option disabled value="placeholder" key={ndx}>
                            Выберите дистанцию
                        </option>
                    ) : (
                        <option key={ndx} value={number}>
                            {number} км
                        </option>
                    )
                )}
            </select>
        </div>
    )
}

export default Select
