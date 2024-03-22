import './App.css';
import {useEffect, useState} from "react";
// @ts-ignore
import ImageList from "./components/ImageList.tsx";

const apiUrl = process.env["REACT_APP_API_URL"];
const username = process.env["REACT_APP_USERNAME"];
const apiKey = process.env["REACT_APP_API_KEY"];
const userAgent = process.env["REACT_APP_USER_AGENT"];

const postsEndpoint = process.env["REACT_APP_POSTS"];
const favsEndpoint = process.env["REACT_APP_FAVS"];

function App() {

  useEffect(() => {
    console.log("hewwo");
  })

  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState([]);

  // api functions
  const auth = async () => {
    try {
      const data = await fetch(apiUrl + "posts.json", {
        headers: { "Authorization": "Basic " + btoa(`${username}:${apiKey}`) }
      })
      console.log(data);
    }
    catch(err) {
      console.error("API request failed:", err);
    }
  }
  const getEndpoint = async (endpoint: string) => {
    try {
      const data = await fetch(apiUrl + endpoint, {
        headers: { "User-Agent": userAgent}
      })
      console.log(data);
      console.log(apiUrl);
      const postObj = await data.json();
      setPosts(postObj.posts);
    }
    catch(err) {
      console.error("API request failed:", err);
    }
  }

  const getPosts = () => getEndpoint(postsEndpoint);
  const getFavs = () => getEndpoint(favsEndpoint); // favsEndpoint);

  const getFavTags = async () => {
    try {
      const data = await fetch(apiUrl + "favorites.json", {
        headers: { "User-Agent": userAgent }
      })
      console.log(data);
      console.log(apiUrl);
      const postObj = await data.json();
      setPosts(postObj.posts);
    }
    catch(err) {
      console.error("API request failed:", err);
    }
  }
  const readPosts = () => {
    console.log(posts);
    console.log(typeof posts);
    console.log(...posts);

    console.log([apiUrl, username, apiKey, userAgent]);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          posts:
        </p>
        <ImageList images={posts} />
        <button onClick={auth}>auth</button>
        <button onClick={getPosts}>fetch posts</button>
        <button onClick={getFavs}>fetch favs</button>
        <button onClick={readPosts}>read posts</button>
      </header>
    </div>
  );
}

export default App;
