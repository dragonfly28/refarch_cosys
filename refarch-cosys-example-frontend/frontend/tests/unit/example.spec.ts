import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuex from "vuex";
import TheSnackbar from "@/components/util/TheSnackbar.vue";
import snackbar from "@/store/modules/snackbar";
import Vuetify from "vuetify";
import Vue from "vue";

const localVue = createLocalVue();
localVue.use(Vuex);

describe("TheSnackbar.vue", () => {
  let vuetify: any;

  beforeAll(() => {
    Vue.use(Vuetify);
  });
  it("renders props.message when passed", () => {
    const store = new Vuex.Store({
      modules: {
        snackbar,
      },
    });
    const message = "Hello_World";
    const wrapper = shallowMount(TheSnackbar, {
      localVue,
      vuetify,
      propsData: {},
      store,
    });
    store.commit("snackbar/SET_MESSAGE", message);
    store.commit("snackbar/SET_SHOW", true);
    expect(wrapper.html()).toContain(message);
  });
});
