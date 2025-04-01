import React, {createContext, useEffect, useRef, useState} from "react";
import {UserActionContextProps, UserAction} from "./helper";

export const UserActionContext = createContext<
    UserActionContextProps | undefined
>(undefined);
export const UserActionProvider: React.FC<{children: React.ReactNode}> = ({
    children,
}) => {
    const [action, setAction] = useState<UserAction>("view");

    const containerRef = useRef<HTMLDivElement | null>(null);

    const changeAction = (userAction: UserAction) => {
        setAction(userAction);
    };

    useEffect(() => {
        if (containerRef.current) {
            const slides = containerRef.current.querySelectorAll(".slide");
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
        }
    }, [action]);

    return (
        <UserActionContext.Provider value={{action, changeAction}}>
            {React.cloneElement(children as React.ReactElement, {
                ref: containerRef,
            })}
        </UserActionContext.Provider>
    );
};
