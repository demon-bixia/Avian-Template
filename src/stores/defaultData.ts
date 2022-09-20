export const DefaultSettings = [
    {
        'id': 1,
        'title': 'Account',
        'description': 'Update your profile details',
        'settings': [
            { id: 1, type: 'text', value: 'Dawn', title: 'First name' },
            { id: 2, type: 'text', value: 'Sabrina', title: 'Last name' },
            { id: 3, type: 'file', title: 'Avatar' },
        ]
    },

    {
        'id': 2,
        'title': 'Privacy & Safety',
        'description': 'Control your privacy settings',
        'settings': [
            { id: 1, type: 'switch', value: true, title: 'Show Last Seen', description: 'Allow people to see your last login' },
            { id: 2, type: 'switch', value: false, title: 'Show Read Receipt', description: 'Allow people to see whether or not you\'ve read the message' },
            { id: 3, type: 'switch', value: true, title: 'Joining Groups', description: 'Allow people to add you to groups' },
            { id: 4, type: 'switch', value: false, title: 'Private Messages', description: 'Recive messages from non-contacts' },
        ]
    },


    {
        'id': 3,
        'title': 'Appearance',
        'description': 'Customize the look and feel',
        'settings': [
            { id: 1, type: 'switch', value: true, title: 'Dark Mode', description: 'Apply a theme with dark colors' },
            { id: 2, type: 'switch', value: false, title: 'Bordered Theme', description: 'Apply borders to the theme' },
        ]
    },

    {
        'id': 4,
        'title': 'Notifications',
        'description': 'Customize notifications',
        'settings': [
            { id: 1, type: 'switch', value: true, title: 'Allow Notifications', description: 'Recive Notifications from avian.' },
            { id: 2, type: 'switch', value: true, title: 'Keep Notifications', description: 'save notifications after they are recived' },
        ],
    }
];