
import { useState } from 'react';

const CommentForm = ({ onAddComment }) => {
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!comment.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API delay
    setTimeout(() => {
      onAddComment(comment);
      setComment('');
      setIsSubmitting(false);
    }, 300);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="form-control">
        <textarea
          className="textarea textarea-bordered h-24 w-full"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
      </div>
      <div className="flex justify-end mt-2">
        <button 
          type="submit" 
          className="btn btn-primary btn-sm"
          disabled={isSubmitting || !comment.trim()}
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-spinner loading-xs"></span>
              Posting...
            </>
          ) : (
            'Post Comment'
          )}
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
