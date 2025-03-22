import React, { ChangeEvent } from 'react';
import { Info } from 'lucide-react';
import { ValidationErrors } from './type';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

type EmailPaymentProps = {
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    validationErrors: ValidationErrors;
}

const EmailInputField = ({ handleInputChange, validationErrors }: EmailPaymentProps) => {
    return (
        <div>
            <div className="flex items-center">
                <label className="block text-sm font-medium mb-1">
                    Email
                    <span className="text-red-500 ml-1">*</span>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="inline-block h-4 w-4 text-red-700 cursor-help ml-1" />
                            </TooltipTrigger>
                            <TooltipContent className="max-w-xs ">
                                <p>Please add the company email used when subscribing to senwisetool platform. Otherwise this transaction will not be considered for further operations on this platform.</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </label>
            </div>
            <input
                type="email"
                name="user_email"
                className={`w-full p-2 border rounded ${validationErrors.email ? 'border-red-500' : ''}`}
                onChange={handleInputChange}
                required
            />
            {validationErrors.email && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
            )}
        </div>
    );
};

export default EmailInputField;