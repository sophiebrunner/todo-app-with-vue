Vue.createApp({
  data() {
    return {
      toDos: [
        { description: "Learn HTML", done: true, id: 1 },
        {
          description: "Learn CSS",
          done: false,
          id: 2,
        },
        {
          description: "Learn JavaScript",
          done: true,
          id: 3,
        },
      ],
      text: "",
    };
  },
  methods: {
    addToDo() {
      this.toDos.push(this.text);
    },
  },
}).mount("#app");
