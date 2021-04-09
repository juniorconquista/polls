import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import { Spinner } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

type Props = {
  state: any
}

const FormStatus: React.FC<Props> = (props: Props) => {
  const { state, errors } = useContext(Context)
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {state.isLoading && <Spinner className={Styles.spinner} />}
      {errors.main && <span data-testid="main-error" className={Styles.error}>{errors.main}</span>}
    </div>
  )
}

export default FormStatus
