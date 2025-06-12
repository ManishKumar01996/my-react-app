import './Profile.css';

// Array of user profiles
const users = [
  {
    name: "Manish Kumar",
    email: "mk12328@gmail.com",
    avatar: "https://ui-avatars.com/api/?name=Manish+Kumar&background=222&color=fff",
    bio: "Movie enthusiast. Loves exploring new films and sharing favorites with friends.",
    joined: "June 2025"
  },
  {
    name: "Moaz",
    email: "moaz@example.com",
    avatar: "https://ui-avatars.com/api/?name=Moaz&background=222&color=fff",
    bio: "Cinephile and tech lover. Always searching for hidden gems.",
    joined: "May 2025"
  },
  {
    name: "Sai",
    email: "sai@example.com",
    avatar: "https://ui-avatars.com/api/?name=Sai&background=222&color=fff",
    bio: "Enjoys sci-fi and thrillers. Recommends movies to friends.",
    joined: "April 2025"
  },
  {
    name: "Suhaib",
    email: "suhaib@example.com",
    avatar: "https://ui-avatars.com/api/?name=Suhaib&background=222&color=fff",
    bio: "Documentary buff and popcorn lover.",
    joined: "March 2025"
  },
  {
    name: "Shalvi",
    email: "shalvi@example.com",
    avatar: "https://ui-avatars.com/api/?name=Shalvi&background=222&color=fff",
    bio: "Rom-com fan. Loves movie nights with friends.",
    joined: "February 2025"
  }
];

// Profile page displays all user cards
const Profile = () => {
  return (
    <div className="profile-container" style={{ flexWrap: "wrap", gap: "2rem" }}>
      {users.map((user, idx) => (
        <div className="profile-card" key={idx}>
          <img src={user.avatar} alt="User Avatar" className="profile-avatar" />
          <h2 className="profile-name">{user.name}</h2>
          <p className="profile-email">{user.email}</p>
          <p className="profile-bio">{user.bio}</p>
          <div className="profile-meta">
            <span>Joined: {user.joined}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profile;