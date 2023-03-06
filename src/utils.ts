import useAuthStore, { User } from "./stores/auth";
import useChatStore from "./stores/chat";
import { Contact, Conversation, Message, Call } from "./stores/chat";

// combine first name and last name of a contact
export const getFullName = (contact: Contact) => {
  return contact.firstName + " " + contact.lastName;
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
  if (["group", "boradcast"].includes((conversation as Conversation).type)) {
    return conversation?.avatar;
  } else {
    let oddContact = getOddContact(conversation);
    return oddContact?.avatar;
  }
};

// get name based on conversation type
export const getName = (conversation?: Conversation) => {
  if (["group", "boradcast"].includes((conversation as Conversation).type)) {
    return conversation?.name;
  } else {
    let oddContact = getOddContact(conversation);
    return getFullName(oddContact as Contact);
  }
};

// trim message content.
export const shorten = (message: Message, maxLength: number = 23) => {
  return shortenText(message.content as string, maxLength);
};

// trim string.
export const shortenText = (text: string, maxLength: number = 23) => {
  if (text) {
    let trimmedString = text;

    if (text.length > maxLength) {
      // trim the string to the maximum length.
      trimmedString = trimmedString.slice(0, maxLength);
      // add three dots to indicate that there is more to the message.
      trimmedString += "...";
    }

    return trimmedString;
  }

  return "";
};

// test if the message contains attachments
export const hasAttachments = (message: Message) => {
  let attachments = message.attachments;
  return attachments && attachments.length > 0;
};

// get index of the conversation inside the conversations array
export const getConversationIndex = (conversationId: number) => {
  let conversationIndex;
  const chat = useChatStore();

  (chat.conversations as Conversation[]).forEach((conversation, index) => {
    if (conversation.id === conversationId) {
      conversationIndex = index;
    }
  });

  return conversationIndex;
};

export const getOtherMembers = (call: Call) => {
  const auth = useAuthStore();
  let members = [];

  if (call) {
    for (let member of call.members) {
      if (member.id !== (auth.user as User).id) {
        members.push(member);
      }
    }
  }

  return members;
};

export const getCallName = (
  call: Call,
  full?: boolean,
  maxLength: number = 20
) => {
  let members = getOtherMembers(call);
  let callName: string = "";

  for (let member of members) {
    callName += getFullName(member);

    if (members.length > 1) {
      callName += ", ";
    }
  }

  if (full) {
    return callName;
  } else {
    return shortenText(callName, maxLength);
  }
};
