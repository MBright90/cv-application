import React from 'react'
import PropTypes from 'prop-types'

import { ResetInfoModal } from './Modals'

const Footer = (props) => {
  return (
    <footer>
      <div className="footer-link">
        <a href="https://github.com/MBright90/cv-application"><i className="fa-brands fa-github"></i>MBright90</a>
      </div>
      <ResetInfoModal 
        closeModal={props.closeModal}
        resetFunc={props.resetFunc}/>
    </footer>
  )
}

Footer.propTypes = {
  closeModal: PropTypes.func,
  resetFunc: PropTypes.func,
}

export default Footer