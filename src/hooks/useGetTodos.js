import { useState, useEffect } from "react";

export const useGetTodos = (refresh, sortFlag) => {
	const [todos, setTodos] = useState([]);

	const getTodos = async (type) => {
		if (type === "get") {
			try {
				const response = await fetch("http://localhost:3000/todos");
				const data = await response.json();
				setTodos(data);
			} catch (e) {
				console.error(e);
			}
		}
		if (type === "sort") {
			try {
				const response = await fetch("http://localhost:3000/todos");
				const data = await response.json();
				data.sort((a, b) => {
					return a.title
						.toLowerCase()
						.localeCompare(b.title.toLowerCase());
				});
				setTodos(data);
			} catch (e) {
				console.error(e);
			}
		}
	};

	useEffect(() => {
		if (sortFlag) {
			getTodos("sort");
		} else {
			getTodos("get");
		}
	}, [refresh, sortFlag]);

	return {
		todos,
	};
};
