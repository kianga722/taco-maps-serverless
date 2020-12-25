import styled from 'styled-components';

const MapMarkerStyles = styled.div`
    .popup-info-wrapper {
        display: grid;
        grid-template-columns: 40% 1fr;
        grid-column-gap: 10px;
        grid-row-gap: 5px;

        .bg-image {
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }

        .top-info-wrapper {
            border-bottom: 3px solid #e1261c;

            *:not(:first-child) {
                margin-top: 2px;
            }

            img {
                display: block;
            }
        }

        .name {
            font-size: 14px;
            font-weight: 700;
        }

        .external-links {
            display: flex;
            flex-direction: column;
            align-items: center;

            text-align: center;

            .loading-menu {
                .lds-dual-ring {
                    display: flex;
                    justify-content: center;
                    align-items: center;

                    &:after {
                        content: " ";
                        display: block;
                        width: 12px;
                        height: 12px;
                        border-radius: 50%;
                        border: 2px solid #e1261c;
                        border-color:#e1261c transparent #e1261c transparent;
                        animation: lds-dual-ring 1.2s linear infinite;
                    }
                }
            }

            a {
                display: block;

                text-decoration: none;

                img {
                    height: 30px;
                }

                &.link-menu {
                    color: #0a3e91;
                }
            }
        }

        .bottom-info-wrapper {
            display: flex;
            flex-direction: column;

            .tel-wrapper {
                margin-top: 4px;
                .tel-title {
                    font-weight: 700;
                }
            }

            .hours-wrapper .hours-title {
                font-weight: 700;
            }
        }
    }

    .address-wrapper {
        margin: 10px 0;

        text-align: center;
        cursor: copy;
    }

    button {
        display: flex;
        margin: 0 auto;
        padding: 5px 10px;

        border: 1px solid #e1261c;
        border-radius: 4px;
        background: #e1261c;
        color: white;
        cursor: pointer;
    }

    @keyframes lds-dual-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

export default MapMarkerStyles;