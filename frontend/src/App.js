import './App.css';
import { useState, useEffect, Fragment } from 'react';
import ArticleList from './components/ArticleList';
import From from './components/Form';
import Collapsible from './components/Navbar';
import ScrollButton from './components/ScrollButton';

function App() {
  const [articles, setAricles] = useState();
  const [editedArticle, setEditedAricle] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/all', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => resp.json())
      .then((resp) => setAricles(resp))
      .catch((error) => console.error(error));
  }, []);

  const editArticle = (article) => {
    setEditedAricle(article);
  };

  const updateData = (article) => {
    const new_article = articles.map((my_article) => {
      if (my_article.id === article.id) {
        return article;
      } else {
        return my_article;
      }
    });
    setAricles(new_article);
  };

  const openForm = () => {
    const new_article = {
      name: '',
      map_url: '',
      img_url: '',
      location: '',
      seats: '',
      has_toilet: '',
      has_wifi: '',
      has_sockets: '',
      can_take_calls: '',
      coffee_price: '',
    };
    setEditedAricle(new_article);
  };

  const insertedArticle = (article) => {
    const new_article = [...articles, article];
    setAricles(new_article);
  };

  const deleteArticle = (article) => {
    const new_article = articles.filter((my_article) => {
      if (my_article.id === article.id) {
        return false;
      }
      return true;
    });
    setAricles(new_article);
  };

  return (
    <div>
      <Fragment>
        <ScrollButton />
      </Fragment>
      <Collapsible openForm={openForm} />
      <div className="App">
        <div className="row">
          <div className="col"></div>
        </div>
        <ArticleList articles={articles} editArticle={editArticle} deleteArticle={deleteArticle} />
        {editedArticle ? (
          <From article={editedArticle} updateData={updateData} insertedArticle={insertedArticle} />
        ) : null}
      </div>
    </div>
  );
}

export default App;
