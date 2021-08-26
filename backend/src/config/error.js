module.exports.fireError = ({status, message}) => {
    let error = new Error(message);
    error.statusCode = status;
    throw error;
}