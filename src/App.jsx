import { useEffect, useState } from 'react'

function App() {
  const [posts, setPosts] = useState([]);
  const [formData, setFormData] = useState({
    postName: "",
    postDescription: "",
    postImage: "",
    postContent: "",
    postCategory: "news",
    postStatus: false,
    tags: [],
  });

  const generateId = () => Date.now();

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox" && name === "tags") {
      setFormData(prevState => {
        const updatedTags = checked ? [...prevState.tags, value] : prevState.tags.filter((curTag) => curTag !== value);

        return {
          ...prevState,
          tags: updatedTags,
        };
      });
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.values(formData).every(value => value !== "" && value !== null)) {
      const newPost = {
        id: generateId(),
        ...formData,
      };
      setPosts([...posts, newPost]);
      setFormData({
        postName: "",
        postDescription: "",
        postImage: "",
        postContent: "",
        postCategory: "news",
        postStatus: false,
        tags: [],
      });
    };
  };

  const handleDelete = (id) => {
    const newPosts = posts.filter((curPost) => curPost.id !== id);
    setPosts(newPosts);
  };

  useEffect(() => {
    if (formData.postStatus) {
      alert("L'articolo é pronto per essere pubblicato")
    }
  }, [formData.postStatus]);

  return (
    <>
      <header className="bg-info text-center mb-3">
        <h1>I miei fantastici Post</h1>
      </header>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="postName" className='me-4'>Titolo:</label>
            <input
              type="text"
              id="postName"
              name="postName"
              value={formData.postName}
              onChange={handleChange} />
          </div>

          <div className='mb-3'>
            <label htmlFor="postDescription" className='me-4'>Descrizione:</label>
            <input
              type="text"
              id="postDescription"
              name="postDescription"
              value={formData.postDescription}
              onChange={handleChange} />
          </div>

          <div className='mb-3'>
            <label htmlFor="postImage" className='me-4'>Immagine (URL):</label>
            <input
              type="text"
              id="postImage"
              name="postImage"
              value={formData.postImage}
              onChange={handleChange} />
          </div>

          <div className='mb-3'>
            <label htmlFor="postContent" className='me-4'>Contenuto:</label>
            <input
              text="text"
              id="postContent"
              name="postContent"
              value={formData.postContent}
              onChange={handleChange} />
          </div>

          <div className='mb-3'>
            <label htmlFor="postCategory" className='me-4'>Categoria:</label>
            <select
              id="postCategory"
              name="postCategory"
              value={formData.postCategory}
              onChange={handleChange}>
              <option value="news">News</option>
              <option value="sports">Sports</option>
              <option value="poems">Poems</option>
            </select>
          </div>

          <div className='mb-3'>
            <label htmlFor="postStatus" className='me-4'>Pubblica:</label>
            <input
              type="checkbox"
              id="postStatus"
              name="postStatus"
              checked={formData.postStatus}
              onChange={handleChange} />
          </div>

          <div className="mb-3">
            <label className='me-4'>Tags:</label>
            <div>
              <label>
                <input
                  type="checkbox"
                  name="tags"
                  value="tech"
                  checked={formData.tags.includes("tech")}
                  onChange={handleChange} /> Tech
              </label>
              <label>
                <input
                  type="checkbox"
                  name="tags"
                  value="education"
                  checked={formData.tags.includes("education")}
                  onChange={handleChange} /> Education
              </label>
              <label>
                <input
                  type="checkbox"
                  name="tags"
                  value="health"
                  checked={formData.tags.includes("health")}
                  onChange={handleChange} /> Health
              </label>
            </div>
          </div>

          <button type='submit' className='btn btn-success'>Aggiungi Post</button>
        </form>
        <div className="row mt-5">
          <div className="col d-flex justify-content-between flex-wrap row-gap-4">

            {posts.length > 0 ?
              posts.filter((curPost) => curPost.postStatus).map((curPost) => (
                <div className='card' key={curPost.id}>
                  <div className='card-body'>
                    <h4 className='card-title'>{curPost.postName}</h4>
                    <p className='card-text'>{curPost.postDescription}</p>
                    {curPost.postImage && <img src={curPost.postImage} alt={curPost.postName} />}
                    <p><strong>Contenuto:</strong> {curPost.postContent}</p>
                    <p><strong>Categoria:</strong> {curPost.postCategory}</p>
                    <p><strong>Pubblicato:</strong></p>
                    <p><strong>Tags:</strong> {curPost.tags.join(", ")}</p>
                    <button onClick={() => handleDelete(curPost.id)}>🗑️</button>
                  </div>
                </div>

              )) : (
                <p className='fs-3'>Non ci sono post</p>
              )
            }

          </div>
        </div>

      </div>
    </>
  );
};

export default App
