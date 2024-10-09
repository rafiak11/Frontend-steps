// import React, {useContext, useEffect, useState} from 'react'
// import PostAuthor from '../components/PostAuthor' 
// import {useParams, Link} from 'react-router-dom'
// import {UserContext} from '../context/userContext'
// import DeletePost from './DeletePost' 
// import Loader from '../components/Loader'
// import axios from 'axios'

// const PostDetail = () => {

//   const {id} = useParams(); 
// const [post, setPost] = useState(null);
// const [error, setError] = useState(null);
// const [isLoading, setIsLoading] = useState(false);

// const {currentUser} = useContext(UserContext);

// useEffect(() => { 
//   const getPost = async () => { 
//     setIsLoading(true); 
//     try { 
//       const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
//       setPost(response.data);
      // console.log("we are here with our debug");
      // console.log(response.data);
      // console.log("http://localhost:5000/uploads/about-img%202e1f66f39-835c-4eff-840c-c602ea0b0004.jpg");
      // console.log(`${process.env.REACT_APP_ASSETS_URL}/uploads/${post.thumbnail}`)

      // var a = process.env.REACT_APP_BASE_URL;
      // var b = "/upload/";
      // var c = response.data.thumbnail;

//       console.log("Debugging URL construction:"); 
//       const baseURL = process.env.REACT_APP_ASSETS_URL.replace(/"/g, '');
//       console.log(`${baseURL}/uploads/${response.data.thumbnail}`);

//         console.log("Fetched post data:", response.data);
//         console.log(`${process.env.REACT_APP_ASSETS_URL}/uploads/${response.data.thumbnail}`);

      

//     } catch (error) { 
//       setError(error);
//     }
//     setIsLoading(false);
//   };
//   getPost();
// }, [id]);

// if (isLoading) { 
//   return <Loader />; 
// }


// const thumbnailUrl = post?.thumbnail 
//     ? `${process.env.REACT_APP_ASSETS_URL.replace(/"/g, '')}/uploads/${encodeURIComponent(post.thumbnail)}`
//     : 'fallback-image.jpg'; 
//   return (
//     <section className="post-detail">
//       {error && <p className='error'> {error.message} </p>}
//       {post ? (
//         <div className='container post-detail__container'>
//           <div className='post-detail__header'> 
//             <PostAuthor authorID={post.creator} createdAt={post.createdAt}/>
//             {currentUser?.id === post?.creator && (
//               <div className='post-detail__buttons'>
//                 <Link to={`/posts/${post?._id}/edit`} className='btn sm primary'> Edit</Link>
//                 <DeletePost postId={id} />
//               </div>
//             )}
//           </div>
//           <h1>{post.title}</h1>
//           <div className='post-detail__thumbnail'> 
//             <img src={thumbnailUrl} alt='' /> 
//           </div>
//           <div dangerouslySetInnerHTML={{ __html: post.description }} />
//         </div>
//       ) : (
//         <Loader />
//       )}
//     </section>
//   ) 
// }
 
// export default PostDetail;







// import React, { useContext, useEffect, useState } from 'react';
// import PostAuthor from '../components/PostAuthor';
// import { useParams, Link } from 'react-router-dom';
// import { UserContext } from '../context/userContext';
// import DeletePost from './DeletePost';
// import Loader from '../components/Loader';
// import axios from 'axios';

// const PostDetail = () => {
//   const { id } = useParams();
//   const [post, setPost] = useState(null);
//   const [creatorID, setCreatorID] = useState(null);
//   const [error, setError] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');

//   const { currentUser } = useContext(UserContext);

//   useEffect(() => {
//     const fetchPostAndComments = async () => {
//       setIsLoading(true);
//       try {
//         const postResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
//         setPost(postResponse.data);
//         setCreatorID(postResponse.data.creator);

//         const commentsResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}/comments`);
//         setComments(commentsResponse.data);
//       } catch (error) {
//         setError(error);
//       }
//       setIsLoading(false);
//     };

//     fetchPostAndComments();
//   }, [id]);

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     console.log('Submitting comment:', newComment);
//     try {
//       await axios.post(`${process.env.REACT_APP_BASE_URL}/posts/${id}/comments`, { text: newComment });
//       setNewComment('');
//       const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}/comments`);
//       setComments(response.data);
//     } catch (error) {
//       console.error('Error submitting comment:', error.response ? error.response.data : error.message);
//     }
//   };

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: post.title,
//         text: post.description,
//         url: window.location.href
//       });
//     } else {
//       alert('Sharing not supported');
//     }
//   };

