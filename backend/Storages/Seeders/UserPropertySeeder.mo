import Principal "mo:base/Principal";
import Property "canister:Property_backend";
import User "canister:User_backend";

actor {
  public func run(userId : Principal, count: Nat) : async () {
    let props = await Property.getProperties(count);

    for(prop in props.vals()) {
      let status = await User.transferPropertyToUser(userId, prop.id);
    };
  };
};
