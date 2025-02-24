import UUID "mo:uuid/UUID";
import Source "mo:uuid/async/SourceV4";
import Text "mo:base/Text";

module {
    public type UserProfile = {
        id: Principal;
        fullName : Text;
        email : Text;
        dateOfBirth: Text;
        profilePictureUrl : Text;
    };

    public type Renter = {
        id: Principal;
        fullName : Text;
        dateOfBirth: Text;
        email : Text;
        profileUrl : Text;
        propertiesId : [var Text];
    };
    
    public type Property = {
        id: Text;
        name : Text;
        builtInDate : Text;
        pictures : [var Text];
    };

    public func generateUUID() : async Text {
        let id = Source.Source();
        return UUID.toText(await id.new());
    };
};