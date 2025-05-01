
import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { AuthContext } from '../context/AuthContext';
import CommentList from '../components/CommentList';
import CommentForm from '../components/CommentForm';

const PostDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLikeAnimating, setIsLikeAnimating] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the post
    const fetchPost = () => {
      const savedPosts = localStorage.getItem('postify_posts');
      if (savedPosts) {
        const posts = JSON.parse(savedPosts);
        const foundPost = posts.find(p => p.id === parseInt(postId));
        
        if (foundPost) {
          setPost(foundPost);
        } else {
          // Post not found
          navigate('/');
        }
      }
      setLoading(false);
    };

    fetchPost();
  }, [postId, navigate]);

  const handleLike = () => {
    if (!currentUser) return;
    
    setIsLikeAnimating(true);
    
    // Update post likes
    const isLiked = post.likes.includes(currentUser.id);
    const updatedPost = {
      ...post,
      likes: isLiked
        ? post.likes.filter(id => id !== currentUser.id)
        : [...post.likes, currentUser.id]
    };
    
    setPost(updatedPost);
    
    // Update posts in localStorage
    const savedPosts = localStorage.getItem('postify_posts');
    if (savedPosts) {
      const posts = JSON.parse(savedPosts);
      const updatedPosts = posts.map(p => 
        p.id === parseInt(postId) ? updatedPost : p
      );
      localStorage.setItem('postify_posts', JSON.stringify(updatedPosts));
    }
    
    setTimeout(() => {
      setIsLikeAnimating(false);
    }, 300);
  };

  const handleAddComment = (commentText) => {
    if (!currentUser || !commentText.trim()) return;
    
    const newComment = {
      id: Date.now(),
      content: commentText,
      createdAt: new Date().toISOString(),
      author: {
        id: currentUser.id,
        username: currentUser.username,
        avatarUrl: currentUser.avatarUrl
      }
    };
    
    const updatedPost = {
      ...post,
      comments: [newComment, ...post.comments]
    };
    
    setPost(updatedPost);
    
    // Update posts in localStorage
    const savedPosts = localStorage.getItem('postify_posts');
    if (savedPosts) {
      const posts = JSON.parse(savedPosts);
      const updatedPosts = posts.map(p => 
        p.id === parseInt(postId) ? updatedPost : p
      );
      localStorage.setItem('postify_posts', JSON.stringify(updatedPosts));
    }
  };

  const handleDeleteComment = (commentId) => {
    const updatedPost = {
      ...post,
      comments: post.comments.filter(comment => comment.id !== commentId)
    };
    
    setPost(updatedPost);
    
    // Update posts in localStorage
    const savedPosts = localStorage.getItem('postify_posts');
    if (savedPosts) {
      const posts = JSON.parse(savedPosts);
      const updatedPosts = posts.map(p => 
        p.id === parseInt(postId) ? updatedPost : p
      );
      localStorage.setItem('postify_posts', JSON.stringify(updatedPosts));
    }
  };

  const handleDeletePost = () => {
    if (!currentUser || post.author.id !== currentUser.id) return;
    
    // Delete post from localStorage
    const savedPosts = localStorage.getItem('postify_posts');
    if (savedPosts) {
      const posts = JSON.parse(savedPosts);
      const updatedPosts = posts.filter(p => p.id !== parseInt(postId));
      localStorage.setItem('postify_posts', JSON.stringify(updatedPosts));
    }
    
    navigate('/');
  };

  const isLiked = post && currentUser && post.likes.includes(currentUser.id);
  const isAuthor = post && currentUser && post.author.id === currentUser.id;

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : post ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            {/* Back button */}
            <Link to="/" className="flex items-center text-sm text-gray-500 mb-4 hover:text-gray-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to posts
            </Link>

            {/* Post header */}
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
              
              {isAuthor && (
                <div className="dropdown dropdown-end">
                  <button tabIndex={0} className="btn btn-sm btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                  </button>
                  <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-40">
                    <li><Link to={`/edit-post/${post.id}`}>Edit</Link></li>
                    <li><a onClick={handleDeletePost} className="text-red-500">Delete</a></li>
                  </ul>
                </div>
              )}
            </div>

            <div className="flex items-center mt-4 space-x-2">
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img 
                    src={post.author.avatarUrl || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} 
                    alt={post.author.username} 
                  />
                </div>
              </div>
              <div>
                <div className="font-medium">{post.author.username}</div>
                <div className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </div>
              </div>
            </div>
            
            {/* Post image */}
            {post.imageUrl && (
              <div className="mt-6">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="w-full rounded-lg shadow-sm object-cover max-h-96" 
                />
              </div>
            )}
            
            {/* Post content */}
            <div className="mt-6 text-gray-700 whitespace-pre-line">
              {post.content}
            </div>
            
            {/* Post actions */}
            <div className="flex items-center space-x-4 mt-6 pt-6 border-t border-gray-100">
              <button 
                onClick={handleLike}
                disabled={!currentUser}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full ${currentUser ? 'hover:bg-gray-100' : 'opacity-70 cursor-not-allowed'} transition-colors`}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-6 w-6 ${isLiked ? 'text-red-500 fill-red-500' : 'text-gray-500'} ${isLikeAnimating ? 'animate-heart-beat' : ''}`}
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
                <span>{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</span>
              </button>
              
              <div className="flex items-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{post.comments.length} {post.comments.length === 1 ? 'Comment' : 'Comments'}</span>
              </div>
            </div>
          </div>
          
          {/* Comments section */}
          <div className="px-6 pb-6">
            <h3 className="text-xl font-semibold mb-4">Comments</h3>
            
            {currentUser ? (
              <CommentForm onAddComment={handleAddComment} />
            ) : (
              <div className="bg-gray-50 p-4 rounded-lg text-center mb-6">
                <p>Please <Link to="/login" className="text-primary font-medium">login</Link> to add a comment</p>
              </div>
            )}
            
            <CommentList 
              comments={post.comments} 
              currentUser={currentUser}
              onDeleteComment={handleDeleteComment}
            />
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <h3 className="text-2xl font-bold">Post not found</h3>
          <Link to="/" className="btn btn-primary mt-4">Go to Home</Link>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
