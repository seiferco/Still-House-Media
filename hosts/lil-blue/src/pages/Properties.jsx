import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Users } from "lucide-react";
import { SITE_CONFIG } from "../site-config";

export default function Properties() {
    return (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-[#1E1E1E] mb-4">Our Properties</h1>
                    <p className="text-xl text-[#1E1E1E]/70 max-w-2xl mx-auto">
                        Explore our collection of premium vacation rentals.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {SITE_CONFIG.properties.map((property) => (
                        <Link key={property.id} to={`/properties/${property.slug}`} className="group block h-full">
                            <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-[#CBBBAA]/30 h-full flex flex-col">
                                <div className="relative h-72 overflow-hidden">
                                    <img
                                        src={property.heroImage}
                                        alt={property.name}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#1E1E1E] shadow-sm">
                                        {property.location.city}, {property.location.region}
                                    </div>
                                </div>

                                <div className="p-8 flex flex-col flex-grow">
                                    <div className="mb-4">
                                        <h2 className="text-2xl font-bold text-[#1E1E1E] mb-2">{property.name}</h2>
                                        <p className="text-sm text-[#E17654] font-medium tracking-wide uppercase">{property.tagline}</p>
                                    </div>

                                    <p className="text-[#1E1E1E]/70 line-clamp-3 mb-6 flex-grow">
                                        {property.description}
                                    </p>

                                    <div className="flex items-center gap-4 text-sm text-[#1E1E1E]/60 mb-6">
                                        <div className="flex items-center gap-1">
                                            <Users size={16} />
                                            <span>Sleeps 8</span> {/* Dynamic later */}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin size={16} />
                                            <span>Waterfront</span> {/* Dynamic later */}
                                        </div>
                                    </div>

                                    <div className="w-full py-3 bg-[#FAF7F2] text-[#3F6F63] font-bold rounded-xl text-center group-hover:bg-[#3F6F63] group-hover:text-white transition-colors flex items-center justify-center gap-2">
                                        View Details <ArrowRight size={18} />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
