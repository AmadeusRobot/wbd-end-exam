const serverPath = import.meta.env.VITE_SERVER_PATH

const urls = {
    user: {
        create: `${serverPath}/user`,
        findById: `${serverPath}/user/{id}`,
        update: `${serverPath}/user/{id}`,
        login: `${serverPath}/user/login`
    }
}

export default urls