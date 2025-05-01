
import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const EditPost = () => {
  const { postId } = useParams();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    imageUrl: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
          // Check if user is author
          if (currentUser && foundPost.author.id === currentUser.id) {
            setFormData({
              title: foundPost.title,
              content: foundPost.content,
              imageUrl: foundPost.imageUrl
            });
            
            if (foundPost.imageUrl) {
              setImagePreview(foundPost.imageUrl);
            }
          } else {
            // Not the author, redirect
            navigate('/');
          }
        } else {
          // Post not found
          navigate('/');
        }
      }
      setLoading(false);
    };

    // Redirect if not logged in
    if (!currentUser) {
      navigate('/login');
    } else {
      fetchPost();
    }
  }, [postId, currentUser, navigate]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;
    
    if (!file.type.match('image.*')) {
      setError('Please select an image file');
      return;
    }
    
    // Create image preview
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      setFormData({ ...formData, imageUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    if (!formData.title.trim()) {
      setError('Please enter a title');
      return;
    }
    
    if (!formData.content.trim()) {
      setError('Please enter some content');
      return;
    }
    
    setIsSubmitting(true);
    
    // Update post
    setTimeout(() => {
      const savedPosts = localStorage.getItem('postify_posts');
      if (savedPosts) {
        const posts = JSON.parse(savedPosts);
        const updatedPosts = posts.map(post => {
          if (post.id === parseInt(postId)) {
            return {
              ...post,
              title: formData.title,
              content: formData.content,
              imageUrl: formData.imageUrl
            };
          }
          return post;
        });
        
        localStorage.setItem('postify_posts', JSON.stringify(updatedPosts));
        navigate(`/posts/${postId}`);
      }
    }, 500);
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Post</h1>
        <Link to={`/posts/${postId}`} className="btn btn-outline btn-sm">Cancel</Link>
      </div>
      
      {error && (
        <div className="alert alert-error mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        {/* Title */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-medium">Title</span>
          </label>
          <input
            type="text"
            name="title"
            placeholder="Enter post title"
            className="input input-bordered w-full"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        
        {/* Content */}
        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-medium">Content</span>
          </label>
          <textarea
            name="content"
            placeholder="Write your post..."
            className="textarea textarea-bordered h-40"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        
        {/* Image Upload */}
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text font-medium">Image (Optional)</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input file-input-bordered w-full"
          />
        </div>
        
        {/* Image Preview */}
        {imagePreview && (
          <div className="mb-6">
            <p className="text-sm text-gray-500 mb-2">Image Preview</p>
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full max-h-60 object-cover rounded-md"
              />
              <button
                type="button"
                className="absolute top-2 right-2 btn btn-sm btn-circle btn-error"
                onClick={() => {
                  setImagePreview(null);
                  setFormData({ ...formData, imageUrl: null });
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}
        
        {/* Submit Button */}
        <div className="flex justify-end">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Updating Post...
              </>
            ) : (
              'Update Post'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
