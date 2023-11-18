import { notification } from 'antd';

export function openErrorNotification(messageTitle, error) {
    
    notification['error']({
        message: messageTitle,
        description: error,
    });
}

export function openWarningNotification(messageTitle, error) {
    
    notification['warning']({
        message: messageTitle,
        description: error,
    });
}