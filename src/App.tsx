import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Journal from './pages/Journal';
import Calendar from './pages/Calendar';
import Habits from './pages/Habits';
import Exercise from './pages/Exercise';

function App() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/journal', label: 'Journal', icon: '📝' },
    { path: '/calendar', label: 'Calendar', icon: '📅' },
    { path: '/habits', label: 'Habits', icon: '🎯' },
    { path: '/exercise', label: 'Exercise', icon: '💪' },
  ];

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* Navigation */}
      <nav className="navbar bg-base-100 shadow-lg sticky top-0 z-50">
        <div className="navbar-start">
          <Link to="/" className="btn btn-ghost text-xl">
            📓 My Journal
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`btn ${
                    location.pathname === item.path
                      ? 'btn-primary'
                      : 'btn-ghost'
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost">
              <span className="text-xl">⚙️</span>
            </label>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Settings</a></li>
              <li><a>Theme</a></li>
              <li><a>Profile</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="btm-nav lg:hidden z-40">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={location.pathname === item.path ? 'active' : ''}
          >
            <span className="text-2xl">{item.icon}</span>
            <span className="btm-nav-label text-xs">{item.label}</span>
          </Link>
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto p-4 pb-20 lg:pb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/habits" element={<Habits />} />
          <Route path="/exercise" element={<Exercise />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="footer footer-center p-4 bg-base-100 text-base-content hidden lg:flex">
        <div>
          <p className="text-xs">
            © 2025{' '}
            <a href="#kk" className="link link-hover">
              kashiCoding
            </a>
            . All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
