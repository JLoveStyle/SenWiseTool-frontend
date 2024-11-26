import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Spinner } from "../atoms/spinner/spinner";

type Props = {
  openModal: boolean;
  isProcessing: boolean;
  dialogTitle: string;
  action: string;
  dialogDescription: string;
  cancelationFunction: () => void;
  actionFunction: () => void;
  updateOpenModalState: () => void;
};

export default function ModalContent({
  openModal,
  isProcessing,
  action,
  updateOpenModalState,
  dialogDescription,
  dialogTitle,
  cancelationFunction,
  actionFunction,
}: Props) {
  return (
    <>
      <Dialog open={openModal} onOpenChange={updateOpenModalState}>
        <DialogContent className="p-4">
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center mx-auto gap-3">
            <Button
              onClick={cancelationFunction}
              className="bg-white text-black border border-black hover:bg-white"
            >
              Cancel
            </Button>
            {isProcessing ? (
              <Button className="hover:cursor-not-allowed hover:bg-red-500 bg-red-500 text-white">
                <Spinner />
              </Button>
            ) : (
              <Button
                onClick={actionFunction}
                className="hover:border active:transition-y-1 hover:border-red-500 hover:text-red-500 hover:bg-red-100 active:transition-y-1 bg-red-500 text-white"
              >
                {action}
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
