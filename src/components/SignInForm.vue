<template>
  <q-form class="q-pa-xs q-ma-sm" @submit="onSubmit">
    <div class="row justify-between">
      <span class="text-h6">Sign In</span>
      <div
        @click="$emit('switchForm')"
        style="text-decoration: none; color: inherit; cursor: pointer"
        :to="{ name: 'Home' }"
      >
        <span> Not yet registered? </span>
        <span style="text-decoration: underline"> Register new account.</span>
      </div>
    </div>
    <div class="q-pa-xs q-ma-xs column">
      <q-btn
        outline
        @click="loginWithGoogle"
        class="q-ma-sm col-12 q-py-md text-red-10"
      >
        <q-icon left name="fab fa-google" size="1.2rem" />
        <div>Login with Google</div>
      </q-btn>
    </div>
    <div class="subtitle2">or sign in with email</div>
    <q-input
      filled
      v-model="email"
      type="email"
      label="Your email"
      lazy-rules
      :rules="[(val) => !!val || 'Email is missing', isValidEmail]"
      ><template v-slot:prepend>
        <q-icon name="email" />
      </template>
    </q-input>

    <q-input
      filled
      type="password"
      v-model="password"
      label="Enter password"
      lazy-rules
      :rules="[
        (val) =>
          (val !== null && val !== '') ||
          'Please provide a password to use with your account.',
        (val) => val.length > 5 || 'Password must have at least 6 characters.',
      ]"
      ><template v-slot:prepend>
        <q-icon name="lock" />
      </template>
    </q-input>
    <div v-if="error" class="row truncate q-ml-md q-my-none justify-center">
      <q-chip color="red" text-color="white" icon="error" :label="error">
        <q-tooltip>{{ error }}</q-tooltip>
      </q-chip>
    </div>
    <div>
      <q-btn
        class="text-secondary"
        outline
        label="Sign in with email"
        type="submit"
      />
    </div>
  </q-form>
</template>

<script>
import { useQuasar } from 'quasar';
import { defineComponent, ref } from 'vue';
import useLogin from '../composables/useLogin';
import { fasFont } from '@quasar/extras/fontawesome-v5';
import { firebase, projectAuth } from '../firebase/config';

export default defineComponent({
  name: 'SignInForm',
  emits: ['login', 'switchForm'],
  created() {
    this.fasFont = fasFont;
  },
  setup(props, { emit }) {
    const $q = useQuasar();
    const { error, login } = useLogin();

    const email = ref(null);
    const password = ref(null);

    const onSubmit = async () => {
      $q.notify({
        color: 'green-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Logging in ...',
      });
      await login(email.value, password.value);
      if (!error.value) {
        emit('login');
      }
      console.log(error.value ? error.value : 'USER IS SIGNED UP');
    };

    const loginWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      projectAuth
        .signInWithPopup(provider)
        .then((result) => {
          console.log('result', result);
          $q.notify({ message: 'Sign In Success.' });
          emit('login');
        })
        .catch((err) => {
          error.value = err.message;
          console.error(err);
        });
    };

    return {
      email,
      password,
      onSubmit,
      error,
      isValidEmail() {
        const emailPattern =
          /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(email.value) || 'Invalid email';
      },
      loginWithGoogle,
    };
  },
});
</script>
