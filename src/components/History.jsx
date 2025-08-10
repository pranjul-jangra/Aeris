import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useThemeStyle from "../hooks/useThemeStyle";
import { Trash2, XCircle, LogOut } from "lucide-react";

export default function History({ theme }) {
    const { bgColor, darkCardBg, border } = useThemeStyle();
    const serverURL = import.meta.env.VITE_SERVER_URL;
    const navigate = useNavigate();

    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isFetchingMore, setIsFetchingMore] = useState(false);

    const observer = useRef();

    // Login state
    const isAuthorized = localStorage.getItem("isAuthorized");
    const isLoggedIn = (isAuthorized === true || isAuthorized === "true");

    const fetchHistory = async (pageNum = 1) => {
        try {
            const res = await axios.get(`${serverURL}/api/history/get?page=${pageNum}`, { withCredentials: true });
            const newData = res?.data?.history || [];

            if (newData.length < 25) setHasMore(false);
            setHistory(prev => pageNum === 1 ? newData : [...prev, ...newData]);

        } catch (err) {
            setHasMore(false);
        } finally {
            setLoading(false);
            setIsFetchingMore(false);
        }
    };

    useEffect(() => {
        if (isLoggedIn) fetchHistory(page);
    }, [isLoggedIn, page]);

    // Intersection Observer for infinite scroll
    const lastHistoryRef = useCallback(node => {
        if (isFetchingMore) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setIsFetchingMore(true);
                setPage(prev => prev + 1);
            }
        });

        if (node) observer.current.observe(node);
    }, [hasMore, isFetchingMore]);

    // Remove single history
    const handleRemove = async (id) => {
        try {
            await axios.delete(`${serverURL}/api/history/${id}`, { withCredentials: true });
            setHistory(prev => prev.filter(item => item._id !== id));
        } catch (err) {
            return;
        }
    };

    // Clear all history
    const handleClearAll = async () => {
        try {
            await axios.delete(`${serverURL}/api/history/`, { withCredentials: true });
            setHistory([]);
            setHasMore(false);
        } catch (err) {
            return;
        }
    };

    // Logout
    const handleLogout = async () => {
        try {
            await axios.post(`${serverURL}/api/auth/logout`, {}, { withCredentials: true });
            localStorage.removeItem("isAuthorized");
            navigate("/");
        } catch (err) {
            return;
        }
    };

    return (
        <main className={`${bgColor} w-screen min-h-dvh flex justify-center items-start px-6 pb-6`}>
            {isLoggedIn ? (
                <div className={`w-full`}>
                    <div className="flex flex-col justify-between items-start">
                        <h1 className={`weather-heading ${theme === 'dark' && 'weather-heading-dark'}`}>Your Activity History</h1>
                        <div className="flex gap-2 -translate-y-2.5">
                            <button onClick={handleClearAll} title="Clear all history" className="p-2 rounded-full text-sm text-red-500 flex gap-2 items-center hover:bg-gray-500/10">
                                <XCircle size={18} /> Clear History
                            </button>
                            <button onClick={handleLogout} title="Logout" className="p-2 rounded-full text-sm flex gap-2 items-center hover:bg-gray-500/10">
                                <LogOut size={18} /> Logout
                            </button>
                        </div>
                    </div>

                    {loading
                        ?
                        <div className="flex justify-center items-center py-10 flex-col gap-3">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400" />
                            <p>Making your data ready...</p>
                        </div>
                        :
                        history.length === 0
                            ?
                            <div className="text-center text-gray-400">No history yet.</div>
                            :
                            <div className={`rounded-xl ${darkCardBg} border ${border} divide-y divide-gray-600/20`}>
                                {history.map((item, idx) => {
                                    const isLast = idx === history.length - 1;
                                    return (
                                        <div key={item._id} ref={isLast ? lastHistoryRef : null} className="flex items-center gap-4 p-4 hover:bg-gray-500/10 transition">
                                            <div className="flex-1">
                                                <p className="text-sm">{item.location}</p>
                                                <span className="text-xs">{new Date(item.searchedAt).toLocaleString()}</span>
                                            </div>
                                            <button onClick={() => handleRemove(item._id)} title="Remove" className="p-1 rounded-full hover:bg-red-500/10">
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    );
                                })}
                                {isFetchingMore && (
                                    <div className="p-4 text-center text-sm text-gray-400">Loading more...</div>
                                )}
                            </div>
                    }
                </div>
            ) : (
                <div className="px-6">
                    <h1 className={`weather-heading ${theme === 'dark' && 'weather-heading-dark'}`}>Welcome to our community</h1>
                    <p className="mb-2 -translate-y-3">Please login or sign up to track your search history.</p>
                    <div className="space-x-9 *:px-6 *:py-2.5 *:rounded-lg *:bg-cyan-800 *:text-white *:border-0">
                        <Link to={'/login'}>Login</Link>
                        <Link to={'/signup'}>Signup</Link>
                    </div>
                </div>
            )}
        </main>
    );
}
