import { Flex } from "@chakra-ui/react";
import React from "react";
import "react-quill/dist/quill.snow.css";

interface Props {
	value: string;
}

const QuillText = ({ value }: Props) => {
	return (
		<>
			<div className='ql-snow'>
				<div className='ql-editor' dangerouslySetInnerHTML={{ __html: value }} />
			</div>
		</>
	);
};

export default QuillText;
