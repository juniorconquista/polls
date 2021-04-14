import React, { useContext } from 'react'
import Context from '@/presentation/contexts/form/form-context'

type Props = {
  text: string
  state: any
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const { state } = useContext(Context)
  const isFormInvalid = state.emailError || state.passwordError

  return (
    <button
      data-testid="submit"
      disabled={!!isFormInvalid}
      type="submit"
    >
      {text}
    </button>
  )
}

export default SubmitButton
