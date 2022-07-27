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
  created() {
    this.getData();
  },
  methods: {
    saveData() {
      localStorage.setItem("toDos", JSON.stringify(this.toDos));
    },
    getData() {
      this.toDos = JSON.parse(localStorage.getItem("toDos"));
    },
    addToDo() {
      this.toDos.push({
        description: this.text,
        done: false,
        id: this.toDos.length + 1,
      });
      this.saveData();
    },
    onCheckboxChange(id, event) {
      const isDone = event.target.checked;
      const currentToDo = this.toDos.find((toDo) => toDo.id === id);
      console.log(currentToDo);
      console.log(id);
      currentToDo.done = isDone;
    },
  },
}).mount("#app");

// Wenn To Dos löschen möglich: größte id rausfiltern und dort +1
