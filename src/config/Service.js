import api from "./api";
const token = sessionStorage.getItem("token");

class Service {
    //Add New Service
    static async addService(data) {
        try {
            const response = await api.post('/api/services/addService', data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error adding service:", error);
            throw error;
        }
    }

    // Fetch all services
    static async getAllServices() {
        try {
            const response = await api.get('/api/services/allServices', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching services:", error);
            throw error;
        }
    }
}

export default Service;