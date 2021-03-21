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
	assignRef,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import QuillEditor from "../../../shared/QuillEditor";
import Assignees from "../Assignees/Assignees";
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
							</FormControl>
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
