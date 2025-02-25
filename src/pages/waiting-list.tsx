import { useBooking } from '../store/Booking-provider';
import CancelBooking from './cancel-booking';

const WaitingList = ({ eventId }: { eventId: number }) => {
  const { events } = useBooking();
  const event = events.find((e) => e.id === eventId);

  return (
    <div>
      <h3 className="mt-4 font-semibold">Waiting List</h3>
      <ul>
        {event?.waitingList.map((w) => (
          <li className="flex justify-between mt-2" key={w.id}>
            {w.user}
            <CancelBooking eventId={eventId} bookingId={w.id} />
          </li>
        ))}
      </ul>
    </div>
  );
};
export default WaitingList;
