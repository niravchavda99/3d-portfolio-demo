import {AlertDto} from "../hooks/useAlert.ts";

export const Alert = ({type, text}: AlertDto) => {
    const alertBgColor = type === 'danger' ? 'bg-red-800' : 'bg-blue-800';
    const alertColor = type === 'danger' ? 'bg-red-500' : 'bg-blue-500';
    return (
        <div className='absolute top-10 left-0 right-0 flex justify-center items-center'>
            <div
                className={`${alertBgColor} p-2 text-indigo-100 leading-none rounded-full flex lg:inline-flex items-center`}
                role="alert">
                <p className={`${alertColor} flex rounded-full uppercase px-2 py-1 font-semibold mr-3 text-xs`}>
                    {type === 'danger' ? 'Failed' : 'Success'}
                </p>
                <p className='mr-2 text-left'>{text}</p>
            </div>
        </div>
    );
}