import Vue from 'vue';
import Vuex from 'vuex';
import user, {UserState} from './modules/user';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export interface RootState {
    userState: UserState;
}

export default new Vuex.Store<RootState>({
    modules: {
        user
    },
    strict: debug
});
