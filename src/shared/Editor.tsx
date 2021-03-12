import { Flex, Stack, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

interface Props {
	initialValue?: string;
	setEditor: (arg0: boolean) => void;
	saveChanges: (newDesc: string, id: any) => void;
	id: any;
}

const Editor = ({ initialValue, setEditor, saveChanges, id }: Props) => {
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
					<Button
						colorScheme='blue'
						size='sm'
						onClick={() => {
							saveChanges(value, id);
							setEditor(false);
						}}>
						Save
					</Button>
					<Button size='sm' onClick={() => setEditor(false)}>
						Cancel
					</Button>
				</Stack>
			</Flex>
		</>
	);
};

export default Editor;
