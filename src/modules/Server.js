export default class Server {
  constructor() {
    this.user = {
      name: '',
      contactNumber: '',
      avatarImg: null,
      experience: null,
      education: null,
      coverLetter: null,
    }
  }

  getCurrentInfo() {
    return this.user
  }

  // TODO: Methods to save all data to localStorage
  
  // TODO: take an argument for each attribute and save.

  // TODO: Edit data at particular index in experience/education

  // TODO: Overwrite personal data
}
