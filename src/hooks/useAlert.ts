import {useState} from "react";

export type AlertType = 'danger' | 'info';

export interface AlertDto {
    show: boolean;
    text: string;
    type: AlertType;
}

const hiddenEmptyAlert: AlertDto = {show: false, text: '', type: 'danger'};

export const useAlert = () => {
    const [alert, setAlert] = useState<AlertDto>(hiddenEmptyAlert);

    const showAlert = (text: string, type: AlertType) => setAlert({show: true, text: text, type: type as AlertType});
    const hideAlert = () => setAlert(hiddenEmptyAlert);

    return {alert, showAlert, hideAlert};
}