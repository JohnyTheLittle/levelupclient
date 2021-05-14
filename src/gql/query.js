import { gql } from '@apollo/client'
const QUERY_CONTENT = gql`
  query getContent {
    getContent {
      header
      greeting
    }
  }
`
const IS_LOGGED_IN = gql`
  query {
    isLoggedIn @client
  }
`
const TODAY = gql`
query today{
  today {
    id
    createdAt
    dailyValues {
      value
      name
    }
    user {
      username
      dailyValues {
        name
        id
      }
    }
  }
}
`
const GET_PROFILE = gql`
query me {
  me {
    username
    id
    age
    dailyValues {
      id
      typeOf
      name
    }
    days {
      moodRate
      anxietyRate
      sleepRate
      achivement
      tiredRate
      createdAt
      id
      todos {
        id
        name
        completed
      }
      dailyValues {
        name
        value
      }
    }
  }
}
`
export { QUERY_CONTENT, IS_LOGGED_IN, GET_PROFILE, TODAY}
