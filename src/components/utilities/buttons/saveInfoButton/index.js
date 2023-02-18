import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'

import './style.css'

export default function SaveInfoButton(props) {
  const [activeMessage, setActiveMessage] = useState('')

  let highlightTimerID
  let notificationTimerID

  const removeInvalidHighlight = (inputElement) => {
    // Clear the invalid highlighting after three seconds
    highlightTimerID = setTimeout(() => {
      inputElement.classList.remove('invalid-highlight')
    }, 3000)
  }

  const highlightInvalidField = (inputElement) => {
    inputElement.classList.add('invalid-highlight')
    removeInvalidHighlight(inputElement)
  }

  const clearNotification = () => {
    // Clear the success notification after three seconds
    notificationTimerID = setTimeout(() => {
      setActiveMessage('')
    }, 3000)
  }

  const notifyMessage = (message) => {
    setActiveMessage(message)
    clearNotification()
  }

  const handleFormData = (e) => {
    const clearValues = (inputElements) => {
      inputElements.forEach((el) => (el.value = null))
    }

    e.preventDefault()

    // Search for all inputs/textAreas within the form and
    // submit to the server for validation before committing
    const inputArr = [
      ...e.target.parentNode.parentNode.querySelectorAll('input'),
      ...e.target.parentNode.parentNode.querySelectorAll('textarea')
    ]

    // Retrieve an array, with index 0 being the validation message and
    // index 1 being the first invalid field
    const validatedInfo = props.validateInputSubmission(inputArr)

    if (!validatedInfo[1]) {
      // map into an array of values for parsing and pass to relevant server function
      const inputValues = inputArr.map((inputField) => inputField.value)
      props.uploadData(inputValues, e.target.dataset.itemId, e.target.dataset.infoType)
      notifyMessage('Update successful')
      if (props.setToClear === true) clearValues(inputArr)

      // If editing via an open modal, close model after submitting
      if (props.closeModal) props.closeModal()
    } else {
      // If there is a validation message to display, notify the user and
      // highlight all invalid fields
      notifyMessage(validatedInfo[0])
      highlightInvalidField(validatedInfo[1])
    }
  }

  useEffect(() => {
    return () => {
      clearTimeout(highlightTimerID)
      clearTimeout(notificationTimerID)
    }
  }, [])

  return (
    <div className="save-button-container span-two">
      <button
        className="save-button hover-button"
        type="submit"
        data-item-id={props.itemID}
        data-info-type={props.infoType}
        onClick={handleFormData}
      >
        Update
      </button>
      <p>{activeMessage}</p>
    </div>
  )
}

SaveInfoButton.defaultProps = {
  infoType: '',
  itemID: '',
  setToClear: true
}

SaveInfoButton.propTypes = {
  closeModal: PropTypes.func,
  infoType: PropTypes.string,
  itemID: PropTypes.string,
  setToClear: PropTypes.bool,
  uploadData: PropTypes.func,
  validateInputSubmission: PropTypes.func
}
