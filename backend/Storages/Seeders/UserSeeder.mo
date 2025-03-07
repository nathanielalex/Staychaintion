import Util "../Util";
import User "canister:User_backend";
import Principal "mo:base/Principal";
import Blob "mo:base/Blob";

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
      ballance = 10000000;
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
      ballance = 10000000;
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
      ballance = 10000000;
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
      ballance = 10000000;
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
      ballance = 5000000;
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
      ballance = 7500000;
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
      ballance = 3200000;
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
      ballance = 6700000;
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
      ballance = 2500000;
      profilePictureUrl = "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg";
      propertiesId = null;
      }
    ];

    for (user in users.vals()) {
      let userId = await User.registerUser(user);
    };
  };
};
