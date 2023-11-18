import {Suspense, useRef, useState} from "react";
import emailjs from '@emailjs/browser';
import {Fox} from "../models/Fox.tsx";
import {Canvas} from "@react-three/fiber";
import {Loader} from "../components/Loader.tsx";
import {useAlert} from "../hooks/useAlert.ts";
import {Alert} from "../components/Alert.tsx";

interface ContactForm {
    name: string;
    email: string;
    message: string;
}

export type CurrentAnimation = 'idle' | 'walk' | 'hit';

const emptyForm = {name: '', email: '', message: ''};

export const Contact = () => {
    const [form, setForm] = useState<ContactForm>(emptyForm);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const formRef = useRef();
    const [currentAnimation, setCurrentAnimation] = useState<CurrentAnimation>('idle');
    const {alert, showAlert, hideAlert} = useAlert();

    const handleChange = (e: any) => setForm({...form, [e.target.name]: e.target.value});
    const handleFocus = () => setCurrentAnimation('walk');
    const handleBlur = () => setCurrentAnimation('idle');

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setCurrentAnimation('hit');
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
            setCurrentAnimation('idle');
            showAlert('Message sent successfully!', 'info');
            setTimeout(() => hideAlert(), 5000);
        }).catch((error) => {
            setIsLoading(false);
            console.error(error);
            setCurrentAnimation('idle');
            showAlert("I didnt receive your message!", 'danger');
            setTimeout(() => hideAlert(), 5000);
        });
    };

    return (
        <section className='relative flex lg:flex-row flex-col max-container'>
            {alert?.show && <Alert {...alert}/>}
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
            <div className='lg:w-1/2 w-full lg:h-auto md:h-[550px] h-[350px]'>
                <Canvas camera={{position: [0, 0, 5], fov: 75, near: 0.1, far: 1000}}>
                    <directionalLight intensity={2.5} position={[0, 0, 1]}/>
                    <ambientLight intensity={0.5}/>
                    <Suspense fallback={<Loader/>}>
                        <Fox
                            currentAnimation={currentAnimation}
                            position={[0.5, 0.35, 0]}
                            rotation={[12.6, -0.6, 0]}
                            scale={[0.5, 0.5, 0.5]}/>
                    </Suspense>
                </Canvas>
            </div>
        </section>
    );
};