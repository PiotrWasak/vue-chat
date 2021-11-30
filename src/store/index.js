import {createStore} from "vuex";


const store = createStore({
    state() {
        return {
            msgs: [],
            userList: {},
            activeUser: '',
        }
    },
    mutations: {
        ADD_MSG(state, payload) {
            state.msgs.push(payload)
        },
        SET_USER_LIST(state, payload) {
            state.userList = payload;
        },
        SET_ACTIVE_USER(state, payload) {
            state.activeUser = payload;
        }
    },
    actions: {
        ADD_MSG(context, payload) {
            context.commit("ADD_MSG", payload);
        },
        SET_USER_LIST(context, payload) {
            context.commit("SET_USER_LIST", payload);
        },
        SET_ACTIVE_USER(context, payload) {
            context.commit("SET_ACTIVE_USER", payload);
        }
    },
    getters: {
        getMsgs: state => state.msgs,
        getUserList: state => state.userList,
        getActiveUser: state => state.activeUser,
    }
})

export default store