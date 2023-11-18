import {Link} from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import arrow from '../assets/icons/arrow.svg';

interface HomeInfoProps {
    currentStage: number;
}

const InfoBox = ({text, link, buttonText}) => (
    <div className='info-box'>
        <p className='font-medium sm:text-xl text-center'>
            {text}
        </p>
        <Link className='neo-brutalism-white neo-btn' to={link}>
            {buttonText}
            <img src={arrow} alt="Arrow" className='w-4 h-4 object-contain'/>
        </Link>
    </div>
);

const renderContent = {
    1: (
        <h1 className={'sm:text-xl sm:leading-snug text-center neo-brutalism-blue py-4 px-8 text-white mx-5'}>
            Hi, I'm <span className='font-semibold'>Nirav</span> 👋
            <br/>
            A Software Engineer from India
        </h1>
    ),
    2: <InfoBox
        text='Worked with Incubyte and picked up many skills along the way'
        link='/about'
        buttonText='Learn more'/>,
    3: <InfoBox
        text='Worked on multiple projects to success'
        link='/projects'
        buttonText='Visit My Github'/>,
    4: <InfoBox
        text="Need a project done or looking for a dev? I'm just a few keystrokes away"
        link='/contact'
        buttonText="Let's talk"/>,
};

export const HomeInfo = ({currentStage}: HomeInfoProps) => {
    return renderContent[currentStage];
}