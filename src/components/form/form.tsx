import { createFormControls } from '@/components/input/form-controls'
import Input from '@/components/input/input'
import { setItemData } from '@/store/actions/runAppActions'
import { IFormControls, validate, validateForm } from '@/utils'
import withModificator from '@/withClass'
import ru from 'date-fns/locale/ru'
import React, {
    ChangeEvent,
    Fragment,
    useEffect,
    useRef,
    useState,
} from 'react'
import DatePicker, { registerLocale } from 'react-datepicker'
import { useDispatch } from 'react-redux'
import MaskedInput from 'react-text-mask'
import { Dispatch } from 'redux'
import Select from '../select/selects'
registerLocale('ru', ru)
const blockClassName = 'form'

const mask = [
    '+',
    '7',
    ' ',
    '(',
    /[9]/,
    /\d/,
    /\d/,
    ')',
    '-',
    /\d/,
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
    '-',
    /\d/,
    /\d/,
]

const options = [0, 3, 5, 10]
interface IForm {
    className: string
}
const Form: React.FC<IForm> = props => {
    const { className } = props
    const dispatch: Dispatch = useDispatch()

    const [name, setName] = useState<string>('')
    const [date, setDate] = useState<Date | null>(null)
    const [email, setEmail] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [distance, setDistance] = useState<number | null>(null)
    const [payment, setPayment] = useState<number | null>(null)
    const [id, setId] = useState<number>(100)

    const [formControls, setFormControls] = useState<IFormControls>({})
    const [isInputsValid, setInputsValid] = useState<boolean>(false)
    const [isFormValid, setIsFormValid] = useState<boolean>(false)
    const [selectOptions, setSelectOptions] = useState<Array<number>>([])
    const refDatePicker = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        setFormControls(createFormControls())
        setSelectOptions(options)
    }, [])

    const handleOnSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault()

        const item = {
            id,
            date,
            name,
            email,
            phone,
            distance,
            payment,
            dateRegister: new Date(),
        }
        dispatch(setItemData(item))
        setId(prev => prev + 1)

        setName('')
        setDate(null)
        setEmail('')
        setPhone('')
        setPayment(null)
        setDistance(null)

        setInputsValid(false)
        setIsFormValid(false)

        setFormControls(createFormControls())
        setSelectOptions(options)
    }

    const handleChangeSelect = (ev: ChangeEvent<HTMLSelectElement>) => {
        setDistance(+ev.target.value)

        if (isInputsValid && Boolean(ev.target.value)) {
            setIsFormValid(true)
        }
    }
    const handleChangeField = (value: any, controlName: string) => {
        const updatedFormControls = { ...formControls }
        const control = { ...formControls[controlName] }

        switch (controlName) {
            case 'name':
                setName(value)
                break
            case 'date':
                console.log(value)
                setDate(value)
                break
            case 'email':
                setEmail(value)
                break
            case 'tel':
                setPhone(value)
                break
            case 'amount':
                setPayment(+value)
                break
            default:
                break
        }
        control.touched = true
        control.value = value
        const { isValid, optionErrorMessage } = validate(control)

        control.valid = isValid
        control.errorMessage = optionErrorMessage

        updatedFormControls[controlName] = control

        setInputsValid(validateForm(updatedFormControls))
        setFormControls(updatedFormControls)

        if (isInputsValid && Boolean(distance)) {
            setIsFormValid(true)
        }
    }

    interface IDateInputProps {
        [key: string]: any
    }

    const DateInput = React.forwardRef((props: IDateInputProps, ref) => {
        const { control, onClick, onChange, value, placeholder } = props

        return (
            <Input
                innerRef={ref}
                name={control.name}
                type={control.type}
                value={value}
                valid={control.valid}
                shouldValidate={!!control.validation}
                touched={control.touched}
                placeholder={placeholder}
                errorMessage={control.errorMessage}
                onChange={onChange}
                onClick={onClick}
            />
        )
    })

    const controls = Object.keys(formControls).map(
        (controlName: string, index: number) => {
            const control = formControls[controlName]
            return (
                <Fragment key={index}>
                    {control.name === 'tel' ? (
                        <div className={blockClassName + '__field'}>
                            <MaskedInput
                                guide={true}
                                mask={mask}
                                onChange={(
                                    ev: ChangeEvent<HTMLInputElement>
                                ) => {
                                    handleChangeField(
                                        ev.target.value,
                                        controlName
                                    )
                                }}
                                render={(
                                    ref: (inputElement: HTMLElement) => void,
                                    props: any
                                ) => (
                                    <Input
                                        {...props}
                                        innerRef={ref}
                                        name={control.name}
                                        type={control.type}
                                        value={control.value}
                                        valid={control.valid}
                                        shouldValidate={!!control.validation}
                                        touched={control.touched}
                                        placeholder={control.placeholder}
                                        errorMessage={control.errorMessage}
                                    />
                                )}
                            />
                        </div>
                    ) : control.name === 'date' ? (
                        <div className={blockClassName + '__field'}>
                            <DatePicker
                                locale="ru"
                                peekNextMonth
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                withPortal
                                onChange={(d: Date) => {
                                    setDate(d)
                                    handleChangeField(d, controlName)
                                }}
                                maxDate={new Date()}
                                value={date?.toLocaleString('ru-RU', {
                                    year: 'numeric',
                                    month: 'numeric',
                                    day: 'numeric',
                                })}
                                placeholderText={control.placeholder}
                                customInput={
                                    <DateInput
                                        control={control}
                                        ref={refDatePicker}
                                    />
                                }
                            />
                        </div>
                    ) : (
                        <div className={blockClassName + '__field'}>
                            <Input
                                name={control.name}
                                type={control.type}
                                value={control.value}
                                valid={control.valid}
                                shouldValidate={!!control.validation}
                                touched={control.touched}
                                placeholder={control.placeholder}
                                errorMessage={control.errorMessage}
                                onChange={(
                                    ev: ChangeEvent<HTMLInputElement>
                                ) => {
                                    handleChangeField(
                                        ev.target.value,
                                        controlName
                                    )
                                }}
                            />
                        </div>
                    )}
                    {index === 3 && (
                        <Select
                            value={distance}
                            key={index + 10}
                            options={selectOptions}
                            onChange={(ev: ChangeEvent<HTMLSelectElement>) =>
                                handleChangeSelect(ev)
                            }
                        />
                    )}
                </Fragment>
            )
        }
    )

    return (
        <>
            <form className={className} onSubmit={handleOnSubmit}>
                <div className={blockClassName + '__list'}>
                    {controls}
                    <div className={blockClassName + '__field'}>
                        <button
                            className={blockClassName + '__btn btn btn_wide'}
                            type="submit"
                            disabled={!isFormValid}
                        >
                            Добавить
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default withModificator(Form, blockClassName)
