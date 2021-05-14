import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { H1 } from '../components/RegisterForm'
import { NavBar, NavButton } from '../components/Navigation'
import { GET_PROFILE } from '../gql/query'
import {
  VictoryLine,
  VictoryTheme,
  VictoryArea,
  VictoryBar,
  VictoryAxis,
  VictoryChart,
  VictoryGroup,
  VictoryZoomContainer,
} from 'victory'
import Spinner from '../components/Spinner'
import UserBadge from '../components/userBage'
import Button from '../components/Button'
import Navigation from '../components/Navigation'
import styled from 'styled-components'
import { useHistory } from 'react-router'
const Container = styled.div`
  width: 80%;
  font-size: 10px;
  margin: 2%;
`
const Stats = () => {
  const [anxiety, toggleAnxiety] = useState(false)
  const history = useHistory()
  const [mood, toggleMood] = useState(false)
  const [sleep, toggleSleep] = useState(false)
  const [tired, toggleTired] = useState(false)
  const [showDailyValues, toggleDailyValues] = useState(false)
  const [toggledValues, toggleValues] = useState([])
  const { data, loading, error } = useQuery(GET_PROFILE)
  return loading ? (
    <Spinner />
  ) : (
    <Container>
      <React.Fragment>
        {console.log(data.me.dailyValues)}
        <H1>
          Stats{' '}
          <NavButton
            onClick={(e) => {
              e.preventDefault()
              history.push('/')
            }}
          >
            Back
          </NavButton>
        </H1>

        <NavBar>
          <NavButton
            clicked={anxiety}
            onClick={(e) => {
              e.preventDefault()
              toggleAnxiety(!anxiety)
            }}
          >
            Anxiety
          </NavButton>
          <NavButton
            clicked={mood}
            onClick={(e) => {
              e.preventDefault()
              toggleMood(!mood)
            }}
          >
            Mood
          </NavButton>
          <NavButton
            clicked={sleep}
            onClick={(e) => {
              e.preventDefault()
              toggleSleep(!sleep)
            }}
          >
            Sleep
          </NavButton>
          <NavButton
            clicked={tired}
            onClick={(e) => {
              e.preventDefault()
              toggleTired(!tired)
            }}
          >
            Tired
          </NavButton>{' '}
          <NavButton
            onClick={(e) => {
              e.preventDefault()
              history.push('/document')
            }}
          >
            Get my PDF
          </NavButton>
        </NavBar>
        <NavBar>
          <NavButton
            onClick={(e) => {
              e.preventDefault()
              toggleDailyValues(!showDailyValues)
            }}
          >
            My Values
          </NavButton>
          {showDailyValues
            ? data.me.dailyValues.map((item, index) => (
                <NavButton
                  clicked={toggledValues.includes(index) ? true : false}
                  onClick={(e) => {
                    e.preventDefault()
                    console.log(toggledValues)
                    toggledValues.includes(index)
                      ? toggleValues([
                          ...toggledValues.filter((value) => value !== index),
                        ])
                      : toggleValues([...toggledValues, index])
                  }}
                  key={item.name}
                >
                  {item.name}
                </NavButton>
              ))
            : null}
        </NavBar>
        {!showDailyValues ? (
          <H1>
            <VictoryChart
              containerComponent={<VictoryZoomContainer />}
              // adding the material theme provided with Victory
              theme={VictoryTheme.material}
              scale={{ x: 'time' }}
            >
              <VictoryAxis
                dependentAxis
                tickFormat={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
              />
              <VictoryAxis style={{ tickLabels: { angle: -40 } }} />
              <VictoryGroup
                style={{
                  data: { strokeWidth: 3, fillOpacity: 0.2 },
                }}
              >
                {mood === true ? (
                  <VictoryArea
                    style={{
                      data: { fill: 'magenta', stroke: 'magenta' },
                    }}
                    data={data.me.days.map((item) => ({
                      x: item.createdAt.slice(5, 10),
                      y: item.moodRate,
                    }))}
                    x="x"
                    y="y"
                  />
                ) : null}
                {sleep ? (
                  <VictoryArea
                    style={{
                      data: { fill: 'cyan', stroke: 'cyan' },
                    }}
                    data={data.me.days.map((item) => ({
                      x: item.createdAt.slice(5, 10),
                      y: item.sleepRate,
                    }))}
                    x="x"
                    y="y"
                  />
                ) : null}
                {anxiety ? (
                  <VictoryArea
                    style={{
                      data: { fill: 'blue', stroke: 'blue' },
                    }}
                    data={data.me.days.map((item) => ({
                      x: item.createdAt.slice(5, 10),
                      y: item.anxietyRate,
                    }))}
                    x="x"
                    y="y"
                  />
                ) : null}
                {tired ? (
                  <VictoryArea
                    style={{
                      data: { fill: 'green', stroke: 'green' },
                    }}
                    data={data.me.days.map((item) => ({
                      x: item.createdAt.slice(5, 10),
                      y: item.tiredRate,
                    }))}
                    x="x"
                    y="y"
                  />
                ) : null}
              </VictoryGroup>
            </VictoryChart>
          </H1>
        ) : (
          <H1>
            <VictoryGroup>
              <VictoryChart theme={VictoryTheme.material}>
                {toggledValues.map((number) => (
                  <VictoryLine
                    style={{
                      data: {
                        stroke: `rgb(${Math.floor(
                          number * 10 + Math.random() * 200,
                        )}, ${Math.floor(
                          number * 10 + Math.random() * 200,
                        )}, ${Math.floor(number * 10 + Math.random() * 200)})`,
                      },
                    }}
                    data={data.me.days.map((item) => ({
                      y: item.dailyValues[number].value,
                      x: item.createdAt.slice(5, 10),
                    }))}
                    x="x"
                    y="y"
                  />
                ))}
              </VictoryChart>
            </VictoryGroup>
          </H1>
        )}
      </React.Fragment>
      {console.log(data.me.days)}
    </Container>
  )
}
export default Stats
