
import { formatDistanceToNow } from 'date-fns';

const CommentList = ({ comments, currentUser, onDeleteComment }) => {
  return (
    <div className="space-y-4">
      {comments.length > 0 ? (
        comments.map(comment => (
          <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <div className="avatar">
                  <div className="w-8 h-8 rounded-full">
                    <img 
                      src={comment.author.avatarUrl || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} 
                      alt={comment.author.username} 
                    />
                  </div>
                </div>
                <div>
                  <div className="font-medium text-sm">{comment.author.username}</div>
                  <div className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                  </div>
                </div>
              </div>
              
              {currentUser && currentUser.id === comment.author.id && (
                <button 
                  onClick={() => onDeleteComment(comment.id)} 
                  className="btn btn-ghost btn-xs"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
            
            <div className="mt-2 text-gray-700">
              {comment.content}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-6 text-gray-500">
          No comments yet. Be the first to comment!
        </div>
      )}
    </div>
  );
};

export default CommentList;
