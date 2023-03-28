import APIService from './APIService';
import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import toilet from '../toilet1.png';
import wifi from '../wifi1.png';
import socket from '../socket1.png';
import call from '../calls.png';
import map from '../map.png';
import { Img, TextImage, TextData, ImgFilter, TextDataTitle, TextName, MapUrl } from './Styles';

function ArticleList(props) {
  const editArticle = (article) => {
    props.editArticle(article);
  };

  const deleteArticle = (article) => {
    APIService.DeleteArticle(article.id).then(() => props.deleteArticle(article));
  };

  return (
    <div>
      {props.articles &&
        props.articles.map((article) => {
          return (
            <Container>
              <Row>
                <Col>
                  <div key={article.id}>
                    <Row>
                      <Col>
                        <div className="image">
                          <Img>
                            <img src={article.img_url} alt="" width="420" height="280" />
                          </Img>
                        </div>
                      </Col>

                      <Col>
                        <TextDataTitle>{article.name}</TextDataTitle>
                        <TextData>
                          <TextName>
                            <MapUrl>
                              <a href={article.map_url}>
                                <img src={map} alt="map" width="20" height="20" />
                              </a>
                            </MapUrl>
                            Location:
                          </TextName>{' '}
                          {article.location}
                        </TextData>
                        <TextData>
                          <TextName>Seats:</TextName> {article.seats}
                        </TextData>
                        <TextData>
                          <TextName>Price:</TextName> {article.coffee_price}
                        </TextData>
                        <Row>
                          <Col>
                            <ImgFilter>
                              <img src={toilet} alt="img-toilet" width="25" height="25" />
                              <TextImage>{article.has_toilet.toString()}</TextImage>
                            </ImgFilter>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <ImgFilter>
                              <img src={call} alt="img-call" width="25" height="25" />
                              <TextImage>{article.can_take_calls.toString()}</TextImage>
                            </ImgFilter>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <ImgFilter>
                              <img src={wifi} alt="img-wifi" width="25" height="25" />
                              <TextImage>{article.has_wifi.toString()}</TextImage>
                            </ImgFilter>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <ImgFilter>
                              <img src={socket} alt="img-socket" width="25" height="25" />
                              <TextImage>{article.has_sockets.toString()}</TextImage>
                            </ImgFilter>
                          </Col>
                        </Row>
                      </Col>

                      <Row>
                        <div className="container">
                          <div className="row">
                            <div className="col-md-12 text-center">
                              <button type="button" className="btn btn-primary" onClick={() => editArticle(article)}>
                                Update
                              </button>
                              <button
                                type="button"
                                className="btn btn-danger ml-2"
                                onClick={() => deleteArticle(article)}
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      </Row>
                    </Row>
                  </div>
                </Col>
              </Row>
              <hr />
            </Container>
          );
        })}
    </div>
  );
}

export default ArticleList;
