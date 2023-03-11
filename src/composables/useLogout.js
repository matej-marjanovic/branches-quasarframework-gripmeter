import { ref } from 'vue';
import { projectAuth } from '../firebase/config';

const error = ref(null);

async function logout() {
  error.value = null;

  try {
    console.log('LOGGING OUT ...');
    const res = await projectAuth.signOut();
    error.value = null;
    return res;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
  }
}

const useLogout = () => {
  return { error, logout };
};

export default useLogout;
