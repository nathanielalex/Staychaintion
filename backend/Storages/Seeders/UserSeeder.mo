import Util "../Util";
import User "canister:User_backend";
import Principal "mo:base/Principal";
import Blob "mo:base/Blob";
import Nat "mo:base/Nat";
import Text "mo:base/Text";
import Float "mo:base/Float";

actor {

  public func run() : async () {
    
    let users : [Util.UserProfile] = [
      {
      id = Principal.fromText("aaaaa-aa");
      walletId = null;
      role = "admin";
      fullName = "superadmin";
      email = "superadmin@gmail.com";
      dateOfBirth = "2005-05-06";
      balance = 10000000;
      profilePictureUrl = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";
      propertiesId = null;
      },
      {
      id = Principal.fromBlob(Blob.fromArray([1])); 
      walletId = null;
      role = "user";
      fullName = "iAmUser";
      email = "user123@gmail.com";
      dateOfBirth = "2005-05-06";
      balance = 10000000;
      profilePictureUrl = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";
      propertiesId = null;
      },
      {
      id = Principal.fromBlob(Blob.fromArray([2])); 
      walletId = null;
      role = "renter";
      fullName = "iAmRenter";
      email = "renter123@gmail.com";
      dateOfBirth = "2005-05-06";
      balance = 10000000;
      profilePictureUrl = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";
      propertiesId = null;
      },
      {
      id = Principal.fromBlob(Blob.fromArray([3])); 
      walletId = null;
      role = "guest";
      fullName = "iAmGuest";
      email = "guest123@gmail.com";
      dateOfBirth = "2005-05-06";
      balance = 10000000;
      profilePictureUrl = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";
      propertiesId = null;
      },
      {
      id = Principal.fromBlob(Blob.fromArray([4])); 
      walletId = null;
      role = "user";
      fullName = "John Smith";
      email = "johnsmith@example.com";
      dateOfBirth = "1990-03-15";
      balance = 5000000;
      profilePictureUrl = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";
      propertiesId = null;
      },
      {
      id = Principal.fromBlob(Blob.fromArray([5])); 
      walletId = null;
      role = "renter";
      fullName = "Sarah Johnson";
      email = "sarahj@example.com";
      dateOfBirth = "1988-11-23";
      balance = 7500000;
      profilePictureUrl = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";
      propertiesId = null;
      },
      {
      id = Principal.fromBlob(Blob.fromArray([6])); 
      walletId = null;
      role = "user";
      fullName = "Michael Brown";
      email = "mbrown@example.com";
      dateOfBirth = "1995-07-30";
      balance = 3200000;
      profilePictureUrl = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";
      propertiesId = null;
      },
      {
      id = Principal.fromBlob(Blob.fromArray([7])); 
      walletId = null;
      role = "renter";
      fullName = "Emily Davis";
      email = "edavis@example.com";
      dateOfBirth = "1992-09-18";
      balance = 6700000;
      profilePictureUrl = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";
      propertiesId = null;
      },
      {
      id = Principal.fromBlob(Blob.fromArray([8])); 
      walletId = null;
      role = "guest";
      fullName = "David Wilson";
      email = "dwilson@example.com";
      dateOfBirth = "1985-04-12";
      balance = 2500000;
      profilePictureUrl = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";
      propertiesId = null;
      }
    ];

    for (user in users.vals()) {
      let userId = await User.registerUser(user);
    };
  };

  public shared(msg) func changeRole(role: Text): async Text{
    if(Util.userRoleVal(role)){
      let user = await User.getUser(msg.caller);
      switch(user){
        case (null){
          return "You are not registered";
        };
        case (?usr){
          let updatedUserStatus = await User.updateUser({
            usr with
            role = role
          });
          return "You are now an " # role;
        };
      };
    } else {
      return "Invalid role " # role;
    };

  };

  public shared(msg) func addBalance(amount: Float): async Text{
    let user = await User.getUser(msg.caller);
    switch(user){
      case (null){
        return "You are not registered";
      };
      case (?usr){
        let updatedUserStatus = await User.updateUser({
          usr with
          balance = usr.balance + amount
        });
        return "Your balance is now " # Float.toText(usr.balance + amount);
      };
    };
  };

};
