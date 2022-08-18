import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
      <div>Что-то пошло не так. Проверьте url запроса</div>
      <Link to='/'>На главную</Link>
    </>
  )
}

export default NotFound