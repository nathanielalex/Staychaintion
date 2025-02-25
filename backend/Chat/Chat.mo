import Time "mo:base/Time";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Random "mo:base/Random";
import Array "mo:base/Array";
import Source "mo:uuid/Source";
import UUID "mo:uuid/UUID";
// import User "../Storages/User/User";
import Util "../Storages/Util";


actor class Backend() {
    type Message = {
        id : Text;
        content : Text;
        sender : Principal;
        timestamp : Time.Time;
    };

    type Chat = {
        id : Text;
        user1 : Principal;
        user2 : Principal;
        messages : [Text];
    };
    
    let messages = TrieMap.TrieMap<Text, Message>(Text.equal, Text.hash);
    let chats = TrieMap.TrieMap<Text, Chat>(Text.equal, Text.hash);

    func getMessage(messageId : Text) : Result.Result<Message, Text> {
        let message = messages.get(messageId);
        switch (message) {
            case (?message) {
                return #ok(message);
            };
            case (null) {
                return #err("not found");
            };
        };
    };

    //get all chat

    public shared query func getChat(user1 : Principal, user2 : Principal) : async Result.Result<Chat, Text> {
        for (chat in chats.vals()) {
            if (chat.user1 == user1 and chat.user2 == user2) {
                return #ok(chat);
            } else if (chat.user2 == user1 and chat.user1 == user2) {
                return #ok(chat);
            };
        };
        return #err("Not found");
    };

    /*
    public shared func getAllMessages(user1 : Principal, user2 : Principal) : async Result.Result<[(Text, Text, Int, Principal, Text)], Text> {
        var allMessages: [(Text, Text, Int, Principal, Text)] = [];
        let chat = await getChat(user1, user2);

        switch (chat) {
            case (#ok(chat)) {
                for (messageId in chat.messages.vals()) {
                    let message = getMessage(messageId);
                    switch (message) {
                        case (#ok(msg)) {
                            let sender = await User.getUserById(message.sender); //nanti import
                            var senderName = "";
                            var senderPfp = "";
                            switch (sender) {
                                case (#ok(sender)) {
                                    senderName := sender.name;
                                    senderPfp := sender.profileUrl;
                                };
                                case (#err(msg)) {
                                    senderName := "Not found!";
                                };
                            };
                            allMessages := Array.append(allMessages, [(senderName, message.content, message.timestamp, message.user, senderPfp)]);
                        };
                        case (#err(msg)) {};
                    };
                };
            };
            case (#err(chat)) {

            };
        };
        return #ok(allMessages);
    };
    */
    
    public shared func createChat(user1: Principal, user2: Principal) : async Result.Result<Chat, Text> {
        let chatId = await Util.generateUUID();
        switch (await getChat(user1, user2)) {
            case (#ok(existingChat)) {
                return #ok(existingChat);  // Return existing chat
            };
            case (#err(_)) {
                let newChat = {
                    id = chatId;
                    user1 = user1;
                    user2 = user2;
                    messages = [];
                };
                chats.put(chatId, newChat);
                return #ok(newChat);
            };
        };
    };

    public shared func sendMessage(user1: Principal, user2: Principal, content: Text) : async Result.Result<Message, Text> {
        let chat = await getChat(user1, user2);
        switch (chat) {
            case (#ok(existingChat)) {
                let messageId = await Util.generateUUID();
                let message = {
                    id = messageId;
                    content = content;
                    sender = user1;
                    timestamp = Time.now();
                };
                let chatMessages = existingChat.messages;
                let newMessage = Array.append<Text>(chatMessages, [message.id]);
                let newChat = {
                    id = existingChat.id;
                    user1 = user1;
                    user2 = user2;
                    messages = newMessage;
                };
                chats.put(existingChat.id, newChat);
                messages.put(messageId, message);
                return #ok(message);
            };
            case (#err(_)) {
                return #err("Chat not found.");
            };
        };
    };

     

};