import { v4 as uuid } from 'uuid'
import { accessCheckIntervalMs, accessTtlMs } from '../../resources/constances'

export class Access {
  /**
   * Attributes
   */
  private access_token: string
  private user_id: string
  private timestamp: number
  private isValid: boolean
  private timer: NodeJS.Timer

  /**
   * Constructor
   */
  constructor(user_id: string) {
    this.access_token = uuid()
    this.user_id = user_id
    this.timestamp = new Date().getTime()
    this.isValid = true
    this.timer = setInterval(() => {
      this.isValid =
        this.isValid && new Date().getTime() - this.timestamp < accessTtlMs

      if (this.isValid === false) {
        clearInterval(this.timer)
      }
    }, accessCheckIntervalMs)
  }

  /**
   * Functions
   */
  getAccessToken() {
    return this.access_token
  }

  getUserId() {
    return this.user_id
  }

  checkValidity() {
    return this.isValid
  }

  updateTimestamp() {
    this.timestamp = new Date().getTime()
  }

  remove() {
    this.isValid = false
  }
}
