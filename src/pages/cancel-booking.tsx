import { useBooking } from '../store/Booking-provider';

const CancelBooking = ({ eventId, bookingId }: { eventId: number; bookingId: number }) => {
  const { cancelBooking } = useBooking();
  return (
    <button
      className="cursor-pointer text-red-500"
      onClick={() => cancelBooking(eventId, bookingId)}
    >
      Cancel
    </button>
  );
};
export default CancelBooking;
