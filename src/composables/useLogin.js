import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const error = ref(null);

async function login(email, password) {
  error.value = null;

  try {
    console.log('LOGGING IN ...');
    const res = await projectAuth.signInWithEmailAndPassword(email, password);
    error.value = null;
    return res;
  } catch (err) {
    console.log(err.message);
    error.value = 'Incorrect login credentials';
  }
}

const useLogin = () => {
  return { error, login };
};

export default useLogin;
