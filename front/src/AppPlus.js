import React, { useState } from 'react'
import Page from './component/page'
import PostList from './container/post-list'
import './index.css'
import { useWindowListener } from './util/useWindowListener'

function AppPlus() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useWindowListener('pointermove', (e) => {
    setPosition({ x: e.clientX, y: e.clientY })
  })

  return (
    <Page>
      <PostList />
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
        className="pointer"
      ></div>
    </Page>
  )
}

export default AppPlus
