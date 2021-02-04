import React, { useState } from "react";
import { Grid, EditablePreview, EditableInput, Editable } from "@chakra-ui/react";
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
			let newTaskIds = Array.from(startColumn.taskIds);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...startColumn,
				taskIds: newTaskIds,
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
			let startTaskIds = Array.from(startColumn.taskIds);
			startTaskIds.splice(source.index, 1);

			const newStartColumn = {
				...startColumn,
				taskIds: startTaskIds,
			};

			let finishTaskIds = Array.from(finishColumn.taskIds);
			finishTaskIds.splice(destination.index, 0, draggableId);

			const newFinishColumn = {
				...finishColumn,
				taskIds: finishTaskIds,
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

	const delTask = (id: any, columnId: any) => {
		setBoardData((prevData: any) => {
			const tasks = JSON.parse(JSON.stringify(prevData.tasks));

			let newTasks: any = {};

			for (const key in tasks) {
				if (key !== id) {
					newTasks[key] = tasks[key];
				}
			}

			const newTaskIds = prevData.columns[columnId].taskIds.filter((taskId: any) => {
				return taskId !== id;
			});

			const newColumn = {
				...prevData.columns[columnId],
				taskIds: newTaskIds,
			};

			const newColumns = {
				...prevData.columns,
				[columnId]: newColumn,
			};

			const newData = {
				...prevData,
				columns: newColumns,
				tasks: newTasks,
			};

			return newData;
		});
	};

	const addIssue = (issue: any, columnId: any) => {
		setBoardData((prevData: any) => {
			const newTaskId = uuidv4();

			const newTask = {
				id: newTaskId,
				content: issue,
			};

			const newTasks = {
				...prevData.tasks,
				[newTaskId]: newTask,
			};

			const oldColumn = prevData.columns[columnId];
			let newTaskIds: any = Array.from(prevData.columns[columnId].taskIds);
			newTaskIds.push(newTaskId);

			const newColumn = {
				...oldColumn,
				taskIds: newTaskIds,
			};

			const newColumns = {
				...prevData.columns,
				[columnId]: newColumn,
			};

			const newData = {
				...prevData,
				tasks: newTasks,
				columns: newColumns,
			};

			return newData;
		});
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			{/* TODO: add react hook form to this editable to save the user entered value, and update the state */}
			<Editable defaultValue={boardData.projectTitle} textAlign='center' fontSize='3xl' mb={5}>
				<EditablePreview />
				<EditableInput />
			</Editable>

			<Droppable direction='horizontal' droppableId='all-columns' type='column'>
				{(provided) => (
					<Grid
						w='100%'
						h='80%'
						templateColumns={`repeat(${boardData.columnOrder.length + 1},max-content)`}
						gap={4}
						overflowX='auto'
						overflowY='hidden'
						pb={4}
						{...provided.droppableProps}
						ref={provided.innerRef}>
						<>
							{boardData.columnOrder.map((columnId: string, index: any) => {
								const column = boardData.columns[columnId];

								const tasks = column.taskIds.map((id: any) => boardData.tasks[id]);

								return (
									<Column key={column.id} index={index} column={column} addIssue={addIssue}>
										{tasks.map((task: any, index: any) => {
											return (
												<IssueCard
													key={task.id}
													issue={task}
													index={index}
													delTask={delTask}
													columnId={columnId}
												/>
											);
										})}
									</Column>
								);
							})}
							<AddColumn />
						</>
					</Grid>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default Board;
