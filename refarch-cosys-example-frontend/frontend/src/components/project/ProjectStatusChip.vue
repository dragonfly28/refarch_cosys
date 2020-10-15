<template>
  <v-chip small class="white--text caption my-2" v-bind:class="status"
    >{{ status }}
  </v-chip>
</template>

<style scoped>
.v-chip.VERZOEGERT {
  background: saddlebrown;
}

.v-chip.GEPLANT {
  background: royalblue;
}

.v-chip.ABGESCHLOSSEN {
  background: lightseagreen;
}

.v-chip.INARBEIT {
  background: limegreen;
}

.v-chip.LAUFEND {
  background: rgb(255, 81, 0);
}
</style>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ProjectStatusChip extends Vue {
  @Prop()
  status!: string;
}
</script>
