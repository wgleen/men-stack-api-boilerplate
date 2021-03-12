const userSerializerV1 = ({ user }) => {
  return {
    user: {
      _id: user._id,
      username: user.username,
      email: user.email
    }
  }
}

export default userSerializerV1
