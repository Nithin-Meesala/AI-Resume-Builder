import React from 'react'

function SummaryPreview({resumeInfo}) {
  return (
    <div className='text-xs '>
        <p>{resumeInfo?.summary}</p>
    </div>
  )
}

export default SummaryPreview