import { User, mockedUsers } from '../Api/Data'
import { LoginDetails } from '../components/Forms/LoginForm';

function wait(time: number) {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}
export async function FakeUserFetch(loginDetails: LoginDetails): Promise<User> {
  await wait(1000)
  const foundUsers = mockedUsers.filter((user) => {
    return user.username === loginDetails.username
  })

  if (!foundUsers.length) {
    throw new Error('Tyvärr så finns inte denna användare.')
  }

  const foundUser = foundUsers[0]

  if (foundUser.password !== loginDetails.password) {
    throw new Error('Tyvärr så stämmer ej lösenordet.')
  }

  return foundUser
}


export async function placeOrderFetch() {
  return await wait(1000)
}