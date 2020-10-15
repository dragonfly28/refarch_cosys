<template>
  <v-chip small class="white--text caption my-2" v-bind:class="referat"
    >{{ referat }}
  </v-chip>
</template>

<style scoped>
.v-chip.BAU {
  background: saddlebrown;
}

.v-chip.DIR {
  background: royalblue;
}

.v-chip.KOM {
  background: lightseagreen;
}

.v-chip.KVR {
  background: limegreen;
}

.v-chip.KUL {
  background: rgb(122, 111, 106);
}

.v-chip.POR {
  background: rgb(97, 75, 65);
}

.v-chip.RAW {
  background: rgb(87, 67, 58);
}

.v-chip.RGU {
  background: rgb(56, 49, 46);
}

.v-chip.ITM {
  background: rgb(97, 83, 77);
}

.v-chip.RSB {
  background: rgb(223, 77, 10);
}

.v-chip.RBS {
  background: rgb(128, 66, 37);
}

.v-chip.SOZ {
  background: rgb(49, 23, 11);
}

.v-chip.STK {
  background: rgb(46, 28, 20);
}

.v-chip.RIT {
  background: rgb(235, 147, 106);
}
</style>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ProjectStatusChip extends Vue {
  @Prop()
  referat!: string;
}
</script>
