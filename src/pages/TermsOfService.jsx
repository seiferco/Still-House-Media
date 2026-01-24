import { useEffect } from "react";

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen pt-12 pb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-[#2D3142] mb-4">Terms of Service</h1>
        <p className="text-gray-500 mb-8">Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="prose prose-lg max-w-none text-[#4F5D75]">
          <p>
            These Terms of Service ("Terms") constitute a binding agreement between you ("Client" or "Host") and Still House Media ("we," "us," or "our") regarding your use of our website design, hosting, and maintenance services (the "Service"). By signing up for or using our Service, you agree to be bound by these Terms.
          </p>

          <h3 className="text-[#2D3142] mt-8 mb-4 font-bold text-xl">1. Services Provided</h3>
          <p>
            Still House Media provides direct booking website solutions for vacation rental hosts. Our services include:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Design and development of a custom direct booking website.</li>
            <li>Hosting and ongoing technical maintenance of the website.</li>
            <li>Integration with third-party Property Management Systems (specifically Hostex).</li>
          </ul>
          <p>
            <strong>Exclusions:</strong> Unless explicitly stated in a separate agreement, our services do not include professional photography, content writing, legal advice, or property management services.
          </p>

          <h3 className="text-[#2D3142] mt-8 mb-4 font-bold text-xl">2. Account & Responsibilities</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Accuracy:</strong> You are responsible for ensuring all property information, pricing, availability, and policies displayed on your website are accurate and up-to-date.</li>
            <li><strong>Legal Compliance:</strong> You are solely responsible for ensuring your rental business complies with all local laws, zoning regulations, and tax obligations. You must provide your own Terms of Service and Rental Agreements for your guests.</li>
            <li><strong>Credentials:</strong> You agree to provide us with necessary access (e.g., DNS settings, Hostex API keys) required to launch and maintain your site.</li>
          </ul>

          <h3 className="text-[#2D3142] mt-8 mb-4 font-bold text-xl">3. Subscription & Payments</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Fees:</strong> Services are billed according to the plan selected (e.g., Setup Fee + Monthly/Annual Subscription). Subscription fees are billed in advance.</li>
            <li><strong>Refunds:</strong> Setup fees are non-refundable once design work has commenced. Subscription fees are non-refundable for partial months of service.</li>
            <li><strong>Late Payments:</strong> If payment is not received within 14 days of the due date, we reserve the right to suspend or take your website offline until the balance is paid.</li>
          </ul>

          <h3 className="text-[#2D3142] mt-8 mb-4 font-bold text-xl">4. Intellectual Property</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Your Content:</strong> You retain full ownership of all text, images, logos, and guest data ("Client Content") that you provide to us. You grant us a license to use this content solely for the purpose of providing the Service.</li>
            <li><strong>Our Work:</strong> Still House Media retains ownership of the underlying code, website themes, design layouts, and custom development ("Agency IP"). Upon full payment of fees, we grant you a non-exclusive, non-transferable license to use the website for your business while your subscription is active.</li>
          </ul>

          <h3 className="text-[#2D3142] mt-8 mb-4 font-bold text-xl">5. Third-Party Integrations</h3>
          <p>
            Our Service relies on integrations with third-party platforms, specifically <strong>Hostex</strong>, for booking management and calendar synchronization.
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>We are not responsible for errors, outages, or data sync issues caused by third-party platforms.</li>
            <li>You acknowledge that changes made by third-party platforms (e.g., API updates) may impact website functionality and may require time to resolve.</li>
          </ul>

          <h3 className="text-[#2D3142] mt-8 mb-4 font-bold text-xl">6. Limitation of Liability</h3>
          <p>
            To the fullest extent permitted by law, Still House Media shall not be liable for:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Any indirect, incidental, special, or consequential damages (including lost profits or revenue).</li>
            <li>Double-bookings or overbookings resulting from user error or third-party sync failures.</li>
            <li>Guest behavior, property damage, or disputes between you and your guests.</li>
            <li>Server downtime or service interruptions beyond our reasonable control.</li>
          </ul>
          <p>
            In no event shall our total liability exceed the total amount paid by you to us in the three (3) months preceding the claim.
          </p>

          <h3 className="text-[#2D3142] mt-8 mb-4 font-bold text-xl">7. Termination</h3>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>By You:</strong> You may cancel your subscription at any time with 30 days' written notice. Your website will remain active until the end of the paid billing period.</li>
            <li><strong>By Us:</strong> We may terminate this agreement immediately if you violate these Terms or engage in illegal activity via the website.</li>
            <li><strong>Effect of Termination:</strong> Upon termination, your website will be taken offline. We will provide a reasonable opportunity for you to export your guest data before data deletion.</li>
          </ul>

          <h3 className="text-[#2D3142] mt-8 mb-4 font-bold text-xl">8. Contact</h3>
          <p>
            For any legal or account-related inquiries, please contact us at: <a href="mailto:stillhousemedia@outlook.com" className="text-[#FF6B35] hover:underline">stillhousemedia@outlook.com</a>
          </p>
        </div>
      </div>
    </div>
  );
}