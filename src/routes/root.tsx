import React from 'react'
import Header from '../components/Header/Header'
import { Outlet } from 'react-router-dom'
import Body from "../components/Body/Body"
function Root () {
  return (
    <div>
        <Header></Header>
        <Body></Body>
    </div>
  )
}

export default Root 