import React from 'react'

export interface IProps {
    [key: string]: any
}

const withModificator = (Component: Function, classname: string) => (
    props: IProps
) => {
    const { modificator, addClazz, ...elemProps } = props
    const cls = [classname]
    if (modificator) {
        cls.push(`${classname}_${modificator}`)
    }

    if (addClazz) {
        cls.push(addClazz)
    }

    return <Component className={cls.join(' ')} {...elemProps} />
}

export default withModificator
