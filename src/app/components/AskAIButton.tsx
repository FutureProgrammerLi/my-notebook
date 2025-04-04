'use client'

import { User } from '@supabase/supabase-js'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { useState, useRef, Fragment, useTransition } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { ArrowUpIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { askAIAboutNotesActions } from '../actions/notes';
type Props = {
  user: User | null;
}
function AskAIButton({ user }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [questions, setQuestions] = useState<string[]>([]);
  const [responses, setResponses] = useState<string[]>([]);
  function handleOnOpenChange(isOpen: boolean) {
    if (!user) {
      router.push('/login');
    } else {
      if (isOpen) {
        setQuestionText('');
        setQuestions([]);
        setResponses([]);
      }
      setIsOpen(isOpen);
    }

  }

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  function handleClickInput() {
    textareaRef.current?.focus();
  }
  function handleInput() {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}`
  };
  function handleSubmit() {
    if (!questionText.trim()) return;
    const newQuestions = [...questions, questionText];

    setQuestions(newQuestions);
    setQuestionText('');
    setTimeout(scrollToBottom, 100);
    startTransition(async () => {
      const response = await askAIAboutNotesActions(newQuestions, responses);
      setResponses(prev => [...prev, response]);
      setTimeout(scrollToBottom, 100);
    })
  };
  function scrollToBottom() {
    contentRef.current?.scrollTo({
      top: contentRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }
  return (
    <Dialog open={isOpen} onOpenChange={handleOnOpenChange}>
      <DialogTrigger asChild>
        <Button variant="secondary">Ask AI</Button>
      </DialogTrigger>
      <DialogContent className='custom-scrollbar flex h-[85vh] max-w-4xl min-w-[50%] flex-col overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Are AI about your notes</DialogTitle>
          <DialogDescription>
            Our AI can answer questions about all of your notes.
          </DialogDescription>
        </DialogHeader>
        <div
          className='mt-4 flex flex-col gap-8'
        >
          {questions.map((question, index) => (
            <Fragment
              key={index}
            >
              <p
                className='ml-auto max-w-[60%] rounded-md bg-muted px-2 py-1 text-sm text-muted-foreground'
              >{question}</p>
              {
                responses[index] &&
                <p
                  className='bot-response text-sm text-muted-foreground'
                  dangerouslySetInnerHTML={{ __html: responses[index] }}
                />
              }
            </Fragment>
          ))}
          {isPending && <p className='animate-pulse text-sm'>Thinking...</p>}
        </div>

        <div
          className='mt-auto flex cursor-text flex-col rounded-lg border p-4'
          onClick={handleClickInput}
        >
          <Textarea
            ref={textareaRef}
            placeholder='Ask me anything about yoru notes'
            className='resize-none rounded-none border-none bg-transparent p-0 shadow-none placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0'
            style={{
              minHeight: '0',
              lineHeight: 'normal',
            }}
            rows={1}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            value={questionText}
            onChange={e => setQuestionText(e.target.value)}
          />
          <Button className='ml-auto size-8 rounded-full'>
            <ArrowUpIcon className='text-background' />
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AskAIButton