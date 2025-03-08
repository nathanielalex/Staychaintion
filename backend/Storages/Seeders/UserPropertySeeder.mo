import Principal "mo:base/Principal";
import Property "canister:Property_backend";
import User "canister:User_backend";

actor {
  public func run(userId : Principal) : async () {
    let props = await Property.getProperties(3);

    for(prop in props.vals()) {
      let status = await User.transferPropertyToUser(userId, prop.id);
    };
  };
};
