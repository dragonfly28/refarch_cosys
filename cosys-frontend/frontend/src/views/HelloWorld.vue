<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>{{ bobbi }}</h2>
    <h2>{{ txt1 }}</h2>
    <h2>{{ fullName }}</h2>
    <h2>{{counter}}</h2>
    <button @click="incrementCounter()">Count Me</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;
  @Prop({ default: 'Default String!!!' }) private bobbi!: string;
  private txt1 = 'txt1';
  private firstName = "Joe";
  private lastName = "Cool";
  private counter = 0;

  get fullName() {
    return this.firstName + " " + this.lastName;
  }

  incrementCounter () {
    this.counter++;
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
