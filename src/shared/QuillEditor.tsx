import React from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

interface Props {
	value: any;
	setValue: (data: string) => void;
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
			<ReactQuill defaultValue={value} modules={quillConfig} onChange={handleChange} />
		</>
	);
};

export default QuillEditor;
