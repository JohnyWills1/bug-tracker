import { Box, Flex, Text, Editable, EditableInput, EditablePreview } from "@chakra-ui/react";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import AddCard from "./AddCard";

interface Props {
	column: any;
	children?: React.ReactNode;
	index: any;
	addIssue: (issue: any, columnId: any) => void;
}

const Column = ({ column, children, index, addIssue }: Props) => {
	return (
		<div style={{ display: "inline-block" }}>
			<Draggable draggableId={column.id} index={index}>
				{(provided, snapshot) => (
					<Box
						rounded='xl'
						bgColor={snapshot.isDragging ? "blue.200" : "#F4F5F7"}
						w='100%'
						minW='250px'
						h='fit-content'
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}>
						<Flex py={3} px={4} justify='space-between'>
							<Text w='fit-content' opacity='0.7'>
								{column.title}
							</Text>
							<Text w='fit-content' opacity='0.6'>
								{column.taskIds.length}
							</Text>
						</Flex>

						<Flex w='100%' align='flex-start' borderBottom='1px solid #d8dce3'></Flex>
						<Droppable droppableId={column.id} type='task' direction='vertical'>
							{(provided, snapshot) => (
								<Flex
									justify='flex-start'
									py={4}
									px={6}
									align='center'
									h='100%'
									rounded='xl'
									borderTopLeftRadius='0'
									borderTopRadius='0'
									bg={snapshot.isDraggingOver ? "blue.300" : "none"}
									flexDirection='column'
									ref={provided.innerRef}
									{...provided.droppableProps}>
									{children}
									{provided.placeholder}
									<AddCard addIssue={addIssue} columnId={column.id} />
								</Flex>
							)}
						</Droppable>
					</Box>
				)}
			</Draggable>
		</div>
	);
};

export default Column;
