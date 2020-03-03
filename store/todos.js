export const state = () => ({
  loading: true,
  todos: []
})

export const getters = {
  todo: (state) => state.todos
}

export const mutations = {
  SET_LOADING: (state, flag) => {
    state.loading = flag
  },
  SET_TODOS: (state, todos) => {
    state.todos = todos
  },
  ADD_TODO: (state, todo) => {
    state.todos.push(todo)
  },
  removeTodo: (state, id) => {
    state.todos = state.todos.filter((el) => el.id !== id)
  }
}

export const actions = {
  initTodos({ commit }) {
    commit('SET_LOADING', true)
    this.$axios
      .$get('/notes')
      .then((r) => r.notes)
      .then((todos) => {
        commit('SET_TODOS', todos)
        commit('SET_LOADING', false)
      })
  },
  addTodo({ commit, dispatch }, todo) {
    if (todo) {
      this.$axios.$post('/notes', todo).then(() => {
        dispatch('initTodos')
      })
    }
  },
  toggle({ commit, dispatch }, todo) {
    const newTodo = Object.assign({}, todo)
    newTodo.done = !newTodo.done

    this.$axios
      .$put('/notes', newTodo)
      .then((r) => r.data)
      .then(() => {
        dispatch('initTodos')
      })
  },
  removeTodo({ commit, dispatch }, id) {
    commit('removeTodo', {
      id
    })
    this.$axios
      .$delete('/notes/' + id)
      .then((r) => r.data)
      .then(() => {
        dispatch('initTodos')
      })
  }
}
