import React, { useContext } from 'react'
import { Comment } from '../interfaces/Comment'
import useGradient from '../hooks/useGradient'
import { IconButton, Button, useColorMode } from '@chakra-ui/core'
import { TiArrowUpThick, TiArrowDownThick } from 'react-icons/ti'
import AuthContext from '../context/auth/authContext'
import LinkButton from './LinkButton'
import moment from 'moment'
import TopicContext from '../context/topics/topicContext'
import DeleteCommentButton from './DeleteCommentButton'

const CommentCard = ({ comment }: { comment: Comment }) => {
  const { user } = useContext(AuthContext)
  const { topic, setComment } = useContext(TopicContext)
  const isCommentAuthor = user?.id === comment.user?.id
  const isTopicAuthor = user?.id === topic?.user?.id
  const { colorMode } = useColorMode()

  let { votes } = comment

  if (!votes) votes = []

  // Get User Vote
  const userVote = user?.id
    ? votes.find(vote => vote.user?.id === user.id)
    : null
  const votedClass = userVote ? 'voted' : ''

  // Votes Count
  const upVotes = votes.filter(vote => vote.type === 'UPVOTE')
  const downVotes = votes.filter(vote => vote.type === 'DOWNVOTE')
  const votesCount = upVotes.length - downVotes.length

  // Date and Time
  const date = moment(comment.createdAt).format('Do MMM YYYY')
  const time = moment(comment.createdAt).format('LT')

  // Gradients
  const [[bg, shade]] = useGradient()
  const borderClass = colorMode === 'light' ? 'border' : ''
  return (
    <article id={comment.id} className={`comment-card ${bg} ${borderClass}`}>
      <aside className={shade}>
        <IconButton
          className='vote-btn'
          variant='ghost'
          aria-label='upvote'
          icon={TiArrowUpThick}
          variantColor={userVote?.type === 'UPVOTE' ? 'blue' : 'gray'}
        />
        <p className={`votes-count ${votedClass}`}>{votesCount}</p>
        <IconButton
          className='vote-btn'
          variant='ghost'
          aria-label='downvote'
          icon={TiArrowDownThick}
          variantColor={userVote?.type === 'DOWNVOTE' ? 'red' : 'gray'}
        />
      </aside>

      <header>
        <h6>
          <LinkButton
            className='link'
            to={`/u/${comment.user?.identifier}`}
            variant='link'>
            {comment.user?.name}
          </LinkButton>{' '}
          <small className='date'>
            {date} <span className='time'>{time}</span>
          </small>
        </h6>
      </header>

      <main className='main-link'>
        <p>{comment.content}</p>
      </main>

      {(isCommentAuthor || isTopicAuthor) && (
        <footer>
          {isCommentAuthor && (
            <Button
              className='btn'
              variant='ghost'
              leftIcon='edit'
              onClick={() => setComment(comment)}>
              Edit
            </Button>
          )}
          {(isCommentAuthor || isTopicAuthor) && (
            <DeleteCommentButton comment={comment} />
          )}
        </footer>
      )}
    </article>
  )
}

export default CommentCard
