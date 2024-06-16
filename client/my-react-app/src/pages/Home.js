import {useEffect, useState} from "react";

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
                        <img id="postImage" src={post.imgPost} alt="Alps" />
                        <p>{post.description}</p>
                    </div>
                ))}
        </div>
    );
}