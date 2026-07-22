import {createPortal} from "react-dom";
import {useEffect} from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps)=> {
    useEffect(() => {
        if(!isOpen) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        }
        document.addEventListener("keydown", handleKeyDown);
        document.body.style.overflow = "hidden";

        return()=>{
            document.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = ""
        }
    }, [isOpen, onClose]);

    if(!isOpen) return null;

    return createPortal(
        <div
            className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-neutral-900 rounded-xl shadow-xl w-full max-w-md"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center p-4 border-b border-neutral-200 dark:border-neutral-800">
                    {title &&
                        <h2 className="text-lg font-medium">{title}</h2>
                    }
                    <button
                        onClick={onClose}
                        aria-label="Close"
                        className='text-neutral-400 hover:text-neutral-700 rounded p-1 ml-auto'
                    >
                        x
                    </button>
                </div>
                    <div className='p-4'>
                        {children}
                    </div>
            </div>
        </div>,
        document.body
    )
}

export default Modal;