<template>
  <v-app>
    <TheSnackbar />
    <v-app-bar
      app
      clipped-left
      clipped-right
      color="primary"
      :light="this.$store.getters.useDarkTextForPrimaryColorAsBackground"
      :dark="!this.$store.getters.useDarkTextForPrimaryColorAsBackground"
    >
      <v-app-bar-nav-icon
        @click.stop="navigationDrawerVisible = !navigationDrawerVisible"
      ></v-app-bar-nav-icon>

      <router-link to="/">
        <v-toolbar-title
          :class="`appbartitle-${
            this.$store.getters.useDarkTextForPrimaryColorAsBackground
              ? 'dark'
              : 'light'
          } font-weight-bold`"
          >RefArch CoSys Example</v-toolbar-title
        >
      </router-link>
      <v-spacer></v-spacer>
      <v-text-field
        v-if="$store.getters.isInstantSearch"
        flat
        solo-inverted
        hide-details
        label="Suche"
        clearable
        :value="$store.getters.getQuery"
        @input="debounceSearch"
        prepend-inner-icon="mdi-magnify"
        @keyup.enter="search"
        color="black"
      />
      <search-autocomplete
        v-if="$store.getters.isAutocompleteSearch"
        :value="$store.getters.getQuery"
        @input="$store.commit('SET_QUERY', $event)"
        @search="search"
      />
      <v-spacer></v-spacer>

      <v-app-bar-nav-icon @click.stop="toggleTodoDrawer">
        <overdue-todo-badge>
          <v-icon>mdi-check-box-multiple-outline</v-icon>
        </overdue-todo-badge>
      </v-app-bar-nav-icon>
      <v-app-bar-nav-icon @click.stop="toggleConfigDrawer"
        ><v-icon>mdi-cog</v-icon></v-app-bar-nav-icon
      >
    </v-app-bar>
    <v-navigation-drawer app clipped v-model="navigationDrawerVisible">
      <v-list>
        <v-list-item
          v-for="item in drawerItems"
          :key="item.path"
          :to="{ path: item.path }"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <v-container fluid>
        <v-fade-transition mode="out-in">
          <router-view></router-view>
        </v-fade-transition>
      </v-container>
    </v-main>
    <v-navigation-drawer app right clipped v-model="configDrawerVisible">
      <config-drawer-content></config-drawer-content>
    </v-navigation-drawer>
    <todo-drawer v-model="todoDrawerVisible" />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TheSnackbar from "@/components/util/TheSnackbar.vue";
import ConfigDrawerContent from "@/components/drawers/ConfigDrawerContent.vue";
import TodoDrawer from "@/components/drawers/TodoDrawer.vue";
import OverdueTodoBadge from "@/components/todo/OverdueTodoBadge.vue";
import SearchAutocomplete from "@/components/inputs/SearchAutocomplete.vue";

@Component({
  components: {
    SearchAutocomplete,
    OverdueTodoBadge,
    TodoDrawer,
    ConfigDrawerContent,
    TheSnackbar,
  },
})
export default class App extends Vue {
  navigationDrawerVisible = true;
  configDrawerVisible = false;
  todoDrawerVisible = false;
  drawerItems = [
    {
      icon: "mdi-application",
      title: "Projekte",
      path: "/projects",
    },
    {
      icon: "mdi-account-group",
      title: "Personen",
      path: "/people",
    },
  ];
  searchTimer!: number;

  mounted() {
    this.$vuetify.theme.dark = this.$store.getters.isDarkMode;
    this.$vuetify.theme.themes.light = this.$store.getters.getLightTheme;
    this.$vuetify.theme.themes.dark = this.$store.getters.getDarkTheme;
  }

  private toggleTodoDrawer() {
    this.configDrawerVisible = false;
    // Dies ist ein Workaround, dass es nicht zu eigenartigen resizes kommt
    setTimeout(() => (this.todoDrawerVisible = !this.todoDrawerVisible), 0);
  }

  private toggleConfigDrawer() {
    this.todoDrawerVisible = false;
    // Dies ist ein Workaround, dass es nicht zu eigenartigen resizes kommt
    setTimeout(() => (this.configDrawerVisible = !this.configDrawerVisible), 0);
  }

  debounceSearch(query: string) {
    this.$store.commit("SET_QUERY", query);
    if (this.$store.getters.isInstantSearch) {
      window.clearTimeout(this.searchTimer);
      this.searchTimer = window.setTimeout(this.search, 300);
    }
  }

  search() {
    if (this.$route.name === "search") {
      if (this.$store.getters.getQuery) {
        this.$router.replace({
          name: "search",
          query: { query: this.$store.getters.getQuery },
        });
      } else {
        this.$router.go(-1);
      }
    } else {
      this.$router.push({
        name: "search",
        query: { query: this.$store.getters.getQuery },
      });
    }
  }
}
</script>

<style>
/**
  Diese Klassen werden genutzt, obwohl euch eure IDE wahrscheinlich klar machen will, dass sie das nicht getan
  werden.
   */
.appbartitle-light {
  color: white;
}
.appbartitle-dark {
  color: rgba(0, 0, 0, 0.87);
}
</style>
