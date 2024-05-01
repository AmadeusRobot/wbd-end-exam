const serverPath = import.meta.env.VITE_SERVER_PATH + "/api"

const urls = {
    user: {
        create: `${serverPath}/user`,
        findById: `${serverPath}/user/{id}`,
        update: `${serverPath}/user/{id}`,
        login: `${serverPath}/user/login`,
        doctors: `${serverPath}/user/doctors`
    },
    appointment: {
        create: `${serverPath}/appointment`,
        finByUser: `${serverPath}/appointment/{{user}}/{{role}}`
    }
}

export default urls