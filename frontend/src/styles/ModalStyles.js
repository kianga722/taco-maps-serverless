import styled from 'styled-components';

const ModalStyles = styled.div`
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;

    background: rgb(0,0,0,0.5);
    z-index: 99999;

    #modal {
        width: 100%;
        max-width: 300px;
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        padding: 10px 25px 25px;
        
        background: white;
        border-radius: 4px;
        font-size: 14px;

        .modal-close {
            position: absolute;
            top: 8px;
            right: 8px;
            cursor: pointer;

            color: #6f5d5d;
            font-size: 16px;
            font-weight: 700;
            z-index: 1;
        }

        .bg-image {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;

            opacity: .07;
        }

        .modal-content {
            position: relative;

            .name {
                margin: 10px 0;

                text-align: center;
                font-size: 16px;
                font-weight: 700;
            }

            .top-info-wrapper {
                display: grid;
                grid-template-columns: 1fr 1fr;
                grid-column-gap: 10px;
                grid-row-gap: 5px;

                line-height: 1.1;
                z-index: 1;
            }

            .top-info-left,
            .top-info-right {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
            }

            .review-count {
                margin-top: 5px;
            }

            .top-info-right {
                .tel-wrapper {
                    margin-top: 4px;
                    white-space: nowrap;

                    .tel-title {
                        font-weight: 700;
                    }
                }
            }

            .external-links {
                grid-column-start: 1;
                grid-column-end: 3;
                display: flex;
                justify-content: center;

                a {
                    display: flex;
                    justify-content: center;
                    align-items: center;        
                }

                .link-yelp {
                    img {
                        height: 30px;
                    }
                }

                .link-menu {
                    color: #0a3e91;
                    text-decoration: none;
                }

                &.show-menu {
                    display: grid;
                    grid-template-columns: 1fr 1fr;

                    .link-menu {
                        display: flex;
                    }
                }
            }

            .bottom-info-wrapper {
                .hours-wrapper {
                    .hours-title {
                        margin: 5px 0;

                        font-weight: 700;
                    }
                    .hours-grid {
                        display: grid;
                        grid-template-columns: 50px auto;
                        justify-content: center;
                    }
                    .highlight {
                        color: #e1261c;
                    }
                }
            }

            .address-wrapper {
                margin: 20px 0 15px;

                text-align: center;
                font-weight: 700;
            }

            .get-directions {
                position: relative;
                width: 100%;
                padding: 10px;

                border: 1px solid#0a3e91;
                border-radius: 4px;
                background:#0a3e91;
                color: white;
                cursor: pointer;
            }
        }
    }
`;

export default ModalStyles;