import React from 'react'
import { ColorRing } from  'react-loader-spinner'

function Loaders() {
  return (
    <div>
      <ColorRing
  height="100"
  width="100"
  color="#4fa94d"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
  outerCircleColor=""
  innerCircleColor=""
  barColor=""
  ariaLabel='circles-with-bar-loading'
/>
    </div>
  )
}

export default Loaders
