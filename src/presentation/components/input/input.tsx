import React, { useContext, useRef } from 'react'

import Context from '@/presentation/contexts/form/form-context'
import Styles from './input-styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  // state: any
  // setState: any
}

const Input: React.FC<Props> = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>()
  const { state, setState } = useContext(Context)
  const error = state[`${props.name}Error`]

  return (
    <div
      data-testid={`${props.name}-wrap`}
      className={Styles.inputWrap}
      data-status={error ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        ref={inputRef}
        placeholder=" "
        data-testid={props.name}
        readOnly
        onFocus={e => { e.target.readOnly = false }}
        onChange={e => { setState({ ...state, [e.target.name]: e.target.value }) }}
      />
      <label
        data-testid={`${props.name}-label`}
        onClick={() => { inputRef.current.focus() }}
        title={error || 'ok'}
      >
        {props.placeholder}
      </label>
    </div>
  )
}

export default Input
