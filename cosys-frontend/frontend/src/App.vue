<template>
  <v-app>
    <TheSnackbar />
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
      <v-text-field
        id="suchfeld"
        v-model="query"
        flat
        solo-inverted
        hide-details
        label="Suche"
        clearable
        prepend-inner-icon="mdi-magnify"
        color="black"
        @keyup.enter="search"
      />
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
        <v-list-item :to="{path: '/antragsformular'}">
          <v-list-item-content>
            <v-list-item-title>Antragsformular</v-list-item-title>
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
    import {Watch} from 'vue-property-decorator';
    import TheSnackbar from '@/components/TheSnackbar.vue';

    @Component({
        components: {TheSnackbar}
    })
    export default class App extends Vue{

        drawer = true
        query = ''

        mounted(): void {
            this.query = this.$route.params.query;
        }

        @Watch('$route.params.query')
        function (query: string): void {
            if (this.query !== query)
                this.query = query;
        }

        //Navigiert zur Seite mit den Suchergebnissen und sendet ein Event zum Auslösen weiterer Suchen.
        async search(): Promise<void> {
            if (this.query !== '' && this.query !== null) {
                this.$store.dispatch('snackbar/showMessage', {message: "Sie haben nach " + this.query + " gesucht. ;)"});
            }
        }

    }
</script>
