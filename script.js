let Task = function(text) {
	this.created = new Date();
	this.completed = -1;
  this.text = text;
  this.setComplete = () => {
  	this.completed = new Date();
  };
};

new Vue({
	el: '#app',
	data: {
  	add_task_input: '',
  	tasks: [],
    completed_tasks: []
  },
  filters: {
  	date_format(date) {
      if(date == undefined) return '';
    	return (typeof date == 'string' ? new Date(date) : date).toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    }
  },
  methods: {
  	update() {
      let to_store = {
        tasks: this.tasks,
        completed_tasks: this.completed_tasks
      };
      localStorage.setItem('task_heap', JSON.stringify(to_store));
    },
  	add_task() {
    	this.tasks.push(new Task(this.add_task_input));
      console.log(this.tasks[this.tasks.length - 1]);
      this.add_task_input = '';
      this.update();
    },
    task_complete(task) {
    	this.tasks.splice(this.tasks.indexOf(task), 1);
    	this.completed_tasks.push(task);
      this.update();
    }
  },
  created() {
  	let localStorage_data = localStorage.getItem('task_heap');
    localStorage_data = localStorage_data ? JSON.parse(localStorage_data) : {
    	tasks: [],
      completed_tasks: []
    };
    this.tasks = localStorage_data.tasks;
    this.completed_tasks = localStorage_data.completed_tasks;
  }
});
