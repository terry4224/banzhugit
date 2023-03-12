import { createStore } from 'vuex'
export default createStore({
  state: {
    refresh:true ,// 是否刷新页面
	ifclass:true, // 可视化盛满页面
  },
  getters: {
  },
  mutations: {
    changeResh(state,data){
      state.refresh = data;
    },
	changeIfclass(state,data){
		state.ifclass = data;
	}
  },
  actions: {
  },
  modules: {
  }
})
