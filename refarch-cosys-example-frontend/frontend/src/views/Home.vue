<template>
  <v-container>
    <v-card flat class="mx-auto" max-width="600">
      <v-img
        :src="require('../assets/logo.png')"
        class="my-3"
        contain
        height="200"
      ></v-img>
      <v-row justify="center">
        <h1 class="display-2 font-weight-bold mb-3">
          RefArch-CoSys-Example
        </h1>
      </v-row>
      <v-row justify="center">
        <p>Beispielanwendung für die Integration von CoSys</p>
      </v-row>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Vue } from "vue-property-decorator";

@Component
export default class Home extends Vue {}
</script>
