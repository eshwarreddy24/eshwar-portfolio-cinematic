import { config } from '../config';

export default function Contact() {
  return (
    <div className="finalFrame">
      <section className="connect" id="contact">
        <div className="connect-head">
          <p className="connect-eyebrow"><span>06</span> Let's Connect</p>
          <h2 className="connect-h2">Let's create what's <em className="about-serif">next.</em></h2>
          <p className="connect-lede">
            I'm open to opportunities, collaborations, and good conversations.
            If you're building something impactful, I'd like to hear about it.
          </p>
          <div className="connect-cta">
            <a href={`mailto:${config.contact.email}`} className="btn btn-primary btn-md">
              <span className="btn-fill" />
              <span className="btn-labelWrap"><span className="btn-labelStack"><span className="btn-label">Start a Conversation</span><span className="btn-label btn-labelClone" aria-hidden="true">Start a Conversation</span></span></span>
              <span className="btn-arrow">→</span>
            </a>
          </div>
        </div>

        <div className="connect-socials">
          <a href={config.contact.linkedin} className="connect-social" target="_blank" rel="noreferrer">
            <span className="glyph">💼</span>
            <span className="roll"><span>LinkedIn</span><span aria-hidden="true">LinkedIn</span></span>
            <span className="arr">↗</span>
          </a>
          <a href={config.contact.instagram} className="connect-social" target="_blank" rel="noreferrer">
            <span className="glyph">📸</span>
            <span className="roll"><span>Instagram</span><span aria-hidden="true">Instagram</span></span>
            <span className="arr">↗</span>
          </a>
          <a href={`mailto:${config.contact.email}`} className="connect-social">
            <span className="glyph">@</span>
            <span className="roll"><span>Email</span><span aria-hidden="true">Email</span></span>
            <span className="arr">↗</span>
          </a>
        </div>

        <footer className="footer">
          <span>Designed & Developed by <b>Eshwar</b></span>
          <a href="#home">Back to top ↑</a>
          <span>© 2026 Eshwar Reddy Gali</span>
        </footer>
      </section>
    </div>
  );
}
