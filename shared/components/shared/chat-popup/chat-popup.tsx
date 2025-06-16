'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog';
import { MessageSquare } from 'lucide-react';
import { useState } from 'react';
import { ChatForm } from './chat-form';

export const ChatPopup = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <Button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 rounded-full w-14 h-14 shadow-lg"
                size="icon"
            >
                <MessageSquare className="w-6 h-6" />
            </Button>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Чат с поддержкой</DialogTitle>
                    </DialogHeader>
                    <ChatForm onClose={() => setIsOpen(false)} />
                </DialogContent>
            </Dialog>
        </>
    );
};