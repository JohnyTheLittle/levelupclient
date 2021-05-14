import { gql, useApolloClient, useMutation } from '@apollo/client'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { SIGN_UP } from '../gql/mutation'
import Button from './Button'
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  justify-content: center;
`
const Line = styled.div`
  padding: 2%;
  justify-content: space-evenly;
  transition-duration: 1s;
  display: flex;
  flex-direction: row;
  background: linear-gradient(
    328deg,
    rgba(9, 9, 121, 1) 35%,
    rgba(175, 0, 255, 1) 100%
  );
  border-radius: 10px;
  margin: 1rem;
  :hover {
    transition-duration: 1s;
    background: linear-gradient(
      145deg,
      rgba(72, 93, 223, 1) 16%,
      rgba(175, 0, 255, 1) 100%
    );
  }
`
const SmallButton = styled.button`
  border-radius: 10px;
  background-color: transparent;
  color: white;
`
const Label = styled.label`
  font-size: 2rem;
  color: white;
`
const H1 = styled.h1`
  margin: auto;
  font-size: 2rem;
  color: white;
`
const Input = styled.input`
  background-color: #f0f8ff;
  color: #002244;
  border-radius: 10px;
  margin: 0.5em;
  height: 30px;
  font-size: 30px;
  font-family: Inconsolata;
  ${(props) => {
    if (props.width) {
      return 'width: ' + props.width + 'rem'
    }
  }}
`
const P1 = styled.p`
  color: white;
  margin: 1%;
`

const Select = styled.select`
  margin-left: 1%;
  margin-right: 1%;
  border-radius: 20px;
  background-color: black;
  color: white;
  option {
    border-radius: 20px;
    background-color: #6a5acd;
    outline: none;
  }
`

const RegisterForm = () => {
  const [primarySubmited, submitPrimary] = useState(false)
  const [primaryValues, setPrimaryValues] = useState()
  const [secondarySubmited, submitSecondary] = useState(false)
  const [secondaryValues, setSecondaryValues] = useState()
  const [parameters, addParameter] = useState([])
  const [nameOfParameter, addNameParameter] = useState('')
  const client = useApolloClient()
  const history = useHistory()
  const [signUp] = useMutation(SIGN_UP, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.signUp)
      client.writeQuery({
        query: gql`
          query IsLoggedIn {
            isLoggedIn
          }
        `,
        data: { isLoggedIn: true },
      })
      history.push('/')
    },
  })
  const onChangeName = (event) => {
    event.preventDefault()
    addNameParameter(event.target.value)
    console.log(nameOfParameter)
  }

  const onAdd = (event) => {
    event.preventDefault()
    document.getElementById('input').value = ''
    addParameter([...parameters, { name: nameOfParameter, typeOf: 'bool' }])
    console.log(parameters)
  }
  const onRemove = (event) => {
    event.preventDefault()
    let filteredParameters = parameters.filter(
      (item, index) => index !== Number(event.target.id),
    )
    addParameter(filteredParameters)
  }
  const onChangePrimary = (event) => {
    setPrimaryValues({
      ...primaryValues,
      [event.target.name]: [event.target.value],
    })
  }
  const onChangeSecondary = (event) => {
    setSecondaryValues({
      ...secondaryValues,
      [event.target.name]: [event.target.value],
    })
  }

  if (!primarySubmited) {
    return (
      <React.Fragment>
        <H1>Nice to meet you!</H1>
        <Form
          onSubmit={(e) => {
            e.preventDefault()
            submitPrimary(true)
            console.log(primaryValues)
          }}
        >
          <Label htmlFor="username">What is your name?</Label>
          <Input
            width="12"
            onChange={onChangePrimary}
            name="username"
            id="username"
            type="text"
          />
          <Label htmlFor="email">What about email?</Label>
          <Input
            width="12"
            onChange={onChangePrimary}
            name="email"
            type="email"
            id="email"
          />
          <Label name="password" htmlFor="password">
            Let's make a strong password)
          </Label>
          <Input
            width="12"
            onChange={onChangePrimary}
            type="password"
            id="password"
            name="password"
          />
          <Button type="submit">Okay</Button>
        </Form>
        <P1>Already with us?</P1>
        <Link to="/signin">
          <Button>Sign In</Button>
        </Link>
      </React.Fragment>
    )
  }
  if (!secondarySubmited) {
    return (
      <React.Fragment>
        <H1>Well, let's continue)</H1>
        <Form
          onSubmit={(event) => {
            event.preventDefault()
            submitSecondary(true)
            console.log(secondaryValues)
          }}
        >
          <Label htmlFor="age">What's your age?</Label>
          <Input
            onChange={onChangeSecondary}
            width="5"
            min="10"
            id="age"
            name="age"
            type="number"
          />
          <Label>What is your gender identity?</Label>
          <P1>We admit and accept non-binary persons as well.</P1>
          <Input
            onChange={onChangeSecondary}
            width="10"
            id="gender"
            name="gender"
            type="text"
          />
          <Button type="submit">Let's move on</Button>
        </Form>
      </React.Fragment>
    )
  }
  return (
    <React.Fragment>
      <H1>Well</H1>
      <H1>Let's set tracking parameters</H1>
      <h3 style={{ color: 'white' }}>
        It is parameters which you want to control daily. For some people it
        could be number of cigarrets, for some - coffee cups.
      </h3>
      <h3 style={{color: 'white'}}>You can set as many as you want.</h3>
      <h3 style={{ color: 'white' }}>
        Also you can choose way to control it. As example: you can answer with
        number for coffee cups and "yes or no" for physical activity
      </h3>
      <Label>Parameter's name:</Label>
      {parameters.map((item, index) => (
        <Line key={index}>
          <P1> {item.name}</P1>
          <Select
            onChange={(e) => {
              e.preventDefault()
              console.log(e.currentTarget.id)
              parameters[e.currentTarget.id].typeOf = e.currentTarget.value
            }}
            id={index}
          >
            <option value="bool">Answer "yes" or "no"</option>
            <option value="num">Just set a number</option>
          </Select>
          <SmallButton id={index} onClick={onRemove}>
            X
          </SmallButton>
        </Line>
      ))}
      <Input id="input" onChange={onChangeName} />
      <Button onClick={onAdd}>
        <H1>+</H1>
      </Button>
      {parameters.length > 1 ? (
        <Button
          onClick={(e) => {
            e.preventDefault()
            console.log('primaryValues', primaryValues)
            console.log('secondaryValues', secondaryValues)
            console.log('parameters', parameters)
            signUp({
              variables: {
                username: primaryValues.username[0],
                password: primaryValues.password[0],
                email: primaryValues.email[0],
                age: Number(secondaryValues.age[0]),
                gender: secondaryValues.gender[0],
                dailyValues: parameters,
              },
            })
          }}
        >
          Continue
        </Button>
      ) : (
        ''
      )}
    </React.Fragment>
  )
}

export default RegisterForm
export { H1, Form, Input, Select, Label, P1, SmallButton }
