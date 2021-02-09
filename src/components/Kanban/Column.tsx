import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	Box,
	Flex,
	Text,
	IconButton,
	useDisclosure,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Input,
	FormControl,
	FormLabel,
	FormHelperText,
	Stack,
} from "@chakra-ui/react";
import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import AddCard from "./AddCard";

interface Props {
	column: any;
	children?: React.ReactNode;
	index: any;
	addIssue: (issue: any, columnId: any) => void;
	changeColumnTitle: (newTitle: string, columnId: any) => void;
	deleteColumn: (columnId: any) => void;
}

interface EditColumnProps {
	isOpen: boolean;
	onClose: () => void;
	column: any;
	changeColumnTitle: (newTitle: string, columnId: any) => void;
	deleteColumn: (columnId: any) => void;
}

interface FormData {
	newTitle: string;
}

const EditColumn = ({ isOpen, onClose, column, changeColumnTitle, deleteColumn }: EditColumnProps) => {
	const { register, handleSubmit } = useForm();
	const initialRef = React.useRef(null);

	const onSubmit = ({ newTitle }: FormData) => {
		changeColumnTitle(newTitle, column.id);
		onClose();
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{column.title}</ModalHeader>
				<ModalCloseButton />
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalBody>
						<Stack spacing={4}>
							<FormControl id='newTitle'>
								<FormLabel>Change Column Title</FormLabel>
								<Input placeholder={column.title} name='newTitle' ref={register({ required: true })} />
								<FormHelperText>Leave blank to keep it the same.</FormHelperText>
							</FormControl>

							<FormControl id='deleteColumn'>
								<FormLabel>Delete Column</FormLabel>
								<Button
									leftIcon={<DeleteIcon />}
									colorScheme='red'
									onClick={() => {
										onClose();
										deleteColumn(column.id);
									}}>
									Delete Column
								</Button>
								<FormHelperText>This cannot be undone</FormHelperText>
							</FormControl>
						</Stack>
					</ModalBody>

					<ModalFooter>
						<Button colorScheme='blue' mr={3} onClick={onClose}>
							Close
						</Button>
						<Button colorScheme='green' type='submit'>
							Save Changes
						</Button>
					</ModalFooter>
				</form>
			</ModalContent>
		</Modal>
	);
};

const Column = ({ column, children, index, addIssue, changeColumnTitle, deleteColumn }: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<div style={{ display: "inline-block" }}>
			<Draggable draggableId={column.id} index={index}>
				{(provided, snapshot) => (
					<Box
						rounded='md'
						bgColor={snapshot.isDragging ? "blue.200" : "#F4F5F7"}
						w='100%'
						minW='250px'
						h='fit-content'
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}>
						<Flex py={3} px={4} justify='space-between' align='center'>
							<Text w='fit-content' opacity='0.8'>
								{column.title}
							</Text>
							<IconButton
								onClick={onOpen}
								aria-label='edit column'
								size='xs'
								bgColor='#EBECF0'
								p={2}
								icon={<EditIcon w={4} h={4} opacity='0.7' />}
							/>
							<EditColumn
								deleteColumn={deleteColumn}
								column={column}
								isOpen={isOpen}
								onClose={onClose}
								changeColumnTitle={changeColumnTitle}
							/>

							{/* <Text w='fit-content' opacity='0.6'>
								{column.taskIds.length}
							</Text> */}
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
