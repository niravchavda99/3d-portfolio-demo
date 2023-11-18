import {useRef, useState} from "react";
import emailjs from '@emailjs/browser';

interface ContactForm {
    name: string;
    email: string;
    message: string;
}

const emptyForm = {name: '', email: '', message: ''};

export const Contact = () => {
    const [form, setForm] = useState<ContactForm>(emptyForm);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const formRef = useRef();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };
    const handleFocus = () => {
    };
    const handleBlur = () => {
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const env = (import.meta as any).env as any;
        const serviceID = env.VITE_APP_EMAIL_JS_SERVICE_ID;
        const templateID = env.VITE_APP_EMAIL_JS_TEMPLATE_ID;
        const publicKey = env.VITE_APP_EMAIL_JS_PUBLIC_KEY;

        emailjs.send(
            serviceID,
            templateID,
            {
                from_name: form.name,
                to_name: 'Nirav',
                from_email: form.email,
                to_email: 'nmchavda99@gmail.com',
                message: form.message,
            },
            publicKey
        ).then(() => {
            setIsLoading(false);
            setForm(emptyForm);
            // TODO: Show Success Message
            // TODO: Hide an alert
        }).catch((error) => {
            setIsLoading(false);
            console.error(error);
            // TODO: Show Failure Message
        });
    };

    return (
        <section className='relative flex lg:flex-row flex-col max-container'>
            <div className='flex-1 min-w-[50%] flex flex-col'>
                <h1 className='head-text'>
                    Get in Touch
                </h1>
                <form className="w-full flex flex-col gap-7 mt-14" ref={formRef} onSubmit={handleSubmit}>
                    <label className='text-black-500 font-semibold'>
                        Name
                        <input
                            type='text'
                            name='name'
                            className='input'
                            placeholder='John'
                            required
                            value={form.name}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <label className='text-black-500 font-semibold'>
                        Email
                        <input
                            type='email'
                            name='email'
                            className='input'
                            placeholder='john@gmail.com'
                            required
                            value={form.email}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <label className='text-black-500 font-semibold'>
                        Your Message
                        <textarea
                            name='message'
                            className='textarea'
                            placeholder='Let me know how I can help you!'
                            rows={4}
                            required
                            value={form.message}
                            onChange={handleChange}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </label>
                    <button type='submit' className='btn' disabled={isLoading} onFocus={handleFocus}
                            onBlur={handleBlur}>
                        {isLoading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </section>
    );
};