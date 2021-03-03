const initialData = [
	{
		id: "project-1",
		issues: {
			"issue-1": {
				id: "issue-1",
				type: "issue", //Issue, Bug, Story
				title: "Take out the garbage",
				description: `<p>Before you start work on an issue, you can set a time or other type of estimate to	calculate how much work you believe it'll take to resolve it. Once you've started to work on a specific issue, log time to keep a record of it.</p><p><br></p><ul><li>Open the issue and select ••• > Time tracking</li><li>Fill in the Time Spent field</li><li>Fill in the Time Remaining field and click Save</li></ul><h3><u>That's it!</u></h3><h1>💯💯</h1><p>Before you start work on an issue, you can set a time or other type of estimate to	calculate how much work you believe it'll take to resolve it. Once you've started to work on a specific issue, log time to keep a record of it.</p><p><br></p><ul><li>Open the issue and select ••• > Time tracking</li><li>Fill in the Time Spent field</li><li>Fill in the Time Remaining field and click Save</li></ul><h3><u>That's it!</u></h3><h1>💯💯</h1>`,
				priority: "High", //Lowest, Low, Medium, High, Highest
				comments: [
					{
						id: "comment-1",
						content: "this is a good idea!",
						datePosted: "11/02/2020",
						user: "Lord Gaben",
					},
					{
						id: "comment-2",
						content: "when can you get this finished by?",
						datePosted: "10/02/2020",
						user: "Pickle Rick",
					},
				],
				assignees: ["Lord Gaben", "Pickle Rick", "Johny Wills"],
				reporter: "Lord Gaben",
				timeEstimate: 123,
				dateCreated: "18/02/2020",
				dateUpdated: "19/02/2020",
			},
			"issue-2": { id: "issue-2", type: "bug", title: "Get money" },
			"issue-3": { id: "issue-3", type: "story", title: "Destroy a hedge fund" },
			"issue-4": { id: "issue-4", title: "Stonks" },
			"issue-5": { id: "issue-5", title: "Shower" },
			"issue-6": { id: "issue-6", title: "Go running" },
			"issue-7": { id: "issue-7", title: "Eat lots" },
			"issue-8": { id: "issue-8", title: "Have a good conversation!" },
		},
		columns: {
			"column-1": {
				id: "column-1",
				title: "To Do",
				issueIds: ["issue-1", "issue-2", "issue-3"],
			},
			"column-2": {
				id: "column-2",
				title: "In Development",
				issueIds: ["issue-5"],
			},
			"column-3": {
				id: "column-3",
				title: "Backlog",
				issueIds: ["issue-7"],
			},
			"column-4": {
				id: "column-4",
				title: "Done",
				issueIds: ["issue-8"],
			},
			"column-5": {
				id: "column-5",
				title: "Test 1",
				issueIds: ["issue-6"],
			},
			"column-6": {
				id: "column-6",
				title: "Test 2",
				issueIds: ["issue-4"],
			},
		},
		columnOrder: ["column-1", "column-2", "column-3", "column-4", "column-5", "column-6"],
		projectTitle: "Test Project Title",
		starred: true,
		background: "#3182CE",
	},
	{
		id: "project-2",
		issues: {
			"issue-1": { id: "issue-1", title: "Take out the garbage" },
			"issue-2": { id: "issue-2", title: "Get money" },
			"issue-3": { id: "issue-3", title: "Destroy a hedge fund" },
			"issue-4": { id: "issue-4", title: "Stonks" },
			"issue-5": { id: "issue-5", title: "Shower" },
		},
		columns: {
			"column-1": {
				id: "column-1",
				title: "To Do",
				issueIds: ["issue-1", "issue-2", "issue-3"],
			},
			"column-2": {
				id: "column-2",
				title: "In Development",
				issueIds: ["issue-4"],
			},
			"column-3": {
				id: "column-3",
				title: "Backlog",
				issueIds: ["issue-5"],
			},
		},
		columnOrder: ["column-1", "column-2", "column-3"],
		projectTitle: "Test Project Title 2",
		starred: true,
	},
	{
		id: "project-3",
		issues: {
			"issue-1": { id: "issue-1", title: "Take out the garbage" },
			"issue-2": { id: "issue-2", title: "Get money" },
			"issue-3": { id: "issue-3", title: "Destroy a hedge fund" },
			"issue-4": { id: "issue-4", title: "Stonks" },
			"issue-5": { id: "issue-5", title: "Shower" },
		},
		columns: {
			"column-1": {
				id: "column-1",
				title: "To Do",
				issueIds: ["issue-1", "issue-2", "issue-3"],
			},
			"column-2": {
				id: "column-2",
				title: "In Development",
				issueIds: ["issue-4"],
			},
			"column-3": {
				id: "column-3",
				title: "Backlog",
				issueIds: ["issue-5"],
			},
		},
		columnOrder: ["column-1", "column-2", "column-3"],
		projectTitle: "Test 3",
		starred: false,
	},

	{
		id: "project-4",
		issues: {
			"issue-1": { id: "issue-1", title: "Take out the garbage" },
			"issue-2": { id: "issue-2", title: "Get money" },
			"issue-3": { id: "issue-3", title: "Destroy a hedge fund" },
			"issue-4": { id: "issue-4", title: "Stonks" },
			"issue-5": { id: "issue-5", title: "Shower" },
		},
		columns: {
			"column-1": {
				id: "column-1",
				title: "To Do",
				issueIds: ["issue-1", "issue-2", "issue-3"],
			},
			"column-2": {
				id: "column-2",
				title: "In Development",
				issueIds: ["issue-4"],
			},
			"column-3": {
				id: "column-3",
				title: "Backlog",
				issueIds: ["issue-5"],
			},
		},
		columnOrder: ["column-1", "column-2", "column-3"],
		projectTitle: "Test 4",
		starred: false,
	},

	{
		id: "project-5",
		issues: {
			"issue-1": { id: "issue-1", title: "Take out the garbage" },
			"issue-2": { id: "issue-2", title: "Get money" },
			"issue-3": { id: "issue-3", title: "Destroy a hedge fund" },
			"issue-4": { id: "issue-4", title: "Stonks" },
			"issue-5": { id: "issue-5", title: "Shower" },
		},
		columns: {
			"column-1": {
				id: "column-1",
				title: "To Do",
				issueIds: ["issue-1", "issue-2", "issue-3"],
			},
			"column-2": {
				id: "column-2",
				title: "In Development",
				issueIds: ["issue-4"],
			},
			"column-3": {
				id: "column-3",
				title: "Backlog",
				issueIds: ["issue-5"],
			},
		},
		columnOrder: ["column-1", "column-2", "column-3"],
		projectTitle: "Test 5",
		starred: false,
	},
];

export default initialData;
