import React, { useEffect } from "react";
import { Tag, Avatar, TagLabel, Text, Box, Stack } from "@chakra-ui/react";

interface Props {
	reporter: string;
	users: [string];
	changeIssueReporter: (arg0: string) => void;
}

const Reporter = ({ reporter, users, changeIssueReporter }: Props) => {
	// State
	const [showRepSelect, setRepSelect] = React.useState(false);

	// Refs
	const node = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (showRepSelect) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showRepSelect]);

	const handleClickOutside = (e: any) => {
		if (node.current && node.current.contains(e.target)) {
			// inside click
			return;
		}

		// outside click
		setRepSelect(false);
	};

	const filteredUsers = users.filter((name: any) => {
		return name !== reporter;
	});

	const setNewRep = (newRep: string) => {
		changeIssueReporter(newRep);
	};

	return (
		<Box w='fit-content' ref={node}>
			{reporter ? (
				<Tag
					onClick={() => setRepSelect(true)}
					colorScheme='gray'
					_hover={{ cursor: "pointer", background: "#DFE1E5" }}
					size='lg'
					borderRadius='md'
					m='0 10px 5px 0'
					p='8px 10px'>
					<Avatar name={reporter} size='xs' ml={-1} mr={2} />
					<TagLabel>{reporter}</TagLabel>
				</Tag>
			) : (
				<Text
					opacity={0.6}
					_hover={{ background: "#EDF2F7" }}
					rounded='md'
					w='fit-content'
					p='8px'
					onClick={() => setRepSelect(true)}>
					Unassigned
				</Text>
			)}

			{showRepSelect && (
				<Box
					cursor='pointer'
					position='absolute'
					zIndex={101}
					py='10px'
					backgroundColor='white'
					rounded='md'
					boxShadow='rgb(9 30 66 / 25%) 0px 4px 8px -2px, rgb(9 30 66 / 31%) 0px 0px 1px'
					w='343px'
					h='fit-content'>
					<Stack px='10px'>
						{filteredUsers.map((name: any) => {
							return (
								<Tag
									key={name}
									w='100%'
									size='lg'
									colorScheme='white'
									borderRadius='md'
									p='8px 10px'
									onClick={() => {
										setNewRep(name);
										setRepSelect(false);
									}}
									_hover={{ background: "rgb(210, 229, 254)" }}>
									<Avatar name={name} size='xs' ml={-1} mr={2} />
									<TagLabel>{name}</TagLabel>
								</Tag>
							);
						})}
					</Stack>
				</Box>
			)}
		</Box>
	);
};

export default Reporter;
