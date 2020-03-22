import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import AuthContext from '../context/auth/authContext'
import UserSettingEmailForm from '../components/UserSettingsEmailForm'
import UserSettingsPasswordForm from '../components/UserSettingsPasswordForm'

const UserSettings = () => {
  const { authenticated } = useContext(AuthContext)

  if (!authenticated) return <Redirect to='/explore' />

  return (
    <div id='user-settings'>
      <h2>User Settings</h2>
      <UserSettingEmailForm />
      <UserSettingsPasswordForm />
    </div>
  )
}

export default UserSettings
