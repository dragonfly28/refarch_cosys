<template>
  <v-file-input
    v-bind="$attrs"
    v-on="$listeners"
    :outlined="$store.getters.isOutlinedInput"
    :filled="$store.getters.isFilledInput"
    :rounded="$store.getters.isRoundedInput"
    :shaped="$store.getters.isShapedInput"
    :solo="$store.getters.isSoloInput"
    :solo-inverted="$store.getters.isSoloInvertedInput"
  >
    <!-- Source: https://stackoverflow.com/a/50892881 -->
    <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </v-file-input>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ConfigurableVFileInput extends Vue {}
</script>
