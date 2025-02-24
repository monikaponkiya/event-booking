import { useState } from 'react';

import { useBooking } from '../store/Booking-provider';
import { UserObj } from '../util/types';

const BookingComponent: React.FC = () => {
  const { events, bookSlot, cancelBooking, resetSystem, addEvent } = useBooking();
  const [newEventName, setNewEventName] = useState('');
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

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold">Event Booking System</h1>
      <input
        type="text"
        placeholder="Enter event name"
        value={newEventName}
        onChange={(e) => setNewEventName(e.target.value)}
        className="border p-2 w-full rounded-md mt-2"
      />
      <button
        className="mt-2 bg-green-500 text-white px-4 py-2 rounded-md"
        onClick={() => {
          addEvent(newEventName);
          setNewEventName('');
        }}
        disabled={!newEventName.trim()}
      >
        Add New Event
      </button>
      {events.map((event) => (
        <div key={event.id} className="mt-4 p-4 border rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">
            {event.name} - {event.availableSlots} spots left
          </h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={userNames[event.id] || ''}
            onChange={(e) => handleUserNameChange(event.id, e.target.value)}
            className="border p-2 w-full rounded-md mt-2"
          />
          <button
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => handleBookSlot(event.id)}
            disabled={!userNames[event.id]?.trim()}
          >
            Book Now
          </button>
          {errorMessages[event.id] && (
            <div className="mt-2 text-red-500">
              <p>{errorMessages[event.id]}</p>
              <button
                className="mt-1 bg-yellow-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleJoinWaitingList(event.id)}
              >
                Join Waiting List
              </button>
            </div>
          )}
          <h3 className="mt-4 font-semibold">Confirmed Bookings</h3>
          <ul>
            {event.bookings.map((b: UserObj) => (
              <li key={b.id} className="flex justify-between mt-2">
                {b.user}
                <button className="text-red-500" onClick={() => cancelBooking(event.id, b.id)}>
                  Cancel
                </button>
              </li>
            ))}
          </ul>
          <h3 className="mt-4 font-semibold">Waiting List</h3>
          <ul>
            {event.waitingList.map((w: UserObj) => (
              <li key={w.id} className="mt-2">
                {w.user}
              </li>
            ))}
          </ul>
        </div>
      ))}
      <button className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md" onClick={resetSystem}>
        Reset
      </button>
    </div>
  );
};

export default BookingComponent;
