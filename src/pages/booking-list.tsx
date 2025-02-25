import { useBooking } from '../store/Booking-provider';
import CancelBooking from './cancel-booking';

const BookingList = ({ eventId }: { eventId: number }) => {
  const { events } = useBooking();
  const event = events.find((e) => e.id === eventId);

  return (
    <div>
      <h3 className="mt-4 font-semibold">Confirmed Bookings</h3>
      <ul>
        {event?.bookings.map((b) => (
          <li key={b.id} className="flex justify-between mt-2">
            {b.user} <CancelBooking eventId={eventId} bookingId={b.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default BookingList;
