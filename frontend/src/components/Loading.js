import loading from '../img/loading.png';

import LoadingStyles from '../styles/LoadingStyles';

const Loading = () => {
    return (
        <LoadingStyles>
            <div className='loading'>
                <picture>
                    <img src={loading} alt='taco loading' />
                </picture>
                <div className='loading-message'>
                    Searching...
                </div>
            </div>
        </LoadingStyles>
    )
}

export default Loading;