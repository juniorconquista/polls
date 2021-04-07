import React, { useContext } from 'react'
import Styles from './form-status-styles.scss'
import { Spinner } from '@/presentation/components'
import Context from '@/presentation/contexts/form/form-context'

type Props = {
  state: any
}

const FormStatus: React.FC<Props> = ({ state }: Props) => {
  const { isLoading, errorMessage } = useContext(Context)
  return (
    <div data-testid="error-wrap" className={Styles.errorWrap}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <span data-testid="main-error" className={Styles.error}>{errorMessage}</span>}
    </div>
  )
}

export default FormStatus
