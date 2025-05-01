
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

const PostCard = ({ post, currentUser, onLike }) => {
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  
  const isLiked = currentUser && post.likes.includes(currentUser.id);
  
  const handleLikeClick = () => {
    if (!currentUser) return;
    
    setIsLikeAnimating(true);
    onLike(post.id);
    
    setTimeout(() => {
      setIsLikeAnimating(false);
    }, 300);
  };

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-lg transition-shadow">
      {post.imageUrl && (
        <figure className="h-48 overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </figure>
      )}
      
      <div className="card-body">
        <Link to={`/posts/${post.id}`}>
          <h2 className="card-title text-lg font-bold hover:text-primary transition-colors">{post.title}</h2>
        </Link>
        
        <p className="text-sm text-gray-600 mt-1 mb-3">
          {post.content.length > 120 
            ? `${post.content.substring(0, 120)}...` 
            : post.content
          }
        </p>
        
        <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
          <div className="flex items-center space-x-2">
            <div className="avatar">
              <div className="w-8 h-8 rounded-full">
                <img src={post.author.avatarUrl || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} alt={post.author.username} />
              </div>
            </div>
            <span className="text-sm font-medium">{post.author.username}</span>
          </div>
          
          <div className="text-xs text-gray-500">
            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center space-x-1">
            <button 
              onClick={handleLikeClick} 
              className={`flex items-center space-x-1 ${currentUser ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'}`}
              disabled={!currentUser}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-5 w-5 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-500'} ${isLikeAnimating ? 'animate-heart-beat' : ''}`} 
                viewBox="0 0 20 20" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path 
                  fillRule="evenodd" 
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" 
                  clipRule="evenodd" 
                />
              </svg>
              <span className="text-sm">{post.likes.length}</span>
            </button>
          </div>
          
          <Link to={`/posts/${post.id}`} className="flex items-center space-x-1 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
              <path d="M15 3h6v6"></path>
              <path d="M10 14L21 3"></path>
            </svg>
            <span className="text-sm">{post.comments.length} comments</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
