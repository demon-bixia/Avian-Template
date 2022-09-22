export const USER = { id: 1, firstName: 'Dawn', lastSeen: new Date(), lastName: 'Sabrina', email: 'sabrina@gmail.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', token: 'fakeToken', };

export const CONTACTS = [
    { id: 2, email: 'user@gmail.com', firstName: 'Ahmed', lastName: "Ali", "lastSeen": new Date(), avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' },
    { id: 3, email: 'user@gmail.com', firstName: 'Allen', lastName: "Carr", "lastSeen": new Date(), avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', },
    { id: 4, email: 'user@gmail.com', firstName: 'Dawn', lastName: "Sabrina", "lastSeen": new Date(), avatar: 'https://images.unsplash.com/photo-1657214059233-5626b35eb349?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80' },
    { id: 5, email: 'user@gmail.com', firstName: 'Dylan', lastName: "Billy", "lastSeen": new Date(), avatar: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', },
    { id: 6, email: 'user@gmail.com', firstName: 'Elijah', lastName: "Sabrina", "lastSeen": new Date(), avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' },
    { id: 7, email: 'user@gmail.com', firstName: 'Emma', lastName: "Layla", "lastSeen": new Date(), avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' },
    { id: 8, email: 'user@gmail.com', firstName: 'Evelyn', lastName: "Billy", "lastSeen": new Date(), avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGVvcGxlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60' },
    { id: 9, email: 'user@gmail.com', firstName: 'Feng', lastName: "Zhuo", "lastSeen": new Date(), avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', },
    { id: 10, email: 'user@gmail.com', firstName: 'Fung', lastName: "Sheng", "lastSeen": new Date(), avatar: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?cs=srgb&dl=pexels-charles-1851164.jpg&fm=jpg', }
];

export const CONVERSATIONS = [
    {
        id: 1,
        contact: { id: 6, email: 'user@gmail.com', firstName: 'Elijah', lastName: "Sabrina", lastSeen: new Date(), avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' },
        messages: [{
            content: 'Wow really cool', date: '4:00 pm',
            sender: {
                id: 1, firstName: 'Dawn', lastName: 'Sabrina', lastSeen: new Date(), email: 'sabrina@gmail.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
            }
        }],
    },

    {
        id: 2,
        contact: { id: 5, email: 'user@gmail.com', firstName: 'Dylan', lastName: "Billy", "lastSeen": new Date(), avatar: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', },
        messages: [{
            content: 'Can you send me a link', date: '8:15 am',
            sender: { id: 1, firstName: 'Dawn', lastName: 'Sabrina', lastSeen: new Date(), email: 'sabrina@gmail.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', }
        },
        {
            content: 'So i found this great video online', date: '1:00 pm',
            sender: { id: 5, email: 'user@gmail.com', firstName: 'Dylan', lastName: "Billy", lastSeen: new Date(), avatar: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', },
        },
        {
            content: 'It’s about stopping drugs', date: '1:05 pm',
            sender: { id: 5, email: 'user@gmail.com', firstName: 'Dylan', lastName: "Billy", lastSeen: new Date(), avatar: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', },
        },
        {
            content: 'Can you send me a link', date: '1:15 pm',
            sender: { id: 1, firstName: 'Dawn', lastName: 'Sabrina', lastSeen: new Date(), email: 'sabrina@gmail.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', }
        },
        {
            content: 'Hey there, check this link out', date: '1:30 pm',
            sender: { id: 5, email: 'user@gmail.com', firstName: 'Dylan', lastName: "Billy", lastSeen: new Date(), avatar: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', },
        },
        {
            content: 'Wow, really cool', date: '1:30 pm',
            sender: {
                id: 1, firstName: 'Dawn', lastName: 'Sabrina', lastSeen: new Date(), email: 'sabrina@gmail.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
            }
        },
        {
            content: 'You\'re welcome', date: '1:30 pm',
            sender: {
                id: 5, email: 'user@gmail.com', firstName: 'Dylan', lastName: "Billy", lastSeen: new Date(), avatar: 'https://images.unsplash.com/photo-1522556189639-b150ed9c4330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
            },
        },],
    },

    {
        id: 3,
        contact: { id: 4, email: 'user@gmail.com', firstName: 'Dawn', lastName: "Sabrina", lastSeen: new Date(), avatar: 'https://images.unsplash.com/photo-1657214059233-5626b35eb349?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80' },
        messages: [{
            content: 'Oh, ok good to know.', date: '4:00 pm',
            sender: { id: 1, firstName: 'Dawn', lastName: 'Sabrina', lastSeen: new Date(), email: 'sabrina@gmail.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', }
        }],
    },

    {
        id: 4,
        contact: { id: 3, email: 'user@gmail.com', firstName: 'Allen', lastName: "Carr", lastSeen: new Date(), avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', },
        messages: [{
            content: 'Oh, ok good to know.', date: '4:00 pm',
            sender: { id: 1, firstName: 'Dawn', lastName: 'Sabrina', lastSeen: new Date(), email: 'sabrina@gmail.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }
        }],
    },

    {
        id: 5,
        contact: { id: 2, email: 'user@gmail.com', firstName: 'Ahmed', lastName: "Ali", lastSeen: new Date(), avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' },
        messages: [{
            content: 'Oh, ok good to know.', date: '4:00 pm',
            sender: { id: 1, firstName: 'Dawn', lastName: 'Sabrina', lastSeen: new Date(), email: 'sabrina@gmail.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }
        }],
    },
];

export const NOTIFICATIONS = [
    {
        flag: 'security',
        title: 'Recent Login',
        message: 'there was a recent login to you account from this device',

    },
    {
        flag: 'added-to-group',
        title: 'New Group',
        message: 'Your friend added you to a new group',

    },
    {
        flag: 'account-update',
        title: 'Password Reset',
        message: 'Your password has been restored successfully',

    },
    {
        flag: 'security',
        title: 'Recent Login',
        message: 'there was a recent login to you account from this device',

    },
    {
        flag: 'added-to-group',
        title: 'New Group',
        message: 'Your friend added you to a new group',

    },
];

export const ARCHIVE = [
    {
        id: 3,
        contact: { id: 4, email: 'user@gmail.com', firstName: 'Dawn', lastName: "Sabrina", "lastSeen": new Date(), avatar: 'https://images.unsplash.com/photo-1657214059233-5626b35eb349?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80' },
        messages: [{
            content: 'Oh, ok good to know.', date: '4:00 pm',
            sender: { id: 1, firstName: 'Dawn', lastName: 'Sabrina', lastSeen: new Date(), email: 'sabrina@gmail.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' }
        }],
    },

    {
        id: 4,
        contact: { id: 3, email: 'user@gmail.com', firstName: 'Allen', lastName: "Carr", "lastSeen": new Date(), avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', },
        messages: [{
            content: 'Oh, ok good to know.', date: '4:00 pm',
            sender: { id: 1, firstName: 'Dawn', lastName: 'Sabrina', lastSeen: new Date(), email: 'sabrina@gmail.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', }
        }],
    },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchData = async () => {
    await delay(2000);

    return await {
        data: {
            contacts: CONTACTS,
            conversations: CONVERSATIONS,
            notifications: NOTIFICATIONS,
            archivedConversations: ARCHIVE,
        }
    };
};

export const updateAccount = async () => {
    await delay(4000);

    return await {
        data: {
            detail: 'Your account has been updated successfully',
        }
    };
};