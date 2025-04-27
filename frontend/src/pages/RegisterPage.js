import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import registerFunc from '../api/auth/Register';

const RegisterPage = ({ setUser }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // For Password field

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
    
        const { name, email, password } = formData;
    
        // Basic validations
        if (!name.trim() || !email.trim() || !password.trim()) {
            setError('Please fill in all fields.');
            setLoading(false);
            return;
        }
    
        if (!validateEmail(email)) {
            setError('Please enter a valid email.');
            setLoading(false);
            return;
        }
    
        if (password.length < 6) {
            setError('Password should be at least 6 characters.');
            setLoading(false);
            return;
        }
    
        try {
            const data = await registerFunc(formData);            
            if (data) {
                localStorage.setItem('token', data); 
                setUser({ name: 'User' });
                navigate('/expenses');
            } else {
                throw new Error('Registration failed');
            }
        } catch (err) {
            setError(err.message || 'Something went wrong. Try again.');
        } finally {
            setLoading(false);
        }
    };
    
    
    return (
        <div className="auth-page">
            <div className="auth-container">
                <h2>Create Your Account</h2>
                { error && <div className="error-message">{ error }</div> }

                <form onSubmit={ handleSubmit } noValidate>
                    {/* Name */}
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            value={ formData.name }
                            onChange={ handleChange }
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={ formData.email }
                            onChange={ handleChange }
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-input">
                            <input
                                id="password"
                                name="password"
                                type={ showPassword ? 'text' : 'password' }
                                value={ formData.password }
                                onChange={ handleChange }
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                className="show-password-btn"
                                onClick={ () => setShowPassword((prev) => !prev) }
                            >
                                { showPassword ? <FaEyeSlash /> : <FaEye /> }
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="auth-button"
                        disabled={ loading }
                    >
                        { loading ? 'Registering...' : 'Register' }
                    </button>
                </form>

                <div className="auth-link">
                    Already have an account? <Link to="/login">Sign In</Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;