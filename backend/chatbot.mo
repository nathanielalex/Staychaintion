import Debug "mo:base/Debug";
import List "mo:base/List";

actor Chatbot {
  // Stable variable for storing chat history
  stable var chatHistory : List.List<(Text, Text)> = List.nil<(Text, Text)>();

  // Function to handle user input and generate a response
  public func chat(message : Text) : async Text {
    Debug.print("User: " # message);

    let response = "I am Staychaintion AI. How can I assist you?";

    // Correct way to append data to a List
    chatHistory := List.push((message, response), chatHistory);

    return response;
  };

  // Query function to get chat history
  public query func getHistory() : async [(Text, Text)] {
    return List.toArray(chatHistory);
  }
}
