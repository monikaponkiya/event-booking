import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { LOCAL_STORAGE_KEY, TOTAL_SLOT } from '../util/constant';
import { UserObj } from '../util/types';

const total_slot = TOTAL_SLOT || 10;
const local_storage_key = LOCAL_STORAGE_KEY;

interface IContextProp {
  events: {
    id: number;
    name: string;
    availableSlots: number;
    bookings: UserObj[];
    waitingList: UserObj[];
  }[];
  addEvent: (eventName: string) => void;
  bookSlot: (eventId: number, user: string) => void;
  cancelBooking: (eventId: number, bookingId: number) => void;
  resetSystem: () => void;
}

const BookingContext = createContext<IContextProp>({
  events: [],
  addEvent: () => {},
  bookSlot: () => {},
  cancelBooking: () => {},
  resetSystem: () => {}
});

interface IProps {
  children: React.ReactNode;
}

export const BookingProvider: React.FC<IProps> = ({ children }) => {
  const [events, setEvents] = useState<IContextProp['events']>([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem(local_storage_key) ?? '[]');
    if (storedData) setEvents(storedData);
  }, []);

  useEffect(() => {
    localStorage.setItem(local_storage_key, JSON.stringify(events));
  }, [events]);

  const addEvent = (eventName: string) => {
    setEvents([
      ...events,
      { id: Date.now(), name: eventName, availableSlots: total_slot, bookings: [], waitingList: [] }
    ]);
  };

  const bookSlot = (eventId: number, user: string) => {
    setEvents(
      events.map((event) => {
        if (event.id === eventId) {
          if (event.availableSlots > 0) {
            return {
              ...event,
              availableSlots: event.availableSlots - 1,
              bookings: [...event.bookings, { id: Date.now(), user }]
            };
          } else {
            return { ...event, waitingList: [...event.waitingList, { id: Date.now(), user }] };
          }
        }
        return event;
      })
    );
  };

  const cancelBooking = (eventId: number, bookingId: number) => {
    setEvents(
      events.map((event) => {
        if (event.id === eventId) {
          const updatedBookings = event.bookings.filter((b) => b.id !== bookingId);
          let newWaitingList = [...event.waitingList];
          let newBookings = updatedBookings;
          let newAvailableSlots = event.availableSlots + 1;

          if (newWaitingList.length > 0) {
            const nextUser = newWaitingList.shift() as UserObj;
            newBookings.push(nextUser);
            newAvailableSlots--;
          }

          return {
            ...event,
            bookings: newBookings,
            waitingList: newWaitingList,
            availableSlots: newAvailableSlots
          };
        }
        return event;
      })
    );
  };

  const resetSystem = () => {
    setEvents([]);
  };

  const memoizedValue = useMemo(
    () => ({ events, addEvent, bookSlot, cancelBooking, resetSystem }),
    [events]
  );

  return <BookingContext.Provider value={memoizedValue}>{children}</BookingContext.Provider>;
};

export const useBooking = () => useContext(BookingContext);
