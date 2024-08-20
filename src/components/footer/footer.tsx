import styles from './footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      Made by{' '}
      <a
        className={styles.link}
        href="https://github.com/martinval11"
        target="_blank"
        rel="noopener noreferrer"
      >
        martinval11
      </a>
    </footer>
  );
}
