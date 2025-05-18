"use client"

export type changePasswordPropsType = {
  settingsParam: string
}

const ChangePassword = ({settingsParam}: changePasswordPropsType) => {

  console.log(settingsParam, "settingParams from Change password page")
  return (
    <div className='w-full bg-green-200'>ChangePassword</div>
  )
}

export default ChangePassword