import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

const mapContact = contact => {
    const { firstName, lastName, image, phone, email } = contact;
    return {
        id: uuidv4(),
        name: `${firstName} ${lastName}`,
        avatar: image || 'https://via.placeholder.com/100',
        phone: phone || 'No Phone',
        email: email || 'No Email',
        favorite: Math.random() < 0.5,
    };
};

const fetchContacts = async () => {
    try {
        const response = await fetch('https://dummyjson.com/users');
        if (!response.ok) {
            throw new Error(`Lỗi ${response.status}`);
        }
        const contactData = await response.json();
        if (!contactData || !contactData.users) {
            throw new Error('Invalid JSON response');
        }
        return contactData.users.map(mapContact);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        throw error;
    }
};

const fetchUserContact = async () => {
    try {
        const response = await fetch('https://dummyjson.com/users/1');
        if (!response.ok) {
            throw new Error(`Lỗi: ${response.status}`);
        }
        const userData = await response.json();
        return mapContact(userData);
    } catch (error) {
        console.error('Error fetching user contact:', error);
        throw error;
    }
};

const fetchRandomContact = async () => {
    try {
        const response = await fetch('https://dummyjson.com/users');
        if (!response.ok) {
            throw new Error(`Lỗi: ${response.status}`);
        }
        const userData = await response.json();
        const randomIndex = Math.floor(Math.random() * userData.users.length);
        return mapContact(userData.users[randomIndex]);
    } catch (error) {
        console.error('Error fetching random contact:', error);
        throw error;
    }
};

export { fetchContacts, fetchUserContact, fetchRandomContact };