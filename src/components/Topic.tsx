import React from 'react'
import { Topic as ITopic } from '../interfaces/Topic'
import {
  Box,
  Stack,
  IconButton,
  Heading,
  Text,
  Button,
  ButtonGroup,
  Flex
} from '@chakra-ui/core'
import {
  TiArrowUpThick,
  TiArrowDownThick,
  TiMessage,
  TiLocationArrow,
  TiInfo
} from 'react-icons/ti'

const Topic = ({ topic }: { topic: ITopic }) => {
  const userId = 'user1'
  const [userVote] = topic.votes.filter(
    vote => vote.membership.user.id === userId
  )

  return (
    <Box className='border w-1/3 p-2 m-2 rounded-md'>
      <Stack>
        <Stack isInline spacing={2}>
          <Stack spacing={2} justify='between'>
            <IconButton
              aria-label='upvote'
              icon={TiArrowUpThick}
              variantColor={userVote?.type === 'UPVOTE' ? 'blue' : 'gray'}
            />
            <Text className='text-center font-bold text-lg'>
              {topic.votes.length}
            </Text>
            <IconButton
              aria-label='downvote'
              icon={TiArrowDownThick}
              variantColor={userVote?.type === 'DOWNVOTE' ? 'red' : 'gray'}
            />
          </Stack>

          <Stack spacing={2}>
            <Heading size='md'>{topic.title}</Heading>
            <Text>
              {topic.content.length > 120
                ? topic.content.substr(0, 120) + '...'
                : topic.content}
            </Text>
          </Stack>
        </Stack>
        <Flex>
          <Button roundedRight='0' className='flex-grow' leftIcon={TiMessage}>
            Comments
          </Button>
          <Button rounded='0' className='flex-grow' leftIcon={TiLocationArrow}>
            Share
          </Button>
          <Button roundedLeft='0' className='flex-grow' leftIcon={TiInfo}>
            Report
          </Button>
        </Flex>
      </Stack>
    </Box>
  )
}

export default Topic
