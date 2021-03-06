import { User } from './User'
import { Station } from './Station'
import { Topic } from './Topic'
import { Vote } from './Vote'
import { Membership } from './Membership'

export interface Comment {
  // Mandatory
  id: string
  content: string

  // Optional
  user?: User
  station?: Station
  topic?: Topic
  votes?: Vote[]
  membership?: Membership
  createdAt?: string
  updatedAt?: string
}
