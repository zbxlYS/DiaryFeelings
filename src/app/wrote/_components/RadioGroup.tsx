'use client'

import { RadioContext } from './RadioContext'

const RadioGroup = ({label, children, ...rest}: any) => {
    return (
        <fieldset className='flex items-center'>
            <RadioContext.Provider value={rest}>
                {children}
            </RadioContext.Provider>
        </fieldset>
    )
}

export default RadioGroup