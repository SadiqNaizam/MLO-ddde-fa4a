import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Truck, Clock } from 'lucide-react';

interface Location {
  lat: number;
  lng: number;
  address?: string;
}

interface OrderTrackingMapProps {
  orderId: string;
  restaurantLocation: Location;
  deliveryLocation: Location;
  driverLocation?: Location;
  estimatedDeliveryTime: string;
  orderStatus: 'Preparing' | 'Out for Delivery' | 'Arriving Soon' | 'Delivered' | 'Delayed';
}

const OrderTrackingMap: React.FC<OrderTrackingMapProps> = ({
  orderId,
  restaurantLocation,
  deliveryLocation,
  driverLocation,
  estimatedDeliveryTime,
  orderStatus,
}) => {
  console.log('OrderTrackingMap loaded for order ID:', orderId);

  // Placeholder positions for markers (percentage-based for responsiveness within the mock map)
  const getMarkerStyle = (location?: Location): React.CSSProperties => {
    if (!location) return { display: 'none' };
    // These are just illustrative. Real map would use actual lat/lng to pixel conversion.
    // For this placeholder, we'll use fixed-ish positions for simplicity.
    // Driver: center-ish, Restaurant: top-left-ish, Delivery: bottom-right-ish
    let top = '50%', left = '50%';
    if (location === restaurantLocation) { top = '20%'; left = '15%'; }
    if (location === deliveryLocation) { top = '75%'; left = '80%'; }
    if (location === driverLocation) { top = '45%'; left = '48%'; }


    return {
      position: 'absolute',
      top: top,
      left: left,
      transform: 'translate(-50%, -50%)',
      zIndex: 10,
    };
  };

  return (
    <div className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden shadow-2xl">
      {/* Mock Map Background - Can be an image or a gradient */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900"
        aria-label="Order tracking map placeholder"
      >
        {/* You could add a subtle pattern or a static map image tile here as background-image */}
      </div>

      {/* Restaurant Marker */}
      <div style={getMarkerStyle(restaurantLocation)} title={`Restaurant: ${restaurantLocation.address || 'Origin'}`}>
        <MapPin className="h-8 w-8 text-red-500 fill-red-300" />
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-white bg-black/50 px-2 py-1 rounded">Restaurant</span>
      </div>

      {/* Delivery Location Marker */}
      <div style={getMarkerStyle(deliveryLocation)} title={`Delivery to: ${deliveryLocation.address || 'Destination'}`}>
        <MapPin className="h-8 w-8 text-green-500 fill-green-300" />
        <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-white bg-black/50 px-2 py-1 rounded">You</span>
      </div>

      {/* Driver Marker (only if driver location is available) */}
      {driverLocation && ['Out for Delivery', 'Arriving Soon', 'Delayed'].includes(orderStatus) && (
        <div style={getMarkerStyle(driverLocation)} title="Driver's current location">
          <Truck className="h-10 w-10 text-blue-400 animate-pulse" />
           <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-white bg-black/50 px-2 py-1 rounded">Driver</span>
        </div>
      )}

      {/* Translucent Information Overlay */}
      <Card className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 bg-white/10 backdrop-blur-md border border-white/20 shadow-xl text-white">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-white/90">Order Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/80">Order ID:</p>
            <p className="text-sm font-semibold">{orderId}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm text-white/80">Status:</p>
            <p className="text-sm font-semibold">{orderStatus}</p>
          </div>
          <div className="flex items-center justify-between">
            <Clock className="h-4 w-4 text-white/70 mr-2" />
            <p className="text-sm text-white/80">Est. Delivery:</p>
            <p className="text-sm font-semibold">{estimatedDeliveryTime}</p>
          </div>
          {orderStatus === 'Delayed' && (
            <p className="text-xs text-amber-300 pt-1">
              We apologize for the delay. Your order is taking longer than expected.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Placeholder for other potential overlays, e.g., driver details */}
      {/* <div className="absolute top-4 left-4 p-4 bg-black/30 backdrop-blur-sm rounded-lg text-white text-xs">
        Driver: John Doe - ETA: 5 mins
      </div> */}
    </div>
  );
};

export default OrderTrackingMap;