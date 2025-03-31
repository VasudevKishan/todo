import React, {createContext, useEffect, useState} from "react";
import {UserActionContextProps, UserAction} from "./helper";

export const UserActionContext = createContext<
    UserActionContextProps | undefined
>(undefined);
export const UserActionProvider: React.FC<{children: React.ReactNode}> = ({
    children,
}) => {
    const [action, setAction] = useState<UserAction>("view");

    const changeAction = (userAction: UserAction) => {
        setAction(userAction);
    };

    useEffect(() => {
        const slides = document.querySelectorAll(".slide");
        console.log("slidees found: ", slides);

        slides.forEach((element) => {
            console.log("Before applying transform ", element);
            (element as HTMLElement).style.transform =
                action === "view"
                    ? "translateX(-100%)"
                    : action === "edit"
                    ? "translateX(0)"
                    : "translateX(-200%)";
            console.log("After applying transform ", element);
        });
    }, [action]);

    return (
        <UserActionContext.Provider value={{action, changeAction}}>
            {children}
        </UserActionContext.Provider>
    );
};

// if (action === "view") {
//     document.querySelectorAll(".slide").forEach((element) => {
//         (element as HTMLElement).style.transform = "translateX(-100%)";
//         console.log("in use effect setting to view");
//     });
// } else if (action === "edit") {
//     document.querySelectorAll(".slide").forEach((element) => {
//         (element as HTMLElement).style.transform = "translateX(0)";
//     });
// } else if (action === "detail") {
//     document.querySelectorAll(".slide").forEach((element) => {
//         (element as HTMLElement).style.transform = "translateX(-200%)";
//     });
// }
