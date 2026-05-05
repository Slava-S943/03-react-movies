import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Movie } from '../../types/movie';
import styles from './MovieModal.module.css';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

export default function MovieModal({ movie, onClose }: MovieModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = () => {
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) return null;

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal} onClick={handleModalClick}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          &times;
        </button>

        <img
          className={styles.image}
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
        />

        <div className={styles.content}>
          <h2>{movie.title}</h2>

          <p>{movie.overview}</p>

          <p>
            <strong>Release Date:</strong> {movie.release_date}
          </p>

          <p>
            <strong>Rating:</strong> {movie.vote_average}/10
          </p>
        </div>
      </div>
    </div>,
    modalRoot,
  );
}
