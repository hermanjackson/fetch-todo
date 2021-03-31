import React, { useState } from "react";

//include images into your bundle

//create your first component
export function TodoList() {
	const [list, setlist] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const handleKeyPress = e => {
		if (e.key === "Enter" && inputValue !== "") {
			setlist(
				list.concat({
					label: inputValue,
					done: false
				})
			);
			setInputValue("");
		}
	};
	return (
		<div className="container">
			<h1>to do list</h1>
			<input
				type="text"
				onChange={e => setInputValue(e.target.value)}
				onKeyPress={e => handleKeyPress(e)}
				value={inputValue}></input>
			<ul>
				{list.map((item, index) => (
					<li key={index}>{item.label}</li>
				))}
			</ul>
		</div>
	);
}
