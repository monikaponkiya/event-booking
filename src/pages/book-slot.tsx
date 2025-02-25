import { useState } from 'react';

import { useBooking } from '../store/Booking-provider';

const BookSlot = ({ eventId }: { eventId: number }) => {
  const { events, bookSlot } = useBooking();
  const [userNames, setUserNames] = useState<{ [key: number]: string }>({});
  const [errorMessages, setErrorMessages] = useState<{ [key: number]: string }>({});

  const handleUserNameChange = (eventId: number, value: string) => {
    setUserNames((prev) => ({ ...prev, [eventId]: value }));
  };

  const handleBookSlot = (eventId: number) => {
    const userName = userNames[eventId]?.trim();
    if (!userName) return;

    const event = events.find((e) => e.id === eventId);
    if (event) {
      if (event.availableSlots > 0) {
        bookSlot(eventId, userName);
        handleUserNameChange(eventId, '');
        setErrorMessages((prev) => ({ ...prev, [eventId]: '' }));
      } else {
        setErrorMessages((prev) => ({
          ...prev,
          [eventId]: 'No slots available. Do you want to join the waiting list?'
        }));
      }
    }
  };

  const handleJoinWaitingList = (eventId: number) => {
    bookSlot(eventId, userNames[eventId] || '');
    handleUserNameChange(eventId, '');
    setErrorMessages((prev) => ({ ...prev, [eventId]: '' }));
  };

  const handleCancelWaitingList = (eventId: number) => {
    handleUserNameChange(eventId, '');
    setErrorMessages((prev) => ({ ...prev, [eventId]: '' }));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={userNames[eventId] || ''}
        onChange={(e) => handleUserNameChange(eventId, e.target.value)}
        className="border p-2 w-full rounded-md mt-2"
      />
      <button
        className="cursor-pointer mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
        onClick={() => handleBookSlot(eventId)}
        disabled={!userNames[eventId]?.trim()}
      >
        Book Now
      </button>
      {errorMessages[eventId] && (
        <div className="mt-2 text-red-500">
          <p>{errorMessages[eventId]}</p>
          <button
            className="cursor-pointer mt-1 bg-yellow-500 text-white px-4 py-2 rounded-md"
            onClick={() => handleJoinWaitingList(eventId)}
          >
            Join Waiting List
          </button>
          <button
            className="cursor-pointer mt-1 ml-1 bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={() => handleCancelWaitingList(eventId)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};
export default BookSlot;
