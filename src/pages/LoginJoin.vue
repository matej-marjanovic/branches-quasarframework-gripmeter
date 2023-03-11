<template>
  <q-page padding>
    <div class="q-pa-md row items-start justify-center">
      <q-card flat bordered class="col-lg-8 col-md-10 col-sm-8 col-xs-12">
        <div class="row overflow-hidden">
          <q-card-section class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
            <SignUpForm
              v-if="newUser"
              @switchForm="newUser = !newUser"
              @signup="enterHomepage"
            />
            <SignInForm
              v-else
              @switchForm="newUser = !newUser"
              @login="enterHomepage"
            />
          </q-card-section>
          <q-separator inset vertical />
          <q-card-section style="flex: 1; background-color: #ffccbc22">
            <div class="text-center justify-center row q-gutter-sm q-ma-sm">
              <!-- <img height="35" src="~assets/GripMeterLogo.svg" /> -->
              <div class="text-h5 q-mt-md q-mb-sm">Grip Meter:</div>
              <q-chip
                color="primary"
                text-color="white"
                size="16px"
                icon="travel_explore"
              >
                View you measurements and stats
              </q-chip>

              <q-chip
                color="primary"
                text-color="white"
                size="16px"
                icon="people"
              >
                Sharing options
              </q-chip>
              <q-chip
                color="primary"
                text-color="white"
                size="16px"
                icon="verified"
              >
                Early member status
              </q-chip>
            </div>
          </q-card-section>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import SignUpForm from '../components/SignUpForm.vue';
import SignInForm from '../components/SignInForm.vue';

export default defineComponent({
  name: 'LoginJoin',
  components: { SignUpForm, SignInForm },
  setup() {
    const router = useRouter();

    const enterHomepage = () => {
      router.push({ path: '/' });
    };
    return {
      newUser: ref(true),
      enterHomepage,
    };
  },
});
</script>
