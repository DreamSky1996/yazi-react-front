import React, {useEffect, useState} from "react";
import "./shop.css";
import SelectFilterDropDown from "../../components/util/selectFilterDropDown";
import ProductCard from "../../components/Product";
import Loader from "../../components/util/loader";
import {
    getProducts,
    getFilteredProducts,
    getSellerProducts,
    getSellerFilteredProducts,
} from "../../actions/products_actions";
import Sidebar from "../../components/Header_Footer/Sidebar/index"
import InfiniteScroll from "react-infinite-scroller";
import {connect} from "react-redux";
import {Link} from "react-router-dom";

function Shop(props) {
    const [temp, setTemp] = useState(props.match.params.clothType);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [hasMore, setHasMore] = useState(false);
    const [size, setSize] = useState("all");

    const possibles = ['kids', 'men', 'women'];
    const [clothesType, setClothesType] = useState(possibles.includes(props.match.params.clothType) ? props.match.params.clothType : 'all');
    const [purchaseMethod, setPurchaseMethod] = useState("all");
    const [paymentMethod, setPaymentMethod] = useState("all");
    const [shippingMethod, setShippingMethod] = useState("all");
    const [mount, setMount] = useState(false)
    const [openSizeMenu, setSizeOpenMenu] = useState(false);
    const [openPurchaseMenu, setOpenPurchaseMenu] = useState(false);
    const [openPaymentMenu, setOpenPaymentMenu] = useState(false);
    const [openShippingMethodMenu, setOpenShippingMethodMenu] = useState(false);
    const [openTypeMenu, setOpenTypeMenu] = useState(false);
    const SizeFilters = [
        {title: "ALL", value: "all"},
        {title: "M", value: "M"},
        {title: "S", value: "S"},
        {title: "L", value: "L"},
    ];
    const purchaseMethodFilters = [
        {title: "ALL", value: "all"},
        {title: "METHOD ONE", value: "one"},
        {title: "METHOD TWO", value: "two"},
        {title: "METHOD THREE", value: "three"},
    ];
    const paymentMethodFilters = [
        {title: "ALL", value: "all"},
        {title: "Paypal", value: "paypal"},
        {title: "Payoneer", value: "payoneer"},
    ];
    const shippingMethodFilters = [
        {title: "ALL", value: "all"},
        {title: "DHL", value: "dhl"},
        {title: "FedEx", value: "fedex"},
    ];
    const typeFilters = [
        {title: "ALL", value: "all"},
        {title: "Women", value: "women"},
        {title: "Men", value: "men"},
        {title: "Kids", value: "kids"},
    ];
    if(props.match.params.clothType != temp){
        setTemp(props.match.params.clothType);
        setClothesType(props.match.params.clothType);
        window.location.reload();
    }

    const closeMenu = () => {
        if (openSizeMenu) setSizeOpenMenu(false);
        if (openPurchaseMenu) setOpenPurchaseMenu(false);
        if (openPaymentMenu) setOpenPaymentMenu(false);
        if (openShippingMethodMenu) setOpenShippingMethodMenu(false);
        if (openTypeMenu) setOpenTypeMenu(false);
    };

    useEffect(() => {
        getProductsPagination().then((products) => {
            if (products.length >= 9) setHasMore(true);
            setProducts(products);
            setLoading(false);
            setPage(page + 1);
            setMount(true)
        });
    }, []);

    const getProductsPagination = async (
        filters = {
            size,
            purchaseMethod,
            paymentMethod,
            shippingMethod,
            clothesType,
        }
    ) => {
        if (!props.user.userLoggedIn || props.user.type === "buyer")
            return await getProducts(page, filters);
        else if (props.user.type === "seller")
            return await getSellerProducts(page, filters);
    };

    const nextProducts = () => {
        if (hasMore)
            getProductsPagination().then((newProducts) => {
                if (newProducts.length < 9) setHasMore(false);
                setProducts([...products, ...newProducts]);
                setPage(page + 1);
            });
    };

    const onChangeFilters = (selectedValue, key) => {
        setPage(1);
        switch (key) {
            case "size":
                setSize(selectedValue);
                break;
            case "purchaseMethod":
                setPurchaseMethod(selectedValue);
                break;
            case "paymentMethod":
                setPaymentMethod(selectedValue);
                break;
            case "shippingMethod":
                setShippingMethod(selectedValue);
                break;
            case "clothesType":
                setClothesType(selectedValue);
                break;
            default:
                return;
        }
        const filters = {
            size,
            purchaseMethod,
            paymentMethod,
            shippingMethod,
            clothesType,
        };

        filters[key] = selectedValue;

        if (!props.user.userLoggedIn || props.user.type === "buyer")
            getFilteredProducts(filters).then((products) => {
                if (products.length >= 9) setHasMore(true);
                else setHasMore(false);
                setProducts(products);
                setPage(2)
            });
        else if (props.user.type === "seller")
            getSellerFilteredProducts(filters).then((products) => {
                if (products.length >= 9) setHasMore(true);
                else setHasMore(false);
                setProducts(products);
                setPage(2)
            });
    };

    return (
        <div className="page-wrapper" onClick={closeMenu}>
            <Sidebar/>
            <div style={{minHeight: "358px"}} className="container">
                <div className="row justify-content-end">
                    <div className="col-xl-12 col-xl-10">
                        <div className="filter-header">
                            <ul className="text-left">
                                <li>
                                    <SelectFilterDropDown
                                        openMenu={openSizeMenu}
                                        setOpenMenu={setSizeOpenMenu}
                                        options={SizeFilters}
                                        title="Size"
                                        width="100px"
                                        init="all"
                                        onChange={(selectedValue) =>
                                            onChangeFilters(selectedValue, "size")
                                        }
                                        closeMenu={() => setSizeOpenMenu(false)}
                                    />
                                </li>
                                <li>
                                    <SelectFilterDropDown
                                        openMenu={openPurchaseMenu}
                                        setOpenMenu={setOpenPurchaseMenu}
                                        options={purchaseMethodFilters}
                                        title="Purchase Method"
                                        width="160px"
                                        init="all"
                                        onChange={(selectedValue) =>
                                            onChangeFilters(selectedValue, "purchaseMethod")
                                        }
                                        closeMenu={() => setOpenPurchaseMenu(false)}
                                    />
                                </li>
                                <li>
                                    <SelectFilterDropDown
                                        openMenu={openPaymentMenu}
                                        setOpenMenu={setOpenPaymentMenu}
                                        options={paymentMethodFilters}
                                        title="Payment Method"
                                        width="160px"
                                        init="all"
                                        onChange={(selectedValue) =>
                                            onChangeFilters(selectedValue, "paymentMethod")
                                        }
                                        closeMenu={() => setOpenPaymentMenu(false)}
                                    />
                                </li>
                                <li>
                                    <SelectFilterDropDown
                                        openMenu={openShippingMethodMenu}
                                        setOpenMenu={setOpenShippingMethodMenu}
                                        options={shippingMethodFilters}
                                        title="Shipping Method"
                                        width="160px"
                                        init="all"
                                        onChange={(selectedValue) =>
                                            onChangeFilters(selectedValue, "shippingMethod")
                                        }
                                        closeMenu={() => setOpenShippingMethodMenu(false)}
                                    />
                                </li>
                                <li>
                                    <SelectFilterDropDown
                                        openMenu={openTypeMenu}
                                        setOpenMenu={setOpenTypeMenu}
                                        options={typeFilters}
                                        title="Cloths Type"
                                        width="160px"
                                        init={clothesType}
                                        onChange={(selectedValue) =>
                                            onChangeFilters(selectedValue, "clothesType")
                                        }
                                        closeMenu={() => setOpenTypeMenu(false)}
                                    />
                                </li>
                                <li>
                                    {props.user.type === "seller" && (
                                        <Link to="/add-product" className="btn btn-primary">
                                            ADD PRODUCT
                                        </Link>
                                    )}
                                </li>
                            </ul>
                        </div>

                        <div className="trending product-list">
                            {products.length > 0 ? (
                                <InfiniteScroll
                                    pageStart={0}
                                    loadMore={nextProducts}
                                    hasMore={!loading && hasMore}
                                    initialLoad={false}
                                    className="row"
                                >
                                    {products.map((product, i) => {
                                        return (
                                            <ProductCard
                                                usertype={
                                                    props.user.userLoggedIn ? props.user.type : "user"
                                                }
                                                username={props.user.name}
                                                sellerId={props.user.userId}
                                                product={product}
                                                key={product._id}
                                                userLoggedIn={props.user.userLoggedIn}
                                            />
                                        );
                                    })}
                                </InfiniteScroll>
                            ) : loading ? (
                                <Loader/>
                            ) : (
                                <div className="no-products-found">No Products Found</div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapState = (state) => ({
    user: state.user,
});

export default connect(mapState)(Shop);
