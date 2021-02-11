import React from "react";
import {
	Modal,
	ModalOverlay,
	ModalHeader,
	ModalCloseButton,
	ModalContent,
	ModalBody,
	Text,
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	ModalFooter,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	issue: {
		id: string;
		title: string;
		description?: string;
	};
	columnId: any;
	delIssue: (id: any, columnId: any) => void;
}

const IssueModal = ({ isOpen, onClose, issue, delIssue, columnId }: Props) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{issue.id}</ModalHeader>
				<ModalCloseButton />

				<ModalBody>
					<Text>Content: {issue.description}</Text>
				</ModalBody>

				<ModalFooter>
					<FormControl id='deleteColumn'>
						<FormLabel>Delete Issue</FormLabel>
						<Button
							leftIcon={<DeleteIcon />}
							colorScheme='red'
							onClick={() => {
								onClose();
								delIssue(issue.id, columnId);
							}}>
							Delete Issue
						</Button>
						<FormHelperText>This cannot be undone</FormHelperText>
					</FormControl>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default IssueModal;
