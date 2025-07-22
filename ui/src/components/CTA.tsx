
export function CTA() {
  return (
    <div className="cta-section">
      <div className="cta-content">
        <h3>Help Improve StatFoundry</h3>
        <div className="cta-actions">
          <div className="feedback-section">
            <p>Share your feedback to help us build better NFL analytics tools.</p>
            <a 
              href="https://docs.google.com/forms/d/e/1FAIpQLSdJG9CUdSBF4ELM1MnGYZeldDxcQu0_OFAnjgx7AkTl9Jclkw/viewform?usp=header" 
              className="feedback-link"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Share Feedback
            </a>
          </div>
          
          <div className="cta-divider"></div>
          
          <div className="donation-section">
            <p>Support StatFoundry</p>
            <div className="donate-buttons">
              <a 
                href="https://venmo.com/u/Ben-Medcalf" 
                className="donate-button venmo"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Venmo
              </a>
              <a 
                href="https://paypal.me/benmedcalf" 
                className="donate-button paypal"
                target="_blank" 
                rel="noopener noreferrer"
              >
                PayPal
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
