import { useApolloClient, useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../components/Button'
import ExitButton from '../components/exitButton'
import ParameterModule from '../components/parameterModule'
import { H1, Input } from '../components/RegisterForm'
import Spinner from '../components/Spinner'
import Todo from '../components/todos'
import UserBadge from '../components/userBage'
import { SEND_VALUE } from '../gql/mutation'
import { GET_PROFILE, IS_LOGGED_IN, TODAY } from '../gql/query'
import { COMPLETED_TASK } from '../gql/mutation'
const Page = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 500px) {
    flex-direction: column;
    margin: 0;
    margin-top: 10%;
  }
`
const Block = styled.div`
  display: flex;
  self-align: left;
  flex-direction: column;
  margin: 2%;

  @media (max-width: 500px) {
    margin: 0;
    flex-direction: column;
    display: flex;
    self-align: center;
  }
`
const Number = styled.input`
  width: 3rem;
  height: 2rem;
  margin: 0.5rem;
  background-color: #e6e6fa;
  border-radius: 10px;
`
const Bool = styled.input`
  width: 3rem;
  height: 2rem;
  margin: 0.5rem;
  border-radius: 10px;
`
const UserPage = () => {
  useEffect(()=>{
    document.title='Your Day'
  })
  const history = useHistory()
  const client = useApolloClient()
  const { data, loading, error} = useQuery(GET_PROFILE)
  const {
    data: today,
    loading: loadingToday,
    error: todayError, refetch
  } = useQuery(TODAY)
  const [updateValue] = useMutation(SEND_VALUE)
  const [completeTask] = useMutation(COMPLETED_TASK)
  if (loading) return <Spinner />
  if (error) return <H1>{error}</H1>
  const logOut = (event) => {
    event.preventDefault()
    localStorage.removeItem('token')
    client.writeQuery({ query: IS_LOGGED_IN, data: { isLoggedIn: false } })
    history.push('/')
  }

  const onChange = (event) => {
    event.preventDefault()
    updateValue({
      variables: {
        id: today.today.id,
        name: event.target.id,
        value: event.target.value,
      },
    })
  }
  const updateTodo = (event) => {
    completeTask({
      variables: {
        taskID: String(event.target.id),
        todayID: String(today.today.id),
        value: Boolean(event.target.checked),
      },
    })
  }
  const onToggle = (event) => {
    let value = event.target.checked ? '1' : '0'

    updateValue({
      variables: {
        id: today.today.id,
        name: event.target.id,
        value,
      },
    })
  }
  return (
    <div style={{ marginTop: 10 }}>
      <UserBadge>
        <div>Hello, {data.me.username}!</div>
        <div>{data.me.days.length - 1} days</div>
        <ExitButton onClick={logOut}>Log out</ExitButton>
      </UserBadge>
      <Page>
        <Block>
          <H1>Values</H1>
          {loadingToday ? (
            <Spinner />
          ) : (
            today.today.dailyValues.map((parameter) => {
              return data.me.dailyValues.map((item) =>
                parameter.name === item.name ? (
                  <ParameterModule key={item.id} id={item.id}>
                    {item.name}
                    {item.typeOf === 'num' ? (
                      <Number
                        id={item.name}
                        onChange={onChange}
                        defaultValue={parameter.value}
                        type="number"
                      />
                    ) : (
                      <Bool
                        id={item.name}
                        onClick={onToggle}
                        type="checkbox"
                        defaultChecked={parameter.value === 0 ? false : true}
                      />
                    )}
                  </ParameterModule>
                ) : null,
              )
            })
          )}
        </Block>
        {data.me.days[0].todos.length === 0 ? null : (
          <Block>
            <H1>Todos</H1>
            {console.log(data.me.days[0].todos.map((item) => item.id))}
            {data.me.days[0].todos.map((item, index) => (
              <Todo key={`todo${index}`}>
                {item.name}

                <Bool
                  id={item.id}
                  type="checkbox"
                  onClick={updateTodo}
                  defaultChecked={item.completed ? true : false}
                />
                {console.log('completed ', item.completed)}
              </Todo>
            ))}
          </Block>
        )}
        <Block>
          <Link to="/interview">
            <Button>Pass interview?</Button>
          </Link>
          <Link to="/stats">
            <Button>Watch my stats</Button>
          </Link>
          <Link to="/todo">
            <Button>Plan my day</Button>
          </Link>
        </Block>
      </Page>
    </div>
  )
}
export default UserPage
