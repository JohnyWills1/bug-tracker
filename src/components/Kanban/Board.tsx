import React, { useState } from "react";
import { EditablePreview, EditableInput, Editable, Flex } from "@chakra-ui/react";
import Column from "./Column";
import IssueCard from "./IssueCard";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import AddColumn from "./AddColumn";

interface Props {
	projectData: any;
}

const Board = ({ projectData }: Props) => {
	const [boardData, setBoardData]: any = useState(projectData);

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

	const changeColumn = () => {};

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

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			{/* TODO: add react hook form to this editable to save the user entered value, and update the state */}
			<Editable
				onSubmit={changeProjectTitle}
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
						h='75vh'
						overflowX='auto'
						overflowY='hidden'
						pb={4}
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
												delIssue={delIssue}
												columnId={columnId}
												changeIssueTitle={changeIssueTitle}
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
	);
};

export default Board;
