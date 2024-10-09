// import React , {useEffect, useState} from 'react' 
// import { Link } from 'react-router-dom'
// import Avatar from '../images/avatar1.png'
// import axios from 'axios'
// import ReactTimeAgo from 'react-time-ago'
// import TimeAgo from 'javascript-time-ago'

// import en from 'javascript-time-ago/locale/en.json'
// import ru from 'javascript-time-ago/locale/ru.json'

// TimeAgo.addDefaultLocale(en)
// TimeAgo.addLocale(ru)


// const PostAuthor = ({authorID, createdAt}) => { 
//   const [author, setAuthor]=useState({})

//   useEffect(() =>{ 
//     const getAuthor=  async () =>{ 
//       try{ 
//         const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${authorID}`)
//         setAuthor(response?.data); 
//       } catch(err){ 
//         console.log(err)
//       }
//     }
//     getAuthor();
//   }, [authorID])  

//   // Validate the createdAt date
//   const validCreatedAt = new Date(createdAt);
//   const isValidDate = !isNaN(validCreatedAt.getTime());

//   return (
//    <Link to={`/posts/users/${authorID}`} className='post__author'> 
//    <div className='post__author-avatar'> 
//     <img src={`${process.env.REACT_APP_ASSETS_URL}/uploads/${author?.avatar}`} alt='' /> 
//    </div>  
//    <div className="post__author-details">
//     <h5> By: {author?.name} </h5>
//     <small> {isValidDate ? <ReactTimeAgo date={validCreatedAt} locale='en-US' /> : 'Invalid date'} </small>
//    </div>
//     </Link>
//   )
// }

// export default PostAuthor 

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../images/avatar1.png';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';

import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostAuthor = ({ authorID, createdAt }) => { 
  const [author, setAuthor] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => { 
    if (!authorID) {
      console.error('Author ID is undefined');
      return;
    }

    const getAuthor = async () => { 
      try { 
        console.log(`Fetching author with ID: ${authorID}`);
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${authorID}`);
        setAuthor(response?.data); 
      } catch (err) { 
        setError(err);
        console.error('Error fetching author:', err);
      }
    };

    getAuthor();
  }, [authorID]);  

  // Validate the createdAt date
  const validCreatedAt = new Date(createdAt);
  const isValidDate = !isNaN(validCreatedAt.getTime());

  return (
    <Link to={`/posts/users/${authorID}`} className='post__author'>
      <div className='post__author-avatar'>
        <img 
          src={author?.avatar ? `${process.env.REACT_APP_ASSETS_URL}/uploads/${author.avatar}` : Avatar}
          alt={author?.name || 'Author Avatar'} 
        />
      </div>
      <div className="post__author-details">
        <h5> By: {author?.name || 'Unknown Author'} </h5>
        <small> {isValidDate ? <ReactTimeAgo date={validCreatedAt} locale='en-US' /> : 'Invalid date'} </small>
      </div>
      {error && <div className="error">Error: {error.message}</div>}
    </Link>
  );
};

export default PostAuthor;
