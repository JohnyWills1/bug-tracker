import React, { useEffect } from "react";

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
	Select,
} from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons";

// Quill
import "quill/dist/quill.snow.css";

// Components
import IssueComments from "./IssueComments";
import Editor from "../../shared/Editor";
import PrioritySelect from "./PrioritySelect";
import QuillText from "../../shared/QuillText";

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
	changeIssueTitle: (arg0: any, arg1: any) => void;
}

const IssueModal = ({ isOpen, onClose, issue, delIssue, columnId, columns, changeIssueTitle }: Props) => {
	// Hooks
	const [alertOpen, setAlertOpen] = React.useState(false);
	const [editDesc, setEditDesc] = React.useState(false);
	const [showPriorityBox, setPriorityBox] = React.useState(false);

	// Refs
	const cancelRef = React.useRef(null);
	const node = React.useRef<HTMLDivElement>(null);

	let columnsArr = [];

	for (const value in columns) {
		columnsArr.push(columns[value]);
	}

	// Functions
	const onAlertClose = () => {
		setAlertOpen(false);
	};

	const changeTitle = (data: any) => {
		// TODO: finish this with a props passed function
		let newIssue = JSON.parse(JSON.stringify(issue));
		newIssue.title = data;
		changeIssueTitle(newIssue, issue.id);
	};

	const handlePriorityChange = (e: any) => {
		// TODO: pass a function to change the column of an issue down to this component and call it here
		// ! you need the issue id, its original column and the new target column
		// ! both columns need to have their issueIds array updated
		console.log(issue.id);
		console.log("Old Column", columns[columnId]);
		console.log(columns[e.target.value]);
	};

	const changeEditorBool = (arg0: boolean) => {
		setEditDesc(arg0);
	};

	const changeDesc = (newDesc: string) => {
		console.log(newDesc);
	};

	useEffect(() => {
		if (showPriorityBox) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showPriorityBox]);

	const handleClickOutside = (e: any) => {
		if (node.current && node.current.contains(e.target)) {
			// inside click
			return;
		}

		// outside click
		setPriorityBox(false);
	};

	const renderPriority = (value: any) => {
		switch (value) {
			case "Highest":
				return (
					<>
						<ArrowUpIcon w='20px' h='20px' color='rgb(205, 19, 23)' />
						<Text>Highest</Text>
					</>
				);

			case "High":
				return (
					<>
						<ArrowUpIcon w='20px' h='20px' color='rgb(233, 73, 74)' />
						<Text>High</Text>
					</>
				);
			case "Medium":
				return (
					<>
						<ArrowUpIcon w='20px' h='20px' color='rgb(233, 127, 51)' />
						<Text>Medium</Text>
					</>
				);
			case "Low":
				return (
					<>
						<ArrowDownIcon w='20px' h='20px' color='rgb(45, 135, 56)' />
						<Text>Low</Text>
					</>
				);
			case "Lowest":
				return (
					<>
						<ArrowDownIcon w='20px' h='20px' color='rgb(87, 165, 90)' />
						<Text>Lowest</Text>
					</>
				);
		}
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose} autoFocus={false} isCentered={true} scrollBehavior='outside' size='5xl'>
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
							<Editable
								onSubmit={(data) => changeTitle(data)}
								defaultValue={issue.title}
								selectAllOnFocus={false}
								rounded='md'>
								<EditablePreview
									overflowY='hidden'
									w='100%'
									p='3px 7px'
									_hover={{ bgColor: "#EDF2F7" }}
									fontSize='24px'
									fontWeight='700'
								/>
								<EditableInput fontSize='24px' p='3px 7px' mb='6px' fontWeight='700' />
							</Editable>
							{/* // TODO: this can't just be text, it has to be a quill object to properly display the content
							// TODO: look at the quill docs to figure this out */}
							<Box pl='6px'>
								<Text fontWeight='700' p='20px 0 6px' fontSize='18px'>
									Description
								</Text>
								{editDesc ? (
									<Editor
										initialValue={issue.description}
										closeEditor={changeEditorBool}
										saveChanges={changeDesc}
									/>
								) : (
									<>
										{issue.description && issue.description.length ? (
											<Box onClick={() => setEditDesc(true)}>
												<QuillText value={issue.description} />
											</Box>
										) : (
											<Text onClick={() => setEditDesc(true)}>Add a description...</Text>
										)}
									</>
								)}

								<IssueComments comments={issue.comments} />
							</Box>
						</Flex>
						<Flex justify='flex-start' flexDirection='column' w='35%'>
							<Box>
								<Text textTransform='uppercase' opacity={0.7} fontWeight='700' mt='12px' mb='5px'>
									Status
								</Text>
								<Flex flexWrap='wrap' textTransform='uppercase'>
									<Select placeholder='Select a category' onChange={handlePriorityChange}>
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
								<Text textTransform='uppercase' opacity={0.7} fontWeight='700' mt='24px' mb='5px'>
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
								<Text textTransform='uppercase' opacity={0.7} fontWeight='700' mt='24px' mb='5px'>
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
								<Text textTransform='uppercase' opacity={0.7} fontWeight='700' mt='24px' mb='5px'>
									Priority
								</Text>
								<Box ref={node}>
									<Stack
										spacing='6px'
										w='fit-content'
										rounded='md'
										p='5px'
										pr='9px'
										display='flex'
										align='center'
										_hover={{ background: "#EDF2F7" }}
										onClick={() => setPriorityBox(true)}
										isInline>
										{renderPriority(issue.priority)}
									</Stack>
									{showPriorityBox && <PrioritySelect currentPriority={issue.priority} />}
								</Box>
							</Box>

							<Box>
								<Text textTransform='uppercase' opacity={0.7} fontWeight='700' mt='24px' mb='5px'>
									Time Estimate (Hours)
								</Text>
								{issue.timeEstimate}
							</Box>
							<Divider mt='24px' mb='5px' />
							<Box>
								<Text fontSize='13px' opacity={0.6}>
									Created on {issue.dateCreated}
								</Text>
								<Text fontSize='13px' opacity={0.6}>
									Updated on {issue.dateUpdated}
								</Text>
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
