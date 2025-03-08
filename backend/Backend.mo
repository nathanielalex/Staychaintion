import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Option "mo:base/Option";
import Text "mo:base/Text";
import User "canister:User_backend";

actor class Backend() {
  public shared func greet(name : Text) : async Text {
    let message = "Hello, " # name # "!";
    return message;
  };

  public shared (msg) func whoami() : async Principal {
    msg.caller;
  };

  public shared func checkBalance(user : Principal) : async Float {
    let bal: Float = await User.getUserBalance(user);
    return bal;
  };

  // Public function to get a user's profile
  // public query func getProfile(userPrincipal : Principal) : async ?UserProfile {
  //   return userProfiles.get(userPrincipal);
  // };

  // Public function to get the caller's profile
  // public shared query(msg) func getMyProfile() : async ?UserProfile {
  //   return userProfiles.get(msg.caller);
  // };

  // Public function to check if a user has registered a profile
  public shared func hasProfile(userPrincipal : Principal) : async Bool {
    return Option.isSome(await User.getUser(userPrincipal));
  };
};
