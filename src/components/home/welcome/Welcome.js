import React from 'react'

import './style'

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1>Welcome to Your CV</h1>
      <p>
            This is an online space to keep track of all of your experience and certificates. When applying for jobs,
            it is easy to forget many of the skills and life experiences we all possess. However, by using the tools afforded
            to you via this website, you are able to build up a set of reference material for when that perfect job does pop up.
      </p>
      <p>
            All of the data you input on this site is saved within your local storage and is not seen by anyone else, including us.
            This way, you can be sure your data and privacy are all well protected. Once you have filled out all of the relevant fields,
            head back here and create your CV template.
      </p>
    </div>
  )
}

export default Welcome