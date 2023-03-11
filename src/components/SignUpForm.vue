<template>
  <q-form class="q-pa-xs q-ma-sm" @submit="onSubmit">
    <div class="row justify-between">
      <span class="text-h6">Sign Up</span>
      <div
        @click="$emit('switchForm')"
        style="text-decoration: none; color: inherit; cursor: pointer"
        :to="{ name: 'Home' }"
      >
        <span> Already registered? </span>
        <span style="text-decoration: underline"> Sign in here.</span>
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
    <div class="subtitle2">or sign up with email</div>
    <q-input
      filled
      v-model="email"
      type="email"
      hint="e.g. example@gmail.com"
      label="Your email"
      lazy-rules
      :rules="[(val) => !!val || 'Email is missing', isValidEmail]"
      ><template v-slot:prepend>
        <q-icon name="email" />
      </template>
    </q-input>

    <q-input
      filled
      class="q-mb-md"
      type="password"
      v-model="password"
      label="Enter password"
      hint="Password must have at least 6 characters."
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
    <div v-if="error" class="row truncate no-margin justify-center">
      <q-chip color="red" text-color="white" icon="error" :label="error">
        <q-tooltip>{{ error }}</q-tooltip>
      </q-chip>
    </div>
    <!-- <q-toggle v-model="accept" label="I accept the license and terms" /> -->
    <div class="subtitle2 text-grey-6 q-my-sm">
      By signing up, you agree to the
      <a href="/tos" target="_blank">Terms and Conditions</a> and the
      <a href="/tos" target="_blank">Privacy Policy</a>.
    </div>
    <div>
      <q-btn
        class="text-secondary"
        outline
        label="Sign up with email"
        type="submit"
      />
    </div>
    <div class="subtitle2 text-grey-6 q-mt-md">
      This site is protected by reCAPTHCA and the Google
      <a href="https://policies.google.com/privacy" target="_blank"
        >Privacy Policy</a
      >
      and
      <a href="https://policies.google.com/terms" target="_blank"
        >Terms of Service</a
      >
      apply.
    </div>
  </q-form>
</template>

<script>
import { useQuasar } from 'quasar';
import { defineComponent, ref } from 'vue';
import useSignup from '../composables/useSignup';
import { firebase, projectAuth } from '../firebase/config';

export default defineComponent({
  name: 'SignUpForm',
  emits: ['signup', 'switchForm'],
  setup(props, { emit }) {
    const $q = useQuasar();
    const { error, signup } = useSignup();

    const email = ref(null);
    const password = ref(null);
    const accept = ref(true);
    const isThisSignUpForm = true;

    const onSubmit = async () => {
      if (accept.value !== true) {
        $q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first',
        });
      } else {
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitting sign up form ...',
        });
        await signup(email.value, password.value);
        await projectAuth.currentUser.sendEmailVerification();
        $q.notify({
          color: 'primary',
          textColor: 'white',
          icon: 'info',
          message: `Please verify your email by clicking on the verification link sent to ${email.value}.
          Email subject line is "Verify your email for GripMeter". Please also check your spam folder.`,
        });

        if (!error.value) {
          emit('signup', isThisSignUpForm);
        }
        console.log('USER IS SIGNED UP');
      }
    };

    const loginWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      projectAuth
        .signInWithPopup(provider)
        .then((result) => {
          console.log('result', result);
          $q.notify({ message: 'Sign In Success.' });
          emit('signup', isThisSignUpForm);
        })
        .catch((err) => {
          error.value = err.message;
          console.error(err);
        });
    };

    return {
      email,
      password,
      accept,
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

<style scoped>
a {
  color: inherit;
}
</style>
