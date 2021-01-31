const initialData = {
	tasks: {
		"task-1": { id: "task-1", content: "Take out the garbage" },
		"task-2": { id: "task-2", content: "Get money" },
		"task-3": { id: "task-3", content: "Destroy a hedge fund" },
		"task-4": { id: "task-4", content: "Stonks" },
		"task-5": { id: "task-5", content: "Shower" },
		"task-6": { id: "task-6", content: "Go running" },
		"task-7": { id: "task-7", content: "Eat lots" },
		"task-8": { id: "task-8", content: "Have a good conversation!" },
	},
	columns: {
		"column-1": {
			id: "column-1",
			title: "To Do",
			taskIds: ["task-1", "task-2", "task-3", "task-4"],
		},
		"column-2": {
			id: "column-2",
			title: "In Development",
			taskIds: ["task-5", "task-6"],
		},
		"column-3": {
			id: "column-3",
			title: "Backlog",
			taskIds: ["task-7"],
		},
		"column-4": {
			id: "column-4",
			title: "Done",
			taskIds: ["task-8"],
		},
	},
	columnOrder: ["column-1", "column-2", "column-3", "column-4"],
};

export default initialData;
