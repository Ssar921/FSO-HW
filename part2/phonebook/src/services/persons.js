import axios from "axios";

const baseURL = "/api/persons";

const getAll = () => {
	const req = axios.get(baseURL);
	return req.then((response) => response.data);
};

const create = (newItem) => {
	const req = axios.post(baseURL, newItem);
	return req.then((response) => response.data);
};

const update = (id, newItem) => {
	const req = axios.put(`${baseURL}/${id}`, newItem);
	return req.then((response) => response.data);
};

const deletePerson = (id) => {
	const req = axios.delete(`${baseURL}/${id}`);
	return req.then((response) => response.data);
};

export default { getAll, create, update, deletePerson };
