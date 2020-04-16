import React, { useEffect, useState } from 'react'
import { SEARCH } from '../graphql/queries'
import { useQuery } from '@apollo/react-hooks'
import { useQueryParam } from 'use-query-params'
import Loading from '../components/Loading'
import BackgroundMessage from '../components/BackgroundMessage'
import { Search } from '../interfaces/Search'
import { User } from '../interfaces/User'
import { Station } from '../interfaces/Station'
import { Topic } from '../interfaces/Topic'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@chakra-ui/core'
import TopicCard from '../components/TopicCard'
import UserCard from '../components/UserCard'

const SearchPage = () => {
  const [query, setQuery] = useQueryParam<string>('query')
  const [page, setPage] = useQueryParam<number>('page')

  const [users, setUsers] = useState<User[]>([])
  const [stations, setStations] = useState<Station[]>([])
  const [topics, setTopics] = useState<Topic[]>([])

  if (!query) setQuery('ahly')
  if (!page) setPage(1)

  const { data, loading, error } = useQuery(SEARCH, {
    variables: {
      query: query || '',
      page: page ? +page : 1
    }
  })

  useEffect(() => {
    if (data?.search) {
      const { search }: { search: Search } = data
      setUsers(search.users)
      setStations(search.stations)
      setTopics(search.topics)
    }
  }, [data])

  if (loading) return <Loading />
  if (error) return <BackgroundMessage type='Error' message='Search failed' />

  return (
    <div>
      <Tabs align='center' variant='soft-rounded' variantColor='blue'>
        <TabList>
          <Tab>Users</Tab>
          <Tab>Stations</Tab>
          <Tab>Topics</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {users.map(user => (
              <UserCard key={user.id} user={user} />
            ))}
          </TabPanel>
          <TabPanel>{stations.map(station => station.name)}</TabPanel>
          <TabPanel>
            {topics.map(topic => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default SearchPage
