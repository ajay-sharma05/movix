import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchDataFromApi } from "./utils/api";
import { getApiConfigretion, getGenres } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import Explore from "./pages/explore/Explore";
import SearchResult from "./pages/SearchResult/searchResult";
import PageNotFound from "./pages/404/PageNotFound";

function App() {
  const dispatch = useDispatch();

  const { url } = useSelector((state) => state.home);


  useEffect(() => {
    fetchApiConfig();
    genresCall();
  }, []);

  const fetchApiConfig = () =>
    fetchDataFromApi("/configuration").then((res) => {
      // console.log("APP First Response :", res);

      const url = {
        backdrop: res.images.secure_base_url + "original",
        poster: res.images.secure_base_url + "original",
        profile: res.images.secure_base_url + "original",
      }


      dispatch(getApiConfigretion(url));
    });

    const genresCall = async () => {

      let promises = []
      let endPoints = ["movie", "tv"]
      let allGenres = {}

      endPoints.forEach((url) =>{
        return (
          promises.push(fetchDataFromApi(`/genre/${url}/list`))
        )
      })

      const data = await Promise.all(promises);

      data.map(({genres}) => {
        return genres.map((item) => (allGenres[item.id]) = item);
        
      });
      dispatch(getGenres(allGenres))
    }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />

      </Routes>
        <Footer />
    </BrowserRouter>
  );
}

export default App;
