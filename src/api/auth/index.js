const LOGIN = `
  query login($username: String!, $password: String!) {
    user(where: { _and: { deleted_at: { _is_null: true }, user_name: { _eq: $user_name }, password: { _eq: $password } } }) {
      id
    }
  }
`

module.exports = {
  LOGIN
}
