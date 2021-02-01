import React, { useState } from "react";
import { Grid } from "@chakra-ui/react";
import Column from "./Column";
import IssueCard from "./IssueCard";
import initialData from "../../testdata";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Board = (props: any) => {
	const [boardData, setBoardData]: any = useState(initialData);

	const onDragEnd = (result: any) => {
		// TODO: reorder our column and update in state
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

	const delTask = (id: any) => {
		setBoardData((prevData: any) => {
			const newTasks = prevData.tasks.filter((task: any) => task.id !== id);

			const newData = {
				...prevData,
				tasks: newTasks,
			};

			return newData;
		});
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable direction='horizontal' droppableId='all-columns' type='column'>
				{(provided) => (
					<Grid
						w='95%'
						h='80%'
						templateColumns={
							boardData.columnOrder.length <= 4 ? `repeat(${boardData.columnOrder.length},1fr)` : `repeat(4,1fr)`
						}
						gap={4}
						{...provided.droppableProps}
						ref={provided.innerRef}>
						{boardData.columnOrder.map((columnId: string, index: any) => {
							const column = boardData.columns[columnId];

							const tasks = column.taskIds.map((id: any) => boardData.tasks[id]);

							return (
								<Column key={column.id} index={index} column={column}>
									{tasks.map((task: any, index: any) => {
										return <IssueCard key={task.id} issue={task} index={index} delTask={delTask} />;
									})}
								</Column>
							);
						})}
						{provided.placeholder}
					</Grid>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default Board;
