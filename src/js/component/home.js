import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

//include images into your bundle

//create your first component
export function TodoList() {
	const [list, setList] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const handleKeyPress = e => {
		if (e.key === "Enter" && inputValue !== "") {
			setList(
				list.concat({
					label: inputValue,
					done: false
				})
			);
			setInputValue("");
			addedWords();
		}
	};
	const deleteListItem = label => {
		let ourNewList = list.filter(item => item.label != label);
		setList(ourNewList);
	};
	const [phrase, setPhrase] = useState([]);
	const addedWords = e => {
		let words = ["your getting close", "your aiming", "you are pushing"];
		let moreWords = ["to your goals", "to knowing god", "to getting wiser"];

		let wordsIndex = Math.floor(Math.random() * words.length);
		let moreWordsIndex = Math.floor(Math.random() * moreWords.length);

		setPhrase(words[wordsIndex] + " " + moreWords[moreWordsIndex]);
	};

	const gettodos = () => {
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/hermanjackson",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json"
				}
			}
		)
			.then(resp => {
				if (!resp.ok) {
					throw Error(resp.statusText);
				}
				return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
			})
			.then(data => {
				setList(data);
				//here is were your code should start after the fetch finishes
				console.log(data); //this will print on the console the exact object received from the server
			})
			.catch(error => {
				//error handling
				console.log(error);
			});
	};
	useEffect(() => {
		gettodos();
	}, []);

	return (
		<div className="container">
			<h1 className="firstHead">to do list</h1>
			<br />
			<div className="headerWrap">
				<h1 className="words">Everytime you complete A To do list</h1>
				<br></br>

				<h1 key={phrase} className="inspireWords">
					{phrase}
				</h1>
			</div>

			<div className="wrap">
				<label>What are your todos?</label>
				<input
					className="inputName"
					type="text"
					onChange={e => setInputValue(e.target.value)}
					onKeyPress={e => handleKeyPress(e)}
					value={inputValue}></input>

				<ul>
					{list.map((item, index) => (
						<li key={index}>
							{item.label}
							<FontAwesomeIcon
								className="trash"
								icon={faTrash}
								onClick={() => deleteListItem(item.label)}
							/>
						</li>
					))}
				</ul>
			</div>
			<span role="button" tabIndex="0" onClick={() => setList([])}>
				clear list
			</span>
		</div>
	);
}
