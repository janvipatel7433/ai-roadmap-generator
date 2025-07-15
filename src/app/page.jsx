'use client';

import { useState, useEffect } from 'react';
import Chat from '../components/Chat';

export default function HomePage() {
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', companyName: '',
    industry: '', companySize: '', jobTitle: ''
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
      setFormData(JSON.parse(storedData));
      setSubmitted(true);
    }
    setHasMounted(true);
  }, []);

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!formData.industry.trim()) newErrors.industry = 'Industry is required';
    if (!formData.companySize.trim()) newErrors.companySize = 'Company size is required';
    if (!formData.jobTitle.trim()) newErrors.jobTitle = 'Job title is required';

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    const res = await fetch('/api/submit-form', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      localStorage.setItem('formData', JSON.stringify(formData));
      setSubmitted(true);
    }
  };

  if (!hasMounted) return null;

  return submitted ? (
    <Chat email={formData.email} />
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-white">
      <h1 className="text-3xl font-semibold text-white mb-6 text-center">Start your AI journey</h1>
      <div className="py-8 px-12 max-w-xl w-full bg-white/20 text-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
          <div>
            <input
              type="text"
              className="placeholder-white w-full py-3 px-5 focus:outline-none rounded-lg bg-black/40 text-white border-2 border-white/33"
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              placeholder='First Name*'
            />
            {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName}</p>}
          </div>

          {/* Last Name */}
          <div>
            <input
              type="text"
              className="placeholder-white w-full py-3 px-5 focus:outline-none rounded-lg bg-black/40 text-white border-2 border-white/33"
              value={formData.lastName}
              placeholder='Last Name*'
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            />
            {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName}</p>}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              className="placeholder-white w-full py-3 px-5 focus:outline-none rounded-lg bg-black/40 text-white border-2 border-white/33"
              value={formData.email}
              placeholder='Email Address*'
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
          </div>

          {/* Company Name */}
          <div>
            <input
              type="text"
              className="placeholder-white w-full py-3 px-5 focus:outline-none rounded-lg bg-black/40 text-white border-2 border-white/33"
              value={formData.companyName}
              placeholder='Company Name*'
              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            />
            {errors.companyName && <p className="text-red-600 text-sm">{errors.companyName}</p>}
          </div>

          {/* Industry */}
          <div>
            <label className="block mb-2">Industry</label>
            <select
              className="placeholder-white w-full py-3 px-5 focus:outline-none rounded-lg bg-black/40 text-white border-2 border-white/33"
              value={formData.industry}
              onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
            >
              <option value="">Select industry</option>
              <option value="Technology">Technology</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Finance">Finance</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
            {errors.industry && <p className="text-red-600 text-sm">{errors.industry}</p>}
          </div>

          {/* Company Size */}
          <div>
            <label className="block mb-2">Company Size</label>
            <div className="flex flex-wrap gap-4">
              {['1-10', '11-50', '51-200', '200+'].map((size) => (
                <label key={size} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="companySize"
                    value={size}
                    checked={formData.companySize === size}
                    onChange={(e) => setFormData({ ...formData, companySize: e.target.value })}
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
            {errors.companySize && <p className="text-red-600 text-sm">{errors.companySize}</p>}
          </div>

          {/* Job Title */}
          <div>
            <input
              type="text"
              className="placeholder-white w-full py-3 px-5 focus:outline-none rounded-lg bg-black/40 text-white border-2 border-white/33"
              value={formData.jobTitle}
              placeholder='Job Title*'
              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
            />
            {errors.jobTitle && <p className="text-red-600 text-sm">{errors.jobTitle}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="py-3 w-full bg-gradient-to-r from-[#d64590] to-[#f0657d] text-white border-0 rounded-md shadow-[0_0_0_2px_rgba(255,255,255,0.3)] cursor-pointer transition-all duration-500 ease-in-out whitespace-nowrap">
            Start Chat
          </button>
        </form>
      </div>
    </div>
  );
}
