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
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
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
	const [alertOpen, setAlertOpen] = React.useState(false);
	const cancelRef = React.useRef(null);

	const onSubmit = ({ newTitle }: FormData) => {
		changeColumnTitle(newTitle, column.id);
		onClose();
	};

	const onAlertClose = () => {
		setAlertOpen(false);
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
										setAlertOpen(true);
									}}>
									Delete Column
								</Button>
								<AlertDialog isOpen={alertOpen} leastDestructiveRef={cancelRef} onClose={onAlertClose}>
									<AlertDialogOverlay>
										<AlertDialogContent>
											<AlertDialogHeader fontSize='lg' fontWeight='bold'>
												Delete Column
											</AlertDialogHeader>

											<AlertDialogBody>
												Are you sure? You can't undo this action afterwards. All issues contained in this
												column will be lost.
											</AlertDialogBody>

											<AlertDialogFooter>
												<Button ref={cancelRef} onClick={onAlertClose}>
													Cancel
												</Button>
												<Button
													colorScheme='red'
													onClick={() => {
														onClose();
														deleteColumn(column.id);
													}}
													ml={3}>
													Delete
												</Button>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialogOverlay>
								</AlertDialog>
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
		<div style={{ display: "inline-block", marginRight: "10px" }}>
			<Draggable draggableId={column.id} index={index}>
				{(provided, snapshot) => (
					<Box
						rounded='md'
						bgColor='#F4F5F7'
						w='100%'
						minW='250px'
						h='fit-content'
						minH={snapshot.isDragging ? "fit-content" : "100%"}
						{...provided.draggableProps}
						ref={provided.innerRef}>
						<Flex py={3} px={4} justify='space-between' align='center' {...provided.dragHandleProps}>
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
						</Flex>

						<Flex w='100%' align='flex-start' borderBottom='1px solid #d8dce3'></Flex>

						<Droppable droppableId={column.id} type='issue' direction='vertical'>
							{(provided, snapshot) => (
								<Flex
									py={4}
									px={6}
									w='100%'
									minH='100vh'
									align='center'
									rounded='xl'
									borderTopLeftRadius='0'
									borderTopRadius='0'
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
