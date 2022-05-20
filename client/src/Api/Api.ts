import { User } from '../Api/Data';
import { LoginDetails } from '../components/Forms/LoginForm';
import axios from 'axios';

function wait(time: number) {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}
export async function UserFetch(loginDetails: LoginDetails): Promise<User> {
  const res = await axios.post(
    'http://localhost:4000/api/user/login',
    loginDetails
  );

  const result = await res.data;
  console.log(result);

  return result;
}

export async function placeOrderFetch() {
  return await wait(1000);
}
