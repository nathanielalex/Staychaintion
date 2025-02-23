import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Option "mo:base/Option";
import Text "mo:base/Text";
actor class Backend() {
  public shared func greet(name : Text) : async Text {
    let message = "Hello, " # name # "!";
    return message;
  };

  public shared (msg) func whoami() : async Principal {
    msg.caller
  };
  private let userBalances = HashMap.HashMap<Principal, Nat>(
    0, Principal.equal, Principal.hash
  );

  public query func checkBalance(user : Principal) : async Nat {
    switch (userBalances.get(user)) {
      case null { return 0 };
      case (?balance) { return balance };
    }
  };

  type UserProfile = {
    name : Text;
    dateOfBirth: Text;
    // profilePicture : Text; // URL or base64 encoded image
  };

  // Map to store user profiles, keyed by their Principal
  private var userProfiles = HashMap.HashMap<Principal, UserProfile>(0, Principal.equal, Principal.hash);

  /// Public function to register or update a user profile
  public shared(msg) func registerProfile(name : Text, dateOfBith : Text) : async () {
    let userPrincipal = msg.caller;
    let profile : UserProfile = {
      name = name;
      dateOfBirth = dateOfBith;
    };
    userProfiles.put(userPrincipal, profile);
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
  public query func hasProfile(userPrincipal : Principal) : async Bool {
    return Option.isSome(userProfiles.get(userPrincipal));
  };
};
