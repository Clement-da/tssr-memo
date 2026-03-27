import React, { useState } from 'react';

const criteria = [
  { id: 'site_content', label: 'Le contenu général du site' },
  { id: 'clarity', label: 'La clarté des explications' },
  { id: 'quiz', label: 'La qualité des Quiz' },
  { id: 'flashcards', label: 'La qualité des Flashcards' },
  { id: 'exercises', label: 'La qualité des Exercices' },
  { id: 'navigation', label: "La navigation et l'ergonomie du site" }
];

const FeedbackForm = () => {
  const [ratings, setRatings] = useState({
    site_content: 0,
    clarity: 0,
    quiz: 0,
    flashcards: 0,
    exercises: 0,
    navigation: 0
  });
  const [hoveredRatings, setHoveredRatings] = useState({
    site_content: 0,
    clarity: 0,
    quiz: 0,
    flashcards: 0,
    exercises: 0,
    navigation: 0
  });
  const [comment, setComment] = useState('');
  const [status, setStatus] = useState(null); // 'sending', 'success', 'error'

  const handleRating = (criterionId, value) => {
    setRatings(prev => ({ ...prev, [criterionId]: value }));
  };

  const handleHover = (criterionId, value) => {
    setHoveredRatings(prev => ({ ...prev, [criterionId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const allRated = Object.values(ratings).every(v => v > 0);
    if (!allRated) {
      alert("Veuillez donner une note pour chaque critère, merci !");
      return;
    }

    setStatus('sending');

    // On prépare un objet propre pour Formspree
    const formData = {
      ...ratings,
      comment,
      _subject: "Nouvel avis TSSR Memo",
      message: `Critères:
- Contenu: ${ratings.site_content}/5
- Clarté: ${ratings.clarity}/5
- Quiz: ${ratings.quiz}/5
- Flashcards: ${ratings.flashcards}/5
- Exercices: ${ratings.exercises}/5
- Navigation: ${ratings.navigation}/5

Commentaire:
${comment || "Aucun commentaire supplémentaire."}`
    };

    try {
      // Envoyer vers l'URL Formspree (Endpoint pour clement.dealmeida@ikmail.com)
      const response = await fetch("https://formspree.io/f/xykbyvlj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        setRatings({ site_content: 0, clarity: 0, quiz: 0, flashcards: 0, exercises: 0, navigation: 0 });
        setComment('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error sending feedback:", error);
      setStatus('error');
    }
  };

  const renderStars = (criterionId) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = (hoveredRatings[criterionId] || ratings[criterionId]) >= star;
          return (
            <button
              key={star}
              type="button"
              className={`star-btn ${isFilled ? 'filled' : ''}`}
              onClick={() => handleRating(criterionId, star)}
              onMouseEnter={() => handleHover(criterionId, star)}
              onMouseLeave={() => handleHover(criterionId, 0)}
              aria-label={`Note de ${star} sur 5`}
            >
              <svg 
                viewBox="0 0 24 24" 
                width="28" 
                height="28" 
                fill={isFilled ? "var(--accent-primary)" : "none"} 
                stroke={isFilled ? "var(--accent-primary)" : "var(--text-secondary)"}
                strokeWidth="2"
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </button>
          )
        })}
      </div>
    );
  };

  if (status === 'success') {
    return (
      <div className="feedback-success-card">
        <div className="success-icon-feedback">✨</div>
        <h3>Merci pour votre retour !</h3>
        <p>Votre avis a été envoyé avec succès à Clément. Cela nous aide énormément à améliorer le site.</p>
        <button className="btn btn-primary" onClick={() => setStatus(null)}>Envoyer un autre avis</button>
      </div>
    );
  }

  return (
    <div className="feedback-box">
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="ratings-grid">
          {criteria.map((item) => (
            <div key={item.id} className="rating-item">
              <label className="rating-label">{item.label}</label>
              {renderStars(item.id)}
            </div>
          ))}
        </div>

        <div className="form-group-feedback">
          <label htmlFor="comment" className="form-label-feedback">Commentaire (optionnel)</label>
          <textarea
            id="comment"
            className="form-textarea-feedback"
            placeholder="Une suggestion, une erreur à signaler, une idée ? Écris-la ici..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows="4"
          />
        </div>

        <div className="form-actions-feedback">
          <button 
            type="submit" 
            className={`btn btn-primary btn-submit-feedback ${status === 'sending' ? 'loading' : ''}`}
            disabled={status === 'sending'}
          >
            {status === 'sending' ? 'Envoi en cours...' : 'Envoyer mon avis'}
          </button>
          
          {status === 'error' && (
            <p className="error-msg-feedback">Désolé, une erreur est survenue. Veuillez réessayer ou contacter clement.dealmeida@ikmail.com directement.</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
