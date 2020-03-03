<template>
  <v-container style="max-width: 500px">
    <TodoForm></TodoForm>
    <h2 class="display-1 success--text pl-4">
      Taken:&nbsp;
      <v-fade-transition leave-absolute>
        <span :key="`tasks-${todos.length}`">{{ todos.length }}</span>
      </v-fade-transition>
    </h2>

    <v-divider class="mt-4"></v-divider>

    <v-row class="my-1" align="center">
      <strong class="mx-4 info--text text--darken-2"
        >Over: {{ remainingTasks }}</strong
      >

      <v-divider vertical></v-divider>

      <strong class="mx-4 success--text text--darken-2"
        >Gedaan: {{ completedTasks }}</strong
      >

      <v-spacer></v-spacer>

      <v-progress-circular :value="progress" class="mr-2"></v-progress-circular>
    </v-row>

    <v-divider class="mb-4"></v-divider>

    <v-card v-if="todos.length > 0">
      <v-slide-x-transition class="py-0" group tag="v-list">
        <template v-for="(task, i) in todos">
          <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>
          <TodoItem :key="task.id" :todo="task"></TodoItem>
        </template>
      </v-slide-x-transition>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import TodoItem from '../components/TodoItem.vue'
import TodoForm from '../components/TodoForm.vue'

export default {
  components: {
    TodoItem,
    TodoForm
  },
  computed: {
    completedTasks() {
      return this.todos.filter((task) => task.done).length
    },
    progress() {
      return (this.completedTasks / this.todos.length) * 100
    },
    remainingTasks() {
      return this.todos.length - this.completedTasks
    },
    ...mapGetters({ todos: 'todos/todo' })
  },
  created() {
    this.$store.dispatch('todos/initTodos')
  }
}
</script>
