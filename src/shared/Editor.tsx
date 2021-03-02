import { Flex, Stack, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

interface Props {
	initialValue?: string;
	closeEditor: (arg0: boolean) => void;
	saveChanges: (arg0: string) => void;
}

const Editor = ({ initialValue, closeEditor, saveChanges }: Props) => {
	const [value, setValue] = useState(initialValue || "");

	const handleChange = (data: any) => {
		setValue(data);
	};

	const quillConfig = {
		toolbar: [
			["bold", "italic", "underline", "strike"],
			["blockquote", "code-block"],
			[{ list: "ordered" }, { list: "bullet" }],
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			[{ color: [] }, { background: [] }],
			["clean"],
		],
	};

	return (
		<>
			<Flex flexDirection='column'>
				<ReactQuill defaultValue={initialValue} modules={quillConfig} onChange={handleChange} />
				<Stack pt='10px' isInline>
					<Button colorScheme='blue' size='sm' onClick={() => saveChanges(value)}>
						Save
					</Button>
					<Button size='sm' onClick={() => closeEditor(false)}>
						Cancel
					</Button>
				</Stack>
			</Flex>
		</>
	);
};

export default Editor;
