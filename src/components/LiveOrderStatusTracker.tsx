import React from 'react';
import { CheckCircle, Circle, Truck, Package, Home } from 'lucide-react'; // Example icons

type OrderStatus = 'CONFIRMED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED';

interface StatusStep {
  id: OrderStatus;
  label: string;
  icon: React.ElementType;
  description?: string; // Optional description for each status
}

const STATUS_STEPS: StatusStep[] = [
  { id: 'CONFIRMED', label: 'Order Confirmed', icon: CheckCircle, description: "We've received your order." },
  { id: 'PREPARING', label: 'Preparing Food', icon: Package, description: "The restaurant is preparing your meal." },
  { id: 'OUT_FOR_DELIVERY', label: 'Out for Delivery', icon: Truck, description: "Your order is on its way!" },
  { id: 'DELIVERED', label: 'Delivered', icon: Home, description: "Enjoy your meal!" },
];

interface LiveOrderStatusTrackerProps {
  currentStatus: OrderStatus;
  estimatedDeliveryTime?: string; // e.g., "5:30 PM - 5:45 PM"
}

const LiveOrderStatusTracker: React.FC<LiveOrderStatusTrackerProps> = ({ currentStatus, estimatedDeliveryTime }) => {
  console.log("Rendering LiveOrderStatusTracker, current status:", currentStatus);

  const currentStepIndex = STATUS_STEPS.findIndex(step => step.id === currentStatus);
  const currentStepDetails = STATUS_STEPS.find(step => step.id === currentStatus);


  if (currentStatus === 'CANCELLED') {
    return (
        <div className="p-4 text-center bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-lg font-semibold text-red-700">Order Cancelled</h3>
            <p className="text-sm text-red-600">This order has been cancelled.</p>
        </div>
    );
  }


  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-2">Order Status</h3>
      {currentStepDetails && (
         <p className="text-orange-600 font-medium mb-1">{currentStepDetails.label}</p>
      )}
      {currentStepDetails?.description && (
        <p className="text-sm text-gray-600 mb-4">{currentStepDetails.description}</p>
      )}
      {estimatedDeliveryTime && currentStatus !== 'DELIVERED' && (
        <p className="text-sm text-gray-700 mb-6">
          Estimated Delivery: <span className="font-semibold">{estimatedDeliveryTime}</span>
        </p>
      )}

      <div className="relative flex items-start pt-2 pb-6">
        {/* Progress Line */}
        <div className="absolute left-4 top-2 bottom-0 w-0.5 bg-gray-200" style={{ height: `${STATUS_STEPS.length > 1 ? (STATUS_STEPS.length -1) * 4 : 0}rem` }}></div>
        <div
            className="absolute left-4 top-2 bottom-0 w-0.5 bg-orange-500 transition-all duration-500"
            style={{ height: `${currentStepIndex * 4}rem` }}
        ></div>

        <div className="space-y-10 w-full"> {/* Increased spacing with space-y-10 */}
            {STATUS_STEPS.map((step, index) => {
            const isActive = index <= currentStepIndex;
            const isCurrent = index === currentStepIndex;
            const IconComponent = step.icon;

            return (
                <div key={step.id} className="flex items-center">
                <div
                    className={`relative z-10 flex items-center justify-center w-8 h-8 rounded-full border-2
                    ${isActive ? 'bg-orange-500 border-orange-500' : 'bg-white border-gray-300'}`}
                >
                    <IconComponent className={`h-4 w-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                </div>
                <div className="ml-4">
                    <p className={`font-medium ${isCurrent ? 'text-orange-600' : isActive ? 'text-gray-700' : 'text-gray-500'}`}>
                    {step.label}
                    </p>
                </div>
                </div>
            );
            })}
        </div>
      </div>
    </div>
  );
};

export default LiveOrderStatusTracker;