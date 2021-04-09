import React, { useContext } from 'react'

import Context from '@/presentation/contexts/form/form-context'
import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  state: any
  setState: any
}

const Input: React.FC<Props> = ({ state, setState, ...props }: Props) => {
  const { errors } = useContext(Context)
  const error = errors[props.name]

  return (
    <div
      data-testid={`${props.name}-wrap`}
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        placeholder=" "
        data-testid={props.name}
        readOnly
        onFocus={e => { e.target.readOnly = false }}
      />
      <label data-testid={`${props.name}-label`} title={error}>
        {props.placeholder}
      </label>
    </div>
  )
}

export default Input
