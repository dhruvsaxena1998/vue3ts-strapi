<template>
  <button @click="handleLogin">Login</button>
  <button @click="handleRegister">Register</button>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance } from "vue";
import { StrapiInstance } from './plugins/strapi/types'

export default defineComponent({
  name: "App",
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const app: any = getCurrentInstance()
    const $strapi: StrapiInstance = app.appContext.config.globalProperties.$strapi
    console.log($strapi)

    const handleLogin = (): void => {
      // setting up user [Mock]
      $strapi.user = {
          confirmed: true,
          blocked: false,
          _id: "604cd2f16af1d624ccd3f665",
          username: "dhruvsaxena",
          email: "someone@example.com",
          provider: "local",
          createdAt: "2021-03-13T14:57:53.119Z",
          updatedAt: "2021-03-13T15:00:52.001Z",
          __v: 0,
          role: {
            _id: "604cceb7f133c7272c7639af",
            name: "Authenticated",
            description: "Default role given to authenticated user.",
            type: "authenticated",
            __v: 0,
            id: "604cceb7f133c7272c7639af",
          },
          id: "604cd2f16af1d624ccd3f665"
        };

      setTimeout(() => {
        // return user [Mock]
        console.log($strapi);
      }, 3000);
    };

    const handleRegister = async () => {
      await $strapi.register({
        username: 'hello',
        password: 'hello',
        email: 'email@someone.com'
      })
    }

    return {
      handleLogin,
      handleRegister
    };
  },
});
</script>
