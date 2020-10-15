<template>
  <v-snackbar
    :value="$store.state.snackbar.show"
    @input="$store.commit('snackbar/SET_SHOW', $event)"
    :color="$store.state.snackbar.level"
    :timeout="$store.state.snackbar.timeout"
  >
    {{ $store.state.snackbar.message }}
    <v-btn
      color="primary"
      text
      @click="$store.commit('snackbar/SET_SHOW', false)"
      v-if="$store.getters['snackbar/isErrorLevel']"
    >
      Schließen
    </v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TheSnackbar extends Vue {}
</script>
