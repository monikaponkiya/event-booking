import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { LOCAL_STORAGE_KEY, TOTAL_SLOT } from '../util/constant';
import { UserObj } from '../util/types';

const total_slot = TOTAL_SLOT || 10;
const local_storage_key = LOCAL_STORAGE_KEY;

interface IEvent {
  id: number;
  name: string;
  availableSlots: number;
  bookings: UserObj[];
  waitingList: UserObj[];
}

interface IContextProp {
  events: IEvent[];
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
  const [events, setEvents] = useState<IEvent[]>([]);

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
      events.map((event) =>
        event.id === eventId
          ? {
              ...event,
              availableSlots: event.availableSlots > 0 ? event.availableSlots - 1 : 0,
              bookings:
                event.availableSlots > 0
                  ? [...event.bookings, { id: Date.now(), user }]
                  : event.bookings,
              waitingList:
                event.availableSlots === 0
                  ? [...event.waitingList, { id: Date.now(), user }]
                  : event.waitingList
            }
          : event
      )
    );
  };

  const cancelBooking = (eventId: number, bookingId: number) => {
    setEvents(
      events.map((event) => {
        if (event.id === eventId) {
          const updatedBookings = event.bookings.filter((b) => b.id !== bookingId);
          let updatedWaitingList = [...event.waitingList];
          let updatedAvailableSlots = event.availableSlots + 1;

          if (updatedWaitingList.length > 0) {
            const nextUser = updatedWaitingList.shift() as UserObj;
            updatedBookings.push(nextUser);
            updatedAvailableSlots--;
          }

          return {
            ...event,
            bookings: updatedBookings,
            waitingList: updatedWaitingList,
            availableSlots: updatedAvailableSlots
          };
        }
        return event;
      })
    );
  };

  const resetSystem = () => setEvents([]);

  const memoizedValue = useMemo(
    () => ({ events, addEvent, bookSlot, cancelBooking, resetSystem }),
    [events]
  );

  return <BookingContext.Provider value={memoizedValue}>{children}</BookingContext.Provider>;
};

export const useBooking = () => useContext(BookingContext);
