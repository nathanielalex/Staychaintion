import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Nat "mo:base/Nat";
import Iter "mo:base/Iter";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Util "../Util";
// import Property "canister:Property_backend";

actor {

    type Voucher = Util.Voucher;

    var voucherList = TrieMap.TrieMap<Text, Voucher>(Text.equal, Text.hash);

    stable var stablevoucherList: [(Text, Voucher)] = [];

    system func preupgrade() {
        stablevoucherList := Iter.toArray(voucherList.entries());
    };

    system func postupgrade() {
        voucherList := TrieMap.fromEntries<Text, Voucher>(Iter.fromArray(stablevoucherList), Text.equal, Text.hash);
    };

    public shared func registerVoucher(voucher: Voucher) : async Nat {
        if (voucher.voucherType == "percentage" and (voucher.discount < 0 or voucher.discount > 1)) return 0;

        let id = await Util.generateUUID();

        voucherList.put(id, voucher);
        return 1;
    };

    public shared func checkValidity(code: Text): async Int {
        let currTime = Time.now() / 1_000_000_000;
        for (v in voucherList.vals()) {
            if (v.code == code) {
                if (currTime >= v.start_date and currTime < v.end_date) return 1; 
                return -1;
            }
        };
        return 0;
    }

};