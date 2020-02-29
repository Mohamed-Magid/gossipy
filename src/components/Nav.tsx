import React, { useContext, useRef, useState, FC } from 'react'
import {
  Button,
  Box,
  useColorMode,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Stack,
  Collapse
} from '@chakra-ui/core'

import {
  TiHome,
  TiUser,
  TiCog,
  TiBell,
  TiGlobe,
  TiThMenu,
  TiGroup,
  TiContacts
} from 'react-icons/ti'
import { FiLogOut } from 'react-icons/fi'
import useWindowDimensions from '../hooks/useWindowDimensions '
import AuthContext from '../context/auth/authContext'
import LinkButton from './LinkButton'

const Nav: FC = () => {
  const authContext = useContext(AuthContext)
  const { colorMode, toggleColorMode } = useColorMode()
  const { width } = useWindowDimensions()
  const btnRef = useRef()

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [showStations, setshowStations] = useState(false)

  const isDarkMode = colorMode === 'dark'
  const bg = isDarkMode ? 'gray.900' : 'gray.300'
  const isPC = width > 1366

  const { authenticated, user } = authContext

  return (
    <Box bg={bg} id='nav'>
      <IconButton
        aria-label='Open navbar'
        icon={TiThMenu}
        ref={btnRef}
        variantColor='blue'
        onClick={onOpen}
      />

      <Drawer isOpen={isOpen} placement='left' onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Gossipy</DrawerHeader>

          <DrawerBody className='nav-drawer-body'>
            {authenticated ? (
              <Stack spacing='2'>
                <LinkButton to='/' leftIcon={TiHome}>
                  Home
                </LinkButton>
                <LinkButton to='/explore' leftIcon={TiGlobe}>
                  Explore
                </LinkButton>
                <LinkButton to={`/u/${user?.identifier}`} leftIcon={TiUser}>
                  Profile
                </LinkButton>
                <Button
                  onClick={e => setshowStations(!showStations)}
                  leftIcon={TiGroup}>
                  Stations
                </Button>
                <Collapse isOpen={showStations}>
                  <Stack spacing='2'>
                    <LinkButton
                      to='/s/create'
                      variantColor='blue'
                      variant='outline'
                      leftIcon='add'>
                      Create
                    </LinkButton>
                    <LinkButton
                      to='/s'
                      variantColor='blue'
                      variant='outline'
                      leftIcon={TiContacts}>
                      Subscriptions
                    </LinkButton>
                  </Stack>
                </Collapse>
                <LinkButton to='/notifications' leftIcon={TiBell}>
                  Notifications
                </LinkButton>
                <LinkButton to='/settings' leftIcon={TiCog}>
                  Settings
                </LinkButton>
              </Stack>
            ) : (
              <Stack spacing='2'>
                <LinkButton to='/sign-up'>Sign up</LinkButton>
                <LinkButton to='/sign-in'>Sign in</LinkButton>
              </Stack>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Stack isInline={isPC} spacing='2'>
              <Button
                variant='outline'
                onClick={toggleColorMode}
                leftIcon={isDarkMode ? 'sun' : 'moon'}>
                Theme
              </Button>
              <Button variant='outline' variantColor='red' leftIcon={FiLogOut}>
                Logout
              </Button>
            </Stack>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}

export default Nav
