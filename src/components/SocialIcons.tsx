import { FaGithub, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import "./styles/SocialIcons.css";
import { config } from "../config";

const SocialIcons = () => {
  return (
    <div className="icons-section">
      <div className="social-icons">
        <a href={config.contact.github} target="_blank" rel="noopener noreferrer"><FaGithub /></a>
        <a href={config.contact.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
        <a href={config.contact.instagram} target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
      </div>
    </div>
  );
};

export default SocialIcons;
