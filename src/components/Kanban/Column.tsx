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
				{(provided) => (
					<Box
						rounded='xl'
						bgColor='#F4F5F7'
						w='100%'
						minW='250px'
						h='fit-content'
						{...provided.draggableProps}
						ref={provided.innerRef}>
						<Flex
							justify='space-between'
							py={3}
							px={4}
							w='100%'
							align='flex-start'
							borderBottom='1px solid #d8dce3'
							{...provided.dragHandleProps}>
							{/* <Text w='fit-content' fontSize='sm' textTransform='uppercase' opacity='0.6'>
								{column.title}
							</Text> */}
							<Editable defaultValue={column.title}>
								<EditablePreview />
								<EditableInput />
							</Editable>

							<Text w='fit-content' opacity='0.6'>
								{column.taskIds.length}
							</Text>
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
