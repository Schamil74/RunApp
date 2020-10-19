import { createControl } from '@/utils'
export function createFormControls() {
    return {
        name: createControl(
            {
                name: 'name',
                type: 'text',
                placeholder: 'ФИО',
                errorMessage: 'Поле email не может быть пустым',
            },
            {
                required: true,
            }
        ),
        date: createControl(
            {
                name: 'date',
                type: 'text',
                placeholder: 'Дата рождения',
                errorMessage: 'Поле дата рождения не может быть пустым',
            },
            {
                required: true,
            }
        ),

        email: createControl(
            {
                name: 'email',
                type: 'email',
                placeholder: 'Email',
                errorMessage: 'Поле email не может быть пустым',
            },
            {
                required: true,
                email: true,
            }
        ),
        tel: createControl(
            {
                name: 'tel',
                type: 'tel',
                placeholder: 'Телефон',
                errorMessage: 'Поле телефон не может быть пустым',
            },
            {
                required: true,
                tel: true,
            }
        ),
        amount: createControl(
            {
                name: 'amount',
                type: 'text',
                placeholder: 'Сумма взноса, руб.',
                errorMessage: 'Поле Сумма взноса не может быть пустым',
            },
            {
                required: true,
                amount: true,
            }
        ),
    }
}
