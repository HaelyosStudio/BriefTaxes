import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

const token = localStorage.getItem("token");

export default function Navbar() {
    return (
        <div className="mainHeaderContainer">
            <img className="headerBackgroundImage" src="../images/background.png" alt="Background image" />
            <div className="navBarMainContainer">
                <div className="navBarLeftBox">
                <span className="profilePicture">
                </span>
                if (token) {
                    
                }
                <span className="statusText">Disconnected</span>
                </div>
                <div className="navBarRightBox outerShadow">
                    <Link href="/" className="navOptions">
                        <FontAwesomeIcon className="icons" icon="fa-solid fa-house-chimney" />
                        <span className="navOptionsText">Home</span>
                    </Link>
                    <Link href="/" className="navOptions">
                        <FontAwesomeIcon className="icons" icon="fa-solid fa-money-bills" />
                        <span className="navOptionsText">Payment</span>
                    </Link>
                    <Link href="/" className="navOptions">

                        <FontAwesomeIcon className="icons" icon="fa-solid fa-id-card" />
                        <span className="navOptionsText">Profile</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}