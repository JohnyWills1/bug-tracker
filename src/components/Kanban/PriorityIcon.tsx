import React from "react";
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";
import { Text } from "@chakra-ui/react";

interface Props {
	priority: string;
}

const PriorityIcon = ({ priority }: Props) => {
	const renderPriority = (value: any) => {
		switch (value) {
			case "Highest":
				return (
					<>
						<ArrowUpIcon w='20px' h='20px' color='rgb(205, 19, 23)' />
					</>
				);

			case "High":
				return (
					<>
						<ArrowUpIcon w='20px' h='20px' color='rgb(233, 73, 74)' />
					</>
				);
			case "Medium":
				return (
					<>
						<ArrowUpIcon w='20px' h='20px' color='rgb(233, 127, 51)' />
					</>
				);
			case "Low":
				return (
					<>
						<ArrowDownIcon w='20px' h='20px' color='rgb(45, 135, 56)' />
					</>
				);
			case "Lowest":
				return (
					<>
						<ArrowDownIcon w='20px' h='20px' color='rgb(87, 165, 90)' />
					</>
				);
		}
	};

	return <>{renderPriority(priority)}</>;
};

export default PriorityIcon;
