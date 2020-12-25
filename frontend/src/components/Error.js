import ErrorStyles from '../styles/ErrorStyles';

const Error = () => {
    return (
        <ErrorStyles>
            <span className="error-title">
                Error:&nbsp;
            </span>
            <span className='error-message'>
                Need to accept geolocation to use this app
            </span>
        </ErrorStyles>
    )
}

export default Error;