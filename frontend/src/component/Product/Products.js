import React, { Fragment, useEffect, useState } from 'react';
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";

const Products = ({ match }) => {
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 25000]);

    const {
        products,
        loading,
        error,
        productsCount,
        resultPerPage,
      } = useSelector((state) => state.products);

      const keyword = match.params.keyword;

      const setCurrentPageNo = (e) => {
        setCurrentPage(e);
      };

      const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
      };

      useEffect(() => {
        // if (error) {
        //   alert.error(error);
        //   dispatch(clearErrors());
        // }
    
        dispatch(getProduct(keyword, currentPage, price));
      }, [dispatch, keyword, currentPage, price]);
    


  return <Fragment>
    {loading ? <Loader></Loader> : 
    <Fragment>
        <h2 className="productsHeading">Products</h2>

        <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className='filterBox'>
          <Typography>Price</Typography>
          <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

          </div>
          
         {resultPerPage < productsCount && (
           <div className="paginationBox">
           <Pagination
                 activePage={currentPage}
                 itemsCountPerPage={resultPerPage}
                 totalItemsCount={productsCount}
                 onChange={setCurrentPageNo}
                 nextPageText="Next"
                 prevPageText="Prev"
                 firstPageText="1st"
                 lastPageText="Last"
                 itemClass="page-item"
                 linkClass="page-link"
                 activeClass="pageItemActive"
                 activeLinkClass="pageLinkActive"
               />
 
           </div>
         )}
    </Fragment>
    }
  </Fragment>
}

export default Products