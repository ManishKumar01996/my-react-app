import './Profile.css';

// Simple Profile page for Movie Explorer
const Profile = () => {
  // You can replace these details with dynamic user data if available
  const user = {
    name: "Manish Kumar",
    email: "mk12328@gmail.com",
    avatar: "https://ui-avatars.com/api/?name=Manish+Kumar&background=222&color=fff",
    bio: "Movie enthusiast. Loves exploring new films and sharing favorites with friends.",
    joined: "June 2025"
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={user.avatar} alt="User Avatar" className="profile-avatar" />
        <h2 className="profile-name">{user.name}</h2>
        <p className="profile-email">{user.email}</p>
        <p className="profile-bio">{user.bio}</p>
        <div className="profile-meta">
          <span>Joined: {user.joined}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;