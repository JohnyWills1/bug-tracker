import { Box, Flex, Text, Editable, EditableInput, EditablePreview } from "@chakra-ui/react";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

interface Props {
	column: any;
	children?: React.ReactNode;
	index: any;
}

const Column = ({ column, children, index }: Props) => {
	return (
		<>
			<Draggable draggableId={column.id} index={index}>
				{(provided) => (
					<Box rounded='xl' bgColor='#F4F5F7' w='100%' h='100%' {...provided.draggableProps} ref={provided.innerRef}>
						<Flex
							justify='space-between'
							py={3}
							px={4}
							w='100%'
							align='flex-start'
							borderBottom='1px solid #d8dce3'
							{...provided.dragHandleProps}>
							<form>
								<Editable defaultValue={column.title} w='fit-content' onEdit={() => console.log("Edit started")}>
									<EditablePreview />
									<EditableInput />
								</Editable>
							</form>
							<Text w='fit-content'>{column.taskIds.length}</Text>
						</Flex>
						<Droppable droppableId={column.id} type='task' direction='vertical'>
							{(provided) => (
								<Flex
									justify='flex-start'
									py={4}
									px={6}
									align='center'
									h='100%'
									flexDirection='column'
									ref={provided.innerRef}
									{...provided.droppableProps}>
									{children}
									{provided.placeholder}
								</Flex>
							)}
						</Droppable>
					</Box>
				)}
			</Draggable>
		</>
	);
};

export default Column;
