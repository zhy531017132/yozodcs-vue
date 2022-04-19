export default {
    state :{
        isCollapse: false
    },
    mutations: {
        collapseMeun(state){
            state.isCollapse = !state.isCollapse
        }
    }
}