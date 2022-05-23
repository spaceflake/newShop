import { UserInterface } from '../InterFaces';
import { LoginDetails } from '../components/Forms/LoginForm';
import axios from 'axios';

function wait(time: number) {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
}
export async function UserFetch(loginDetails: LoginDetails): Promise<UserInterface> {
  const res = await axios.post(
    'http://localhost:4000/api/user/login',
    loginDetails , { withCredentials: true}

    
  );

  const result = await res.data.user;
  console.log(result.user);

  return result;
}

export async function placeOrderFetch() {
  return await wait(1000);
}
