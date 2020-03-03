<template>
  <v-container>
    <v-text-field
      v-model="task"
      label="Wat moet er gedaan worden?"
      solo
      @keydown.enter="create"
    >
      <v-fade-transition v-slot:append>
        <v-icon v-if="task" @click="create">add_circle</v-icon>
      </v-fade-transition>
    </v-text-field>
    <v-textarea
      v-model="content"
      name="input-7-1"
      label="Tekst"
      value
      hint="Extra uitleg over je taak"
      solo
      @keydown.enter="create"
    ></v-textarea>
    <template v-slot:extension>
      <v-btn dark fab small bottom right color="green">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    task: null,
    content: null
  }),
  methods: {
    create() {
      const todo = {
        id: Date.now(),
        title: this.task,
        content: this.content,
        done: false
      }
      this.$store.dispatch('todos/addTodo', todo)

      this.task = null
      this.content = null
    }
  }
}
</script>
