import { useEffect } from "react";
import { useImmer } from "use-immer";

const useLocalStorageState = <T>(propertyName: string, initValue: T): [T, (p: T) => void] => {
    const localeState = window.localStorage.getItem(propertyName);
    const initialState = localeState ? JSON.parse(localeState) : initValue;

    const [state, updateState] = useImmer<T>(initialState);
    useEffect(() => {
        window.localStorage.setItem(propertyName, JSON.stringify(initialState));
    }, []);

    const setState = (newState: T) => {
        window.localStorage.setItem(propertyName, JSON.stringify(newState));
        updateState(() => newState);
    };

    return [state, setState];
};

export { useLocalStorageState };
