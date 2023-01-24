import * as imageConversion from 'image-conversion'

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
    }
  }

  getCurrentInfo() {
    return this.user
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
  //********************//
  // Updating functions //
  //********************//

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

  updateEducationInfo(educationObj) {
    const formatDate = (dateString) => {
      const dateArray = dateString.split('-')

      const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
      let monthIndex = (dateArray[1] - 1) >= 0 ? dateArray[1] - 1 : 12

      return `${months[monthIndex]} ${dateArray[0]}`
    }

    const educationItem = educationObj
    educationItem.dateFrom = formatDate(educationObj.dateFrom)
    educationItem.dateTo = formatDate(educationObj.dateTo)

    console.log(educationItem)

    // this.user.education[this.user.education.length] = educationItem
  }

  //********************//
  // Locating functions //
  //********************//

  // Validation methods
  // ...
  // Ensure date to are later than date from

  // TODO: Methods to save all data to localStorage
  
  // TODO: take an argument for each attribute and save.

  // TODO: Edit data at particular index in experience/education

  // TODO: Overwrite personal data
}
