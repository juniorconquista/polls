import React from 'react'
import { SubmitButtonBase } from '@/presentation/components'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  return (
    <SubmitButtonBase text={text} state={{}} />
  )
}

export default SubmitButton
