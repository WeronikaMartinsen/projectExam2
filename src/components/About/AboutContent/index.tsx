import "../../../styles/index.css";
import CallToAction from "../../CallToAction";
import {
  FaCheckCircle,
  FaUsers,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";

function AboutContent() {
  return (
    <div className="p-8 bg-gray-50 text-primary max-w-7xl mx-auto w-full rounded-lg shadow-md">
      {/* Main Heading */}
      <h1 className="text-3xl font-extrabold mb-8 text-center text-primary">
        About <span className="text-accent">Holidaze</span>
      </h1>

      {/* Intro Section */}
      <section className="mb-12">
        <p className="text-lg leading-relaxed text-gray-700 mb-6">
          <strong>Holidaze</strong> is your one-stop destination for booking
          extraordinary accommodations across the globe. Whether you're seeking
          a beachfront villa, a cozy mountain cabin, or a luxurious city
          apartment, we’ve got you covered. Our mission is simple – to make your
          vacation planning seamless and stress-free, while empowering hosts to
          effortlessly manage their properties.
        </p>
        <p className="text-lg leading-relaxed text-gray-700">
          Combining modern design with cutting-edge technology, Holidaze
          delivers an intuitive platform for travelers and hosts alike. Enjoy
          personalized recommendations, detailed venue listings, and a
          user-friendly experience that simplifies your journey.
        </p>
      </section>

      {/* For Guests */}
      <section className="bg-white p-6 rounded-lg shadow-sm mb-12">
        <h2 className="text-xl font-bold mb-4 text-accent">For Our Guests</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Booking your next vacation should be exciting, not overwhelming. Our
          platform ensures a smooth and hassle-free experience, helping you find
          the perfect venue for your needs, preferences, and budget.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start">
            <FaCheckCircle className="text-accent mr-3 mt-1" />
            <span>
              <strong>Easy Search & Booking:</strong> Quickly find your perfect
              venue with instant booking confirmation.
            </span>
          </li>
          <li className="flex items-start">
            <FaMapMarkerAlt className="text-accent mr-3 mt-1" />
            <span>
              <strong>Venue Transparency:</strong> Comprehensive listings with
              photos, amenities, and reviews to guide your choice.
            </span>
          </li>
          <li className="flex items-start">
            <FaClock className="text-accent mr-3 mt-1" />
            <span>
              <strong>Real-Time Availability:</strong> Always know what’s
              available for your preferred dates.
            </span>
          </li>
          <li className="flex items-start">
            <FaUsers className="text-accent mr-3 mt-1" />
            <span>
              <strong>24/7 Customer Support:</strong> Our dedicated team is here
              to assist you anytime.
            </span>
          </li>
        </ul>
      </section>

      {/* For Hosts */}
      <section className="bg-gray-100 p-6 rounded-lg shadow-sm mb-12">
        <h2 className="text-xl font-bold mb-4 text-primary">
          For Hosts & Property Managers
        </h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Holidaze offers powerful tools to streamline venue management, making
          it easier for you to update listings, manage bookings, and connect
          with guests. Simplify your hosting experience with features designed
          for efficiency.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start">
            <FaCheckCircle className="text-primary mr-3 mt-1" />
            <span>
              <strong>Effortless Venue Management:</strong> Update listings,
              pricing, and availability in one place.
            </span>
          </li>
          <li className="flex items-start">
            <FaMapMarkerAlt className="text-primary mr-3 mt-1" />
            <span>
              <strong>Seamless Booking Process:</strong> Stay organized with
              real-time notifications and easy reservation management.
            </span>
          </li>
          <li className="flex items-start">
            <FaUsers className="text-primary mr-3 mt-1" />
            <span>
              <strong>Guest Communication:</strong> Directly message guests to
              provide excellent service.
            </span>
          </li>
          <li className="flex items-start">
            <FaClock className="text-primary mr-3 mt-1" />
            <span>
              <strong>Analytics & Reporting:</strong> Optimize bookings with
              insights into trends and occupancy rates.
            </span>
          </li>
        </ul>
      </section>

      <CallToAction
        title="Join Us"
        message="Whether you're a traveler seeking your next great escape or a host ready to share your property, Holidaze is here to support you. Experience the future of accommodation booking today."
        buttonText="Get Started Now"
        onButtonClick={() => (window.location.href = "/signup")}
        backgroundColor="bg-accent"
        textColor="text-white"
        buttonStyle="bg-white text-accent"
      />
    </div>
  );
}

export default AboutContent;
