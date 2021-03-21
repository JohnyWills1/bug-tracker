import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	Stack,
	FormControl,
	FormLabel,
	Input,
	FormHelperText,
	Text,
	Box,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import QuillEditor from "../../../shared/QuillEditor";
import Assignees from "../Assignees/Assignees";
import PrioritySelect from "../Priority/PrioritySelect";
import Reporter from "../Reporter/Reporter";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	addNewIssue: (issue: any) => void;
	users: any;
}

interface IssueProps {
	summary: string;
}

const CreateIssueModal = ({ isOpen, onClose, addNewIssue, users }: Props) => {
	// React Hook Forms
	const { register, handleSubmit, errors, setError, clearErrors } = useForm();

	const [value, setValue] = React.useState("");
	const [reporter, setReporter] = React.useState("");
	const [assignees, setAssignees] = React.useState<string[]>([]);
	const [priority, setPriority] = React.useState("");
	const [showPriorityBox, setPriorityBox] = React.useState(false);

	// Refs
	const node = React.useRef<HTMLDivElement>(null);

	const onSubmit = (data: IssueProps) => {
		console.log(data, value);
	};

	const changeIssueReporter = (newReporter: any) => {
		setReporter(newReporter);
	};

	const removeAssignee = (aName: any) => {
		const removedAssignees = [...assignees].filter((name: any) => name !== aName);
		setAssignees(() => {
			return removedAssignees;
		});
	};

	const addAssignee = (aName: any) => {
		setAssignees((prevData: any) => {
			const newAssignees = [...prevData, aName];

			return newAssignees;
		});
	};

	const changePriority = (newP: any) => {
		setPriority(newP);
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
			default:
				return (
					<Text
						opacity={0.6}
						_hover={{ background: "#EDF2F7" }}
						rounded='md'
						w='fit-content'
						p='3px 0px 3px 3px'
						onClick={() => setPriorityBox(true)}>
						Unassigned
					</Text>
				);
		}
	};

	return (
		<>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				autoFocus={false}
				returnFocusOnClose={true}
				scrollBehavior='outside'
				size='4xl'>
				<form onSubmit={handleSubmit(onSubmit)}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>Create Issue</ModalHeader>
						<ModalCloseButton />
						<ModalBody>
							<Stack spacing={5}>
								<FormControl id='summary'>
									<FormLabel>Short Summary</FormLabel>
									<Input
										name='summary'
										ref={register({ required: { value: true, message: "This field is required" } })}
									/>
									<FormHelperText>Concisely summarize the issue in one or two sentences.</FormHelperText>
								</FormControl>
								<FormControl id='description'>
									<FormLabel>Description</FormLabel>
									<QuillEditor value={value} setValue={setValue} />
									{/* Create a new shared Editor component - not dependant on any props */}
									<FormHelperText>Describe the issue in as much detail as you'd like.</FormHelperText>
								</FormControl>
								<FormControl id='reporter'>
									<FormLabel>Reporter</FormLabel>
									<Reporter users={users} reporter={reporter} changeIssueReporter={changeIssueReporter} />
								</FormControl>
								<FormControl id='assignees'>
									<FormLabel>Assignees</FormLabel>
									<Assignees
										users={users}
										assignees={assignees}
										addAssignee={addAssignee}
										removeAssignee={removeAssignee}
									/>
								</FormControl>
								<FormControl id='priority'>
									<FormLabel>Priority</FormLabel>
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
											{renderPriority(priority)}
										</Stack>
										{showPriorityBox && (
											<PrioritySelect
												currentPriority={priority}
												changePriority={changePriority}
												showPBox={setPriorityBox}
											/>
										)}
									</Box>
								</FormControl>
							</Stack>
						</ModalBody>

						<ModalFooter>
							<Stack isInline>
								<Button colorScheme='blue' type='submit'>
									Create Issue
								</Button>
								<Button onClick={onClose}>Close</Button>
							</Stack>
						</ModalFooter>
					</ModalContent>
				</form>
			</Modal>
		</>
	);
};

export default CreateIssueModal;
