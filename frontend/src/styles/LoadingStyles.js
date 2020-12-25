import styled from 'styled-components';

const LoadingStyles = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    position: fixed;
    
    background: rgb(0,0,0,0.5);
    z-index: 99999;

    .loading {
        position: relative;
        animation: heartbeat 1.5s infinite;
        
        picture {
            display: block;

            img {
                width: 270px;
            }
        }

        .loading-message {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);

            color: #67222c;
            font-size: 20px;
            text-align: center;
        }
    }
    
    @keyframes heartbeat {
        0% {
            transform: scale( .9 );
        }
        50% {
            transform: scale( 1 );
        }
        100% {
            transform: scale( .9 );
        }
    }
`;

export default LoadingStyles;