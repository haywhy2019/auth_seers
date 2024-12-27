import React from 'react'

function ErrorComponent({action}:{action:string}) {
  return (
    <div><p>An error occured {action}</p></div>
  )
}

export default ErrorComponent