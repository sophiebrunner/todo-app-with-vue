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
      // let openToDos = 0;

      // for (let toDo of this.toDos) {
      //   if (toDo.done === false) {
      //     openToDos++;
      //   }
      // }

      // return openToDos;
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
      this.toDos.push({
        description: this.description,
        done: false,
        id: this.generateId(),
      });
      this.saveData();
      this.description = "";
    },

    onCheckboxChange() {
      this.saveData();
    },

    removeSingleToDo(singleToDo) {
      this.toDos = this.toDos.filter((toDo) => {
        return singleToDo !== toDo;
      });
      this.saveData();
    },

    removeDoneToDos() {
      this.toDos = this.toDos.filter((toDo) => toDo.done === false);
      this, this.saveData();
    },
  },
}).mount("#app");

// Wenn To Dos löschen möglich: größte id rausfiltern und dort +1
// Math.max() // id des letzten Elements // ((universal unique identifier)) // random number vergeben und mit aktuellem timestamp arbeiten (timestamp + randomnumber)
// Beim Hinzufügen der toDos id generieren (id: Code)
