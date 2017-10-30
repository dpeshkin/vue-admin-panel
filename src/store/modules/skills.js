const skills = {
    state: {
        data: [],
    },
    getters: {
        getSkills(state) {
            return state.data
        }
    },
    mutations: {
        addNewSkill(state, skill) {
            state.data.push(skill)
        },
        removeSavedSkill(state, id) {
            state.data = state.data.filter(skill => skill.id != id)
        }
    },
    actions: {
        fetchSkills({ state, rootGetters}){
            const { $http } = rootGetters;
            $http.get('/src/components/About/data.json').then(responce => {
                state.data = responce.body
            }, error => {
                console.error(error)
            })
        }
    }
}
export default skills;