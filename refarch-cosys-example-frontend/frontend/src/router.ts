import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Projects from "./views/projects/Projects.vue";
import ProjectCreate from "./views/projects/ProjectCreate.vue";
import ProjectView from "./views/projects/ProjectView.vue";
import PersonIndex from "./views/people/People.vue";
import PersonCreate from "@/views/people/PersonCreate.vue";
import PersonEdit from "@/views/people/PersonEdit.vue";
import Search from "@/views/Search.vue";
import ProjectEdit from "@/views/projects/ProjectEdit.vue";

Vue.use(Router);

/*
 * Preventing "NavigationDuplicated" errors in console in Vue-router >= 3.1.0
 * https://github.com/vuejs/vue-router/issues/2881#issuecomment-520554378
 * */
const routerMethods = ["push", "replace"];
routerMethods.forEach((method: string) => {
  const originalCall = (Router.prototype as any)[method];
  (Router.prototype as any)[method] = function (
    location: any,
    onResolve: any,
    onReject: any
  ): Promise<any> {
    if (onResolve || onReject) {
      return originalCall.call(this, location, onResolve, onReject);
    }
    return (originalCall.call(this, location) as any).catch((err: any) => err);
  };
});

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/projects",
      name: "projects",
      component: Projects,
    },
    {
      path: "/createproject",
      name: "createproject",
      component: ProjectCreate,
    },
    {
      path: "/projects/:id/edit",
      name: "project.edit",
      component: ProjectEdit,
    },
    {
      path: "/projectview/:projectid",
      name: "projectview",
      component: ProjectView,
    },
    {
      path: "/people",
      name: "people",
      component: PersonIndex,
    },
    {
      path: "/people/create",
      name: "person.create",
      component: PersonCreate,
    },
    {
      path: "/people/:id/edit",
      name: "person.edit",
      component: PersonEdit,
    },
    {
      path: "/search",
      name: "search",
      component: Search,
    },
    { path: "*", redirect: "/" },
  ],
});
