import tokenUpdated from "@/src/customEvents/tokenUpdated";

const updateToken = (newValue: string) => {
    localStorage.setItem("token", newValue);
    window.dispatchEvent(tokenUpdated);
};

export default updateToken;
