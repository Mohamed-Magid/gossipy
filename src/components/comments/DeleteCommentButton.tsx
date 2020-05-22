import React, { useContext, useState, useRef, Fragment } from 'react'
import { Comment } from '../../interfaces/Comment'
import {
  useToast,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter
} from '@chakra-ui/core'
import { useMutation } from '@apollo/react-hooks'
import { DELETE_COMMENT } from '../../graphql/mutations'
import { CommentContext } from '../../context/index'

const DeleteCommentButton = ({ comment }: { comment: Comment }) => {
  const toast = useToast()

  // Contexts
  const { deleteComment: pullComment } = useContext(CommentContext)

  // Alert Dialog Box
  const [alertOpen, setAlertOpen] = useState(false)
  const onAlertClose = () => setAlertOpen(false)
  const cancelRef = useRef(null)

  // Mutation
  const [deleteComment, { loading }] = useMutation(DELETE_COMMENT)

  // Delete Operation
  const handleDelete = async () => {
    try {
      await deleteComment({ variables: { id: comment.id } })

      pullComment(comment)
      toast({
        status: 'success',
        title: `Comment deleted`
      })
    } catch (error) {
      toast({
        status: 'error',
        title: `Error has occurred`
      })
    }
  }

  return (
    <Fragment>
      <Button
        isLoading={loading}
        onClick={() => setAlertOpen(true)}
        className='btn'
        variant='ghost'
        leftIcon='delete'
        variantColor='red'>
        Delete
      </Button>

      <AlertDialog
        isCentered
        isOpen={alertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}>
        <AlertDialogOverlay />
        <AlertDialogContent className='m-2 rounded-md'>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            Delete Comment?
          </AlertDialogHeader>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onAlertClose}>
              Cancel
            </Button>
            <Button variantColor='red' onClick={handleDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  )
}

export default DeleteCommentButton
