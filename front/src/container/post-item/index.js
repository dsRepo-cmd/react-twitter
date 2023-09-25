import { Fragment, useCallback, useEffect, useReducer, useState } from 'react'
import './index.css'
import Box from '../../component/box'
import PostContent from '../../component/post-content'
import Grid from '../../component/grid'
import PostCreate from '../post-create'
import { Alert, Skeleton } from '../../component/load'
import { getDate } from '../../util/getDate'
import {
  REQUEST_ACTION_TYPE,
  requestInitialState,
  requestReduiser,
} from '../../util/request'

export default function Container({ id, username, text, date }) {
  const [state, dispatch] = useReducer(
    requestReduiser,
    requestInitialState,
    (state) => ({ ...state, data: { id, username, text, date, reply: null } }),
  )

  const getData = useCallback(async () => {
    dispatch({ type: REQUEST_ACTION_TYPE.PROGRESS })

    try {
      const res = await fetch(
        `http://localhost:4000/post-item?id=${state.data.id}`,
      )

      const resData = await res.json()

      if (res.ok) {
        dispatch({
          type: REQUEST_ACTION_TYPE.SUCCESS,
          payload: convertData(resData),
        })
      } else {
        dispatch({
          type: REQUEST_ACTION_TYPE.ERROR,
          payload: resData.message,
        })
      }
    } catch (error) {
      dispatch({
        type: REQUEST_ACTION_TYPE.ERROR,
        payload: error.message,
      })
    }
  }, [state.data.id])

  const convertData = ({ post }) => ({
    id: post.id,
    username: post.username,
    text: post.text,
    date: getDate(post.date),

    reply: post.reply.reverse().map(({ id, text, date, username }) => ({
      id,
      username,
      text,
      date: getDate(date),
    })),

    isEmpty: post.reply.length === 0,
  })

  const [isOpen, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(!isOpen)
  }

  useEffect(() => {
    if (isOpen === true) {
      getData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <Box style={{ padding: '0' }}>
      <div onClick={handleOpen} style={{ padding: '20px', cursor: 'pointer' }}>
        <PostContent
          username={state.data.username}
          date={state.data.date}
          text={state.data.text}
        />
      </div>
      {isOpen && (
        <div className="post-item" style={{ padding: '0 20px 20px 20px' }}>
          <Grid>
            <Box className="post-item__inside-box">
              <PostCreate
                placeholder="Post your reply"
                button="Reply"
                id={state.data.id}
                onCreate={getData}
              />
            </Box>

            {state.status === REQUEST_ACTION_TYPE.PROGRESS && (
              <>
                {state.data.reply &&
                  state.data.reply.map((item) => (
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

            {state.status === REQUEST_ACTION_TYPE.SUCCESS &&
              state.data.isEmpty === false &&
              state.data.reply.map((item) => (
                <Fragment key={item.id}>
                  <Box>
                    <PostContent {...item} />
                  </Box>
                </Fragment>
              ))}
          </Grid>
        </div>
      )}
    </Box>
  )
}
