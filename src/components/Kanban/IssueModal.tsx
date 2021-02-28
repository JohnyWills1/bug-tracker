import React from "react";

// Chakra UI
import {
	Modal,
	ModalOverlay,
	ModalHeader,
	ModalContent,
	ModalBody,
	Text,
	Button,
	Editable,
	EditableInput,
	EditablePreview,
	Flex,
	IconButton,
	Stack,
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Box,
	Divider,
	Tag,
	TagLabel,
	Avatar,
	keyframes,
	Select,
} from "@chakra-ui/react";
import { CloseIcon, DeleteIcon } from "@chakra-ui/icons";

// Components
import IssueComments from "./IssueComments";

// Quill Imports (inc CSS)
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	issue: {
		id: string;
		title: string;
		description?: string;
		priority?: string;
		comments?: [
			{
				id: string;
				content: string;
				datePosted: string;
				user: string;
			}
		];
		type: string;
		assignees: [string];
		reporter: string;
		timeEstimate: number;
		dateCreated: string;
		dateUpdated: string;
	};
	columnId: any;
	delIssue: (id: any, columnId: any) => void;
	columns: any;
}

const IssueModal = ({ isOpen, onClose, issue, delIssue, columnId, columns }: Props) => {
	// Hooks
	const [alertOpen, setAlertOpen] = React.useState(false);
	const [editDesc, setEditDesc] = React.useState(false);

	// Refs
	const cancelRef = React.useRef(null);

	let columnsArr = [];

	for (const value in columns) {
		columnsArr.push(columns[value]);
	}

	// Functions
	const onAlertClose = () => {
		setAlertOpen(false);
	};

	const changeIssueTitle = (data: any) => {
		// TODO: finish this with a props passed function
		console.log(data);
	};

	const handleSelectChange = (e: any) => {
		// TODO: pass a function to change the column of an issue down to this component and call it here
		// ! you need the issue id, its original column and the new target column
		// ! both columns need to have their issueIds array updated
		console.log(issue.id);
		console.log("Old Column", columns[columnId]);
		console.table(columns[e.target.value]);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} autoFocus={false} isCentered={true} size='5xl'>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader py='18px'>
					<Flex justify='space-between' align='center' w='100%'>
						<Stack isInline>
							<Button size='sm' _hover={{ bgColor: "#EBECF0" }} variant='outline' bgColor='white'>
								{issue.id}
							</Button>
						</Stack>

						<Stack spacing={4} isInline>
							<IconButton
								aria-label='delete issue'
								icon={<DeleteIcon />}
								size='sm'
								_hover={{ bgColor: "#EBECF0" }}
								bgColor='white'
								variant='outline'
								onClick={() => {
									setAlertOpen(true);
								}}
							/>
							<IconButton
								aria-label='close modal'
								icon={<CloseIcon />}
								onClick={onClose}
								size='sm'
								_hover={{ bgColor: "#EBECF0" }}
								bgColor='white'
							/>
						</Stack>
					</Flex>
				</ModalHeader>

				<ModalBody p='0 24px 50px'>
					<Flex w='100%' h='fit-content' justify='space-between'>
						<Flex pr='50px' flexDirection='column' w='65%'>
							<Editable onSubmit={(data) => changeIssueTitle(data)} defaultValue={issue.title} rounded='md'>
								<EditablePreview
									overflowY='hidden'
									w='100%'
									p='3px 7px'
									_hover={{ bgColor: "#EBECF0" }}
									fontSize='24px'
									fontWeight='700'
								/>
								<EditableInput fontSize='24px' p='3px 7px' mb='6px' fontWeight='700' />
							</Editable>

							<Box pl='6px'>
								<Text fontWeight='700' p='20px 0 6px' fontSize='18px'>
									Description
								</Text>
								{/* <div style={{ width: "100%", height: "fit-conent" }}>
									<div ref={quillRef} />
								</div> */}
								{issue.description && issue.description.length ? (
									<>
										{editDesc ? (
											<Flex flexDirection='column'>
												<ReactQuill value={issue.description} />
												<Stack pt='10px' isInline>
													<Button colorScheme='blue' size='sm'>
														Save
													</Button>
													<Button size='sm' onClick={() => setEditDesc(false)}>
														Cancel
													</Button>
												</Stack>
											</Flex>
										) : (
											<Box
												w='100%'
												h='fit-content'
												onClick={() => setEditDesc(true)}
												_hover={{ cursor: "text" }}>
												{issue.description}
											</Box>
										)}
									</>
								) : (
									<Flex flexDirection='column'>
										<ReactQuill />
										<Stack pt='10px' isInline>
											<Button colorScheme='blue' size='sm'>
												Save
											</Button>
											<Button size='sm' onClick={() => setEditDesc(false)}>
												Cancel
											</Button>
										</Stack>
									</Flex>
								)}

								<IssueComments comments={issue.comments} />
							</Box>
						</Flex>
						<Flex justify='space-between' flexDirection='column' w='35%'>
							<Box>
								<Text textTransform='uppercase' opacity={0.7} fontWeight='700'>
									Status
								</Text>
								<Flex flexWrap='wrap' textTransform='uppercase'>
									<Select placeholder='Select a category' onChange={handleSelectChange}>
										{columnsArr.map((column: any) => {
											return (
												<option key={column.id} value={column.id}>
													{column.title}
												</option>
											);
										})}
									</Select>
								</Flex>
							</Box>
							<Box>
								<Text textTransform='uppercase' opacity={0.7} fontWeight='700'>
									Assignees
								</Text>
								<Flex flexWrap='wrap'>
									{issue.assignees &&
										issue.assignees.map((name: string) => {
											return (
												<Tag
													key={name}
													w='fit-content'
													size='lg'
													colorScheme='gray'
													borderRadius='md'
													m='0 10px 5px 0'
													p='8px 10px'>
													<Avatar name={name} size='xs' ml={-1} mr={2} />
													<TagLabel>{name}</TagLabel>
												</Tag>
											);
										})}
								</Flex>
							</Box>
							<Box>
								<Text textTransform='uppercase' opacity={0.7} fontWeight='700'>
									Reporter
								</Text>
								{issue.reporter && (
									<Tag size='lg' colorScheme='gray' borderRadius='md' m='0 10px 5px 0' p='8px 10px'>
										<Avatar name={issue.reporter} size='xs' ml={-1} mr={2} />
										<TagLabel>{issue.reporter}</TagLabel>
									</Tag>
								)}
							</Box>
							<Box>
								<Text textTransform='uppercase' opacity={0.7} fontWeight='700'>
									Priority
								</Text>
								{issue.priority}
							</Box>

							<Box>
								<Text textTransform='uppercase' opacity={0.7} fontWeight='700'>
									Time Estimate (Hours)
								</Text>
								{issue.timeEstimate}
							</Box>
							<Divider />
							<Box>
								<Text opacity={0.6}>Created on {issue.dateCreated}</Text>
								<Text opacity={0.6}>Updated on {issue.dateUpdated}</Text>
							</Box>
						</Flex>
					</Flex>
				</ModalBody>
			</ModalContent>

			<AlertDialog isCentered={true} isOpen={alertOpen} leastDestructiveRef={cancelRef} onClose={onAlertClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize='lg' fontWeight='bold'>
							Delete Issue
						</AlertDialogHeader>

						<AlertDialogBody>Are you sure? You can't undo this action afterwards.</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onAlertClose}>
								Cancel
							</Button>
							<Button
								colorScheme='red'
								onClick={() => {
									onClose();
									delIssue(issue.id, columnId);
								}}
								ml={3}>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</Modal>
	);
};

export default IssueModal;
