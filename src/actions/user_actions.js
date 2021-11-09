import {
    LOGIN_USER,
    LOGOUT_USER,
    AUTH_SERVER,
    GET_ERRORS,
    CLEAR_ERRORS,
    SHOP_SERVER,
    PRODUCT_SERVER,
    SELLER_SERVER,
    FAV_SERVER,
    REVIEW_SERVER,
    USER_CONTACTUS_SERVER
} from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

export async function loginUser(dataToSubmit) {
    try {
        const res = await axios.post(`${AUTH_SERVER}/login`, dataToSubmit);
        const token = res.data.token;
        const decoded = jwt_decode(token);
        return {
            type: LOGIN_USER,
            payload: {...decoded, userLoggedIn: true},
        };
    } catch (error) {
        return {
            type: GET_ERRORS,
            payload: error.response.data,
        };
    }
}

export async function subscribe(email) {
    try {
        const res = await axios.put(`${AUTH_SERVER}/subscribe`, {email: email});
        return res.data.message;
    } catch (error) {
        return error.response.data.message;
    }
}

export const logout = async () => {
    //   document.cookie = "w_auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    Cookies.remove("w_auth");
    return {
        type: LOGOUT_USER,
        payload: {},
    };
};

export async function getCart(delivered) {
    try {
        const res = await axios.get(`${SHOP_SERVER}/?delivered=${delivered}`);
        const orders = res.data;
        return orders;
    } catch (error) {
        return {
            type: GET_ERRORS,
            payload: error.response.data,
        };
    }
}

export async function getSellerCart(delivered) {
    try {
        const res = await axios.get(
            `${SELLER_SERVER}/orders?delivered=${delivered}`
        );

        const orders = res.data;
        return orders;
    } catch (error) {
        return {
            type: GET_ERRORS,
            payload: error.response.data,
        };
    }
}

export async function postToCart(order) {
    try {
        const res = await axios.post(`${SHOP_SERVER}`, order);

        return res.data;
    } catch (error) {
    }
}

export async function postToFav(productId) {
    try {
        const res = await axios.post(`${FAV_SERVER}`, {productId: productId});
        return res.data.message;
    } catch (error) {
    }
}

export async function checkFavItem(productId) {
    try {
        const res = await axios.get(`${FAV_SERVER}`, {
            params: {productId: productId},
        });
        return res.data.exist;
    } catch (error) {
    }
}

export async function getSeller(id) {
    try {
        const res = await axios.get(`${SELLER_SERVER}/${id}`);
        return res.data.user;
    } catch (error) {
        console.log(error);
    }
}

export async function register(user) {
    try {
        const res = await axios.post(`${AUTH_SERVER}/signup`, user);
        return res.data;
    } catch (error) {
        throw new Error("Email or contact number already exist!");
    }
}

export async function issueTicket(ticket) {
    try {
        const res = await axios.post(`${USER_CONTACTUS_SERVER}`, ticket);
        return res.data;
    } catch (error) {
    }
}

export async function updateOrder(data) {
    try {
        console.log(data)
        const res = await axios.put(`${SHOP_SERVER}`, data);
        return res.data;
    } catch (error) {
    }
}

export async function postReview(data) {
    try {
        const res = await axios.post(`${REVIEW_SERVER}`, data);
        return res.data;
    } catch (error) {
    }
}

export async function getCartTotal() {
    try {
        const res = await axios.get(`${SHOP_SERVER}/total`);
        return res.data.cart;
    } catch (error) {
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    };
};

export async function proceedOrderPlace(data) {
    try {
        const res = await axios.post(`${PRODUCT_SERVER}/proceedOrder`, data);
        console.log(res);
        return res.data;
    } catch (error) {
        throw new Error("Failed to place order!");
    }
}
