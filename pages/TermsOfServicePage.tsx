
import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const TermsOfServicePage: React.FC = () => {
    const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const h2Styles = "text-2xl font-bold text-brand-blue mt-8 mb-4 border-b pb-2";
    const pStyles = "text-gray-700 leading-relaxed mb-4";
    const ulStyles = "list-disc list-inside space-y-2 text-gray-700 mb-4 pl-4";
    const aStyles = "text-brand-blue hover:text-brand-gold underline";

    return (
        <div className="bg-white">
            <SEO
                title="Terms of Service"
                description="Read the Terms of Service for New Holland Financial Group to understand the rules and guidelines for using our website and services."
                keywords="terms of service, website terms, legal terms, conditions of use"
            />
            <section className="bg-brand-blue text-white py-20">
                <div className="container mx-auto px-6 text-center">
                    <h1 className="text-4xl font-extrabold">Terms of Service</h1>
                    <p className="text-lg text-gray-300 mt-2">
                        Please read these terms carefully before using our services.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-6 py-20 max-w-4xl">
                <p className={`${pStyles} text-lg`}>
                    Welcome to New Holland Financial Group. These Terms of Service ("Terms") govern your use of our website located at www.newhollandfinancial.com (the "Site") and any related services provided by us.
                </p>
                <p className={pStyles}>
                    By accessing or using the Site, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Site.
                </p>

                <h2 className={h2Styles}>1. Use of the Site</h2>
                <p className={pStyles}>You agree to use the Site only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the Site. Prohibited behavior includes harassing or causing distress or inconvenience to any other user, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within the Site.</p>

                <h2 className={h2Styles}>2. Intellectual Property</h2>
                <p className={pStyles}>The Site and its original content, features, and functionality are owned by New Holland Financial Group and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
                
                <h2 className={h2Styles}>3. Accounts</h2>
                <p className={pStyles}>When you create an account with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our service.</p>

                <h2 className={h2Styles}>4. Links To Other Web Sites</h2>
                <p className={pStyles}>Our Service may contain links to third-party web sites or services that are not owned or controlled by New Holland Financial Group. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party web sites or services. You further acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such web sites or services.</p>

                <h2 className={h2Styles}>5. Limitation Of Liability</h2>
                <p className={pStyles}>In no event shall New Holland Financial Group, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.</p>

                <h2 className={h2Styles}>6. Governing Law</h2>
                <p className={pStyles}>These Terms shall be governed and construed in accordance with the laws of the State of Iowa, United States, without regard to its conflict of law provisions.</p>

                <h2 className={h2Styles}>7. Changes</h2>
                <p className={pStyles}>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
                
                <h2 className={h2Styles}>8. Contact Us</h2>
                <p className={pStyles}>If you have any questions about these Terms, please contact us:</p>
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

export default TermsOfServicePage;
