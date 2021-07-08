export default function init() {
  setTimeout(
    console.log.bind(
      console,
      '%c%s',
      'color: red; background: yellow; font-size: 24px;',
      'WARNING!'
    )
  )
  setTimeout(
    console.log.bind(
      console,
      '%c%s',
      'font-size: 18px;',
      "Using this console may allow attackers to impersonate you and steal your information using an attack called Self-XSS.\nDo not enter or paste code that you don't understand."
    )
  )
}
