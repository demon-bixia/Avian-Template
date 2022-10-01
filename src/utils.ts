import useAuthStore, { User } from "./stores/auth";
import { Contact, Conversation, Message } from "./stores/chat";

// combine first name and last name of a contact
export const getFullName = (contact: Contact) => {
    return contact.firstName + ' ' + contact.lastName;
};

// get the other contact that is not the authenticated user.
export const getOddContact = (conversation?: Conversation) => {
    const auth = useAuthStore();

    let oddContact;

    for (let contact of (conversation as Conversation).contacts) {
        if (contact.id !== (auth.user as User).id) {
            oddContact = contact;
        }
    }

    return oddContact;
};

// get avatar based on conversation type
export const getAvatar = (conversation?: Conversation) => {
    if (['group', 'boradcast'].includes((conversation as Conversation).type)) {
        return conversation?.avatar;
    } else {
        let oddContact = getOddContact(conversation);
        return oddContact?.avatar;
    }
};

// get name based on conversation type
export const getName = (conversation?: Conversation) => {
    if (['group', 'boradcast'].includes((conversation as Conversation).type)) {
        return conversation?.name;
    } else {
        let oddContact = getOddContact(conversation);
        return getFullName((oddContact as Contact));
    }
};

// trim message.
export const shorten = (message: Message, maxLength: number = 23) => {
    if (message.content) {
        let trimmedString = message.content;

        if (message.content.length > maxLength) {
            // trim the string to the maximum length.
            trimmedString = trimmedString.slice(0, maxLength);
            // add three dots to indicate that there is more to the message.
            trimmedString += '...';
        }
        return trimmedString;
    }
    return '';
};

// test if the message contains attachments
export const hasAttachments = (message: Message) => {
    let attachments = message.attachments;
    return attachments && attachments.length > 0;
};