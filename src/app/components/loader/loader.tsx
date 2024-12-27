import { Loading } from '@carbon/react'
import React from 'react'

function Loader() {
  return (
    <div>
        <Loading className={'some-class'} withOverlay={true} />;
    </div>
  )
}

export default Loader