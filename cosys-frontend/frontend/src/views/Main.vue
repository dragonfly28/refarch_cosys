<template>
  <v-container>
    <v-layout
      text-center
      wrap
    >
      <v-flex xs12>
        <v-img
          :src="require('../assets/logo.png')"
          class="my-3"
          contain
          height="200"
        />
      </v-flex>

      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          Willkommen beim CoSys-Prototyp
        </h1>
        <p>Das API-Gateway ist: <span :class="status">{{ status }}</span></p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
    .UP {
        color: limegreen;
    }

    .DOWN {
        color: lightcoral;
    }
</style>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import HealthService from "@/api/HealthService";
    import HealthState from "@/types/HealthState";

    @Component
    export default class App extends Vue {

        base: string | undefined = process.env.VUE_APP_API_URL
        status = "DOWN"

        mounted(): void {
            HealthService.checkHealth()
                .then((content: HealthState) => this.status = content.status)
                .catch(error => {
                    this.$store.dispatch('snackbar/showMessage', error);
                });
        }
    }
</script>