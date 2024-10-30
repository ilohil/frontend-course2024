import axios from 'axios';

let palvelin = 'http://localhost:8080/';

export const getMatkat = async () => {
  try {
    const response = await axios.get(palvelin + 'matka/all');
    return (response);
  } catch (error) {
    return ({ status: 500, message: 'Haku ei onnistunut: ' + error.message });
  }
}

export const addMatka = async (matka) => {
  try {
    /* Kun EI ole kuvaa
    const response = await axios.post(palvelin + 'matka/add', matka, {
      headers: {'Content-Type': 'application/json' }
    });
    */

    // Kun ON kuva
    const response = await axios.post(palvelin + 'matka/add', matka, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    return (response);
  } catch (error) {
    return ({ status: 500, message: 'Lisäys ei onnistunut: ' + error.message });
  }
}

export const deleteMatka = async (id) => {
  try {
    const response = await axios.delete(palvelin + 'matka/delete/' + id);
    return (response);
  } catch (error) {
    return ({ status: error.status, message: 'Poisto ei onnistunut: ' + error.message });
  }
}

