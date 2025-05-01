
const mockPosts = [
  {
    id: 1,
    title: "Getting Started with React",
    content: "React is a popular JavaScript library for building user interfaces, particularly single-page applications where you need a fast, interactive user experience.\n\nOne of the best things about React is how it handles state and props, making it easier to manage data flow in your application. If you're just getting started, I recommend focusing on understanding components, JSX, and how state works.",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
    author: {
      id: 99,
      username: "reactmaster",
      avatarUrl: "https://i.pravatar.cc/150?img=68" //photos to test
    },
    likes: [2, 3],
    comments: [
      {
        id: 101,
        content: "This was really helpful, thanks for sharing!",
        createdAt: new Date(Date.now() - 43200000).toISOString(), // 12 hours ago
        author: {
          id: 2,
          username: "codingenthusiast",
          avatarUrl: "https://i.pravatar.cc/150?img=5"
        }
      },
      {
        id: 102,
        content: "I'm still struggling with state management. Any tips?",
        createdAt: new Date(Date.now() - 21600000).toISOString(), // 6 hours ago
        author: {
          id: 3,
          username: "newdeveloper",
          avatarUrl: "https://i.pravatar.cc/150?img=12"
        }
      }
    ]
  },
  {
    id: 2,
    title: "Modern CSS Techniques You Should Know",
    content: "CSS has come a long way in recent years. With features like CSS Grid, Flexbox, and Custom Properties (variables), we can create complex layouts more easily than ever before.\n\nIn this post, I want to share some modern CSS techniques that every web developer should know in 2023.",
    imageUrl: "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070",
    createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
    author: {
      id: 2,
      username: "codingenthusiast",
      avatarUrl: "https://i.pravatar.cc/150?img=5"
    },
    likes: [3],
    comments: [
      {
        id: 103,
        content: "I've been using CSS Grid a lot lately. It's a game changer!",
        createdAt: new Date(Date.now() - 36000000).toISOString(), // 10 hours ago
        author: {
          id: 99,
          username: "reactmaster",
          avatarUrl: "https://i.pravatar.cc/150?img=68"
        }
      }
    ]
  },
  {
    id: 3,
    title: "The Future of Web Development",
    content: "As we look toward the future of web development, several trends are emerging that will shape how we build applications.\n\nAI-assisted development, WebAssembly, and edge computing are just a few technologies that are changing the landscape. In this post, I'll explore what these mean for the average web developer.",
    imageUrl: "https://images.unsplash.com/photo-1624953587687-daf255b6b80a?q=80&w=1974",
    createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
    author: {
      id: 3,
      username: "newdeveloper",
      avatarUrl: "https://i.pravatar.cc/150?img=12"
    },
    likes: [99],
    comments: []
  }
];

export default mockPosts;
