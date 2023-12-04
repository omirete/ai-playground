import tokenUpdated from "@/src/customEvents/tokenUpdated";

const clearToken = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(tokenUpdated);
};

export default clearToken;
