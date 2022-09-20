export class ProfileModel {
  private name: string
  private email: string
  private role: string
  constructor(name: string, email: string, role: string) {
    this.name = name
    this.email = email
    this.role = role
  }

  get getName(): string {
    return this.name
  }
  set setName(name: string) {
    this.name = name
  }

  get getEamil(): string {
    return this.email
  }
  set setEmail(email: string) {
    this.email = email
  }

  get getRole(): string {
    return this.role
  }
  set setRole(role: string) {
    this.role = role
  }
}
