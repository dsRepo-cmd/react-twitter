import { useReducer, useState } from 'react'
import './index.css'

import Grid from '../../component/grid'
import FieldForm from '../../component/field-form'
import { Alert, Loader, LOAD_STATUS } from '../../component/load'
import {
  REQUEST_ACTION_TYPE,
  requestInitialState,
  requestReduiser,
} from '../../util/request'

export default function Container({
  onCreate,
  placeholder,
  button,
  id = null,
}) {
  const [state, dispatch] = useReducer(requestReduiser, requestInitialState)

  const hendleSubmit = (value) => {
    return sendData({ value })
  }

  const sendData = async (dataToSend) => {
    dispatch({ type: REQUEST_ACTION_TYPE.PROGRESS })

    try {
      const res = await fetch('http://localhost:4000/post-create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: convertData(dataToSend),
      })
      const data = await res.json()

      if (res.ok) {
        dispatch({
          type: REQUEST_ACTION_TYPE.RESET,
        })

        if (onCreate) onCreate()
      } else {
        dispatch({
          type: REQUEST_ACTION_TYPE.ERROR,
          payload: data.message,
        })
      }
    } catch (error) {
      dispatch({
        type: REQUEST_ACTION_TYPE.ERROR,
        payload: error.message,
      })
    }
  }

  const convertData = ({ value }) => {
    return JSON.stringify({
      text: value,
      username: 'user',
      postId: id,
    })
  }

  return (
    <Grid>
      <FieldForm
        placeholder={placeholder}
        button={button}
        onSubmit={hendleSubmit}
      />

      {state.status === REQUEST_ACTION_TYPE.ERROR && (
        <Alert status={state.status} message={state.message} />
      )}

      {state.status === REQUEST_ACTION_TYPE.PROGRESS && <Loader />}
    </Grid>
  )
}
