import React from "react";
import {
	Modal,
	ModalOverlay,
	ModalHeader,
	ModalCloseButton,
	Stack,
	ModalContent,
	ModalBody,
	Text,
	IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	issue: {
		id: string;
		content?: string;
	};
	delTask: (id: any) => void;
}

const IssueModal = ({ isOpen, onClose, issue, delTask }: Props) => {
	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{issue.id}</ModalHeader>
				<ModalCloseButton />

				<ModalBody>
					<Stack isInline>
						<IconButton aria-label='delete issue button' onClick={() => delTask(issue.id)} icon={<DeleteIcon />} />
					</Stack>
					<Text>{issue.content}</Text>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default IssueModal;
