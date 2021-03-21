import { AddIcon } from "@chakra-ui/icons";
import { Flex, Tag, Avatar, TagLabel, TagCloseButton, Link, Text, Box, Stack } from "@chakra-ui/react";
import React, { useEffect } from "react";

interface Props {
	users: string[];
	assignees: string[];
	removeAssignee: (aName: string, id: any) => void;
	addAssignee: (aName: string, id: any) => void;
	id?: any;
}

const Assignees = ({ assignees, users, removeAssignee, addAssignee, id }: Props) => {
	// State
	const [showABox, setABox] = React.useState(false);
	const [filteredUsers, setFUsers] = React.useState(users);
	const [aCapacity, setACapacity] = React.useState(false);

	const node = React.useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (showABox) {
			document.addEventListener("mousedown", handleClickOutside);
		} else {
			document.removeEventListener("mousedown", handleClickOutside);
		}
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [showABox]);

	const handleClickOutside = (e: any) => {
		if (node.current && node.current.contains(e.target)) {
			// inside click
			return;
		}

		// outside click
		setABox(false);
	};

	useEffect(() => {
		if (assignees) {
			const fUsers = users.filter((name: any) => {
				return assignees.includes(name) === false;
			});
			setFUsers(fUsers);
			if (fUsers.length === 0) {
				setACapacity(true);
			}
		} else {
			const fUsers = users;
			setFUsers(fUsers);
		}
	}, [users, assignees]);

	return (
		<Box w='fit-content' ref={node}>
			{assignees.length !== 0 ? (
				<Flex flexWrap='wrap' align='center'>
					{assignees.map((name: string) => {
						return (
							<Tag
								key={name}
								w='fit-content'
								size='lg'
								colorScheme='gray'
								borderRadius='md'
								m='0 10px 5px 0'
								p='8px 10px'>
								<Avatar name={name} size='xs' ml={-1} mr={2} />
								<TagLabel>{name}</TagLabel>
								<TagCloseButton
									onClick={() => {
										removeAssignee(name, id);
									}}
								/>
							</Tag>
						);
					})}

					{assignees.length !== users.length && (
						<Link color='blue.500' onClick={() => setABox(true)}>
							<AddIcon w='14px' h='14px' mr='5px' />
							Add more
						</Link>
					)}
				</Flex>
			) : (
				<>
					<Text
						opacity={0.6}
						_hover={{ background: "#EDF2F7", cursor: "pointer" }}
						rounded='md'
						w='fit-content'
						p='8px'
						onClick={() => setABox(true)}>
						Unassigned
					</Text>
				</>
			)}

			{showABox && !aCapacity && (
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
										addAssignee(name, id);
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

export default Assignees;
