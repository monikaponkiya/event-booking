import './App.css';
import BookingComponent from './pages/booking-event';
import { BookingProvider } from './store/Booking-provider';

const App = () => {
  return (
    <BookingProvider>
      <BookingComponent />
    </BookingProvider>
  );
};

export default App;
