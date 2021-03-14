import userSerializerV1 from './user'

const authLoginSerializerV1 = ({ user, token }) => {
  return {
    user: userSerializerV1({ user }).user,
    token
  }
}

export default authLoginSerializerV1
