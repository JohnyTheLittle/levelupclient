import { ApolloClient, useApolloClient, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../components/Button'
import Spinner from '../components/Spinner'
import Square from '../components/Square'
import { IS_LOGGED_IN, QUERY_CONTENT } from '../gql/query'
import UserPage from './userPage'

const Home = () => {
  const { data, loading, error } = useQuery(QUERY_CONTENT)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const { data: isLoggedIn } = useQuery(IS_LOGGED_IN)
  const client = useApolloClient()
  if (error) return <div>{error.message}</div>
  if (loading)
    return (
      <div>
        <Spinner />
      </div>
    )
  console.log('isLoggedIn', isLoggedIn)
  if (!isLoggedIn.isLoggedIn) {
    return (
      <React.Fragment>
        <h1 style={{ fontSize: '4em', color: 'white' }}>
          {data.getContent.header}
        </h1>
        <p style={{ color: 'white' }}>{data.getContent.greeting}</p>
        <h2 style={{ color: 'white', margin: '4%' }}>
          We are here to put you on a rails of friendly discipline
        </h2>
        <Link to="/signup">
          <Button>Sign Up</Button>
        </Link>
        <Link to="/signin">
          <Button>Log In</Button>
        </Link>
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <UserPage />
      </React.Fragment>
    )
  }
}

export default Home
