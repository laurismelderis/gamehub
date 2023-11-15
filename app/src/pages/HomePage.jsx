import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMe, selectUser } from '../slices/UserSlice'

const HomePage = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  useEffect(() => {
    dispatch(getMe())
  }, [])

  console.log(user)

  return <div>Email: {user.email}</div>
}
export default HomePage
