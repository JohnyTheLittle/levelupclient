import gql from 'graphql-tag'
const SIGN_IN = gql`
  mutation signIn($username: String!, $password: String!) {
    signIn(username: $username, password: $password)
  }
`
const SIGN_UP = gql`
  mutation signUp(
    $username: String!
    $email: String!
    $password: String!
    $gender: String
    $age: Int
    $dailyValues: [defineDailyValues]
  ) {
    signUp(
      username: $username
      email: $email
      password: $password
      gender: $gender
      age: $age
      dailyValues: $dailyValues
    )
  }
`
const SEND_VALUE = gql`
  mutation setOwnParameter($name: String!, $value: String, $id: ID!) {
    setOwnParameter(name: $name, value: $value, id: $id) {
      dailyValues {
        name
        value
      }
    }
  }
`
const REPORT_DAY = gql`
  mutation reportDay(
    $id: ID!
    $tiredRate: Int!
    $sleepRate: Int!
    $achivement: String!
    $moodRate: Int!
    $anxietyRate: Int!
  ) {
    reportDay(
      id: $id
      anxietyRate: $anxietyRate
      moodRate: $moodRate
      achivement: $achivement
      sleepRate: $sleepRate
      tiredRate: $tiredRate
    ) {
      id
    }
  }
`
const PLAN_TOMORROW = gql`
  mutation setTomorrowPlans($todos: [String]) {
    setTomorrowPlans(todos: $todos) {
      todos {
        name
        completed
      }
      id
    }
  }
`
const COMPLETED_TASK = gql`
  mutation completedTask(
    $taskID: ID!
    $todayID: ID!
    $value: Boolean
  ) {
    completedTask(
      taskID: $taskID
      todayID: $todayID
      value: $value
    ) {
      id
      productivity
      todos {
        id
        name
        completed
      }
    }
  }
`
export {
  SIGN_UP,
  SIGN_IN,
  SEND_VALUE,
  REPORT_DAY,
  PLAN_TOMORROW,
  COMPLETED_TASK,
}
