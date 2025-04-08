import {useContext} from "react";
import {UserActionContextProps} from "../context/helper";
import {UserActionContext} from "../context/UserActionContext";

export const useCurrentAction = (): UserActionContextProps => {
    const context = useContext<UserActionContextProps | undefined>(
        UserActionContext
    );
    if (!context) {
        throw new Error(
            "useCurrentAction must be used within context provider"
        );
    }
    return context;
};
