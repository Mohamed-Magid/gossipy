import React from 'react'
import { Topic as ITopic } from '../interfaces/Topic'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { GET_TOPIC } from '../graphql/queries'
import Loading from '../components/Loading'
import BackgroundMessage from '../components/BackgroundMessage'
import TopicCard from '../components/TopicCard'
import Comments from '../components/Comments'

const Topic = () => {
  const { station: stationIdentifier, topic: topicIdentifier } = useParams()

  const { data, loading, error } = useQuery(GET_TOPIC, {
    variables: {
      stationIdentifier,
      topicIdentifier
    }
  })

  if (loading) return <Loading message='Loading Topic' />
  if (error)
    return <BackgroundMessage type='Error' message='Topic was not found' />

  const { topic }: { topic: ITopic } = data

  return (
    <div id='topic'>
      <TopicCard topic={topic} charLimit={false} useLinks={false} />

      <Comments comments={topic.comments || []} />
    </div>
  )
}

export default Topic
