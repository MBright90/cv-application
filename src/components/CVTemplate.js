import React from 'react'
import PropTypes from 'prop-types'

import Avatar from './Avatar'

const CVTemplate = (props) => {
  return (
    <main>
      <div className="template-overview">
        <div>
          <Avatar 
            imgSource={props.userInfo.avatarImg}/>
        </div>
        {/* Avatar goes here */}
        {/* Name and Profession */}
        {/* Contact Details / Reference details */}
        {/* Experience */}
        {/* Education */}
      </div>
    </main>
  )
}

CVTemplate.propTypes = {
  userInfo: PropTypes.object,
}

export default CVTemplate