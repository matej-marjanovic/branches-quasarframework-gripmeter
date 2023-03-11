import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const error = ref(null);

async function signup(email, password) {
  error.value = null;

  try {
    console.log('SIGNING UP ...');
    const res = await projectAuth.createUserWithEmailAndPassword(
      email,
      password
    );
    if (!res) {
      throw new Error('Could not complete the signup process :(');
    }
    error.value = null;
    return res;
  } catch (err) {
    console.log(err);
    error.value = err.message;
  }
}

const useSignup = () => {
  return { error, signup };
};

export default useSignup;
