import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { REPORT_DAY } from '../gql/mutation'
import { TODAY } from '../gql/query'
import { H1, Input, P1 } from './RegisterForm'
import Spinner from './Spinner'
const Range = styled.div`
  display: flex;
  margin: 10px;
`
const RangeButton = styled.button`
  border-style: none;
  width: 2rem;
  height: 2rem;
  color: white;
  margin: 3px;
  border-radius: 20px;
  background: rgb(117, 16, 111);
  background: linear-gradient(
    324deg,
    rgba(117, 16, 111, 1) 0%,
    rgba(103, 92, 255, 1) 85%,
    rgba(86, 78, 203, 1) 100%
  );
  transition: 1s;
  :hover {
    transition: 1s;
    background: rgb(
      ${(props) => 2 * props.var + 10},
      20,
      ${(props) => 200 - props.var * 2}
    );
  }
`
const Questions = () => {
  const history = useHistory()
  const { data: today, loading, error } = useQuery(TODAY)
  const [reportDay] = useMutation(REPORT_DAY, {})
  const [value, setValue] = useState()
  const [numberOfQuestion, setNumberOfQuestion] = useState(0)
  let buttons = []
  for (let i = 0; i < 10; i++) {
    buttons.push(i)
  }
  //next time i'll rather fetch it from content manager
  const questions = [
    {
      q: 'Can you rate your anxiety level today?',
      parameter: 'anxiety',
      t: 'Number',
      max: 10,
      connotation: 'bad',
    },
    {
      q: 'How did you sleep last night?',
      explanation: "'1'-means you didn't sleep at all",
      parameter: 'sleep',
      t: 'Number',
      max: 5,
      connotation: 'good',
    },
    {
      q: 'Can you estimate your mood?',
      parameter: 'mood',
      t: 'Number',
      max: 10,
      connotation: 'good',
    },
    {
      q: 'Are you tired?',
      parameter: 'tired',
      t: 'Number',
      max: 10,
      connotation: 'bad',
    },
    {
      q: 'What is your main achivement today?',
      parameter: 'achivement',
      t: 'String',
      max: 100,
      connotation: 'no',
    },
  ]

  return questions[numberOfQuestion] === undefined ? (
    <React.Fragment>
      <H1>Thank you</H1>
      <Spinner />
      {setTimeout(() => {
        history.push('/')
      }, 3000)}
    </React.Fragment>
  ) : (
    <React.Fragment>
      {today ? '' : <Spinner />}

      <H1>{questions[numberOfQuestion].q}</H1>
      {questions[numberOfQuestion].explanation ? (
        <P1>{questions[numberOfQuestion].explanation}</P1>
      ) : (
        ''
      )}
      <Range>
        {questions[numberOfQuestion].t === 'Number' ? (
          buttons.map((i) =>
            i < questions[numberOfQuestion].max ? (
              <RangeButton
                var={
                  questions[numberOfQuestion].connotation === 'bad'
                    ? 10 * i
                    : 100 - 10 * i
                }
                key={i}
                id={i + 1}
                onClick={(e) => {
                  e.preventDefault()
                  setValue({
                    ...value,

                    [questions[numberOfQuestion].parameter]: [e.target.id],
                  })
                  setNumberOfQuestion(numberOfQuestion + 1)
                  console.log(value)
                }}
              >
                {i + 1}
              </RangeButton>
            ) : (
              ''
            ),
          )
        ) : (
          <Input
            maxLength={questions[numberOfQuestion].max}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setNumberOfQuestion(numberOfQuestion + 1)
                reportDay({
                  variables: {
                    id: today.today.id,
                    anxietyRate: Number(value.anxiety[0]),
                    moodRate: Number(value.mood[0]),
                    sleepRate: Number(value.sleep[0]),
                    tiredRate: Number(value.tired[0]),
                    achivement: value.achivement
                      ? value.achivement[0]
                      : 'nothing',
                  },
                })
              }
            }}
            onChange={(e) => {
              e.preventDefault()
              setValue({
                ...value,

                [questions[numberOfQuestion].parameter]: [e.target.value],
              })
              console.log(value)
            }}
          />
        )}
        )
      </Range>
    </React.Fragment>
  )
}
export default Questions
