import { Property_backend } from "@/declarations/Property_backend";
import { Property } from "@/declarations/Property_backend/Property_backend.did";
import { AxiosError } from "axios";
import { Calendar, Clock, CreditCard, Home, MapPin, Tag, User, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "@radix-ui/react-select";
import { Button } from "../ui/button";
import { useDebounce } from "use-debounce";
import { DatePickerWithRange } from "../ui/date-range-picker";
import { DateRange } from "react-day-picker";
import { format, differenceInDays } from "date-fns"

interface Discount {
    promotion?: {
        code: string;
        discount?: number;
        type?: 'fixed' | 'percent',
        isValid?: boolean;
    },
    voucher?: {
        code?: string;
        discount?: number;
        type?: 'fixed' | 'percent',
        isValid?: boolean;
    },
    total?: number;
};

interface Reservation {
    propertyId: string;
    price: number;
    dateRange: DateRange;
};

export default function TransactionPage() {
    const { id } = useParams();

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [property, setProperty] = useState<Property>();
    const [voucher, setVoucher] = useState<string>();
    const [discount, setDiscount] = useState<Discount>({});
    const [reservation, setReservation] = useState<Reservation>({
        propertyId: id!,
        price: property?.pricePerNight ?? 0,
        dateRange: {
            from: new Date(),
            to: new Date(),
        },
    });
    const [debouncedVoucherCode] = useDebounce(discount?.voucher?.code, 600);

    const fetchProperty = async() => {
        try {
            setIsLoading(true);
            const property = await Property_backend.getProperty([id!]);
            setProperty(property[0]);
        } catch (err) {
            toast.error('Error fetching property details.', {
                position: 'top-center',
            });
        } finally {
            setIsLoading(false);
        }
    }

    const fetchVoucher = async(debouncedVoucherCode: string) => {
        try {
            setIsLoading(true);
            const property = await Property_backend.getProperty([id!]);
            setProperty(property[0]);
        } catch (err) {
            toast.error('Error fetching property details.', {
                position: 'top-center',
            });
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchVoucher(debouncedVoucherCode!);
    }, [debouncedVoucherCode]);

    useEffect(() => {
        fetchProperty();
    }, [id]);

    return (
        <div className="min-h-screen flex flex-col">

            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Complete your payment</h1>

                <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Discouts</CardTitle>
                            <CardDescription>Get cheaper price using promotions or vouchers.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-col items-start space-y-4">
                                    <Label htmlFor="credit-card" className="flex items-center gap-2">
                                        <Tag className="h-5 w-5" />
                                        Voucher
                                    </Label>
                                    <Input onChange={e => {
                                        e.preventDefault();
                                        setDiscount(
                                            disc => ({
                                                ...disc,
                                                voucher: {
                                                    code: e.target.value,
                                                    discount: 0,
                                                    isValid: false,
                                                }
                                            })
                                        );
                                    }} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Details</CardTitle>
                            <CardDescription>Customize your reservations.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-col items-start space-y-4">
                                    <Label htmlFor="credit-card" className="flex items-center gap-2">
                                        <Clock className="h-5 w-5" />
                                        Reservation Period
                                    </Label>
                                    
                                    <DatePickerWithRange onDateChange={(range: DateRange) => {
                                        setReservation(res => ({
                                            ...res,
                                            dateRange: range,
                                        }));
                                    }} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    </div>

                    <div className="md:col-span-1">
                    <Card className="sticky top-6">
                        <CardHeader>
                        <CardTitle>Booking summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                        <div className="flex gap-4">
                            <div className="w-24 h-24 bg-gray-200 rounded-md flex-shrink-0"></div>
                            <div>
                            <h3 className="font-semibold">{property?.name}</h3>
                            <div className="flex items-center text-sm text-gray-500">
                                <MapPin className="h-3 w-3 mr-1" />
                                <span>{property?.location}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                                <Users className="h-3 w-3 mr-1" />
                                <span>{Number(property?.guestCapacity)} guests • {Number(property?.bedroomCount)} bedroom • {Number(property?.bedCount)} bed • {Number(property?.bathroomCount)} bath</span>
                            </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4" />
                            <span>{format(reservation?.dateRange?.from!, "LLL dd, y")} - {format(reservation?.dateRange?.to!, "LLL dd, y")} ({differenceInDays(reservation?.dateRange?.to!, reservation?.dateRange?.from!)} nights)</span>
                        </div>

                        <Separator />

                        <div className="space-y-2">
                            <div className="flex flex-col justify-between">
                                <span>Subtotal:</span>
                                <div className="flex justify-between">
                                    <span>Rp {property?.pricePerNight.toLocaleString()} × {differenceInDays(reservation?.dateRange?.to!, reservation?.dateRange?.from!)} nights</span>
                                    <span>Rp {((property?.pricePerNight ?? 0) * differenceInDays(reservation?.dateRange?.to!, reservation?.dateRange?.from!)).toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="flex flex-col justify-between">
                                <span>{discount.voucher?.isValid ? `Voucher (${discount.voucher.code}):` : 'Voucher:' }</span>
                                <div className="flex justify-between">
                                    <span>{discount.voucher?.isValid ? discount.voucher.code : '-'}</span>
                                    <span>Rp {(discount.voucher?.type === "fixed" ? (discount.voucher.discount ?? 0) : (property?.pricePerNight ?? 0) * differenceInDays(reservation?.dateRange?.to!, reservation?.dateRange?.from!) * (discount.voucher?.discount ?? 0)).toLocaleString()}</span>
                                </div>
                            </div>
                            {/* <div className="flex justify-between">
                                <span>Cleaning fee</span>
                                <span>Rp {property.cleaning_fee.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Service fee</span>
                                <span>Rp {property.service_fee.toLocaleString()}</span>
                            </div> */}
                        </div>

                        <Separator />

                        <div className="flex justify-between font-semibold">
                            <span>Total before taxes</span>
                            <span>Rp {((property?.pricePerNight ?? 0) * differenceInDays(reservation?.dateRange?.to!, reservation?.dateRange?.from!) - (discount.total ?? 0)).toLocaleString()}</span>
                        </div>

                        <div className="bg-blue-50 p-3 rounded-md text-sm text-blue-700 flex items-start gap-2">
                            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <span className="text-blue-700">i</span>
                            </div>
                            <p>This is a rare find. Snow Lee's place is usually fully booked.</p>
                        </div>
                        </CardContent>
                        <CardFooter>
                        <Button
                            className="w-full bg-blue-600 hover:bg-blue-700 text-lg"
                        >
                            Complete payment
                        </Button>
                        </CardFooter>
                    </Card>
                    </div>
                </div>
                </div>
            </main>
            </div>
    );
}