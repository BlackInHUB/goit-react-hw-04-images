import { useState, useEffect } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { LoadMoreBtn } from "./LoadMoreBtn/LoadMoreBtn";
import * as API from "services/getImgsApi";
import { Box } from "../utils/Box/Box";
import Loader from "./Loader/Loader";


export default function App() {
  const [searchedValue, setSearchedValue] = useState(null)
  const [images, setImages] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const onLoadMore = () => {
    setPage(state => state + 1)
  }

  const getSerchedValues = (value) => {
    if (value === searchedValue) {
      return alert(`Ми вже знайшли все за запитом ${value}! Запитай щось інше!`)
    }

    setSearchedValue(value)
    setImages([])
    setPage(1)
    setTotalPages(null)
  }

  useEffect(() => {
    if (!searchedValue) {
      return
    }

    setIsLoading(true)

    API.getImages(searchedValue, page)
    .then(data => {
      setImages(state => [...state, ...data.hits])
      setTotalPages(Number((data.totalHits / 12).toFixed('')))
    })
    .catch(error => console.log(error))
    .finally(setIsLoading(false))

  }, [page, searchedValue])
  


    return (
    <Box textAlign="center">
        <Searchbar onSubmit={getSerchedValues} />
        {totalPages === 0  && <p>За вашим запитом {searchedValue} нічого не знайдено :( Спробуйте ще.</p>}
        {images.length > 0 && <ImageGallery items={images} />}
        {isLoading && <Loader />}
        {page < totalPages && <LoadMoreBtn loadMore={onLoadMore} />}
    </Box>
  );
};