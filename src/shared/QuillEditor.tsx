import { Flex } from "@chakra-ui/react";
import React from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

interface Props {
	value: any;
	setValue: (data: any) => void;
}

const QuillEditor = ({ value, setValue }: Props) => {
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
				<ReactQuill defaultValue={value} modules={quillConfig} onChange={handleChange}>
					<div className='editing-area' style={{ borderRadius: "0 0 10px 10px" }} />
				</ReactQuill>
			</Flex>
		</>
	);
};

export default QuillEditor;
