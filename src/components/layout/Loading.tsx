import React from 'react'
import { Helmet } from 'react-helmet'
import { Spinner, ISpinnerProps } from '@chakra-ui/core'

const Loading = ({
  coverScreen,
  message,
  props
}: {
  coverScreen?: boolean
  message?: string
  props?: Partial<ISpinnerProps>
}) => {
  return (
    <div className={`flex ${coverScreen ? 'h-screen' : 'h-full'} flex-grow`}>
      <Helmet>
        <title>{'Loading | Gossipy'}</title>
      </Helmet>
      <div className='m-auto text-center'>
        <Spinner size={props?.size || 'md'} />
        {message && <p>{message}</p>}
      </div>
    </div>
  )
}

export default Loading
