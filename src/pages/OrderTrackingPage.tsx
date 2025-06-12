import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import OrderTrackingMap from '@/components/OrderTrackingMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, CircleDot, Circle, PackageCheck, CookingPot, Bike, MapPin } from 'lucide-react';

// Define types for milestones and order status
type OrderStatusSlug = 'confirmed' | 'preparing' | 'driver_assigned' | 'out_for_delivery' | 'arriving' | 'delivered' | 'delayed';

interface Milestone {
  id: OrderStatusSlug;
  name: string;
  icon: React.ElementType;
  completed: boolean;
  current: boolean;
  time?: string;
}

// Map OrderStatusSlug to OrderTrackingMap's orderStatus prop
const mapOrderStatusToMapProp = (status: OrderStatusSlug): 'Preparing' | 'Out for Delivery' | 'Arriving Soon' | 'Delivered' | 'Delayed' => {
  switch (status) {
    case 'confirmed':
    case 'preparing':
      return 'Preparing';
    case 'driver_assigned':
    case 'out_for_delivery':
      return 'Out for Delivery';
    case 'arriving':
      return 'Arriving Soon';
    case 'delivered':
      return 'Delivered';
    case 'delayed':
      return 'Delayed';
    default:
      return 'Preparing';
  }
};

const OrderTrackingPage: React.FC = () => {
  console.log('OrderTrackingPage loaded');

  const [currentOrderStatus, setCurrentOrderStatus] = useState<OrderStatusSlug>('preparing');
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [progressValue, setProgressValue] = useState(0);

  const orderId = "FD-6B3A9";
  const estimatedDeliveryTime = "07:45 PM";

  const initialMilestones: Omit<Milestone, 'completed' | 'current' | 'time'>[] = [
    { id: 'confirmed', name: 'Order Confirmed', icon: PackageCheck },
    { id: 'preparing', name: 'Restaurant Preparing', icon: CookingPot },
    { id: 'driver_assigned', name: 'Driver Assigned', icon: Bike },
    { id: 'out_for_delivery', name: 'Out for Delivery', icon: Bike },
    { id: 'arriving', name: 'Arriving Soon', icon: MapPin },
    { id: 'delivered', name: 'Delivered', icon: PackageCheck },
  ];

  useEffect(() => {
    const now = new Date();
    const getTimeOffset = (minutes: number) => 
      new Date(now.getTime() - minutes * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const currentIndex = initialMilestones.findIndex(m => m.id === currentOrderStatus);
    
    const updatedMilestones = initialMilestones.map((milestone, index) => {
      const completed = index < currentIndex;
      const current = index === currentIndex;
      let time;
      if (completed) time = getTimeOffset((currentIndex - index) * 10 + 5); // Mock past times
      if (current) time = getTimeOffset(2); // Mock current time
      
      return {
        ...milestone,
        completed,
        current,
        time,
        icon: completed ? CheckCircle2 : current ? CircleDot : Circle,
      };
    });

    setMilestones(updatedMilestones);

    // Calculate progress: (current step / total steps) * 100
    // Consider "Delivered" as 100%, "Arriving" as 90%, etc.
    if (currentOrderStatus === 'delivered') {
      setProgressValue(100);
    } else {
      const totalStepsForProgress = initialMilestones.length -1; // Exclude 'delivered' for intermediate steps
      setProgressValue(Math.max(0, Math.min(100, (currentIndex / totalStepsForProgress) * 100)));
    }

  }, [currentOrderStatus]);

  // Mock order status progression for demonstration
  useEffect(() => {
    const statuses: OrderStatusSlug[] = ['confirmed', 'preparing', 'driver_assigned', 'out_for_delivery', 'arriving', 'delivered'];
    let index = statuses.indexOf(currentOrderStatus);
    
    if (currentOrderStatus === 'delivered') return; // Stop if delivered

    const interval = setInterval(() => {
      index++;
      if (index < statuses.length) {
        setCurrentOrderStatus(statuses[index]);
      } else {
        clearInterval(interval);
      }
    }, 8000); // Change status every 8 seconds

    return () => clearInterval(interval);
  }, [currentOrderStatus]);


  const mapProps = {
    orderId: orderId,
    restaurantLocation: { lat: 34.0522, lng: -118.2437, address: "The Gourmet Kitchen" },
    deliveryLocation: { lat: 34.0722, lng: -118.2637, address: "123 AppDev Lane" },
    driverLocation: currentOrderStatus === 'out_for_delivery' || currentOrderStatus === 'arriving' || currentOrderStatus === 'driver_assigned' ? 
                    { lat: 34.0600, lng: -118.2500 } : undefined,
    estimatedDeliveryTime: estimatedDeliveryTime,
    orderStatus: mapOrderStatusToMapProp(currentOrderStatus),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-800 to-black text-white flex flex-col">
      <Header />
      <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pt-20 pb-20"> {/* Adjusted padding for Header/Footer */}
        <OrderTrackingMap {...mapProps} />

        <Card className="bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl text-white">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-pink-400">Order Journey</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Progress 
              value={progressValue} 
              className="w-full h-2.5 bg-gray-700 [&>div]:bg-gradient-to-r [&>div]:from-pink-500 [&>div]:to-purple-600" 
              aria-label={`Order progress: ${progressValue.toFixed(0)}%`}
            />
            <ul className="space-y-3">
              {milestones.map((milestone) => (
                <li key={milestone.id} className={`flex items-center p-2 rounded-md transition-all duration-300 ${milestone.current ? 'bg-white/10' : ''}`}>
                  <milestone.icon 
                    className={`mr-3 h-5 w-5 flex-shrink-0 
                      ${milestone.completed ? 'text-green-400' : 
                        milestone.current ? 'text-pink-400 animate-pulse' : 
                        'text-gray-500'}`} 
                  />
                  <span 
                    className={`flex-grow
                      ${milestone.completed ? 'line-through text-gray-400' : 
                        milestone.current ? 'font-semibold text-pink-300' : 
                        'text-gray-300'}`}
                  >
                    {milestone.name}
                  </span>
                  {milestone.time && (
                    <span className="ml-auto text-xs text-gray-400">{milestone.time}</span>
                  )}
                </li>
              ))}
            </ul>
            {currentOrderStatus === 'delivered' && (
                 <p className="text-center text-green-400 font-semibold pt-2">Your order has been delivered. Enjoy your meal!</p>
            )}
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTrackingPage;