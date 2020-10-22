export interface IValidation {
    [key: string]: string | boolean | number
}

export interface Ifield {
    name: string
    type: string
    errorMessage: string
    placeholder: string
    validation: IValidation | null
    valid: boolean
    touched: boolean
    value: any
    autoComplete: string
}

export interface IFormControls {
    [key: string]: Ifield
}

type ValidateReturn = {
    isValid: boolean
    optionErrorMessage: string
}

const isEmail = (emailAddress: string): boolean => {
    const pattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    )
    return pattern.test(emailAddress)
}

const isPhone = (phoneNumber: string): boolean => {
    const pattern = new RegExp(
        /^(\+7|7|8)?[\s-]?\(?[489][0-9]{2}\)?[\s-]?[0-9]{3}[\s-]?[0-9]{2}[\s-]?[0-9]{2}$/g
    )
    return pattern.test(phoneNumber)
}

const isNumeric = (number: any): boolean => {
    const pattern = /^[0-9]+$/
    return pattern.test(number)
}

export function createControl(
    config: any,
    validation: IValidation | null
): Ifield {
    return {
        ...config,
        validation,
        valid: !validation,
        touched: false,
        value: '',
        autoComplete: 'off',
    }
}

export function validate(control: Ifield): ValidateReturn {
    const { validation, value, touched, errorMessage } = control

    let isValid = true
    let optionErrorMessage = errorMessage

    if (!validation) {
        return { isValid, optionErrorMessage }
    }

    if (validation.required && touched) {
        if (value instanceof Date) {
            isValid = true
        } else {
            isValid = value.trim() !== ''
        }
        optionErrorMessage = 'Поле не может быть пустым'
    }

    if (validation.email && touched) {
        const emailValid = isEmail(value)

        if (emailValid) {
            isValid = true
        } else if (value === '') {
            isValid = false
            optionErrorMessage = 'Поле email не может быть пустым'
        } else {
            isValid = false
            optionErrorMessage = 'Поле email должно быть валидным'
        }
    }

    if (validation.tel && touched) {
        const telValid = isPhone(value)

        if (telValid) {
            isValid = true
        } else if (value === '') {
            isValid = false
            optionErrorMessage = 'Поле телефон не может быть пустым'
        } else {
            isValid = false
            optionErrorMessage = 'Поле телефон должно быть валидным'
        }
    }

    if (validation.amount && touched) {
        const amountValid = isNumeric(value)

        if (amountValid) {
            isValid = true
        } else if (value === '') {
            isValid = false
            optionErrorMessage = 'Поле сумма взноса не может быть пустым'
        } else {
            isValid = false
            optionErrorMessage = 'Поле сумма взноса должно быть цифрами'
        }
    }

    return { isValid, optionErrorMessage }
}

export function validateForm(formControls: IFormControls): boolean {
    let isFormValid = true

    for (let control in formControls) {
        if (formControls.hasOwnProperty(control)) {
            isFormValid = formControls[control].valid && isFormValid
        }
    }

    return isFormValid
}
