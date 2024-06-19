import {useEffect, useState} from "react";
import Comments from "../components/Comments";
import Likes from "../components/Likes";

export default function Home({ client }) {
    const [posts, setPosts] = useState([])

    let fetchPosts = async () => {
        try {
            const response = await fetch('http://localhost:2999/posts/');
            const data = await response.json();
            console.log(data);
            setPosts(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPosts();
    },[]);


    return (
        <div>
            <h1>Home</h1>
                {posts.map((post) => (
                    <div key={post.id}>
                        <span id="userSection">
                        <img id="profileImagePost" src={post.avatar} alt="Avatar" />
                        <h3>{post.username}</h3>
                        </span>
                        <img id="postImage" src={post.imgPost} alt={post.namePost} />
                        <p>{post.description}</p>
                        <Comments postId={post.id} />
                        <Likes postId={post.id} />
                    </div>
                ))}
        </div>
    );
}