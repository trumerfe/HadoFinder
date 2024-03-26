import React from 'react'
import './DateSelect.scss'

const test = (event) => {
  event.preventDefault()
  console.log(event.target.monthFilter.value)
}

const DateSelect = () => {
  return (
    <form onSubmit={test} className='dateSelect'>
      <label className='dateSelect__label' htmlFor="monthFilter">Month: </label>
      <input type="date" name='monthFilter' />
      <button>Submit</button>
    </form>
  )
}

export default DateSelect