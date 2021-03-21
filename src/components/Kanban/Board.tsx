import React, { useState } from "react";
import { EditablePreview, EditableInput, Editable, Flex, useToast } from "@chakra-ui/react";
import Column from "./Column";
import IssueCard from "./Issue/IssueCard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import AddColumn from "./AddColumn";
import BoardContext from "../../contexts/BoardContext";

interface Props {
	projectData: any;
}

const Board = ({ projectData }: Props) => {
	const [boardData, setBoardData]: any = useState(projectData);

	const toast = useToast();

	const onDragEnd = (result: any) => {
		const { destination, source, draggableId, type } = result;

		if (!destination) {
			return;
		}

		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		if (type === "column") {
			let newColumnOrder = Array.from(boardData.columnOrder);
			newColumnOrder.splice(source.index, 1);
			newColumnOrder.splice(destination.index, 0, draggableId);

			setBoardData((prevData: any) => {
				const newData = {
					...prevData,
					columnOrder: newColumnOrder,
				};

				return newData;
			});
			return;
		}

		const startColumn = boardData.columns[source.droppableId];
		const finishColumn = boardData.columns[destination.droppableId];

		if (startColumn === finishColumn) {
			let newIssueIds = Array.from(startColumn.issueIds);
			newIssueIds.splice(source.index, 1);
			newIssueIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...startColumn,
				issueIds: newIssueIds,
			};

			setBoardData((prevData: any) => {
				const newData = {
					...prevData,
					columns: {
						...prevData.columns,
						[newColumn.id]: newColumn,
					},
				};

				return newData;
			});
		} else {
			let startIssueIds = Array.from(startColumn.issueIds);
			startIssueIds.splice(source.index, 1);

			const newStartColumn = {
				...startColumn,
				issueIds: startIssueIds,
			};

			let finishIssueIds = Array.from(finishColumn.issueIds);
			finishIssueIds.splice(destination.index, 0, draggableId);

			const newFinishColumn = {
				...finishColumn,
				issueIds: finishIssueIds,
			};

			setBoardData((prevData: any) => {
				const newData = {
					...prevData,
					columns: {
						...prevData.columns,
						[newStartColumn.id]: newStartColumn,
						[newFinishColumn.id]: newFinishColumn,
					},
				};
				return newData;
			});
		}
	};

	const delIssue = (id: any, columnId: any) => {
		setBoardData((prevData: any) => {
			const issues = JSON.parse(JSON.stringify(prevData.issues));

			let newIssues: any = {};

			for (const key in issues) {
				if (key !== id) {
					newIssues[key] = issues[key];
				}
			}

			const newissueIds = prevData.columns[columnId].issueIds.filter((issueId: any) => {
				return issueId !== id;
			});

			const newColumn = {
				...prevData.columns[columnId],
				issueIds: newissueIds,
			};

			const newColumns = {
				...prevData.columns,
				[columnId]: newColumn,
			};

			const newData = {
				...prevData,
				columns: newColumns,
				issues: newIssues,
			};

			return newData;
		});

		toast({
			position: "top-right",
			title: "Issue Deleted",
			description: `${boardData.issues[id].title} `,
			status: "success",
			duration: 1500,
			isClosable: true,
		});
	};

	const addIssue = (issue: any, columnId: any) => {
		setBoardData((prevData: any) => {
			const newIssueId = uuidv4();

			const newIssue = {
				id: newIssueId,
				title: issue,
			};

			const newIssues = {
				...prevData.issues,
				[newIssueId]: newIssue,
			};

			const oldColumn = prevData.columns[columnId];
			let newIssueIds: any = Array.from(prevData.columns[columnId].issueIds);
			newIssueIds.push(newIssueId);

			const newColumn = {
				...oldColumn,
				issueIds: newIssueIds,
			};

			const newColumns = {
				...prevData.columns,
				[columnId]: newColumn,
			};

			const newData = {
				...prevData,
				issues: newIssues,
				columns: newColumns,
			};

			return newData;
		});
	};

	const addColumn = (title: string) => {
		const newColumnId = uuidv4();

		setBoardData((prevData: any) => {
			const newColumn = {
				id: newColumnId,
				title: title,
				issueIds: [],
			};

			const newColumns = {
				...prevData.columns,
				[newColumnId]: newColumn,
			};

			const newColumnOrder = [...prevData.columnOrder, newColumnId];

			const newData = {
				...prevData,
				columns: newColumns,
				columnOrder: newColumnOrder,
			};

			return newData;
		});
	};

	const changeProjectTitle = (newTitle: string) => {
		setBoardData((prevData: any) => {
			const newData = {
				...prevData,
				projectTitle: newTitle,
			};

			return newData;
		});
	};

	const changeColumnTitle = (newTitle: string, columnId: any) => {
		const oldColumn = boardData.columns[columnId];

		const newColumn = {
			...oldColumn,
			title: newTitle,
		};

		setBoardData((prevData: any) => {
			const newColumns = {
				...prevData.columns,
				[columnId]: newColumn,
			};

			const newData = {
				...prevData,
				columns: newColumns,
			};

			return newData;
		});
	};

	const changeColumn = (issueId: any, oldColumnId: any, newColumnId: any) => {
		setBoardData((prevData: any) => {
			const removedIssueIds = prevData.columns[oldColumnId].issueIds.filter((id: any) => id !== issueId);

			const removedColumn = {
				...prevData.columns[oldColumnId],
				issueIds: removedIssueIds,
			};

			let newIssueIds = [...prevData.columns[newColumnId].issueIds];
			newIssueIds.push(issueId);

			const addedColumn = {
				...prevData.columns[newColumnId],
				issueIds: newIssueIds,
			};

			const newColumns = {
				...prevData.columns,
				[oldColumnId]: removedColumn,
				[newColumnId]: addedColumn,
			};

			const newData = {
				...prevData,
				columns: newColumns,
			};

			return newData;
		});

		toast({
			position: "top-right",
			title: "Issue Status Updated",
			description: `${boardData.issues[issueId].title} moved to ${boardData.columns[newColumnId].title}`,
			status: "success",
			duration: 1500,
			isClosable: true,
		});
	};

	const deleteColumn = (columnId: any) => {
		// Removed column from columns and from columnOrder
		const columnsCopy = JSON.parse(JSON.stringify(boardData.columns));
		let newColumns: any = {};

		for (const key in columnsCopy) {
			if (key !== columnId) {
				newColumns[key] = columnsCopy[key];
			}
		}

		setBoardData((prevData: any) => {
			const newColumnOrder = prevData.columnOrder.filter((id: any) => id !== columnId);

			const newData = {
				...prevData,
				columns: newColumns,
				columnOrder: newColumnOrder,
			};

			return newData;
		});
	};

	const changeIssueTitle = (newIssue: any, issueId: any) => {
		setBoardData((prevData: any) => {
			const newIssues = {
				...prevData.issues,
				[issueId]: newIssue,
			};

			const newData = {
				...prevData,
				issues: newIssues,
			};

			return newData;
		});
	};

	const changePriority = (newPriority: string, issueId: any) => {
		setBoardData((prevData: any) => {
			const newIssue = {
				...prevData.issues[issueId],
				priority: newPriority,
			};

			const newIssues = {
				...prevData.issues,
				[issueId]: newIssue,
			};

			const newData = {
				...prevData,
				issues: newIssues,
			};

			return newData;
		});
	};

	const changeIssueReporter = (newReporter: string, issueId: any) => {
		setBoardData((prevData: any) => {
			let issuesCopy = JSON.parse(JSON.stringify(prevData.issues));

			issuesCopy[issueId].reporter = newReporter;

			const newData = {
				...prevData,
				issues: issuesCopy,
			};

			return newData;
		});
	};

	const addIssueAssignee = (aName: string, issueId: any) => {
		setBoardData((prevData: any) => {
			let aList = [...prevData.issues[issueId].assignees];
			aList.push(aName);

			const newIssue = {
				...prevData.issues[issueId],
				assignees: aList,
			};

			const newIssues = {
				...prevData.issues,
				[issueId]: newIssue,
			};

			const newData = {
				...prevData,
				issues: newIssues,
			};

			return newData;
		});
	};

	const removeIssueAssignee = (aName: string, issueId: any) => {
		setBoardData((prevData: any) => {
			let aList = [...prevData.issues[issueId].assignees];
			aList = aList.filter((name: any) => name !== aName);

			const newIssue = {
				...prevData.issues[issueId],
				assignees: aList,
			};

			const newIssues = {
				...prevData.issues,
				[issueId]: newIssue,
			};

			const newData = {
				...prevData,
				issues: newIssues,
			};

			return newData;
		});
	};

	const changeIssueDescription = (newDesc: string, issueId: any) => {
		setBoardData((prevData: any) => {
			let issue = JSON.parse(JSON.stringify(prevData.issues[issueId]));

			issue.description = newDesc;

			const newIssues = {
				...prevData.issues,
				[issueId]: issue,
			};

			const newData = {
				...prevData,
				issues: newIssues,
			};

			return newData;
		});
	};

	const addComment = (comment: any, issueId: any) => {
		setBoardData((prevData: any) => {
			let newComments = [...prevData.issues[issueId].comments];

			newComments.push(comment);

			const newIssue = {
				...prevData.issues[issueId],
				comments: newComments,
			};

			const newIssues = {
				...prevData.issues,
				[issueId]: newIssue,
			};

			const newData = {
				...prevData,
				issues: newIssues,
			};

			return newData;
		});
	};

	const editComment = (comment: any, issueId: any) => {};

	const deleteComment = (commentId: any, issueId: any) => {
		setBoardData((prevData: any) => {
			const newComments = prevData.issues[issueId].comments.filter((comment: any) => comment.id !== commentId);

			console.log(newComments);

			const newIssue = {
				...prevData.issues[issueId],
				comments: newComments,
			};

			const newIssues = {
				...prevData.issues,
				[issueId]: newIssue,
			};

			const newData = {
				...prevData,
				issues: newIssues,
			};

			return newData;
		});
	};

	const changeTime = (newTime: any, issueId: any) => {
		setBoardData((prevData: any) => {
			const newIssue = {
				...prevData.issues[issueId],
				timeEstimate: newTime,
			};

			const newIssues = {
				...prevData.issues,
				[issueId]: newIssue,
			};

			const newData = {
				...prevData,
				issues: newIssues,
			};

			return newData;
		});
	};

	return (
		<BoardContext.Provider
			value={{
				deleteIssue: delIssue,
				changeIssueTitle: changeIssueTitle,
				changePriority: changePriority,
				changeIssueReporter: changeIssueReporter,
				addIssueAssignee: addIssueAssignee,
				removeIssueAssignee: removeIssueAssignee,
				changeIssueDescription: changeIssueDescription,
				addComment: addComment,
				editComment: editComment,
				deleteComment: deleteComment,
				changeTime: changeTime,
			}}>
			<DragDropContext onDragEnd={onDragEnd}>
				<Editable
					onSubmit={changeProjectTitle}
					selectAllOnFocus={false}
					defaultValue={boardData.projectTitle}
					textAlign='center'
					fontSize='3xl'
					mb={5}>
					<EditablePreview w='100%' />
					<EditableInput />
				</Editable>

				<Droppable direction='horizontal' droppableId='all-columns' type='column'>
					{(provided, snapshot) => (
						<Flex
							w='100%'
							minH='70vh'
							h='fit-content'
							overflowX='auto'
							pb={4}
							pt={4}
							{...provided.droppableProps}
							ref={provided.innerRef}>
							{boardData.columnOrder.map((columnId: string, index: any) => {
								const column = boardData.columns[columnId];

								const issues = column.issueIds.map((id: any) => boardData.issues[id]);

								return (
									<Column
										key={column.id}
										index={index}
										column={column}
										addIssue={addIssue}
										deleteColumn={deleteColumn}
										changeColumnTitle={changeColumnTitle}>
										{issues.map((issue: any, index: any) => {
											return (
												<IssueCard
													columns={boardData.columns}
													key={issue.id}
													issue={issue}
													index={index}
													columnId={columnId}
													users={boardData.users}
													changeColumn={changeColumn}
												/>
											);
										})}
									</Column>
								);
							})}
							{provided.placeholder}

							<AddColumn addColumn={addColumn} />
						</Flex>
					)}
				</Droppable>
			</DragDropContext>
		</BoardContext.Provider>
	);
};

export default Board;
