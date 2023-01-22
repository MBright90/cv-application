import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class SaveInfoButton extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      currentMessage: '',
    }
  
    this.notifySave = this.notifySave.bind(this)
  }
  
  #clearNotification = () => {
    // Clear the success notification after three seconds
    this.timerID = setTimeout(() => {
      this.setState({
        currentMessage: ''
      })
    }, 3000)
  }
  
  notifySave = (message) => {
    this.setState({
      currentMessage: message
    })
    this.#clearNotification()
  }
  
  collectFormData = (e) => {
    // Retrieve all inputs in the account info container and return an object of values to
    // the App component
    e.preventDefault()
    const inputArr = [...e.target.parentNode.parentNode.querySelectorAll('input[type=text]')]
    const inputValues = inputArr.map((inputField) => inputField.value)
    this.props.uploadAccountInfo(inputValues)
  }
  
  render() {
    return (
      <div className="save-button-container">
        <button 
          className="save-button"
          type="submit"
          onClick={(e) => {
            this.collectFormData(e)
            this.notifySave('Update Successful')
          }}
        >Update</button>
        <p>{this.state.currentMessage}</p>
      </div>
    )
  }
}

SaveInfoButton.propTypes = {
  uploadAccountInfo: PropTypes.func
}
  