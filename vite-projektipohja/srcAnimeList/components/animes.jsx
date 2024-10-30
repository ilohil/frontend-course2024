import axios from 'axios';

let server = 'http://localhost:8080/';

export const getAnimes = async () => {
    try {
        const response = await axios.get(server + 'animes/all');
        return (response);
    } catch (error) {
        return ({ status: 500, message: 'Error searching animes: ' + error.message });
    }
}

export const getAnime = async (id) => {
    try {
        const response = await axios.get(server + 'animes/' + id);
        return (response);
    } catch (error) {
        return ({ status: 500, message: 'Error searching anime: ' + error.message });
    }
}

export const addAnime = async (anime) => {
    try {
        const response = await axios.post(server + 'animes/add', anime, {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        return response;
    } catch (error) {
        return { status: 500, message: 'Error adding anime: ' + error.message };
    }
}

export const deleteAnime = async (id) => {
    try {
        const response = await axios.delete(server + 'animes/delete/' + id);
        return (response);
    } catch (error) {
        return ({ status: error.status, message: 'Error deleting anime: ' + error.message });
    }
}

export const editAnime = async (id, anime) => {
    try {
        const response = await axios.put(server + 'animes/edit/' + id, anime, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response;
    } catch (error) {
        return { status: 500, message: 'Error editing anime: ' + error.message };
    }
}



export const getCategories = async () => {
    try {
        const response = await axios.get(server + 'categories/all');
        return (response);
    } catch (error) {
        return ({ status: 500, message: 'Error searching categories: ' + error.message });
    }
}

export const getCategory = async (id) => {

    try {
        const response = await axios.get(server + 'categories/' + id);
        return (response);
    } catch (error) {
        return ({ status: error.status, message: 'Error finding category: ' + error.message });
    }
}

export const getStreamingServices = async () => {
    try {
        const response = await axios.get(server + 'streamingservices/all');
        return (response);
    } catch (error) {
        return ({ status: 500, message: 'Error searching streaming services: ' + error.message });
    }
}

export const getStreamingService = async (id) => {

    try {
        const response = await axios.get(server + 'streamingservices/' + id);
        return (response);
    } catch (error) {
        return ({ status: error.status, message: 'Error finding streaming service: ' + error.message });
    }
}