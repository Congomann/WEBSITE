
import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const PrivacyPolicyPage: React.FC = () => {
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const h2Styles = "text-2xl font-bold text-brand-blue mt-8 mb-4 border-b pb-2";
    const pStyles = "text-gray-700 leading-relaxed mb-4";
    const ulStyles = "list-disc list-inside space-y-2 text-gray-700 mb-4 pl-4";
    const aStyles = "text-brand-blue hover:text-brand-gold underline";

    return (
        <div className="bg-white">
            <SEO
                title="Privacy Policy"
                description="Read the privacy policy for New Holland Financial Group to understand how we collect, use, and protect your personal information."
                keywords="privacy policy, data protection, personal information, financial services privacy"
            />
            <section className="bg-brand-blue text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-extrabold">Privacy Policy</h1>
                    <p className="text-lg text-gray-300 mt-2">
                        Your privacy is important to us.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-6 py-20 max-w-4xl">
                <p className={`${pStyles} text-lg`}>
                    This Privacy Policy describes how New Holland Financial Group ("we," "us," or "our") collects, uses, and discloses your personal information when you visit our website (www.newhollandfinancial.com), use our services, or otherwise interact with us.
                </p>

                <h2 className={h2Styles}>1. Information We Collect</h2>
                <p className={pStyles}>We may collect personal information that you provide directly to us, such as when you request a quote, contact us, or subscribe to our newsletter. This information may include:</p>
                <ul className={ulStyles}>
                    <li><strong>Contact Information:</strong> Name, email address, phone number, mailing address.</li>
                    <li><strong>Quote Information:</strong> Information necessary to provide an insurance quote, which may include date of birth, marital status, property details, vehicle information, and health-related information.</li>
                    <li><strong>Communication Information:</strong> The content of your communications with us, including emails and form submissions.</li>
                </ul>
                <p className={pStyles}>We also automatically collect certain information when you visit our website, including:</p>
                <ul className={ulStyles}>
                    <li><strong>Log and Usage Data:</strong> IP address, browser type, operating system, referring URLs, pages viewed, and timestamps.</li>
                    <li><strong>Cookies and Similar Technologies:</strong> We use cookies to operate and administer our site, and to improve your experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</li>
                </ul>

                <h2 className={h2Styles}>2. How We Use Your Information</h2>
                <p className={pStyles}>We use the information we collect for various purposes, including:</p>
                <ul className={ulStyles}>
                    <li>To provide, maintain, and improve our services, including providing you with insurance quotes and information.</li>
                    <li>To communicate with you, respond to your inquiries, and provide customer support.</li>
                    <li>To send you marketing and promotional materials, with your consent where required.</li>
                    <li>To comply with legal obligations and to protect our rights and the rights of others.</li>
                    <li>For analytics and research purposes to understand how our website is used.</li>
                </ul>

                <h2 className={h2Styles}>3. How We Share Your Information</h2>
                <p className={pStyles}>We do not sell your personal information. We may share your information in the following circumstances:</p>
                <ul className={ulStyles}>
                    <li><strong>With Insurance Carriers:</strong> To provide you with quotes and policies, we share necessary information with our trusted carrier partners.</li>
                    <li><strong>With Service Providers:</strong> We may share information with third-party vendors and service providers who perform services on our behalf, such as website hosting and email services.</li>
                    <li><strong>For Legal Reasons:</strong> We may disclose your information if required by law, subpoena, or other legal process, or if we believe in good faith that disclosure is necessary to protect our rights, your safety, or the safety of others.</li>
                </ul>

                <h2 className={h2Styles}>4. Data Security</h2>
                <p className={pStyles}>We implement reasonable administrative, technical, and physical security measures to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee its absolute security.</p>

                <h2 className={h2Styles}>5. Your Rights and Choices</h2>
                <p className={pStyles}>You have certain rights regarding your personal information. Depending on your jurisdiction, these may include the right to access, correct, or delete your personal information. You may also opt-out of receiving marketing communications from us at any time by following the unsubscribe instructions in those communications.</p>

                <h2 className={h2Styles}>6. Third-Party Links</h2>
                <p className={pStyles}>Our website may contain links to other websites not operated or controlled by us. This Privacy Policy does not apply to third-party websites. We encourage you to review the privacy policies of any third-party websites you visit.</p>
                
                <h2 className={h2Styles}>7. Children's Privacy</h2>
                <p className={pStyles}>Our services are not directed to individuals under the age of 16, and we do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete such information.</p>

                <h2 className={h2Styles}>8. Changes to This Privacy Policy</h2>
                <p className={pStyles}>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes. Changes are effective when they are posted on this page.</p>

                <h2 className={h2Styles}>9. Contact Us</h2>
                <p className={pStyles}>If you have any questions about this Privacy Policy, please contact us:</p>
                <ul className={ulStyles}>
                    <li>By email: <a href="mailto:support@newhollandfinancial.com" className={aStyles}>support@newhollandfinancial.com</a></li>
                    <li>By phone: <a href="tel:515-555-0123" className={aStyles}>(515) 555-0123</a></li>
                </ul>
                <p className={`${pStyles} italic`}>Last updated: {today}</p>
                
                 <div className="mt-12 text-center">
                    <Link
                        to="/"
                        className="inline-block bg-brand-gold text-brand-blue font-bold py-3 px-8 rounded-full hover:bg-yellow-400 transition-all duration-300 text-lg"
                    >
                        Return to Homepage
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;