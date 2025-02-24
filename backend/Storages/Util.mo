import UUID "mo:uuid/UUID";
import Source "mo:uuid/async/SourceV4";
import Text "mo:base/Text";

module {
    
    public type UserProfile = {
        id: Principal;
        fullName: Text;
        email: Text;
        dateOfBirth: Text;
        profilePictureUrl: Text;
    };

    public type Renter = {
        id: Principal;
        fullName: Text;
        email: Text;
        dateOfBirth: Text;
        profileUrl: Text;
        propertiesId: [Text];
    };
    
    public type Property = {
        id: Text;
        name : Text;
        description: Text;
        location: Text;
        builtInDate: Text;
        pictures: [Text];
    };

    public func generateUUID() : async Text {
        let id = Source.Source();
        return UUID.toText(await id.new());
    };
};