import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Users,
  Calendar,
  ClipboardCheck,
  ShieldCheck,
  BarChart2,
  Brain,
} from "lucide-react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/ui/Button";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-light/10 to-secondary-light/20 py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-center gap-12">
              <div className="lg:w-1/2 space-y-6 animate-slide-up">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                  Streamline Your Mental Health Practice
                </h1>
                <p className="text-xl text-gray-600">
                  MindTrack helps mental health professionals manage clients,
                  schedule appointments, and store session notes securely in one
                  intuitive platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/register">
                    <Button size="lg">
                      Get Started
                      <ChevronRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" size="lg">
                      Log in
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="lg:w-1/2 mt-8 lg:mt-0 animate-fade-in">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-25"></div>
                  <div className="relative bg-white rounded-lg shadow-xl overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/7176319/pexels-photo-7176319.jpeg"
                      alt="Mental health professional with client"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">
                Designed for Mental Health Professionals
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                Our comprehensive platform streamlines your practice management,
                giving you more time to focus on what matters most: your
                clients.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.01]">
                <div className="w-12 h-12 bg-primary-light/20 rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Client Management
                </h3>
                <p className="text-gray-600">
                  Maintain detailed client profiles with contact information,
                  history, and custom notes in a secure environment.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.01]">
                <div className="w-12 h-12 bg-secondary-light/20 rounded-full flex items-center justify-center mb-4">
                  <Calendar className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Appointment Scheduling
                </h3>
                <p className="text-gray-600">
                  Effortlessly schedule and manage appointments with automated
                  reminders to reduce no-shows.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.01]">
                <div className="w-12 h-12 bg-primary-light/20 rounded-full flex items-center justify-center mb-4">
                  <ClipboardCheck className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Session Notes
                </h3>
                <p className="text-gray-600">
                  Create and store structured session notes with custom
                  templates to track progress and treatment plans.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.01]">
                <div className="w-12 h-12 bg-secondary-light/20 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Secure & Compliant
                </h3>
                <p className="text-gray-600">
                  Rest easy knowing your client data is protected with
                  enterprise-grade security and compliance standards.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.01]">
                <div className="w-12 h-12 bg-primary-light/20 rounded-full flex items-center justify-center mb-4">
                  <BarChart2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Insights & Analytics
                </h3>
                <p className="text-gray-600">
                  Gain valuable insights into your practice with analytics on
                  client progress, attendance rates, and more.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-[1.01]">
                <div className="w-12 h-12 bg-secondary-light/20 rounded-full flex items-center justify-center mb-4">
                  <Brain className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Intuitive Interface
                </h3>
                <p className="text-gray-600">
                  Enjoy a beautifully designed interface that makes managing
                  your practice a pleasure.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900">
                Trusted by Mental Health Professionals
              </h2>
              <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
                See what other professionals are saying about our platform.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-600 italic mb-4">
                  "MindTrack has revolutionized how I manage my therapy
                  practice. The interface is intuitive, and I've saved hours on
                  administrative tasks."
                </p>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white font-semibold">
                    JD
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">
                      Dr. Jane Davis
                    </h4>
                    <p className="text-sm text-gray-500">
                      Clinical Psychologist
                    </p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-600 italic mb-4">
                  "The client management features are excellent. I can easily
                  track progress and maintain detailed notes that help me
                  provide better care."
                </p>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-secondary rounded-full flex items-center justify-center text-white font-semibold">
                    MS
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">
                      Mark Stevens
                    </h4>
                    <p className="text-sm text-gray-500">Licensed Therapist</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <p className="text-gray-600 italic mb-4">
                  "The scheduling system alone has cut down on no-shows by 40%.
                  This platform pays for itself in saved time and improved
                  efficiency."
                </p>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 bg-accent rounded-full flex items-center justify-center text-white font-semibold">
                    EL
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">
                      Dr. Emily Liu
                    </h4>
                    <p className="text-sm text-gray-500">Psychiatrist</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Join thousands of mental health professionals who have streamlined
              their practice with MindTrack.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/register">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  Start Free Trial
                </Button>
              </Link>
              <Link to="#contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
