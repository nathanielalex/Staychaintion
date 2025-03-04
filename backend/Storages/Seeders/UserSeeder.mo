import Util "../Util";
import User "canister:User_backend";
import Principal "mo:base/Principal";
import Blob "mo:base/Blob";

actor {

  public func run() : async () {
    
    let users : [Util.UserProfile] = [
      {
        id = Principal.fromText("aaaaa-aa");
        role = #admin;
        fullName = "superadmin";
        email = "superadmin@gmail.com";
        dateOfBirth = "2005-05-06";
        ballance = 10000000;
        profilePictureUrl = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";
        propertiesId = null;
      },
      {
        id = Principal.fromBlob(Blob.fromArray([1])); // Fake Principal
        role = #user;
        fullName = "iAmUser";
        email = "user123@gmail.com";
        dateOfBirth = "2005-05-06";
        ballance = 10000000;
        profilePictureUrl = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";
        propertiesId = null;
      },
      {
        id = Principal.fromBlob(Blob.fromArray([2])); // Fake Principal
        role = #renter;
        fullName = "iAmRenter";
        email = "renter123@gmail.com";
        dateOfBirth = "2005-05-06";
        ballance = 10000000;
        profilePictureUrl = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";
        propertiesId = null;
      },
      {
        id = Principal.fromBlob(Blob.fromArray([3])); // Fake Principal
        role = #guest;
        fullName = "iAmGuest";
        email = "guest123@gmail.com";
        dateOfBirth = "2005-05-06";
        ballance = 10000000;
        profilePictureUrl = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";
        propertiesId = null;
      }
    ];

    for (user in users.vals()) {
      let userId = await User.registerUser(user);
    };
  };
};
