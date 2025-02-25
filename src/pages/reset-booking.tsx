import { useBooking } from '../store/Booking-provider';

const ResetBooking = () => {
  const { resetSystem } = useBooking();
  return (
    <button
      className="cursor-pointer absolute top-0 right-5 m-4 bg-gray-500 text-white px-4 py-2 rounded-md"
      onClick={resetSystem}
    >
      Reset
    </button>
  );
};
export default ResetBooking;
