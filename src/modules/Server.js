import * as imageConversion from 'image-conversion'

const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

export default class Server {
  constructor() {
    this.user = {
      firstName: '',
      surname: '',
      email: '',
      contactNumber: '',
      avatarImg: null,
      experience: [],
      education: [],
      coverLetter: '',
      reference: {
        name: '',
        position: '',
        email: '',
      }
    }
  }

  clearStorage() {
    localStorage.clear()
  }

  saveToStorage() {
    localStorage.setItem('user', JSON.stringify(this.user))
  }

  async loadFromStorage() {
    let savedUser
    try {
      savedUser = await JSON.parse(localStorage.getItem('user'))
    }
    finally {
      if (savedUser) this.user = savedUser
    }
  }

  //*******************//
  // Utility functions //
  //*******************//

  generateID = (array) => {
    let newID
    let IDChecking = true
    while (IDChecking) {
      // Suggest a new ID based on ms since 01/01/1970
      // Set ID checking to false so if no matches are found, it no longer checks
      newID = Date.now()
      IDChecking = false

      // Go through the array to check that current suggested ID does not match any other
      // IDs within array
      array.forEach((arrayItem) => {
        if (arrayItem.ID == newID) IDChecking = true
      })
    }
    return newID
  }

  // Formats date to (MMM YYYY) where MMM is a three letter abbreviation
  formatDate = (dateString) => {
    const dateSplitArray = dateString.split('-')

    let monthIndex = (dateSplitArray[1] - 1) >= 0 ? dateSplitArray[1] - 1 : 12

    return `${months[monthIndex]} ${dateSplitArray[0]}`
  }

  // Takes formatted date (MMM YYYY) where MMM is a three letter abbreviation and
  // returns an ISO string to pass as default value to inputs 
  revertDate = (dateString) => {
    console.log(dateString)
    const dateSplitArray = dateString.split(' ')
    const monthIndex = months.indexOf(dateSplitArray[0])
    return new Date(dateSplitArray[1], monthIndex).toISOString().substring(0,10)
  }

  // Takes the formatted date (MMM - yyyy) where MMM is a three letter abbreviation
  // and returns the array sorted by most recent first
  sortByDate = (array) => {
    if (array.length <= 1) return array
    const sortedArray = array.sort((a, b) => {
      // Split the end dates for comparison
      const aDateSplit = a.dateTo.split(' ')
      const bDateSplit = b.dateTo.split(' ')

      // Compare year ending)
      const aYearEnd = parseInt(aDateSplit[1], 10)
      const bYearEnd = parseInt(bDateSplit[1], 10)

      if (aYearEnd > bYearEnd) return -1
      if (aYearEnd < bYearEnd) return 1

      // Compare month ending if year is equal
      const aMonthEnd = months.indexOf(aDateSplit[0])
      const bMonthEnd = months.indexOf(bDateSplit[0])
      if (aMonthEnd > bMonthEnd) return -1
      if (aMonthEnd < bMonthEnd) return 1

      // If certificates completed on the same month and year
      // compare beginning dates
      const aStartDateSplit = a.dateFrom.split(' ')
      const bStartDateSplit = b.dateFrom.split(' ')
      
      // Compare year beginning
      const aYearStart = parseInt(aStartDateSplit[1], 10)
      const bYearStart = parseInt(bStartDateSplit[1], 10)
      if (aYearStart > bYearStart) return -1
      if (aYearStart < bYearStart) return 1

      // Compare month beginning if month starting is equal
      // If remains equal return -1
      const aMonthStart = months.indexOf(aDateSplit[0])
      const bMonthStart = months.indexOf(bDateSplit[0])
      if (aMonthStart >= bMonthStart) return -1
      else return 1
    })

    return sortedArray
  }

  //********************//
  // Creating functions //
  //********************//
  // If an infoID is supplied, alters the current information object with that ID.
  // Otherwise it creates a new information object and generates a random ID

  createEducationInfo(educationObj, infoID) {
    const educationItem = educationObj
    educationItem.dateFrom = this.formatDate(educationObj.dateFrom)
    educationItem.dateTo = this.formatDate(educationObj.dateTo)

    if (infoID) {
      const infoIndex = this.user.experience.map(item => item.ID).indexOf(parseInt(infoID, 10))
      this.user.education[infoIndex] = educationItem
    } else {
      educationItem.ID = this.generateID(this.user.education)
      this.user.education[this.user.education.length] = educationItem
    }

    const sortedArray = this.sortByDate(this.user.education)
    this.user.education = sortedArray
    this.saveToStorage()
  }

  createExperienceInfo(experienceObj, infoID) {

    const experienceItem = experienceObj
    experienceItem.dateFrom = this.formatDate(experienceObj.dateFrom)
    experienceItem.dateTo = this.formatDate(experienceObj.dateTo)

    if (infoID) {
      const infoIndex = (this.user.experience.map(item => item.ID)).indexOf(parseInt(infoID, 10))
      this.user.experience[infoIndex] = experienceItem
    } else {
      experienceItem.ID = this.generateID(this.user.experience)
      this.user.experience[this.user.experience.length] = experienceItem
    }

    // Sort experience array by date prior to saving
    const sortedArray = this.sortByDate(this.user.experience)
    this.user.experience = sortedArray
    console.log(this.user.experience)
    this.saveToStorage()
  }


  //*******************//
  // Reading functions //
  //*******************//

  getCurrentInfo() {
    return this.user
  }

  getInfoByID(ID, type) {

    let foundObject = -1
    this.user[type]?.forEach((arrayItem) => {
      if (arrayItem.ID == ID) {
        foundObject = arrayItem
      }
    })
    return foundObject
  }

  //****************************//
  // Updating/editing functions //
  //****************************//

  // editInfo(infoID, newDataObj, type) {
  //   console.log(newDataObj)
  //   this.user[type]?.forEach((arrayItem) => {
  //     if (arrayItem.ID === infoID) arrayItem = newDataObj
  //   })
  // }

  async updateAvatarChange(avatarImageFile) {
    const saveAvatarToStorage = (avatarBaseImg) => {
      this.user.avatarImg = avatarBaseImg
      this.saveToStorage()
    }

    // Compress image
    const blobResult = await imageConversion.compressAccurately(avatarImageFile, 200)

    // Initiate fileReader and set to save result when loaded
    const fileReader = new FileReader()
    fileReader.onload = async function(readerResult) {
      saveAvatarToStorage(readerResult.target.result)
    }

    // Pass compressed image to fileReader
    fileReader.readAsDataURL(blobResult)
  }

  updateAccountInfo(infoArray) {
    this.user.firstName = infoArray.firstName !== '' 
      ? infoArray.firstName 
      : this.user.firstName
    this.user.surname = infoArray.surname !== '' 
      ? infoArray.surname 
      : this.user.surname
    this.user.email = infoArray.email !== ''
      ? infoArray.email
      : this.user.email
    this.user.contactNumber = infoArray.number !== ''
      ? infoArray.contactNumber
      : this.user.contactNumber
    this.saveToStorage()
  }

  //********************//
  // Locating functions //
  //********************//

  // Validation methods
  // ...
  // Ensure date to are later than date from

  // TODO: Methods to save all data to localStorage

  // Sort experience/education based on date for display

  // TODO: Edit data at particular index in experience/education

  // TODO: Clear all data
}
