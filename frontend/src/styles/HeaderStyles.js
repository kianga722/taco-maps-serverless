import styled from 'styled-components';

const HeaderStyles = styled.header`
    position: relative;
    padding: 1rem 0;

    .title {
        letter-spacing: -3px;
        font-size: 36px;
        font-weight: 700;
        text-align: center;
        text-transform: uppercase;

        span:nth-of-type(2) {
            margin-right: 8px;
        }
    }

    .dropdown-wrapper {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);

        z-index: 9999;

        button.dropdown-trigger {
            padding: 3px 8px;
            margin-left: 10px;
            
            background-color: white;
            border: 2px solid rgba(0,0,0,0.2);
            border-radius: 4px;
            font-size: 16px;
            font-weight: 700;
            cursor: pointer; 
        }

        .dropdown-menu {
            position: absolute;
            left: 24px;

            li {
                button {
                    padding: 5px 10px;

                    white-space: nowrap;
                    background: white;
                    border: 2px solid rgba(0,0,0,0.2);
                    border-radius: 4px;
                    font-weight: 400;
                    cursor: pointer;
                }
            }
        }
    }
`;

export default HeaderStyles;