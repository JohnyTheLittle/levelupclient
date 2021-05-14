import React from 'react'
import ReactPDF, {
  Page,
  PDFViewer,
  View,
  Text,
  StyleSheet,
  Font,
  Svg,
  Line,
} from '@react-pdf/renderer'
import { Document } from '@react-pdf/renderer'
import { useQuery } from '@apollo/client'
import { GET_PROFILE } from '../gql/query'
import Spinner from '../components/Spinner'
import { H1 } from '../components/RegisterForm'

const styles = StyleSheet.create({
  page: {
    borderRadius: 20,
    margin: '2%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#87a2df',
    padding: 10,
    display: 'flex',
  },
  section: {
    margin: 10,
  },
  stringNormal: {
    justifyContent: 'center',
    margin: 2,
    backgroundColor: '#87dfa0',
    padding: 5,
    fontSize: 15,
    borderRadius: 10,
    fontWeight: 'bold',
  },
  stringWarning: {
    justifyContent: 'center',
    backgroundColor: '#d6df87',
    color: 'black',
    margin: 2,
    padding: 5,
    fontSize: 15,
    borderRadius: 10,
    fontWeight: 'bold',
  },
  stringDanger: {
    justifyContent: 'center',
    backgroundColor: '#902B59',
    color: 'white',
    margin: 2,
    padding: 5,
    fontSize: 15,
    borderRadius: 10,
    fontWeight: 'bold',
  },
  string: {
    margin: 2,
    padding: 5,
    fontSize: 15,
    borderRadius: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    padding: 10,
    backgroundColor: 'white',
    fontWeight: 'bold',
  },
})

// Create Document Component
const MyDocument = ({ days }) => {
  console.log('days', days)
  return (
    <Document>
      <Page size="A4">
        <Text style={styles.title}>Mood Rate</Text>
        <View style={styles.page}>
          <View style={styles.section}>
            {days.map((item, index) => (
              <Text
                style={
                  item.moodRate > 7
                    ? styles.stringWarning
                    : item.moodRate <= 4
                    ? styles.stringDanger
                    : styles.stringNormal
                }
                key={index}
              >
                {item.moodRate}
              </Text>
            ))}
          </View>
          <View style={styles.section}>
            {days.map((item, index) => (
              <Text style={styles.string} key={`${index}date`}>
                {item.createdAt.slice(5, 10)}
              </Text>
            ))}
          </View>
        </View>
      </Page>
      <Page>
        <Text style={styles.title}>Anxiety Rate</Text>
        <View style={styles.page}>
          <View style={styles.section}>
            {days.map((item, index) => (
              <Text
                style={
                  item.anxietyRate < 6
                    ? styles.stringNormal
                    : styles.stringDanger
                }
                key={index}
              >
                {item.anxietyRate}
              </Text>
            ))}
          </View>
          <View style={styles.section}>
            {days.map((item, index) => (
              <Text style={styles.string} key={`${index}date`}>
                {item.createdAt.slice(5, 10)}
              </Text>
            ))}
          </View>
        </View>
      </Page>
      <Page>
        <Text style={styles.title}>Sleep Rate</Text>
        <View style={styles.page}>
          <View style={styles.section}>
            {days.map((item, index) => (
              <Text
                style={
                  item.sleepRate > 3
                    ? styles.stringNormal
                    : item.sleepRate === 3
                    ? styles.stringWarning
                    : styles.stringDanger
                }
                key={index}
              >
                {item.sleepRate}
              </Text>
            ))}
          </View>
          <View style={styles.section}>
            {days.map((item, index) => (
              <Text style={styles.string} key={`${index}date`}>
                {item.createdAt.slice(5, 10)}
              </Text>
            ))}
          </View>
        </View>
      </Page>
      <Page>
        <Text style={styles.title}>Tired Rate</Text>
        <View style={styles.page}>
          <View style={styles.section}>
            {days.map((item, index) => (
              <Text
                style={
                  item.tiredRate > 6 ? styles.stringDanger : styles.stringNormal
                }
                key={index}
              >
                {item.tiredRate}
              </Text>
            ))}
          </View>
          <View style={styles.section}>
            {days.map((item, index) => (
              <Text style={styles.string} key={`${index}date`}>
                {item.createdAt.slice(5, 10)}
              </Text>
            ))}
          </View>
        </View>
      </Page>
    </Document>
  )
}

const Statistics = () => {
  const { data, loading, error } = useQuery(GET_PROFILE)

  return loading ? (
    <Spinner />
  ) : (
    <div>
        <H1>Here is you PDF</H1>
      <PDFViewer style={{ width: '30vh', height: '20vh' }}>
        <MyDocument days={data.me.days} />
      </PDFViewer>
    </div>
  )
}

export default Statistics
