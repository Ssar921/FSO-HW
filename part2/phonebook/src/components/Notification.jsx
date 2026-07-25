const Notification = ({ message, messageType }) => {
	const classType = `notification ${messageType}`;
	if (message === null) {
		return null;
	}

	return <div className={classType}>{message}</div>;
};

export default Notification;
