import React from 'react';
import { BsGlobe } from 'react-icons/bs';

const Footer = () => {
    return (
        <footer className="bg-gray-50 border-t border-gray-200 mt-auto">
            <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <h4 className="font-bold text-gray-800 mb-4 text-sm">Support</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li><a href="#" className="hover:underline">Help Center</a></li>
                        <li><a href="#" className="hover:underline">AirCover</a></li>
                        <li><a href="#" className="hover:underline">Anti-discrimination</a></li>
                        <li><a href="#" className="hover:underline">Disability support</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-gray-800 mb-4 text-sm">Hosting</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li><a href="#" className="hover:underline">Airbnb your home</a></li>
                        <li><a href="#" className="hover:underline">AirCover for Hosts</a></li>
                        <li><a href="#" className="hover:underline">Hosting resources</a></li>
                        <li><a href="#" className="hover:underline">Community forum</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-gray-800 mb-4 text-sm">Company</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li><a href="#" className="hover:underline">Newsroom</a></li>
                        <li><a href="#" className="hover:underline">New features</a></li>
                        <li><a href="#" className="hover:underline">Careers</a></li>
                        <li><a href="#" className="hover:underline">Investors</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-gray-800 mb-4 text-sm">Community</h4>
                    <ul className="space-y-3 text-sm text-gray-600">
                        <li><a href="#" className="hover:underline">Airbnb.org: disaster relief</a></li>
                        <li><a href="#" className="hover:underline">Combating discrimination</a></li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <span>© 2023 Mytrip, Inc.</span>
                        <span className="hidden md:inline">·</span>
                        <a href="#" className="hover:underline">Privacy</a>
                        <span className="hidden md:inline">·</span>
                        <a href="#" className="hover:underline">Terms</a>
                        <span className="hidden md:inline">·</span>
                        <a href="#" className="hover:underline">Sitemap</a>
                    </div>
                    <div className="flex items-center gap-6 font-semibold text-gray-800">
                        <div className="flex items-center gap-2 cursor-pointer hover:underline">
                            <BsGlobe /> English (US)
                        </div>
                        <div className="cursor-pointer hover:underline">
                            $ USD
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
