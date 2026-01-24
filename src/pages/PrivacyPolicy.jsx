import { useEffect } from "react";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[#2D3142] mb-4">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="prose prose-lg max-w-none text-[#4F5D75]">
          <p>
            Still House Media ("we," "our," or "us") respects your privacy and is committed to protecting the personal information of our clients ("Hosts") and the end-users of the websites we build ("Guests"). This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website or use our direct booking website services (the "Service").
          </p>

          <h3 className="text-[#2D3142] mt-8 mb-4 font-bold text-xl">1. Introduction & Scope</h3>
          <p>
            We operate in two capacities regarding personal data:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>As a Data Controller:</strong> For information collected directly from our Clients (Hosts) for billing, account management, and service delivery.</li>
            <li><strong>As a Data Processor:</strong> For Guest data collected through the direct booking websites we build and host. This data is processed on behalf of the Host to facilitate bookings and sync with third-party platforms.</li>
          </ul>

          <h3 className="text-[#2D3142] mt-8 mb-4 font-bold text-xl">2. Information We Collect</h3>
          
          <h4 className="text-[#2D3142] mt-6 mb-2 font-bold text-lg">A. Information from Hosts (Clients)</h4>
          <p>
            When you sign up for our services, we collect:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Account Information:</strong> Name, email address, phone number, and business details.</li>
            <li><strong>Billing Data:</strong> Payment information processed through our secure third-party payment providers (we do not store full credit card numbers).</li>
            <li><strong>Integration Credentials:</strong> API keys and access tokens for third-party services like Hostex, Airbnb, or domain registrars, necessary to provide our Service.</li>
          </ul>

          <h4 className="text-[#2D3142] mt-6 mb-2 font-bold text-lg">B. Information from Guests (End-Users)</h4>
          <p>
            When a Guest uses a website we have built for a Host, we collect the following data on the Host's behalf:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Booking Details:</strong> Name, email, phone number, check-in/out dates, and guest count.</li>
            <li><strong>Payment Data:</strong> Tokenized payment information to process transactions.</li>
            <li><strong>Communications:</strong> Messages sent through the website's contact forms or booking widgets.</li>
          </ul>

          <h4 className="text-[#2D3142] mt-6 mb-2 font-bold text-lg">C. Automated Information</h4>
          <p>
            We automatically collect technical data such as IP addresses, browser types, device information, and usage logs to monitor the health and performance of our servers and websites.
          </p>

          <h3 className="text-[#2D3142] mt-8 mb-4 font-bold text-xl">3. How We Use Your Information</h3>
          <p>We use the collected information to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Provide Services:</strong> Build, host, and maintain direct booking websites.</li>
            <li><strong>Process Transactions:</strong> Facilitate payments and booking reservations.</li>
            <li><strong>Platform Sync:</strong> Synchronize availability, pricing, and reservation data with third-party Property Management Systems (specifically Hostex) via API.</li>
            <li><strong>Support:</strong> Respond to technical inquiries and customer service requests.</li>
            <li><strong>Security:</strong> Detect and prevent fraud or abuse of our services.</li>
          </ul>

          <h3 className="text-[#2D3142] mt-8 mb-4 font-bold text-xl">4. Third-Party Sharing & Integrations</h3>
          <p>
            We do not sell personal data. However, we share data with trusted third-party service providers necessary to operate our business:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Hostex (Property Management System):</strong> Guest booking data is transmitted directly to Hostex to manage reservations across multiple channels. This data is subject to Hostex's own Privacy Policy.</li>
            <li><strong>Payment Processors:</strong> We use industry-standard payment gateways (such as Stripe) to process payments. Financial data is handled in accordance with PCI-DSS standards.</li>
            <li><strong>Cloud Infrastructure:</strong> Our websites and databases are hosted on secure cloud providers (e.g., Vercel, AWS) that ensure high standards of physical and digital security.</li>
          </ul>

          <h3 className="text-[#2D3142] mt-8 mb-4 font-bold text-xl">5. Data Retention & Security</h3>
          <p>
            We implement industry-standard security measures, including SSL encryption and restricted access controls, to protect your data.
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Host Data:</strong> Retained for the duration of your subscription and a reasonable period thereafter for tax and legal compliance.</li>
            <li><strong>Guest Data:</strong> Retained according to the Host's instructions or as required by law.</li>
          </ul>

          <h3 className="text-[#2D3142] mt-8 mb-4 font-bold text-xl">6. Your Rights</h3>
          <p>
            Depending on your location, you may have rights under privacy laws (such as GDPR or CCPA) including:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Accessing, correcting, or deleting your personal data.</li>
            <li>Opting out of marketing communications.</li>
            <li>Withdrawing consent for data processing.</li>
          </ul>
          <p>
            To exercise these rights, please contact us at the email below. If you are a Guest, please contact the Host directly, as they are the data controller for your reservation data.
          </p>

          <h3 className="text-[#2D3142] mt-8 mb-4 font-bold text-xl">7. Contact Us</h3>
          <p>
            If you have questions about this Privacy Policy, please contact us at:
          </p>
          <p className="mt-4 font-medium text-[#2D3142]">
            Still House Media<br />
            Email: <a href="mailto:stillhousemedia@outlook.com" className="text-[#FF6B35] hover:underline">stillhousemedia@outlook.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}