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
      <v-flex class="main_sight">Строительный калькулятор</v-flex>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-main>
      <v-calculator />
    </v-main>
  </v-app>
</template>

<script>
import vCalculator from "./components/v-calculator";

export default {
  name: "App",

  components: {
    vCalculator
  },

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
