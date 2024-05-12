"use client";

import { useState } from "react";
import { Textarea } from "../components/ui/TextArea";
import { Button } from "../components/ui/Button";
import { cn } from "@/app/lib/utils";
import { useUIState, useActions } from "ai/rsc";
import { useEnterSubmit } from "./lib/hooks/use-enter-submit";
import { nanoid } from "nanoid";
import { AI } from "./lib/provider";
import { Separator } from "@radix-ui/react-separator";

function IconArrowElbow({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 256 256"
      fill="currentColor"
      className={cn("size-4", className)}
      {...props}
    >
      <path d="M200 32v144a8 8 0 0 1-8 8H67.31l34.35 34.34a8 8 0 0 1-11.32 11.32l-48-48a8 8 0 0 1 0-11.32l48-48a8 8 0 0 1 11.32 11.32L67.31 168H184V32a8 8 0 0 1 16 0Z" />
    </svg>
  );
}

export default function Page() {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useUIState<typeof AI>();
  const { submitUserMessage } = useActions<typeof AI>();
  const { formRef, onKeyDown } = useEnterSubmit();

  return (
    <div className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]">
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        <div className={cn("pb-[200px] pt-4 md:pt-10")}>
          <div className="relative mx-auto max-w-2xl px-4">
            {messages.length > 0 ? (
              <>
                {messages.map((message, index) => (
                  <div key={message.id}>
                    {message.display}
                    <Separator className="my-4" />
                  </div>
                ))}
              </>
            ) : (
              <div className="mx-auto max-w-2xl px-4">
                <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
                  <h1 className="text-lg font-semibold">
                    Welcome to the food AI Chatbot!
                  </h1>
                  <p className="leading-normal text-muted-foreground">
                    Introducing an innovative AI chatbot app template,
                    seamlessly combining text and generative UI for personalized
                    nutrition guidance. Synced interface state ensures real-time
                    adaptation to user interactions, revolutionizing the way you
                    explore ingredients, diets, and recipes. Experience the
                    future of food interaction with this open-source solution.
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="h-px w-full" />
        </div>
        <div className="fixed inset-x-0 bottom-0 w-full bg-gradient-to-b from-muted/30 from-0% to-muted/30 to-50% duration-300 ease-in-out animate-in dark:from-background/10 dark:from-10% dark:to-background/80 peer-[[data-state=open]]:group-[]:lg:pl-[250px] peer-[[data-state=open]]:group-[]:xl:pl-[300px]">
          <div className="mx-auto sm:max-w-2xl sm:px-4">
            <div className="space-y-4 border-t bg-background px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
              <form
                ref={formRef}
                onSubmit={async (e) => {
                  e.preventDefault();
                  setInputValue("");

                  setMessages((currentMessages) => [
                    ...currentMessages,
                    {
                      id: nanoid(),
                      display: <div>{inputValue}</div>,
                    },
                  ]);

                  const responseMessage = await submitUserMessage(inputValue);
                  setMessages((currentMessages) => [
                    ...currentMessages,
                    responseMessage as any,
                  ]);
                }}
              >
                <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
                  <Textarea
                    tabIndex={0}
                    onKeyDown={onKeyDown}
                    placeholder="Send a message."
                    className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm"
                    autoFocus
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    name="message"
                    rows={1}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />

                  <div className="absolute right-0 top-[13px] sm:right-4">
                    <Button
                      type="submit"
                      size="icon"
                      disabled={inputValue === ""}
                    >
                      <IconArrowElbow />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
