import React from "react";
import { Check } from "lucide-react";

const VerticalStep = ({
    status = "pending", // pending, current, completed
    label,
    timestamp,
    isLast = false,
    isSuccess = false
}) => {
    const getStatusStyles = () => {
        if (isSuccess && label === "Waktu konfirmasi buyer diterima") {
            return {
                circle: "bg-[#1e4620] border-[#1e4620]",
                text: "text-[#1e4620]",
                connector: "bg-[#1e4620]",
                isFinal: true
            };
        }

        if (isSuccess) {
            return {
                circle: "bg-[#1e4620]",
                text: "text-[#1e4620]",
                connector: "bg-[#1e4620]"
            };
        }

        switch (status) {
            case "completed":
                return {
                    circle: "bg-[#066afe] border-[#066afe]",
                    text: "text-[#1c1c1c]",
                    connector: "bg-[#066afe]"
                };
            case "current":
                return {
                    circle: "bg-[#066afe]",
                    text: "text-[#066afe]",
                    connector: "bg-[#c9c9c9]"
                };
            default:
                return {
                    circle: "bg-white border-[#c9c9c9]",
                    text: "text-[#c9c9c9]",
                    connector: "bg-[#c9c9c9]"
                };
        }
    };

    const styles = getStatusStyles();

    return (
        <div className="flex gap-4">
            <div className="flex flex-col items-center">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${styles.circle}`}>
                    {isSuccess && label === "Waktu konfirmasi buyer diterima" ? (
                        <Check className="w-4 h-4 text-white" />
                    ) : isSuccess ? (
                        <div className="w-2 h-2 rounded-full bg-white" />
                    ) : status === "current" ? (
                        <div className="w-2 h-2 rounded-full bg-white" />
                    ) : null}
                </div>
                {!isLast && <div className={`w-0.5 h-12 ${styles.connector}`} />}
            </div>
            <div className="flex flex-col gap-1 pb-6">
                <span className={`text-sm font-medium ${styles.text}`}>{label}</span>
                {timestamp && (
                    <span className="text-sm text-[#666666]">{timestamp}</span>
                )}
            </div>
        </div>
    );
};

export default VerticalStep; 