import { USER_API_URL } from "../constant"
import { axiosInstance } from "./axios.instance"

export const getUser = async (id: string) => {
    return await axiosInstance.get(USER_API_URL + id)
}