
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import PostCard from '../components/PostCard';
import mockPosts from '../data/mockPosts';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    // Simulating API call with setTimeout
    setTimeout(() => {
      // Get posts from localStorage or use mockPosts
      const savedPosts = localStorage.getItem('postify_posts');
      if (savedPosts) {
        setPosts(JSON.parse(savedPosts));
      } else {
        setPosts(mockPosts);
        localStorage.setItem('postify_posts', JSON.stringify(mockPosts));
      }
      setLoading(false);
    }, 500);
  }, []);

  const handleLike = (postId) => {
    if (!currentUser) return;
    
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const isLiked = post.likes.includes(currentUser.id);
        return {
          ...post,
          likes: isLiked
            ? post.likes.filter(id => id !== currentUser.id)
            : [...post.likes, currentUser.id]
        };
      }
      return post;
    });
    
    setPosts(updatedPosts);
    localStorage.setItem('postify_posts', JSON.stringify(updatedPosts));
  };

  return (
    <div>
      {currentUser && (
        <div className="flex justify-end mb-4">
          <Link to="/create-post" className="btn btn-primary">Create Post</Link>
        </div>
      )}
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <PostCard 
              key={post.id} 
              post={post} 
              currentUser={currentUser} 
              onLike={handleLike}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <h3 className="text-2xl font-bold">No posts yet</h3>
          <p className="mt-2 text-gray-600">Be the first to create a post!</p>
        </div>
      )}
    </div>
  );
};

export default Home;
