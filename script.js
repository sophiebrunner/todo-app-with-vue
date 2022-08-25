Vue.createApp({
  data() {
    return {
      toDos: [],
      description: "",
      filter: "all",
    };
  },

  computed: {
    toDoAddingEvents() {
      return {
        click: this.addToDo,
        enter: this.addToDo,
      };
    },

    filteredToDos() {
      let toDoList = [];
      if (this.filter === "all") {
        toDoList = this.toDos;
      } else if (this.filter === "open") {
        toDoList = this.toDos.filter((toDo) => !toDo.done);
      } else if (this.filter === "done") {
        toDoList = this.toDos.filter((toDo) => toDo.done);
      }
      return toDoList;
    },

    numberOfOpenToDos() {
      return this.toDos.filter((toDo) => !toDo.done).length;
      /* Weitere Option:
      let openToDos = 0;
      for (let toDo of this.toDos) {
        if (toDo.done === false) {
            openToDos++;
            }
          }
      return openToDos;
      */
    },
  },

  created() {
    this.getData();
  },

  methods: {
    saveData() {
      localStorage.setItem("toDos", JSON.stringify(this.toDos));
    },
    getData() {
      this.toDos = JSON.parse(localStorage.getItem("toDos")) || [];
    },

    // Größte ID rausfiltern und 1 draufzählen
    // Weitere Optionen: Math.max(), universal unique identifier, randomisierte Nummer + timestamp vergeben
    generateId() {
      let id = 1;
      if (this.toDos.length > 0) {
        const sortedIds = this.toDos
          .map((toDo) => toDo.id)
          .sort((a, b) => a - b);
        id = sortedIds[sortedIds.length - 1] + 1;
      }
      return id;
    },

    addToDo() {
      this.description = this.description.trim().replace(/\s\s+/g, " ");
      if (this.description.length >= 5) {
        this.toDos.push({
          description: this.description,
          done: false,
          id: this.generateId(),
          edit: false,
        });
        this.saveData();
        this.description = "";
      } else {
        alert("Please insert a Todo with 5 or more characters");
      }
    },

    onCheckboxChange() {
      this.saveData();
    },

    editToDo(event, singleToDo) {
      const index = event.target.dataset.index;
      if (singleToDo.edit === false) {
        singleToDo.edit = true;
        // Focus- und Blur-Methode für HTML-Elemente
        this.$refs.description[index].focus();
      } else if (singleToDo.edit === true) {
        singleToDo.edit = false;
      }
      this.saveData();
      // <element ref="test"></test> -> funktioniert wie querySelectorAll()
    },

    removeSingleToDo(singleToDo) {
      this.toDos = this.toDos.filter((toDo) => {
        return singleToDo !== toDo;
      });
      this.saveData();
    },

    removeDoneToDos() {
      this.toDos = this.toDos.filter((toDo) => toDo.done === false);
      this.saveData();
    },
  },
}).mount("#app");
