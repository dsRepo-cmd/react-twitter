import { Fragment, useEffect, useReducer } from 'react'

import './index.css'

import Title from '../../component/title'
import Grid from '../../component/grid'
import Box from '../../component/box'
import PostCreate from '../post-create'
import PostItem from '../post-item'
import { Alert, LOAD_STATUS, Skeleton } from '../../component/load'
import { getDate } from '../../util/getDate'
import {
  requestInitialState,
  requestReduiser,
  REQUEST_ACTION_TYPE,
} from '../../util/request'

export default function Container() {
  const [state, dispatch] = useReducer(requestReduiser, requestInitialState)

  const getData = async () => {
    dispatch({ type: REQUEST_ACTION_TYPE.PROGRESS })

    try {
      const res = await fetch('http://localhost:4000/post-list')

      const data = await res.json()

      if (res.ok) {
        dispatch({
          type: REQUEST_ACTION_TYPE.SUCCESS,
          payload: convertData(data),
        })
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

  const convertData = (raw) => ({
    list: raw.list.reverse().map(({ id, username, text, date }) => ({
      id,
      username,
      text,
      date: getDate(date),
    })),

    isEmpty: raw.list.length === 0,
  })

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Grid>
      <Box>
        <Grid>
          <Title>Home</Title>
          <PostCreate
            onCreate={getData}
            placeholder="What is happening?!"
            button="Post"
          />
        </Grid>
      </Box>

      {state.status === REQUEST_ACTION_TYPE.PROGRESS && (
        <>
          {state.data &&
            state.data.list.map((item) => (
              <Fragment key={item.id}>
                <Box>
                  <Skeleton />
                </Box>
              </Fragment>
            ))}
          <Box>
            <Skeleton />
          </Box>
        </>
      )}

      {state.status === REQUEST_ACTION_TYPE.ERROR && (
        <Alert status={state.status} message={state.message} />
      )}

      {state.status === LOAD_STATUS.SUCCESS && (
        <Fragment>
          {state.data.isEmpty ? (
            <Alert message="Список постів пустий" />
          ) : (
            state.data.list.map((item) => (
              <Fragment key={item.id}>
                <PostItem {...item} />
              </Fragment>
            ))
          )}
        </Fragment>
      )}
    </Grid>
  )
}
