import {Link} from 'react-router-dom';
import {useAuth} from "./AuthContext";
export default function Navbar() {
    const { user } = useAuth();

    return (
        <nav className="bg-gray-800 py-4">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-12">
                    <div className="flex">
                        <Link to="/home" className="text-white hover:text-gray-300 mr-4">
                            Home
                        </Link>
                        {user && (
                            <Link to={`/clients/${user.id}`} className="text-white hover:text-gray-300 mr-4">
                                Profile
                            </Link>
                        )}
                        <Link to="/uploads" className="text-white hover:text-gray-300">
                            Uploads
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}