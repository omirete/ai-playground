const updateToken = (newValue: string) => {
    localStorage.setItem("token", newValue);
};

export default updateToken;
