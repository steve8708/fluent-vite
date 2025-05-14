import React from 'react';
import { CardSquare } from '../components/CardSquare';
import { CardWide } from '../components/CardWide';
import styles from './CardDemo.module.css';

const CardDemo: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1>Card Components Demo</h1>
      
      <section>
        <h2>CardSquare Examples</h2>
        <p>The CardSquare component supports multiple variants and configurations:</p>
        
        <div className={styles.cardGrid}>
          <CardSquare
            imageUrl="/images/security-icon.svg"
            title="Security Check"
            description="Verify your account security status"
            variant="security"
            showTooltip
            tooltipContent="Click to run security check"
          />
          
          <CardSquare
            imageUrl="/images/discovery-icon.svg"
            title="New Features"
            description="Discover what's new"
            variant="discovery"
          />
          
          <CardSquare
            imageUrl="/images/app-icon.svg"
            title="Microsoft Teams"
            variant="app"
            onClick={() => alert('App clicked!')}
          />
          
          <CardSquare
            imageUrl="/images/setup-icon.svg"
            variant="setup"
            imageAlt="Setup wizard"
          />
        </div>

        <div className={styles.codeExample}>
          <h3>Implementation Example:</h3>
          <pre>
            {`import { CardSquare } from '../components/CardSquare';

// Basic usage
<CardSquare
  imageUrl="/path/to/image.png"
  title="Card Title"
  description="Card description"
  variant="security"
/>

// With tooltip and click handler
<CardSquare
  imageUrl="/path/to/image.png"
  title="Interactive Card"
  showTooltip
  tooltipContent="Click me!"
  onClick={() => handleClick()}
  variant="discovery"
/>`}
          </pre>
        </div>
      </section>

      <section>
        <h2>CardWide Examples</h2>
        <p>The CardWide component offers different layouts and configurations:</p>
        
        <div className={styles.wideCardContainer}>
          <CardWide
            titleText="Set up multi-factor authentication"
            bodyText="Enhance your account security by setting up MFA using a passkey or authenticator app."
            imageUrl="/images/security-wide.svg"
            showBarIcon
            showButton
            buttonText="Set up MFA"
            imagePosition="right"
          />

          <CardWide
            titleText="Discover New Features"
            bodyText="Check out the latest updates and improvements to your favorite tools."
            imageUrl="/images/features-wide.svg"
            showBarIcon={false}
            showButton
            buttonText="Learn More"
            imagePosition="left"
            variant="info"
          />
        </div>

        <div className={styles.codeExample}>
          <h3>Implementation Example:</h3>
          <pre>
            {`import { CardWide } from '../components/CardWide';

// Basic usage with right image
<CardWide
  titleText="Card Title"
  bodyText="Card description"
  imageUrl="/path/to/image.png"
  imagePosition="right"
/>

// Full configuration
<CardWide
  showBarIcon
  showButton
  buttonText="Click Me"
  titleText="Interactive Card"
  bodyText="Card with all features enabled"
  imageUrl="/path/to/image.png"
  imagePosition="left"
  variant="warning"
/>`}
          </pre>
        </div>
      </section>
    </div>
  );
};

export default CardDemo; 