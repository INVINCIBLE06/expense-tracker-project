
const NavBar = ({ user, handleLogout }) => {
  return (
    <header className="header">
      <h1>Expense Tracker</h1>
      <nav className="auth-buttons">
        {!user ? (
          <>
          </>
        ) : (
          <div className="user-info">
            <span>Welcome, {user.name}</span>
            <button className="auth-btn" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
