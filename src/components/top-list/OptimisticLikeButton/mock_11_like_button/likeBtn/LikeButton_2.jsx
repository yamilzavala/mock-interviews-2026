import { useState } from 'react';

export default function LikeButton_2() {
  // Determines if the button is in the default/liked state.
  const [liked, setLiked] = useState(false);
  // Whether there's a pending background API request.
  const [isPending, setIsPending] = useState(false);
  // Error message to be shown if the API request failed.
  const [errorMessage, setErrorMessage] = useState(null);

  async function likeUnlikeAction() {
    try {
      setIsPending(true);
      setErrorMessage(null);

      const response = await fetch(
        'https://questions.greatfrontend.com/api/questions/like-button',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: liked ? 'unlike' : 'like',
          }),
        },
      );

      if (!response.ok) {
        const res = await response.json();
        setErrorMessage(res.message);
        return;
      }

      setLiked(!liked);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="button-container">
      <button
        disabled={isPending}
        onClick={() => {
          likeUnlikeAction();
        }}>
        {isPending 
            ? 'Loading...' 
            : liked ? '💙 Unlike' : '🤍 Like'
        }
      </button>
      {errorMessage && (
        <div className="error-message">{errorMessage}</div>
      )}
    </div>
  );
}
