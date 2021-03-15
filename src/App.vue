<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <button @click="handleLogin">Login</button>
  <button>Register</button>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const $strapi: any = inject("$strapi");
    console.log("setup");

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
        id: "604cd2f16af1d624ccd3f665",
        name: "DhruvSaxena",
      };

      setTimeout(() => {
        // return user [Mock]
        console.log($strapi.user);
      }, 3000);
    };

    return {
      handleLogin,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
