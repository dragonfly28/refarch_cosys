<template>
  <div v-if="!tooltip">
    <div
      class="box"
      :style="{
        width: size ? size : '4vw',
        height: size ? size : '4vw',
        color: fontColor,
      }"
    >
      <div
        :style="{ borderColor: color }"
        class="d-flex flex-row align-center justify-center circle"
      >
        <div>{{ title }}</div>
      </div>
      <div
        :style="{ backgroundColor: color }"
        class="d-flex flex-row align-center justify-center badge"
      >
        <div>{{ subtitle }}</div>
      </div>
    </div>
  </div>
  <div v-else>
    <v-tooltip bottom>
      <template v-slot:activator="{ on }">
        <div
          class="box"
          :style="{
            width: size ? size : '4vw',
            height: size ? size : '4vw',
            color: fontColor,
          }"
          v-on="on"
        >
          <div
            :style="{ borderColor: color }"
            class="d-flex flex-row align-center justify-center circle"
          >
            <div>{{ title }}</div>
          </div>
          <div
            :style="{ backgroundColor: color }"
            class="d-flex flex-row align-center justify-center badge"
          >
            <div>{{ subtitle }}</div>
          </div>
        </div>
      </template>
      <span>{{ tooltip }}</span>
    </v-tooltip>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component({})
export default class Badges extends Vue {
  @Prop()
  size!: string;
  @Prop()
  color!: string;
  @Prop()
  title!: string;
  @Prop()
  subtitle!: string;
  @Prop()
  tooltip!: string;
  @Prop()
  fontColor!: string;
}
</script>

<style scoped>
.box {
  position: relative;
  width: 4vw;
  height: 4vw;
  min-height: 75px;
  min-width: 75px;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: none;
  border: calc(5px + 0.2vw) solid green;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  font-size: calc(7px + 1vw);
}

.badge {
  position: absolute;
  background: green;
  top: 80%;
  bottom: 0;
  left: 20%;
  right: 20%;
  border-radius: 25px;
  font-size: calc(7px + 0.3vw);
}
</style>
