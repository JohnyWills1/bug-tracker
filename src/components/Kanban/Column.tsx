import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

interface Props {
	column: any;
	children?: React.ReactNode;
	innerRef: any;
	index: any;
}

const Column = ({ column, children, innerRef, index }: Props) => {
	return (
		<Draggable draggableId={column.id} index={index}>
			{(provided) => (
				<Box rounded='xl' bgColor='#F4F5F7' w='100%' h='100%' {...provided.draggableProps} ref={provided.innerRef}>
					<Flex justify='flex-start' py={4} px={6} align='center' h='100%' flexDirection='column' ref={innerRef}>
						<Flex
							justify='space-between'
							pt={1}
							pb={3}
							mb={4}
							w='100%'
							align='flex-start'
							borderBottom='1px solid #d8dce3'
							{...provided.dragHandleProps}>
							<Text w='fit-content'>{column.title}</Text>
							<Text w='fit-content'>{column.taskIds.length}</Text>
						</Flex>
						{children}
					</Flex>
				</Box>
			)}
		</Draggable>
	);
};

export default Column;
