import React from "react";
import { Box, Flex, Text, useDisclosure } from "@chakra-ui/react";
import { Draggable } from "react-beautiful-dnd";
import IssueModal from "./IssueModal";

interface Props {
	issue: {
		id: string;
		content?: string;
	};
	index: any;
	delTask: (id: any) => void;
}

const IssueCard = ({ issue, index, delTask }: Props) => {
	// * ChakraUI
	// Modal hooks
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Draggable draggableId={issue.id} index={index}>
			{(provided) => (
				<Box
					rounded='lg'
					shadow='sm'
					bgColor='white'
					w='100%'
					h='fit-content'
					minH='100px'
					mb={3}
					p='10px'
					onClick={onOpen}
					style={{ userSelect: "none" }}
					_hover={{ backgroundColor: "#EBECF0" }}
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}>
					<Flex flexDirection='column' h='100%' justify='space-between'>
						<Text>{issue.content}</Text>
						{/* <Flex justify='space-between' align='center'>
					<Stack gap={2} display='flex' align='center' isInline>
						<Text>{issue.issuePriority}</Text>
						{issue.issueStatus === "In Progress" ? <CheckIcon /> : <NotAllowedIcon />}
					</Stack>
					<Avatar name={issue.creatorName} size='sm' />
				</Flex> */}
					</Flex>

					{isOpen && <IssueModal isOpen={isOpen} onClose={onClose} issue={issue} delTask={delTask} />}
				</Box>
			)}
		</Draggable>
	);
};

export default IssueCard;
