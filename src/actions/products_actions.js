import {
    PRODUCT_SERVER,
    FILTER_PRODUCT_SERVER,
    SELLER_PRODUCT_SERVER,
    SELLER_FILTER_PRODUCT_SERVER,
} from "./types";

import axios from "axios";

export async function getProducts(page, filters) {
    console.log(filters, page)

    try {
        const res = await axios.get(`${PRODUCT_SERVER}?page=${page}`, {
            params: {
                size: filters.size || "all",
                purchaseMethod: filters.purchaseMethod || "all",
                paymentMethod: filters.paymentMethod || "all",
                shippingMethod: filters.shippingMethod || "all",
                clothType: filters.clothesType || "all",
            },
        });
        return res.data.products;
    } catch (error) {
    }
}

export async function getRecentProducts() {
    try {
        const res = await axios.get(`${PRODUCT_SERVER}/recent`);
        return res.data.products;
    } catch (error) {
        return [];
    }
}

export async function getFilteredProducts(filters) {
    try {
        const res = await axios.get(`${FILTER_PRODUCT_SERVER}`, {
            params: {
                size: filters.size,
                purchaseMethod: filters.purchaseMethod,
                paymentMethod: filters.paymentMethod,
                shippingMethod: filters.shippingMethod,
                clothType: filters.clothesType,
            },
        });
        return res.data.products;
    } catch (error) {
    }
}

export async function getSellerProducts(page, filters) {
    try {
        const res = await axios.get(`${SELLER_PRODUCT_SERVER}?page=${page}`, {
            params: {
                size: filters.size || "all",
                purchaseMethod: filters.purchaseMethod || "all",
                paymentMethod: filters.paymentMethod || "all",
                shippingMethod: filters.shippingMethod || "all",
                clothType: filters.clothesType || "all",
            },
        });
        return res.data.products;
    } catch (error) {
    }
}

export async function getSellerFilteredProducts(filters) {
    try {
        const res = await axios.get(`${SELLER_FILTER_PRODUCT_SERVER}`, {
            params: {
                size: filters.size,
                purchaseMethod: filters.purchaseMethod,
                paymentMethod: filters.paymentMethod,
                shippingMethod: filters.shippingMethod,
                clothType: filters.clothesType

            },
        });
        return res.data.products;
    } catch (error) {
    }
}

export async function addProduct(product) {
    try {
        const config = {
            headers: {"content-type": "multipart/form-data"},
        };
        let formData = new FormData();

        product.images.forEach((file) => {
            formData.append("image", file);
        });

        formData.append("name", product.name);
        formData.append("description", product.description);
        formData.append("price", product.price);
        formData.append("size", product.size);
        formData.append("clothType", product.clothType);
        formData.append("paymentMethod", product.paymentMethod);
        formData.append("purchaseMethod", product.purchaseMethod);
        formData.append("shippingMethod", product.shippingMethod);

        const res = await axios.post(`${PRODUCT_SERVER}`, formData, config);
        return res.data.message;
    } catch (error) {
        throw new Error(
            error.response.data.data[0].msg + " " + error.response.data.data[0].param
        );
    }
}

export async function getProduct(id) {
    try {
        const res = await axios.get(`${PRODUCT_SERVER}/${id}`);
        return res.data.product == 'undefined' ? [] : res.data.product;
    } catch (error) {
    }
}

export async function getTrackProduct(id) {
    try {
        const config = {
            headers: {"content-type": "multipart/form-data"},
        };

        let formData = new FormData();
        formData.append("id" , id);

        const res = await axios.post(`${PRODUCT_SERVER}/track`, formData, config);
        return res.data;
    } catch (error) {
    }
}
