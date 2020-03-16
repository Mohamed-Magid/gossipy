import { User } from './User'
import { Station } from './Station'
import { Topic } from './Topic'

export interface Vote {
  // Mandatory
  id: string
  type: VoteType

  // Optional
  user?: User
  station?: Station
  topic?: Topic
  createdAt?: string
  updatedAt?: string
}

type VoteType = 'UPVOTE' | 'DOWNVOTE'
