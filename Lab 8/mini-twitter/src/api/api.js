const MOCK_SERVER_URL = "http://localhost:3001"; // Replace with your actual mock server URL

export const getAllPosts = async () => {
  // TODO:
  const response = await fetch(`${MOCK_SERVER_URL}/posts`);
  // 2. Handle non-ok responses (e.g., if (!response.ok) throw new Error(...)).
  if (!response.ok) {
    throw new Error(`Error fetching posts: ${response.status} ${response.statusText}`);
  }
  // 3. Parse and return the JSON data.
  const data = await response.json();
  // 4. Wrap in a try...catch block to handle errors.
  console.log("Students will implement getAllPosts here.");
  // Return an empty array for now to prevent UI crashes.
  return data;
};

export const getPostDetails = async (postId) => {
  // TODO:
  // 1. Fetch a single post from `${MOCK_SERVER_URL}/posts/${postId}`.
  // 2. Fetch comments for that post from `${MOCK_SERVER_URL}/posts/${postId}/comments`.
  // 3. Handle errors for *both* fetches.
  // 4. Return an object containing both: { post: postData, comments: commentsData }
  const postResponse = await fetch(`${MOCK_SERVER_URL}/posts/${postId}`);
  if (!postResponse.ok) {
    throw new Error(`Error fetching post details: ${postResponse.status} ${postResponse.statusText}`);
  }
  const postData = await postResponse.json();
  console.log(`Students will implement getPostDetails for post ${postId} here.`);
  // Return mock data for now.
  return { post: postData, comments: postData.comments || [] }; // Assuming comments are part of the post data for now.
};

export const createNewPost = async (newPostData) => {
  const response = await fetch(`${MOCK_SERVER_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newPostData)
  });
  if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  const result = await response.json();
  // `newPostData` will be an object like { name: '...', content: '...' }
  // TODO:
  // 1. Send a `POST` request to `${MOCK_SERVER_URL}/posts`.
  // 2. The request `method` should be `'POST'`.
  // 3. The `headers` should include `'Content-Type': 'application/json'`.
  // 4. The `body` should be `JSON.stringify(newPostData)`.
  // 5. Handle errors.
  console.log("Students will implement createNewPost here.", newPostData);
  return result;
};

export const createNewComment = async (postId, newCommentData) => {
  // `newCommentData` will be an object like { comment: '...' }
  const response = await fetch(`${MOCK_SERVER_URL}/posts/${postId}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newCommentData)
  });
  // TODO:
  // 1. Send a `POST` request to `${MOCK_SERVER_URL}/posts/${postId}/comments`.
  // 2. Include the correct `method`, `headers`, and `body` (JSON-stringified).
  // 3. Handle errors.
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }
  const result = await response.json();
  console.log(`Students will implement createNewComment for post ${postId} here.`, newCommentData);
  return result;
};
