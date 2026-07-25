import axios from "axios";

const baseURL = "http://localhost:3001/persons";

const getAll = () => {
	const req = axios.get(baseURL);
	return req.then((response) => response.data);
};

const create = (newItem) => {
	const req = axios.post(baseURL, newItem);
	return req.then((response) => response.data);
};

const deletePerson = (id) => {
	const req = axios.delete(`${baseURL}/${id}`);
	return req.then((response) => response.data);
};

export default { getAll, create, deletePerson };
