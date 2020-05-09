import { Topic } from './Topic'
import { Comment } from './Comment'
import { Vote } from './Vote'
import { Membership } from './Membership'
import { Tag } from './Tag'

export interface Station {
  // Mandatory
  id: number
  name: string
  identifier: string
  public: boolean
  image: string

  // Optional
  members: Membership[]
  description: string
  topics: Topic[]
  comments: Comment[]
  votes: Vote[]
  tags: Tag[]
  createdAt: string
  updatedAt: string
}
