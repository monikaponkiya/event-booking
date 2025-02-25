import { useState } from 'react';

import { useBooking } from '../store/Booking-provider';
import ResetBooking from './reset-booking';

const AddEvent = () => {
  const { addEvent } = useBooking();
  const [eventName, setEventName] = useState('');

  return (
    <div>
      <ResetBooking />
      <input
        type="text"
        placeholder="Enter event name"
        value={eventName}
        onChange={(e) => setEventName(e.target.value)}
        className="border p-2 w-full rounded-md mt-2"
      />
      <button
        className="cursor-pointer mt-2 bg-green-500 text-white px-4 py-2 rounded-md"
        onClick={() => {
          addEvent(eventName);
          setEventName('');
        }}
        disabled={!eventName.trim()}
      >
        Add Event
      </button>
    </div>
  );
};
export default AddEvent;
