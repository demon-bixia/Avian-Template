export const USER = {
    firstName: 'Dawn',
    lastName: 'Sabrina',
    email: 'sabrina@gmail.com',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
    token: 'fakeToken',
};

export const CONTACTS = [
    { id: 1, email: 'user@gmail.com', firstName: 'Ahmed', lastName: "Ali", "lastSeen": new Date(), avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' },
    { id: 2, email: 'user@gmail.com', firstName: 'Allen', lastName: "Carr", "lastSeen": new Date(), avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', },
    { id: 3, email: 'user@gmail.com', firstName: 'Dawn', lastName: "Sabrina", "lastSeen": new Date(), avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' },
    { id: 4, email: 'user@gmail.com', firstName: 'Dylan', lastName: "Billy", "lastSeen": new Date(), avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', },
    { id: 5, email: 'user@gmail.com', firstName: 'Elijah', lastName: "Sabrina", "lastSeen": new Date(), avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' },
    { id: 6, email: 'user@gmail.com', firstName: 'Emma', lastName: "Layla", "lastSeen": new Date(), avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' },
    { id: 7, email: 'user@gmail.com', firstName: 'Evelyn', lastName: "Billy", "lastSeen": new Date(), avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80' },
    { id: 8, email: 'user@gmail.com', firstName: 'Feng', lastName: "Zhuo", "lastSeen": new Date(), avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', },
    { id: 9, email: 'user@gmail.com', firstName: 'Fung', lastName: "Sheng", "lastSeen": new Date(), avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80', }
];


export const CONVERSATIONS = [
    {
        id: 1,
        name: 'Dawn Sabrina',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        messages: [{
            content: 'Wow really cool', date: '4:00 pm',
            sender: {
                id: 1,
                email: 'user@gmail.com',
                firstName: 'Dillan',
                lastName: 'Robbie',
                avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
            }
        }],
    },

    {
        id: 2,
        name: 'Dylan Billy',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        messages: [{
            content: 'Thanks you very much.', date: '4:00 pm',
            sender: {
                id: 2,
                email: 'user@gmail.com',
                firstName: 'Dillan',
                lastName: 'Robbie',
                avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
            }
        }],
    },

    {
        id: 3,
        name: 'Elijah Sabrina',
        avatar: 'https://images.unsplash.com/photo-1540331547168-8b63109225b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=419&q=80',
        messages: [{
            content: 'Oh, ok good to know.', date: '4:00 pm',
            sender: {
                id: 3,
                email: 'user@gmail.com',
                firstName: 'Dillan',
                lastName: 'Robbie',
                avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
            }
        }],
    },

    {
        id: 4,
        name: 'Evelyn Billy',
        avatar: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
        messages: [{
            content: 'Wow really cool', date: '4:00 pm',
            sender: {
                id: 4,
                email: 'user@gmail.com',
                firstName: 'Dillan',
                lastName: 'Robbie',
                avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
            }
        }],
    },

    {
        id: 5,
        name: 'Lillian Lucia',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
        messages: [{
            content: 'So much fun guys.', date: '4:00 pm',
            sender: {
                id: 5,
                email: 'user@gmail.com',
                firstName: 'Dillan',
                lastName: 'Robbie',
                avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
            }
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
        id: 1,
        name: 'Dawn Sabrina',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
        messages: [{
            content: 'Wow really cool', date: '4:00 pm',
            sender: {
                id: 1,
                email: 'user@gmail.com',
                firstName: 'Dillan',
                lastName: 'Robbie',
                avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
            }
        }],
    },

    {
        id: 3,
        name: 'Elijah Sabrina',
        avatar: 'https://images.unsplash.com/photo-1540331547168-8b63109225b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=419&q=80',
        messages: [{
            content: 'Oh, ok good to know.', date: '4:00 pm',
            sender: {
                id: 3,
                email: 'user@gmail.com',
                firstName: 'Dillan',
                lastName: 'Robbie',
                avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80',
            }
        }],
    },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

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