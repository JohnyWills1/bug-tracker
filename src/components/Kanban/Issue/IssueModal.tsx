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
	Select,
} from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon, CloseIcon, DeleteIcon } from "@chakra-ui/icons";

// Quill
import "quill/dist/quill.snow.css";

// Components
import IssueComments from "./IssueComments";
import Editor from "../../../shared/Editor";
import PrioritySelect from "../Priority/PrioritySelect";
import QuillText from "../../../shared/QuillText";
import Reporter from "../Reporter/Reporter";
import Assignees from "../Assignees/Assignees";
import BoardContext from "../../../contexts/BoardContext";
import TimeEstimate from "../TimeEstimate/TimeEstimate";

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
				datePosted: any;
				userName: string;
				userId: string;
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
	columns: any;
	users: [string];
	changeColumn: (issueId: any, oldColumnId: any, newColumnId: any) => void;
}

const IssueModal = ({ isOpen, onClose, issue, columnId, columns, users, changeColumn }: Props) => {
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

	const selectColumns = columnsArr.filter((column: any) => {
		return column.id !== columnId;
	});

	// Functions
	const onAlertClose = () => {
		setAlertOpen(false);
	};

	const handleStatusChange = (e: any) => {
		changeColumn(issue.id, columnId, e.target.value);
	};

	const changeEditorBool = (arg0: boolean) => {
		setEditDesc(arg0);
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
		<Modal isOpen={isOpen} onClose={onClose} autoFocus={false} returnFocusOnClose={true} scrollBehavior='outside' size='6xl'>
			<BoardContext.Consumer>
				{({
					deleteIssue,
					changeIssueTitle,
					changePriority,
					changeIssueReporter,
					addIssueAssignee,
					removeIssueAssignee,
					changeIssueDescription,
					addComment,
					editComment,
					deleteComment,
					changeTime,
				}) => (
					<>
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
											onSubmit={(data) => {
												let newIssue = JSON.parse(JSON.stringify(issue));
												newIssue.title = data;
												changeIssueTitle(newIssue, issue.id);
											}}
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
										<Box pl='6px'>
											<Text fontWeight='700' p='20px 0 6px' fontSize='18px'>
												Description
											</Text>
											{editDesc ? (
												<Editor
													initialValue={issue.description}
													setEditor={changeEditorBool}
													saveChanges={changeIssueDescription}
													id={issue.id}
												/>
											) : (
												<>
													{issue.description && issue.description.length ? (
														<Box onClick={() => setEditDesc(true)}>
															<QuillText value={issue.description} />
														</Box>
													) : (
														<Text
															onClick={() => setEditDesc(true)}
															borderRadius='5px'
															p='3px 7px'
															_hover={{ bgColor: "#EDF2F7", cursor: "pointer" }}>
															Add a description...
														</Text>
													)}
												</>
											)}

											<IssueComments
												comments={issue.comments}
												editComment={editComment}
												deleteComment={deleteComment}
												addComment={addComment}
												id={issue.id}
											/>
										</Box>
									</Flex>
									<Flex justify='flex-start' flexDirection='column' w='35%'>
										<Box>
											<Text textTransform='uppercase' opacity={0.7} fontWeight='700' mt='12px' mb='5px'>
												Status
											</Text>
											<Flex flexWrap='wrap' textTransform='uppercase'>
												<Select
													placeholder={columns[columnId].title}
													variant='filled'
													onChange={handleStatusChange}>
													{selectColumns.map((column: any) => {
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
											<Assignees
												users={users}
												assignees={issue.assignees}
												addAssignee={addIssueAssignee}
												removeAssignee={removeIssueAssignee}
												id={issue.id}
											/>
										</Box>
										<Box>
											<Text textTransform='uppercase' opacity={0.7} fontWeight='700' mt='24px' mb='5px'>
												Reporter
											</Text>
											<Reporter
												reporter={issue.reporter}
												users={users}
												changeIssueReporter={changeIssueReporter}
												id={issue.id}
											/>
										</Box>
										<Box>
											<Text textTransform='uppercase' opacity={0.7} fontWeight='700' mt='24px' mb='5px'>
												Priority
											</Text>
											<Box ref={node}>
												<Stack
													cursor='pointer'
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
												{showPriorityBox && (
													<PrioritySelect
														currentPriority={issue.priority}
														changePriority={changePriority}
														showPBox={setPriorityBox}
														id={issue.id}
													/>
												)}
											</Box>
										</Box>

										<Box>
											<TimeEstimate time={issue.timeEstimate} changeTime={changeTime} id={issue.id} />
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
												deleteIssue(issue.id, columnId);
											}}
											ml={3}>
											Delete
										</Button>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialogOverlay>
						</AlertDialog>
					</>
				)}
			</BoardContext.Consumer>
		</Modal>
	);
};

export default IssueModal;
