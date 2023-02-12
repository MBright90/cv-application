import React from 'react'
import PropTypes from 'prop-types'

import './style.css'
import CreateTemplateButton from '../../utilities/buttons/createTemplateButton/CreateTemplateButton'
import Welcome from '../welcome/Welcome'

const HomeOverview = (props) => {

  return (
    <main>
      <div className="home-page-overview">
        <Welcome />
        <CreateTemplateButton 
          changePageShown={props.changePageShown}/>
      </div>
    </main>
  )
}

HomeOverview.propTypes = {
  changePageShown: PropTypes.func,
  user: PropTypes.object
}

export default HomeOverview