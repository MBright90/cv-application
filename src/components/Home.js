import React from 'react'
import PropTypes from 'prop-types'

import Welcome from './Welcome'

const TemplateSection = () => {
  return (
    <div className="template-container">
      <button
        className="create-template-btn"
        onClick={() => console.log('clicked bitch')}
      >Create Template</button>
    </div>
  )
}

const Home = () => {

  return (
    <main>
      <div className="home-page-overview">
        <Welcome />
        <TemplateSection />
      </div>
    </main>
  )
}

Home.propTypes = {
  user: PropTypes.object
}

export default Home