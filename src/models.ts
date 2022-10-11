export class PotentialAction {
  '@context': string = 'http://schema.org'
  '@type': string = 'ViewAction'
  name: string = ''
  target: string[] = []

  constructor(name: string, target: string[]) {
    this.name = name
    this.target = target
  }
}

export class Fact {
  name: string
  value: string

  constructor(name: string, value: string) {
    this.name = name
    this.value = value
  }
}
