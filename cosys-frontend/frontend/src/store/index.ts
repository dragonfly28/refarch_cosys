import Vue from 'vue';
import Vuex from 'vuex';
import user, {UserState} from './modules/user';
import snackbar, {SnackbarState} from './modules/snackbar';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export interface RootState {
    snackbarState: SnackbarState;
    userState: UserState;
}

export default new Vuex.Store<RootState>({
    modules: {
        user,
        snackbar
    },
    strict: debug
});
