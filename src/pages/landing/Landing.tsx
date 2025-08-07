import { Link } from 'react-router-dom';
import {
  FaGlobe,
  FaDatabase,
  FaSearch,
  FaChartLine,
  FaBell,
  FaRocket,
  FaCheck,
  FaArrowRight,
} from 'react-icons/fa';
import Logo from '../../components/Logo';
import monocleScreenshot from '../../assets/monocle-ss.png';

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Logo />
              <span className="text-xl font-bold text-white">Monocle</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Monitor Everything.
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Miss Nothing.
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Keep your services running smoothly with real-time monitoring,
              instant alerts, and comprehensive uptime tracking. Monitor
              websites, APIs, databases, and more from a single dashboard.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <span>Start Monitoring Free</span>
                <FaArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="border border-gray-600 hover:border-gray-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                View Dashboard
              </Link>
            </div>
          </div>

          <div className="mt-16 relative">
            <div className="bg-gray-900 rounded-xl border border-gray-700 p-4 shadow-2xl mx-auto max-w-6xl">
              <img
                src={monocleScreenshot}
                alt="Monocle Dashboard Screenshot"
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent pointer-events-none rounded-xl"></div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              Comprehensive Monitoring Solutions
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From simple website checks to complex database monitoring, Monocle
              provides all the tools you need to keep your infrastructure
              healthy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-blue-500 transition-colors">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <FaGlobe className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                HTTP/HTTPS Monitoring
              </h3>
              <p className="text-gray-300 mb-4">
                Monitor your websites and APIs with customizable HTTP requests,
                status code validation, and response time tracking.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <FaCheck className="text-green-400 w-3 h-3" />
                  <span>Custom HTTP methods & headers</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaCheck className="text-green-400 w-3 h-3" />
                  <span>SSL certificate monitoring</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaCheck className="text-green-400 w-3 h-3" />
                  <span>Response time analysis</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-purple-500 transition-colors">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <FaDatabase className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Database Monitoring
              </h3>
              <p className="text-gray-300 mb-4">
                Keep your databases healthy with connection testing, query
                performance monitoring, and availability checks.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <FaCheck className="text-green-400 w-3 h-3" />
                  <span>PostgreSQL & MySQL support</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaCheck className="text-green-400 w-3 h-3" />
                  <span>Connection health checks</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaCheck className="text-green-400 w-3 h-3" />
                  <span>SSL configuration options</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-green-500 transition-colors">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <FaSearch className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                DNS Monitoring
              </h3>
              <p className="text-gray-300 mb-4">
                Ensure your DNS records are resolving correctly with
                comprehensive DNS monitoring and validation.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <FaCheck className="text-green-400 w-3 h-3" />
                  <span>Multiple record types (A, CNAME, MX)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaCheck className="text-green-400 w-3 h-3" />
                  <span>DNS resolution validation</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaCheck className="text-green-400 w-3 h-3" />
                  <span>Domain expiry monitoring</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-yellow-500 transition-colors">
              <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mb-4">
                <FaChartLine className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Real-time Analytics
              </h3>
              <p className="text-gray-300 mb-4">
                Get detailed insights into your service performance with
                comprehensive analytics and historical data.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <FaCheck className="text-green-400 w-3 h-3" />
                  <span>Uptime percentage tracking</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaCheck className="text-green-400 w-3 h-3" />
                  <span>Response time graphs</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaCheck className="text-green-400 w-3 h-3" />
                  <span>Historical incident reports</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-red-500 transition-colors">
              <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center mb-4">
                <FaBell className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Instant Alerts
              </h3>
              <p className="text-gray-300 mb-4">
                Get notified immediately when something goes wrong with
                customizable alert channels and escalation policies.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <FaCheck className="text-green-400 w-3 h-3" />
                  <span>Email & webhook notifications</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaCheck className="text-green-400 w-3 h-3" />
                  <span>Customizable alert thresholds</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaCheck className="text-green-400 w-3 h-3" />
                  <span>Incident escalation</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 hover:border-indigo-500 transition-colors">
              <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <FaRocket className="text-white w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Easy Setup
              </h3>
              <p className="text-gray-300 mb-4">
                Get up and running in minutes with our intuitive interface and
                comprehensive documentation.
              </p>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="flex items-center space-x-2">
                  <FaCheck className="text-green-400 w-3 h-3" />
                  <span>Quick setup process</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaCheck className="text-green-400 w-3 h-3" />
                  <span>Intuitive dashboard</span>
                </li>
                <li className="flex items-center space-x-2">
                  <FaCheck className="text-green-400 w-3 h-3" />
                  <span>Comprehensive documentation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400 mb-2">
                Open Source
              </div>
              <div className="text-gray-300">Transparent & Free</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-400 mb-2">
                &lt;5min
              </div>
              <div className="text-gray-300">Setup Time</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400 mb-2">
                3 Types
              </div>
              <div className="text-gray-300">Monitor Options</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-yellow-400 mb-2">
                Real-time
              </div>
              <div className="text-gray-300">Status Updates</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-6">
              How Monocle Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Get started with monitoring in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Create Your Monitors
              </h3>
              <p className="text-gray-300">
                Set up monitors for your websites, APIs, databases, or DNS
                records with our easy-to-use interface.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Configure Alerts
              </h3>
              <p className="text-gray-300">
                Choose how and when you want to be notified when issues are
                detected with your services.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">
                Monitor & Analyze
              </h3>
              <p className="text-gray-300">
                Watch your dashboard for real-time status updates and analyze
                performance trends over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Monitoring?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Start monitoring your critical services with our open-source,
              self-hosted monitoring solution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
              >
                <span>Get Started Free</span>
                <FaArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-700">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Logo />
              <span className="text-xl font-bold text-white">Monocle</span>
            </div>
            <div className="text-gray-400 text-sm">
              © 2025 Monocle. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
