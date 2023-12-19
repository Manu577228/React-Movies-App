import { useEffect, useState } from "react";
import MovieBox from "./components/MovieBox";
import axios from "axios";
import "./App.css";
import {
  Button,
  Container,
  Form,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";

function App() {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=bcc4ff10c2939665232d75d8bf0ec093`
      )
      .then((res) => {
        console.log(res);
        setMovies(res.data.results);
      });
  }, []);

  const searchMovie = async (e) => {
    e.preventDefault();
    console.log("Searching");
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=bcc4ff10c2939665232d75d8bf0ec093&query=${query}`;
      const res = await axios.get(url);
      console.log(res.data);
      setMovies(res.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/home">Bharadwaj Movies</Navbar.Brand>
          <Navbar.Brand href="/home">Trending</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>

          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-3"
              style={{ maxHeight: "100px" }}
              navbarScroll
            ></Nav>

            <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
              <FormControl
                type="search"
                placeholder="Movie Search"
                className="me-2"
                aria-label="search"
                name="query"
                value={query}
                onChange={changeHandler}
              ></FormControl>
              <Button variant="secondary" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        {movies.length > 0 ? (
          <div className="container">
            <div className="grid">
              {movies.map((movieReq) => (
                <MovieBox key={movieReq.id} {...movieReq} />
              ))}
            </div>
          </div>
        ) : (
          <h2>Sorry! 😞 No Movies Found</h2>
        )}
      </div>
    </>
  );
}

export default App;
