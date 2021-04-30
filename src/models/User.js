export default class User {
  /**
   * Create a user.
   * @param {String} id - Place holder for a unique Firebase id.
   * @param {String} backgroundPhoto - A generated URL from Google Storage.
   * @param {String} email - A valid email.
   * @param {String} fullName - The user's full name.
   * @param {String} mobile - the user's mobile number.
   * @param {String} profilePhoto - A generated URL from Google Storage.
  */
  id = ''
  email = ''
  displayName = ''
  phoneNumber = ''
  photoURL = ''
  backgroundPhoto = ''

  /**
   * @param  {Object} args - User args
   */
  constructor ({ id, displayName = '', email, phoneNumber = '', photoURL = '', backgroundPhoto = '' }) {
    this.id = id
    this.displayName = displayName
    this.email = email
    this.phoneNumber = phoneNumber
    this.photoURL = photoURL
    this.backgroundPhoto = backgroundPhoto
    return {
      ...this
    }
  }
}
