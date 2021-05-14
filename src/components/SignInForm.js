import { useApolloClient, useMutation } from '@apollo/client'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { SIGN_IN } from '../gql/mutation'
import { IS_LOGGED_IN } from '../gql/query'
import Button from './Button'
import { Form, Input, Label, P1 } from './RegisterForm'

const SignInForm = () => {
  const [value, setValue] = useState({ username: '', password: '' })
  const client = useApolloClient()
  const history = useHistory()
  const onChange = (event) => {
    event.preventDefault()
    setValue({ ...value, [event.target.name]: [event.target.value] })
  }
  const [signIn] = useMutation(SIGN_IN, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signIn)
      client.writeQuery({ query: IS_LOGGED_IN, data: { isLoggedIn: true } })
      history.push('/')
    },
    onError: (error) => {
      console.log(error)
    },
  })
  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault()
        signIn({
          variables: {
            username: value.username[0],
            password: value.password[0],
          },
        })
      }}
    >
      <Label>Username</Label>
      <Input onChange={onChange} name="username" />
      <Label>Password</Label>
      <Input type="password" onChange={onChange} name="password" />
      <Button>Submit</Button>
      <P1>Not with us yet?</P1>
      <Link to="/signup">
        <Button type="submit">Sign Up</Button>
      </Link>
    </Form>
  )
}

export default SignInForm
