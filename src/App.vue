<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />
      </div>
      <v-flex class="mt-4 mb-4">
        <router-link class="router-input mx-4" to="/">
          <v-btn outlined color="indigo lighten-4" dark>Материалы</v-btn>
        </router-link>
        <router-link class="router-input mx-4" to="/warm">
          <v-btn outlined color="indigo lighten-4" dark>Теплоизоляция</v-btn>
        </router-link>
      </v-flex>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  })
};
</script>

<style lang="scss">
.main_sight {
  text-transform: uppercase;
  font-size: 20px;
  margin-left: 40px;
}
</style>
