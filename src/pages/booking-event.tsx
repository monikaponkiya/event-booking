import { useBooking } from '../store/Booking-provider';
import AddEvent from './add-event';
import BookSlot from './book-slot';
import BookingList from './booking-list';
import WaitingList from './waiting-list';

const BookingComponent: React.FC = () => {
  const { events } = useBooking();
  return (
    <>
      <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold">Event Booking System</h1>
        <AddEvent />
      </div>
      {events.length > 0 && (
        <div className="p-6 mx-auto bg-white shadow-md rounded-lg mt-4">
          <div className="flex overflow-x-auto space-x-4">
            {events.map((event) => (
              <div key={event.id} className="min-w-[300px] p-4 border rounded-lg shadow-md">
                <h2 className="text-lg font-semibold">
                  {event.name} - {event.availableSlots} spots left
                </h2>
                <BookSlot eventId={event.id} />
                <BookingList eventId={event.id} />
                <WaitingList eventId={event.id} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default BookingComponent;
