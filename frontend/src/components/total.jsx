import React from 'react'

const Total = (props) => {
  return (
    <div>
          <h2>Total Amount: {props.total.toFixed(2)}</h2>
    </div>
  )
}

export default Total
