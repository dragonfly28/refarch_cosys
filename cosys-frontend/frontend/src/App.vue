<template>
  <v-app>
    <v-app-bar
      app
      clipped-left
      dark
      color="primary"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <router-link to="/">
        <v-toolbar-title class="font-weight-bold">
          <span class="white--text">RefArch-</span>
          <span class="secondary--text">Kick</span>
          <span class="white--text">Starter</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer />
      <v-spacer />
      <v-btn
        text
        fab
      >
        <v-icon class="white--text">
          mdi-account-circle
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list>
        <v-list-item :to="{path: '/antrag'}">
          <v-list-item-content>
            <v-list-item-title>Antrag</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item :to="{path: '/test'}">
          <v-list-item-content>
            <v-list-item-title>Test</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-content class="main">
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view />
        </v-fade-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<style>
    .main {
        background-color: white;
    }
</style>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    @Component({
        components: {}
    })
    export default class App extends Vue{

        drawer = true

    }
</script>
