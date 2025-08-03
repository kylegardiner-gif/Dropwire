
import React, { useState } from 'react';

export default function App() {
  const [nickname, setNickname] = useState("");
  const [lockedName, setLockedName] = useState(null);
  const [email, setEmail] = useState("");
  const [anonymous, setAnonymous] = useState(true);
  const [news, setNews] = useState([]);
  const [newPost, setNewPost] = useState("");
  const [dropcoins, setDropcoins] = useState(0);

  const handlePost = () => {
    if (newPost.trim() === "") return;
    const post = {
      id: Date.now(),
      content: newPost,
      user: anonymous ? "Anonymous" : lockedName || nickname || "Unnamed",
      timestamp: new Date().toLocaleString(),
    };
    setNews([post, ...news]);
    setNewPost("");
    setDropcoins(dropcoins + 1);
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Dropwire Demo</h1>

      {!lockedName ? (
        <div>
          <input
            placeholder="Choose your nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          <button onClick={() => setLockedName(nickname)}>Lock Nickname</button>
        </div>
      ) : (
        <p>Welcome, <strong>{lockedName}</strong>!</p>
      )}

      <div>
        <label>
          <input
            type="checkbox"
            checked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
          />
          Post Anonymously
        </label>
        <br />
        <label>
          Optional Email:
          <input
            placeholder="Enter your email (optional)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </div>

      <textarea
        placeholder="Post factual, timestamped updates here..."
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
      />
      <button onClick={handlePost}>Post Update (+1 Dropcoin)</button>

      <div>
        <h2>Latest Drops</h2>
        {news.map((item) => (
          <div key={item.id} style={{ border: '1px solid #ccc', padding: '10px', marginTop: '10px' }}>
            <small>{item.timestamp}</small>
            <p>{item.content}</p>
            <small>by {item.user}</small>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #000' }}>
        <h3>Dropcoin Wallet</h3>
        <p>You have <strong>{dropcoins}</strong> Dropcoins</p>
      </div>
    </div>
  );
}
