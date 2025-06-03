import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import './About.css';

// AboutPage component displays information about the Movie Explorer app
const AboutPage = () => {
  return (
    <div className="about-container">
      <main className="about-content">
        {/* Main heading */}
        <h1>About Movie Explorer</h1>
        
        {/* Section: App introduction */}
        <section className="about-section">
          <h2>🎬 Discover Your Next Favorite Film</h2>
          <p>
            Movie Explorer is your personal gateway to the world of cinema. 
            Powered by the OMDB API, our app helps you explore, search, 
            and save movies with ease.
          </p>
        </section>

        {/* Section: App features */}
        <section className="about-section">
          <h2>✨ Features</h2>
          <ul className="features-list">
            <li>Search thousands of movies</li>
            <li>Save favorites to your watchlist</li>
            <li>View detailed movie information</li>
            <li>Clean, intuitive interface</li>
            <li>100% free with no ads</li>
          </ul>
        </section>

        {/* Section: Technologies used */}
        <section className="about-section">
          <h2>🛠 Built With</h2>
          <div className="tech-stack">
            <div className="tech-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
              <span>React</span>
            </div>
            <div className="tech-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />
              <span>JavaScript</span>
            </div>
            <div className="tech-item">
              <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" />
              <span>CSS3</span>
            </div>
          </div>
        </section>

        {/* Section: Data source info */}
        <section className="about-section">
          <h2>📜 Data Source</h2>
          <p>
            All movie data provided by the <a href="https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer">OMDB API</a>.
            This product uses the OMDB API but is not endorsed or certified by OMDB.
          </p>
        </section>

        {/* Call-to-action buttons */}
        <div className="cta-buttons">
          <Link to="/" className="home-button">
            Back to Home
          </Link>
          <Link to="/watchlist" className="watchlist-button">
            View Your Watchlist
          </Link>
        </div>
      </main>

      {/* Footer with developer info and social links */}
      <footer className="about-footer">
        <div className="developer-info">
          <h3>Created by Manish,Moaz,Sai,Suhaib,Shalvi</h3>
          <div className="social-links">
            <a href="https://github.com/ManishKumar01996" target="_blank" rel="noopener noreferrer">
              <FiGithub className="social-icon" />
            </a>
            <a href="https://www.linkedin.com/in/manish-kumar-a13504224/" target="_blank" rel="noopener noreferrer">
              <FiLinkedin className="social-icon" />
            </a>
            <a href="mailto:mk12328@gmail.com">
              <FiMail className="social-icon" />
            </a>
          </div>
        </div>
        {/* Copyright */}
        <p className="copyright">
          &copy; {new Date().getFullYear()} Movie Explorer. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AboutPage;