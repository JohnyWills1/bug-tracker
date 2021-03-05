import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { Stack, Text } from "@chakra-ui/react";
import React from "react";

interface Props {
	currentPriority: any;
	changePriority: (arg0: string) => void;
	showPBox: (arg0: boolean) => void;
}

const PrioritySelect = ({ currentPriority, changePriority, showPBox }: Props) => {
	return (
		<>
			<Stack
				cursor='pointer'
				position='absolute'
				zIndex={101}
				py='10px'
				px='10px'
				backgroundColor='white'
				rounded='md'
				boxShadow='rgb(9 30 66 / 25%) 0px 4px 8px -2px, rgb(9 30 66 / 31%) 0px 0px 1px'
				w='343px'
				h='fit-content'>
				{currentPriority !== "Highest" && (
					<Stack
						onClick={() => {
							changePriority("Highest");
							showPBox(false);
						}}
						_hover={{ background: "rgb(210, 229, 254)" }}
						rounded='md'
						p='8px'
						display='flex'
						align='center'
						isInline>
						<ArrowUpIcon w='20px' h='20px' color='rgb(205, 19, 23)' />
						<Text>Highest</Text>
					</Stack>
				)}
				{currentPriority !== "High" && (
					<Stack
						onClick={() => {
							changePriority("High");
							showPBox(false);
						}}
						_hover={{ background: "rgb(210, 229, 254)" }}
						rounded='md'
						p='8px'
						display='flex'
						align='center'
						isInline>
						<ArrowUpIcon w='20px' h='20px' color='rgb(233, 73, 74)' />
						<Text>High</Text>
					</Stack>
				)}
				{currentPriority !== "Medium" && (
					<Stack
						onClick={() => {
							changePriority("Medium");
							showPBox(false);
						}}
						_hover={{ background: "rgb(210, 229, 254)" }}
						rounded='md'
						p='8px'
						display='flex'
						align='center'
						isInline>
						<ArrowUpIcon w='20px' h='20px' color='rgb(233, 127, 51)' />
						<Text>Medium</Text>
					</Stack>
				)}
				{currentPriority !== "Low" && (
					<Stack
						onClick={() => {
							changePriority("Low");
							showPBox(false);
						}}
						_hover={{ background: "rgb(210, 229, 254)" }}
						rounded='md'
						p='8px'
						display='flex'
						align='center'
						isInline>
						<ArrowDownIcon w='20px' h='20px' color='rgb(45, 135, 56)' />
						<Text>Low</Text>
					</Stack>
				)}
				{currentPriority !== "Lowest" && (
					<Stack
						onClick={() => {
							changePriority("Lowest");
							showPBox(false);
						}}
						_hover={{ background: "rgb(210, 229, 254)" }}
						rounded='md'
						p='8px'
						display='flex'
						align='center'
						isInline>
						<ArrowDownIcon w='20px' h='20px' color='rgb(87, 165, 90)' />
						<Text>Lowest</Text>
					</Stack>
				)}
			</Stack>
		</>
	);
};

export default PrioritySelect;
