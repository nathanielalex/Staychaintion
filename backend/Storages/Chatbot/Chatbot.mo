import Util "../Util";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
actor {
    type ChatbotMessage = Util.ChatbotMessage;

    var chatbots = TrieMap.TrieMap<Text, ChatbotMessage>(Text.equal, Text.hash);
    var stableChatbots: [(Text, ChatbotMessage)] = [];

    system func preupgrade()  {
        stableChatbots := Iter.toArray(chatbots.entries());
    };

    system func postupgrade() {
        chatbots := TrieMap.fromEntries<Text, ChatbotMessage>(Iter.fromArray(stableChatbots), Text.equal, Text.hash);
    };

    public shared func storeMessage(message: ChatbotMessage): async Text {
        let id = await Util.generateUUID();
        
        chatbots.put(id, message);

        return id;
    };

    public query func fetchMessages(user: Principal): async [ChatbotMessage] {
        var messages: [ChatbotMessage] = [];

        for (c in chatbots.vals()) {
            if (c.user == user) {
                messages := Array.append<ChatbotMessage>(messages, [c]);
            }
        };

        return messages;
    };
};