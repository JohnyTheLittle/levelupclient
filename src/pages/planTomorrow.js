import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import Button from '../components/Button'
import { H1, Input, SmallButton } from '../components/RegisterForm'
import Todo from '../components/todos'
import UserBadge from '../components/userBage'
import Spinner from '../components/Spinner'
import { PLAN_TOMORROW } from '../gql/mutation'
const PlansList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`
const TodoLine = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`

const Plans = () => {
  const [todos, setTodos] = useState([])
  const [confirmed, confirm] = useState(false)
  const history = useHistory()
  const [sendPlans] = useMutation(PLAN_TOMORROW, {
    onCompleted: (data) => {
      confirm(true)
    },
  })
  return confirmed ? (
    <div>
      <Spinner />
      <H1>Good luck with accomplishing this</H1>
      {setTimeout(() => {
        history.push('/')
      }, 3000)}
    </div>
  ) : (
    <PlansList>
      <H1>Let's plan it</H1>
      <Link to="/">
        <SmallButton>Back</SmallButton>
      </Link>
      <Input
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.target.value !== '' && setTodos([...todos, e.target.value])
            e.target.value = ''
          }
        }}
      />

      {todos.map((item, index) => (
        <Todo key={index}>
          {item}
          <SmallButton
            id={index}
            onClick={(e) => {
              e.preventDefault()
              console.log(
                'todos ',
                todos.filter((item, index) => index !== Number(e.target.id)),
              )
              setTodos(
                todos.filter((item, index) => index !== Number(e.target.id)),
              )
              console.log('id ', e.target.id)
              console.log('element ', todos[e.target.id])
            }}
          >
            x
          </SmallButton>
        </Todo>
      ))}
      {todos.length > 0 ? (
        <Button
          onClick={(e) => {
            e.preventDefault()
            console.log(todos)
            sendPlans({ variables: { todos } })
          }}
        >
          Confirm
        </Button>
      ) : null}
    </PlansList>
  )
}

export default Plans