//   if (isLoading) {
//     return <Loader />;
//   }

//   const thumbnailUrl = post?.thumbnail 
//     ? `${process.env.REACT_APP_ASSETS_URL.replace(/"/g, '')}/uploads/${encodeURIComponent(post.thumbnail)}`
//     : 'fallback-image.jpg'; 

//   return (
//     <section className="post-detail">
//       {/* {error && <p className='error'> {error.message} </p>} */}
      
//       {post && (
//         <div className='container post-detail__container'>
//           <div className='post-detail__header'>
//             <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
//             {currentUser?.id === post?.creator && (
//               <div className='post-detail__buttons'>
//                 <Link to={`/posts/${post?._id}/edit`} className='btn sm primary'>Edit</Link>
//                 <DeletePost postId={id} />
//               </div>
//             )}
//           </div>
//           <h1>{post.title}</h1>
//           <div className='post-detail__thumbnail'>
//             <img src={thumbnailUrl} alt='' />
//           </div>
//           <div dangerouslySetInnerHTML={{ __html: post.description }} />
//           {/* Add Share Button */}
//           <button onClick={handleShare} className="btn sm primary">Share</button>
//           {/* Comments Section */}
//           <div className="comments">
//             <h2>Comments</h2>
//             <form onSubmit={handleCommentSubmit}>
//               <textarea
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//                 placeholder="Add a comment"
//               />
//               <button type="submit">Submit</button>
//             </form>
//             <ul>
//               {comments.map(comment => (
//                 <li key={comment._id}>
//                   <strong>{comment.author?.username || 'Anonymous'}</strong>: {comment.text || 'No text'}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       )}
//     </section>
//   );
// };

// export default PostDetail;

import React, { useContext, useEffect, useState } from 'react';
import PostAuthor from '../components/PostAuthor';
import { useParams, Link } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import DeletePost from './DeletePost';
import Loader from '../components/Loader';
import axios from 'axios';

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [creatorID, setCreatorID] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const fetchPostAndComments = async () => {
      setIsLoading(true);
      try {
        const postResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        setPost(postResponse.data);
        setCreatorID(postResponse.data.creator);

        const commentsResponse = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}/comments`);
        setComments(commentsResponse.data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    fetchPostAndComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting comment:', newComment);
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/posts/${id}/comments`, { text: newComment });
      setNewComment('');
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}/comments`);
      setComments(response.data);
    } catch (error) {
      console.error('Error submitting comment:', error.response ? error.response.data : error.message);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href
      });
    } else {
      alert('Sharing not supported');
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  const thumbnailUrl = post?.thumbnail 
    ? `${process.env.REACT_APP_ASSETS_URL.replace(/"/g, '')}/uploads/${encodeURIComponent(post.thumbnail)}`
    : 'fallback-image.jpg'; 

  return (
    <section className="post-detail">
      {/* {error && <p className='error'> {error.message} </p>} */}
      
      {post && (
        <div className='container post-detail__container'>
          <div className='post-detail__header'>
            <PostAuthor authorID={post.creator} createdAt={post.createdAt} />
            {currentUser?.id === post?.creator && (
              <div className='post-detail__buttons'>
                <Link to={`/posts/${post?._id}/edit`} className='btn sm primary'>Edit</Link>

                <DeletePost postId={id} />
              </div>
            )}

          </div>
          <h1>{post.title}</h1>
          <div className='post-detail__thumbnail'>
            <img src={thumbnailUrl} alt='' />
          </div>
          <div dangerouslySetInnerHTML={{ __html: post.description }} />
          <button onClick={handleShare} className="btn sm primary share">Share</button>

          {/* Comments Section */}
          <div className="comments">
            <h5>Comments</h5>
            <form onSubmit={handleCommentSubmit}>
              <textarea
                className="comment-textarea"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
              />
              <button className="btn sm primary" type="submit">Submit</button>
            </form>
            <ul>
              {comments.map(comment => (
                <li key={comment._id}>
                  <strong>{comment.author?.username || 'Anonymous'}</strong>: {comment.text || 'No text'}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
};

export default PostDetail;




