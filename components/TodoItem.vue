<template>
  <v-list-item :key="`${todo.title}`">
    <v-list-item-action>
      <v-checkbox
        :input-value="todo.done"
        :checked="checked"
        :color="(todo.done && 'grey') || 'primary'"
        @change="toggle"
      >
        <template v-slot:label>
          <div
            :class="(todo.done && 'grey--text') || 'primary--text'"
            class="ml-4"
            v-text="todo.title"
          ></div>
        </template>
      </v-checkbox>
    </v-list-item-action>

    <v-spacer></v-spacer>

    <v-scroll-x-transition>
      <v-icon v-if="todo.done" color="success">Gedaan</v-icon>
    </v-scroll-x-transition>

    <v-list-item-action>
      <v-icon @click="deleteTodo">mdi-delete</v-icon>
    </v-list-item-action>
  </v-list-item>
</template>

<script>
import mdiDelete from '@mdi/js'

export default {
  name: 'Todo',
  props: ['todo'],
  data: () => ({
    icons: {
      mdiDelete
    }
  }),
  computed: {
    checked() {
      if (this.todo.done) {
        return 'checked'
      }
      return 'unchecked'
    }
  },
  methods: {
    toggle() {
      this.$store.dispatch('todos/toggle', this.todo)
    },
    deleteTodo() {
      this.$store.dispatch('todos/removeTodo', this.todo.id)
    }
  }
}
</script>
