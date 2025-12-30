import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AppBar() {
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  
//   const [notifications] = useState([
//     {
//       id: 1,
//       type: "add_money",
//       message: "₹500 added to your account",
//       time: "2 hours ago",
//       read: false
//     },
//     {
//       id: 2,
//       type: "send_money",
//       message: "Money sent to John Doe",
//       time: "5 hours ago",
//       read: false
//     },
//     {
//       id: 3,
//       type: "account_change",
//       message: "Account settings updated",
//       time: "1 day ago",
//       read: true
//     }
//   ]);


const [notifications, setNotifications] = useState([]);

useEffect(() => {
  fetchNotifications();
}, []);

const fetchNotifications = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "http://localhost:8000/api/v1/account/notifications",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const data = await res.json();
    setNotifications(data.notifications || []);
  } catch (err) {
    console.error("Notification fetch error:", err);
  }
};


  const logout = () => {
    localStorage.removeItem("token");
    navigate("/SingIn");
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/api/v1/account/search?q=${encodeURIComponent(query)}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.users || []);
      } else {
        console.error("Search failed:", response.status);
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const markNotificationAsRead = (id) => {
    console.log(`Marked notification ${id} as read`);
  };

  return (
    <div className="fixed top-0 w-full z-50 backdrop-blur-md shadow border-b border-gray-700" style={{backgroundColor: '#384959'}}>
      <div className="flex justify-between items-center px-6 h-16">
        <h1
          onClick={() => navigate("/Dashboard")}
          className="text-2xl font-bold cursor-pointer"
          style={{color: '#88BDF2'}}
        >
          InstaPay
        </h1>

        <div className="flex-1 max-w-md mx-8 relative">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users, transactions..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
              onBlur={() => setTimeout(() => setIsSearchOpen(false), 200)}
              className="w-full px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-blue-400"
              style={{backgroundColor: '#e4e7ebff', color: '#0d0e0eff'}}
            />
            <div className="absolute right-3 top-2.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {isSearchOpen && (searchQuery.length >= 2) && (
            <div className="absolute top-full mt-2 w-full bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              {isSearching ? (
                <div className="px-4 py-3 text-center" style={{color: '#BDDDFC'}}>
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </div>
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <div
                    key={result.id}
                    className="px-4 py-3 hover:bg-gray-700 cursor-pointer border-b border-gray-600 last:border-b-0"
                    style={{color: '#BDDDFC'}}
                    onClick={() => {
                      
                      navigate("/SendMoney", { state: { selectedUser: result } });
                      setIsSearchOpen(false);
                      setSearchQuery("");
                      setSearchResults([]);
                    }}
                  >
                    <div className="font-medium">{result.name}</div>
                    <div className="text-sm text-gray-400">{result.username}</div>
                  </div>
                ))
              ) : searchQuery.length >= 2 && !isSearching ? (
                <div className="px-4 py-3 text-center text-gray-400">
                  No users found
                </div>
              ) : null}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM15 7v5h5l-5 5v-5H9V7h6z" />
              </svg>
              {notifications.filter(n => !n.read).length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {notifications.filter(n => !n.read).length}
                </span>
              )}
            </button>
            {isNotificationsOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50">
                <div className="px-4 py-3 border-b border-gray-600">
                  <h3 className="font-semibold" style={{color: '#88BDF2'}}>Notifications</h3>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification._id}
                      className={`px-4 py-3 border-b border-gray-600 last:border-b-0 hover:bg-gray-700 cursor-pointer ${
                        !notification.read ? 'bg-gray-750' : ''
                      }`}
                      onClick={() => markNotificationAsRead(notification._id)}

                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <p style={{color: '#BDDDFC'}} className="text-sm">{notification.message}</p>
                          <p className="text-xs text-gray-400 mt-1">{new Date(notification.createdAt).toLocaleString()}</p>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full ml-2 mt-1"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-gray-600">
                  <button className="text-sm hover:text-blue-300 transition-colors" style={{color: '#88BDF2'}}>
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate("/Profile")}
            className="w-10 h-10 rounded-full text-white font-bold"
            style={{background: 'linear-gradient(to right, #6A89A7, #88BDF2)'}}
          >
            B
          </button>

          <button
            onClick={logout}
            className="text-sm hover:text-blue-300 transition-colors"
            style={{color: '#BDDDFC'}}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppBar;
